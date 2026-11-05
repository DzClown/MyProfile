import { createServer } from 'node:http';
import { uploadMedia } from '../dist/media.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp, passwordHash } from '../dist/app.js';

test('CMS authentication, drafts, validation, CSRF, concurrency, uploads and persistence', async () => {
  const dataDir = mkdtempSync(join(tmpdir(), 'dnd-profile-'));
  const config = { dataDir, origin: 'https://profile.example', username: 'admin', passwordHash: passwordHash('test-password'), secure: true };
  let uploadsReceived = 0;
  const provider = createServer(async (req, res) => {
    assert.equal(req.url, '/api/v3/file');
    assert.equal(req.headers.authorization, 'test-media-key');
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    assert.ok(body.includes(Buffer.from('image/webp')));
    assert.ok(body.includes(Buffer.from('WEBP')));
    uploadsReceived++;
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', data: { url: 'https://media.example/image.webp' } }));
  });
  await new Promise(resolve => provider.listen(0, '127.0.0.1', resolve));
  config.media = { endpoint: `http://127.0.0.1:${provider.address().port}/api/v3/file`, token: 'test-media-key', publicOrigin: 'https://media.example' };
  let app = await createApp(config);
  try {
    await app.listen(0, '127.0.0.1');
    let base = await app.getUrl();
    const call = (path, options = {}) => fetch(`${base}/api/${path}`, options);
    assert.equal((await call('admin/content')).status, 401);
    const publicDoc = await (await call('content')).json();
    assert.equal(publicDoc.members.length, 0);
    assert.equal(publicDoc.experience.length, 0);
    assert.equal(publicDoc.projects.length, 5);
    assert.equal((await call('auth/login', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://evil.example' }, body: JSON.stringify({ username: 'admin', password: 'test-password' }) })).status, 403);
    assert.equal((await call('auth/login', { method: 'POST', headers: { 'content-type': 'application/json', origin: config.origin }, body: JSON.stringify({ username: 'admin', password: 'wrong' }) })).status, 401);
    const login = await call('auth/login', { method: 'POST', headers: { 'content-type': 'application/json', origin: config.origin }, body: JSON.stringify({ username: 'admin', password: 'test-password' }) });
    assert.equal(login.status, 201);
    assert.match(login.headers.get('set-cookie'), /HttpOnly/);
    assert.match(login.headers.get('set-cookie'), /Secure/);
    assert.match(login.headers.get('set-cookie'), /SameSite=Strict/);
    const cookie = login.headers.get('set-cookie').split(';')[0];
    const { csrf } = await login.json();
    const headers = { cookie, origin: config.origin, 'x-csrf-token': csrf, 'content-type': 'application/json' };
    const doc = await (await call('admin/content', { headers })).json();
    assert.equal(doc.content.members[1].name, 'Jehezkiel');
    assert.equal(doc.content.members[0].published, false);
    assert.equal((await call('admin/content', { method: 'PUT', headers: { ...headers, 'x-csrf-token': '' }, body: JSON.stringify(doc) })).status, 403);
    doc.content.projects[0].link = 'javascript:alert(1)';
    assert.equal((await call('admin/content', { method: 'PUT', headers, body: JSON.stringify(doc) })).status, 400);
    doc.content.projects[0].link = 'https://demo.example';
    doc.content.site.headline = 'Saved headline';
    const saved = await call('admin/content', { method: 'PUT', headers, body: JSON.stringify(doc) });
    assert.equal(saved.status, 200);
    assert.equal((await call('admin/content', { method: 'PUT', headers, body: JSON.stringify(doc) })).status, 409);
    assert.equal((await (await call('content')).json()).site.headline, 'Saved headline');
    assert.equal((await call('admin/uploads', { method: 'POST', headers, body: JSON.stringify({ data: Buffer.from('<svg/>').toString('base64') }) })).status, 400);
    const sharp = (await import('sharp')).default;
    const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: 'green' } }).png().toBuffer();
    const upload = await call('admin/uploads', { method: 'POST', headers, body: JSON.stringify({ data: png.toString('base64') }) });
    assert.equal(upload.status, 201);
    const { url } = await upload.json();
    assert.equal(url, 'https://media.example/image.webp');
    assert.equal(uploadsReceived, 1);
    assert.equal((await call('auth/logout', { method: 'POST', headers })).status, 201);
    assert.equal((await call('admin/content', { headers })).status, 401);
    await app.close();
    app = await createApp(config); await app.listen(0, '127.0.0.1'); base = await app.getUrl();
    assert.equal((await (await call('content')).json()).site.headline, 'Saved headline');
    assert.equal((await call('admin/content', { headers })).status, 401);
    for (let index = 0; index < 10; index++) await call('auth/login', { method: 'POST', headers: { 'content-type': 'application/json', origin: config.origin }, body: JSON.stringify({ username: 'admin', password: 'wrong' }) });
    assert.equal((await call('auth/login', { method: 'POST', headers: { origin: config.origin } })).status, 429);
  } finally { await app.close(); await new Promise(resolve => provider.close(resolve)); rmSync(dataDir, { recursive: true, force: true }); }
});

test('media storage fails closed without credentials or with invalid provider results', async () => {
  await assert.rejects(uploadMedia(undefined, Buffer.from('image'), 'image.webp'), error => error.getStatus() === 503);
  const provider = createServer((_req, res) => { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ status: 'ok', data: { url: 'https://unexpected.example/file.webp' } })); });
  await new Promise(resolve => provider.listen(0, '127.0.0.1', resolve));
  try {
    await assert.rejects(uploadMedia({ endpoint: `http://127.0.0.1:${provider.address().port}`, token: 'test-key', publicOrigin: 'https://media.example' }, Buffer.from('image'), 'image.webp'), error => error.getStatus() === 502);
  } finally { await new Promise(resolve => provider.close(resolve)); }
});
