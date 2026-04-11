# EHR Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, scroll-driven marketing website for Express HR Solutions using Vanilla HTML/CSS/JS + GSAP + Lenis, deployed to Vercel.

**Architecture:** Static single-page site. Lenis handles smooth scroll physics. GSAP ScrollTrigger with `scrub` ties animation progress directly to scroll position (rewindable). Pinned sections give the cinematic Terminal Industries feel adapted for warehousing/manpower.

**Tech Stack:** HTML5, CSS3, ES Modules, Lenis 1.x, GSAP 3.x + ScrollTrigger, splitting.js 1.x, Vercel (existing account)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All markup, CDN script imports, section structure |
| `css/main.css` | CSS custom properties, layout, typography, section styles |
| `css/animations.css` | Initial hidden states for all animated elements |
| `js/scroll.js` | Lenis init + GSAP ticker integration |
| `js/animations.js` | All GSAP ScrollTrigger timelines |
| `js/main.js` | Entry point: imports scroll.js + animations.js, calls splitting.js |
| `assets/logo-icon.png` | Existing orange logo mark (already present) |
| `assets/images/hero-bg.jpg` | Hero background (placeholder: CSS gradient until real photo provided) |

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `css/main.css`
- Create: `css/animations.css`
- Create: `js/main.js`
- Create: `js/scroll.js`
- Create: `js/animations.js`

- [ ] **Step 1: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express HR Solutions — Warehouse Manpower at Scale</title>
  <meta name="description" content="India's most reliable warehouse workforce partner. Express HR Solutions delivers compliant, scalable manpower for your operations.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/animations.css">

  <!-- splitting.js -->
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css">
</head>
<body>

  <!-- NAV -->
  <nav class="nav">
    <a href="#" class="nav__logo">
      <img src="assets/logo-icon.png" alt="Express HR Solutions" width="40" height="40">
      <span class="nav__name">Express HR Solutions</span>
    </a>
    <a href="mailto:contact@expresshrsolutions.com" class="nav__cta">Contact Us</a>
  </nav>

  <!-- HERO -->
  <section id="hero" class="section section--hero">
    <div class="hero__bg">
      <!-- Replace src with real warehouse photo before launch -->
      <div class="hero__bg-placeholder"></div>
    </div>
    <div class="hero__content">
      <h1 class="hero__headline" data-splitting>Manpower at Scale.</h1>
      <div class="hero__logomark">
        <img src="assets/logo-icon.png" alt="">
      </div>
      <p class="hero__sub" data-splitting="words">India's most reliable warehouse workforce partner.</p>
      <a href="mailto:contact@expresshrsolutions.com" class="hero__cta">Get in Touch →</a>
    </div>
  </section>

  <!-- WHAT WE DO -->
  <section id="services" class="section section--services">
    <div class="services__inner">
      <p class="section__label">What We Do</p>
      <div class="services__cards">
        <div class="service-card" data-card="0">
          <span class="service-card__num">01</span>
          <h3 class="service-card__title">Warehouse Operations</h3>
          <p class="service-card__desc">Inventory management, pallet movement, dock coordination — fully managed on your floor.</p>
        </div>
        <div class="service-card" data-card="1">
          <span class="service-card__num">02</span>
          <h3 class="service-card__title">Workforce Deployment</h3>
          <p class="service-card__desc">Background-verified, trained manpower deployed to your site within days, not weeks.</p>
        </div>
        <div class="service-card" data-card="2">
          <span class="service-card__num">03</span>
          <h3 class="service-card__title">Compliance & Governance</h3>
          <p class="service-card__desc">Full PF, ESI, and labour law compliance. Every worker, every site. Zero liability for you.</p>
        </div>
        <div class="service-card" data-card="3">
          <span class="service-card__num">04</span>
          <h3 class="service-card__title">Payroll & Attendance</h3>
          <p class="service-card__desc">Automated payroll processing and real-time attendance tracking across all your facilities.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- INDUSTRIES -->
  <section id="industries" class="section section--industries">
    <p class="section__label">Industries We Serve</p>
    <ul class="industries__list">
      <li class="industry-item">
        <span class="industry-item__text">Retail / E-Commerce</span>
        <span class="industry-item__line"></span>
      </li>
      <li class="industry-item">
        <span class="industry-item__text">Electronics</span>
        <span class="industry-item__line"></span>
      </li>
      <li class="industry-item">
        <span class="industry-item__text">FMCG</span>
        <span class="industry-item__line"></span>
      </li>
      <li class="industry-item">
        <span class="industry-item__text">Construction</span>
        <span class="industry-item__line"></span>
      </li>
      <li class="industry-item">
        <span class="industry-item__text">Oil &amp; Gas</span>
        <span class="industry-item__line"></span>
      </li>
      <li class="industry-item">
        <span class="industry-item__text">Corporate Facilities</span>
        <span class="industry-item__line"></span>
      </li>
    </ul>
  </section>

  <!-- STATS -->
  <section id="stats" class="section section--stats">
    <div class="stats__inner">
      <p class="section__label">Our Scale</p>
      <div class="stats__grid">
        <div class="stat">
          <div class="stat__num-wrap">
            <span class="stat__num" data-target="15000">0</span>
            <span class="stat__suffix">+</span>
          </div>
          <span class="stat__label">Workforce Deployed</span>
        </div>
        <div class="stat">
          <div class="stat__num-wrap">
            <span class="stat__num" data-target="80">0</span>
            <span class="stat__suffix">+</span>
          </div>
          <span class="stat__label">Active Sites</span>
        </div>
        <div class="stat">
          <div class="stat__num-wrap">
            <span class="stat__num" data-target="20">0</span>
            <span class="stat__suffix">+</span>
          </div>
          <span class="stat__label">Cities Served</span>
        </div>
        <div class="stat">
          <div class="stat__num-wrap">
            <span class="stat__num" data-target="50">0</span>
            <span class="stat__suffix">+</span>
          </div>
          <span class="stat__label">Clients</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CLIENT LOGOS -->
  <section id="clients" class="section section--clients">
    <p class="section__label">Trusted By</p>
    <div class="clients__grid">
      <!-- Replace with real logo <img> tags before launch -->
      <div class="client-logo-placeholder">Client Logo</div>
      <div class="client-logo-placeholder">Client Logo</div>
      <div class="client-logo-placeholder">Client Logo</div>
      <div class="client-logo-placeholder">Client Logo</div>
      <div class="client-logo-placeholder">Client Logo</div>
      <div class="client-logo-placeholder">Client Logo</div>
    </div>
  </section>

  <!-- WHY CHOOSE US -->
  <section id="why" class="section section--why">
    <p class="section__label">Why Express HR</p>
    <ul class="differentiators">
      <li class="differentiator" data-splitting="words">Full statutory compliance. Always.</li>
      <li class="differentiator" data-splitting="words">On-ground productivity you can measure.</li>
      <li class="differentiator" data-splitting="words">Scale fast. No compromises.</li>
    </ul>
  </section>

  <!-- TESTIMONIAL -->
  <section id="testimonial" class="section section--testimonial">
    <blockquote class="testimonial">
      <p class="testimonial__quote">"Express HR Solutions turned our warehouse operations from a bottleneck into a competitive advantage."</p>
      <footer class="testimonial__attr">— [Client Name], [Title], [Company]</footer>
    </blockquote>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="section section--contact">
    <div class="contact__inner">
      <h2 class="contact__headline">Let's Work Together.</h2>
      <a href="mailto:contact@expresshrsolutions.com" class="contact__email">contact@expresshrsolutions.com</a>
    </div>
  </section>

  <!-- Scripts -->
  <script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
  <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create css/main.css**

