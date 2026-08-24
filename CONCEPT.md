# NUIT-ENCRE — Dokumen Konsep

> Versi 0.3 · **mobile-first**, identitas terpisah dari Concept Archive.

---

## 0. Koreksi arah (v0.2 → v0.3)

Versi sebelumnya salah arah. Dokumen v0.1 memerintahkan untuk **mewarisi**
sistem tipografi, aksen cinnabar, dan dwibahasa 中文 dari Concept Archive.
Akibatnya situs induk terlihat seperti kembaran anaknya, sementara acuan yang
diminta — huyml.co — hanya terambil kulit luarnya.

Ditambah satu fakta yang sebelumnya tidak diketahui: **pemilik situs bekerja
sepenuhnya dari ponsel.** Versi lama menaruh isi penting di balik interaksi
*hover*, yang tidak pernah bisa diakses di layar sentuh.

Kedua hal ini membatalkan v0.2 secara menyeluruh.

---

## 1. Tiga aturan yang mengikat

**Aturan 1 — Mobile-first, harfiah.**
Dirancang pada lebar 360px lebih dulu. Layar besar hanyalah pelebaran, bukan
tujuan. Tidak ada satu pun isi yang bergantung pada *hover* atau seret mouse.

**Aturan 2 — Jangan menyerupai Concept Archive.**
Situs induk harus punya suara sendiri. Semua penanda khas Archive dilepas.

**Aturan 3 — Terinspirasi huyml.co, bukan menirunya.**
Ambil sikapnya: berani, tipografi besar, metadata teknis, ruang kosong.
Jangan ambil bentuknya.

---

## 2. Pemisahan dari Concept Archive

| Unsur | Concept Archive | Nuit-Encre |
|---|---|---|
| Latar | Kertas hangat terang | **Hitam murni** `#000000` |
| Aksen | Cinnabar `#C8402F` | **Tidak ada warna.** Aksen = pembalikan blok putih–hitam |
| Aksara | 中文 sebagai tekstur | **Dilepas sepenuhnya** — tanpa CJK |
| Huruf | Serif kontras tinggi | **Grotesque padat**, serif hanya satu kata sesekali |
| Penyusun | Taksonomi `01—06` | **Indeks tiga digit** `008 / 001` |
| Suasana | Galeri yang tenang | Ruang gelap, sinyal, laboratorium |

Motif `夜墨` juga **dibuang**. Itu tadinya jembatan ke `墨` milik Archive —
justru penyebab keduanya terasa satu benda.

### Kenapa monokrom penuh

Archive sudah memiliki satu warna aksen yang kuat. Cara paling tegas untuk
berdiri terpisah bukanlah memilih warna lain, melainkan **menolak warna sama
sekali**. Aksennya diganti perangkat lain: **inversi** — blok putih penuh
dengan teks hitam. Lebih berani, dan tidak bisa tertukar dengan Archive.

---

## 3. Pemisahan dari huyml.co

| Unsur | huyml.co | Nuit-Encre |
|---|---|---|
| Latar | Abu terang | Hitam |
| Navigasi | Baris di tengah halaman | **Bilah bawah tetap** — zona jempol |
| Galeri | Seret mendatar, banyak kartu terlihat | **Geser + snap tengah** — satu kartu fokus, keterangan berganti di bawah |
| Metadata | Empat sudut layar | Bilah bawah + label lengket per bagian |
| Huruf display | Serif italic mendominasi | Grotesque mendominasi, serif italic sangat jarang |
| Jumlah karya | 19 | 1 — maka strukturnya wajib berbeda |

Yang **diambil**: keberanian ukuran tipografi, label teknis monospace, indeks
bernomor, ruang kosong yang lapang, ketelitian metadata.

---

## 4. Keputusan mobile

Bekerja dari ponsel berarti keputusan berikut bukan tambahan, melainkan dasar.

- **Navigasi di bawah.** Bagian atas layar ponsel sulit dijangkau ibu jari.
- **Ketuk, bukan hover.** Setiap kartu studi dibuka dengan ketukan. Tidak ada
  isi yang tersembunyi di balik hover.
- **Sasaran sentuh minimal 44px.**
- **Geser pada galeri.** Gestur paling alami di ponsel. Memakai
  `scroll-snap` bawaan peramban, sehingga momentumnya terasa seperti aplikasi
  dan tetap ringan. Tombol panah disediakan sebagai cadangan.
- **`100dvh`**, bukan `100vh` — agar tidak terpotong bilah alamat peramban.
- **`safe-area-inset`** dihormati untuk ponsel berponi.
- **Tipografi diuji pada 360px** — bukan diperkecil dari desktop.

---

## 5. Palet & tipografi

```
--void   #000000   latar
--ash    #0A0A0A   permukaan
--line   #1F1F1F   garis
--dim    #6E6E6E   metadata
--soft   #A8A8A8   teks sekunder
--pure   #FAFAFA   teks utama & blok inversi
```

- **Display & teks** — Inter, sangat rapat (`-0.04em`), berat 400–600
- **Label** — JetBrains Mono, huruf besar, spasi lebar, sangat kecil
- **Serif italic** — Instrument Serif, dipakai maksimal **satu kata per bagian**

---

## 6. Susunan halaman

| | Bagian | Isi |
|---|---|---|
| `001` | Pembuka | Nama besar, status, indeks |
| `002` | Karya | Concept Archive — satu-satunya yang selesai |
| `003` | Studi | 8 studi visual, galeri geser dengan snap ke tengah |
| `004` | Praktik | Dua paragraf posisi |
| `005` | Kontak | Satu alamat, blok inversi |

Bilah bawah tetap: nama · indeks bagian berjalan · tombol menu.

---

## 7. Yang masih perlu kamu isi

| Kebutuhan | Keterangan |
|---|---|
| **Gambar studi** | 8 gambar sekarang adalah placeholder AI |
| **Cerita Concept Archive** | Aku menebak dari situsnya — tolong dikoreksi |
| **Email** | Masih dummy |

Semua terpusat di `assets/js/data.js`.
