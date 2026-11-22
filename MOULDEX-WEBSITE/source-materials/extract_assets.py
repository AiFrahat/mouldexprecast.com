"""Extract rendered page previews and embedded raster images from the Mouldex PDF.

Outputs (all under source-materials/extracted/):
  pages/page-XX.png        rendered page previews (150 dpi) for visual reference
  images/page-XX-img-NN.ext  embedded images, with page-level provenance
  images/index.json        manifest: page, xref, bytes, width, height, sha256
"""
import hashlib
import json
import os

import pymupdf

PDF = "Mouldex Precast Contracting LLC ( Pre-Qualification Documents. ).pdf"
OUT = "source-materials/extracted"
IMG_DIR = os.path.join(OUT, "images")
PAGE_DIR = os.path.join(OUT, "pages")
os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(PAGE_DIR, exist_ok=True)

doc = pymupdf.open(PDF)
manifest = []

for page_index, page in enumerate(doc, start=1):
    # 1) rendered page preview
    pix = page.get_pixmap(dpi=120)
    pix.save(os.path.join(PAGE_DIR, f"page-{page_index:02d}.png"))

    # 2) embedded images
    seen_on_page = 0
    for info in page.get_images(full=True):
        xref = info[0]
        try:
            data = doc.extract_image(xref)
        except Exception as exc:  # pragma: no cover - defensive
            manifest.append({"page": page_index, "xref": xref, "error": str(exc)})
            continue
        w, h = data.get("width"), data.get("height")
        ext = data.get("ext", "bin")
        raw = data["image"]
        digest = hashlib.sha256(raw).hexdigest()[:16]
        seen_on_page += 1
        name = f"page-{page_index:02d}-img-{seen_on_page:02d}-{digest}.{ext}"
        path = os.path.join(IMG_DIR, name)
        if os.path.exists(path):
            name = f"page-{page_index:02d}-img-{seen_on_page:02d}-dup-{digest}.{ext}"
            path = os.path.join(IMG_DIR, name)
        with open(path, "wb") as fh:
            fh.write(raw)
        manifest.append(
            {
                "page": page_index,
                "xref": xref,
                "file": name,
                "bytes": len(raw),
                "width": w,
                "height": h,
                "ext": ext,
                "colorspace": data.get("colorspace"),
                "digest": digest,
            }
        )

with open(os.path.join(IMG_DIR, "index.json"), "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, indent=1, ensure_ascii=False)

print(f"pages rendered: {doc.page_count}")
print(f"images extracted: {len(manifest)}")
for item in manifest:
    print(item.get("page"), item.get("file"), item.get("width"), "x", item.get("height"), item.get("bytes"))
