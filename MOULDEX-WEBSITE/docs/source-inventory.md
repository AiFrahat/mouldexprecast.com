# Source inventory — Mouldex Pre-Qualification PDF (25 pages)

Page-by-page inventory of `source-materials/Mouldex Precast Contracting LLC ( Pre-Qualification Documents. ).pdf` and of the website assets derived from it. Every statement is grounded in the extracted text (`extracted/text/pages.json` and `page-XX.txt`), the embedded-image manifest (`extracted/images/index.json`), the web-image manifest (`extracted/web-images.json`) and visual checks of the 120 dpi renders (`extracted/pages/page-XX.png`).

- Pages documented: **25**
- Embedded image occurrences: **49** (46 unique image objects → 49 extracted files) on pages 1, 3–7, 10–20, 25
- Website photography: **10 image names → 17 JPEG files**, plus `og-image.jpg`
- Logo source: `source-materials/website icon no background.png` (**1536×1024 RGBA**)
- The PDF itself is undated and carries no version number; page numbers below are the printed folio numbers, which match the physical page order 1–25.

## Publication status codes

| Code | Meaning |
| --- | --- |
| **PUB** | Facts and/or photography from the page are rendered on the public website. |
| **R1** | Not published — internal employee records (names, staff IDs, categories, project allocations, organisation positions). |
| **R2** | Not published — signed/confidential project correspondence (submittals, transmittals, approvals, stamps, signatures, named individuals). |
| **R3** | Not published — scanned official company document (licence/registration numbers, manager's legal name, registered address). |
| **R4** | Structural page (cover, contents, section divider) — no body copy published and nothing reused. |

Rule applied throughout: **internal employee records and signed documents are not published.**

## At a glance

| # | Section as printed | Type | Images | Status |
| --- | --- | --- | --- | --- |
| 1 | (cover) MOULDEX PRECASTCONTRACTINGL.L.C — COMPANY PROFILE | Cover | 4 | R4 |
| 2 | TABLE OF CONTENT | Contents | 0 | R4 |
| 3 | COMPANY OVERVIEW — About Us | Body copy | 1 | PUB |
| 4 | OUR PROCESS — Mission / Vision / Core offerings | Body copy | 1 | PUB |
| 5 | CAMPANY VALUES [sic] | Body copy | 1 | PUB |
| 6 | WHAT WE DO | Body copy | 1 | PUB |
| 7 | BUSINESS OVERVIEW | Body copy + 3 site photos | 3 | PUB |
| 8 | O R G A N I Z A T I O N C H A R T (part 1) | Employee records | 0 | R1 |
| 9 | ORGANIZATION CHART (part 2) | Employee records | 0 | R1 |
| 10 | PROJECT REFERENCE LIST (divider, PTS-branded) | Divider | 1 | R4 |
| 11 | PROJECT LIST — 17 rows | Reference data | 7 | PUB |
| 12 | PROJECTS EXECUTED (part 1) | Project photography | 3 | PUB |
| 13 | PROJECTS EXECUTED (part 2) | Project photography | 3 | PUB |
| 14 | PROJECTS – ON GOING | Project photography | 2 | PUB |
| 15 | PRE-QUALIFICATION / SUB-CONTRACTOR SUBMITTAL (Emaar, The Oasis) | Signed submittal | 7 | R2 |
| 16 | SUBMITTAL TRANSMITTAL SHEET (MJL Phase 7 / ELARA) | Signed transmittal | 1 | R2 |
| 17 | 11-SUB-CONTRACTOR SUBMITTAL (Emaar, Palmiera Phase 1A) | Signed submittal | 10 | R2 |
| 18 | PRE-QUALIFICATION SUBMITTAL (MJL Phase 4, Aljazi) | Signed submittal | 1 | R2 |
| 19 | Request for Sub-Contractor / Supplier Approval (Bulgari) | Signed approval | 1 | R2 |
| 20 | Commercial Licence (Government of Dubai / DED) | Scanned licence | 1 | R3 |
| 21 | Employee register, part 1 — 32 staff rows | Employee records | 0 | R1 |
| 22 | Employee register, part 2 — 34 staff rows | Employee records | 0 | R1 |
| 23 | Employee register, part 3 — 33 staff rows | Employee records | 0 | R1 |
| 24 | Employee register, part 4 — 10 staff rows + role totals (109) | Employee records | 0 | R1 |
| 25 | (back cover) closing statement + contact block | Contact data | 1 | PUB |

---

## Page-by-page inventory

### Page 1 — Cover
**Content.** Full-bleed Dubai tower photograph, cover geometry (blue/yellow bars, dot grid), the Mouldex lockup top-left, and the title bottom-right.
**Text extracted.** `MOULDEX PRECASTCONTRACTINGL.L.C` and `COMPANY PROFILE` (extraction joins the words; the print is letter-spaced).
**Images.** `page-01-img-01` tower photo 1081×1133; `page-01-img-02` / `page-01-img-04` 183×337 black stencil masks (they mask the blue and yellow cover bars); `page-01-img-03` 342×159 Mouldex lockup.
**Website.** Not published as a page; replaced by the supplied PNG lockup. The tower photo was optimised to `/images/dubai-tower-{1081,800,480}.jpg` but **no template references it**, so it is generated and unused.
**Key fact.** `MOULDEX PRECASTCONTRACTINGL.L.C — COMPANY PROFILE`.

### Page 2 — Table of Content
**Content.** Contents list only. Items printed: 01. Company Overview · 02. Our Process · 03. Company Values · 04. What We Do · 04. Business Overview · 05. Management Team. Note the duplicated `04.` and that no "Management Team" section exists later (the organisation chart occupies pages 8–9 and is an internal record).
**Text extracted.** The six items above plus folio `02`.
**Images.** None.
**Website.** Not published; the order informed the About page section order only.
**Key fact.** None — navigation page.

### Page 3 — Company Overview
**Content.** `COMPANY OVERVIEW` / `About Us`; the primary corporate boilerplate: Dubai provider of precast solutions, precast erection contracting, industrial licence for prefabricated houses contracting and technical services, GM Samy Abdel Aziz with 20+ years in precast, "reliable and innovative force in the GCC region". The last sentence names **"Mouldex Technical Services LLC"** rather than Mouldex Precast Contracting L.L.C — an entity-name inconsistency in the source (see Open questions).
**Text extracted.** "Mouldex Precast Contracting LLC stands as a premier provider of comprehensive precast solutions in Dubai, UAE. … specializes in precast erection contracting, holding an industrial license for prefabricated houses contracting and technical services. Led by the seasoned expertise of General Manager Samy Abdel Aziz, who boasts over 20 years of experience in the precast industry, Mouldex Technical Services LLC has emerged as a reliable and innovative force in the GCC region."
**Images.** `page-03-img-01`, 1779×969 stock photo (hand holding a lightbulb) — **not used**; the site uses real precast photography instead.
**Website.** `pages.json` → `home.intro.body`, `about.overview.body` (paragraphs 1–2), `about.facts` (Legal name, Leadership, Experience), `about.leadership`.
**Key fact.** "Mouldex Precast Contracting LLC stands as a premier provider of comprehensive precast solutions in Dubai, UAE."

### Page 4 — Our Process
**Content.** Despite the heading "OUR PROCESS" the page carries no process steps: Mission, Vision and Core offerings.
**Text extracted.** Mission: "To be the foremost provider of precast solutions in the UAE, offering innovative, sustainable, and high-quality solutions to meet the evolving needs of the construction industry." Vision: "Empower construction excellence through cutting-edge precast solutions, setting industry benchmarks for efficiency, safety, and environmental responsibility." Core offerings: turnkey solutions for commercial, civil and residential sectors; durability, environmental safety, seamless installation, superior quality, cutting-edge technology adoption, rapid construction timelines, extended product spans with high loading capacity.
**Images.** `page-04-img-01`, 1200×1800 glass-facade stock photo — **not used**.
**Website.** `pages.json` → `about.mission`, `about.vision`, `about.offerings`; "commercial, civil and residential" also in `home.hero.lead` and `about.facts` (Sectors).
**Key fact.** "To be the foremost provider of precast solutions in the UAE."

### Page 5 — CAMPANY VALUES [sic]
**Content.** Six company values, one sentence each.
**Text extracted.** Customer Delight: "Achieving 100% customer satisfaction through exemplary service." · Health and Environmental Safety: "Prioritizing the well-being of our workforce and the sustainability of our projects." · Quality in Work: "Ensuring excellence in every facet of our operations." · Timely Delivery of Services: "Adhering to strict timelines for efficient project completion." · Technology Integration: "Embracing and implementing up-to-date technologies for enhanced solutions." · Continual Improvement: "A commitment to ongoing enhancement in all aspects of our operations."
**Images.** `page-05-img-01`, 1469×980 handshake stock photo — **not used**.
**Website.** `values.json` (all six, `en` + `ar`); rendered on `/en/about/` and, for three of them, in the home "Why Mouldex" band (`home.why.valueIds` on `pages.json`).
**Key fact.** "Customer Delight: Achieving 100% customer satisfaction through exemplary service."

### Page 6 — What We Do
**Content.** Six service lines, each with a one-line description.
**Text extracted.** "Precast Claddings: Expertise in high-rise towers and commercial structures. · Load-Bearing Structures: Precision in constructing robust load-bearing elements. · Villas: Crafting elegant and durable precast structures for residential projects · Hollow Core Slabs: Utilizing advanced technology for efficient construction. · Precast Boundary Walls: Providing security and aesthetics for various applications · Precast Joints Sealant Works: Ensuring integrity and longevity of precast structures."
**Images.** `page-06-img-01`, 1344×896 office stock photo — **not used**.
**Website.** `services.json` → `items[]` titles, one-line summaries and capabilities; home services grid; nav services menu; footer services list.
**Key fact.** "Precast Claddings: Expertise in high-rise towers and commercial structures."

### Page 7 — Business Overview
**Content.** Business structure and four key elements; three site photographs down the left.
**Text extracted.** "Mouldex Precast Contracting LLC operates as a private company with an industrial license for prefabricated houses contracting and technical services works. Our commitment to quality and innovation sets us apart in the market. Key elements of our business include: Industry Leadership … Licensed Operations … GCC Expertise: Leveraging over 20 years of experience in the GCC region … Turnkey Solutions …"
**Images.** `page-07-img-01` 474×240 → `/images/site-panels-01-474.jpg`; `page-07-img-02` 403×315 → `/images/site-structure-02-403.jpg`; `page-07-img-03` 640×360 → `/images/site-installation-03-640.jpg` (all three published).
**Website.** `pages.json` → `about.business` (four items + lead); `home.onsite` strip; home intro figure (`site-installation-03`); `about.overview.image`; `services.json` images for services 02, 04 and 06.
**Key fact.** "Mouldex Precast Contracting LLC operates as a private company with an industrial license for prefabricated houses contracting and technical services works."

### Page 8 — Organization Chart (part 1)
**Content.** Org chart headed `CEO`, with named individuals in boxes for Process Coordination, Site Supervisor cum Manager, Casting Yard In-Charge, Site Engineers, HSE Manager/Officer, Survey Manager, Junior Surveyor, Site Supervisors and Site Foremen.
**Text extracted.** The heading plus ~20 personal names and role labels; each box pairs a name with a job title.
**Images.** None (vector chart).
**Website.** **Not published (R1).** No names or roles from this page appear on the site; the published leadership fact (GM name) comes from page 3, which names only the General Manager.
**Key fact.** "O R G A N I Z A T I O N C H A R T" — no publishable company fact.

### Page 9 — Organization Chart (part 2)
**Content.** Continuation of the same chart: Site Foremen, Site Chargeants, Site Supervisors, Junior Surveyor, Drivers, HSE Officer/Manager, again with named individuals.
**Text extracted.** ~20 more personal names with role labels (several names repeat from page 8).
**Images.** None.
**Website.** **Not published (R1).**
**Key fact.** None publishable.

### Page 10 — Project Reference List (divider)
**Content.** Section divider for the inserted project list, printed on a separate template: "PROJECT REFERENCE LIST / Precast Technology Solutions L.L.C - FZ", footer "Precast Technology Solutions L.L.C - FZ | Dubai, UAE".
**Text extracted.** `PROJECT REFERENCE LIST`, `Precast Technology Solutions L.L.C - FZ`, `Precast Technology Solutions L.L.C - FZ | Dubai, UAE`.
**Images.** `page-10-img-01`, 324×131 PTS logo (same digest as `page-11-img-01`) — not used.
**Website.** Not published as a page, but it establishes the provenance of the 17-row list used on `/en/projects/`: the list is branded **Precast Technology Solutions L.L.C - FZ**, not Mouldex (see Open questions).
**Key fact.** "Precast Technology Solutions L.L.C - FZ | Dubai, UAE".

### Page 11 — Project List
**Content.** The reference table: columns `No. | Project Name | Client | Consultant | Contractor | Remarks`; 17 rows, statuses Completed ×5 (1, 2, 3, 4, 6), On-going ×6 (5, 7, 8, 9, 10, 13), Awarded/On-going ×2 (11, 12), Awarded ×4 (14–17).
**Text extracted.** All 17 rows verbatim, e.g. `1 Precast Cladding Panels for Madinat Jumeirah Living: Phase 3b — Madinat Jumeirah Living — Next Engineering Consultants — Al Sahel Contracting Co. LLC — Completed`; `2 Precast Triangle Elements for Bulgari Ocean Villas — MEERAS — Khatib & Alami Consultants — Innovo Build LLC — Completed`.
**Images.** `page-11-img-01` PTS logo; `page-11-img-02`–`-07` six small black stencil bitmaps (client-logo masks that are not visible in the rendered page) — none used.
**Website.** The most-used source page: `projects.json` → `reference[]` (all 17 rows: `no`, `name`, `client`, `consultant`, `contractor`, `status`, `category`, `service`); `/en/projects/` table + filters; every `relatedProjects` list on service pages; project-detail reference note.
**Key fact.** "Hollow core slabs for Al Lusaily Development Phase 01, Me'aisem Second, Dubai, UAE — EMAAR — X-Architects — Fibrex Contracting L.L.C — Awarded" (row 17).

### Page 12 — Projects Executed (part 1)
**Content.** Two captioned project images on the `PROJECTS EXECUTED` template.
**Text extracted.** `PROJECTS EXECUTED`; "INSTALLATION OF PRECAST CLADDING PANELS AT MADINAT JUMEIRAH LIVING : PHASE 4"; "INSTALLATION OF GRC PANELS AT LAMBHORGINI [sic] VILLAS PROJECT".
**Images.** `page-12-img-01` 937×544 Lamborghini villa render → `/images/lamborghini-villas-937.jpg`; `page-12-img-02` 532×299 Madinat Jumeirah Living render → `/images/madinat-jumeirah-living-532.jpg`; `page-12-img-03` 1280×722 blue-glass facade strip (decorative bleed, shared with page 13) — not used.
**Website.** Project pages `/en/projects/lamborghini-villas/` and `/en/projects/madinat-jumeirah-living-phase-4/`; project cards on home and projects index; `Lamborghini Villas` is a photo-only entry because the name does not appear in the page-11 list.
**Key fact.** "Installation of precast cladding panels at Madinat Jumeirah Living: Phase 4."

### Page 13 — Projects Executed (part 2)
**Content.** Continuation: two more captioned project images.
**Text extracted.** "INSTALLATION OF PRECAST BOUNDARY WALLS AT AL KHARAFI PROJECT"; "INSTALLATION OF PRECAST TRIANGLE PANELS AT BVLGARI VILLAS PROJECT".
**Images.** `page-13-img-01` 1152×648 Bulgari Ocean Villas render → `/images/bulgari-ocean-villas-1152.jpg`; `page-13-img-02` 474×261 Al Kharafi townhouses → `/images/al-kharafi-474.jpg`; `page-13-img-03` blue-glass bleed strip (same file as page 12) — not used.
**Website.** Home hero image; service 01 image; `/en/projects/bulgari-ocean-villas/`; `/en/projects/al-kharafi/` (photo-only entry, no reference-list row); `og-image.jpg` is composited from this page's Bulgari image.
**Key fact.** "Installation of precast triangle panels at Bvlgari Villas project."

### Page 14 — Projects – On Going
**Content.** Two captioned on-going project images.
**Text extracted.** `PROJECTS - ON GOING`; "INSTALLATION OF PRECAST STAIRS AT BEACHGATE BY ADDRESS"; "INSTALLATION OF PRECAST BOUNDARY WALLS AT PALMIERA OASIS".
**Images.** `page-14-img-01` 474×331 Beachgate towers render → `/images/beachgate-address-474.jpg`; `page-14-img-02` 474×266 Palmiera villa render → `/images/palmiera-oasis-474.jpg`.
**Website.** `/en/projects/beachgate-by-address/`, `/en/projects/palmiera-the-oasis/`, their cards, and service 05 image (boundary walls).
**Key fact.** "Installation of precast stairs at Beachgate by Address."

### Page 15 — Pre-qualification / Sub-contractor submittal (Emaar, The Oasis)
**Content.** Completed and signed Emaar submittal form: project `The-Oasis-Development-Phase1B-Mirage-Main-Works`, client EMAAR, consultant X ARCHITECTS, contractor DUTCO CONSTRUCTION CO LLC, type Structural, proposed sub-contractor and an 11-point condition list; the document carries signatures, stamps and internal reference/date details (all redacted here).
**Text extracted.** Form labels + "Action: Approved as Noted"; the conditions include site visits, method statements, manpower histogram, QA plan, DM approval.
**Images.** 7 small logo/stamp bitmaps (client, consultant and contractor logos on the form).
**Website.** **Not published (R2).** The project name itself is already public through page 11 (row 14, "The-Oasis-Development-Phase1B-Mirage-Main-Works"), so the site uses that row, not this signed form.
**Key fact.** "PRE-QUALIFICATION/SUB-CONTRACTOR SUBMITTAL … Approved as Noted."

### Page 16 — Submittal transmittal sheet (MJL Phase 7 / ELARA)
**Content.** Scanned transmittal sheet for `MJL Phase 7 (ELARA)` (transmittal and project numbers, dates and stamps redacted here): submission "Pre-qualification of Lead Subcontractor for Façade Precast Works (M/s Precast Technology Solutions LLC-FZ)", contractor Al Sahel Contracting Co. LLC, consultant CONIN, with handwritten signatures and `RECEIVED` stamps.
**Text extracted.** None — the page is a single full-page scan (`page-16-img-01`, 3507×2480).
**Images.** `page-16-img-01` (whole page).
**Website.** **Not published (R2).**
**Key fact.** "Pre-qualification of Lead Subcontractor for Façade Precast Works (M/s Precast Technology Solutions LLC-FZ)."

### Page 17 — 11-Sub-contractor submittal (Emaar, Palmiera Phase 1A)
**Content.** Completed submittal form `11-SUB-CONTRACTOR SUBMITTAL` for `Emaar - Oasis Palmiera Phase 1A` (reference number redacted): proposed sub-contractor "PRECAST TECHNOLOGY SOLUTIONS L.L.C-CFZ", scope "Prequalification for Supply and Installation of Precast Boundary Wall"; the sub-contractor line names "Hard Precast Building Systems LLC: Design / Raja Qamir Turning LLC: Mold Fabrication / **Mouldex Technical Services LLC: Installation**". Reviewed with comments and signed by the consultant (date redacted).
**Text extracted.** None — text is outlined; the visible labels are as above.
**Images.** 10 small logo/stamp bitmaps (Emaar, X-Architects, Fibrex).
**Website.** **Not published (R2).** The project row itself is public via page 11 (row 10, The Oasis phases 1A/1D/1E).
**Key fact.** "Prequalification for Supply and Installation of Precast Boundary Wall."

### Page 18 — Pre-qualification submittal (MJL Phase 4, Aljazi)
**Content.** Scanned `PRE-QUALIFICATION SUBMITTAL` for `MADINAT JUMEIRAH LIVING (ALJAZI) – PHASE-4` (project/consultant reference numbers and dates redacted here): employer Jumeirah Hills Development LLC, employer representative Dubai Holding Real Estate, consultant Next Engineering Consultant, main contractor Al Sahel Contracting Co. LLC, manufacturer Contech Building Systems LLC, subcontractor Precast Technology Solutions LLC-FZ; consultant and employer comments, stamps and signatures.
**Text extracted.** None — single full-page scan (`page-18-img-01`, 1169×1651).
**Images.** `page-18-img-01` (whole page).
**Website.** **Not published (R2).**
**Key fact.** "Pre-qualification for Lead Subcontractor of Façade Precast Works (Engineering, Production and Installation) by M/s Precast Technology Solutions LLC-FZ."

### Page 19 — Request for Sub-Contractor / Supplier Approval (Bulgari)
**Content.** Scanned Innovo / Khatib & Alami / Meraas approval request for `Project: Bulgari Ocean Villas`, contractor Innovo Build LLC, sub-contractor "M/s. Precast Technology Solutions LLC", job description "Precast Works"; marked "Approved with Comments" and signed by the engineer (contract number, correspondence dates and address details redacted here).
**Text extracted.** None — single full-page scan (`page-19-img-01`, 1154×1641).
**Images.** `page-19-img-01` (whole page).
**Website.** **Not published (R2).** The Bulgari project itself is public via page 11 (row 2) and page 13 photography.
**Key fact.** "Please approve the following as a sub-contractor in the above mentioned project: M/s. Precast Technology Solutions LLC."

### Page 20 — Commercial Licence (Government of Dubai / DED)
**Content.** Scanned Dubai Economy & Tourism commercial licence for `MOULDEX PRECAST CONTRACTING L.L.C`: Limited Liability Company (LLC) legal type, licence activities `Technical Services Works` (Active) and `Pre-Fabricated Concrete Houses Contracting` (Active). The sheet also carries licence and registration identifiers, issue/expiry dates, the manager's personal and nationality details, contact details, a registered office address and a QR verification code — **all redacted here and never used on the website**.
**Text extracted.** No text layer — single full-page scan (`page-20-img-01`, 833×1176). Identifiers, dates, addresses and personal details are deliberately not reproduced.
**Images.** `page-20-img-01` (whole page).
**Website.** **Not published (R3).** Only the licence *scope* is restated on the site, sourced from pages 3 and 7 ("industrial licence for prefabricated houses contracting and technical services"); no licence identifiers, dates, registered address or manager's personal details are published.
**Key fact.** Legal name `MOULDEX PRECAST CONTRACTING L.L.C`, `Limited Liability Company (LLC)`, activities `Technical Services Works` / `Pre-Fabricated Concrete Houses Contracting`.

### Page 21 — Employee register, part 1
**Content.** Staff table with columns `ID NO | EMPLOYE NAME | CATEGORY | PROJECT DETAILS | PROJECT CODE`; 32 rows (staff IDs redacted).
**Text extracted.** Personal names, staff IDs, role categories and internal project allocations (`SCHOOL SITE 105`, `FIBREX 104`, `INNOVA 109`, `FIBREX-FACTORY 103`, `DRIVER 100`).
**Images.** None.
**Website.** **Not published (R1).** Names, IDs and allocations are not reproduced in this inventory on purpose.
**Key fact.** None publishable.

### Page 22 — Employee register, part 2
**Content.** Continuation of the same table; 34 rows (staff IDs redacted).
**Text extracted.** Same columns; project allocations include `SCHOOL SITE 105`, `FIBREX 104`, `INNOVA 109`, `DUBAI PRECAST 106`, `ABC 107`, `BEACH GATE 102`, `MEP 108`.
**Images.** None.
**Website.** **Not published (R1).**
**Key fact.** None publishable.

### Page 23 — Employee register, part 3
**Content.** Continuation, including the MEP crew; 33 rows (staff IDs redacted).
**Text extracted.** Same columns; categories include Site Supervisore, Workers-MEP, Team Leader, Trailer Driver, Bus-Driver.
**Images.** None.
**Website.** **Not published (R1).**
**Key fact.** None publishable.

### Page 24 — Employee register, part 4 + role totals
**Content.** Last 10 staff rows (IDs redacted) followed by a role summary: Site Supervisore 1 · Site Manager 2 · Site Engineer 2 · Worker Precast 56 · Worker MEP 17 · TL 11 · Foreman 7 · Safety 3 · Surveyor 2 · Casting Yard Eng 1 · Store Keeper 1 · Trailer Driver 3 · Bus Drivers 3 · **TOTAL 109**.
**Text extracted.** The 10 rows above plus the role counts and the stated total of 109 (which matches the 109 staff rows across pages 21–24).
**Images.** None.
**Website.** **Not published (R1).** The workforce total of 109 and the role breakdown are deliberately omitted from the site.
**Key fact.** None publishable; the `TOTAL 109` figure is the only non-personal data point and is still withheld.

### Page 25 — Back cover
**Content.** Blue back cover: framed Mouldex lockup, closing statement, contact block.
**Text extracted.** "Mouldex Precast Contracting LLC is not just a precast solutions provider; it is a reliable partner for those seeking innovation, quality, and efficiency in the dynamic landscape of construction and development in the UAE." Contact block: "Mouldex Precast Contracting LLC / Dubai, United Arab Emirates | PO Box 393390 | Tel. 04 436 42 43 | Fax 04 447 03 17 / Email: (personal mailbox, redacted) | Mob. 055 437 33 68". The website publishes the client-specified address `info@mouldexprecast.com` instead.
**Images.** `page-25-img-01`, 236×174 back-cover logo panel — not used (the supplied transparent PNG is used instead).
**Website.** `site.json` → `contact` (phone, fax, mobile, email, PO Box, city/country/addressLine), used by the header top bar, footer, `/en/contact/` cards and the `Organization` JSON-LD; the closing statement was **not** published (the site's own brand description is editorial copy instead).
**Key fact.** "Dubai, United Arab Emirates | PO Box 393390 | Tel. 04 436 42 43 | Fax 04 447 03 17 | Mob. 055 437 33 68."

---

## Assets used on the website

The ten photographs are the only PDF imagery published. Sources are files in `source-materials/extracted/images/`; every variant is emitted as a same-name JPEG at the stated width (never upscaled) and served through `srcset` by `site/src/components/Picture.astro`.

| Website asset | Variants | Source image file | PDF page | Where it is used |
| --- | --- | --- | --- | --- |
| `/images/bulgari-ocean-villas-1152.jpg` | 1152, 800, 480 | `page-13-img-01-984a86619e12f338.jpeg` | 13 | Home hero; service 01 (precast claddings); project `/en/projects/bulgari-ocean-villas/`; project cards |
| `/images/lamborghini-villas-937.jpg` | 937, 800, 480 | `page-12-img-01-c2c26199a65b15b1.jpeg` | 12 | Service 03 (villas); project `/en/projects/lamborghini-villas/`; project cards |
| `/images/madinat-jumeirah-living-532.jpg` | 532, 480 | `page-12-img-02-a39c76a4961e31b2.jpeg` | 12 | Project `/en/projects/madinat-jumeirah-living-phase-4/`; project cards |
| `/images/al-kharafi-474.jpg` | 474 | `page-13-img-02-351a0989a4878a34.jpeg` | 13 | Project `/en/projects/al-kharafi/`; project cards |
| `/images/beachgate-address-474.jpg` | 474 | `page-14-img-01-f4a737465ccb73b1.jpeg` | 14 | Project `/en/projects/beachgate-by-address/`; project cards |
| `/images/palmiera-oasis-474.jpg` | 474 | `page-14-img-02-917405f5d42e4aba.jpeg` | 14 | Service 05 (boundary walls); project `/en/projects/palmiera-the-oasis/`; project cards |
| `/images/site-panels-01-474.jpg` | 474 | `page-07-img-01-b11b7a58b4eb525d.jpeg` | 7 | Home on-site strip (1/3); service 06 (joints sealant) |
| `/images/site-structure-02-403.jpg` | 403 | `page-07-img-02-8086edef9be0ab3f.jpeg` | 7 | Home on-site strip (2/3); service 02 (load-bearing) |
| `/images/site-installation-03-640.jpg` | 640 | `page-07-img-03-7c8e1e3493807cab.jpeg` | 7 | Home intro figure and on-site strip (3/3); About overview figure; service 04 (hollow core) |
| `/images/dubai-tower-{1081,800,480}.jpg` | 1081, 800, 480 | `page-01-img-01-b1b9e17717189d71.jpeg` | 1 | Generated but **not referenced** by any template (unused) |
| `/og-image.jpg` | 1200×630 (single) | Composite of `page-13-img-01` + the reversed lockup | 13 | Default Open Graph / Twitter card for every page (`BaseLayout.astro`) |

Logo and favicon assets are derived from the supplied PNG, not from the PDF: see below.

## Excluded source pages and why

| Page(s) | Content | Code | Reason | Reused on website |
| --- | --- | --- | --- | --- |
| 8–9 | Organisation chart with personal names and job titles | R1 | Internal employee records — publishes identifiable individuals' employment positions; the chart covers internal structure, not company capability | No. The only leadership fact published is "Samy Abdel Aziz, General Manager" from page 3 |
| 21–24 | Employee register: names, staff IDs (`MDX-…`), categories, project allocations, internal project codes, workforce totals (109) | R1 | Internal employee records — personal and operational data | No. Employee counts and role breakdown withheld |
| 15–19 | Signed pre-qualification submittals, transmittal sheets, approvals, stamps and signatures, with named engineers and commercial correspondence | R2 | Internal/confidential project correspondence — signatures, stamps, approval conditions and named individuals; not company marketing material | No. Only the public project names/rows from page 11 are used |
| 20 | Scanned Dubai commercial licence (licence no., registration no., DCCI no., manager's full legal name, registered address, issue/expiry dates) | R3 | Official registration document; protected identifiers and personal data, and the registered address has not been confirmed for publication | No. Only the licence *scope* is restated, sourced from pages 3 and 7 |
| 1, 2, 10 | Cover, contents, section divider | R4 | Structural pages with no publishable body copy; the PTS-branded divider also carries a different entity name | No. Cover photo generated but unused |

Rule applied: **internal employee records and signed documents are not published.** No page from R1–R4 contributes names, IDs, signatures, stamps, licence numbers or addresses to the website.

## Logo and favicon

The PDF's own logo bitmaps (cover, back cover, PTS divider) were **not** used. The site brand is built from the supplied file `source-materials/website icon no background.png` (1536×1024 RGBA) by `source-materials/build_web_assets.py`.

**Derivation steps.**

1. **Alpha normalisation.** The supplied PNG's alpha channel never reaches 255 (peak 254), so it was scaled by `255/peak`; solid artwork then renders at full opacity.
2. **Trimmed lockup.** Alpha-threshold trim (>24, 3 px margin) → master artwork **1447×980**. The published `mouldex-logo-full.png` is a 480 px-tall rendition of that master (**709×480**, ~162 KB instead of ~1 MB) because it renders at ~80 px in the header; the full-size master is kept locally as `mouldex-logo-master.png` (not published). Retina downscales are height-driven, never upscaled: 256 → 378×256, 160 → 236×160, 96 → 142×96, 72 → 106×72.
3. **Mark crop.** The house/building symbol is the top band of the lockup. The split is the first horizontal alpha gap between 30 % and 75 % of the lockup height; the band is trimmed again (>24, 2 px) → `mouldex-mark.png` **657×554**. This is the favicon source.
4. **Reversed lockup for dark backgrounds.** Navy strokes become white (`255`), the logo red is preserved, the concrete-grey "M"/"X" letters become light grey `(196,204,214)`, and near-white negative space is knocked out (alpha 0) → `mouldex-logo-reversed.png` **1447×980** plus height variants 256/160/96/72.
5. **Favicon set.** The client supplied a dedicated mark artwork (house/building symbol without the wordmark) to be used as the browser/tab and taskbar icon, so the favicon set is that image (`source-materials/mouldex-icon-source.png`) trimmed of its white border and centred on a white square tile (3 % padding at 48 px and below, 6 % at larger sizes). The white tile is required because the mark contains white window panes. Outputs: `favicon-512.png`, `favicon-192.png`, `apple-touch-icon.png` (180), `favicon-48.png`, `favicon-32.png`, `favicon-16.png`, and `favicon.ico` packing 16/32/48. `site.webmanifest` references the 192 and 512 icons; `BaseLayout.astro` links the ICO, 32, 16, apple-touch and manifest.
6. **Social card.** `og-image.jpg` **1200×630**: navy field, the page-13 Bulgari photograph (640 px panel, faded into the navy), a 10 px yellow rule and the reversed lockup at 190 px height.
7. **Palette used by the build.** Navy `#06182F` (`--navy`), brand blue `#004AAC` (`--blue`), signal yellow `#FFC93C` (`--yellow`), logo red `#E8000B` (`--red`). The build script records sampled references from the PDF (blue `#004AAC`, accent block `#FFDE58`, logo navy `#000838`, logo red `#E80010`); the design tokens in `global.css` are the values actually shipped.

**Files produced.**

| File | Pixels | Used by |
| --- | --- | --- |
| `brand/mouldex-logo-full.png` | 709×480 | Header brand (`Header.astro`, also `Organization` JSON-LD logo) |
| `brand/mouldex-logo-256.png`, `-160`, `-96`, `-72` | 378/236/142/106 wide | Retina set; not referenced directly by a template |
| `brand/mouldex-logo-reversed.png` | 1447×980 | Source for OG card and variants (not referenced by a template) |
| `brand/mouldex-logo-reversed-256.png`, `-160`, `-96`, `-72` | 378/236/142/106 wide | `-160` in footer, `-96` in mobile menu; others unused |
| `brand/mouldex-mark.png` | 657×554 | Derivation source only |
| `favicon-512.png`, `favicon-192.png`, `apple-touch-icon.png` | 512 / 192 / 180 | Browser tab, taskbar/pinned site, manifest, iOS home screen (logo on white tile) |
| `favicon-48.png`, `favicon-32.png`, `favicon-16.png`, `favicon.ico` | 48 / 32 / 16 | Browser tab and legacy ICO (16/32/48) |
| `og-image.jpg` | 1200×630 | Default OG/Twitter image on every page |

## Open questions / unverified

| # | Question | Evidence / status |
| --- | --- | --- |
| 1 | **No published street address.** | Page 25 and `site.json` carry only "Dubai, United Arab Emirates | PO Box 393390". Addresses appear only on excluded pages (a business-centre address on page 19 and a licensed office address on page 20, both redacted here). Which is current is unverified; neither is published. |
| 2 | **No company registration or licence number published.** | Numbers exist only on the scanned licence (page 20, R3): licence no., register no. and DCCI no. They have not been confirmed as publishable. |
| 3 | **No certifications.** | No ISO, quality, safety or trade certification appears anywhere in the 25 pages. The site therefore claims no certifications. |
| 4 | **No date of establishment / incorporation.** | None in the document. "Over 20 years" (pages 3 and 7) is the General Manager's precast experience, not company age; the site repeats it as "20+ years of GCC precast experience" without converting it into a founding date. |
| 5 | **No social media accounts.** | No LinkedIn/Instagram/X handles or website URLs anywhere in the document. |
| 6 | **Contact email is now the company domain address.** | The source (pages 20 and 25) lists a personal Outlook mailbox; the client has specified `info@mouldexprecast.com` for publication, so the personal mailbox is no longer used anywhere on the site. |
| 7 | **Entity naming is inconsistent in the source.** | "Mouldex Precast Contracting L.L.C" (cover, pages 3–7, 25) vs "Mouldex Technical Services LLC" (page 3, final sentence; page 17 installation role) vs "Precast Technology Solutions L.L.C - FZ" (pages 10–11 project list; pages 15–19 as the proposed sub-contractor). The relationship between the entities is never explained. The website attributes the 17-project list to Mouldex (labelled "the company profile"); confirm the correct contracting entity before launch. |
| 8 | **Project photography is developer marketing imagery, not site photography.** | Pages 12–14 images are project renders carrying developer branding (Emaar, Dubai Hills Vista/Lamborghini, Beachgate, Palmiera, Bulgari). They are presented on the site as project imagery with "as published" alt text; whether they may be reused as Mouldex references is a client/permission question. |
| 9 | **Project statuses may be stale.** | Pages 11–14 are undated; "Completed / On-going / Awarded" reflects the document's date. No as-of date can be verified. |
| 10 | **Beginner/stock photography provenance.** | Pages 3, 5 and 6 use stock imagery with no attribution or licence note in the PDF. They are deliberately unused on the site. |
| 11 | **COVER/ORGANISATION CHART vs TOC.** | The contents page (page 2) lists "05. Management Team" but no such section exists; pages 8–9 are an internal org chart, not a management profile. The site publishes only the GM fact from page 3. |
| 12 | **Unexplained hidden images on page 11.** | Six small black stencil bitmaps (`page-11-img-02`–`07`) exist in the PDF object tree but do not render (likely hidden client-logo masks). They have no documented meaning and are unused. |
| 13 | **Arabic copy needs native review.** | English is the source of truth; the Arabic in `site/src/data` is a full translation produced for this project. No bilingual/legal review by the company is evidenced in the workspace. |
| 14 | **Website is a rebuild, not an official publication.** | The only company-controlled sources are the supplied PDF and logo PNG; any claim not traceable to a PDF page has been treated as editorial and flagged in `docs/content-map.md`. |

