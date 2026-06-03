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
