# ASHESH ARORA STUDIOS — WEBSITE BRIEF
Source of truth for Claude Code sessions. Read this in full before writing any code.

---

## 1. TECH STACK

- React 19 + Vite 8 + Framer Motion
- Deploy target: GitHub Pages via `asheshcreates/asheshcreates.github.io`, custom domain `ashesharorastudios.com` (`public/CNAME`)
- No static HTML — this is a real component-based build
- **Deployment (live):** `.github/workflows/deploy.yml` builds on every push to `main` (`npm ci` + `npm run build`) and deploys `dist/` via the official `actions/upload-pages-artifact` + `actions/deploy-pages`. Repo's Pages source was switched from legacy branch-serving (`build_type: legacy`, served `main` root directly) to `build_type: workflow` via the API — the legacy setting had been serving the raw Vite `index.html` source (referencing `/src/main.jsx` unbundled) straight from `main`, i.e. **the live site was broken** before this, left over from before the repo became a Vite project. Custom domain cname was also re-applied via the API (`gh api -X PUT .../pages -f cname=...`) since Actions-based Pages deploys don't auto-read a `CNAME` file out of the build artifact the way legacy branch deploys sometimes do; DNS was already correctly pointed there, so the domain came back with an approved HTTPS cert immediately. The old `npm run deploy` script (`gh-pages` npm package, pushes `dist/` to a `gh-pages` branch) is now dead/unused now that Pages reads from Actions instead of any branch — left in `package.json` rather than removed, flag for Ashesh to confirm it can go.

---

## 2. BRAND SYSTEM (non-negotiable)

- **Typography:** Balgin Expanded (name/display), Raleway Light (titles/body), Raleway Regular (contact info). If these aren't available as web fonts, flag it — do not silently substitute without asking.
- **Colors:** Studio Black `#111111`, Studio White `#F2F2F2`. No accent color, anywhere.
- **Voice:** Peer-not-vendor. Short sentences. No em dashes, ever. No performative gratitude. No itemized creative services language.
- **Case:** Section headers and wordmarks run in caps per the brand system (this differs from generic UI conventions — intentional).
- **Asset rule:** Any image or graphic that doesn't have a background in the source file does not get a background invented for it in production. Keep transparency as transparency. No fabricated matte/backdrop.

---

## 3. GLOBAL NAVIGATION RULE

- **No nav bar on the homepage.** The landing page is nav-free by design.
- **Nav appears only once a visitor enters a project page** (e.g. clicking into Chatorey). At minimum it should offer a way back to the homepage.
- Do not add a persistent global nav across all pages — this was an explicit decision, not an oversight.

---

## 4. HOMEPAGE

Structure, top to bottom:

1. **Hero** — no nav. Wordmark: ASHESH / ARORA stacked, bold, oversized. STUDIOS runs oversized and cropped/bleeding off the bottom edge (not centered — cropped is the intended brutalist effect). CONTACT sits quietly top-right.
   - **Ambient spinning reel** (`.hero__reel-bg`, `src/assets/home/projector-reel.png`): a large background film-reel image, deliberately placed *first* in the hero's DOM (z-index left at auto, so normal paint order keeps it behind every other hero element) and positioned to overlap the flip-board project list and the top of STUDIOS — per Ashesh's explicit direction that it sit behind everything, spinning continuously via a `steps(11)` keyframe (hand-cranked stutter, not eased, matching the rest of the site's mechanical motion). Sized off `vh` (`clamp(340px, 88vh, 960px)` on desktop) so it stays circular and scales with the hero's own height rather than warping on wide viewports. Position has been tuned twice since first landing: made bigger and moved down/left to deepen its overlap into the (now-removed) screen and STUDIOS, then nudged further right (`calc(71% + 3.5rem)`) per a follow-up request — matching, smaller offsets exist at the 900px and 640px breakpoints. `prefers-reduced-motion: reduce` disables the spin.
   - **Highlight-reel screen — pulled for now, pending the real video.** A `.hero__screen` wrapping a `VideoFrame` (no `src`, so it rendered the shared `AssetSlot` "coming soon" fallback) was built and positioned in the open band between the wordmark and STUDIOS, stopping short of the flip-board column, per Ashesh's own markup on a screenshot. Removed from both `Home.jsx` and `Home.css` per Ashesh's instruction ("take out the placeholder video rectangle for now") once the reel-only composition was working — re-add a `<div className="hero__screen"><VideoFrame src="..." /></div>` between the wordmark and flip-board blocks in `Home.jsx` when the real highlight video is ready; the removed CSS positioned it via `top`/`bottom` anchors + `aspect-ratio: auto` on wide viewports (fills the vertical band exactly), switching to a plain `top` anchor + `aspect-ratio: 16/9` under 900px and static in-flow stacking under 640px.
   - Superseded an earlier side-by-side "screen + standing projector rig" build (`ProjectorRig.jsx`/`.css`, since deleted) that used the reel plus a projector body/tripod cutout and a light beam — pulled entirely per Ashesh's call ("take them both out"), then replaced with the current, simpler behind-everything spinning reel concept instead. `src/assets/home/projector-body.png` is an orphaned cutout, unused but left in place.
   - `VideoFrame`'s `AssetSlot` fallback previously used the theme-relative `--cell`/`--line` tokens, which are dark-on-dark when the video chrome's own background is hardcoded to `#0a0a0a` in light theme. Fixed with a light-on-dark override scoped to `.video-frame .asset-slot` in `VideoFrame.css` — affects every page's "video not supplied yet" fallback, not just the homepage. Currently dormant on the homepage (no `VideoFrame` rendered there right now) but still live for other pages and for whenever the hero screen comes back.
   - **Flip-board project list** (`.hero__flipboard`, `FlipBoard.jsx`) now sits over the spinning reel, so its cells needed to go fully opaque instead of the shared translucent `--cell` tint every other split-flap cell on the site uses. Studio Black tile / white lettering in light theme, inverted to white tile / black lettering in dark theme — implemented as `background: var(--fg); color: var(--bg);`, which inverts automatically since those two tokens themselves flip with the theme, no new colors needed. Scoped to `.flip-board .flip-char` in `FlipBoard.css`, not the shared base `.flip-char` class, so `FlipTitle` page headers elsewhere (Solum, Chatorey, PCC, TIB) keep their own translucent look — confirmed unaffected on Solum.
2. **About line** (draft, pending final approval):
   > A cultural IP and creative production studio building stories worth remembering. Culture and connection.
3. **Auto-scrolling thumbnail strip** — each thumbnail is a direct link into that project. Order:
   1. Chatorey — 2026
   2. This Is Brampton — 2026
   3. Punjabi Chamber of Commerce — 2026
   4. Solum — 2026 *(mock project, AI-generated campaign — added as a capability showcase, not a client)*
   
   FRE8 is intentionally **not** on this list or anywhere else on the homepage — it lives only inside the PCC project page (see Section 8).
4. **Clients:** Chatorey, This Is Brampton, Punjabi Chamber of Commerce (expand as more go public)
5. **Fields:** Brand strategy · Photography · Film · Creative direction · Creative consultation · Motion design · Documentary
   *(last two added from studio's real output — Banyan tree animation, PCC/TIB documentary work)*
6. **Values:** Culture and connection.
   *(second line still pending — do not invent one, leave as single line until confirmed)*
7. **Chronological archive:**
   - 2026 — Chatorey
   - 2026 — This Is Brampton
   - 2026 — Punjabi Chamber of Commerce
8. **Footer:** ashesh@ashesharorastudios.com · Instagram [URL pending] · LinkedIn [URL pending] · no phone number, confirmed omitted.

---

## 5. CHATOREY — PROJECT PAGE (fully locked, build this first)

Nav appears here (see Section 3).

**Section order, full-bleed continuous scroll, no booklet chrome (no "For the year 2026 / Rebrand" header, no dotted borders — that was print-only scaffolding):**

1. **Hero** — full-bleed fries photo, dark gradient wash bottom-to-top for legibility (not a solid overlay box). CHATOREY wordmark small, top-center. Tagline bottom-right, right-aligned: "Chatorey is a bold Indian street food restaurant based in Scarborough. They came with a brand identity and needed it brought to life."
2. **CREATIVE DIRECTION** — header large, left-aligned. 6-image grid using `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))` — must reflow naturally on mobile, no separate breakpoint layout needed. Below the grid, philosophy paragraph: "We weren't just shooting people eating food, we were curating a feeling of warmth, ease, and 'the place to be.' Strategy tells us who we're talking to. Creative direction tells us how it feels to be talked to."
3. **PARTNER'S ATTIRE** — header smaller, right-aligned (quiet counterpoint to section 2). Hero shot double-width, product details (tee, cap, apron) smaller alongside.
4. **PACKAGING** — header large, left-aligned. Clean 4-up grid: paper bag, tea cup, sandwich box, salad bowl. Do not replicate the original poster's diagonal/asymmetric layout — flatten to grid, the asymmetry doesn't survive a scroll.
5. **BUTTER PAPER DESIGN** — header smaller, right-aligned. Pattern swatch and wordmark repeat get double-width blocks (they're texture, not subject). Four mockup photos stay small and even beneath.
6. **IRL VISUALIZATION** — header quiet, small caps, wide letter-spacing, centered. Two large stacked photos.
7. **EVERY DISH TELLS A STORY** — header large, left-aligned (echoes section 2's energy). Samosa & chai hero shot full width, then 8-image grid using the same `auto-fit/minmax` pattern as section 2 — repeat the grid logic, don't invent a new one.
8. **MONTHLY ARTWORK ROTATION** — header medium, centered. 4-image grid of the hand-drawn illustrations, then copy: "Curated a custom art wall system for the restaurant's interior, original hand-drawn food illustrations printed and framed for the dining space, with a monthly rotation to keep the ambience fresh."
9. **Closing — SERVICES RENDERED** — quiet, centered, credits-line treatment, not a pitch: "Full menu photography shoot · Branded social content & reels · Brand packaging direction · Creative direction"

**Animation spec:**
- Every section header, paragraph, and grid tile starts at `opacity: 0, translateY(28px)`.
- On scroll into viewport (IntersectionObserver, threshold ~0.15), animate to `opacity: 1, translateY(0)` over ~0.7s ease.
- Grid tiles within a section stagger — approx 0.07s delay increment per tile, cycling every 6 tiles so the stagger doesn't grow unreasonably long on the 8-image grid.
- No parallax, no scroll-linked transforms tied to scroll position — reveal-on-entry only. Parallax fights the flat industrial look this brand is going for.

**Asset sourcing:** all photography already exists from the real shoot (source: Chatorey_Website_Booklet.pdf, provided separately). This is an Adobe CC export/crop job into consistent web ratios, not new generation.

---

## 6. THIS IS BRAMPTON — PROJECT PAGE (built, live at `/this-is-brampton`)

**Full takeover, forced dark theme regardless of site-wide light/dark schedule.** No services-rendered column — this was a personal/passion project, not client work with a services scope.

Built as a 4-column Swiss modular grid (`src/pages/TIB.jsx` / `.css`), grid lines are a layout guide only, never drawn — structure reads through spacing and alignment alone:

1. **Hero video** — full width. Autoplay muted on load, with real play/pause and a scrubbable seek bar (not just a mute toggle), via the shared `VideoFrame` component.
2. **Title** — "This Is Brampton" via the reusable split-flap `FlipTitle` component, rendered as two lines ("This Is" / "Brampton") at a bolder/bigger `xl` size scoped to this page only (other pages keep the standard `lg` size). Sits left-aligned beside the intro copy, not centered above the video.
3. **Intro line** — existing copy ("Brampton doesn't get written about the way it deserves...") at a larger size, beside the title.
4. **From the studio** — new two-paragraph section on the studio's own approach to the project (world-building over deliverables).
5. **From the creative director** — new section, first-person, Ashesh's own account of the gurdwara/langar epiphany that sparked the project, signed "— Ashesh Arora, Creative Director."
6. **Playbill invite line** — "Enjoy flipping through the Playbill."
7. **Playbill object** — the flip-book (see below), sitting beside its invite line.

Cells 4–5 and 6–7 sit side by side on desktop/tablet; everything stacks to a single column in reading order on mobile (<768px).

**The Playbill (`src/components/FlipBook.jsx` / `.css`):**
- Real pages, extracted at full resolution directly from the studio's actual Playbill PDF (cover, "A Note on the City," "The Creative Process," and three "Who's Who!" character-bio spreads) — not placeholder or stand-in art.
- Closed state: a tilted 3D card that tracks the cursor and tilts toward it with a spring, like it's resting in a hand rather than pinned flat.
- On click, it grows outward from its own resting position into a centered modal (not a generic modal fading in from nowhere) — dismissible via the Close button, clicking the backdrop, or Escape. Body scroll locks while open.
- **Reader (current version):** single-page focus, not a book-flip. The current page sits large and centered; the previous and next pages float smaller to either side as a preview (same size as each other, both dimmer and smaller than the center). Advancing glides the whole set over with a spring — the side page grows into the center, the old center shrinks out to the opposite side — rather than any page-turn/flip/rotation. Prev/Next arrows below the reader, side pages are themselves clickable to jump straight to them, and arrow keys work while open. Same behavior at every screen size (no separate mobile/desktop layout for the reader itself).
  - *(Superseded a two-page book-spread version with a rotateY drag-to-flip mechanic — dropped per explicit feedback that the 3D flip felt "weird"; this is the second design of the reader, not the first.)*

**ProjectPager:** bottom of the page links "← Explore: [previous project]" / "Explore: [next project] →", wrapping around the homepage's project order.

**Flag before shipping:** confirm this project is cleared to go public — IP/copyright ownership foundation work is still pending per studio notes.

---

## 7. PUNJABI CHAMBER OF COMMERCE + FRE8 — COMBINED PROJECT PAGE (built, live at `/pcc`)

Both projects live on **one page** (`src/pages/PCC.jsx` / `.css`), PCC first, FRE8 second below a divider ("Also from the studio") — see Section 8 for why FRE8 isn't separate.

**Forced dark theme:** the page hard-locks its CSS custom properties (`--bg`, `--fg`, `--line`, `--cell`, `--cell-line`, `--scrim`) to the dark studio values on the `.pcc` root element, regardless of the site-wide light/dark schedule or manual toggle. Belong Gala's identity is black by design, confirmed via computed-style testing (forcing `data-theme="light"` globally still resolves `.pcc` to `#0a0a0a` background / light text, while everything outside `.pcc` correctly goes light).

**PCC section:**
- Hero: "Belong Gala 2026 / Punjabi Chamber of Commerce" two-line `FlipTitle`, followed by the hero photo — **resolved**, no longer a placeholder. `hero-panelists-banyan.png` is a clean alpha-cutout of the ornate gold picture frame containing the panelists-on-stage photo, cut along the frame's actual silhouette (not a rectangular crop) so it blends into the page's black with no visible seam, and with the dangling tree-root tendrils that used to drape over the frame's top rail removed without touching the frame itself. Built via border-flood-fill background removal (preserves every dark region *inside* the photo — curtains, dark clothing — since those are enclosed, not reachable from the image border) plus a row-width scan that finds the exact row where the image jumps to the frame's full ~1200px span, used as the cutoff above which everything (tree, roots) is cleared.
- Copy: the one-word brief ("BELONG") from Harsimran Grewal, AAS's role, and the Banyan symbolism — revised this round to the diaspora "rebuilt communities seven seas away from the soil we all share" framing (see `PCC.jsx` for exact current wording; copy has been iterated on directly several times, don't treat any one version as final without checking the file).
- Banyan row: the original ambient looping video was **replaced** with a static photo, `banyan-ballroom-polaroid.jpg` — a polaroid-bordered shot of the real ballroom showing the tree animation running live on the stage screen behind the panel, sourced from page 2 of the studio's "Social Post Belong Gala.pdf" (a 3-page deck, not the 107 pages a stale tool estimate once suggested), polaroid frame kept as the image's own border. Supporting copy rewritten around what the tree represented rather than its technical spec.
- **Extra photo section — resolved**, no longer a placeholder. Holds the LinkedIn recap animation (`pcc-linkedin-recap-trimmed.mp4`): trimmed 2s off each end via macOS's built-in `avconvert`, aspect-ratio corrected to its native 5070:2160 (the shared `VideoFrame`'s default 16:9 was cropping it), and set to `silent` so it's a permanent muted loop with zero controls.
- Film program intro copy, then:
  - **Hub graphic — replaced.** The coded 3×3 CSS grid of service-category cells is gone; now a single image, `theatre-hub.jpg` (displayed 20% larger than its first placement) — a theatre-curtain graphic showing the studio's film credits as a projected film-strip grid, seats and curtains framing it.
  - **Video grid:** tile aspect ratio changed from 4:3 to 16:9. Dr. Ruby Dhalla's and Amandipp Singh's thumbnails were swapped to crops taken directly from inside `theatre-hub.jpg`'s own film-strip cells (isolated from the sprocket-hole border and caption text); the other four thumbnails were left as-is. Video sources: Dhalla and PCC Vision Film upgraded to their real 4K masters (`dhalla.mov`, `vision-film.mov`); Toor/Thiara/Singh/Bhatia confirmed MD5-identical to what was already deployed, so left untouched.
- Closing quote + credit line — rewritten this round: "A sense of belonging is a felt feeling, and the only way to communicate it is to show what being human means." / "Creative direction by Ashesh Arora."

**FRE8 section (below the divider):**
- "FRE8" title, founder-speaks-to-camera video — **swapped** to a new source file, `fre8-founder.mov`.
- Copy rewritten this round (shorter — "the team" instead of "the founder," "talking about it from the heart" instead of "explaining it plainly").
- Closing quote **removed** — the rewritten copy had no replacement quote, so the paragraph and its now-dead `.fre8-closing` CSS rule were deleted rather than left stale.

**ProjectPager** at the very bottom, same as every project page.

**Known orphaned files** (no longer referenced in code, not deleted — each superseded by a replacement asset above, auto-mode blocks deleting pre-existing files not explicitly named by Ashesh): `public/videos/pcc-banyan.mp4`, `public/videos/pcc/dhalla.mp4`, `public/videos/pcc/vision-film.mp4`, `public/videos/fre8-founder.mp4`, `src/assets/pcc/hero-panelists-banyan.jpg` (superseded by the `.png` cutout). Flag for Ashesh to confirm before cleanup.

---

## 8. FRE8 — RESOLVED: BUILT INTO THE PCC PAGE, NOT STANDALONE

Per the pages-part-3 handoff, FRE8 does **not** get its own route, its own homepage thumbnail, or its own project-list entry anywhere. It lives entirely as a second section on the PCC page (Section 7), reached only by scrolling past PCC's closing line and a divider. This was a deliberate instruction, not a stub/placeholder situation — do not add a `/fre8` route or homepage entry.

---

## 9. SOLUM — MOCK AI CAMPAIGN, PROJECT PAGE (built, live at `/solum`)

Not part of the original brief — added per the pages-part-3 handoff as a capability showcase, **not a client project**. A fictional men's skincare brand built end-to-end (brand foundation through finished campaign) with every visual asset AI-generated, to demonstrate what a full creative production pipeline looks like when nothing is stock or templated.

Built as `src/pages/Solum.jsx` / `.css`:
1. Hero: "Solum" title, tagline ("Solum. From the ground up."), explicit "Mock project, AI-powered campaign" disclosure line, and a hero product shot.
   - **Open item:** the brief PDF's own opening-page hero image turned out to be a real stock photo of a genuine competing fragrance brand's product (BYREDO), not a Solum-branded asset — recognized as a trademark/IP risk and deliberately **not used**. Substituted with a genuinely Solum-labeled bottle shot sourced from elsewhere in the brief's asset grid. Flagged for Ashesh's awareness/confirmation, not silently swapped.
2. "Six men. One brand." — cast grid of six specifically-differentiated men (headshots + lifestyle shots), making the case that specificity, not generic attractiveness, is what makes AI-generated cast feel real.
3. "One product. Four worlds." — the same three products placed in four different cultural contexts (South Asian Toronto, Gulf ritual, London locker room, Lagos sunrise), with the Gulf direction carrying a full 15-image narrative sequence (Wadi Reflection, Gathering Sage, Cleanse Ritual, etc.) in a horizontal-scroll strip.
4. "What this actually means." — the actual pitch (campaigns customized per market without reshooting), closing collage grid.
5. Closing line: "The visual world is built once. Then it travels everywhere."

All imagery extracted and cropped directly from the studio's own SOLUM Brief PDF (no stock, no placeholders). **ProjectPager** at the bottom, same as every project page.

---

## 10. OPEN ITEMS — confirm before final build

- [ ] Values section: second line copy (currently just "Culture and connection." — note: homepage Values list has since been expanded with Collaboration, Partnership, Innovation, Quality, Simplicity, Authenticity, Purpose; reconcile with this line)
- [x] Fields: reworked into gravity-ordered groups (Digital design/Concepting/Brand identity/Visual systems/Campaigns/Communications/Graphic design/Animation/Brand photography) — confirmed
- [x] Instagram and LinkedIn URLs for footer — filled in with real URLs
- [x] This Is Brampton: built out fully per Section 6 — hero video, grid content, real Playbill pages, book-spread flip. IP-clearance flag from the original brief still stands regardless of build status; confirm before making the page public.
- [x] Punjabi Chamber of Commerce: built out fully per Section 7, merged with FRE8 on one page.
- [x] FRE8: resolved — builds into the PCC page only, no standalone route (Section 8).
- [x] Solum: new page built per pages-part-3 handoff (Section 9), not in the original brief.
- [x] **PCC real hero photo** — resolved, real image found (was pasted directly into chat, recovered from the session transcript) and built into a clean alpha-cutout. See Section 7.
- [x] **PCC extra photo section** — resolved, holds the LinkedIn recap video. See Section 7.
- [ ] **PCC orphaned video/image files** — old banyan loop, old lower-res Dhalla/Vision Film videos, old FRE8 video, and the old rectangular-crop hero JPEG are unreferenced but not deleted (see Section 7). Confirm with Ashesh before removing.
- [ ] **Solum hero image** — a genuinely Solum-branded bottle shot was substituted for the brief PDF's original image (which turned out to be a real competitor's stock photo). Needs Ashesh's confirmation that the substitution is acceptable.
- [ ] Chatorey hero fries photo: currently using the best-resolution version found on disk (1101×615, sourced from the original PDF extraction). Confirm acceptable or provide a higher-res original.
- [ ] **Hero highlight video** — the screen that would hold it is currently pulled out of the hero (Section 4) pending the real file. Once Ashesh supplies it, re-add the `.hero__screen` + `VideoFrame` markup/CSS described in Section 4.

---

## 11. STATUS — WHAT'S DONE

**Stack & scaffold:** React 19 + Vite 8 + Framer Motion + react-router-dom, live at `localhost:5173` via `vite-dev` preview config.

**Homepage:**
- Brutalist hero (ASHESH / ARORA / STUDIOS wordmark, CONTACT top-right), no nav, per Section 3.
- Ambient spinning background reel added behind the flip-board and STUDIOS, with the flip-board's own cells switched to opaque, theme-inverted tiles so they stay readable over it. Highlight-video screen was also built but is currently pulled back out pending the real video file. See Section 4 for full detail and exactly what to re-add.
- Animated "vintage scoreboard" flip-board project list (Chatorey, This Is Brampton, Punjabi Chamber of Commerce, Solum — FRE8 deliberately excluded, see Section 8) — split-flap character reveal, 5s total per reveal, 25 rotations/letter, synced column starts, fast hover bonus-round, each row links to its project page. Replays from scratch every time it re-enters viewport. List is driven entirely by `src/data/projects.js`.
- Clients / Fields / Values sections: same flip-board-style letter-cascade reveal (15 rotations/char, 3s total, staggered onset once previous char hits 8 rotations), applied to both headings and content, fully re-triggers on every scroll-into-view. Content updated per latest requests (client list, gravity-ordered field groups with a visual line-break between groups, expanded values list).
- Full light/dark theme system: defaults to time-of-day schedule (light 5am–8pm, dark 8pm–5am), manual lightbulb-icon toggle overrides and persists via `localStorage`, live-synced across components via a `themechange` event and a 60s re-check interval (`src/theme.js`, `src/components/ThemeToggle.jsx`, `src/App.jsx`, `src/main.jsx`).
- Footer with real Email/Instagram/LinkedIn links.

**Chatorey case-study page** (`src/pages/Chatorey.jsx` / `.css`) — fully built and reference-matched across multiple rounds:
- Nav: "Landing Page" link (arrow removed), no persistent global nav elsewhere per Section 3.
- Hero: wide fries photo (`object-position: center 40%` for a zoomed-out crop), dark gradient wash, real Chatorey logo graphic (mascot + wordmark, true alpha, no background bleed-through) sized ~3x larger than original and nudged down.
- Creative Direction: fixed 3×2 grid in exact original sequence, philosophy paragraph.
- Partner's Attire: 2-column layout (main hero image + stacked detail shots), all product cutouts cleanly keyed via flood-fill background removal, no glow/mask artifacts. Apron (the third, lead detail shot below cap and tee) sized up beyond its column via `.ch-attire__apron` (`width: 128%; margin-left: -14%`, bleeding past the narrow details column rather than matching cap/tee's width), resetting to full-width with no bleed at the ≤720px breakpoint where the details column itself switches to a 3-across row, so it doesn't overlap its neighbors there.
- Packaging: **reworked from a uniform 4-up grid into a deliberately asymmetric 2×2** (`.ch-grid--packaging`, layered onto the existing `.ch-grid--four` base via a second modifier class, so the Butter Paper mockups grid, which also uses `.ch-grid--four`, is untouched). Images enlarged (`clamp(150px,20vw,230px)` grew to `clamp(220px,30vw,380px)` tile height) and every second tile (tea cup, salad bowl) drops lower via `translateY`, so the row reads as bold and editorial rather than a symmetric spec sheet. Collapses to a single column with no offset at ≤560px. Still cropped to content bounding box, sized by height, no visible box/background.
- Butter Paper, IRL Visualization sections built per brief.
- Every Dish Tells A Story: samosa & chai two-column block (copy beside hero image), then the 8-dish grid. **Reworked from `auto-fit` reflow to a fixed 4-column grid** (`.ch-grid--reflow`) so the 8 images land on two full, symmetric rows instead of an odd trailing row at wide viewports, with a larger gap than the shared `.ch-grid` default for a more generous, editorial spread. Drops to 2 columns (still symmetric, 4 rows) at ≤900px.
- Monthly Artwork Rotation: text-in-center/images-as-frames grid layout matching reference, tightly-cropped illustrations, white frame background (no seam).
- Closing services-rendered credits line.
- Unified heading typography site-wide on this page (no more heading-family mismatch).

