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

  /* ---- 002 · KARYA ------------------------------------------------- */
  work: {
    no:    '001',
    title: 'Concept Archive',
    kind:  'Self-initiated',
    year:  '2026',
    url:   'https://concept-archive.pages.dev/',
    cover: 'archive-cover',
    coverAlt: 'Tangkapan layar situs Concept Archive: tata letak arsip visual di atas latar kertas terang.',
    lede:  'Arsip studi visual mandiri tentang bentuk, ruang, tipografi, dan atmosfer.',
    facts: [
      { k: 'Peran',   v: 'Desain & Pengembangan' },
      { k: 'Tahun',   v: '2026' },
      { k: 'Jenis',   v: 'Arsip Visual' },
      { k: 'Status',  v: 'Tayang' }
    ],
    story: [
      'Berawal dari satu keresahan: terlalu banyak karya dibuat untuk menarik perhatian, bukan untuk ditinggali. Aku ingin tahu apa jadinya kalau sebuah situs sengaja dibuat pelan.',
      'Palet dikunci sejak awal — kertas, tinta, dan satu merah. Merah itu tidak boleh muncul lebih dari beberapa kali di seluruh halaman. Begitu ia sering, ia berhenti berarti.',
      'Bagian yang paling lama dikerjakan justru yang paling tidak terlihat: jarak. Berapa napas antara satu bagian dan bagian berikutnya, kapan pembaca boleh berhenti.',
      'Yang dipelajari: menahan diri jauh lebih sulit daripada menambah.'
    ]
  },

  workMore: {
    no:    '002',
    title: 'Ink Chaos',
    kind:  'Texture Study',
    year:  '2026',
    url:   'https://ink-chaos.pages.dev/',
    cover: 'ink-chaos-cover.jpg',
    coverAlt: 'Komposisi tekstur tinta hitam yang menyiprat dan merembes di atas kertas krem.',
    lede:  'Kumpulan tekstur tinta manual untuk karya yang lebih berani, kasar, dan tidak terlalu rapi.',
    facts: [
      { k: 'Peran',   v: 'Konsep & Desain' },
      { k: 'Tahun',   v: '2026' },
      { k: 'Jenis',   v: 'Texture Pack' },
      { k: 'Status',  v: 'Tayang' }
    ],
    story: [
      'Ink Chaos berangkat dari ketertarikan pada tinta yang tidak bisa sepenuhnya dikendalikan.',
      'Percikan, rembesan, dan sapuan dibiarkan menyimpan jejak tangan—bukan disamarkan menjadi noise digital.'
    ]
  },

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
      note:'Ledakan tinta yang dipertemukan dengan gestur, percikan, dan jejak garis manual.' }
  ],

  /* ---- 004 · PRAKTIK ------------------------------------------------ */
  practice: [
    'Aku bekerja dengan bentuk, ruang, dan atmosfer. Sebagian besar waktuku habis bukan untuk membuat, melainkan untuk mengamati — sampai sebuah gagasan cukup jelas untuk diberi wujud.',
    'Halaman ini bukan etalase. Karya yang benar-benar selesai baru dua. Selebihnya adalah studi: sebagian akan tumbuh, sebagian berhenti di sini, dan itu tidak apa-apa.'
  ],

  practiceIndex: [
    { no: '01', title: 'Mengamati', note: 'Membaca bentuk sebelum memberinya nama.' },
    { no: '02', title: 'Menerjemahkan', note: 'Memindahkan gagasan dari satu bahasa visual ke bahasa lain.' },
    { no: '03', title: 'Menyusun ulang', note: 'Menguji kembali apa yang sudah dianggap selesai.' }
  ]
};
