# EHR Website Design Spec
**Date:** 2026-04-12
**Project:** Express HR Solutions — New Marketing Website

---

## Overview

A single-page, scroll-driven marketing website for Express HR Solutions (expresshrsolutions.com), a B2B warehousing manpower company. The primary goal is to impress corporate decision-makers and get them to send an email. The site should feel bold, modern, and premium — inspired by Terminal Industries' cinematic scroll experience, adapted for a warehousing/manpower context.

---

## Goals

- **Primary CTA:** Get visitors to email Express HR Solutions
- **Audience:** B2B corporate decision-makers evaluating warehouse manpower partners
- **Tone:** Bold & modern (50%) + Premium & exclusive (50%)
- **Reference:** Terminal Industries scroll mechanic (scrubbed — scroll down advances, scroll up rewinds)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Vanilla HTML5 |
| Styling | Vanilla CSS3 |
| Scripting | Vanilla JavaScript (ES modules) |
| Scroll physics | Lenis |
| Animations | GSAP + ScrollTrigger (scrub enabled) |
| Text reveals | splitting.js (free, character-level) |
| Build tool | None (optional: Vite for dev) |
| Hosting | Vercel (existing account) |

No frameworks. No React. Pure static files.

---

## Visual Identity

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0D0D0D` | Page background |
| `--surface` | `#1A1A1A` | Cards, section surfaces |
| `--orange` | `#F47920` | Primary accent, CTAs, highlights |
| `--white` | `#FFFFFF` | Headlines, primary text |
| `--muted` | `#888888` | Labels, captions, secondary text |

### Typography
| Role | Font | Weight |
|---|---|---|
| Headlines | Inter | 700–900 |
| Body | Inter | 400 |
| Stats / Data | Geist Mono | 400–500 |

Source: Google Fonts (Inter) + Vercel Fonts (Geist Mono). Both free.

### Design Principles
- Orange used sparingly — highlight, not wallpaper
- Copy is short and punchy. No corporate filler.
- Dark base makes orange pop and feels premium/industrial

---

## File Structure

```
EHR Website/
├── index.html
├── css/
│   ├── main.css          ← layout, typography, palette
│   └── animations.css    ← initial states for animated elements
├── js/
│   ├── main.js           ← entry point, init
│   ├── scroll.js         ← Lenis smooth scroll setup
│   └── animations.js     ← all GSAP ScrollTrigger timelines
├── assets/
│   ├── logo-icon.png     ← existing orange logo mark
│   └── images/           ← placeholder warehouse/worker images
├── fonts/                ← self-hosted fallback if needed
└── docs/
    └── superpowers/specs/
        └── 2026-04-12-ehr-website-design.md
```

---

## Page Sections (Top to Bottom)

### 1. Nav
- Fixed top bar, dark background, logo left, single "Contact" link right
- Contact link is an `mailto:` anchor
- Fades in on load (not scroll-driven)

### 2. Hero *(Pinned)*
- **Pin duration:** ~200vh scroll height
- **Background:** Full-bleed dark warehouse/worker image (placeholder), slowly scales up (Ken Burns) as scroll progresses
- **Animation sequence (scrubbed):**
  1. Headline assembles character by character: e.g., "Manpower at Scale."
  2. Orange logo mark fades in below headline
  3. Subheadline fades in: e.g., "India's most reliable warehouse workforce partner."
  4. CTA button slides up: "Get in Touch →" (mailto link)
- Scroll up rewinds all of the above in reverse

### 3. What We Do *(Pinned)*
- **Pin duration:** ~300vh scroll height
- 4 service cards slide in from the right one at a time as scroll progresses:
  1. Warehouse Operations
  2. Workforce Deployment
  3. Compliance & Governance
  4. Payroll & Attendance
- Each card locks in place before the next animates in
- Scroll up retracts cards in reverse order
- Cards: dark surface (`#1A1A1A`), orange icon/number, white title, muted description (placeholder text)

### 4. Industries We Serve *(Not Pinned)*
- Section scrolls normally
- 6 industry labels (Retail/E-commerce, Electronics, FMCG, Construction, Oil & Gas, Corporate Facilities)
- Each label wipes in left-to-right as it enters viewport
- Orange underline draws itself beneath each label on entry
- Scroll up retracts underline and wipe

### 5. Stats *(Pinned)*
- **Pin duration:** ~200vh scroll height
- 4 key stats count up from 0 as scroll progresses:
  - `[X,XXX]+` Workforce Deployed
  - `[XX]+` Active Sites
  - `[XX]+` Cities Served
  - `[XX]+` Clients
- Placeholders — real numbers to be filled in
- Numbers in Geist Mono orange, labels in white muted
- Scroll up counts back down

### 6. Client Logos *(Not Pinned)*
- Grid of client logos fades in as section enters viewport
- Placeholder logos — real assets to be provided
- Clean, minimal — white/muted logos on dark background

### 7. Why Choose Us *(Not Pinned)*
- 3 bold one-line differentiator statements
- Each statement reveals word by word as you scroll through
- Placeholders — e.g., "Full statutory compliance. Always.", "On-ground productivity you can measure.", "Scale fast. No compromises."

### 8. Testimonial *(Not Pinned)*
- Single quote, fades + slides up into view
- Attribution line below in muted text
- Placeholder quote

### 9. Contact / CTA *(Not Pinned)*
- Full-width orange-on-dark section
- Large headline: "Let's Work Together."
- Email address displayed prominently as a mailto link
- Fades in clean on scroll entry

---

## Scroll Animation System

### Library Setup
- **Lenis** initialised in `scroll.js`, RAF loop fed into GSAP ticker
- **GSAP ScrollTrigger** used for all section animations
- `scrub: true` on all pinned timelines (animation progress = scroll progress)
- Non-pinned sections use `scrub: 1` (slight lag for smoothness)

### Animation Primitives
| Effect | Implementation |
|---|---|
| Character reveal | splitting.js splits text into `.char` spans; GSAP staggers `opacity` + `translateY` |
| Card slide-in | `translateX(100%)` → `translateX(0)` per card, sequenced in timeline |
| Number count-up | GSAP `{val: 0}` tweened to target, `onUpdate` writes to DOM |
| Underline draw | `scaleX(0)` → `scaleX(1)` on a pseudo-element, `transform-origin: left` |
| Word reveal | splitting.js word mode; stagger `opacity` per word |
| Fade + slide | `opacity: 0, y: 40` → `opacity: 1, y: 0` |
| Ken Burns | `scale(1.0)` → `scale(1.1)` on image over pin duration |

---

## Content Placeholders

All copy, stats, logos, and images are placeholders. Before launch, the following must be filled in:
- Hero headline and subheadline
- Service descriptions (4 cards)
- Stats numbers (4 values)
- Client logos (image files)
- Why Choose Us statements (3 lines)
- Testimonial quote + attribution
- Contact email address
- Warehouse/worker photography (minimum 1 hero image)

---

## Out of Scope

- CMS or content management
- Blog or news section
- Multi-language support
- Contact form (email link only)
- Analytics (can be added later via Vercel)
- Mobile-specific scroll animations (mobile gets simplified fade-in transitions; pinned scroll is desktop-only)
