# DESIGN.md — CoreSentia Design Constraints

**Purpose:** This file governs all UI work on this repo. Read it fully before any design, styling, or component change. When a request conflicts with this file, flag the conflict — don't silently override.

---

## Direction

CoreSentia is one proven operator, not an agency. The site should feel like it was designed by a person with opinions: editorial, confident, slightly austere. Reference points: Linear's restraint, Stripe's typographic hierarchy, a broadsheet's asymmetry. Not: SaaS landing template, crypto dark-mode, glassmorphism.

---

## Typography

- **Headers:** `Fraunces` (Google Fonts, variable + opsz), weights 500/600. Characterful display serif — chosen by the founder after Instrument Sans read as an AI-template tell. Large headers are LARGE — hero at `clamp(3rem, 8vw, 6.5rem)`.
- **Body:** `Newsreader` (Google Fonts), weight 400, `1.15rem` size, `1.7` line-height. Double-serif (display serif over text serif) is the signature — do not swap either to a sans.
- **Mono (stats, labels, captions):** `JetBrains Mono`, 400, small sizes only, uppercase with tracking `0.08em` for section labels.
- **BANNED:** Inter, Geist, Roboto, Open Sans, Poppins, Montserrat, Space Grotesk, **Instrument Sans**. Never introduce these, including via component libraries.
- Max two font families visible per viewport (mono labels excepted).

## Color

- Background: near-black warm — `#111110` (not pure `#000`, not blue-tinted). Light theme: warm paper `#F7F5F0` under the same rules; the theme toggle is a supported feature.
- **Text: pure white `#FFFFFF`, no greys — founder rule.** All text is full-brightness; hierarchy comes from size, weight, and mono-vs-serif, never from dimming. Light theme: all text `#161615`. Grey/muted text classes are banned.
- **One accent only: `#62D4F9`** (logo sky blue — founder call Aug 2026: luminous against the B&W concrete where azure read as corporate blue). Used sparingly: links, one CTA, active states, chart lines, the featured-service marker. Never large fills, never gradients. Button hover: `#4dc4e8`.
- **Demoted logo blues:** `#2A50DF` (royal) and `#1099E7` (azure) may only appear as border tints, secondary-text tints, or subtle chart secondary series. Never as competing accents. Three equal blues = banned.
- **Contrast:** `#62D4F9` passes WCAG AA on `#111110` (11.1:1) — used directly for text on dark. On the light theme it fails, so text/links there use the darkened variant `--accent-ink: #0A72B2`; buttons and fills keep the true logo hex in both themes. Logo file untouched.
- **BANNED:** purple/blue gradients, gradient text, glow/bloom effects, glassmorphism (`backdrop-blur` on cards), neon borders, blue-black backgrounds (warm dark + cold blue accent is the deliberate pairing).

## Imagery — brutalist concrete photography

- The image library is four licensed Adobe Stock photos plus the founder's own photography (his astro work, and a headshot when supplied). Nothing else — no other stock, no icons-as-images, no illustrations.
- The library: spiral staircase (1629413118 — homepage hero), ribbed curved sweep (2093142889 — full-bleed mid-page break), coffered grid ceiling (637731154 — About hero), concrete lattice (2063741601 — Work page hero), curved fins (1765844751 — Operations Platform case-study hero), shallow steps (2073914514 — FAQ hero). The founder may add more concrete/structural photos over time — same concept and treatment apply; drop sources in `marketing_images/`. FirstLight's case-study page is deliberately concrete-free — its future image is the founder's own nature/astro photography.
- Concept: engineered structure — many repeated elements resolving into one form. Architectural stand-ins for what CoreSentia builds. Always large and editorial, never small decorations, thumbnails, or card backgrounds.
- Treatment: true B&W, black point lifted to `#111110` so edges dissolve into the page (no visible rectangles); soft gradient masks over hard crops; directional darken gradient on the text side; ~3.5% film grain baked in; graded sources in `/public/structure-*.jpg`, served via next/image.
- Max one photo visible per viewport; never two images adjacent. Currently dark-theme only (`.dark-only`) — light theme runs clean paper until a light grade is designed.

## Layout

- Break symmetry deliberately. Section headings sit left on a 12-col grid, content offset right (cols 5–12). Never center-align section headings.
- No 4-across stat rows. Stats render as an inline editorial sentence ("**$450k** of SaaS replaced by **$2.7k** of infrastructure") or a single asymmetric pair — one number huge, others small.
- Vary section rhythm: alternate `py-32`+ (airy) and `py-16` (tight). Uniform section padding is banned.
- One element per page is allowed to be disproportionately large (a number, a word, a chart). Use it.
- Max content width `1200px`, but let one section per page bleed full-width.

## Components

- Cards: flat, `1px` border `#2A2925`, no shadow, no radius above `4px`, no hover-lift. Hover = border color shift to accent only.
- Buttons: rectangular, `2px` radius max. Primary = accent background + black text. Secondary = border only. No pill buttons.
- Icons: none from lucide/heroicons default sets in marketing sections. Use typographic markers (01, 02, →, ※) or custom SVG only.
- Animation: opacity/transform only, `0.4–0.6s`, ease-out. No spring bounce, no infinite loops (HowItWorks section excepted), no hover scale above `1.02`.

## Copy rendering

- Sentence case everywhere including buttons ("Start a project" not "Start A Project")
- No emoji anywhere
- No exclamation marks in UI copy

## Process rules for CC

1. Before styling any new component, re-read this file
2. Never install a UI component library (shadcn, MUI, DaisyUI) for marketing pages
3. When copying patterns from existing components, banned patterns do not grandfather in — fix on touch
4. If a change would violate this file, stop and flag it in the summary rather than proceeding
