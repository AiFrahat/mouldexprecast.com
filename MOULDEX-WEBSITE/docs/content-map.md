# Content map — Mouldex bilingual website

Route-by-route map of the rebuilt site: which JSON content block renders each route, which pages of the company PDF the facts come from, and which images are used. Source of routes is `site/src/pages`; the built site contains **17 routes per locale** (34 sitemap URLs), a root redirect and one global 404. Facts are traced to pages of `Mouldex Precast Contracting LLC ( Pre-Qualification Documents. ).pdf`; see `docs/source-inventory.md` for the page-by-page evidence.

## Route model

- Static Astro build (`output: 'static'`), `trailingSlash: 'always'`. Every content route is prefixed with the locale: `/en/…` and `/ar/…`.
- `/` is a generated redirect to `/en/` (`redirects` in `astro.config.mjs`); the language switch is manual (no Accept-Language negotiation).
- Locale routes are produced by `getStaticPaths()` in each `[lang]` page, and detail routes additionally enumerate `services.items` / `projects.showcase`.
- `sitemap-index.xml` + `sitemap-0.xml` list the 34 localised URLs (404 excluded); `robots.txt` points at the sitemap index.
- Content model: `site.json` (brand, contact, nav, UI strings) · `pages.json` (home/about/contact copy) · `services.json` (6 service lines + page copy) · `projects.json` (17-row reference list + 6 showcase projects) · `values.json` (6 company values) · `images.json` (web-image manifest consumed by `Picture.astro`).

## Route table

`/ar/` mirrors every `/en/` route with the same template, JSON block and PDF provenance; only the copy object (`…[lang]`) differs.

| Route (en; ar mirrors) | Template | JSON content blocks | PDF pages | Images |
| --- | --- | --- | --- | --- |
| `/` | — (redirect) | `astro.config.mjs` → `/en/` | — | — |
| `/en/` `/ar/` | `[lang]/index.astro` | `pages.json` → `home.en` / `home.ar`; `services.json` → `items[]` cards; `projects.json` → `showcase[0..2]`; `values.json` → 3 ids from `home.why.valueIds`; `site.json` → `nav`, `ui` | 3, 4, 5, 6, 7, 11, 12, 13 | `bulgari-ocean-villas` (hero), `site-installation-03`, `site-panels-01`, `site-structure-02`, project cards (MJL, Bulgari, Lamborghini) |
| `/en/about/` `/ar/about/` | `[lang]/about.astro` | `pages.json` → `about.en` / `about.ar`; `values.json` → all 6; `site.json` → `nav`, `ui` | 3, 4, 5, 7, 25 | `site-installation-03` |
| `/en/services/` `/ar/services/` | `[lang]/services/index.astro` | `services.json` → `page`, `items[]`; `pages.json` → `home.cta` | 6 (services); images from 7, 12, 13, 14 | the 6 service images |
| `/en/services/precast-claddings/` (+ ar) | `[lang]/services/[slug].astro` | `services.json` → `items[0]`; `projects.json` → `reference` rows ref-01/04/08/13/16 | 6, 11 (copy cites rows 1, 4, 8, 13, 16) | `bulgari-ocean-villas` |
| `/en/services/load-bearing-structures/` (+ ar) | same | `services.json` → `items[1]`; rows ref-06/07/11/12/15 | 6, 11 | `site-structure-02` |
| `/en/services/villas/` (+ ar) | same | `services.json` → `items[2]`; rows ref-02/05/10 | 6, 11, 12 (Lamborghini caption) | `lamborghini-villas` |
| `/en/services/hollow-core-slabs/` (+ ar) | same | `services.json` → `items[3]`; row ref-17 | 6, 11 | `site-installation-03` |
| `/en/services/precast-boundary-walls/` (+ ar) | same | `services.json` → `items[4]`; rows ref-05/10/14 | 6, 11, 13, 14 (Al Kharafi, Palmiera captions) | `palmiera-oasis` |
| `/en/services/precast-joints-sealant-works/` (+ ar) | same | `services.json` → `items[5]`; no related reference rows | 6 | `site-panels-01` |
| `/en/projects/` `/ar/projects/` | `[lang]/projects/index.astro` | `projects.json` → `page`, `reference[17]`, `showcase[6]`, `statuses`, `page.categories` | 10, 11, 12, 13, 14 | 6 showcase images |
| `/en/projects/madinat-jumeirah-living-phase-4/` (+ ar) | `[lang]/projects/[slug].astro` | `projects.json` → `showcase[0]` + reference row ref-04 + `services.items[0]` link | 11, 12 | `madinat-jumeirah-living-532.jpg` |
| `/en/projects/bulgari-ocean-villas/` (+ ar) | same | `showcase[1]` + ref-02 + `services.items[2]` | 11, 13 | `bulgari-ocean-villas-1152.jpg` |
| `/en/projects/lamborghini-villas/` (+ ar) | same | `showcase[2]`; `refId: null` → no reference-list facts | 12 | `lamborghini-villas-937.jpg` |
| `/en/projects/beachgate-by-address/` (+ ar) | same | `showcase[3]` + ref-07 + `services.items[1]` | 11, 14 | `beachgate-address-474.jpg` |
| `/en/projects/palmiera-the-oasis/` (+ ar) | same | `showcase[4]` + ref-10 + `services.items[4]` | 11, 14 | `palmiera-oasis-474.jpg` |
| `/en/projects/al-kharafi/` (+ ar) | same | `showcase[5]`; `refId: null` → no reference-list facts | 13 | `al-kharafi-474.jpg` |
| `/404.html` | `404.astro` | `site.json` → `ui.notFoundTitle`, `ui.notFoundText`, `ui.backHome` (en + ar on one page) | — | none |

