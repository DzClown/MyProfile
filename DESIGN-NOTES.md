# DND Tech — profil studio engineering

Referensi yang ditinjau:
- https://basement.studio/ — identitas studio dan penekanan pada karya.
- https://work.co/ — komposisi editorial serta hierarki konten.

Penerapan DND: latar hangat, tipografi Space Grotesk, metadata IBM Plex Mono, cyan dan emas dari logo asli. Motif garis dua dimensi terinspirasi bentuk dadu pada logo. Tidak memakai aset visual, klaim pelanggan, atau copy milik referensi.

Portfolio diubah menjadi indeks interaktif dengan satu preview/detail aktif. Link demo web dan PWA mengikuti pilihan project. Screenshot dari CMS menggantikan poster fallback, sehingga gambar fivemanage-lite tetap digunakan. Profil draft tetap tersembunyi.

CSS desain publik diisolasi dengan prefix `dnd-` dan wrapper `.dnd-public` agar editor CMS tidak berubah. Tidak ada dependency JavaScript tambahan atau WebGL. Mendukung focus keyboard, skip link, aria-pressed, dan reduced motion.

Verifikasi: build dan typecheck lolos; tampilan desktop serta mobile 390px diperiksa di browser. Tidak ada overflow horizontal. Pilihan project memperbarui detail dan URL demo sesuai data CMS.
