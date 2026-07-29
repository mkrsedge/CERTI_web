/* ═══════════════════════════════════════════════════════════
   CERTI — Interaction layer
   Lenis smooth scroll · GSAP + ScrollTrigger choreography
   ═══════════════════════════════════════════════════════════ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  gsap.registerPlugin(ScrollTrigger);

  /* ═══════════ Analytics ═══════════
     Both are off until a key is filled in below, so nothing is loaded and no cookie is set
     in the meantime.

     ⚠ BEFORE SETTING EITHER KEY: privacy-policy.html §2A states in writing that this site
     has "no analytics or advertising trackers of any kind". Setting a key makes that a false
     statement in a live legal document, so update §2A in the same change. PostHog also sets
     a first-party cookie, which means EU/UK visitors need a consent prompt before it runs —
     Cloudflare Web Analytics is cookieless and needs none. */
  const ANALYTICS = {
    posthogKey: '',                              // PostHog project API key
    posthogHost: 'https://eu.i.posthog.com',     // EU cloud region
    cfBeaconToken: '',                           // Cloudflare Web Analytics beacon token
  };

  /* Fire an event if analytics is live; a no-op otherwise, so call sites stay unconditional. */
  function track(event, props) {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, props || {});
    }
  }

  if (ANALYTICS.posthogKey) {
    /* Loaded from here rather than through a tag manager: two tags do not justify the extra
       script, and a tag manager makes it harder to see what is actually on the page. */
    const s = document.createElement('script');
    s.src = ANALYTICS.posthogHost + '/static/array.js';
    s.defer = true;
    s.onload = () => {
      window.posthog.init(ANALYTICS.posthogKey, {
        api_host: ANALYTICS.posthogHost,
        autocapture: true,                 // clicks and pageviews with no extra code
        capture_pageview: true,
        disable_session_recording: true,   // replay off: it records what prospects do on
                                           // screen, which is the hardest thing to defend in
                                           // a manufacturer's security review
        session_recording: { maskAllInputs: true },   // belt and braces if it is ever enabled
        person_profiles: 'identified_only',
        respect_dnt: true,
      });
    };
    document.head.appendChild(s);
  }

  if (ANALYTICS.cfBeaconToken) {
    const c = document.createElement('script');
    c.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    c.defer = true;
    c.setAttribute('data-cf-beacon', JSON.stringify({ token: ANALYTICS.cfBeaconToken }));
    document.head.appendChild(c);
  }

  /* Booking is the only conversion on the site, so every route to it is tracked. */
  document.querySelectorAll('[data-demo]').forEach((el) => {
    el.addEventListener('click', () => {
      track('booking_clicked', {
        location: el.closest('.nav') ? 'nav'
          : el.closest('.cta') ? 'cta'
          : el.closest('.hero') ? 'hero'
          : 'other',
      });
    });
  });

  /* ═══════════ Smooth scroll (Lenis) ═══════════ */
  let lenis = null;
  if (!reduceMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // released after preloader
  }
  if (reduceMotion) document.documentElement.classList.add('reduced-motion');

  function scrollToTarget(target) {
    // force: true so the scroll still happens when Lenis is momentarily stopped
    // (the overlay menu stops it, and its close timeline only restarts it ~0.9s later)
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4, force: true });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }

  /* ═══════════ Anchor links ═══════════ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      e.preventDefault();
      if (menuOpen) closeMenu(() => scrollToTarget(id));
      else scrollToTarget(id);
    });
  });

  /* ═══════════ Preloader ═══════════ */
  const preloader = document.getElementById('preloader');
  const countEl = document.getElementById('preloaderCount');
  const barEl = document.getElementById('preloaderBar');

  function heroIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero .line__inner', {
      y: 0,
      duration: 1.4,
      stagger: 0.12,
      startAt: { y: '110%' },
    })
      .to('[data-hero-fade]', { opacity: 1, duration: 1.1, stagger: 0.1 }, '-=0.9');
    return tl;
  }

  // headline starts hidden below its mask
  gsap.set('.hero .line__inner', { y: '110%' });
  gsap.set('.cta .line__inner', { y: '110%' });

  let released = false;
  function releaseSite() {
    if (released) return;
    released = true;
    document.body.removeAttribute('data-loading');
    if (lenis) lenis.start();
    heroIntro();
  }

  /* Safety net: rAF-driven timelines stall in a backgrounded tab, which would
     trap all content behind the preloader. setTimeout still fires when hidden,
     so guarantee the site reveals even if the intro animation never ticks. */
  const preloaderFailsafe = setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.remove();
    gsap.set('.hero .line__inner', { y: 0 });
    releaseSite();
  }, 6000);

  if (reduceMotion) {
    clearTimeout(preloaderFailsafe);
    released = true;
    preloader.remove();
    gsap.set('.hero .line__inner, .cta .line__inner', { y: 0 });
    document.body.removeAttribute('data-loading');
    if (lenis) lenis.start();
  } else {
    const counter = { v: 0 };
    const loadTl = gsap.timeline();
    loadTl
      .to(counter, {
        v: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          countEl.textContent = Math.round(counter.v);
          barEl.style.width = counter.v + '%';
        },
      })
      .to('.preloader__inner', { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' }, '+=0.15')
      .to(preloader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onStart: () => { clearTimeout(preloaderFailsafe); releaseSite(); },
        onComplete: () => preloader.remove(),
      }, '-=0.1');
  }

  /* ═══════════ Button label roll: wrap text in movable span ═══════════ */
  document.querySelectorAll('.btn__label').forEach((label) => {
    const span = document.createElement('span');
    span.className = 'btn__text';
    span.dataset.text = label.dataset.text || label.textContent.trim();
    span.textContent = label.textContent.trim();
    label.textContent = '';
    label.appendChild(span);
  });

  /* ═══════════ Custom cursor ═══════════ */
  const cursor = document.getElementById('cursor');
  if (!isTouch && cursor) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    const label = cursor.querySelector('.cursor__label');
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    window.addEventListener('pointermove', (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }, { passive: true });

    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
    });

    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const state = el.dataset.cursor;
        cursor.dataset.state = state;
        label.textContent = state === 'drag' ? 'Scroll' : state === 'open' ? 'Open' : '';
      });
      el.addEventListener('mouseleave', () => {
        cursor.dataset.state = '';
        label.textContent = '';
      });
    });
  }

  /* ═══════════ Magnetic elements ═══════════ */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ═══════════ Nav: hide on scroll down, glass on scroll ═══════════ */
  const nav = document.getElementById('nav');
  let menuOpen = false; // declared before nav trigger — onUpdate can fire during create
  let lastY = 0;

  /* The glass background is a class, so it has to survive a ScrollTrigger.refresh().
     Refresh reverts every pin in order to measure it, and during that window onUpdate
     fires with a scroll of ~0, which strips .is-scrolled. Scroll is then restored to the
     value it already had, so no further onUpdate fires and the class never comes back:
     the nav stays transparent for the rest of the page. Expanding a quickstart card calls
     refresh() (the track got wider), which is exactly how it was being triggered.
     Verified: without the refresh listener below, one click strips the class while
     window.scrollY never moves. */
  const setNavGlass = (y) => nav.classList.toggle('is-scrolled', y > 60);
  const navST = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      setNavGlass(y);
      if (y > 400 && y > lastY + 4 && !menuOpen) nav.classList.add('is-hidden');
      else if (y < lastY - 4 || y <= 400) nav.classList.remove('is-hidden');
      lastY = y;
    },
  });
  ScrollTrigger.addEventListener('refresh', () => setNavGlass(navST.scroll()));

  /* ═══════════ Fullscreen menu ═══════════ */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const menuLinks = menu.querySelectorAll('.menu__link');

  function openMenu() {
    menuOpen = true;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('on-dark');
    nav.classList.remove('is-hidden');
    if (lenis) lenis.stop();
    gsap.timeline()
      .to('.menu__bg', { y: 0, duration: 0.7, ease: 'power4.inOut', startAt: { y: '-100%' } })
      .to(menuLinks, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, '-=0.25');
  }

  /* `after` runs once the curtain is up AND Lenis is running again. Anchor clicks use it
     to scroll only after the restart, because Lenis.start() -> reset() -> animate.stop()
     would otherwise kill an in-flight scrollTo partway to the target. */
  function closeMenu(after) {
    if (!menuOpen) { if (after) after(); return; }
    menuOpen = false;
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('on-dark');
    gsap.timeline({
      onComplete: () => {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start();
        if (after) after();
      },
    })
      .to(menuLinks, { opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' })
      .to('.menu__bg', { y: '-100%', duration: 0.6, ease: 'power4.inOut' }, '-=0.1');
  }

  burger.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ═══════════ Marquee (built after fonts settle so widths are final) ═══════════ */
  function initMarquee() {
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (!marqueeTrack) return;
    const group = marqueeTrack.querySelector('.marquee__group');
    const gw = group.offsetWidth;
    if (!gw) return;
    // clone until we have ≥ 2x viewport width
    const needed = Math.min(8, Math.ceil((window.innerWidth * 2) / gw) + 1);
    for (let i = 0; i < needed; i++) marqueeTrack.appendChild(group.cloneNode(true));

    if (!reduceMotion) {
      const tween = gsap.to(marqueeTrack, {
        x: -gw,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
      // scroll velocity nudges marquee speed
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const v = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 2.5);
          gsap.to(tween, { timeScale: v, duration: 0.4, overwrite: true });
        },
      });
      marqueeTrack.addEventListener('mouseenter', () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 }));
      marqueeTrack.addEventListener('mouseleave', () => gsap.to(tween, { timeScale: 1, duration: 0.4 }));
    }
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initMarquee);
  } else {
    initMarquee();
  }

  /* ═══════════ Generic reveals ═══════════ */
  if (!reduceMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    /* split-word headline reveals */
    document.querySelectorAll('[data-split]').forEach((el) => {
      const split = splitWords(el);
      gsap.from(split, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.045,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  } else {
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
  }

  /* wrap each word in a masked span; keeps <em>/<i> styling */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              const mask = document.createElement('span');
              mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;margin-bottom:-0.08em;';
              const inner = document.createElement('span');
              inner.style.display = 'inline-block';
              inner.className = 'split-word';
              inner.textContent = part;
              mask.appendChild(inner);
              frag.appendChild(mask);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains('split-word')) {
          walk(child);
        }
      });
    };
    walk(el);
    return el.querySelectorAll('.split-word');
  }

  /* ═══════════ Manifesto: word-by-word scrub ═══════════ */
  const manifesto = document.getElementById('manifesto');
  if (manifesto && !reduceMotion) {
    const words = splitWords(manifesto);
    gsap.fromTo(words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: manifesto,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
  }

  /* ═══════════ Impact counters (count up, down, or with decimals) ═══════════ */
  document.querySelectorAll('.stat__num').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const from = el.dataset.countFrom !== undefined ? parseFloat(el.dataset.countFrom) : 0;
    const dec = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    const final = dec ? String(parseFloat(target.toFixed(dec))) : String(Math.round(target));
    if (reduceMotion) { el.textContent = final; return; }
    const obj = { v: from };
    el.textContent = dec ? from.toFixed(dec) : Math.round(from);
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = dec ? obj.v.toFixed(dec) : Math.round(obj.v)),
      onComplete: () => (el.textContent = final),
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  /* ═══════════ Modules: pinned horizontal scroll (desktop) ═══════════ */
  const modulesPin = document.getElementById('modulesPin');
  const modulesTrack = document.getElementById('modulesTrack');
  const modulesBar = document.getElementById('modulesBar');
  const modulesIndex = document.getElementById('modulesIndex');

  const cardCount = modulesTrack ? modulesTrack.querySelectorAll('.mcard').length : 0;
  const pad2 = (n) => (n < 10 ? '0' + n : '' + n);
  if (modulesIndex) modulesIndex.textContent = pad2(1);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    if (reduceMotion) return;
    const getDistance = () => modulesTrack.scrollWidth - window.innerWidth + 2 * 16;
    gsap.to(modulesTrack, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: modulesPin,
        start: 'top top',
        end: () => '+=' + (getDistance() + window.innerHeight * 0.4),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          modulesBar.style.transform = `scaleX(${self.progress})`;
          const idx = Math.min(cardCount, Math.max(1, Math.round(self.progress * (cardCount - 1)) + 1));
          modulesIndex.textContent = pad2(idx);
        },
      },
    });
  });

  /* ═══════════ CERTIQ: self-running demo of two real CERTI flows ═══════════
     Scripted from the actual Arcade walkthroughs (customer complaint / allergen
     mismatch), including the real issue IDs, evidence sources and root causes.
     Plays on its own and cycles between the two; pauses when scrolled away. */
  const certiqThread = document.getElementById('certiqThread');
  if (certiqThread) {
    const scenarioEl = document.getElementById('certiqScenario');
    const placeholder = document.getElementById('certiqPlaceholder');

    let token = 0;          // bumped to cancel an in-flight run
    let flowIndex = 0;
    let timer = null;

    function el(tag, cls, html) {
      const n = document.createElement(tag);
      if (cls) n.className = cls;
      if (html !== undefined) n.innerHTML = html;
      return n;
    }
    function add(node) {
      certiqThread.appendChild(node);
      certiqThread.scrollTop = certiqThread.scrollHeight;   // keep the latest in view
      return node;
    }
    const wait = (ms) => new Promise((res) => { timer = setTimeout(res, ms); });

    const user = (t) => el('div', 'cq-msg cq-msg--user', t);
    const ai = (t) => el('div', 'cq-msg cq-msg--ai', t);
    const facts = (label, rows) =>
      el('div', 'cq-card',
        '<span class="cq-card__label">' + label + '</span><dl class="cq-facts">' +
        rows.map((r) => '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>').join('') + '</dl>');
    const finding = (label, text, sources) =>
      el('div', 'cq-card',
        '<span class="cq-card__label">' + label +
        '<span class="cq-card__badge">Supported</span></span>' +
        '<p class="cq-card__text">' + text + '</p>' +
        '<span class="cq-card__src">' + sources + '</span>');
    const listCard = (label, items, note) =>
      el('div', 'cq-card',
        '<span class="cq-card__label">' + label + '</span><ul class="cq-list">' +
        items.map((i) => '<li>' + i + '</li>').join('') + '</ul>' +
        (note ? '<span class="cq-card__src">' + note + '</span>' : ''));
    const done = (t) => el('div', 'cq-done', '&check; ' + t);

    /* Each beat is either a pause with typing dots, or a node to append. */
    const FLOWS = [
      {
        label: 'Customer complaint',
        beats: [
          { node: () => user('A customer found a hard black fragment in a Chicken &amp; Orzo Bowl, lot BK-0619.'), hold: 900 },
          { typing: 1200 },
          { node: () => ai('Logged <strong>NCR-2026-0061</strong>. High priority, source customer complaint, Brightside Kitchen Line 1. Running the guided RCA now.'), hold: 900 },
          { node: () => facts('Investigation frame', [
              ['Issue', 'NCR-2026-0061'],
              ['Product', 'Chicken &amp; Orzo Bowl'],
              ['Line', 'Brightside Kitchen, Line 1'],
              ['Lot', 'BK-0619'],
            ]), hold: 1900 },
          { typing: 1400 },
          { node: () => ai('Two hypotheses hold up against your records.'), hold: 700 },
          { node: () => finding('Hypothesis 01',
              'Non-detectable standard cable tie introduced during overnight maintenance.',
              'Maintenance log &middot; Customer photo &middot; First-run timing'), hold: 2100 },
          { node: () => finding('Hypothesis 02',
              'Line clearance did not verify approved cable-tie detectability.',
              'Line-clearance record &middot; Approved consumables list'), hold: 2100 },
          { typing: 1300 },
          { node: () => finding('Confirmed root cause',
              'Maintenance consumables not controlled during line return-to-service.',
              'Overnight maintenance log &middot; Return-to-service sequence'), hold: 2000 },
          { node: () => done('CAPA BRIGHT-CA-03 drafted &middot; awaiting your approval'), hold: 1200 },
          { node: () => el('div', 'cq-hint', 'Line 1 cable-tie detectability verification &middot; BRC 4.11.3'), hold: 2600 },
        ],
      },
      {
        label: 'Allergen mismatch',
        beats: [
          { node: () => ai('This one surfaced on its own in the feed: a label-to-spec allergen mismatch on the Savory Flavor Base.'), hold: 1400 },
          { node: () => facts('Undeclared milk risk', [
              ['Issue', 'ISS-2026-0042'],
              ['Product', 'Roasted Garlic Multigrain Crackers'],
              ['Material', 'Savory Flavor Base'],
              ['Facility', 'Northpeak Nutrition'],
            ]), hold: 2000 },
          { typing: 1400 },
          { node: () => ai('The incoming material now declares milk. The spec sheet on file never caught up, and neither did the consumer label built from it.'), hold: 1800 },
          { node: () => finding('What happened',
              'Supplier changed the ingredient and relabeled, but never issued an updated spec sheet.',
              'Incoming label &amp; COA &middot; Spec on file SPEC-SFB-007, rev. 3'), hold: 2300 },
          { typing: 1400 },
          { node: () => listCard('Systemic root causes', [
              'Spec of record was never superseded when the material changed',
              'No receipt control forces a label-to-spec comparison at intake',
              'No control re-checks finished labels when a spec or BOM changes',
            ], 'Every claim cited to the document it came from'), hold: 2600 },
          { node: () => done('3 CAPAs drafted &middot; awaiting your approval'), hold: 2600 },
        ],
      },
    ];

    async function typingFor(ms, myToken) {
      const t = add(el('div', 'cq-typing', '<span></span><span></span><span></span>'));
      await wait(ms);
      t.remove();
      return token === myToken;
    }

    async function runLoop() {
      const myToken = ++token;
      while (token === myToken) {
        const flow = FLOWS[flowIndex];
        if (scenarioEl) scenarioEl.textContent = flow.label;
        certiqThread.innerHTML = '';
        if (placeholder) placeholder.textContent = 'CERTIQ is working…';

        for (const beat of flow.beats) {
          if (token !== myToken) return;
          if (beat.typing) {
            if (!(await typingFor(beat.typing, myToken))) return;
          }
          if (token !== myToken) return;
          if (beat.node) add(beat.node());
          await wait(beat.hold || 800);
        }
        if (token !== myToken) return;
        flowIndex = (flowIndex + 1) % FLOWS.length;
      }
    }

    function stop() {
      token++;                      // cancels the running loop
      if (timer) clearTimeout(timer);
    }

    function renderStatic() {
      const flow = FLOWS[0];
      if (scenarioEl) scenarioEl.textContent = flow.label;
      certiqThread.innerHTML = '';
      flow.beats.filter((b) => b.node).forEach((b) => certiqThread.appendChild(b.node()));
    }

    if (reduceMotion) {
      renderStatic();
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) runLoop();
        else stop();
      }, { threshold: 0.25 }).observe(certiqThread);
    } else {
      runLoop();
    }
  }

  /* ═══════════ CTA headline reveal ═══════════ */
  if (!reduceMotion) {
    gsap.to('.cta .line__inner', {
      y: 0,
      duration: 1.3,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.cta', start: 'top 70%' },
    });
    gsap.to('.cta__disc', {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  } else {
    gsap.set('.cta .line__inner', { y: 0 });
  }

  /* ═══════════ Footer wordmark parallax ═══════════ */
  if (!reduceMotion) {
    gsap.fromTo('.footer__wordmark img',
      { yPercent: 18, opacity: 0.4 },
      {
        yPercent: 0, opacity: 0.92,
        ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'center bottom', scrub: 1 },
      });
  }

  /* ═══════════ AGENT FLOOR: one film, scrubbed by scroll ═══════════
     Eleven agent shots were conformed into a single 38s master (img/orbit/floor.mp4) with
     the transitions cut into the footage. The video NEVER plays: scroll position is written
     straight to currentTime, so the picture only ever moves because the user moved. Scroll
     back and the film runs backwards. On top of that the plane sits in a perspective box
     and gets pushed/tilted by scroll velocity, so travelling fast reads as depth.
     Phones and reduced-motion get the stills instead. */
  const orbit = document.getElementById('orbit');
  if (orbit) {
    /* [role, name, task, clip basename] — the real eleven, in floor order */
    const AGENTS = [
      /* Within a role, each agent's task line opens with what makes it different from its
         neighbour. The pairs 01/02, 04/05 and 08/09 are genuinely close in scope, so the
         distinction has to be the first thing you read or they look like the same agent twice. */
      ['Investigation', 'Guided root cause', 'Investigates with you. Runs an interactive 5-Whys, builds competing hypotheses, then hunts for the evidence that would disprove them.', 'a01'],
      /* a02 "One-pass root cause" was removed: it is not in the live product. Its clip is
         archived in assets-src/orbit/ and is no longer part of the conformed master. */
      ['Resolution', 'CAPA drafting', 'Turns a confirmed cause into corrective and preventive actions in your auditor’s exact format.', 'a03'],
      ['Standards', 'Document tagging', 'Starts from your documents. Reads each controlled document and tags the clauses it actually satisfies.', 'a04'],
      ['Standards', 'Clause breakdown', 'Starts from the standard. Works clause by clause, extracting what each one demands and whether a document is needed at all.', 'a05'],
      ['Standards', 'Coverage advisory', 'Reports strengths, gaps and evidence excerpts per clause, and can raise the issue itself.', 'a06'],
      ['Audit', 'Checklist analysis', 'Analyses internal-audit checklists against the standard before an auditor ever sees them.', 'a07'],
      ['Change', 'New product impact', 'Triggered by a launch. Finds every specification, allergen statement, label and HACCP record the new product touches, and scores the impact.', 'a08'],
      ['Change', 'New equipment impact', 'Triggered by a new line or machine. Finds the cleaning, maintenance, validation and training records affected, with recommended actions for each.', 'a09'],
      ['Change', 'Draft generation', 'Writes the proposed update for each impacted document, with edits, diffs and citations.', 'a10'],
      ['Knowledge', 'Metadata extraction', 'Crawls your drives, reads every file, and builds the searchable evidence base behind all of it.', 'a11'],
      ['Knowledge', 'Revision summaries', 'Diffs two versions of a document and states plainly what was added, changed and removed.', 'a12'],
    ];
    const DIR = 'img/orbit/';

    /* master-film geometry, must match the ffmpeg conform:
       12 clips of 4.041667s joined with 0.6s wipes, so each agent advances the
       timeline by CLIP - XFADE and the whole film is 41.9s */
    const CLIP = 4.041667;
    const XFADE = 0.6;
    const SEG = CLIP - XFADE;                      // 3.441667s of timeline per agent
    const FILM_DUR = AGENTS.length * CLIP - (AGENTS.length - 1) * XFADE;

    const stage = document.getElementById('orbitStage');
    const plane = document.getElementById('orbitPlane');
    const film = document.getElementById('orbitFilm');
    const runway = document.getElementById('orbitRunway');
    const idxEl = document.getElementById('orbitIdx');
    const roleEl = document.getElementById('orbitRole');
    const nameEl = document.getElementById('orbitName');
    const taskEl = document.getElementById('orbitTask');
    const ticksEl = document.getElementById('orbitTicks');
    const fillEl = document.getElementById('orbitFill');
    const listEl = document.getElementById('orbitList');

    const ticks = AGENTS.map(() => {
      const t = document.createElement('span');
      t.className = 'orbit__tick';
      ticksEl.appendChild(t);
      return t;
    });

    /* ---- fallback: stills only ---- */
    function buildList() {
      listEl.innerHTML = AGENTS.map(([role, name, task, file], i) =>
        '<li class="orbit__item">' +
        '<img src="' + DIR + file + '.webp" alt="" width="1280" height="548" loading="lazy" decoding="async" />' +
        '<div class="orbit__itembody">' +
        '<span class="orbit__itemidx">' + String(i + 1).padStart(2, '0') + ' &middot; ' + role + '</span>' +
        '<h4 class="orbit__itemname">' + name + '</h4>' +
        '<p class="orbit__itemtask">' + task + '</p>' +
        '</div></li>').join('');
      listEl.classList.add('is-shown');
      orbit.style.display = 'none';
    }

    if (reduceMotion || isTouch) {
      buildList();
    } else {
      /* ---- caption changes at the midpoint of each baked wipe ---- */
      let current = -1;
      function setBeat(i) {
        if (i === current) return;
        current = i;
        const [role, name, task] = AGENTS[i];
        idxEl.textContent = String(i + 1).padStart(2, '0');
        roleEl.textContent = role;
        nameEl.textContent = name;
        taskEl.textContent = task;
        ticks.forEach((t, n) => t.classList.toggle('is-live', n === i));
        gsap.fromTo([roleEl, nameEl, taskEl],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: true });
      }
      setBeat(0);

      /* ---- fetch the master only once the section is a screen or two away ---- */
      let ready = false;
      film.addEventListener('loadeddata', () => {
        ready = true;
        orbit.classList.add('is-ready');
      }, { once: true });
      film.addEventListener('error', buildList, { once: true });

      ScrollTrigger.create({
        trigger: orbit,
        start: 'top bottom+=60%',
        once: true,
        onEnter: () => { film.src = DIR + 'floor.mp4'; film.load(); },
      });

      /* ---- scroll → playhead ----
         pSmooth trails the raw scroll progress so the film carries a little weight, then
         one seek per frame at most. Seeks are cheap here because the master is encoded with
         a keyframe every 4 frames. */
      let pRaw = 0, pSmooth = 0, lastSeek = -1;
      let vel = 0, velEased = 0, active = false, ticking = false;

      function startTicker() {
        if (ticking) return;
        ticking = true;
        gsap.ticker.add(frame);
      }

      function frame() {
        /* film-weight inertia on the playhead */
        pSmooth += (pRaw - pSmooth) * 0.15;
        if (Math.abs(pRaw - pSmooth) < 0.0002) pSmooth = pRaw;

        const t = pSmooth * (film.duration || FILM_DUR);
        if (ready && Math.abs(t - lastSeek) > 1 / 48) {
          lastSeek = t;
          film.currentTime = t;
        }

        /* scroll velocity becomes depth: push back and tilt while moving, settle at rest */
        velEased += (vel - velEased) * 0.09;
        vel *= 0.88;
        const mag = Math.abs(velEased);
        plane.style.transform = 'translateZ(' + (-mag * 150).toFixed(2) + 'px) rotateX(' +
          (velEased * 2.4).toFixed(3) + 'deg) scale(' + (1.04 + mag * 0.03).toFixed(4) + ')';

        fillEl.style.width = (pSmooth * 100).toFixed(2) + '%';
        setBeat(Math.min(AGENTS.length - 1, Math.max(0, Math.floor((t - XFADE / 2) / SEG))));

        /* Once the section is off screen, keep ticking until the playhead has caught up to
           the real scroll position, then stand down. Cutting the ticker the moment the pin
           deactivates would leave the film frozen short of the final beats. */
        if (!active && pSmooth === pRaw && Math.abs(velEased) < 0.001) {
          ticking = false;
          gsap.ticker.remove(frame);
        }
      }

      /* ---- pin the stage; the runway is the film's length in scroll distance ---- */
      const BEAT_VH = 0.55;                    // scroll travel per agent
      runway.style.height = (AGENTS.length * BEAT_VH * 100) + 'vh';

      ScrollTrigger.create({
        trigger: orbit,
        start: 'top top+=12%',
        end: () => '+=' + (AGENTS.length * BEAT_VH * window.innerHeight),
        pin: stage,
        pinSpacing: false,
        invalidateOnRefresh: true,
        /* only burn frames while the film is on screen */
        onToggle: (self) => {
          active = self.isActive;
          if (active) startTicker();
        },
        /* progress stops updating once it clamps, so pin the playhead to the ends by hand */
        onLeave: () => { pRaw = 1; startTicker(); },
        onLeaveBack: () => { pRaw = 0; startTicker(); },
        onUpdate: (self) => {
          orbit.classList.toggle('is-engaged', self.progress > 0.01);
          pRaw = self.progress;
          vel = Math.max(-1, Math.min(1, self.getVelocity() / 2600));
        },
      });
    }
  }

  /* ═══════════ Book a demo (Cal.com inline embed, loaded on first open) ═══════════ */
  const CAL_LINK = 'certi/demo';   // cal.com/certi/demo
  const dmodal = document.getElementById('dmodal');
  if (dmodal) {
    const dClose = document.getElementById('dmodalClose');
    const calMount = document.getElementById('calMount');
    let calLoaded = false;
    let dLastFocused = null;

    /* Cal.com's official queue stub. It must exist BEFORE embed.js runs: embed.js does
       not define window.Cal itself, it flushes the queue this stub creates. Invoking the
       stub is also what fetches the script, so nothing loads until the first booking click. */
    function installCal() {
      if (window.Cal) return;
      (function (C, A, L) {
        const p = function (a, ar) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');
    }

    function calFallback() {
      calMount.classList.remove('is-loading');
      calMount.innerHTML =
        '<div style="padding:2.5rem 2rem;text-align:center">' +
        '<p style="color:var(--muted);margin-bottom:1.2rem">The calendar could not load here.</p>' +
        '<a class="btn btn--plum" href="https://cal.com/' + CAL_LINK + '" target="_blank" rel="noopener">' +
        '<span class="btn__label">Open the booking page</span></a></div>';
    }

    function initCal() {
      if (calLoaded) return;
      calLoaded = true;
      calMount.classList.add('is-loading');
      try {
        installCal();
        window.Cal('init', { origin: 'https://app.cal.com' });
        /* month_view renders calendar + time slots side by side (compact, ~540px) as long as
           the container is wide enough. Below roughly 700px Cal stacks them and the embed
           doubles in height, so the CSS keeps this column wide at every breakpoint.
           column_view was measurably worse here: 1184px vs 538px. */
        window.Cal('inline', {
          elementOrSelector: '#calMount',
          calLink: CAL_LINK,
          config: { layout: 'month_view' },
        });
        window.Cal('ui', {
          layout: 'month_view',
          hideEventTypeDetails: false,  // show Cal's own event details too; suppress nothing
          cssVarsPerTheme: {
            light: { 'cal-brand': '#51344D' },   // plum signature
            dark: { 'cal-brand': '#CCCCFF' },
          },
        });
      } catch (e) {
        calFallback();
        return;
      }
      // Watchdog: if Cal never paints an iframe, show the direct link instead.
      let waited = 0;
      const tick = setInterval(() => {
        waited += 250;
        const ifr = calMount.querySelector('iframe');
        if (ifr) {
          calMount.classList.remove('is-loading');
          clearInterval(tick);
          /* Cal resizes the iframe as the user moves between steps (pick a time ->
             booking form). Snap the column back to the top so each new step starts
             visible instead of leaving the user stranded mid-scroll. */
          if ('ResizeObserver' in window) {
            let lastH = 0;
            new ResizeObserver(() => {
              const h = ifr.getBoundingClientRect().height;
              if (Math.abs(h - lastH) > 40) {
                lastH = h;
                document.querySelector('.dmodal__cal').scrollTo({ top: 0, behavior: 'smooth' });
              }
            }).observe(ifr);
          }
        } else if (waited >= 12000) {
          clearInterval(tick);
          calFallback();
        }
      }, 250);
    }

    function openDemo() {
      dLastFocused = document.activeElement;
      initCal();
      dmodal.classList.add('is-open');
      dmodal.setAttribute('aria-hidden', 'false');
      if (cursor) cursor.dataset.state = '';
      if (lenis) lenis.stop();
      dClose.focus();
    }

    function closeDemo() {
      dmodal.classList.remove('is-open');
      dmodal.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();          // no scrollTo here, so no Lenis race
      if (dLastFocused) dLastFocused.focus();
    }

    /* Buttons are real links to cal.com, so they still work without JS.
       With JS we intercept and keep people on-site in the modal. */
    document.querySelectorAll('[data-demo]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
        e.preventDefault();
        openDemo();
      });
    });

    dmodal.querySelectorAll('[data-dm-close]').forEach((el) => el.addEventListener('click', closeDemo));
    dClose.addEventListener('click', closeDemo);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dmodal.classList.contains('is-open')) closeDemo();
    });
  }

  /* ═══════════ Quickstart demos: Arcade in a modal ═══════════
     Clicking a card opens the demo in a modal rather than expanding the card. The embed has
     to sit outside the quickstart rail: that rail is a transformed element inside a
     ScrollTrigger pin, and an iframe under a transform inside a fixed container does not
     reliably receive clicks — the demo paints correctly and then ignores every one. The same
     Arcade embed is fully interactive on getcerti.com, where nothing is transformed above it.
     The modal lives at the end of <body> for exactly that reason. */
  /* Each quickstart's Arcade demo. Leave "" to show the "coming soon" placeholder.
     Params are Arcade's own, copied verbatim from the live getcerti.com embeds — the player
     ships its own control bar (fullscreen, copy link, step nav), so we do not add or remove
     controls of our own. */
  const ARCADE_EMBED = '?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true';
  const arcade = (id) => 'https://demo.arcade.software/' + id + ARCADE_EMBED;
  const ARCADE = {
    /* "Submit and Investigate a Customer Complaint" — guided root cause into a CAPA */
    capa:     arcade('PWBNgAKPv8EJf19bvGFh'),
    supplier: '',
    gfsi:     '',
    /* "Manage Change Requests for SQF Food Safety Code Updates" — change impact analysis */
    docs:     arcade('cBFS9NrdbaO31ZYF8530'),
    /* "Submit a Batch Record and Resolve COA Holds" — the production record flow */
    forms:    arcade('tij5FFovUpB2Osh5YYAp'),
    recall:   '',
    /* "Review and Resolve an Allergen Mismatch in Product Labeling" — spec conflict caught */
    label:    arcade('bP7Y8IEhBHDzW04BhAvw'),
    em:       '',
  };
  const QS_KEYS = ['capa', 'supplier', 'gfsi', 'docs', 'forms', 'recall', 'label', 'em'];

  const qsCards = [...document.querySelectorAll('#quickstarts .mcard')];
  const qsmodal = document.getElementById('qsmodal');
  if (qsCards.length && qsmodal) {
    const qsPanel = qsmodal.querySelector('.qsmodal__panel');
    const qsMount = document.getElementById('qsmodalMount');
    const qsTitle = document.getElementById('qsmodalTitle');
    const qsClose = document.getElementById('qsmodalClose');

    const label = (card) => card.querySelector('.mcard__name')?.textContent.trim() || 'Quickstart';
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

    let lastFocus = null;
    let isOpen = false;

    function openQs(card, key) {
      const url = ARCADE[key];
      qsTitle.textContent = label(card);
      /* Arcade's official embed, verbatim: the wrapper is a padding-bottom aspect box holding
         the demo's own ratio (49.296875%) plus 41px for the player's control bar, where its
         fullscreen, copy-link and step controls live. Nothing may resize the iframe. */
      qsMount.innerHTML = url
        ? '<div style="position:relative;padding-bottom:calc(49.296875% + 41px);height:0;width:100%">' +
          '<iframe src="' + url + '" title="' + esc(label(card)) + ' interactive demo"' +
          /* all three fullscreen attributes, as Arcade's own snippet ships them: WebKit still
             wants the prefixed form, and without it the player's fullscreen button does
             nothing in Safari even though allow="fullscreen" satisfies Chrome */
          ' frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen' +
          ' allow="clipboard-write; fullscreen"' +
          ' style="position:absolute;top:0;left:0;width:100%;height:100%;color-scheme:light"></iframe>' +
          '</div>'
        : '<div class="mcard__soon"><span>Interactive demo coming soon</span></div>';

      track('quickstart_demo_opened', { quickstart: key, name: label(card), hasDemo: !!url });

      lastFocus = document.activeElement;
      isOpen = true;
      qsmodal.classList.add('is-open');
      qsmodal.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();          // the page must not scroll behind the modal
      qsClose.focus();
      /* drop the panel's entrance transform once it has landed, so nothing transformed sits
         above the iframe while the user is actually clicking around in it */
      setTimeout(() => { if (isOpen) qsmodal.classList.add('is-settled'); }, 480);
    }

    function closeQs() {
      if (!isOpen) return;
      isOpen = false;
      /* leave fullscreen before the iframe it belongs to is removed */
      const fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (fs && qsmodal.contains(fs)) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) Promise.resolve(exit.call(document)).catch(() => {});
      }
      qsmodal.classList.remove('is-settled');   // restore the transform for the exit
      qsmodal.classList.remove('is-open');
      qsmodal.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      /* unload the iframe once the fade has finished, so it does not vanish mid-transition */
      setTimeout(() => { if (!isOpen) qsMount.innerHTML = ''; }, 420);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    qsCards.forEach((card, i) => {
      const key = QS_KEYS[i] || ('qs' + i);
      card.dataset.qs = key;
      const body = card.querySelector('.mcard__body');
      if (body && !body.querySelector('.mcard__cta')) {
        const cta = document.createElement('span');
        cta.className = 'mcard__cta';
        cta.setAttribute('aria-hidden', 'true');
        cta.innerHTML = 'View demo <i>&rarr;</i>';
        body.appendChild(cta);
      }
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', label(card) + ', view interactive demo');
      card.addEventListener('click', () => openQs(card, key));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openQs(card, key); }
      });
    });

    qsmodal.querySelectorAll('[data-qs-close]').forEach((el) => el.addEventListener('click', closeQs));
    qsClose.addEventListener('click', closeQs);
    /* clicks inside the panel must not reach the scrim */
    qsPanel.addEventListener('click', (e) => e.stopPropagation());
    /* Escape belongs to fullscreen first: the browser uses it to exit, and closing the modal
       on the same keystroke would tear the demo away mid-view. */
    window.addEventListener('keydown', (e) => {
      const fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (e.key === 'Escape' && isOpen && !fs) closeQs();
    });
  }

  /* ═══════════ Back to top ═══════════ */
  document.getElementById('toTop').addEventListener('click', () => scrollToTarget('#top'));

  /* refresh after fonts settle (metrics shift) */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
