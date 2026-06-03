/* ============================================================
   EXPRESS HR SOLUTIONS — main.js
   Sections: Setup → Lenis → Nav → Hero → Trust Bar →
             About → Services → Industries → Stats → Contact
             (added per step)
   ============================================================ */


/* === 1. REGISTER GSAP PLUGINS === */
gsap.registerPlugin(ScrollTrigger);


/* === 2. REDUCED MOTION CHECK === */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* === 3. LENIS SMOOTH SCROLL === */
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Keep GSAP ScrollTrigger in sync with Lenis scroll position
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* ============================================================
   HERO (Step 3)
   ============================================================ */

(function initHero() {
  const title = document.querySelector('.hero__title');
  if (!title) return;

  // Split headline into per-word spans with an overflow-hidden wrapper
  // so words slide up from below (no SplitText plugin needed)
  const rawHTML = title.innerHTML;
  // Preserve <br> tags — split each text node by spaces
  title.innerHTML = rawHTML.replace(/([^<>\s][^<>]*[^<>\s]|[^\s<>])/g, (match) => {
    // Wrap each word (non-tag content) in clip+word spans
    return match.split(' ').map(word =>
      word ? `<span class="hero__word-wrap"><span class="hero__word">${word}</span></span>` : ''
    ).join(' ');
  });

  const words = title.querySelectorAll('.hero__word');
  const sub   = document.querySelector('.hero__sub');
  const ctas  = document.querySelector('.hero__ctas');
  const stats = document.querySelector('.hero__stats');

  if (prefersReducedMotion) {
    // Skip animation — elements are already visible
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(words, {
    y: '110%',
    opacity: 0,
    duration: 0.75,
    stagger: 0.055,
  })
  .from(sub, {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.3')
  .from(ctas, {
    y: 16,
    opacity: 0,
    duration: 0.5,
  }, '-=0.3')
  .from(stats, {
    y: 12,
    opacity: 0,
    duration: 0.5,
  }, '-=0.25');
}());

/* ============================================================
   CONTACT (Step 9)
   ============================================================ */

if (!prefersReducedMotion) {
  gsap.from('.contact__left', {
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from('.contact__right', {
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.15,
  });
}

/* ============================================================
   STATS (Step 8)
   ============================================================ */

(function initStats() {
  const counters = document.querySelectorAll('.stats__num');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const obj    = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        // Use Indian number formatting (e.g. 50,000)
        el.textContent = Math.round(obj.val).toLocaleString('en-IN') + suffix;
      },
      onComplete() {
        // Ensure exact final value
        el.textContent = target.toLocaleString('en-IN') + suffix;
      },
    });
  }

  if (prefersReducedMotion) {
    // Show final values immediately without animation
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      el.textContent = target.toLocaleString('en-IN') + (el.dataset.suffix || '');
    });
    return;
  }

  ScrollTrigger.create({
    trigger: '.stats',
    start: 'top 70%',
    once: true,  // fire once — counters shouldn't reset on re-scroll
    onEnter() {
      counters.forEach(animateCounter);
    },
  });
}());

/* ============================================================
   INDUSTRIES (Step 7)
   ============================================================ */

if (!prefersReducedMotion) {
  gsap.from('.industry-tag', {
    scrollTrigger: { trigger: '.industries__grid', start: 'top 80%' },
    scale: 0.82,
    opacity: 0,
    duration: 0.45,
    stagger: 0.07,
    ease: 'back.out(1.5)',
  });
}

/* ============================================================
   SERVICES (Step 6)
   ============================================================ */

if (!prefersReducedMotion) {
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services__grid', start: 'top 78%' },
    y: 40,
    opacity: 0,
    duration: 0.65,
    stagger: 0.1,
    ease: 'power2.out',
  });
}

/* ============================================================
   ABOUT (Step 5)
   ============================================================ */

if (!prefersReducedMotion) {
  gsap.from('.about__left', {
    scrollTrigger: { trigger: '.about', start: 'top 72%' },
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  });

  gsap.from('.about__right', {
    scrollTrigger: { trigger: '.about', start: 'top 72%' },
    x: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.12,
  });
}

/* ============================================================
   NAV (Step 2)
   ============================================================ */

const nav        = document.getElementById('nav');
const navBurger  = document.getElementById('navBurger');
const navOverlay = document.getElementById('navOverlay');

// Transparent → white on scroll
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 80);
}, { passive: true });

// Hamburger toggle
navBurger.addEventListener('click', () => {
  const isOpen = navOverlay.classList.toggle('is-open');
  navBurger.classList.toggle('is-open', isOpen);
  navBurger.setAttribute('aria-expanded', isOpen);
  navOverlay.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close overlay when any link inside it is clicked
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navOverlay.classList.remove('is-open');
    navBurger.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});
