import 'reflect-metadata';
import { Body, Controller, Get, Post, Put, Req, Res, Module, HttpException, UnauthorizedException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { scrypt } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { uploadMedia, type MediaConfig } from './media.js';
import { contentSchema, loginSchema, saveSchema, uploadSchema, type Content } from './schema.js';

export function passwordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
const hashSession = (value: string) => createHash('sha256').update(value).digest('hex');
export async function createApp(config: { dataDir: string; origin: string; username: string; passwordHash: string; secure: boolean; media?: MediaConfig }) {
  if (!config.username || !/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(config.passwordHash)) throw new Error('Configure ADMIN_USERNAME and ADMIN_PASSWORD_HASH');
  mkdirSync(config.dataDir, { recursive: true });
  const uploads = resolve(config.dataDir, 'uploads');
  mkdirSync(uploads, { recursive: true });
  const db = new DatabaseSync(resolve(config.dataDir, 'content.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS revisions (id INTEGER PRIMARY KEY, payload TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
  const seed = contentSchema.parse(JSON.parse(readFileSync(new URL('../seed.json', import.meta.url), 'utf8')));
  db.prepare('INSERT OR IGNORE INTO content VALUES (1, 1, ?)').run(JSON.stringify(seed));
  db.prepare('DELETE FROM sessions').run();
  const cookie = { httpOnly: true, secure: config.secure, sameSite: 'strict' as const, path: '/', maxAge: 8 * 60 * 60 * 1000 };
  function authenticated(req: Request) {
    const token = req.cookies?.dnd_session;
    if (typeof token !== 'string' || token.length > 100) throw new UnauthorizedException();
    const session = db.prepare('SELECT csrf, expires FROM sessions WHERE token=?').get(hashSession(token));
    if (!session || Number(session.expires) < Date.now()) throw new UnauthorizedException();
    return session;
  }
  function mutation(req: Request) {
    const session = authenticated(req);
    if (req.get('origin') !== config.origin || req.get('x-csrf-token') !== session.csrf) throw new ForbiddenException();
    return session;
  }
  function document() {
    const row = db.prepare('SELECT revision, payload FROM content WHERE id=1').get()!;
    return { revision: Number(row.revision), content: JSON.parse(String(row.payload)) as Content };
  }
  @Controller('api')
  class ProfileController {
    @Get('health') health() { db.prepare('SELECT 1').get(); return { status: 'ok', service: 'dnd-profile' }; }
    @Get('content') publicContent() {
      const { content } = document();
      content.members = content.members.filter(member => member.published);
      content.projects = content.projects.filter(project => project.published);
      return { ...content, experience: [] };
    }
    @Post('auth/login') async login(@Body() body: unknown, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
      if (req.get('origin') !== config.origin) throw new ForbiddenException();
      const parsed = loginSchema.safeParse(body);
      if (!parsed.success) throw new UnauthorizedException('Login gagal');
      const [salt, stored] = config.passwordHash.split(':');
      const derived = await promisify(scrypt)(parsed.data.password, salt, 64) as Buffer;
      if (!timingSafeEqual(derived, Buffer.from(stored, 'hex')) || parsed.data.username !== config.username) throw new UnauthorizedException('Login gagal');
      const token = randomBytes(32).toString('hex'), csrf = randomBytes(24).toString('hex');
      const oldToken = req.cookies?.dnd_session;
      if (typeof oldToken === 'string') db.prepare('DELETE FROM sessions WHERE token=?').run(hashSession(oldToken));
      db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
      db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(hashSession(token), csrf, Date.now() + cookie.maxAge);
      res.cookie('dnd_session', token, cookie);
      res.setHeader('Cache-Control', 'no-store');
      return { csrf };
    }
    @Get('auth/session') session(@Req() req: Request) { return { csrf: authenticated(req).csrf }; }
    @Post('auth/logout') logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      mutation(req);
      db.prepare('DELETE FROM sessions WHERE token=?').run(hashSession(req.cookies.dnd_session));
      res.clearCookie('dnd_session', { ...cookie, maxAge: undefined });
      return { ok: true };
    }
    @Get('admin/content') adminContent(@Req() req: Request) { authenticated(req); return document(); }
    @Put('admin/content') save(@Body() body: unknown, @Req() req: Request) {
      mutation(req);
      const parsed = saveSchema.safeParse(body);
      if (!parsed.success) throw new BadRequestException({ message: 'Konten tidak valid', errors: parsed.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })) });
      const payload = JSON.stringify(parsed.data.content);
      db.exec('BEGIN IMMEDIATE');
      try {
        const previous = document();
        if (previous.revision !== parsed.data.revision) throw new ConflictException('Konten berubah di sesi lain. Muat ulang sebelum menyimpan.');
        db.prepare('INSERT INTO revisions (id,payload) VALUES (?,?)').run(previous.revision, JSON.stringify(previous.content));
        db.prepare('UPDATE content SET payload=?, revision=revision+1 WHERE id=1').run(payload);
        db.prepare('DELETE FROM revisions WHERE id < ?').run(previous.revision - 50);
        db.exec('COMMIT');
      } catch (error) { db.exec('ROLLBACK'); throw error; }
      return document();
    }
    @Post('admin/uploads') async upload(@Body() body: unknown, @Req() req: Request) {
      mutation(req);
      const parsed = uploadSchema.safeParse(body);
      if (!parsed.success) throw new BadRequestException('Gambar maksimal 5 MB');
      const buffer = Buffer.from(parsed.data.data, 'base64');
      if (buffer.length > 5 * 1024 * 1024) throw new BadRequestException('Gambar maksimal 5 MB');
      const filename = `${randomUUID()}.webp`;
      let converted: Buffer;
      try {
        const image = sharp(buffer, { limitInputPixels: 25_000_000, animated: false });
        const metadata = await image.metadata();
        if (!['jpeg', 'png', 'webp'].includes(metadata.format || '')) throw new Error('Unsupported image');
        converted = await image.rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
      } catch { throw new BadRequestException('Gunakan gambar PNG, JPG, atau WebP yang valid'); }
      return uploadMedia(config.media, converted, filename);
    }
  }
  @Module({ controllers: [ProfileController] }) class AppModule {}
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'], bodyParser: false });
  const server = app.getHttpAdapter().getInstance();
  server.disable('x-powered-by');
  server.set('trust proxy', 'loopback');
  app.use(helmet());
  app.use(cookieParser());
  app.use('/api', rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60_000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.use(express.json({ limit: '7mb' }));
  app.use('/api', (_req: Request, res: Response, next: NextFunction) => { res.setHeader('Cache-Control', 'no-store'); next(); });
  app.use('/media', express.static(uploads, { dotfiles: 'deny', immutable: true, maxAge: '1y', setHeaders: res => { res.setHeader('X-Content-Type-Options','nosniff'); } }));
  app.useGlobalFilters({ catch(error: unknown, host: any) {
    const response = host.switchToHttp().getResponse();
    if (error instanceof HttpException) response.status(error.getStatus()).json(error.getResponse());
    else response.status(500).json({ message: 'Terjadi kesalahan server' });
  } });
  app.enableShutdownHooks();
  app.getHttpServer().once('close', () => db.close());
  return app;
}
