# Implementation decisions

Recorded because the approved **MOULDEX Website Implementation Specification v1.0** was not
present in the workspace when implementation started (the workspace contained only
`source-materials/`). The delivered scope was reconstructed from the implementation brief and the
supplied company profile. If the v1.0 document differs on any point below, the change is local to
the content model (`site/src/data/*.json`) and the nine page templates.

| # | Decision | Rationale | Where it lives |
| --- | --- | --- | --- |
| 1 | **Bilingual static site, one template per page type** — `/en/…` and `/ar/…` are generated from the same templates by `getStaticPaths()` | Guarantees EN/AR parity (a page cannot exist in one locale only) and halves maintenance | `site/src/pages/[lang]`, `site/src/lib/i18n.ts` |
| 2 | **Astro 5 static build** (35 pages, no client framework) | Content-heavy corporate site; static HTML keeps every route testable offline, no server needed; only tiny vanilla scripts for the menu, filters and mailto form | `site/astro.config.mjs` |
| 3 | **Page set**: Home · About · Services index · 6 service pages · Projects index · 6 project detail pages · Contact · global 404 | Covers the brief ("every approved page, all six service pages, eligible project detail pages") with the only content the source supports | `site/src/pages` |
| 4 | **The six services are the six "WHAT WE DO" lines** on profile page 6: precast claddings, load-bearing structures, villas, hollow core slabs, precast boundary walls, precast joints sealant works | The profile defines exactly six service lines; no seventh service is invented | `site/src/data/services.json` |
| 5 | **"Eligible" project detail pages = projects with photography in the profile** (pages 12–14): Madinat Jumeirah Living Phase 4, Bulgari Ocean Villas, Lamborghini Villas, Beachgate by Address, Palmiera at The Oasis, Al Kharafi | Those are the only projects with enough published material for a page; the other 11 reference rows stay in the filterable reference table. No detail page was created for a project with only a table row (that would be a thin/invented page) | `site/src/data/projects.json → showcase` |
| 6 | **Reference table reproduces all 17 rows verbatim** (client, consultant, main contractor, status) with visible provenance note | The list is the company's published reference list; roles are shown as published instead of being re-attributed to Mouldex | `site/src/data/projects.json → reference` |
| 7 | **Fact discipline**: every company claim is traceable to a PDF page (see `docs/source-inventory.md` and `docs/content-map.md`); nothing is invented — no certifications, no founding year, no headcount, no office address, no social links | Brief: "Do not invent missing information" | `site/src/data` |
| 8 | **Internal records excluded**: org chart (pp. 8–9), employee registers (pp. 21–24), signed submittals/transmittals/stamps (pp. 15–19) and the scanned commercial licence (p. 20) are not published; no names, staff IDs, signatures, licence numbers or registered address appear anywhere in the build | Brief: "do not publish internal employee records"; rights/privacy | enforced by `site/tests/privacy.spec.ts` |
| 9 | **Imagery**: only images embedded in the supplied PDF are used (10 photographs plus the supplied logo PNG). No external or stock photography is substituted. Developer renders from pages 12–14 are used as published project imagery with descriptive alt text | Brief: no external photographs; rights remain with the source | `source-materials/build_web_assets.py` |
| 10 | **Brand**: supplied logo PNG is the only logo; header uses the trimmed lockup, footer/mobile menu/OG card use a derived reversed lockup; favicon is derived from the logo's red precast panel + white window on the brand navy tile | Brief: use the supplied logo and create a favicon from it | `site/public/brand`, `site/public/favicon*`, `docs/source-inventory.md § Logo and favicon` |
| 11 | **Visual reference**: Heidelberg Materials' corporate web language (large calm photography, sharp geometry, thin rules, uppercase kickers, generous whitespace, dark editorial bands) applied to Mouldex's own palette sampled from the profile (royal blue `#004AAC`, signal yellow, concrete neutrals, dot-grid motif) | Brief: Heidelberg Materials visual reference | `docs/design-notes.md` |
| 12 | **Contact form has no backend**: it composes a `mailto:` draft in the visitor's mail client and states that nothing is stored or sent by the site | Static build, no server to receive submissions, and no invented CRM endpoint | `site/src/components/ContactForm.astro` |
| 13 | **No deployment, no publication**: the project only builds to `site/dist` and is served from `127.0.0.1` | Brief: do not deploy or publish; nothing was pushed or uploaded | `README.md` |
| 14 | **Localisation**: English is the source of truth, Arabic is a full translation stored in the same JSON records (`en`/`ar`), with an English per-field fallback in `localized()` so a partial translation can never break a page | Robustness + the brief's bilingual requirement | `site/src/lib/content.ts` |

## Publication-rights items worth a client decision (not blocking local build)

1. The reference list on profile pages 10–11 is branded **Precast Technology Solutions L.L.C - FZ**, while the profile is Mouldex's. The site presents it as the company profile's project reference list and states the provenance; the contracting-entity relationship is not explained in the source.
2. The published contact email is a personal Outlook mailbox (`samy.mdxdxb@outlook.com`) and the profile also lists the General Manager's mobile. Both are reproduced from the profile's contact block (p. 25); confirm they are intended for public display.
3. Project images on pages 12–14 are developer marketing renders carrying client branding (Emaar, Meraas/MEERAS, Dubai Hills Vista, Beachgate, Palmiera). Confirm permission to reuse them.
4. Project statuses ("Completed / On-going / Awarded") come from an undated document; they should be confirmed before launch.