```css
/* ── Custom Properties ─────────────────────────────────── */
:root {
  --bg:      #0D0D0D;
  --surface: #1A1A1A;
  --orange:  #F47920;
  --white:   #FFFFFF;
  --muted:   #888888;

  --font-sans: 'Inter', sans-serif;
  --font-mono: 'Courier New', monospace; /* Geist Mono loaded via JS if needed */
}

/* ── Reset ─────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body {
  background: var(--bg);
  color: var(--white);
  font-family: var(--font-sans);
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ── Nav ───────────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 3rem;
  background: rgba(13,13,13,0.85);
  backdrop-filter: blur(12px);
}
.nav__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.nav__name {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.nav__cta {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--orange);
  border: 1px solid var(--orange);
  padding: 0.5rem 1.25rem;
  transition: background 0.2s, color 0.2s;
}
.nav__cta:hover {
  background: var(--orange);
  color: var(--bg);
}

/* ── Section Base ──────────────────────────────────────── */
.section {
  position: relative;
  width: 100%;
}
.section__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 2rem;
}

/* ── Hero ──────────────────────────────────────────────── */
.section--hero {
  height: 300vh; /* extra height for pin scroll travel */
}
.hero__bg {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.hero__bg-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  /* Replace with <img> when real photo is available */
}
.hero__content {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 3rem;
  z-index: 2;
}
.hero__headline {
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  max-width: 14ch;
}
.hero__logomark {
  margin-top: 2rem;
  width: 64px;
  height: 64px;
}
.hero__logomark img { width: 100%; height: 100%; object-fit: contain; }
.hero__sub {
  margin-top: 1.5rem;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--muted);
  max-width: 40ch;
}
.hero__cta {
  margin-top: 2.5rem;
  display: inline-block;
  background: var(--orange);
  color: var(--bg);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.9rem 2rem;
  transition: opacity 0.2s;
}
.hero__cta:hover { opacity: 0.85; }

/* ── Services ──────────────────────────────────────────── */
.section--services {
  height: 400vh;
}
.services__inner {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3rem;
  overflow: hidden;
}
.services__cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}
.service-card {
  background: var(--surface);
  border-left: 3px solid var(--orange);
  padding: 1.5rem 2rem;
  max-width: 520px;
}
.service-card__num {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--orange);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}
.service-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
.service-card__desc {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

/* ── Industries ────────────────────────────────────────── */
.section--industries {
  padding: 8rem 3rem;
}
.industries__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.industry-item {
  position: relative;
  padding: 1.5rem 0;
  border-top: 1px solid #222;
  overflow: hidden;
}
.industry-item:last-child { border-bottom: 1px solid #222; }
.industry-item__text {
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  font-weight: 700;
  display: block;
}
.industry-item__line {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
  height: 2px;
  background: var(--orange);
  transform-origin: left center;
}

/* ── Stats ─────────────────────────────────────────────── */
.section--stats {
  height: 300vh;
}
.stats__inner {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  text-align: center;
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 1rem;
}
.stat__num-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.1em;
}
.stat__num {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  color: var(--orange);
  font-family: 'Courier New', monospace;
}
.stat__suffix {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--orange);
  font-family: 'Courier New', monospace;
}
.stat__label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

/* ── Clients ───────────────────────────────────────────── */
.section--clients {
  padding: 8rem 3rem;
}
.clients__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 800px;
}
.client-logo-placeholder {
  height: 80px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

/* ── Why Choose Us ─────────────────────────────────────── */
.section--why {
  padding: 8rem 3rem;
}
.differentiators {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.differentiator {
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 700;
  padding: 2rem 0;
  border-top: 1px solid #222;
  line-height: 1.1;
}
.differentiator:last-child { border-bottom: 1px solid #222; }

/* ── Testimonial ───────────────────────────────────────── */
.section--testimonial {
  padding: 8rem 3rem;
  display: flex;
  justify-content: center;
}
.testimonial {
  max-width: 700px;
  text-align: center;
}
.testimonial__quote {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.6;
  font-style: italic;
  color: var(--white);
}
.testimonial__attr {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--muted);
}

/* ── Contact ───────────────────────────────────────────── */
.section--contact {
  background: var(--orange);
  padding: 10rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact__inner { text-align: center; }
.contact__headline {
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 900;
  color: var(--bg);
  line-height: 0.95;
  margin-bottom: 1.5rem;
}
.contact__email {
  font-size: clamp(1rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: var(--bg);
  border-bottom: 2px solid var(--bg);
  padding-bottom: 0.2rem;
  transition: opacity 0.2s;
}
.contact__email:hover { opacity: 0.7; }

/* ── Mobile ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav { padding: 1rem 1.25rem; }
  .hero__content, .services__inner, .stats__inner,
  .section--industries, .section--clients, .section--why,
  .section--testimonial, .section--contact { padding-left: 1.25rem; padding-right: 1.25rem; }
  .stats__grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  .clients__grid { grid-template-columns: repeat(2, 1fr); }
  /* Pinned scroll disabled on mobile — handled in animations.js */
}
```

