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
