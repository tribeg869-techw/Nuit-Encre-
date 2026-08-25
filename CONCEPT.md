# NUIT-ENCRE — Dokumen Konsep


> Versi 1.0 · situs sudah tayang. Dokumen ini adalah **peta kerja** —
> baca sampai habis sebelum mengubah apa pun.


**Tayang di:** https://tribeg869-techw.github.io/Nuit-Encre-/


---


## 0. Baca ini dulu


Pemilik situs bekerja **sepenuhnya dari ponsel** dan **tidak menulis kode**.
Dua fakta itu membentuk hampir setiap keputusan di bawah. Kalau kamu agen baru
yang meneruskan proyek ini, empat hal berikut yang paling sering salah dipahami:


1. **Berbahasa Indonesia.** Pemilik situs orang Indonesia. Semua percakapan,
   komentar kode, dan pesan commit memakai Bahasa Indonesia.
2. **Jangan langsung membangun.** Bahas arah dulu, minta persetujuan, baru
   kerjakan. Ini permintaan eksplisit pemilik situs.
3. **Nol aturan `:hover`.** Bukan preferensi — keharusan. Pemilik situs tidak
   punya mouse. Setiap kali menyentuh CSS, jalankan `grep -c ':hover'` dan
   pastikan hasilnya **0**.
4. **Fase sekarang: memperindah, bukan menambah.** Tidak ada konten baru,
   bagian baru, atau fitur baru kecuali diminta.


---


## 1. Apa ini


Kartu nama digital seorang **Visual / Concept Designer**. Bukan portofolio
lengkap, bukan etalase jasa.


- **Tidak ada** unduhan CV, daftar harga, atau formulir brief.
- **Nama tampil `Nuit-Encre`.** Pemilik situs sengaja tidak memakai nama
  pribadi. Jangan menambahkannya.