Also generated but not content routes: `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt`, `/site.webmanifest`, `/favicon.ico`, `/favicon-{16,32,48,192,512}.png`, `/apple-touch-icon.png`, `/og-image.jpg`, `/brand/*`, `/images/*`, `/fonts/*`.

## Services → source map

| # / slug | Declared `sourcePages` | Actual PDF pages behind the copy | Image | Related reference rows |
| --- | --- | --- | --- | --- |
| 01 `precast-claddings` | 6, 12 | 6 (service line), 11 (rows 1, 4, 8, 13, 16: MJL 3b / 4 / 6B / 7, Sheikh Zayed National Museum) | `bulgari-ocean-villas` (p.13) | ref-01, ref-04, ref-08, ref-13, ref-16 |
| 02 `load-bearing-structures` | 6, 11 | 6, 11 (rows 6, 7, 11, 12, 15: MJL Phase 4 stairs + wind tower, Beachgate, Emaar Beachfront Bayview/Seapoint, HBRCH) | `site-structure-02` (p.7) | ref-06, ref-07, ref-11, ref-12, ref-15 |
| 03 `villas` | 6, 12, 13 | 6, 11 (rows 2 and 5: Bulgari triangles, Elysian boundary walls), 12 (Lamborghini GRC caption) | `lamborghini-villas` (p.12) | ref-02, ref-05, ref-10 |
| 04 `hollow-core-slabs` | 6, 11 | 6, 11 (row 17: Al Lusaily Phase 01, Me'aisem Second) | `site-installation-03` (p.7) | ref-17 |
| 05 `precast-boundary-walls` | 6, 11, 13, 14 | 6, 11 (rows 5, 10, 14), 13 (Al Kharafi), 14 (Palmiera) | `palmiera-oasis` (p.14) | ref-05, ref-10, ref-14 |
| 06 `precast-joints-sealant-works` | 6 | 6 only — the PDF lists the service line but no project reference for sealing work | `site-panels-01` (p.7) | none (grid omitted) |

The declared `sourcePages` metadata is not fully consistent with the copy: services 01, 03 and 05 cite page-11 reference rows in their body text but do not list page 11 in `sourcePages`; page 12/13/14 are photography pages, not fact sources. Left unchanged (documentation-only task).

Each service detail route also renders: a "Related services" list (the other five), a contact aside, and a related-projects grid that is omitted when the list is empty (service 06 only).

## Projects → source map

The six detail routes are built from `projects.showcase`; two of them (`lamborghini-villas`, `al-kharafi`) exist only as captioned photography on pages 12–13 and have no row in the page-11 reference list, so their `facts` are `null` and their fact panel shows only Location.

| Route slug | PDF pages | Reference row | Facts shown on the page | Image | Status |
| --- | --- | --- | --- | --- | --- |
| `madinat-jumeirah-living-phase-4` | 11, 12 | ref-04 / row 4 | Client Madinat Jumeirah Living · Consultant Next Engineering Consultants · Contractor Al Sahel Contracting Co. LLC · Completed · Dubai, UAE | `madinat-jumeirah-living-532.jpg` | Completed |
| `bulgari-ocean-villas` | 11, 13 | ref-02 / row 2 | Client MEERAS · Consultant Khatib & Alami Consultants · Contractor Innovo Build LLC · Completed · Dubai, UAE | `bulgari-ocean-villas-1152.jpg` | Completed |
| `lamborghini-villas` | 12 | none | Location Dubai, UAE only (no client/consultant/contractor/status in the source) | `lamborghini-villas-937.jpg` | — |
| `beachgate-by-address` | 11, 14 | ref-07 / row 7 | Client EMAAR · Consultant Mirage Consultants · Contractor Al Sahel Contracting Co. LLC · On-going · Dubai, UAE | `beachgate-address-474.jpg` | On-going |
| `palmiera-the-oasis` | 11, 14 | ref-10 / row 10 | Client EMAAR · Consultant X-Architects · Contractor Fibrex Contracting L.L.C · On-going · Dubai, UAE | `palmiera-oasis-474.jpg` | On-going |
| `al-kharafi` | 13 | none | Location Dubai, UAE only | `al-kharafi-474.jpg` | — |

The `/en/projects/` reference table renders all 17 rows of page 11 verbatim (client, consultant, contractor, status), grouped by the seven filter chips defined in `projects.json → page.categories` (`claddings`, `boundary-walls`, `staircases`, `villas`, `hollow-core`, `other` + all). Status labels come from `projects.json → statuses`. Reference rows are also surfaced as "related projects" on service pages; rows without a showcase project are rendered as plain text (no detail link).

The page's own note (`page.referenceNote`) states the list is "Reproduced from the project reference list on pages 10 and 11 of the Mouldex Precast Contracting L.L.C company profile" — pages 10–11 are in fact branded Precast Technology Solutions L.L.C - FZ (see `docs/source-inventory.md`, Open questions #7).

## Home, About and Contact provenance

| Route | Facts rendered | PDF source | Editorial (not in the PDF) |
| --- | --- | --- | --- |
| `/en/` | Hero lead ("turnkey precast solutions for commercial, civil and residential…"), GM + 20+ years, licence statement, stats 20+ / 17 / 6 / Dubai, six services, project names, three company values, on-site photo captions | 3, 4, 5, 6, 7, 11, 12, 13 | Hero title "Precast, engineered for the skyline"; section leads and CTAs; photo captions |
| `/en/about/` | Company overview, licence, GM leadership, mission, vision, core offerings, six values, four business elements, facts table (legal name, head office, licence, leadership, experience, sectors) | 3, 4, 5, 7; head office also 25 | Section leads, facts labels, the GM bio sentence, CTA |
| `/en/contact/` | Address line, telephone, mobile, fax, email, PO Box, city/country | 25 | Section leads and the enquiry-form copy; the form only composes a `mailto:` — no data is stored or sent by the site |

All three also consume `site.json` for nav labels, UI strings, brand name and the `Organization` JSON-LD (legal name, logo, phone, fax, email, PO Box, area served, languages).

## Facts not stated on the website

Content present in the PDF but intentionally withheld. Nothing in this table is rendered anywhere on the site.

| PDF fact | Pages | Why omitted |
| --- | --- | --- |
| Organisation chart: names and job titles of ~40 staff (CEO, managers, engineers, foremen, supervisors, drivers, HSE) | 8–9 | Internal employee records — personal positions, not company capability |
| Employee register: 109 named staff rows, staff IDs `MDX-…`, job categories, project allocations | 21–24 | Internal employee records — personal and operational data; workforce totals (109) and role breakdown also withheld |
| Internal project codes `100`–`109` (Driver, Beach Gate, Fibrex-Factory, Fibrex, School Site, Dubai Precast, ABC, MEP, Innova) | 21–24 | Internal operations data; codes are not public project identifiers |
| Signed/pre-qualification submittals, transmittals and approvals: internal reference numbers (redacted), dates, approval actions and conditions, signatories, stamps | 15–19 | Signed/confidential project correspondence |
| Licence and registration identifiers (licence no., register no., DCCI no.), licence issue/expiry dates, manager's full legal name, registered office addresses | 20 (addresses also 19) | Official registration document; identifiers and addresses not confirmed for publication |
| Relationship between "Mouldex Precast Contracting L.L.C", "Mouldex Technical Services LLC" and "Precast Technology Solutions L.L.C - FZ" | 3, 10–11, 15–19 | Not explained in the source; publishing an attribution would require confirmation |
| Contract values, project values, quantities, floor areas, completion dates, employee numbers | none present | Never available in the source (only status words) |
| Table-of-contents promise of a "Management Team" section | 2 | The section does not exist in the PDF; the only leadership fact is the GM from page 3 |
| Back-cover closing statement ("not just a precast solutions provider…") | 25 | Replaced by the site's own brand description; the statement is generic marketing copy and was not carried over verbatim |

Routes deliberately **not built** because the source cannot support them: team/leadership page, certifications/quality page, careers, news, client-logo wall, and a separate "company profile" download. The org chart and registers are the only material that could have filled a team page, and they are excluded.

## Translation model

**English is the source of truth. Arabic is a full translation, not a fallback.** The rule is recorded in `docs/translation-glossary.md` ("English copy is the single source of truth and must not be changed") and implemented in the data files rather than in templates.

| Layer | Where it lives | Shape |
| --- | --- | --- |
| Page copy (home, about, contact) | `site/src/data/pages.json` | `home` / `about` / `contact`, each with a complete `en` object and a complete `ar` object (same keys) |
| Services | `site/src/data/services.json` | `page` labels as `{en, ar}` pairs; each `items[]` entry has `en` and `ar` copy objects plus language-neutral fields (`slug`, `number`, `image`, `sourcePages`, `relatedProjects`) |
| Projects | `site/src/data/projects.json` | `page` and `statuses` as `{en, ar}` pairs; `reference[]` names as `{en, ar}`; `showcase[]` entries with `en`/`ar` copy objects and language-neutral facts (client, consultant, contractor, status, image) |
| Company values | `site/src/data/values.json` | one `{en, ar}` pair per title/text, ids shared |
| UI strings, nav, brand, contact | `site/src/data/site.json` | `nav`, `ui`, `brand.legalName/name/tagline/shortDescription`, `contact.city/country/addressLine` as `{en, ar}`; phone/fax/email/PO Box as language-neutral strings |
| Images | `site/src/data/images.json` | language-neutral manifest (name, source, variants) |
| Lookup helpers | `site/src/lib/content.ts`, `site/src/lib/i18n.ts` | `localized()` deep-merges `ar` over `en` per field (arrays switch only when the Arabic array is non-empty and the same length); `pick()` falls back to English per string |

**How a route becomes bilingual.** Every `[lang]` page calls `getStaticPaths()` for `en` and `ar`; `localized(block, lang)` returns the English block for `en` and the merged Arabic block for `ar`. Missing Arabic strings silently fall back to English at field level rather than failing the build, so Arabic completeness must be maintained by editing the `ar` side alongside the `en` side.

- Arabic is written right-to-left; the layout relies on logical CSS properties and `dir="rtl"` set from `isRtl(lang)` in `BaseLayout.astro`. Latin font is Archivo, Arabic font is IBM Plex Sans Arabic (self-hosted in `site/public/fonts`).
- Proper nouns stay in Latin script in both locales (client, consultant, contractor and project names; `MOULDEX`; the legal name `MOULDEX PRECAST CONTRACTING L.L.C`); Arabic surrounds them with translated descriptive words. Numbers, phases, telephone/fax numbers and the PO Box use Latin digits.
- Contact values (phone, fax, mobile, email, PO Box) are shared across locales; only labels are translated.
- Facts are translated, never added: no Arabic sentence introduces a client, figure, certification or capability that is absent from the English source.
- The `<html lang>`/`hreflang` alternates (`en`, `ar`, `x-default`) and canonical URLs are generated per locale route in `BaseLayout.astro`, so the two language trees cross-reference each other.

**Editorial copy vs source facts.** Service detail pages interleave PDF-derived sentences with generic precast explanations that are not in the PDF (e.g. "Precast cladding panels are factory-cast concrete elements…", "Hollow core slabs are precast concrete floor and roof elements…"). These were written for the website and describe standard industry practice; they are not company claims. All company-specific claims trace back to pages 3–7, 11 and 13–14, and the projects table to page 11. The site normalises source typos ("CAMPANY", "LAMBHORGINI") and the inconsistent entity name; those source issues are recorded in `docs/source-inventory.md` instead of being reproduced.