- [ ] **Step 3: Create css/animations.css** (initial hidden states)

```css
/* Elements start hidden; GSAP animates them in */

/* Hero */
.hero__headline .char { opacity: 0; transform: translateY(30px); }
.hero__logomark      { opacity: 0; }
.hero__sub .word     { opacity: 0; transform: translateY(20px); }
.hero__cta           { opacity: 0; transform: translateY(20px); }

/* Services */
.service-card { opacity: 0; transform: translateX(100%); }

/* Industries */
.industry-item__line { transform: scaleX(0); transform-origin: left center; }
.industry-item__text { opacity: 0; transform: translateX(-20px); }

/* Stats */
/* stat__num starts at "0" in HTML — no CSS needed */

/* Clients */
.clients__grid { opacity: 0; transform: translateY(40px); }

/* Why Choose Us */
.differentiator .word { opacity: 0; }

/* Testimonial */
.testimonial { opacity: 0; transform: translateY(40px); }

/* Contact */
.contact__inner { opacity: 0; transform: translateY(40px); }
```

- [ ] **Step 4: Create js/scroll.js**

```js
// scroll.js — Lenis smooth scroll, feeds into GSAP ticker

export function initScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Feed Lenis RAF into GSAP ticker so ScrollTrigger stays in sync
  gsap.ticker.add(time => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
```

