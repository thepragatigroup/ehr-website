# Express HR Solutions — Website Redesign Design Spec
**Date:** 2026-06-03  
**Status:** Approved  
**Project:** Full redesign of expresshrsolutions.com (fresh start)

---

## 1. Goals

1. **Modernise the brand** — look premium, credible, and enterprise-grade
2. **Clarify services** — visitors should immediately understand what Express HR does and for whom
3. **Fix performance and UI** — fast load, no layout bugs, mobile-first

---

## 2. Audience

All three groups must feel served:
- Senior decision-makers at large enterprises (COOs, procurement heads, HR directors)
- Mid-size business owners looking for staffing/manpower solutions
- Job seekers / candidates (via a Careers section)

---

## 3. Stack

| Layer | Choice | Rationale |
|---|---|---|
| HTML/CSS/JS | Vanilla, single `index.html` | Same as Pragati site — no build tool, zero framework overhead |
| Smooth scroll | Lenis (CDN) | Buttery scroll feel, lightweight |
| Animations | GSAP 3 + ScrollTrigger (CDN) | Section reveals, stat counters, hero headline |
| Fonts | Google Fonts CDN | Bricolage Grotesque + Plus Jakarta Sans |
| Forms | Formspree | No backend needed |
| Hosting | Vercel (static) | Same as Pragati |

**Performance approach:** CDN-loaded GSAP/Lenis are cached across sites. No images in hero (CSS-only background). WebP for all photos. Minified before deploy.

---

## 4. Visual Identity

### Colours
| Token | Value | Usage |
|---|---|---|
| `--orange` | `#F47920` | Primary accent, CTAs, hover states |
| `--orange-tint` | `#FFF4EC` | Card backgrounds, subtle highlights |
| `--navy` | `#0A1628` | Hero, stats section, footer backgrounds |
| `--bg-light` | `#F8F8F8` | Alternate light sections |
| `--bg-white` | `#FFFFFF` | Primary light sections |
| `--text-dark` | `#1A1A2E` | Body text on light backgrounds |
| `--text-light` | `#E8EEF4` | Text on dark backgrounds |
| `--text-muted` | `#6B7280` | Secondary/caption text |

### Typography
| Role | Font | Weight |
|---|---|---|
| Headlines (H1, H2) | Bricolage Grotesque | ExtraBold (800) |
| Sub-headlines (H3) | Bricolage Grotesque | SemiBold (600) |
| Body / UI | Plus Jakarta Sans | Regular (400), Medium (500) |
| Nav links | Plus Jakarta Sans | Medium (500) |
| Stat numbers | Bricolage Grotesque | ExtraBold (800) |

### Signature Element
Hero section has a **CSS dot-grid background**: `#F47920` at 8% opacity, radial-gradient repeating pattern. Pure CSS, zero JS, zero image cost. Creates depth and on-brand texture.

---

## 5. Page Architecture

Single-page layout. All sections on one `index.html`. Anchor-linked navigation.

| # | Section | Background | Purpose |
|---|---|---|---|
| 1 | Sticky Nav | Transparent → white on scroll | Navigation + primary CTA |
| 2 | Hero | `--navy` + dot-grid | Headline, sub-copy, 2 CTAs, 3 inline stats |
| 3 | Client Trust Bar | `--bg-white` | Instant credibility via logo strip |
| 4 | About | `--bg-light` | Who they are, what makes them different |
| 5 | Services | `--bg-white` | 6 service cards, 3×2 grid |
| 6 | Industries | `--bg-light` | Industry pill/tag grid |
| 7 | Stats | `--navy` | 4 animated counters |
| 8 | Contact / CTA | `--orange` | Contact form + direct details |
| 9 | Careers | `--bg-white` | Brief pitch + link |
| 10 | Footer | `--navy` | Logo, nav, contact, copyright |

---

## 6. Section-by-Section Spec

### 6.1 Sticky Navigation
- **Left:** Express HR Solutions logo (SVG, keep existing)
- **Right:** Text links — Services · Industries · About · Careers — plus solid orange "Get in Touch" button
- **Scroll behaviour:** Starts transparent over dark hero. On scroll past 80px: white background + `box-shadow: 0 1px 20px rgba(0,0,0,0.08)`
- **Mobile:** Hamburger icon → full-screen overlay menu with links stacked vertically

### 6.2 Hero
- **Background:** `--navy` with CSS dot-grid texture overlay
- **Headline (H1):** "India's Most Reliable Workforce Partner" — 2 lines, Bricolage Grotesque ExtraBold, white, large (clamp 48px–80px)
- **Sub-copy:** One line describing what Express HR does and who they serve
- **CTAs:** "Get a Quote" (solid orange button) + "See Our Services" (ghost/outline button, white border)
- **Inline stats:** 3 stats below CTAs — e.g. `50,000+ Workers · 200+ Clients · 15+ States` — separated by `·`, muted text
- **Animation:** GSAP — headline words stagger-reveal on page load (0.05s per word delay), CTA buttons and stats fade in after

### 6.3 Client Trust Bar
- **Layout:** Single centred line — *"Trusted by India's leading enterprises"* — followed by auto-scrolling horizontal logo strip
- **Logos:** Reliance, Godrej, Aditya Birla, Vedanta, DOW, + others (to be supplied)
- **Animation:** CSS `@keyframes` infinite scroll — no JS needed
- **Logo style:** Greyscale, 60% opacity — full colour on hover

