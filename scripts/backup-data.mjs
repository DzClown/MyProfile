import { DatabaseSync, backup } from 'node:sqlite';
import { resolve } from 'node:path';
const data = resolve(process.env.DATA_DIR || 'data');
const db = new DatabaseSync(resolve(data, 'content.sqlite'), { readOnly: true });
try { await backup(db, resolve(data, 'backup-snapshot.sqlite')); } finally { db.close(); }
const check = new DatabaseSync(resolve(data, 'backup-snapshot.sqlite'), { readOnly: true });
try { if (Object.values(check.prepare('PRAGMA integrity_check').get())[0] !== 'ok') throw new Error('Backup integrity check failed'); } finally { check.close(); }
console.log('SQLite backup integrity: ok');