- [ ] **Step 5: Create js/animations.js**

```js
// animations.js — all GSAP ScrollTrigger timelines

const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  if (isMobile()) {
    initMobileAnimations();
    return;
  }

  initHero();
  initServices();
  initIndustries();
  initStats();
  initClients();
  initWhy();
  initTestimonial();
  initContact();
}

// ── Hero (pinned, scrubbed) ──────────────────────────────
function initHero() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: '.hero__content',
      anticipatePin: 1,
    },
  });

  tl.to('.hero__headline .char', {
      opacity: 1,
      y: 0,
      stagger: 0.015,
      ease: 'power2.out',
      duration: 0.5,
    })
    .to('.hero__logomark', { opacity: 1, duration: 0.3 }, '-=0.2')
    .to('.hero__sub .word', {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: 'power2.out',
      duration: 0.3,
    }, '-=0.1')
    .to('.hero__cta', { opacity: 1, y: 0, duration: 0.2 }, '-=0.1');

  // Ken Burns on bg image — separate scrub
  gsap.to('.hero__bg-placeholder', {
    scale: 1.1,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '+=200%',
      scrub: 1,
    },
  });
}

// ── Services (pinned, scrubbed, cards one by one) ────────
function initServices() {
  const cards = gsap.utils.toArray('.service-card');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#services',
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: '.services__inner',
      anticipatePin: 1,
    },
  });

  cards.forEach((card, i) => {
    tl.to(card, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      ease: 'power2.out',
    }, i * 0.3);
  });
}

// ── Industries (not pinned, per-item scrub) ──────────────
function initIndustries() {
  document.querySelectorAll('.industry-item').forEach(item => {
    const text = item.querySelector('.industry-item__text');
    const line = item.querySelector('.industry-item__line');

    gsap.to(text, {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    gsap.to(line, {
      scaleX: 1,
      scrollTrigger: {
        trigger: item,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
    });
  });
}

// ── Stats (pinned, numbers count with scroll) ────────────
function initStats() {
  const statEls = document.querySelectorAll('.stat__num');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#stats',
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: '.stats__inner',
      anticipatePin: 1,
    },
  });

  statEls.forEach((el, i) => {
    const target = parseInt(el.dataset.target, 10);
    const proxy = { val: 0 };

    tl.to(proxy, {
      val: target,
      duration: 0.4,
      ease: 'none',
      onUpdate() {
        el.textContent = Math.round(proxy.val).toLocaleString('en-IN');
      },
    }, i * 0.25);
  });
}

// ── Clients (fade-in grid) ───────────────────────────────
function initClients() {
  gsap.to('.clients__grid', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '#clients',
      start: 'top 75%',
      end: 'top 40%',
      scrub: 1,
    },
  });
}

// ── Why Choose Us (word-by-word reveal) ──────────────────
function initWhy() {
  document.querySelectorAll('.differentiator').forEach(el => {
    gsap.to(el.querySelectorAll('.word'), {
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
    });
  });
}

// ── Testimonial (fade + slide) ───────────────────────────
function initTestimonial() {
  gsap.to('.testimonial', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '#testimonial',
      start: 'top 70%',
      end: 'top 35%',
      scrub: 1,
    },
  });
}

// ── Contact (fade in) ────────────────────────────────────
function initContact() {
  gsap.to('.contact__inner', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      end: 'top 35%',
      scrub: 1,
    },
  });
}

// ── Mobile fallback (simple fade-ins, no pins) ───────────
function initMobileAnimations() {
  const fadeEls = [
    '.hero__headline', '.hero__logomark', '.hero__sub', '.hero__cta',
    '.service-card', '.industry-item__text',
    '.clients__grid', '.differentiator', '.testimonial', '.contact__inner',
  ];

  // Reset initial states for mobile (override animations.css)
  gsap.set('.hero__headline .char', { opacity: 1, y: 0 });
  gsap.set('.hero__sub .word', { opacity: 1, y: 0 });
  gsap.set('.service-card', { opacity: 1, x: 0 });
  gsap.set('.industry-item__text', { opacity: 1, x: 0 });
  gsap.set('.industry-item__line', { scaleX: 1 });
  gsap.set('.differentiator .word', { opacity: 1 });

  // Simple fade-in for remaining elements
  ['.clients__grid', '.testimonial', '.contact__inner'].forEach(sel => {
    gsap.to(sel, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: sel,
        start: 'top 85%',
        end: 'top 60%',
        scrub: 1,
      },
    });
  });

  // Stats: just show final numbers on mobile
  document.querySelectorAll('.stat__num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    el.textContent = target.toLocaleString('en-IN');
  });
}
```

