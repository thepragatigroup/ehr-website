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
   ANIMATIONS ADDED HERE IN SUBSEQUENT STEPS
   ============================================================ */
