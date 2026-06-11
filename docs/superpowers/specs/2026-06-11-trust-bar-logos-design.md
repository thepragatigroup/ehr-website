# Trust Bar Client Logos — Design

**Date:** 2026-06-11
**Status:** Approved by Rahul (in-session)

## Goal

Replace the 12 text-only client names in the homepage Trust Bar marquee with real client logo images, rendered white-monochrome on the dark background, and deploy to production (expresshrsolutions.com via Vercel).

## Current State

- Trust bar lives in `index.njk` (~lines 60–100): a CSS infinite marquee with two duplicated tracks (`.trust-bar__track`), each containing 12 `<span class="trust-bar__logo">` text names. Second set carries `aria-hidden="true"`.
- Clients: Reliance, Aditya Birla, Godrej & Boyce, Vedanta, DOW, Gati, ACG, Bestseller, Runaya, Gunnebo, PSA Singapore, Prakash Dall.
- Styles in `css/styles.css`. Site is Eleventy (`.njk` templates), deployed via Vercel, production domain expresshrsolutions.com.

## Decisions Made

| Decision | Choice |
|---|---|
| Visual treatment | White monochrome (CSS filter), slightly reduced opacity |
| Sourcing | Claude finds official logos online (Wikimedia Commons, press kits, company sites). No logo API. |
| Unfindable logos | Keep existing text-span styling as fallback; report list to Rahul |
| Logo permissions | Rahul's responsibility (clients already named publicly on the site) |

## Sourcing Rules

1. Official, **current** logo only — verify rebrands (Gati → Allcargo GATI; Godrej & Boyce under Godrej Enterprises Group post-split).
2. Full wordmark (readable company name), not bare icon — each image replaces a text name.
3. SVG preferred; PNG fallback at ~2× display height, compressed.
4. SVGs sanitized: no `<script>`, no external references.
5. Total added asset weight target: < 150 KB.

## Implementation

- **New:** `assets/logos/` — one file per client, kebab-case names (e.g. `aditya-birla.svg`).
- **`index.njk`:** each text span becomes `<img src="/assets/logos/<name>.<svg|png>" alt="<Client>" class="trust-bar__logo" loading="lazy">` (extension = whichever format was sourced for that client). Duplicate (aria-hidden) track uses `alt=""`. Unfound logos keep the text span unchanged.
- **`css/styles.css`:** image variant of `.trust-bar__logo`: `height: ~28px; width: auto; filter: brightness(0) invert(1); opacity: 0.7–0.8;` Existing marquee animation, spacing, and duplication untouched. Per-logo height nudges allowed where optical balance requires (wordmarks vary in aspect ratio).

## Verification

1. `npx eleventy` build succeeds.
2. Local preview: all logos render white at balanced heights; marquee loops seamlessly; no console errors; no layout shift.
3. Screenshot of trust bar shared as proof.

## Deployment

Commit → push to `main` → Vercel production deploy (confirm repo's actual mechanism: GitHub auto-deploy vs `vercel --prod`). Previous session's footer-social-links work committed separately beforehand (done: `8ef6fc2`).

## Out of Scope

- Trust bar redesign, hover effects, logo links to client sites
- Legal clearance for logo usage
- Any other pending site work