- [ ] **Step 6: Create js/main.js**

```js
// main.js — entry point

import { initScroll } from './scroll.js';
import { initAnimations } from './animations.js';

// Run splitting.js on all data-splitting elements
Splitting();

// Init smooth scroll
initScroll();

// Init all GSAP animations
initAnimations();
```

- [ ] **Step 7: Verify scaffold in browser**

Open `index.html` directly in Chrome (or run `npx serve .` in the `EHR Website/` folder).

Expected:
- Page loads with dark background, orange nav CTA
- No JS console errors
- All sections visible when scrolling (they're hidden by CSS but layout exists)
- Logo appears in nav

- [ ] **Step 8: Commit**

```bash
cd "/Users/rahuldas/Documents/Claude/EHR Website"
git init
git add index.html css/ js/ assets/logo-icon.png
git commit -m "feat: scaffold EHR website — HTML structure, CSS, JS modules"
```

---

## Task 2: Verify Scroll Animations

- [ ] **Step 1: Test Hero pin**

Open in browser, scroll slowly down from top.

Expected:
- `.hero__content` sticks to viewport
- Letters in "Manpower at Scale." appear one by one as you scroll
- Logo mark fades in
- Sub text words appear
- CTA button appears
- Background placeholder slowly scales (Ken Burns)
- Scroll UP: everything rewinds in reverse

If nothing animates: open browser console, check for GSAP/Lenis errors. Common fix: ensure CDN scripts load before `main.js` (check script order in `index.html`).

- [ ] **Step 2: Test Services pin**

Scroll past hero.

Expected:
- `.services__inner` sticks
- Cards slide in from right, one at a time
- Scroll up: cards retract right in reverse order

- [ ] **Step 3: Test Industries**

Expected:
- Each industry label fades/slides in from left as it enters viewport
- Orange underline draws left-to-right beneath each item
- Scrub up rewinds both

- [ ] **Step 4: Test Stats pin**

Expected:
- `.stats__inner` sticks
- Numbers count from 0 → target as you scroll
- Scroll up: numbers count back down

- [ ] **Step 5: Test remaining sections**

Expected:
- Client grid fades in as section enters
- Differentiator words appear word-by-word per line
- Testimonial fades + slides up
- Contact section content fades in

- [ ] **Step 6: Test mobile (resize to 375px width)**

Expected:
- No pinned sections
- All text/elements visible immediately
- Stat numbers show final values (not 0)
- Simple fade-ins for clients/testimonial/contact

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "fix: verify and confirm all scroll animations working"
```

---

## Task 3: Deploy to Vercel

- [ ] **Step 1: Create vercel.json**

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

- [ ] **Step 2: Push to GitHub**

Create a new repo on GitHub named `ehr-website`, then:

```bash
git remote add origin https://github.com/<your-username>/ehr-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

1. Go to vercel.com → Add New Project
2. Import the `ehr-website` GitHub repo
3. Framework preset: **Other** (static site, no build command needed)
4. Root directory: leave as `/`
5. Click Deploy

Expected: Vercel assigns a URL like `ehr-website.vercel.app`. Site is live.

- [ ] **Step 4: Verify live site**

Open the Vercel URL in browser. Repeat animation checks from Task 2, Step 1–6.

- [ ] **Step 5: Commit vercel.json**

```bash
git add vercel.json
git commit -m "chore: add vercel config for static deployment"
git push
```

---

## Before Launch Checklist (Not tasks — manual content swap)

These are placeholders to replace before the site goes live:

- `contact@expresshrsolutions.com` → real email address (appears in nav, hero CTA, contact section)
- `assets/images/hero-bg.jpg` → real warehouse/worker photograph; update `.hero__bg-placeholder` in HTML to `<img class="hero__bg-img" src="assets/images/hero-bg.jpg" alt="">`
- Stats numbers in `data-target` attributes → real numbers
- `.client-logo-placeholder` divs → real `<img>` tags with client logos
- Testimonial quote and attribution → real client quote
- Why Choose Us copy → refined brand messaging
- `<title>` and `<meta name="description">` → final SEO copy
