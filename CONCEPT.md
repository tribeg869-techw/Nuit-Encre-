# NUIT-ENCRE — Dokumen Konsep

> Versi 0.4 · **mobile-first**, identitas terpisah dari Concept Archive.

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

---

## 8. Void — latar hero

Hero semula menyisakan **58% layar kosong** karena `space-between` dengan isi
sedikit. Ruang itu tidak diisi dengan tambalan, melainkan **dijadikan karya**.

Void kini **bukan kotak kecil di dalam hero** — ia mengisi seluruh hero sebagai
latar (`position:absolute; inset:0`), dengan teks mengambang di atasnya. Judul
dan jam diberi `text-shadow` gelap agar tetap terbaca di atas tinta.

Tiga lapis yang menceritakan satu hal:

| Lapis | Gagasan |
|---|---|
| **Spesimen** | Bentuk tinta dibangkitkan acak tiap kunjungan. Diberi kode `SPESIMEN 4A7F—2147` — tak pernah terulang. Situsnya sendiri menjadi studi konsep. |
| **Kamar gelap** | Bentuk itu hanya tersingkap oleh cahaya yang mengikuti jari. Diam = gelap. "Malam" jadi kondisi, bukan sekadar warna. |
| **Gravitasi** | Miringkan ponsel, tinta bergeser mengikuti. Lapisan opsional — bila sensor tidak ada, tak ada yang rusak. |

### Bentuk tinta: dari debu ke serat

Bentuknya melewati dua perbaikan besar, keduanya berangkat dari keluhan yang
sama — tinta tidak terbaca sebagai **satu massa cair**.

**Ronde 1 — dari gumpalan melayang ke filamen.** Versi awal memakai blob bulat
yang tersebar; hasilnya terbaca sebagai *debu mengambang*, bukan tinta. Diganti
dengan **untai mengalir**: 4–6 filamen yang berjalan simpul demi simpul,
menipis di ujung tapi tak pernah hilang.

**Ronde 2 — menambah serat.** Untai saja masih terlalu bersih. Tiap simpul
induk kini berpeluang **menumbuhkan cabang** — lebih pendek, lebih tipis, dan
meliuk lebih liar daripada induknya.

| | sebelum | filamen | + cabang (kini) |
|---|---|---|---|
| Simpul | 90 | 103 | **230** |
| Jari-jari median | 14px | 30px | 18px |
| Simpul tak bersentuhan | 53% | 5% | **13%** |
| Cakupan tinggi hero | 70% | 94% | **96%** |
| Bagian berserat | 0% | 0% | **47%** |

### Batas yang ditemukan lewat pengujian

Tiga hal yang **sudah dicoba dan ditolak** — jangan diulang:

- **Cabang bertingkat** (cucu, `maxGen ≥ 2`) — simpul meledak ke 612, jari-jari
  median anjlok ke 5px, celah melonjak ke 42%. Kembali jadi debu. Percabangan
  dikunci **satu tingkat**.
- **Memperbanyak percikan** — hanya menambah titik lepas yang mengambang.
  Serat harus **menempel** pada untainya, bukan berdiri sendiri.
- **Filamen terlalu tebal** (3–4 untai gemuk) — jadi beberapa cacing besar,
  cakupan turun ke 83%.

### Anggaran kecerahan

Kanvas memakai `globalCompositeOperation = 'lighter'`, jadi **tumpukan simpul
menaikkan terang secara non-linier**. Setiap kali jumlah simpul berubah, dua
titik gradien harus disetel ulang. Sasarannya rata-rata **0,85–0,93**; di atas
1,0 layar berisiko memutih rata.

| Simpul | Titik gradien | Rata-rata |
|---|---|---|
| 103 | `.78` / `.30` | 0,85 |
| **230** | **`.58` / `.22`** | **0,88** |

Tidak ada peramban headless di lingkungan ini, jadi kecerahan **hanya bisa
disimulasikan** — mata di ponsel asli tetap pemutus akhir.

### Jaring pengaman

