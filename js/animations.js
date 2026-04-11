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
      pin: '.hero__wrapper',
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

  // Ken Burns on bg — separate scrub (runs in parallel with content timeline)
  gsap.to('.hero__bg-placeholder', {
    scale: 1.1,
    ease: 'none',
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
  // Reset initial states for mobile (override animations.css)
  gsap.set('.hero__headline .char', { opacity: 1, y: 0 });
  gsap.set('.hero__sub .word', { opacity: 1, y: 0 });
  gsap.set('.service-card', { opacity: 1, x: 0 });
  gsap.set('.industry-item__text', { opacity: 1, x: 0 });
  gsap.set('.industry-item__line', { scaleX: 1 });
  gsap.set('.differentiator .word', { opacity: 1 });
  gsap.set('.hero__logomark', { opacity: 1 });
  gsap.set('.hero__cta', { opacity: 1, y: 0 });

  // Simple fade-in for remaining elements
  ['.clients__grid', '.testimonial', '.contact__inner'].forEach(sel => {
    gsap.to(sel, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sel,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stats: just show final numbers on mobile
  document.querySelectorAll('.stat__num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    el.textContent = target.toLocaleString('en-IN');
  });
}
