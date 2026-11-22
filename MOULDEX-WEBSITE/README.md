# MOULDEX-WEBSITE — source project

Source of the **mouldexprecast.com** website (bilingual Arabic/English, Astro 5).

The published static build lives at the **repository root** and is served by GitHub Pages
(branch `main`, custom domain `mouldexprecast.com`). This folder holds everything needed to change
it:

| Path | Contents |
| --- | --- |
| `site/` | Astro project: pages, components, bilingual content model (`src/data`), design system, Playwright tests |
| `source-materials/` | The 25-page company profile PDF, the official logo PNG, the extraction + asset pipelines and the extracted text |
| `docs/` | Source inventory, content map, design notes, implementation decisions, translation glossary, QA report |

## Typical workflow

```powershell
cd site
npm install
npm run dev            # local preview on http://127.0.0.1:4321/
npm test               # build + 210 Playwright tests (desktop + mobile)
npm run build          # -> site/dist
```

Then copy the build to the repository root and push (GitHub Pages rebuilds automatically):

```powershell
cd ..\..
robocopy "MOULDEX-WEBSITE\site\dist" "." /E
git add -A
git commit -m "Update website"
git push origin main
```

`site/qa/screenshots/` (local QA captures) and `site/dist/` are not committed.

See the repository [README](../README.md) for the published page list, content provenance and
publication rules, and `docs/qa-report.md` for the test results.

