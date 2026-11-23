# mouldexprecast.com

Bilingual (Arabic / English) corporate website for **Mouldex Precast Contracting L.L.C**, Dubai, UAE.

- **Live site (GitHub Pages):** https://mouldexprecast.com/ — `/` redirects to `/en/`
- **Arabic:** https://mouldexprecast.com/ar/
- **Hosting:** GitHub Pages, branch `main`, repository root, custom domain via `CNAME`
- **This repository root is the published build.** The Astro source project lives in
  [`MOULDEX-WEBSITE/`](MOULDEX-WEBSITE) with the full documentation in
  [`MOULDEX-WEBSITE/docs/`](MOULDEX-WEBSITE/docs).

---

## Published pages (17 routes per locale = 34 URLs + 404)

| Route (`/en/…`; `/ar/…` mirrors it) | Page |
| --- | --- |
| `/en/` | Home |
| `/en/about/` | About: overview, facts, mission & vision, offerings, six values, business overview, leadership |
| `/en/services/` | Services index |
| `/en/services/precast-claddings/` | Precast claddings |
| `/en/services/load-bearing-structures/` | Load-bearing structures |
| `/en/services/villas/` | Villas |
| `/en/services/hollow-core-slabs/` | Hollow core slabs |
| `/en/services/precast-boundary-walls/` | Precast boundary walls |
| `/en/services/precast-joints-sealant-works/` | Precast joints sealant works |
| `/en/projects/` | Projects: 6 showcase projects + filterable 17-row reference table |
| `/en/projects/madinat-jumeirah-living-phase-4/` | Project detail |
| `/en/projects/bulgari-ocean-villas/` | Project detail |
| `/en/projects/lamborghini-villas/` | Project detail |
| `/en/projects/beachgate-by-address/` | Project detail |
| `/en/projects/palmiera-the-oasis/` | Project detail |
| `/en/projects/al-kharafi/` | Project detail |
| `/en/contact/` | Contact + enquiry form (composes a `mailto:` draft) |

Plus `404.html` (bilingual) and the `/` → `/en/` redirect.

## Repository layout

| Path | Contents |
| --- | --- |
| `index.html`, `en/`, `ar/`, `_astro/`, `brand/`, `images/`, `fonts/`, `404.html`, `favicon*`, `og-image.jpg`, `robots.txt`, `sitemap*.xml`, `site.webmanifest` | **Published static build** (do not edit by hand) |
| `CNAME` | GitHub Pages custom domain (`mouldexprecast.com`) |
| `.nojekyll` | Required so GitHub Pages serves the `_astro/` directory as-is |
| `MOULDEX-WEBSITE/site/` | Astro 5 source project (pages, bilingual content model, tests) |
| `MOULDEX-WEBSITE/source-materials/` | Company profile PDF, official logo PNG, extraction + asset pipeline |
| `MOULDEX-WEBSITE/docs/` | Source inventory, content map, design notes, implementation decisions, translation glossary, QA report |
| `MOULDEX-WEBSITE/site/qa/screenshots/` | Local QA screenshots (not committed) |

## Updating the published site

```powershell
cd MOULDEX-WEBSITE\site
npm install                 # first time only
npm test                    # builds + runs the 210-test Playwright suite
npm run build               # -> MOULDEX-WEBSITE/site/dist
cd ..\..
robocopy "MOULDEX-WEBSITE\site\dist" "." /E   # copy the build to the repository root
git add -A
git commit -m "Update website"
git push origin main        # GitHub Pages rebuilds automatically
```

`npm run content:check` validates the bilingual content model (no missing Arabic strings, structure,
image references) before publishing.

## Content provenance and publication rules

Everything published is traceable to a page of the company profile PDF (in
`MOULDEX-WEBSITE/source-materials/`); see `MOULDEX-WEBSITE/docs/source-inventory.md` for the
page-by-page mapping.

**Deliberately not published:**

- organisation chart with personal names and job titles (PDF pp. 8–9);
- employee register with names, staff IDs `MDX-…`, categories and project allocations (pp. 21–24);
- signed pre-qualification submittals, transmittals, stamps and signatures (pp. 15–19);
- the scanned commercial licence with licence numbers and registered address (p. 20).

No external or stock photography is used: only the photographs embedded in the PDF and the supplied
logo PNG. The favicon set is the client-supplied mark artwork (`source-materials/mouldex-icon-source.png`) on a white tile, so it stays readable at 16 px; the reversed logo lockup and social card are derived from the logo PNG.

**Points to confirm with the company before/after launch** (documented in
`MOULDEX-WEBSITE/docs/implementation-decisions.md`): the contracting-entity naming in the source
(Mouldex Precast Contracting L.L.C / Mouldex Technical Services LLC / Precast Technology Solutions
L.L.C - FZ on the project list), publication of the personal Outlook contact email and the General
Manager's mobile, reuse of developer-render project imagery, project status freshness, and a native
review of the Arabic copy.

## Documentation

- [`MOULDEX-WEBSITE/docs/source-inventory.md`](MOULDEX-WEBSITE/docs/source-inventory.md) — every PDF page, assets and exclusions
- [`MOULDEX-WEBSITE/docs/content-map.md`](MOULDEX-WEBSITE/docs/content-map.md) — route → content → source page
- [`MOULDEX-WEBSITE/docs/design-notes.md`](MOULDEX-WEBSITE/docs/design-notes.md) — visual system (Heidelberg Materials reference), palette, typography, RTL
- [`MOULDEX-WEBSITE/docs/implementation-decisions.md`](MOULDEX-WEBSITE/docs/implementation-decisions.md) — scope decisions and rights items
- [`MOULDEX-WEBSITE/docs/translation-glossary.md`](MOULDEX-WEBSITE/docs/translation-glossary.md) — EN → AR terminology
- [`MOULDEX-WEBSITE/docs/qa-report.md`](MOULDEX-WEBSITE/docs/qa-report.md) — tests executed, defects fixed, known limitations

## Tests

`MOULDEX-WEBSITE/site` ships a Playwright suite (Chrome, desktop + mobile): routes and metadata,
bilingual rendering, every image and alt text, logo/favicon/OG assets, navigation and mobile dialog,
responsive layout at 360–1440 px, project filters, contact form `mailto:` behaviour, a privacy scan
for excluded internal records, and axe-core WCAG 2.0/2.1 A/AA scans. Last run: **203 passed,
7 device-specific skips, 0 failed; 0 serious/critical axe violations**.