- **Nuit Encre adalah induk.** [Concept Archive](https://concept-archive.pages.dev/)
  adalah salah satu karya **di dalamnya**, bukan saudaranya.


### Tiga aturan yang mengikat


**Aturan 1 — Mobile-first, harfiah.** Dirancang pada 360px lebih dulu. Layar
besar hanyalah pelebaran. Sasaran sentuh minimal 44px.


**Aturan 2 — Jangan menyerupai Concept Archive.** Situs induk harus punya
suara sendiri.


**Aturan 3 — Terinspirasi huyml.co, bukan menirunya.** Ambil sikapnya: berani,
tipografi besar, metadata teknis, ruang kosong. Jangan ambil bentuknya.


---


## 2. Pemisahan dari Concept Archive


| Unsur | Concept Archive | Nuit-Encre |
|---|---|---|
| Latar | Kertas hangat terang | **Hitam** `#000000` |
| Aksen | Cinnabar `#C8402F` | **Tidak ada warna.** Aksen = inversi blok putih–hitam |
| Aksara | 中文 sebagai tekstur | **Dilepas** — tanpa CJK |
| Huruf | Serif kontras tinggi | **Grotesque padat**, serif hanya sesekali |
| Penyusun | Taksonomi `01—06` | **Indeks tiga digit** `008 / 001` |
| Suasana | Galeri yang tenang | Ruang gelap, sinyal, laboratorium |


Motif `夜墨` **dibuang** — itu justru penyebab keduanya terasa satu benda.


**Kenapa monokrom penuh.** Archive sudah punya satu aksen warna yang kuat.
Cara paling tegas berdiri terpisah bukan memilih warna lain, melainkan
**menolak warna sama sekali**.


---


## 3. Susunan halaman


Satu halaman, lima bagian:


| | Bagian | Isi |
|---|---|---|
| `001` | Pembuka | Wordmark besar, status, jam Jakarta langsung |
| `002` | Karya | Concept Archive — satu-satunya yang selesai, plus ceritanya |
| `003` | Studi | 3 studi visual — rencana akhir, seluruhnya tayang; galeri geser dengan snap ke tengah |
| `004` | Praktik | Dua paragraf posisi |
| `005` | Kontak | Satu alamat, blok inversi |


Bilah bawah tetap: nama · indeks bagian berjalan · tombol menu.


---


## 4. Tumpukan teknis


**HTML + CSS + JS murni. Nol dependensi. Tanpa build step.** Simpan seperti
itu — pemilik situs harus bisa mengunggah berkas lewat antarmuka web GitHub
dari ponsel dan langsung melihat hasilnya.


```
index.html            markup, meta OG, kredit
assets/css/style.css  seluruh gaya
assets/js/data.js     SELURUH ISI — ubah situs dari sini
assets/js/main.js     animasi, galeri, jam
assets/fonts/         Apfel Grotezk (woff2) + lisensi OFL
assets/img/           sampul, studi, kartu berbagi
tools/                pembangkit kartu berbagi + penyiap gambar studi
```


### Palet


```
--void   #000000   latar
--ash    #0A0A0A   permukaan
--line   #1F1F1F   garis
--line2  #2E2E2E   garis aktif
--dim    #6E6E6E   metadata
--soft   #A8A8A8   teks sekunder
--pure   #FAFAFA   teks utama & blok inversi
--e      cubic-bezier(.22,1,.36,1)
```


### Tipografi — satu ukuran, satu huruf


| Peran | Huruf | Ukuran |
|---|---|---|
| Display | **Apfel Grotezk Fett** 700 | ≥26px |
| Badan | Inter 400 | 15px |
| Meta | JetBrains Mono | 10–11px |
| Aksen | Instrument Serif italic | jarang |


**Apfel Grotezk** oleh Luigi Gorlero / [Collletttivo](https://www.collletttivo.it/typefaces/apfel-grotezk),
**SIL OFL 1.1**, di-hosting sendiri di `assets/fonts/`. Kreditnya **wajib
tetap ada** di bagian kolofon — itu syarat lisensi, bukan hiasan.


Serif di dalam Apfel 700: `font-size:1.06em; letter-spacing:.005em`.
**Jangan pernah ditebalkan.**


---


## 5. Void — latar hero


Hero semula menyisakan 58% layar kosong. Ruang itu tidak ditambal, melainkan
**dijadikan karya**: tinta yang dibangkitkan acak tiap kunjungan, hanya
tersingkap oleh cahaya yang mengikuti jari.


### Bentuk tinta: dari debu ke serat


Melewati dua perbaikan besar, keduanya dari keluhan sama — tinta tidak terbaca
sebagai **satu massa cair**.


**Ronde 1** — blob bulat tersebar terbaca sebagai *debu mengambang*. Diganti
**untai mengalir**: 4–6 filamen berjalan simpul demi simpul.


**Ronde 2** — untai saja terlalu bersih. Tiap simpul induk kini berpeluang
**menumbuhkan cabang** — lebih pendek, lebih tipis, meliuk lebih liar.


| | sebelum | filamen | + cabang (kini) |
|---|---|---|---|
| Simpul | 90 | 103 | **230** |
| Simpul tak bersentuhan | 53% | 5% | **13%** |
| Cakupan tinggi hero | 70% | 94% | **96%** |


**Sudah dicoba dan ditolak — jangan diulang:**


- **Cabang bertingkat** (`maxGen ≥ 2`) — simpul meledak ke 612, celah melonjak
  ke 42%. Kembali jadi debu. Percabangan dikunci **satu tingkat**.
- **Memperbanyak percikan** — hanya menambah titik mengambang. Serat harus
  **menempel** pada untainya.
- **Filamen terlalu tebal** — jadi beberapa cacing besar, cakupan turun ke 83%.


**Syarat kecairan:** jari-jari ÷ langkah **≥ 1,5**.


### Anggaran kecerahan


Kanvas memakai `globalCompositeOperation = 'lighter'`, jadi tumpukan simpul
menaikkan terang **secara non-linier**. Setiap kali jumlah simpul berubah, dua
titik gradien **wajib** disetel ulang. Sasaran rata-rata **0,85–0,93**.


| Simpul | Titik gradien | Rata-rata |
|---|---|---|
| 103 | `.78` / `.30` | 0,85 |
| **230** | **`.58` / `.22`** | **0,88** |


Tidak ada peramban headless di sini — kecerahan hanya bisa **disimulasikan**.
Mata di ponsel asli tetap pemutus akhir.


---


## 6. Layar pembuka


> **Pembuka = tinta bergerak. Hero = tinta mengendap.**
> Satu cerita: ditumpahkan, lalu diam.


| Waktu | Kejadian |
|---|---|
| 0–0,4s | Setetes tinta putih jatuh, memanjang makin cepat |
| 0,4–1,2s | Mendarat, merembes **naik**; tepinya bergelombang |
| ~0,7s | **Sulur berserat** menjalar mendahului rembesan |
| 1,26–2,1s | Layar putih **dibelah tiga**, didorong keluar bergantian |
| 2,16s | Hero tersingkap |


Tetapan: `DROP=420, FILL_A=400, FILL_B=1200, CUT=1260, END=2160, OVER=60,
BANDS=3`. Pita keluar ke-`i` mulai di `CUT + i*110`.


**Kilat putihnya sengaja putih penuh, tidak diredam** — permintaan eksplisit
pemilik situs, "biar dramatis". Jangan dilembutkan.


### Detail yang menentukan


- **Teks tetap terbaca** lewat `mix-blend-mode:difference` — otomatis membalik
  jadi hitam saat tinta putih lewat, tanpa logika tambahan.
- **Tinta dilebihkan 60px** (`OVER`) karena gelombang tepi menyisakan celah
  hitam di puncak.
- **Boot ditutup di 2,16s**, sesudah panel terakhir bersih di 2,1s. Kalau
  durasi dorongan diubah, angka ini wajib ikut diperiksa.


### Lima jalan keluar — semua wajib menyalakan `body.ready`


Kalau salah satu terlewat, situsnya **layar kosong selamanya**:


1. `.boot.cut` pada waktu normal
2. `prefers-reduced-motion` → langsung
3. `getContext` mengembalikan `null` → adegan dilewati
4. `<noscript>`
5. **Failsafe 4000ms**


---


## 7. Gambar studi


**Semua gambar studi wajib buatan pemilik situs sendiri.** Placeholder AI yang
tersisa boleh ada sementara, tapi **jangan pernah menuliskan klaim kepemilikan
orang pertama** atas gambar yang bukan buatannya. Ini garis tegas.


Pemilik situs mendesain sendiri di **aplikasi Canva di ponsel**, kanvas kosong
tanpa templat. Studi `001 Wordmark / Terpotong` adalah yang pertama diganti;
`002 Kisi / Dimakan` menyusul dari `st-09.png`, lalu `003 Gestur / Bersilang`
melengkapi rangkaian dari `st-10.png` (2026-08-25).


### Spesifikasi


| | |
|---|---|
| Kanvas | **1200 × 1600** (3:4, `object-fit:cover`) |
| Warna | **Hitam-putih saja** — CSS memaksa `grayscale(1)` |
| Kartu tidak aktif | `brightness .6` — butuh elemen terang |
| Zona bebas | **kiri atas ±115×75px** dipakai lencana `.gs__i` |
| Ground / ink | `#0A0A0A` / `#FAFAFA` |


**Rencana: 3 studi kuat, bukan 8.** Lebih baik sedikit tapi benar-benar miliknya.


### Cara mengganti


Kalau punya akses berkas: `python3 tools/add-study.py <gambar> <slot>` —
otomatis potong tengah 3:4, ubah ukuran, hasilkan `.jpg` + `.webp`, dan
memperingatkan kalau terlalu gelap atau menabrak zona lencana.


Kalau tidak: pemilik situs mengunggah lewat web GitHub. Beri nama persis
`st-0N.jpg` **dan** `st-0N.webp` (boleh PNG yang sama diunggah dua kali —
peramban mengenali gambar dari isinya, bukan namanya).


### Kontrak `pic()`


`assets/js/main.js` menerima dua bentuk:


- **Slug** (`'st-02'`) → pasangan `<source>` webp + `<img>` jpg
- **Nama berekstensi** (`'foto.png'`) → berkas apa adanya, tanpa varian webp


Yang kedua sengaja ada supaya gambar bisa diunggah langsung tanpa diproses.


---


## 8. Kartu berbagi


`assets/img/og-cover.jpg` — 1200×630, muncul saat link dikirim ke WhatsApp,
X, atau LinkedIn. Dibangkitkan oleh `tools/make-og-card.py`; petunjuk lengkap
di `tools/README.md`.


**Pekerjaan ini sudah selesai — jangan disetel ulang tanpa diminta.**
Versi prosedural (memakai `grow()` dari `main.js`) **sudah dicoba dan
ditolak**: parameternya disetel untuk kanvas potret dan menghasilkan bentuk
seperti petir di kanvas lanskap.


URL OG **wajib absolut** — WhatsApp, X, dan LinkedIn tidak me-resolve path
relatif, kartunya jadi kosong.


---


## 9. Satu bahasa


Situs ini **hanya Bahasa Indonesia**, tanpa pengganti bahasa. Tekstur
multibahasa adalah salah satu hal yang dulu membuatnya terbaca sebagai tiruan
Concept Archive.


Konsekuensi tata letak: label lokasi ditulis **`INDONESIA`**, bukan `IDN`.
Singkatan tiga huruf di pojok adalah konvensi kuat untuk tombol bahasa —
pemilik situs sendiri sempat mengetuknya dan mengira rusak.


---


## 10. Batasan yang sudah disepakati — jangan ditawar ulang


| Hal | Status |
|---|---|
| **Email `halo@nuit-encre.studio`** | **Dummy, dan tetap begitu.** Anggaran domain dipakai proyek lain. **Berhenti menandainya sebagai kekurangan.** |
| **Satu karya selesai** | Disengaja. `practice[]` sudah mengakuinya terbuka. |
| **Tanpa domain sendiri** | Disengaja. Situs harus terasa selesai apa adanya. |
| **Layar pembuka** | Sudah diterima. Jangan dirancang ulang tanpa diminta. |
| **Massa tinta** | Sudah pas. Jangan disetel ulang tanpa diminta. |
| **Judul tinggi di hero** | Dikoreksi dua kali. `.hero__mid` pakai `margin-top:clamp(24px,16vh,150px)` — **jangan** `auto`. |


---


## 11. Referensi


**https://www.isabelmoranta.com/** — model paling relevan. Punya kendala sama
(sedikit karya, harus terasa besar) dan menyelesaikannya lewat **tipografi
sebagai peristiwa, bukan wadah**.


Yang **diambil**: prinsipnya saja. Yang **ditolak**: huruf berlubang dan
metadata dalam kurung — dua-duanya sudah jadi tren awwwards 2026 dan akan
membuat situs ini terbaca sebagai pengekor.


**https://huyml.co/** — acuan visual. Metadata di sudut, navigasi bernomor,
judul display raksasa, galeri seret per tahun. 19 karya di sana vs 1 di sini,
jadi galerinya dialihfungsikan untuk **artefak**.


**https://concept-archive.pages.dev/** — proyek anak. Kata kerja praktiknya:
**观察** Amati · **转译** Terjemahkan · **重构** Susun ulang.


---


## 12. Daftar periksa sebelum mengirim perubahan


```bash
grep -c ':hover' assets/css/style.css        # wajib 0
node --check assets/js/main.js
node --check assets/js/data.js
python3 -c "s=open('assets/css/style.css').read(); print(s.count('{'),s.count('}'))"
python3 -c "import xml.dom.minidom as m; m.parse('sitemap.xml')"
```


Keseimbangan tag HTML: himpunan elemen kosong **harus memuat `i`**.
Memuat `data.js` di node butuh sisipan `global.window = {}`.


---


## 13. Catatan untuk agen berikutnya


**Sesi sebelumnya tidak bisa mengakses GitHub.** `git push`, `git fetch`, dan
`gh` semuanya gagal dengan `gnutls_handshake() failed`. Blokirnya khusus per
host — pypi.org bisa, github.com tidak. Cermin CDN juga bukan jalan keluar.


Akibatnya seluruh pekerjaan ronde-ronde akhir dikirim lewat **antarmuka web
GitHub di ponsel pemilik situs**:


- unggah → `https://github.com/tribeg869-techw/Nuit-Encre-/upload/<branch>/<dir>`
- sunting → `https://github.com/tribeg869-techw/Nuit-Encre-/edit/<branch>/<path>`


**Periksa dulu apakah kamu bisa push.** Kalau bisa, abaikan seluruh bagian ini.
*(Ronde 2026-08-25: agen **bisa** push — branch sementara dites lalu
dihapus. Rute manual di bawah kini hanya cadangan.)*
Kalau tidak, pola di atas terbukti jalan — tapi hemat permintaanmu: pemilik
situs mengetik di ponsel dan gugup menyentuh kode. Utamakan rute tanpa
penyuntingan; kalau terpaksa, satu berkas dalam satu waktu, `data.js` dulu
(teks polos, tanpa backtick) sebelum `main.js`.


**Trik mendeteksi berkas biner di Pages:** `fetch_page` mengembalikan **500
kalau berkasnya ada** (alatnya gagal membaca biner) dan **halaman 404** kalau
tidak ada. Bandingkan dengan berkas yang pasti ada untuk memastikan.


### Studi yang sedang berjalan (pembaruan 2026-08-25)

Renomasi: 8 slot lama (7 placeholder AI + wordmark) dirapikan jadi **3 slot**.
Nomor lama 007 (wordmark) kini 001. Semua entri placeholder AI dihapus dari
`data.js` beserta berkasnya (`st-03` s.d. `st-08`; berkas `st-01` lama diganti
varian wordmark).

Status akhir: **3/3 studi tayang.**

| No | Judul | Status |
|---|---|---|
| 001 | Wordmark / Terpotong | Tayang — diproses dari sumber `st-02-wordmark.png` |
| 002 | Kisi / Dimakan | Tayang — diproses dari `st-09.png` (diunggah pemilik) |
| 003 | Gestur / Bersilang | Tayang — diproses dari `st-10.png` (diunggah pemilik) |

Sumber `st-10.png` diproses dengan
`python3 tools/add-study.py assets/img/st-10.png 3` menjadi pasangan
`st-03.jpg` + `st-03.webp`; alt dan catatannya disetujui pemilik sebelum tayang.


### Utang kosmetik yang diketahui

- **001 Wordmark:** varian jpg+webp asli dibuat (2026-08-25) lewat
  `tools/add-study.py` dari sumber `st-02-wordmark.png`. Keputusan serah
  terima 2026-08-25: berkas yang ada **tayang apa adanya** sebagai 001 —
  ekspor ulang tidak lagi diwajibkan. Referensi ukur lama: zona lencana kiri
  atas bersih (0% piksel terang); yang pernah disebut masalah desain adalah
  garis diagonal + gagang kecil di bagian atas. `tools/kanvas-panduan.png`
  tetap tersedia sebagai lapisan bantu Canva kalau pemilik ingin mengekspor
  ulang suatu saat.
- **002 Kisi / Dimakan:** karya memenuhi kanvas hingga tepi, jadi lencana
  `.gs__i` tumpang di atas garis kisi. Terbaca karena lencananya blok putih
  opak — bukan cacat, dicatat biar tidak "diperbaiki" tanpa diminta.
