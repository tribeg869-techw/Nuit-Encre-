/* ==========================================================================
   NUIT-ENCRE — interaksi (mobile first, tanpa hover)
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D  = window.NE;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pic = (n, alt) =>
    `<picture>
       <source srcset="assets/img/${n}.webp" type="image/webp">
       <img src="assets/img/${n}.jpg" alt="${alt}" loading="lazy" decoding="async">
     </picture>`;

  /* ---------- 002 · KARYA ---------- */
  const w = D.work;
  $('#work').innerHTML = `
    <div class="wk__top rv">
      <span class="mono">${w.no}</span>
      <span class="mono dim">${w.kind} · ${w.year}</span>
    </div>
    <h2 class="wk__title rv">${w.title}</h2>
    <p class="wk__lede rv">${w.lede}</p>
    <a class="wk__fig rv" href="${w.url}" target="_blank" rel="noopener">
      ${pic(w.cover, w.title)}
      <span class="wk__go">Kunjungi <span>↗</span></span>
    </a>
    <div class="wk__body">
      <dl class="wk__facts rv">
        ${w.facts.map(f => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join('')}
      </dl>
      <div class="wk__story rv">
        ${w.story.map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>`;

  /* ---------- 003 · STUDI — galeri geser ---------- */
  const view  = $('#galView');
  const track = $('#galTrack');
  const S = D.studies;

  track.innerHTML = S.map((s, i) => `
    <figure class="gs${i === 0 ? ' on' : ''}" data-n="${i}">
      <div class="gs__fig">
        <span class="gs__i">${s.no}</span>
        ${pic(s.img, s.title)}
      </div>
    </figure>`).join('');

  const cards = $$('.gs', track);
  const total = cards.length;
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

    cards.forEach((c, n) => c.classList.toggle('on', n === i));

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

    bPrev.disabled = i === 0;
    bNext.disabled = i === total - 1;
  }

  // kartu mana yang paling dekat ke tengah jendela
  // jarak kartu dari tepi kiri isi yang bisa digulir
  function startOf(c) {
    return c.getBoundingClientRect().left
         - view.getBoundingClientRect().left
         + view.scrollLeft;
  }

  function nearest() {
    const mid = view.scrollLeft + view.clientWidth / 2;
    let best = 0, gap = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(startOf(c) + c.offsetWidth / 2 - mid);
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  }

  function goTo(i) {
    const c = cards[Math.max(0, Math.min(total - 1, i))];
    const max = view.scrollWidth - view.clientWidth;
    const to  = startOf(c) - (view.clientWidth - c.offsetWidth) / 2;
    view.scrollTo({
      left: Math.max(0, Math.min(max, to)),
      behavior: reduced ? 'auto' : 'smooth'
    });
  }

  let raf = false;
  view.addEventListener('scroll', () => {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => { paint(nearest()); raf = false; });
  }, { passive: true });

  bPrev.addEventListener('click', () => goTo(cur - 1));
  bNext.addEventListener('click', () => goTo(cur + 1));

  // seret dengan mouse — di layar sentuh, biarkan native
  let down = false, sx = 0, sl = 0, far = 0;
  view.addEventListener('dragstart', e => e.preventDefault());
  view.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    down = true; far = 0;
    sx = e.clientX; sl = view.scrollLeft;
    view.classList.add('drag');
    view.setPointerCapture(e.pointerId);
  });
  view.addEventListener('pointermove', e => {
    if (!down) return;
    const d = e.clientX - sx;
    far += Math.abs(d);
    view.scrollLeft = sl - d;
  });
  function release() {
    if (!down) return;
    down = false;
    view.classList.remove('drag');
    goTo(nearest());
  }
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);

  // panah kiri / kanan
  addEventListener('keydown', e => {
    if (!$('#sheet').hidden) return;
    const r = $('#s3').getBoundingClientRect();
    if (r.top > innerHeight * .6 || r.bottom < innerHeight * .4) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(cur - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(cur + 1); }
  });

  paint(0);

  /* ---------- 004 · PRAKTIK ---------- */
  $('#practice').innerHTML = D.practice.map(p => `<p class="rv">${p}</p>`).join('');

  /* ---------- META ---------- */
  $('#heroStatus').textContent = D.meta.status;
  $('#slabMail').textContent = D.meta.email;
  $('#slab').href = 'mailto:' + D.meta.email;
  const sm = $('#sheetMail');
  sm.textContent = D.meta.email;
  sm.href = 'mailto:' + D.meta.email;
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- BOOT ---------- */
  const boot = $('#boot'), bBar = $('#bootBar'), bPct = $('#bootPct');
  const dur = reduced ? 200 : 1100;
  const t0 = performance.now();
  document.body.style.overflow = 'hidden';

  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    bBar.style.width = (p * 100).toFixed(1) + '%';
    bPct.textContent = String(Math.round(p * 100)).padStart(3, '0');
    if (p < 1) return requestAnimationFrame(step);
    setTimeout(() => {
      boot.classList.add('off');
      document.body.style.overflow = '';
    }, reduced ? 0 : 220);
  })(t0);

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

  /* ---------- SCROLL ---------- */
  const prog = $('#dockP'), dockI = $('#dockI');
  const secs = $$('[data-i]');
  let t = false;

  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

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
