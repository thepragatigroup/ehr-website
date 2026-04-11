// main.js — entry point

import { initScroll } from './scroll.js';
import { initAnimations } from './animations.js';

// Run splitting.js on all data-splitting elements
Splitting();

// Init smooth scroll
initScroll();

// Init all GSAP animations
initAnimations();