### 6.4 About
- **Background:** `--bg-light`
- **Layout:** 2-column (desktop), stacked (mobile)
  - Left: H2 headline + 2–3 short paragraphs on mission, differentiators, operational scale
  - Right: Bold typographic stat block — large numbers styled as display text (avoids need for photography). These are **static/decorative**, not animated — distinct from the animated counters in Section 6.7
- **Accent:** Orange left-border on key differentiator bullet points
- **Animation:** ScrollTrigger fade-in, left and right columns slide in from opposite sides

### 6.5 Services
- **Background:** `--bg-white`
- **Headline:** "End-to-End Workforce Solutions"
- **Layout:** 3×2 card grid (desktop), 1-col (mobile)
- **Cards (6):**
  1. Warehouse Management
  2. Workforce Deployment
  3. Facility Management
  4. Compliance & Payroll
  5. Attendance & Efficiency Tracking
  6. Manpower Operations
- **Card anatomy:** Line-style orange icon (Phosphor Icons via CDN — consistent, lightweight, free) + service name (H3) + 2-sentence description
- **Hover:** Card lifts (`translateY(-4px)`, shadow) + orange left-border appears (transition: 200ms)
- **Animation:** ScrollTrigger stagger — cards fade+slide up in sequence (0.1s delay between cards)

### 6.6 Industries
- **Background:** `--bg-light`
- **Headline:** "Serving India's Core Sectors"
- **Layout:** Pill/tag grid — wrapping flex row
- **Industries (10):** Food & Beverage · Pharma · Retail · Manufacturing · Electronics · FMCG · Construction · Oil & Gas · Corporate Facilities · Logistics
- **Tag style:** Rounded pill, `--bg-white` background, `--text-dark` text, `--orange` border on hover + text turns orange, fill transitions to `--orange-tint`
- **Animation:** ScrollTrigger stagger — tags pop in with scale(0.8)→scale(1) sequence

### 6.7 Stats
- **Background:** `--navy`
- **Headline:** "Our Scale Speaks for Itself"
- **Layout:** 4 counters in a row (desktop), 2×2 grid (mobile)
- **Counters (4):** Workers Deployed · Enterprise Clients · States Covered · Years of Operations
  *(Real numbers to be supplied before launch — placeholders used during build)*
- **Number style:** Bricolage Grotesque ExtraBold, `--orange`, very large (clamp 56px–96px)
- **Label style:** Plus Jakarta Sans, `--text-light`, smaller
- **Animation:** GSAP `CountTo` triggered by ScrollTrigger — counts from 0 to final value over 2s when section enters viewport

### 6.8 Contact / CTA
- **Background:** `--orange`
- **Headline:** "Ready to Transform Your Workforce Operations?"
- **Layout:** 2-column (desktop), stacked (mobile)
  - Left: contact form (Name, Company, Phone, Message + "Send Message" button)
  - Right: direct contact details (email, phone, office address) with white icons
- **Form:** White fields, dark text, white submit button with orange text — inverts on hover
- **Submission:** Formspree endpoint (same pattern as Pragati)
- **Animation:** ScrollTrigger fade-in

### 6.9 Careers
- **Background:** `--bg-white`
- **Layout:** Compact centred block
- **Content:** H3 headline + 1-line pitch (*"Join India's fastest-growing workforce company"*) + single CTA button linking to careers email or form
- **No animation needed** — small section, keep light

### 6.10 Footer
- **Background:** `--navy`
- **Layout:** 3-column (desktop), stacked (mobile)
  - Left: Logo + one-line tagline
  - Centre: Quick nav links
  - Right: Email + social icons
- **Bottom bar:** Thin separator + copyright line, centred

---

## 7. Animation Summary

| Element | Trigger | Animation | Library |
|---|---|---|---|
| Hero headline | Page load | Words stagger fade+slide up | GSAP |
| Hero CTAs + stats | Page load, 0.4s delay | Fade in | GSAP |
| Trust bar logos | Continuous | Infinite horizontal scroll | CSS |
| About columns | ScrollTrigger | Slide in from left/right | GSAP |
| Service cards | ScrollTrigger | Stagger fade+slide up | GSAP |
| Industry tags | ScrollTrigger | Stagger scale pop-in | GSAP |
| Stat counters | ScrollTrigger | Count 0 → final value | GSAP |
| Contact section | ScrollTrigger | Fade in | GSAP |

**Philosophy:** No full-viewport scroll-pinning. No scroll-hijacking. Every animation has `will-change: transform` and `prefers-reduced-motion` fallback.

---

## 8. Responsiveness

Three breakpoints:
- **Mobile:** < 640px — single column everywhere, hamburger nav
- **Tablet:** 640px–1024px — 2-column where applicable
- **Desktop:** > 1024px — full layout as described

---

## 9. Content Placeholders

The following real content must be supplied before launch:
- [ ] Actual logo file (SVG preferred)
- [ ] Real stat numbers (workers, clients, states, years)
- [ ] Client logo files (Reliance, Godrej, Aditya Birla, Vedanta, DOW, others)
- [ ] Real email address and phone number
- [ ] Office address
- [ ] Formspree endpoint ID
- [ ] Careers link or email address

---

## 10. Out of Scope

- Blog / news section
- Client portal or login
- Multi-language support
- Individual service sub-pages (can be added later)
- Individual industry sub-pages (can be added later)
