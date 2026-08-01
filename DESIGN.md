# DESIGN.md — CoreSentia Design Constraints

**Purpose:** This file governs all UI work on this repo. Read it fully before any design, styling, or component change. When a request conflicts with this file, flag the conflict — don't silently override.

---

## Direction

CoreSentia is one proven operator, not an agency. The site should feel like it was designed by a person with opinions: editorial, confident, slightly austere. Reference points: Linear's restraint, Stripe's typographic hierarchy, a broadsheet's asymmetry. Not: SaaS landing template, crypto dark-mode, glassmorphism.

---

## Typography

- **Headers:** `Instrument Sans` (Google Fonts), weights 500/600. Tight tracking (`-0.02em` to `-0.04em` on large sizes). Large headers are LARGE — hero at `clamp(3rem, 8vw, 6.5rem)`.
- **Body:** `Newsreader` (Google Fonts), weight 400, `1.15rem` size, `1.7` line-height. Serif body against grotesk headers is the signature — do not swap body back to a sans.
- **Mono (stats, labels, captions):** `JetBrains Mono`, 400, small sizes only, uppercase with tracking `0.08em` for section labels.
- **BANNED:** Inter, Geist, Roboto, Open Sans, Poppins, Montserrat, Space Grotesk. Never introduce these, including via component libraries.
- Max two font families visible per viewport (mono labels excepted).

## Color

- Background: near-black warm — `#111110` (not pure `#000`, not blue-tinted). Light theme: warm paper `#F7F5F0` under the same rules; the theme toggle is a supported feature.
- Text: `#EDEAE4` (warm off-white). Secondary text: `#8A867D`. Light theme: `#191917` / `#7A766C`.
- **One accent only: `#1099E7`** (logo azure — the most vibrant of the three logo blues, extracted from the logo asset, sat 0.93). Used sparingly: links, one CTA, active states, chart lines, the featured-service marker. Never large fills, never gradients.
- **Demoted logo blues:** `#2A50DF` (royal) and `#62D4F9` (sky) may only appear as border tints, secondary-text tints, or subtle chart secondary series. Never as competing accents. Three equal blues = banned.
- **Contrast:** `#1099E7` passes WCAG AA on `#111110` (6.1:1) — used directly for text on dark. On the light theme it fails (3.0:1), so text/links there use the darkened variant `--accent-ink: #0A72B2`; buttons and fills keep the true logo hex in both themes. Logo file untouched.
- **BANNED:** purple/blue gradients, gradient text, glow/bloom effects, glassmorphism (`backdrop-blur` on cards), neon borders, blue-black backgrounds (warm dark + cold blue accent is the deliberate pairing).

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
