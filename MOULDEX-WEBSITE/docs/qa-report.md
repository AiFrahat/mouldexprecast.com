# QA report — Mouldex bilingual website

Date of run: 2026-11-22 · Local only (nothing deployed)

## Environment

| Item | Value |
| --- | --- |
| OS | Windows 11 (host) |
| Node.js | v24.19.0 |
| npm | 11.17.0 |
| Astro | 5.18.2 (static output) |
| Playwright | 1.65.1, `channel: chrome` (locally installed Chrome, no browser download) |
| axe-core | @axe-core/playwright 4.14.0 |
| Python (asset pipeline) | 3.12, PyMuPDF + Pillow |
| Preview server | `astro preview` → **http://127.0.0.1:4321/** serving `site/dist` |

## Build

| Check | Result |
| --- | --- |
| `npm run build` | ✅ 35 pages in ~1.7 s (`site/dist`, 92 files, ~4.8 MB incl. fonts/images) |
| Built content routes | 17 per locale = 34 (`/en/…`, `/ar/…`), plus `/404.html` and `/` → `/en/` redirect |
| `npm run content:check` | ✅ 6 services · 17 reference projects · 6 showcase projects · 6 values · 10 images · 0 missing Arabic strings |
| Runtime JS | 2 small inline scripts (mobile menu, project filters, mailto form). No console errors on any of the 17 screenshot pages. |

## Automated tests

`cd site; npm test` (Playwright, desktop + mobile projects):

| Suite | What it covers | Tests |
| --- | --- | --- |
| `routes.spec.ts` | every route: HTTP 200, `lang` + `dir`, single `<h1>`, title/meta length, canonical, `hreflang` ×3, main landmark, zero runtime errors; `/` → `/en/`; unknown route → 404; sitemap + robots | 37 × 2 |
| `i18n.spec.ts` | nav labels per locale, RTL direction, Arabic `<h1>` on every Arabic route, six service pages and six project pages in both locales, translated service-card titles, language switch keeps path, no `undefined`/`NaN`/template leftovers | 9 × 2 |
| `images.spec.ts` | every `<img>` on 10 key routes decodes (`naturalWidth > 0`) with non-empty alt; logo/favicons/OG/manifest served; header + footer use the supplied logo; hero uses the profile project photograph | 13 × 2 |
| `navigation.spec.ts` | desktop nav, services dropdown on hover **and** keyboard focus, mobile dialog (opens, focus moves inside + traps, Escape closes, focus returns), mobile menu navigation, skip link, breadcrumbs, footer tel/mailto, language switch labelling | 8 × 2 |
| `responsive.spec.ts` | no horizontal overflow at 360/390/768/1024/1280/1440 px on 10 key routes, all 34 routes at 360 px, header mode switch at 1180 px, 44 px+ tap targets, scrollable reference table | 10 × 2 |
| `projects.spec.ts` | 17 reference rows, all 7 filters + counts + `aria-pressed`, 6 detail links, published facts on MJL page, no invented client on Al Kharafi, service cross-link + back link, Arabic filter labels | 7 × 2 |
| `contact.spec.ts` | 6 contact cards, published telephone/mobile/email/fax/PO Box, labelled required fields, 7 service options, mailto draft contains entered data (EN + AR), mobile overflow | 5 × 2 |
| `privacy.spec.ts` | built HTML contains **no** employee IDs (`MDX-…`), employee names, submittal/transmittal/signature data or org-chart/no-EO data; contact page limited to the profile's lines; content-model integrity | 3 × 2 |
| `a11y.spec.ts` | axe-core WCAG 2.0/2.1 A+AA scans on 11 pages (EN + AR), landmarks + single-h1 heading order, every link/button has an accessible name | 13 × 2 |

**Final result: 210 tests — 203 passed, 7 skipped (device-specific), 0 failed.**
Skips are the desktop-only mobile checks and mobile-only desktop checks, which are covered by the
other project. axe scans: **0 serious / 0 critical violations** on all 11 scanned pages.

### Defects found and fixed during QA

