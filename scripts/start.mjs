import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
if (existsSync('data/runtime.env')) process.loadEnvFile('data/runtime.env');
const port = process.env.SERVER_PORT || process.env.PORT || '3100';
const apiPort = process.env.API_PORT || '3101';
const env = { ...process.env, NODE_ENV: 'production', API_HOST: '127.0.0.1', API_PORT: apiPort, PORT: port, HOST: '0.0.0.0', NUXT_API_INTERNAL: `http://127.0.0.1:${apiPort}` };
const children = [];
let stopping = false;
function shutdown(code = 0) { if (stopping) return; stopping = true; for (const child of children) child.kill('SIGTERM'); const timer = setTimeout(() => { for (const child of children) child.kill('SIGKILL'); process.exit(code); }, 8000); timer.unref(); Promise.all(children.map(child => new Promise(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', resolve); }))).then(() => process.exit(code)); }
for (const entry of ['api/dist/main.js', '.output/server/index.mjs']) { const child = spawn(process.execPath, [entry], { env, stdio: 'inherit' }); children.push(child); child.once('error', error => { console.error(`Cannot start ${entry}: ${error.message}`); shutdown(1); }); child.once('exit', () => { if (!stopping) shutdown(1); }); }
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

// Keep the shared Node egg unchanged; use its existing readiness marker after both services respond.
async function ready() {
  for (let attempt = 0; attempt < 60 && !stopping; attempt++) {
    try {
      const [api, web] = await Promise.all([fetch(`http://127.0.0.1:${apiPort}/api/health`, { signal: AbortSignal.timeout(2000) }), fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(2000) })]);
      if (api.ok && web.ok) { console.log('DND Tech ready — change this text 1'); return; }
    } catch { /* Retry while both processes initialize. */ }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (!stopping) { console.error('Startup health check failed'); shutdown(1); }
}
void ready();
