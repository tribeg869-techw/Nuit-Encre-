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

  /* ---------- 003 · STUDI (ketuk, bukan hover) ---------- */
  $('#studies').innerHTML = D.studies.map((s, i) => `
    <article class="st rv">
      <button class="st__btn" aria-expanded="false" aria-controls="n${i}">
        <span class="st__fig">
          <span class="st__no">${s.no}</span>
          <span class="st__tag">${s.tag}</span>
          ${pic(s.img, s.title)}
        </span>
        <span class="st__row">
          <span class="st__ttl">${s.title}</span>
          <span class="st__pm"></span>
        </span>
      </button>
      <div class="st__note" id="n${i}"><p>${s.note}</p></div>
    </article>`).join('');

  $('#stCount').textContent = String(D.studies.length).padStart(2, '0');

  $$('.st__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.st');
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

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
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });
  $$('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 55 + 'ms';
    io.observe(el);
  });

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
