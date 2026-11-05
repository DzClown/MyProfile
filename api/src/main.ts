import { createApp } from './app.js';
const app = await createApp({
  dataDir: process.env.DATA_DIR || './data',
  origin: process.env.ADMIN_ORIGIN || process.env.PUBLIC_ORIGIN || 'http://localhost:3000',
  username: process.env.ADMIN_USERNAME || '',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
  secure: process.env.NODE_ENV === 'production',
  media: { endpoint: process.env.FIVEMANAGE_UPLOAD_URL || '', token: process.env.FIVEMANAGE_API_KEY || '', publicOrigin: process.env.FIVEMANAGE_PUBLIC_ORIGIN || 'https://fivemanage.dndtech.my.id' },
});
await app.listen(Number(process.env.API_PORT || 3101), process.env.API_HOST || '127.0.0.1');
