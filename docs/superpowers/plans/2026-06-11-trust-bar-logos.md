# Trust Bar Client Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 12 text-only client names in the homepage trust bar marquee with official client logo images, white-monochrome on the dark theme, and deploy to expresshrsolutions.com.

**Architecture:** Logos are downloaded once into `assets/logos/` (Eleventy passthrough-copies `assets/` to `_site/`). The existing CSS marquee (duplicated track, `translateX(-50%)` loop) is untouched; only the track children change from `<span>` to `<img>`. White monochrome comes from `filter: brightness(0) invert(1)` so any solid-fill logo renders white regardless of brand colour.

**Tech Stack:** Eleventy 3 (njk), vanilla CSS, Vercel (auto-deploy on push to `main` of github.com/thepragatigroup/ehr-website). Node via nvm: `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"` before any npm command. No Homebrew/sudo; image resizing via `sips` only.

**Spec:** `docs/superpowers/specs/2026-06-11-trust-bar-logos-design.md`

**One documented deviation from spec:** no `loading="lazy"` on the logo `<img>` tags. The marquee track is `width: max-content`; images that load late change the track width mid-animation and cause a visible loop jump. Total asset weight is small (<150 KB target), so eager loading is correct here.

---

### Task 1: Source and download the 12 client logos

**Files:**
- Create: `assets/logos/` (directory)
- Create: one image file per client (see table)

Target files and sourcing leads. File name is fixed; extension is `.svg` if a clean vector is found, else `.png`:

