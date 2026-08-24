/* ==========================================================================
   NUIT ENCRE — interactions
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. PRELOADER ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => $('#preloader').classList.add('is-done'), reduced ? 200 : 2100);
  });

  /* ---------- 2. LANGUAGE ---------- */
  const DICT = window.NE_I18N;
  const stored = localStorage.getItem('ne-lang');
  let lang = (stored && DICT[stored])
    ? stored
    : ((navigator.language || 'id').toLowerCase().startsWith('en') ? 'en' : 'id');

  function applyLang(next) {
    lang = next;
    const d = DICT[next];
    $$('[data-i18n]').forEach(el => {
      const v = d[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    document.documentElement.lang = next;
    $$('.lang-toggle__opt').forEach(o => o.classList.toggle('is-active', o.dataset.lang === next));
    localStorage.setItem('ne-lang', next);
    // placeholders that are not data-i18n driven
    $('#formNote').textContent = '';
  }
  applyLang(lang);

  $('#langToggle').addEventListener('click', () => applyLang(lang === 'id' ? 'en' : 'id'));

  /* ---------- 3. NAV ---------- */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const burger = $('#navBurger');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* ---------- 4. SCROLL: progress · sticky nav · active link ---------- */
  const bar = $('#scrollProgress');
  const sections = $$('main section[id]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    nav.classList.toggle('is-stuck', y > 40);

    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop - window.innerHeight * 0.35) current = s.id; });
    $$('#navLinks a').forEach(a =>
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current)
    );
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- 5. REVEAL ON SCROLL ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
    io.observe(el);
  });

  /* ---------- 6. SKILL BARS ---------- */
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const li = e.target;
      li.querySelector('i').style.setProperty('--w', li.dataset.v + '%');
      barIO.unobserve(li);
    });
  }, { threshold: 0.4 });
  $$('.bars li').forEach(li => barIO.observe(li));

  /* ---------- 7. HERO PHONE — rotating screens ---------- */
  const screen = $('#phoneScreen');
  const screenSrc = $('#phoneScreenSrc');
  const shots = ['work-01', 'work-04', 'work-02', 'work-06', 'work-05', 'work-03'];
  shots.forEach(n => { const i = new Image(); i.src = `assets/img/${n}.webp`; });

  if (!reduced && screen) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % shots.length;
      screen.classList.add('is-fading');
      setTimeout(() => {
        if (screenSrc) screenSrc.srcset = `assets/img/${shots[idx]}.webp`;
        screen.src = `assets/img/${shots[idx]}.jpg`;
        screen.classList.remove('is-fading');
      }, 600);
    }, 4200);
  }

  /* ---------- 8. TILT ON WORK CARDS ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach(card => {
      const media = card.querySelector('.work__media');
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        media.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => { media.style.transform = ''; });
    });
  }

  /* ---------- 9. INK TRAIL CURSOR ---------- */
  const cv = $('#inkCanvas');
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    const ctx = cv.getContext('2d');
    let w, h, drops = [];

    function size() {
      w = cv.width = window.innerWidth * devicePixelRatio;
      h = cv.height = window.innerHeight * devicePixelRatio;
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
    }
    size();
    window.addEventListener('resize', size);

    let last = 0;
    window.addEventListener('mousemove', e => {
      const now = performance.now();
      if (now - last < 34) return;           // throttle
      last = now;
      drops.push({
        x: e.clientX * devicePixelRatio,
        y: e.clientY * devicePixelRatio,
        r: (Math.random() * 7 + 3) * devicePixelRatio,
        a: 0.32,
        vy: (Math.random() * 0.25 + 0.1) * devicePixelRatio
      });
      if (drops.length > 42) drops.shift();
    }, { passive: true });

    (function loop() {
      ctx.clearRect(0, 0, w, h);
      drops = drops.filter(d => d.a > 0.004);
      drops.forEach(d => {
        d.a *= 0.945;
        d.r *= 1.012;
        d.y += d.vy;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        g.addColorStop(0, `rgba(201,169,97,${d.a})`);
        g.addColorStop(0.55, `rgba(109,91,208,${d.a * 0.5})`);
        g.addColorStop(1, 'rgba(109,91,208,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 10. CONTACT FORM ---------- */
  const form = $('#contactForm');
  const note = $('#formNote');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('.field', form).forEach(f => {
      const inp = f.querySelector('input, textarea');
      const bad = !inp.value.trim() || (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value));
      f.classList.toggle('is-error', bad);
      if (bad) ok = false;
    });

    if (!ok) {
      note.style.color = '#c4564f';
      note.textContent = DICT[lang]['form.err'];
      return;
    }
    note.style.color = 'var(--gold)';
    note.textContent = DICT[lang]['form.ok'];
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 6000);
  });

  /* ---------- 11. MISC ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