| # | Defect | Fix |
| --- | --- | --- |
| 1 | Service/project card titles empty on Arabic pages while translation was pending (component read the raw locale instead of the merged copy) | `localized()` merge used in every card/list component |
| 2 | `checkVisibility`/`offsetParent` focus filter and transition timing meant the mobile menu never received focus | focus retries on a short timer; test polls for focus-in-dialog |
| 3 | Colour contrast failures on dark heroes (blue eyebrow on navy), contact labels, related-card meta, aside titles | dark-context eyebrow rule, grey-500 → grey, `label-content-name-mismatch` resolved by removing the duplicate aria-label |
| 4 | Scrollable reference table was not keyboard reachable (axe `scrollable-region-focusable`) | wrapper got `tabindex="0"` + `role="region"` + label |
| 5 | Three Arabic meta descriptions below 60 characters | expanded to 78–129 characters |
| 6 | Arabic PO Box card duplicated the label ("PO Box 393390" under "PO BOX") | value is now the number only |
| 7 | Duplicated headings (About facts section repeated the page title; Projects showcase repeated the page eyebrow) | section headings corrected / eyebrow removed |
| 8 | Ghost buttons invisible on the navy hero and blue CTA band | dark-context ghost button tokens |
| 9 | Footer copyright bidi scrambling | split into isolated name + rights spans |
| 10 | Public copy referenced internal profile page numbers ("illustrated on page 12 of the company profile") | removed from public copy; provenance kept in docs |

## Manual QA

- 17 full-page screenshots at 1440 px and 390 px in `site/qa/screenshots/` (home, about, services index, service detail, projects index, project detail, contact × EN/AR + 2 mobile + 404); zero console errors during capture.
- Reviewed header/nav/dropdown, hero composition, service cards, project cards, reference table + filters, facts panels, forms, footer, and both RTL and LTR layouts.
- Language switch verified on all page types (path preserved), dropdown verified with keyboard, mobile dialog verified with Escape, filters verified against expected counts, contact form verified to compose a valid `mailto:` in both locales.
- Arabic pages checked for direction (`dir="rtl"`), mirrored arrows, logical-property layout, Arabic font application, and absence of mixed-direction breakage in numbers/phones/project names.

## Known limitations / open items

1. **Approved specification document absent.** The workspace contained only `source-materials/`; the v1.0 specification was reconstructed from the implementation brief. Scope decisions are recorded in `docs/implementation-decisions.md` so any difference in the approved document can be applied locally.
2. **Source photography is low resolution.** Profile photographs are 403–1152 px wide. They are never upscaled in markup, but the small site photos (403–640 px) can look soft on very large displays.
3. **Arabic needs native/brand review.** The translation is complete and consistent with the glossary (`docs/translation-glossary.md`) but has not been reviewed by the company.
4. **Entity naming in the source is inconsistent** — "Mouldex Precast Contracting L.L.C" (profile body) vs "Mouldex Technical Services LLC" (page 3 last sentence, page 17 installation role) vs "Precast Technology Solutions L.L.C - FZ" (pages 10–19, the project list and submittals). The site presents the 17-project list as the company profile's published reference list and does not re-attribute the roles. Confirm the contracting entity before launch.
5. **Publication-rights items to confirm:** the contact email is a personal Outlook mailbox, the General Manager's mobile is published, and the project images on pages 12–14 are developer marketing renders carrying client branding (Emaar, MEERAS, Dubai Hills Vista, Beachgate, Palmiera).
6. **Project statuses may be stale** — the profile is undated; "Completed / On-going / Awarded" reflects the document only.
7. **No invented content:** no street address, registration/licence numbers, certifications, founding date, headcount or social accounts are published because the source does not contain them (or they sit on excluded internal pages).
8. **Contact form has no backend** — it composes a `mailto:` draft and says so; nothing is stored or sent by the site.
9. **Domain references** (`https://mouldexprecast.com`) are used for canonical/OG/sitemap only. Nothing was deployed, pushed or uploaded.
10. **The parent repository still contains the previous "coming soon" page** (`D:\Projects\mouldexprecast.com\index.html`) — the new site lives in `MOULDEX-WEBSITE/site` and was not published over it.
11. Unused build by-products: `dubai-tower-*.jpg` (generated from the cover photo, not referenced) and the mid-size logo variants; harmless but removable.

## Reproduce

```powershell
cd site
npm install
npm run content:check
npm test                 # build + preview + 210 Playwright tests
npm run qa:screenshots   # refresh site/qa/screenshots
npm run preview          # http://127.0.0.1:4321/
```
