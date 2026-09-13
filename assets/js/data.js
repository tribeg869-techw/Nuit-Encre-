/* ==========================================================================
   NUIT-ENCRE — sumber data tunggal
   Ubah isi situs dari berkas ini saja.
   ========================================================================== */

window.NE = {

  meta: {
    name:    'NUIT-ENCRE',
    role:    'Visual / Concept Designer',
    based:   'Indonesia',
    email:   'halo@nuit-encre.studio',
    status:  'Tersedia untuk proyek',
    since:   '2024'
  },

  /* ---- 002 · KARYA — INDEKS ------------------------------------------
     Satu array, urut nomor. Bagian 002 merender: no · title · kind ·
     url (domain) · role · year, dan gambar di `images`.

     images: slug tanpa ekstensi ('bara-cover') → pasangan .webp + .jpg
             nama berekstensi ('ink-chaos-cover.jpg') → berkas apa adanya.
             Maksimal 4 gambar per karya; slot 1–4 punya lebar berbeda
             (tata letak referensi). Baru ada 1 sampul per karya —
             tinggal tambahkan nama berkas untuk mengisi slot 2–4.

     lede & story SENGAJA DISIMPAN walau tidak dirender lagi
     (keputusan 2026-09-13: baris hanya menampilkan gambar, seperti
     referensi). Teksnya tetap di sini agar bisa dipakai kembali. */
  works: [
    {
      no:    '001',
      title: 'Concept Archive',
      kind:  'Self-initiated',
      role:  'Desain & Pengembangan',
      year:  '2026',
      url:   'https://concept-archive.pages.dev/',
      images: ['archive-cover'],
      alt:   'Tangkapan layar situs Concept Archive: tata letak arsip visual di atas latar kertas terang.',
      lede:  'Arsip studi visual mandiri tentang bentuk, ruang, tipografi, dan atmosfer.',
      story: [
        'Berawal dari satu keresahan: terlalu banyak karya dibuat untuk menarik perhatian, bukan untuk ditinggali. Aku ingin tahu apa jadinya kalau sebuah situs sengaja dibuat pelan.',
        'Palet dikunci sejak awal — kertas, tinta, dan satu merah. Merah itu tidak boleh muncul lebih dari beberapa kali di seluruh halaman. Begitu ia sering, ia berhenti berarti.',
        'Bagian yang paling lama dikerjakan justru yang paling tidak terlihat: jarak. Berapa napas antara satu bagian dan bagian berikutnya, kapan pembaca boleh berhenti.',
        'Yang dipelajari: menahan diri jauh lebih sulit daripada menambah.'
      ]
    },
    {
      no:    '002',
      title: 'Ink Chaos',
      kind:  'Texture Study',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://ink-chaos.pages.dev/',
      images: ['ink-chaos-cover.jpg'],
      alt:   'Komposisi tekstur tinta hitam yang menyiprat dan merembes di atas kertas krem.',
      lede:  'Kumpulan tekstur tinta manual untuk karya yang lebih berani, kasar, dan tidak terlalu rapi.',
      story: [
        'Ink Chaos berangkat dari ketertarikan pada tinta yang tidak bisa sepenuhnya dikendalikan.',
        'Percikan, rembesan, dan sapuan dibiarkan menyimpan jejak tangan—bukan disamarkan menjadi noise digital.'
      ]
    },
    {
      no:    '003',
      title: 'Lexier',
      kind:  'Studio Tipografi Eksperimental',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://lexier.pages.dev/',
      images: ['lexier-cover'],
      alt:   'Poster tipografis hitam-putih: huruf display raksasa dipecah dan dipotong melampaui tepi, berdiri di atas kisi garis rambut tipis di kertas bertekstur.',
      lede:  'Studio tipografi eksperimental — huruf sebagai bahan mentah, bukan alat.',
      story: [
        'Lexier lahir dari satu pertanyaan: kenapa setiap huruf harus duduk rapi di baris yang sama? Di studio ini huruf diperlakukan sebagai bahan mentah — kolom, counter, dan baseline dibelah lalu ditata ulang sampai bersuara.',
        'Manifestonya satu baris: hitam-putih bukan keterbatasan, melainkan disiplin yang membuat satu warna lain terasa keras. Salah dengan niat lebih jujur daripada benar tapi bosan.'
      ]
    },
    {
      no:    '004',
      title: 'Zestpop',
      kind:  'Concept Beverage · Sticky Scroll',
      role:  'Konsep, Desain & Pengembangan',
      year:  '2026',
      url:   'https://zestpop.pages.dev/',
      images: ['zestpop-cover'],
      alt:   'Kaleng seltzer Zestpop dengan embun dingin, dikelilingi jeruk, kelapa muda terbelah, dan manggis terbuka di atas latar krem.',
      lede:  'Brand konsep seltzer rasa buah lokal di halaman yang ikut berkarbonasi — sticky scroll, gelembung yang ngikut jari, dan tab yang bisa dicabut.',
      story: [
        'Zestpop berangkat dari satu pertanyaan: kalau minumannya berkarbonasi, kenapa halamannya tidak ikut? Seltzer rasa buah lokal — jeruk, kelapa, manggis — dengan halaman yang ikut berkarbonasi: sticky scroll, gelembung yang ngikut jari, dan tab kaleng yang bisa dicabut.',
        'Ini percobaan sticky scroll pertama. Eksekusinya belum semulus referensi yang kagumi, tapi tujuannya halaman yang bergerak seperti minuman: disentuh, dia bergeser. Rasanya sudah ada; teknik yang masih dilatih.'
      ]
    },
    {
      no:    '005',
      title: 'Vellichor',
      kind:  'Concept Bookstore',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://vellichor-2u7.pages.dev/',
      images: ['vellichor-cover'],
      alt:   'Interior toko buku tua monokrom: rak kayu tinggi penuh buku antik, satu berkas cahaya menembus gelap, meja baca kosong di depan.',
      lede:  'Perpustakaan fiksi est. 1883 — tempat cerita-cerita yang dilupakan disimpan, dan satu pembaca pada satu waktu.',
      story: [
        'Vellichor adalah kata yang hampir tak ada: kerinduan aneh pada toko buku bekas — waktu yang menempel di antara halaman, milik pembaca-pembaca sebelummu. Kata itu menjadi situs: perpustakaan fiksi est. 1883, dibuka dengan undangan, satu pembaca pada satu waktu.',
        'Strukturnya seperti buku — Babak I sampai IV, epilog sebagai daftar bahan: kertas gilingan 1897, kulit kambing hitam, emas 23 karat, dan asap pembaca sebelumnya. Yang dicari bukan jawabannya, melainkan tempat di mana jawaban itu pernah disimpan.'
      ]
    },
    {
      no:    '006',
      title: 'Élan',
      kind:  'Fashion Editorial',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://elan-fashion-editorial.pages.dev/',
      images: ['elan-cover'],
      alt:   'Kolase editorial Élan: potret monokrom besar dengan close-up mata bermakeup, dua frame model berjaket kamuflase, dan strip palet warna di tepi kiri.',
      lede:  'Fashion editorial Issue No. 01 — identitas, kontras, dan ekspresi diri yang tak kenal takut. Bukan tren, tapi suasana.',
      story: [
        'Élan dibuka dengan satu baris: "Style is not what you wear — it is how you arrive." Issue No. 01 adalah studi editorial monokrom — utility, gerak, diam — dibangun dari insting, dipakai dengan niat.',
        'Detail yang bicara: eye study, gestur kulit, tekstur jaket. "Not a trend. A mood." — halaman fashion yang tidak mengejar musim, tapi membangun sikap.'
      ]
    },
    {
      no:    '007',
      title: 'BARA',
      kind:  'Object Study',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://bara-object-01.pages.dev/',
      images: ['bara-cover'],
      alt:   'Makro ekstrem tanah liat keramik hitam arang berbentuk lingkaran berukir, atmosfer tungku gelap, cahaya lembut memperlihatkan tekstur matte.',
      lede:  'Object study 01 — wewangian keramik hitam arang dengan saluran tembaga, dibentuk oleh panas.',
      story: [
        'BARA Object 01: wewangian keramik dari tanah liat hitam arang dengan saluran tembaga, di atas rak tungku gelap. Hampir tanpa kata di halamannya — satu macro, satu final, dan satu baris: SHAPED BY HEAT.',
        'Pelajaran tentang menahan diri: benda bisa disajikan tanpa dijelaskan. Panas, bahan, waktu — sisanya dibiarkan untuk penonton.'
      ]
    },
    {
      no:    '008',
      title: 'OCULAR',
      kind:  'Sci-fi Product Concept',
      role:  'Konsep & Desain',
      year:  '2026',
      url:   'https://ocular-45z.pages.dev/',
      images: ['ocular-cover'],
      alt:   'Makro mata sibernetik: iris implen LED merah dengan tekstur serat biru, wordmark serif OCULAR dan tagline "Vision. Redefined."',
      lede:  'Situs konsep sinematik tentang teknologi mata — mata sibernetik, lensa kaca, visor sci-fi. "Vision. Redefined."',
      story: [
        'OCULAR adalah konsep sinematik tentang teknologi mata: macro mata sibernetik, lensa kaca abstrak 3D, dan visor sci-fi high-fashion. Tiga objek yang disajikan seperti benda laboratorium.',
        'Halamannya bergerak seperti film: gelap, presisi, detailnya dibuka lewat zoom. "Vision. Redefined." — bukan penjelasan, tapi janji.'
      ]
    }
  ],

  /* ---- 003 · STUDI --------------------------------------------------
     Ketuk kartu untuk membuka catatan. Tanpa hover — ramah layar sentuh.
  ------------------------------------------------------------------- */
  /* Rencana akhir: 3 studi kuat, bukan 8 — semua buatan pemilik.
     001 Wordmark (st-02-wordmark.png) · 002 Kisi / Dimakan (st-09.png)
     · 003 Gestur / Bersilang (st-10.png). */
  studies: [
    { no:'001', title:'Wordmark / Terpotong',  tag:'IDENTITY',         img:'st-01',
      alt:'Wordmark NUIT ENCRE dalam huruf tebal, diperbesar sampai melampaui bingkai sehingga sebagian huruf terpotong.',
      note:'Nama sendiri diperlakukan sebagai bahan, bukan tanda tangan. Diperbesar sampai bingkai tidak lagi sanggup memuatnya.' },
    { no:'002', title:'Kisi / Dimakan',        tag:'GRID',             img:'st-02',
      alt:'Kisi garis putih di atas latar hitam; di beberapa tempat garisnya putus dan sel-selnya lenyap, seolah dimakan.',
      note:'Yang hilang tidak diganti. Kisi yang rusak dibiarkan begitu.' },
    { no:'003', title:'Gestur / Bersilang',    tag:'GESTURE',          img:'st-03',
      alt:'Komposisi vertikal goresan tinta hitam dan abu-abu di atas bidang putih; sapuan tajam saling bersilang dengan satu lingkar terbuka di bagian kanan atas.',
      note:'Beberapa sapuan bertemu tanpa dipaksa menjadi lambang. Tumpang tindih dan jedanya dibiarkan menyimpan gerak.' },
    { no:'004', title:'Ink Chaos / Simetri',    tag:'INK',              img:'st-04',
      alt:'Ledakan tinta hitam dan putih yang simetris, dikelilingi sapuan tangan, percikan, dan jejak garis manual.',
      note:'Ledakan tinta yang dipertemukan dengan gestur, percikan, dan jejak garis manual.' },
    { no:'005', title:'Poster / Kosong',        tag:'LEXIER',           img:'st-05',
      alt:'Poster LEXIER: huruf DESAIN raksasa di atas kertas hangat, coretan miring dicoret garis oranye, kolom teks dicoret, kata KOSONG berkontur, dan strip alfabet dengan satu aksen oranye.',
      note:'Poster untuk studio Lexier: huruf DESAIN dipecah, coretan dicoret, dan satu oranye yang hanya muncul sekali — disiplin "kosong" yang membuat satu aksen bersuara keras.' },
    { no:'006', title:'Kaligrafi / Tegak',      tag:'LETTERFORM',       img:'st-06',
      alt:'Tulisan kaligrafi tinta "plume" disusun vertikal: sapuan kuas tebal dan kering, percikan, dan satu spiral besar di tengah, di atas kertas hangat.',
      note:'Kata "plume" berdiri tegak — sapuan kuas cepat, percikan, dan satu spiral besar dibiarkan apa adanya.' }
  ],

  /* ---- 004 · PRAKTIK ------------------------------------------------ */
  practice: [
    'Aku bekerja dengan bentuk, ruang, dan atmosfer. Sebagian besar waktuku habis bukan untuk membuat, melainkan untuk mengamati — sampai sebuah gagasan cukup jelas untuk diberi wujud.',
    'Halaman ini bukan etalase. Karya yang benar-benar selesai baru delapan. Selebihnya adalah studi: sebagian akan tumbuh, sebagian berhenti di sini, dan itu tidak apa-apa.'
  ],

  practiceIndex: [
    { no: '01', title: 'Mengamati', note: 'Membaca bentuk sebelum memberinya nama.' },
    { no: '02', title: 'Menerjemahkan', note: 'Memindahkan gagasan dari satu bahasa visual ke bahasa lain.' },
    { no: '03', title: 'Menyusun ulang', note: 'Menguji kembali apa yang sudah dianggap selesai.' }
  ]
};