| Client | File (no ext) | Sourcing leads | Brand notes |
|---|---|---|---|
| Reliance | `reliance` | Wikimedia Commons "Reliance Industries Logo.svg"; ril.com | Reliance Industries wordmark |
| Aditya Birla | `aditya-birla` | Wikimedia Commons "Aditya Birla Group logo"; adityabirla.com | Sun mark + wordmark |
| Godrej & Boyce | `godrej-boyce` | Wikimedia Commons "Godrej logo"; godrejenterprises.com | Post-2024 split: G&B is under Godrej Enterprises Group; script "Godrej" wordmark is correct |
| Vedanta | `vedanta` | Wikimedia Commons "Vedanta Limited"; vedantalimited.com | Current Vedanta Ltd logo |
| DOW | `dow` | Wikimedia Commons "Dow Chemical Company logo.svg"; dow.com | Red diamond; check knockout risk (see acceptance criteria #5) |
| Gati | `gati` | Wikimedia Commons "Gati logo"; allcargogati.com | Rebranded Allcargo GATI — verify current mark |
| ACG | `acg` | acg-world.com press/brand assets | Pharma capsules co (ACG World), not any other "ACG" |
| Bestseller | `bestseller` | Wikimedia Commons "Bestseller (company)"; bestseller.com | Danish fashion group, "BESTSELLER" wordmark |
| Runaya | `runaya` | runaya.co / runayagroup.com; LinkedIn company page | Vedanta-adjacent metals/green-tech startup |
| Gunnebo | `gunnebo` | Wikimedia Commons "Gunnebo logo"; gunnebo.com | Security group |
| PSA Singapore | `psa-singapore` | Wikimedia Commons "PSA International logo"; singaporepsa.com | PSA International / PSA Singapore |
| Prakash Dall | `prakash-dall` | Web search "Prakash Dall mill logo"; likely none | Small Indian dall mill — text fallback expected |

**Acceptance criteria for every downloaded file:**
1. Official, current logo (verify against the company's own site; respect rebrands listed above).
2. Full wordmark (company name readable), not a bare icon.
3. Transparent background (no white/colour box). JPEG is never acceptable.
4. SVG: `grep -iE "<script|onload|onerror|href=\"http" file.svg` returns nothing. If it does, strip those elements or use PNG instead.
5. Legible under the white filter: `brightness(0) invert(1)` turns every opaque pixel white. Badge-style logos whose text is a white knockout *fill* (not transparency) become solid blobs — for those, prefer a wordmark-only or mono/white official variant.
6. PNG files: resize so height ≤ 64 px (2× display height): `sips --resampleHeight 64 assets/logos/<name>.png` (skip if already ≤ 64 px tall). Target ≤ 30 KB per file.

**Steps:**

- [ ] **Step 1: Create the directory**

```bash
mkdir -p "/Users/rahuldas/Documents/Claude/EHR Website/assets/logos"
```

- [ ] **Step 2: For each client in the table, find and download the logo**

For each row: WebSearch the sourcing leads (e.g. `Reliance Industries logo svg wikimedia`), open the Wikimedia Commons file page (or company brand page), take the **original file** URL (`upload.wikimedia.org/...`), and download:

```bash
curl -sL -o "assets/logos/<name>.<ext>" "<original-file-url>" \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
file "assets/logos/<name>.<ext>"   # expect: SVG XML document or PNG image data
```

- [ ] **Step 3: Validate every file against the acceptance criteria**

```bash
cd "/Users/rahuldas/Documents/Claude/EHR Website"
for f in assets/logos/*.svg; do echo "== $f"; grep -icE "<script|onload|onerror" "$f" || true; done   # expect 0 / no output per file
ls -la assets/logos/    # each file > 1 KB (not an error page), total < 150 KB
du -sk assets/logos/
```

View each image (Read tool renders images; for SVG, confirm in browser during Task 4) and confirm criteria 1, 2, 3, 5.

- [ ] **Step 4: Record the fallback list**

Write down which clients have no acceptable logo (expected: possibly `prakash-dall`, `runaya`). These keep their text `<span>` in Task 3. The list is needed verbatim in Task 3 Step 1.

- [ ] **Step 5: Commit**

```bash
git add assets/logos && git commit -m "feat: add client logo assets for trust bar"
```

---

### Task 2: CSS — white monochrome image treatment

**Files:**
- Modify: `css/styles.css:1086-1101` (`.trust-bar__logo` block)

- [ ] **Step 1: Replace the text-logo block and stale comments**

Replace this (currently at `css/styles.css:1086-1101`):

```css
/* Text-based placeholder logos — replace inner content with <img> when real logos arrive */
.trust-bar__logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-muted);
  opacity: 0.45;
  white-space: nowrap;
  transition: opacity var(--transition);
  /* When real <img> logos are used, set height: 28px; width: auto; filter: grayscale(1); */
}

.trust-bar__logo:hover {
  opacity: 0.85;
}
```

with:

```css
/* Text fallback for clients without a usable logo file */
.trust-bar__logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-muted);
  opacity: 0.45;
  white-space: nowrap;
  transition: opacity var(--transition);
}

.trust-bar__logo:hover {
  opacity: 0.85;
}

/* Image logos — rendered white-monochrome on the dark theme */
img.trust-bar__logo {
  display: block;
  height: 28px;
  width: auto;
  max-width: 170px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

img.trust-bar__logo:hover {
  opacity: 1;
}

/* Optical balance — some wordmarks run visually heavy/light at equal height */
img.trust-bar__logo--compact { height: 22px; }
img.trust-bar__logo--tall { height: 36px; }
```

- [ ] **Step 2: Build to confirm nothing breaks**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
cd "/Users/rahuldas/Documents/Claude/EHR Website" && npm run build
```

Expected: `Wrote N files` with exit 0.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css && git commit -m "style: white monochrome treatment for trust bar logo images"
```

---

### Task 3: index.njk — swap text spans for logo images

**Files:**
- Modify: `index.njk:73-99` (both marquee sets)

- [ ] **Step 1: Replace Set 1 (visible) spans**

Replace lines 73–85 (`<!-- Set 1 -->` block) with the following — **adjust each extension to match the file actually downloaded in Task 1**, and for every client on the Task 1 fallback list keep its original `<span class="trust-bar__logo">Name</span>` line instead of the `<img>`:

```html
        <!-- Set 1 -->
        <img src="/assets/logos/reliance.svg" alt="Reliance" class="trust-bar__logo">
        <img src="/assets/logos/aditya-birla.svg" alt="Aditya Birla Group" class="trust-bar__logo">
        <img src="/assets/logos/godrej-boyce.svg" alt="Godrej &amp; Boyce" class="trust-bar__logo">
        <img src="/assets/logos/vedanta.svg" alt="Vedanta" class="trust-bar__logo">
        <img src="/assets/logos/dow.svg" alt="Dow" class="trust-bar__logo">
        <img src="/assets/logos/gati.svg" alt="Gati" class="trust-bar__logo">
        <img src="/assets/logos/acg.svg" alt="ACG" class="trust-bar__logo">
        <img src="/assets/logos/bestseller.svg" alt="Bestseller" class="trust-bar__logo">
        <img src="/assets/logos/runaya.svg" alt="Runaya" class="trust-bar__logo">
        <img src="/assets/logos/gunnebo.svg" alt="Gunnebo" class="trust-bar__logo">
        <img src="/assets/logos/psa-singapore.svg" alt="PSA Singapore" class="trust-bar__logo">
        <img src="/assets/logos/prakash-dall.svg" alt="Prakash Dall" class="trust-bar__logo">
```

- [ ] **Step 2: Replace Set 2 (clone) spans**

Replace lines for `<!-- Set 2 (clone for seamless loop) -->` with the same 12 entries, each with `alt=""` and `aria-hidden="true"` (text fallbacks keep `<span class="trust-bar__logo" aria-hidden="true">Name</span>`):

```html
        <!-- Set 2 (clone for seamless loop) -->
        <img src="/assets/logos/reliance.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/aditya-birla.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/godrej-boyce.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/vedanta.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/dow.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/gati.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/acg.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/bestseller.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/runaya.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/gunnebo.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/psa-singapore.svg" alt="" aria-hidden="true" class="trust-bar__logo">
        <img src="/assets/logos/prakash-dall.svg" alt="" aria-hidden="true" class="trust-bar__logo">
```

- [ ] **Step 3: Build and verify output**

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
cd "/Users/rahuldas/Documents/Claude/EHR Website" && npm run build
grep -c "/assets/logos/" _site/index.html   # expect: 2 × (number of image logos)
ls _site/assets/logos/                       # expect: all downloaded files copied
```

- [ ] **Step 4: Commit**

```bash
git add index.njk && git commit -m "feat: real client logos in trust bar marquee"
```

---

### Task 4: Visual verification and optical balance

**Files:**
- Possibly modify: `index.njk` (add `--compact`/`--tall` modifier classes), `css/styles.css`

- [ ] **Step 1: Start the dev server**

Use the Claude Preview tools (`preview_start` with the project's "EHR Website" launch config, which runs `npm run dev` → port 3457).

- [ ] **Step 2: Screenshot the trust bar**

Scroll/navigate so the trust bar is in view and `preview_screenshot`. Known issue (older note): scrolled sections may screenshot black under Lenis/GSAP compositing. If that happens, fall back to: `cp _site/index.html _site/_check.html`, strip the `<script>` tags from `_check.html` so no JS runs, screenshot `/_check.html`, then delete it.

Checklist on the screenshot:
- All image logos render **white**, none missing/broken
- No logo is an illegible white blob (criteria 5 failure → swap that file for a wordmark variant)
- Heights look optically balanced; marquee loops without a jump; no layout shift
- `preview_console_logs` shows no 404s or errors

- [ ] **Step 3: Apply optical-balance nudges if needed**

Add `trust-bar__logo--compact` (very wide/heavy wordmarks) or `trust-bar__logo--tall` (square-ish marks) classes to specific `<img>` tags in **both** sets in `index.njk`. Re-screenshot to confirm.

- [ ] **Step 4: Commit any tweaks**

```bash
git add index.njk css/styles.css && git commit -m "style: optical balance pass on trust bar logos"
```

(Skip if no changes.)

---

### Task 5: Deploy and verify production

- [ ] **Step 1: Push to GitHub**

```bash
cd "/Users/rahuldas/Documents/Claude/EHR Website" && git push origin main
```

Vercel auto-deploys `main` (the Decap CMS workflow depends on this integration; no manual `vercel` CLI call needed).

- [ ] **Step 2: Verify production (wait ~90 s after push)**

```bash
curl -s https://www.expresshrsolutions.com/ | grep -c "/assets/logos/"   # expect same count as Task 3 Step 3
curl -s -o /dev/null -w "%{http_code}" https://www.expresshrsolutions.com/assets/logos/reliance.svg   # expect 200
```

(Adjust the second URL's extension to the actual file.)

- [ ] **Step 3: Report**

Tell Rahul: which logos shipped, which clients remain text fallbacks (need files from him), and show the trust bar screenshot.
