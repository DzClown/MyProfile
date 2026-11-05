import { createApp } from './app.js';
const app = await createApp({
  dataDir: process.env.DATA_DIR || './data',
  origin: process.env.PUBLIC_ORIGIN || 'http://localhost:3000',
  username: process.env.ADMIN_USERNAME || '',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
  secure: process.env.NODE_ENV === 'production',
});
await app.listen(Number(process.env.API_PORT || 3101), process.env.API_HOST || '127.0.0.1');
