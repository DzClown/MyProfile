# DND Tech Profile

Nuxt frontend + NestJS API (Node.js 24). Konten disimpan di SQLite dengan riwayat 50 revisi dan upload WebP dalam `data/`. Dua profil awal merupakan draft, bukan profil publik.

## Development

1. Root: `npm ci`; API: `npm --prefix api ci`.
2. `npm --prefix api run build`.
3. `PUBLIC_ORIGIN=http://localhost:3000 node scripts/create-admin.mjs` (PowerShell: atur env melalui `$env:PUBLIC_ORIGIN`). Ambil kredensial dari `data/admin-initial.txt` secara privat.
4. Jalankan API dengan env dari `data/runtime.env` dan `NODE_ENV=development`: `node --env-file=data/runtime.env api/dist/main.js`.
5. `npm run dev`. Buka `/admin` untuk mengelola semua konten dan unggah gambar. Salin path upload ke kolom gambar lalu simpan. Draft anggota/project tidak dikirim oleh endpoint publik.

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
