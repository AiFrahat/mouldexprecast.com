# Design notes — MOULDEX PRECAST

## Visual reference

The approved reference is the **Heidelberg Materials** corporate web language. The traits that were
translated into this build:

| Reference trait | How it is applied here |
| --- | --- |
| Calm, large-format photography as the main visual asset | Full-bleed project photograph in the home hero; 6 project cards; 3-up "on site" strip; everted service and project detail images. No decorative illustrations. |
| Sharp, architectural geometry (no rounded cards, thin rules, hard edges) | `--radius: 0`, 1 px hairlines, 2–4 px accent rules, square buttons, no shadows except a soft hover lift on cards. |
| Strong editorial typographic hierarchy with quiet body copy | Display sizes `clamp(2.6rem … 5.4rem)` at 0.98 line-height, tight tracking; body 17 px / 1.65; uppercase 0.72 rem kickers with 0.2 em tracking. |
| Dark, confident colour bands alternating with calm white space | Section rhythm: navy hero → white stats → white intro → soft concrete services → white projects → navy values → white on-site → blue CTA → navy footer. |
| Restrained accent colour used for orientation, not decoration | Signal yellow only for eyebrows, rules, badges, active states and the primary CTA; royal blue reserved for links and the CTA band. |
| Restrained, data-led detail | Facts tables, status pills, reference table, numbered service cards and stat band instead of marketing superlatives. |

Mouldex brand elements from the company profile that were carried over: the royal blue
(`#004AAC` sampled from page 3), the signal yellow accent block (`#FFDE58` sampled from page 7),
the concrete neutrals, the diagonal/hexagon geometry (echoed by sharp cards and the yellow accent
rule) and the **dot-grid motif** (used as a background texture in the hero, page heroes, CTA band
and footer).

## Palette

| Token | Value | Sampled from | Use |
| --- | --- | --- | --- |
| `--navy` | `#06182F` | logo navy `#000838`, darkened for WCAG contrast | hero, page heroes, dark bands, footer |
| `--blue` | `#004AAC` | profile page 3 solid | links, eyebrows, CTA band, icons |
| `--yellow` | `#FFC93C` | profile page 7 accent block | accent rules, kickers, badges, primary button |
| `--concrete` | `#F2F0EC` | profile paper / concrete neutrals | soft section background |
| `--ink` | `#101418` | — | body text |
| `--gray` | `#5C6673` | — | secondary text (AA on white) |
| `--red` | `#E8000B` | logo red | logo only (never used as UI colour) |

## Typography

- **Latin:** Archivo (variable, 100–900), self-hosted (`site/public/fonts`). Used for display, UI
  labels and numbers.
- **Arabic:** IBM Plex Sans Arabic 400/500/600/700, self-hosted. Applied automatically via
  `[dir='rtl'] { --font-body: var(--font-arabic) }` and used for Arabic display type as well, so the
  two locales never fall back to a mismatched system face.
- Arabic headings drop negative tracking and are set with a taller line-height (1.2–1.9) and no
  uppercasing, per Arabic script requirements.
- Both families are preloaded only for the locale in use (`archivo` for en, `plex arabic` for ar).

## Layout and RTL

- 12-column-compatible fluid grid with `--container: 1320px` (1560 px for the on-site strip) and a
  fluid gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- Section rhythm `clamp(4rem, 9vw, 8rem)`; every horizontal spacing, inset and border uses **logical
  properties** (`padding-inline`, `inset-inline-start`, `border-inline-end`, `margin-inline`), so the
  Arabic build mirrors without a separate RTL stylesheet.
- Directional icons (arrows) are flipped with `transform: scaleX(-1)` under `[dir='rtl']`; the
  brand lockup itself is never mirrored.
- Numbers, phone numbers, email addresses, the region code and Latin project names are isolated with
  `.ltr { direction: ltr; unicode-bidi: isolate }` or `dir="ltr"` where mixing would reorder them.

## Components

`Header` (utility bar + brand + primary nav with a services mega-list + language switch + CTA +
mobile dialog), `Footer` (reversed lockup, sitemap columns, direct lines), `Picture` (srcset from the
generated manifest, never upscaled), `Hero`/`PageHero`, `Breadcrumbs`, `SectionHead`, `Button`,
`ServiceCard`, `ProjectCard`, `ValueCard`, `Stat`, `FactList` pattern, `CtaBand`, `ContactForm`,
`Icons` (inline stroke SVG). Styles live in `site/src/styles/global.css` (tokens + shared patterns)
plus scoped `<style>` blocks for components only.

## Motion and interaction

- Single easing curve `cubic-bezier(0.22, 0.61, 0.36, 1)` and 350 ms duration.
- Card image zoom (1.04) on hover, nav underline grow, button arrow nudge, service card colour
  inversion on hover.
- `prefers-reduced-motion` disables all transitions and smooth scrolling.
- Focus is always visible (`:focus-visible` 3 px outline, yellow on dark).

## Accessibility

- Colour pairs were adjusted after automated contrast checks: grey-500 was replaced by grey; the
  eyebrow on navy uses yellow; mobile menu focus is moved into the dialog and trapped with Escape
  returning focus to the menu button.
- One `<h1>` per page, labelled landmarks, skip link to `#main`, alt text on every image, explicit
  `for`/`id` on every form control, `aria-current` on navigation, `aria-pressed` on filters,
  `aria-live` result count, forced-colours-safe status pills.
- Automated check: axe-core (WCAG 2.0/2.1 A/AA) — 0 serious or critical violations across 11 pages.

## Performance

- Static HTML, one small CSS bundle, two small JS behaviours; no runtime framework.
- Images are pre-sized JPEGs (`q84`, progressive) served via `srcset`/`sizes`; the hero is
  `fetchpriority="high"`, everything else is lazy.
- Fonts are subset woff2 files, self-hosted, no third-party requests at runtime.