- Tanpa `getContext` → seluruh blok berhenti diam-diam
- Tanpa sensor → sentuhan saja sudah cukup
- Tidak disentuh 2,6 detik → menyingkap pelan sendiri
- `prefers-reduced-motion` → tampil penuh, tanpa gerak
- iOS 13+ izin sensor hanya diminta setelah pengguna menyentuh

### Bug yang sekalian diperbaiki

`.hero` setinggi `100dvh` berakhir tepat di dasar layar, sementara dock `56px`
melayang di atasnya — sehingga `.hero__foot` (status + jam) **tidak pernah
terlihat di ponsel**. Tinggi hero kini dikurangi setinggi dock.

Judul juga sempat **terdorong turun** karena slack menumpuk di atasnya.
`.hero__mid` memakai `margin-top:clamp(24px,16vh,150px)` — **jangan** `auto`,
karena itulah yang dulu membuat judul melorot ke tengah.

---

## 9. Satu bahasa

Situs ini **hanya Bahasa Indonesia**, tanpa pengganti bahasa. Keputusan ini
sengaja: tekstur multibahasa adalah salah satu hal yang membuat versi pertama
terbaca sebagai tiruan Concept Archive.

Konsekuensinya pada tata letak: label lokasi di pojok kanan hero ditulis
**`INDONESIA`**, bukan `IDN`. Singkatan tiga huruf di pojok atas adalah
konvensi kuat untuk tombol pengganti bahasa — pemilik situs sendiri sempat
mengetuknya dan mengira rusak. Kata penuh menghilangkan salah baca itu tanpa
menambah elemen apa pun.

Bila suatu saat EN dibutuhkan: seluruh teks sudah terpusat (**32 potong** di
`data.js`, **6** di `index.html`), jadi tinggal diubah jadi `{ id, en }`.
Kerjakan **setelah** teks Indonesianya final — catatan studi dan cerita
Concept Archive masih placeholder, dan menerjemahkan teks yang belum final
berarti kerja dua kali.

---

## 10. Layar pembuka

Situs ini ringan; tidak ada yang benar-benar perlu ditunggu. Jadi layar pembuka
bukan bar kemajuan, melainkan **adegan** — dan sengaja dibedakan sifatnya dari
hero, supaya dua layar beruntun tidak terasa sama:

> **Pembuka = tinta bergerak. Hero = tinta mengendap.**
> Satu cerita: ditumpahkan, lalu diam.

| Waktu | Kejadian |
|---|---|
| 0–0,4s | Setetes tinta putih jatuh, memanjang makin cepat |
| 0,4–1,2s | Mendarat, lalu merembes **naik** memenuhi layar; tepinya bergelombang |
| ~0,7s | **Sulur berserat** menjalar keluar mendahului rembesan |
| 1,26–2,1s | Layar putih **dibelah tiga**, didorong keluar bergantian arah, beruntun 0,11s |
| 2,16s | Hero tersingkap |

Gabungan dua gagasan: tinta tertumpah (permintaan pemilik situs) dan gestur
"benda yang didorong" ala huyml.co — tapi dijalankan dengan bahan sendiri.
Sulurnya memakai **mesin filamen yang sama** dengan hero, jadi seratnya satu
bahasa.

### Detail yang menentukan

- **Teks tetap terbaca** sepanjang adegan lewat `mix-blend-mode:difference` —
  `NUIT-ENCRE` dan angka otomatis membalik jadi hitam saat tinta putih lewat,
  tanpa logika tambahan.
- **Tinta dilebihkan 60px** ke atas layar (`OVER`), karena gelombang tepi
  menyisakan celah hitam di puncak saat seharusnya sudah "penuh".
- **Rembesan mulai setelah tetes mendarat**, bukan bersamaan — awalnya tinta
  sudah naik 29% sebelum tetesnya menyentuh dasar.
- **Boot ditutup di 2,16s**, sesudah panel terakhir bersih di 2,1s. Kalau
  durasi dorongan diubah, angka ini harus ikut diperiksa atau panel terpotong.

### Jaring pengaman

- `getContext` mengembalikan `null` → adegan dilewati, boot langsung tersingkap
- `prefers-reduced-motion` → tanpa adegan, singkap dalam 200ms
- `body` dikunci `overflow:hidden` selama boot, dilepas di **semua** jalur keluar
