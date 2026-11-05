import { BadGatewayException, ServiceUnavailableException } from '@nestjs/common';
export interface MediaConfig { endpoint: string; token: string; publicOrigin: string }
export async function uploadMedia(config: MediaConfig | undefined, image: Buffer, filename: string): Promise<{ url: string }> {
  if (!config?.endpoint || !config.token) throw new ServiceUnavailableException('Penyimpanan gambar belum dikonfigurasi');
  const form = new FormData();
  form.set('file', new Blob([new Uint8Array(image)], { type: 'image/webp' }), filename);
  form.set('metadata', JSON.stringify({ source: 'dnd-tech-profile' }));
  try {
    const response = await fetch(config.endpoint, { method: 'POST', headers: { Authorization: config.token }, body: form, signal: AbortSignal.timeout(30000), redirect: 'error' });
    if (!response.ok) throw new Error('Media provider rejected the upload');
    const body = await response.json() as { status?: string; data?: { url?: string } };
    const url = new URL(body.data?.url || '');
    if (body.status !== 'ok' || url.protocol !== 'https:' || url.origin !== config.publicOrigin || url.username || url.password || url.hash) throw new Error('Invalid media URL');
    return { url: url.href };
  } catch { throw new BadGatewayException('Upload ke fivemanage-lite gagal. Silakan coba kembali.'); }
}