**This Is Brampton, PCC+FRE8, and Solum are all fully built** — see Sections 6, 7, and 9 for what each page contains. `ComingSoon.jsx`/`.css` has been deleted; it's no longer referenced anywhere. **PCC in particular has since been substantially revised** across several follow-up rounds (forced dark theme, real hero photo with a clean alpha-cutout, hub graphic swapped for the theatre-curtain image, video grid re-cropped and two thumbnails re-sourced, several videos upgraded to 4K masters, multiple copy passes) — Section 7 reflects the current state; treat it as more current than this bullet list.

**Shared components built for these pages** (all reusable, not page-specific):
- `FlipTitle.jsx` / `.css` — split-flap page title, supports multi-line titles and a `size` prop (`lg` default everywhere, `xl` used only on TIB's hero title).
- `VideoFrame.jsx` / `.css` — shared "screen" treatment for every autoplay video: starts muted, real play/pause + scrubbable seek bar for watchable videos, a `silent` prop for pure ambient background loops (PCC's LinkedIn recap animation) that renders no controls at all, and falls back to a labeled `AssetSlot` placeholder if no source is provided yet. Accepts a `className` for per-instance overrides (e.g. PCC's recap video overrides the default 16:9 `aspect-ratio` to match its native 5070:2160 source).
- `AssetSlot.jsx` / `.css` — labeled dashed-border placeholder shown wherever a real asset is still missing, so gaps stay visible in the live build instead of silently broken.
- `FlipBook.jsx` / `.css` — the Playbill reader (see Section 6 for full current behavior: hand-tilt hover on the closed cover, zoom-from-origin open animation, single-page-centered-with-side-previews reader with a glide transition between pages).
- `ProjectPager.jsx` / `.css` — "Explore: [prev]" / "Explore: [next]" bottom-of-page navigation on every project page, order driven by `projects.js`.

**Real assets sourced and in the repo** (no more placeholder/stand-in art for these): TIB's hero video and all 7 real Playbill pages (extracted at full resolution from the actual Playbill PDF); PCC's hero cutout, banyan-row polaroid photo, theatre-hub image, LinkedIn recap animation, 4K Dhalla/Vision Film masters, and FRE8 founder video (see Section 7 for full detail); all Solum campaign imagery (extracted and cropped from the SOLUM Brief PDF). Large source videos live in `public/videos/` and are gitignored — swapped for hosted embeds (YouTube/Vimeo unlisted) before this goes live.

**Bugs found and fixed during this build:**
- A Framer Motion shared-`layoutId` + `AnimatePresence` combination left an invisible duplicate Playbill-cover button stuck in the DOM forever on open — replaced with a simpler, robust "zoom from the button's own screen position" animation that doesn't rely on cross-element layout tracking.
- The TIB hero title's flip-characters sized themselves off raw viewport width (`vw` units) while their grid column stopped growing past the page's own `max-width` — on any monitor wider than ~1152px this let the title visually bleed into the intro copy beside it. Fixed by capping the title's max size to what actually fits its column, plus a hard `overflow: hidden` on the cell as a guaranteed backstop.

**Playbill reader redesign:** the original two-page book-spread with a drag-to-flip 3D rotation was scrapped entirely per direct feedback that it "acted weird." Rebuilt as the single-page-with-side-previews carousel described in Section 6 — this is a deliberate design change, not a bug fix, and the two-page-spread version should not be reinstated without a new explicit request.

## 12. STATUS — WHAT'S NEXT

1. Confirm with Ashesh whether the orphaned PCC files (Section 7, Section 10) can be deleted.
2. Resolve the remaining open items: Ashesh's sign-off on the Solum hero image substitution, Values second line, Chatorey hero photo resolution, TIB public-clearance confirmation.
3. Confirm the new Playbill reader's glide transition and side-preview sizing/spacing read correctly in a real browser (verified logic/state end-to-end this round, but the spring animation itself hasn't yet had a clean visual confirmation — see chat history for why).
4. Final QA pass: cross-browser/mobile check of the flip-board, cascade, and Playbill glide animations, theme-schedule edge cases (exact 8pm/5am transition). Production build + deploy pipeline itself is done and verified live (see Section 1).
5. **Urgent, confirmed live:** `public/videos/` is gitignored, so none of those files exist in the repo the Actions build checks out from — every video on the live site 404s right now (confirmed: `ashesharorastudios.com/videos/tib-hero.mp4` → 404). This affects TIB's hero video and PCC's panel/vision-film/FRE8 videos at minimum. Swap for hosted embeds (YouTube/Vimeo unlisted) per the existing asset note, or commit the files directly if they're small enough — either way this needs to happen before the site is actually shown to anyone, not just before some future "launch" milestone, since it's live now.
