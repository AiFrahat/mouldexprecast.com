import pymupdf, json, os
pdf = pymupdf.open("Mouldex Precast Contracting LLC ( Pre-Qualification Documents. ).pdf")
print("pages:", pdf.page_count, "meta:", json.dumps(pdf.metadata)[:400])
out = {}
for i, page in enumerate(pdf):
    t = page.get_text("text")
    out[i+1] = t
    with open(f"source-materials/extracted/text/page-{i+1:02d}.txt", "w", encoding="utf-8") as f:
        f.write(t)
    imgs = page.get_images(full=True)
    print(f"page {i+1}: chars={len(t)} images={len(imgs)} size={page.rect}")
with open("source-materials/extracted/text/pages.json","w",encoding="utf-8") as f:
    json.dump(out,f,ensure_ascii=False,indent=1)
