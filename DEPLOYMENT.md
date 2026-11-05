# DND Tech Profile

Nuxt frontend + NestJS API (Node.js 24). Konten disimpan di SQLite dengan riwayat 50 revisi dalam `data/`; gambar WebP disimpan di fivemanage-lite. Dua profil awal merupakan draft, bukan profil publik.

## Development

1. Root: `npm ci`; API: `npm --prefix api ci`.
2. `npm --prefix api run build`.
3. `ADMIN_ORIGIN=http://localhost:3000 node scripts/create-admin.mjs` (PowerShell: atur env melalui `$env:ADMIN_ORIGIN`). Ambil kredensial dari `data/admin-initial.txt` secara privat.
4. Jalankan API dengan env dari `data/runtime.env` dan `NODE_ENV=development`: `node --env-file=data/runtime.env api/dist/main.js`.
5. `npm run dev`. Atur `NUXT_PUBLIC_ADMIN_HOST=localhost` untuk frontend, lalu buka `http://localhost:3000` untuk mengelola semua konten dan unggah gambar. Salin path upload ke kolom gambar lalu simpan. Draft anggota/project tidak dikirim oleh endpoint publik.

## Build dan pengujian

- `npm run build`
- `npm run typecheck`
- `npm --prefix api test`
- `npm audit --omit=dev` dan `npm --prefix api audit --omit=dev`

## Pelican

Buat instance baru pada node tujuan, image Node.js 24, RAM 1024 MB, disk 4096 MB. Startup `node scripts/start.mjs`. Pasang file root `.output/`, `api/dist/`, `api/seed.json`, `api/package.json`, `api/package-lock.json`, `api/node_modules/`, dan `scripts/` di volume server. `api/node_modules` harus diinstal pada Linux (jangan salin native module Windows).

`SERVER_PORT` dari Pelican digunakan untuk frontend. API hanya listen pada `127.0.0.1:3101` di dalam container dan diproxy Nuxt. Buat admin sekali dengan `node scripts/create-admin.mjs` di volume sebelum startup. Jangan commit atau menayangkan file kredensial. Selalu gunakan HTTPS untuk login produksi.

Reverse proxy domain `dndtech.my.id` ke allocation frontend. DNS baru dipindah setelah pemeriksaan instance berhasil. Simpan konfigurasi Vercel/domain lama untuk rollback; jangan hapus project Vercel sebelum migrasi terverifikasi.

Backup volume `data/` dengan SQLite online backup (`VACUUM INTO` atau API backup SQLite), plus `data/uploads/` dan `runtime.env`. Jangan hanya menyalin `content.sqlite` yang sedang aktif tanpa WAL. Pelican harus mempunyai jadwal backup sebelum dipakai mengedit konten produksi.

Untuk mengubah password admin, hasilkan hash scrypt baru (format `salt:hash` seperti `scripts/create-admin.mjs`), perbarui `ADMIN_PASSWORD_HASH` dalam `data/runtime.env` secara privat, lalu restart. Semua sesi dibatalkan saat restart. `admin-initial.txt` adalah kredensial awal dan tidak ikut berubah otomatis.

## Instance produksi (5 November 2026)

- Panel: https://panel.vrealms-city.my.id/server/56453d9c/console
- UUID: `56453d9c-6ec2-483c-ae2d-f19dfce1f419` pada node `188.166.196.163`.
- Allocation panel `127.0.0.1:3100` dipetakan Wings ke binding host `172.18.0.1:3100`. Nginx memakai binding hasil inspect, bukan localhost.
- RAM 1024 MiB, CPU 100%, disk 4096 MiB, Node.js 24.
- Domain https://dndtech.my.id; sertifikat Let's Encrypt dengan renewal otomatis.
- Startup menunggu health API dan frontend, lalu mengeluarkan marker yang cocok dengan egg Node bersama; egg layanan lain tidak diubah.
- Backup harian 02:15 UTC / 09:15 WIB / Asia/Bangkok (UTC+7), melalui `/usr/local/sbin/dnd-profile-backup`. Arsip privat di `/root/backups/dnd-tech-profile/`. Tidak ada penghapusan otomatis arsip; pantau penggunaan disk.
- Runtime API audit bersih. Audit toolchain Nuxt menyisakan advisory low `deepmerge` (GHSA-gcqx-w48m-w2h4), belum tersedia patched release di registry saat pengecekan. Jangan gunakan toolchain build untuk memproses konfigurasi tidak tepercaya.
- Pengujian backend Linux dan Windows, typecheck, build, login CMS produksi, simpan konten, dan draft anggota lulus. Tampilan desktop diperiksa. Viewport override browser tidak diterapkan oleh alat, sehingga mobile belum diverifikasi secara visual.

Auto-deploy Vercel dinonaktifkan melalui `git.deploymentEnabled: false` dalam `vercel.json`; project lama tidak dihapus. [Dokumentasi Vercel](https://vercel.com/docs/project-configuration/git-configuration). Deployment Pelican berikutnya masih manual; konten CMS tersimpan langsung dan tidak memerlukan build ulang.

## Subdomain CMS dan fivemanage-lite

- Website publik: https://dndtech.my.id. CMS: https://profile-admin.dndtech.my.id, tanpa path `/admin`. Alamat lama `/admin` mengarah ke subdomain baru.
- `ADMIN_ORIGIN=https://profile-admin.dndtech.my.id` digunakan untuk pemeriksaan Origin/CSRF. Cookie sesi hanya berlaku pada hostname admin. Endpoint auth/admin ditolak pada domain publik oleh Nginx dan Nuxt.
- Hostname CMS frontend: `NUXT_PUBLIC_ADMIN_HOST` (default produksi `profile-admin.dndtech.my.id`). Development: `NUXT_PUBLIC_ADMIN_HOST=localhost` dan `ADMIN_ORIGIN=http://localhost:3000`; halaman publik dapat diperiksa dari `http://127.0.0.1:3000`.
- `FIVEMANAGE_UPLOAD_URL=https://fivemanage.dndtech.my.id/api/v3/file`, `FIVEMANAGE_PUBLIC_ORIGIN=https://fivemanage.dndtech.my.id`, dan `FIVEMANAGE_API_KEY` hanya di environment backend privat. Token tidak masuk konfigurasi public Nuxt.
- Token media khusus `DND Tech Profile CMS`, tim `Dnd Team`, dengan folder `DND Tech Profile`. Upload baru dikonversi WebP lalu dikirim multipart field `file`, Authorization raw token (tanpa Bearer), mengikuti kontrak API layanan yang ada. URL provider divalidasi sebelum disimpan.
- Upload gagal mengembalikan error; tidak ada fallback penyimpanan lokal. Path `/media/` lama tetap dapat dibaca untuk kompatibilitas. Logo lama sudah dipindahkan ke fivemanage-lite.
- Backup CMS menyimpan referensi URL; file media berada pada storage/backup fivemanage-lite.
- Build, typecheck, pengujian upload, login browser subdomain baru, upload produksi, URL media, redirect lama, dan pemisahan API sudah diverifikasi.
