/* ==========================================================================
   NUIT-ENCRE — interaksi (mobile first, tanpa hover)
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D  = window.NE;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Kontrak pic(): slug ('st-02') → pasangan webp+jpg;
     nama berekstensi ('foto.png') → berkas apa adanya, tanpa varian webp. */
  const pic = (n, alt, eager = false) => {
    const loading = eager ? 'eager' : 'lazy';
    const priority = eager ? ' fetchpriority="high"' : '';
    return /\.[a-z0-9]{2,4}$/i.test(n)
      ? `<img src="assets/img/${n}" alt="${alt}" draggable="false" loading="${loading}" decoding="async"${priority}>`
      : `<picture>
           <source srcset="assets/img/${n}.webp" type="image/webp">
           <img src="assets/img/${n}.jpg" alt="${alt}" draggable="false" loading="${loading}" decoding="async"${priority}>
         </picture>`;
  };

  /* ---------- 002 · KARYA — INDEKS (daftar melar) ----------
     Acuan: guillaumecolombel.fr/works. Baris = <a> ke situs karya.
     Wadah gambar dibuka CSS (grid-template-rows 0fr→1fr) lewat
     :hover di perangkat berkursor dan .is-open yang dipasang di sini.

     Kontrak sentuh (keputusan pemilik 2026-09-13):
       • ketuk baris tertutup  → buka (tautan DIBATALKAN)
       • ketuk baris terbuka   → ikuti tautan (kunjungi situs)
       • ketuk baris lain      → yang lama menutup, yang baru membuka
     Kursor: hover membuka, keluar dari daftar menutup; klik = kunjungi.
     Keyboard: fokus (Tab) membuka, Enter = kunjungi.
     Masuk layar: judul flip per huruf, garis memanjang, baris muncul
     berurutan, baris pertama terbuka otomatis (persis referensi). */
  const works = D.works;
  const idxEl = $('#idx');
  const listEl = $('#work');
  const hint = $('#idxHint');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const host = u => u.replace(/^https?:\/\//, '').replace(/\/$/, '');

  $('#workCount').textContent = String(works.length).padStart(2, '0');

  /* <div> di dalam <a> sah: <a> berkonten transparan di konteks blok */
  listEl.innerHTML = works.map((w, i) => `
    <a class="row" href="${w.url}" target="_blank" rel="noopener" data-i="${i}">
      <div class="row__meta">
        <span class="row__ttl"><span class="row__no">${w.no}</span><span class="row__name">${w.title}</span></span>
        <span class="row__kind">${w.kind}</span>
        <span class="row__url">${host(w.url)}</span>
        <span class="row__role">${w.role}</span>
        <span class="row__year">${w.year}</span>
      </div>
      <div class="row__imgs" aria-hidden="true"><div>
        ${w.images.slice(0, 4).map((img, k) => `<span class="row__as row__as--${k + 1}">${pic(img, k === 0 ? w.alt : '', i === 0 && k === 0)}</span>`).join('')}
      </div></div>
    </a>`).join('');
  const rows = $$('.row', listEl);
  let openRow = null;

  /* Kompensasi tinggi untuk peramban TANPA scroll anchoring (Safari/iOS):
     baris yang menutup di ATAS viewport mengurangi tinggi dokumen
     200–350px, dan tanpa anchoring konten di bawah jari ikut melompat
     naik. Selama transisi tutup (1s) tinggi baris lama dipantau tiap
     frame dan selisihnya dikembalikan ke scrollY. Chrome/Firefox punya
     anchoring native — di sana blok ini tidak pernah jalan. */
  const noAnchor = !(window.CSS && CSS.supports && CSS.supports('overflow-anchor', 'auto'));
  let compRaf = 0;
  function compensate(closing, opening) {
    if (!noAnchor || !closing) return;
    cancelAnimationFrame(compRaf);
    let prev = closing.getBoundingClientRect().height;
    const t0 = performance.now();
    const step = () => {
      const r = closing.getBoundingClientRect();
      const above = r.bottom < (opening ? opening.getBoundingClientRect().top : 0);
      const d = r.height - prev; prev = r.height;
      if (above && d < 0 && scrollY > 0) scrollBy(0, d);
      if (performance.now() - t0 < 1100) compRaf = requestAnimationFrame(step);
    };
    compRaf = requestAnimationFrame(step);
  }

  function setOpen(row) {
    if (openRow === row) return;
    const prev = openRow;
    if (prev) prev.classList.remove('is-open');
    openRow = row;
    if (row) { row.classList.add('is-open'); row.dataset.t = performance.now(); }
    compensate(prev, row);
  }

  /* modalitas masukan terakhir: ketukan juga memberi fokus (Android),
     jadi "fokus membuka" hanya boleh berlaku untuk keyboard */
  let lastPointer = fine.matches ? 'mouse' : 'touch';
  let byKey = false;
  addEventListener('pointerdown', e => { lastPointer = e.pointerType || lastPointer; byKey = false; }, { passive: true, capture: true });
  addEventListener('keydown', () => { byKey = true; }, { passive: true, capture: true });

  rows.forEach(row => {
    row.addEventListener('click', e => {
      if (listEl.classList.contains('is-grid')) return;      // grid: ketuk = kunjungi
      if (byKey) return;                                     // Enter = kunjungi
      if (lastPointer === 'mouse') return;                   // kursor: klik = kunjungi
      if (row.classList.contains('is-open')) {
        /* ketukan kedua = kunjungi — kecuali datang < 600ms setelah
           membuka: itu ketuk-ganda/pantulan, bukan niat pindah halaman
           (audit 2026-09-13). Diuji dengan dispatchEvent bertimestamp:
           150/450ms dibatalkan, 850ms navigasi. */
        if (performance.now() - (+row.dataset.t || 0) > 600) return;
        e.preventDefault(); return;
      }
      e.preventDefault();
      setOpen(row);
      hint.classList.add('is-done');                         // petunjuk sudah tak perlu
    });
    row.addEventListener('focus', () => { if (byKey) setOpen(row); });
  });
  /* kursor bergerak di baris lain: lepas .is-open lama (mis. baris
     pertama yang terbuka otomatis) agar tak ada dua baris terbuka.
     pointermove, bukan pointerenter — kursor yang sudah diam di atas
     baris sejak sebelum daftar dirender tak pernah memicu enter. */
  listEl.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || !openRow) return;
    const r = e.target.closest('.row');
    if (r && r !== openRow) setOpen(null);
  }, { passive: true });
  /* kursor / fokus keyboard meninggalkan daftar: semua menutup */
  listEl.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setOpen(null); });
  listEl.addEventListener('focusout', e => { if (byKey && !listEl.contains(e.relatedTarget)) setOpen(null); });

  /* --- LIST / GRID --- */
  const vbs = $$('.idx__vb', idxEl);
  function setView(v) {
    vbs.forEach(b => { const on = b.dataset.view === v; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    const apply = () => {
      listEl.classList.toggle('is-grid', v === 'grid');
      setOpen(v === 'grid' ? null : rows[0]);
      hint.classList.toggle('is-off', v === 'grid');
      listEl.classList.remove('is-switching');
    };
    if (reduced) { apply(); return; }
    listEl.classList.add('is-switching');
    setTimeout(apply, 260);
  }
  vbs.forEach(b => b.addEventListener('click', () => { if (!b.classList.contains('is-on')) setView(b.dataset.view); }));
  /* petunjuk sentuh hanya untuk yang tak punya kursor */
  if (fine.matches) hint.hidden = true;

  /* --- gambar: wadah 0fr tingginya nol, jadi loading="lazy" tak pernah
     terpicu (IntersectionObserver menganggapnya di luar layar). Begitu
     bagian 002 mendekat (800px), semua gambar baris dipaksa dimuat. --- */
  const wakeImgs = () => $$('img', listEl).forEach(im => { im.loading = 'eager'; });
  if ('IntersectionObserver' in window) {
    const pio = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { pio.disconnect(); wakeImgs(); } });
    }, { rootMargin: '600px 0px' });
    pio.observe(idxEl);
  } else wakeImgs();

  /* --- masuk layar: judul flip per huruf, garis memanjang, baris bertahap --- */
  const ttl = $('#idxTitle');
  ttl.innerHTML = [...ttl.textContent].map(c => `<span class="ch" aria-hidden="true">${c}</span>`).join('');
  const chars = $$('.ch', ttl);
  /* stagger dari tengah, .075s per langkah (angka referensi) */
  const mid = (chars.length - 1) / 2;
  chars.forEach((c, i) => c.style.setProperty('--d', (Math.abs(i - mid) * .075) + 's'));
  rows.forEach((r, i) => r.style.setProperty('--d', (.15 + i * .1) + 's'));

  function idxEnter() {
    idxEl.classList.add('is-in');
    /* baris pertama terbuka otomatis, sesaat setelah barisnya muncul */
    setTimeout(() => { if (!openRow && !listEl.classList.contains('is-grid')) setOpen(rows[0]); }, reduced ? 0 : 350);
    /* setelah semua transisi masuk selesai, lepas state animasi supaya
       aturan dasar kembali berlaku murni */
    setTimeout(() => idxEl.classList.remove('is-armed'), reduced ? 0 : 1800);
  }
  if (!reduced && 'IntersectionObserver' in window) {
    idxEl.classList.add('is-armed');
    const iio = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { iio.disconnect(); idxEnter(); } });
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    iio.observe(ttl);
  } else idxEnter();

  /* ---------- 003 · STUDI — galeri geser ---------- */
  const view  = $('#galView');
  const track = $('#galTrack');
  const S = D.studies;

  /* Loop tak berujung: tiga salinan set bersebelahan
     [salinan][utama][salinan]. Rebase ±satu set (piksel identik,
     track periodik) menjaga viewport di set utama — loop mulus. */
  const total = S.length;
  const HOME = total;  // set utama mulai di indeks ini

  track.innerHTML = [0, 1, 2].map(set => S.map((s, i) => `
    <figure class="gs"${set === 1 ? '' : ' aria-hidden="true"'} data-n="${i}">
      <div class="gs__fig">
        ${pic(s.img, s.alt || s.title)}
      </div>
    </figure>`).join('')).join('');

  const cards = $$('.gs', track);
  $('#stCount').textContent = String(total).padStart(2, '0');

  const elNo   = $('#galNo');
  const elTag  = $('#galTag');
  const elTtl  = $('#galTtl');
  const elNote = $('#galNote');
  const elCap  = $('#galCap');
  const elBar  = $('#galBar');
  const bPrev  = $('#galPrev');
  const bNext  = $('#galNext');

  let cur = -1;

  function paint(i) {
    if (i === cur) return;
    cur = i;
    const s = S[i];

    /* semua salinan kartu yang sama ikut menyala */
    cards.forEach((c, n) => c.classList.toggle('on', n % total === i));

    elCap.classList.add('sw');
    setTimeout(() => {
      elNo.textContent   = s.no;
      elTag.textContent  = s.tag;
      elTtl.textContent  = s.title;
      elNote.textContent = s.note;
      elCap.classList.remove('sw');
    }, reduced ? 0 : 150);

    elBar.style.width = (100 / total) + '%';
    elBar.style.transform = `translateX(${i * 100}%)`;

    bPrev.disabled = total < 2;
    bNext.disabled = total < 2;
  }

  /* ---------- carousel transform (2026-08-27, final) ----------
     Keputusan pemilik: berhenti bertikai dengan mesin scroll
     peramban (snap + lompatan settle = biang "pause 004→001").
     Track digerakkan transform:translate3d — murni kompositor.
     Wrap = rebase ±4 kartu (piksel identik) saat posisi diam;
     keadaan istirahat SELALU persis di pusat kartu, jadi "stuck
     di celah" tak mungkin lagi. Geser 1:1; lepasan dianimasikan
     menyambung kecepatan jari (Hermite) atau kick ease-out. */
  let gIdx = HOME;               // indeks kartu (float saat drag)
  let gAnim = 0;                 // rAF animasi
  let gDragging = false, gId = -1, gDecided = false;
  let gX0 = 0, gY0 = 0, gIdx0 = HOME, gLastX = 0, gLastT = 0, gVel = 0;
  let gStep = 0, gViewW = 0, gCardW = 0;
  let gWheelLock = 0;

  function gMeasure() {
    gViewW = view.clientWidth;
    gCardW = cards[0].offsetWidth;
    gStep = cards[1].offsetLeft - cards[0].offsetLeft;
  }
  function gApply() {
    track.style.transform =
      'translate3d(' + (gViewW / 2 - (gIdx * gStep + gCardW / 2)) + 'px,0,0)';
  }
  /* viewport dijaga di sekitar set utama: begitu pusat melewati
     celah wrap, rebase ±4 kartu (piksel identik, track periodik).
     Wilayah salinan dingin tak pernah terlihat > separuh kartu. */
  function gRebase() {
    let sh = 0;
    while (gIdx > HOME + total - .5) { gIdx -= total; sh -= total; }
    while (gIdx < HOME - .5)         { gIdx += total; sh += total; }
    return sh;
  }

  function gAnimate(to, v0px) {
    cancelAnimationFrame(gAnim);
    let from = gIdx;
    const D = to - from;
    if (Math.abs(D) * gStep < 2) {
      gAnim = 0; gIdx = to; gRebase(); gApply();
      paint(Math.round(gIdx) % total);
      return;
    }
    const v0 = v0px / gStep;                    // kartu/ms
    /* LANTAI KECEPATAN: kartu tak boleh merayap (>=500 px/dtk).
       Momentum nyata (>= 0,3 px/ms) → Hermite menyambung
       kecepatan jari persis; lepasan mati → ease-out (kick). */
    const fast = Math.abs(v0px) > .3;
    const tCap = Math.max(160, Math.min(480, Math.abs(D) * gStep / .5));
    const T = (fast && Math.sign(v0) === Math.sign(D))
      ? Math.max(160, Math.min(tCap, 2 * D / v0)) : tCap;
    const m0 = fast ? v0 * T : 0;
    const t0 = performance.now();
    const step = () => {
      const s = Math.min(1, (performance.now() - t0) / T);
      let x;
      if (fast) {
        const h00 = 2 * s ** 3 - 3 * s * s + 1;
        const h10 = s ** 3 - 2 * s * s + s;
        const h01 = -2 * s ** 3 + 3 * s * s;
        x = h00 * from + h10 * m0 + h01 * to;
      } else {
        x = from + D * (1 - Math.pow(1 - s, 3));
      }
      gIdx = x;
      const sh = gRebase();
      if (sh) { from += sh; to += sh; }
      gApply();
      paint(Math.round(gIdx) % total);
      if (s < 1) { gAnim = requestAnimationFrame(step); return; }
      gAnim = 0;
    };
    gAnim = requestAnimationFrame(step);
  }

  function gGo(dir) {
    const to = Math.round(gIdx) + dir;
    if (reduced) {
      gIdx = to; gRebase(); gApply();
      paint(Math.round(gIdx) % total);
      return;
    }
    gAnimate(to, 0);
  }

  /* tombol panah — mengikuti indeks saat ini; dari kartu terakhir
     "berikutnya" memang melanjutkan ke kanan (loop) */
  bPrev.addEventListener('click', () => gGo(-1));
  bNext.addEventListener('click', () => gGo(1));

  /* drag — sentuh & mouse satu jalur. Horizontal = kita; vertikal
     = halaman (touch-action:pan-y). Pointer capture menjamin
     pointerup selalu sampai walau jari keluar area. */
  view.addEventListener('dragstart', e => e.preventDefault());
  view.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (gDragging) return;                       // abaikan jari kedua
    cancelAnimationFrame(gAnim); gAnim = 0;
    gDragging = true; gDecided = false; gId = e.pointerId;
    gX0 = gLastX = e.clientX; gY0 = e.clientY;
    gIdx0 = gIdx; gLastT = performance.now(); gVel = 0;
    try { view.setPointerCapture(e.pointerId); } catch (_) {}
  });
  view.addEventListener('pointermove', e => {
    if (!gDragging || e.pointerId !== gId) return;
    const dx = e.clientX - gX0, dy = e.clientY - gY0;
    if (!gDecided) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) >= Math.abs(dx)) { gDragging = false; return; }
      gDecided = true;
      view.classList.add('drag');
    }
    const now = performance.now(), dt = now - gLastT;
    if (dt > 0) gVel = .75 * (e.clientX - gLastX) / dt + .25 * gVel;
    gLastX = e.clientX; gLastT = now;
    gIdx = gIdx0 - dx / gStep;
    const sh = gRebase();
    if (sh) gIdx0 += sh;
    gApply();
    paint(Math.round(gIdx) % total);
  });
  function gEnd(e) {
    if (!gDragging || (e && e.pointerId !== gId)) return;
    gDragging = false;
    view.classList.remove('drag');
    if (!gDecided) return;
    /* SATU GESTUR = MAKS SATU KARTU: commit bila drag sudah 35%
       jarak kartu ATAU lepasan >= 0,25 px/ms; ragu-ragu → kembali. */
    const start = Math.round(gIdx0);
    const d = gIdx - gIdx0;
    const dir = d > 0 ? 1 : -1;
    const idx = (Math.abs(d) > .35 || Math.abs(gVel) > .25)
      ? start + dir : start;
    if (reduced) { gIdx = idx; gRebase(); gApply(); paint(idx % total); return; }
    gAnimate(idx, -gVel);
  }
  view.addEventListener('pointerup', gEnd);
  view.addEventListener('pointercancel', gEnd);

  /* roda horizontal (trackpad) — satu langkah per gestur,
     cooldown 350ms. Roda vertikal TIDAK disentuh: halaman
     yang digulir, bukan galeri. */
  view.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaX) < 10 || performance.now() < gWheelLock) return;
    gWheelLock = performance.now() + 350;
    gGo(e.deltaX > 0 ? 1 : -1);
  }, { passive: true });

  // panah kiri / kanan
  addEventListener('keydown', e => {
    if (!$('#sheet').hidden) return;
    const r = $('#s3').getBoundingClientRect();
    if (r.top > innerHeight * .6 || r.bottom < innerHeight * .4) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); gGo(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); gGo(1); }
  });

  paint(0);

  /* mulai di set utama, kartu pertama di tengah — sinkron sebelum
     frame pertama, tanpa animasi */
  gMeasure();
  gIdx = HOME;
  gApply();
  addEventListener('resize', () => { gMeasure(); gApply(); }, { passive: true });

  /* gambar salinan dimuat begitu bagian 003 terlihat — tanpa ini,
     wrap pertama bisa kedip karena <img> salinan masih lazy-load */
  if ('IntersectionObserver' in window) {
    const preo = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        preo.disconnect();
        S.forEach(st => {
          const file = /\.[a-z0-9]{2,4}$/i.test(st.img);
          (new Image()).src = 'assets/img/' + (file ? st.img : st.img + '.webp');
          if (!file) (new Image()).src = 'assets/img/' + st.img + '.jpg';
        });
      });
    });
    preo.observe($('#s3'));
  }

  /* ---------- 004 · PRAKTIK ---------- */
  $('#practice').innerHTML = D.practice.map(p => `<p class="rv">${p}</p>`).join('');
  $('#practiceIndex').innerHTML = `
    <p class="practice-index__label mono">INDEKS PRAKTIK</p>
    <ol>${D.practiceIndex.map(item => `
      <li class="practice-index__item rv">
        <span class="practice-index__no mono">${item.no}</span>
        <div><h3>${item.title}</h3><p>${item.note}</p></div>
      </li>`).join('')}</ol>`;

  /* ---------- META ---------- */
  $('#heroStatus').textContent = D.meta.status;
  $('#slabMail').textContent = D.meta.email;
  $('#slab').href = 'mailto:' + D.meta.email;
  const sm = $('#sheetMail');
  sm.textContent = D.meta.email;
  sm.href = 'mailto:' + D.meta.email;
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- BOOT ----------
     Adegan pembuka, bukan bar tunggu: setetes tinta putih jatuh,
     menghantam dasar, lalu merembes NAIK memenuhi layar dengan tepian
     berserat. Setelah penuh, massa tinta itu dibelah tiga dan didorong
     keluar — hero sudah hidup di baliknya.                             */
  const t0 = performance.now();
  const boot = $('#boot'), bBar = $('#bootBar'), bPct = $('#bootPct');

  /* Jaring pengaman terakhir: isi hero menunggu kelas .ready, jadi
     bila adegan boot macet di tengah jalan (error, tab dilatarkan,
     rAF tak pernah jalan) hero akan tersembunyi selamanya. Setelah
     4 detik singkap paksa, apa pun yang terjadi. */
  const failsafe = setTimeout(function () {
    if (!document.body.classList.contains('ready')) bootDone();
  }, 4000);
  const bc   = $('#bootC');
  document.body.style.overflow = 'hidden';

  function bootDone() {
    boot.classList.add('off');
    document.body.style.overflow = '';
    /* Penanda tirai sudah tersingkap. Animasi hero digantung padanya
       supaya tidak habis di balik layar boot. Wajib dipasang di
       SETIAP jalur keluar, termasuk saat gerak diredam. */
    document.body.classList.add('ready');
    clearTimeout(failsafe);
  }

  const bx = bc && bc.getContext ? bc.getContext('2d') : null;

  if (reduced || !bx) {
    /* gerak diredam: tanpa adegan, cukup singkap cepat */
    bBar.style.width = '100%';
    bPct.textContent = '100';
    setTimeout(bootDone, 200);
  } else {
    let W = 0, H = 0;

    function bsize() {
      W = innerWidth; H = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      bc.width = W * dpr; bc.height = H * dpr;
      bx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    bsize();
    addEventListener('resize', bsize, { passive: true });

    /* — acak deterministik, sama seperti void — */
    let rs = (Date.now() ^ (Math.random() * 0xFFFFFF)) >>> 0;
    const rnd = () => {
      rs |= 0; rs = rs + 0x6D2B79F5 | 0;
      let x = Math.imul(rs ^ rs >>> 15, 1 | rs);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };

    /* tepian bergelombang — dihitung sekali, dipakai tiap frame */
    const wob = [];
    for (let i = 0; i < 5; i++)
      wob.push({ a: 4 + rnd() * 9, k: .004 + rnd() * .012, p: rnd() * Math.PI * 2 });
    const frontY = (x, t) => {
      let o = 0;
      for (const w of wob) o += Math.sin(x * w.k + w.p + t * .0012) * w.a;
      return o;
    };

    /* sulur berserat yang menjalar di atas permukaan tinta */
    const tend = [];
    for (let i = 0; i < 18; i++) {
      const nodes = [];
      let dx = 0, dy = 0, dir = -Math.PI / 2 + (rnd() - .5) * .8;
      const step = 7 + rnd() * 9, n = 5 + Math.floor(rnd() * 7);
      for (let j = 0; j < n; j++) {
        dir += (rnd() - .5) * .95;
        dx += Math.cos(dir) * step;
        dy += Math.sin(dir) * step;
        const taper = 1 - j / n;
        nodes.push({ dx, dy, r: (3 + rnd() * 7) * (.35 + taper * .65) });
      }
      tend.push({ x: rnd(), rise: .45 + rnd() * .55, nodes });
    }

    const eOut  = p => 1 - Math.pow(1 - p, 3);
    const eIn   = p => p * p;
    const smoot = p => p * p * (3 - 2 * p);
    const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

    const DROP = 420, FILL_A = 400, FILL_B = 1200, CUT = 1260, END = 2160;
    const OVER = 60;   // tinta dilebihkan agar puncak layar tak berlubang
    const BANDS = 3;

    /* menggambar massa tinta pada keadaan waktu t */
    function ink(t) {
      const f = eOut(seg(t, FILL_A, FILL_B));          // ketinggian rembesan
      if (f <= 0) return;
      const lvl = H - (H + OVER) * f;

      bx.fillStyle = '#fff';

      /* badan tinta */
      bx.beginPath();
      bx.moveTo(0, H);
      bx.lineTo(0, lvl + frontY(0, t));
      for (let x = 0; x <= W; x += 8) bx.lineTo(x, lvl + frontY(x, t));
      bx.lineTo(W, H);
      bx.closePath();
      bx.fill();

      /* sulur — hanya muncul setelah rembesan melewati ambangnya */
      for (const s of tend) {
        const g = seg(f, s.rise - .45, s.rise + .2);
        if (g <= 0) continue;
        const ox = s.x * W, oy = lvl + frontY(ox, t) + 4;
        const lim = g * s.nodes.length;
        for (let j = 0; j < s.nodes.length; j++) {
          if (j > lim) break;
          const nd = s.nodes[j];
          const fade = Math.min(1, lim - j);
          bx.globalAlpha = fade;
          bx.beginPath();
          bx.arc(ox + nd.dx, oy + nd.dy, nd.r, 0, Math.PI * 2);
          bx.fill();
        }
        bx.globalAlpha = 1;
      }
    }

    /* tetesan yang jatuh sebelum tinta menggenang */
    function drop(t) {
      const p = seg(t, 0, DROP);
      if (p <= 0 || p >= 1) return;
      const y  = -30 + (H + 30) * eIn(p);
      const st = 1 + eIn(p) * 2.2;                     // memanjang saat cepat
      bx.fillStyle = '#fff';
      bx.save();
      bx.translate(W * .5, y);
      bx.scale(1, st);
      bx.beginPath();
      bx.arc(0, 0, 6.5, 0, Math.PI * 2);
      bx.fill();
      bx.restore();
    }

    let cut = false;

    (function frame(now) {
      const t = now - t0;
      bx.clearRect(0, 0, W, H);

      if (t < CUT) {
        drop(t);
        ink(t);
      } else {
        /* dibelah tiga, tiap panel didorong keluar bergantian arah */
        if (!cut) {
          cut = true;
          boot.classList.add('cut');
          /* Latar boot menjadi transparan di sini, jadi hero langsung
             terlihat di sela panel. Efek singkap wordmark harus mulai
             SEKARANG — bila menunggu bootDone() di t=END, pengguna
             melihat teks utuh dulu selama 900ms lalu efeknya mengulang
             dari nol. Itulah lompatan yang terlihat salah. */
          document.body.classList.add('ready');
        }
        const bh = H / BANDS;
        for (let i = 0; i < BANDS; i++) {
          const st = CUT + i * 110;
          const p = smoot(seg(t, st, st + 620));
          if (p >= 1) continue;
          const dir = i % 2 ? 1 : -1;
          bx.save();
          bx.beginPath();
          bx.rect(0, i * bh, W, bh + 1);
          bx.clip();
          bx.translate(dir * p * W * 1.3, 0);
          ink(CUT);
          bx.restore();
        }
      }

      const q = Math.min(1, t / CUT);
      bBar.style.width = (q * 100).toFixed(1) + '%';
      bPct.textContent = String(Math.round(q * 100)).padStart(3, '0');

      if (t < END) return requestAnimationFrame(frame);
      bootDone();
    })(performance.now());
  }

  /* ---------- JAM ---------- */
  const clock = $('#heroClock');
  (function run() {
    clock.textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit'
    }).format(new Date()) + ' WIB';
    setTimeout(run, 15000);
  })();

  /* ---------- MENU ---------- */
  const sheet = $('#sheet'), dockB = $('#dockB');
  const setSheet = on => {
    sheet.hidden = !on;
    document.body.style.overflow = on ? 'hidden' : '';
    dockB.textContent = on ? 'TUTUP' : 'MENU';
  };
  dockB.addEventListener('click', () => setSheet(sheet.hidden));
  $('#sheetX').addEventListener('click', () => setSheet(false));
  $$('.sheet__nav a').forEach(a => a.addEventListener('click', () => setSheet(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) setSheet(false); });

  /* ---------- REVEAL ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });
    $$('.rv').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 55 + 'ms';
      io.observe(el);
    });
  } else {
    $$('.rv').forEach(el => el.classList.add('in'));
  }

  /* ---------- VOID · kamar gelap + spesimen generatif ----------
     Tiga lapis yang bercerita satu hal:
       03 · spesimen  — bentuk tinta acak, tak pernah sama dua kali
       02 · kamar gelap — hanya tersingkap oleh cahaya yang mengikuti jari
       01 · gravitasi  — miringkan HP, tinta ikut bergeser (opsional)
  --------------------------------------------------------------- */
  (function voidRoom() {
    const wrap = $('#void');
    const cv   = $('#voidC');
    if (!wrap || !cv || !cv.getContext) return;

    const ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1;

    /* — benih: satu kunjungan, satu spesimen — */
    const seed = (Date.now() ^ (Math.random() * 0xFFFFFF)) >>> 0;
    let rs = seed || 1;
    const rnd = () => {                       // mulberry32
      rs |= 0; rs = rs + 0x6D2B79F5 | 0;
      let t = Math.imul(rs ^ rs >>> 15, 1 | rs);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const code = seed.toString(16).toUpperCase().padStart(8, '0').slice(0, 4)
               + '—' + seed.toString(36).toUpperCase().slice(-4);
    $('#voidId').textContent = 'SPESIMEN ' + code;

    /* — bentuk tinta: filamen bercabang —
       Untai induk mengalir, lalu menumbuhkan cabang halus yang
       menjalar keluar seperti tinta merembes di air. Cabang inilah
       yang memberi kesan berserat; percikan saja hanya jadi debu.  */
    const blobs = [];
    const strands = 10 + Math.floor(rnd() * 3);
    const flowA = rnd() * Math.PI * 2;

    function grow(px, py, dir, nodes, step, thick, gen) {
      for (let i = 0; i < nodes; i++) {
        const u = i / nodes;

        // cabang meliuk lebih liar daripada induknya
        dir += (rnd() - .5) * (gen ? 1.25 : .85);
        px += Math.cos(dir) * step;
        py += Math.sin(dir) * step * .72;

        // menipis di ujung, tapi tidak pernah hilang sama sekali
        const taper = Math.sin(Math.PI * Math.min(1, u * 1.15 + .12));
        blobs.push({
          bx: px,
          by: py,
          r : thick * (.4 + taper * .6) * (.7 + rnd() * .5),
          p : rnd() * Math.PI * 2,
          s : .18 + rnd() * .34,
          d : .35 + rnd() * .65
        });

        // tumbuhkan cabang — hanya satu tingkat, agar tidak jadi debu
        if (gen < 1 && rnd() < .22) {
          grow(px, py,
               dir + (rnd() < .5 ? 1 : -1) * (.5 + rnd() * .7),
               Math.max(3, Math.floor(nodes * .45)),
               step * .7,
               thick * .42,
               gen + 1);
        }

        // percikan halus — tekstur, bukan struktur
        if (rnd() < .18) {
          blobs.push({
            bx: px + (rnd() - .5) * .1,
            by: py + (rnd() - .5) * .07,
            r : thick * .34 * (.5 + rnd() * .5),
            p : rnd() * Math.PI * 2,
            s : .2 + rnd() * .4,
            d : .4 + rnd() * .6
          });
        }
      }
    }

    for (let k = 0; k < strands; k++) {
      grow(
        .5 + (rnd() - .5) * .55,               // tersebar mendatar
        (k + rnd() * .85) / strands,           // tersebar penuh setinggi hero
        flowA + (rnd() - .5) * 1.5 + (k % 2 ? Math.PI : 0),
        13 + Math.floor(rnd() * 9),
        .038 + rnd() * .022,
        .1 + rnd() * .08,
        0
      );
    }

    function size() {
      const r = wrap.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    addEventListener('resize', size, { passive: true });

    /* — cahaya: mengikuti jari, memudar bila diam — */
    const light = { x: .5, y: .5, on: 0, want: 0 };
    let lit = false, t0 = performance.now();
    let gx = 0, gy = 0, tgx = 0, tgy = 0;      // gravitasi

    function touch(cx, cy) {
      const r = wrap.getBoundingClientRect();
      light.x = (cx - r.left) / r.width;
      light.y = (cy - r.top) / r.height;
      light.want = 1;
      if (!lit) { lit = true; wrap.classList.add('lit'); }
    }

    /* Hover dua tahap (keputusan pemilik 2026-09-13, desktop):
       tahap 1 — kursor MASUK hero: tinta tersingkap lembut dari
                 tengah (cahaya .42, posisi pusat), tanpa perlu bergerak;
       tahap 2 — kursor BERGERAK: cahaya penuh mengikuti kursor (touch()).
       Keluar hero → memudar. Hanya pointerType 'mouse'; sentuh tetap
       memakai jalur lama (menyala saat jari menyentuh/menggeser).
       Peristiwa didengar di #s1 (hero), bukan .void: .hero__in
       pointer-events:none sudah membuat kursor tembus, tapi tautan &
       tombol di dalamnya tidak — kalau didengar di .void, cahaya mati
       setiap kursor lewat di atas teks yang bisa diklik. */
    const hero = wrap.closest('.hero') || wrap;
    hero.addEventListener('pointerenter', e => {
      if (e.pointerType !== 'mouse') return;
      light.x = .5; light.y = .5;
      light.want = Math.max(light.want, .42);
      if (!lit) { lit = true; wrap.classList.add('lit'); }
    });
    hero.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') touch(e.clientX, e.clientY); }, { passive: true });
    hero.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') light.want = 0; });

    wrap.addEventListener('pointerdown', e => touch(e.clientX, e.clientY), { passive: true });
    wrap.addEventListener('touchmove', e => {
      const t = e.touches[0];
      if (t) touch(t.clientX, t.clientY);
    }, { passive: true });
    wrap.addEventListener('touchend',    () => { light.want = 0; });

    /* — giroskop: lapisan bonus, tidak wajib — */
    function gyro(e) {
      const g = e.gamma, b = e.beta;
      if (g == null || b == null) return;
      tgx = Math.max(-1, Math.min(1, g / 38));
      tgy = Math.max(-1, Math.min(1, (b - 42) / 38));
      if (!lit) { lit = true; wrap.classList.add('lit'); }
    }
    if (window.DeviceOrientationEvent) {
      const need = typeof DeviceOrientationEvent.requestPermission === 'function';
      if (!need) {
        addEventListener('deviceorientation', gyro, { passive: true });
      } else {
        // iOS 13+ : hanya boleh diminta dari gestur pengguna
        wrap.addEventListener('pointerdown', function ask() {
          wrap.removeEventListener('pointerdown', ask);
          DeviceOrientationEvent.requestPermission()
            .then(r => { if (r === 'granted') addEventListener('deviceorientation', gyro, { passive: true }); })
            .catch(() => {});
        }, { once: true });
      }
    }

    /* — tanpa sentuhan & tanpa sensor: singkap pelan sendiri — */
    setTimeout(() => {
      if (lit) return;
      lit = true; wrap.classList.add('lit');
      light.want = .34;
    }, 2600);

    if (reduced) {
      lit = true; wrap.classList.add('lit');
      light.want = .5; light.on = .5;
    }

    /* — gambar — */
    function frame(now) {
      if (!vOn) return;
      requestAnimationFrame(frame);
      if (!W || !H) { size(); return; }

      const t = (now - t0) / 1000;
      light.on += (light.want - light.on) * .06;
      if (light.want > 0 && light.want < 1) light.want *= .999;
      gx += (tgx - gx) * .05;
      gy += (tgy - gy) * .05;

      ctx.clearRect(0, 0, W, H);
      if (light.on < .01) return;

      // acuan persegi: ukuran gumpalan & jangkauan tetap konsisten
      // walau hero jauh lebih tinggi daripada lebar
      const S  = Math.min(W, H);
      const sx = Math.min(W / S, 1.45);
      const sy = Math.min(H / S, 1.45);
      const cx = W / 2, cy = H / 2;

      const lx = (light.x + gx * .16) * W;
      const ly = (light.y + gy * .1) * H;
      const reach = S * (reduced ? 1.5 : .95);
      const drift = reduced ? 0 : 1;

      ctx.globalCompositeOperation = 'lighter';

      for (const b of blobs) {
        const ox = b.bx - .5 + Math.sin(t * b.s + b.p) * .012 * drift + gx * .07 * b.d;
        const oy = b.by - .5 + Math.cos(t * b.s * .8 + b.p) * .012 * drift + gy * .05 * b.d;
        const x = cx + ox * S * sx;
        const y = cy + oy * S * sy;
        const r = b.r * S;

        const d = Math.hypot(x - lx, y - ly);
        let f = 1 - d / reach;
        if (f <= 0) continue;
        f = f * f * light.on;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        // Cabang menambah simpul (103 -> 230), sehingga tumpukan cahaya
        // pada mode 'lighter' naik lagi. Nilai diturunkan agar kecerahan
        // rata-rata tetap ~0.88 — setara tampilan yang sudah disetujui.
        g.addColorStop(0,   `rgba(250,250,250,${(.58 * f).toFixed(4)})`);
        g.addColorStop(.45, `rgba(190,190,190,${(.22 * f).toFixed(4)})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.283);
        ctx.fill();
      }

      // sapuan cahaya itu sendiri
      const halo = ctx.createRadialGradient(lx, ly, 0, lx, ly, reach * .5);
      halo.addColorStop(0, `rgba(250,250,250,${(.05 * light.on).toFixed(4)})`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'source-over';
    }
    /* jeda loop saat hero tak terlihat — hemat baterai dan
       mengurangi perebutan main-thread saat geser di bagian lain */
    let vOn = false;
    function vStart() { if (!vOn) { vOn = true; requestAnimationFrame(frame); } }
    function vStop() { vOn = false; }
    if ('IntersectionObserver' in window) {
      const vio = new IntersectionObserver(es => {
        es.forEach(e => { e.isIntersecting ? vStart() : vStop(); });
      }, { threshold: 0 });
      vio.observe(wrap);
    } else vStart();
  })();

  /* ---------- SCROLL ---------- */
  /* bilah kemajuan di dock dihapus 2026-09-13 (keputusan pemilik) —
     indeks bagian 00N/005 tetap jadi satu-satunya penunjuk posisi */
  const dockI = $('#dockI');
  const secs = $$('[data-i]');
  let t = false;

  function onScroll() {
    const y = scrollY;
    let cur = '001';
    secs.forEach(s => { if (y >= s.offsetTop - innerHeight * .45) cur = s.dataset.i; });
    dockI.textContent = cur + '/005';
    t = false;
  }
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(onScroll); t = true; } }, { passive: true });
  onScroll();

  /* ---------- GULIR HALUS ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const el = $(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }));
})();
