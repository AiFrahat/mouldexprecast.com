"""Build every web-ready brand/site asset from the supplied source materials.

Inputs (read-only):
  source-materials/website icon no background.png      official logo
  source-materials/extracted/images/*.jpeg             images embedded in the company PDF

Outputs:
  site/public/brand/*        logo lockups + mark
  site/public/favicon*       favicon set built from mouldex-icon-source.png on a white tile
  site/public/images/*       optimised photographs (page-referenced in docs/)
  site/public/og-image.jpg   1200x630 social card

Nothing is fetched from the internet: every pixel comes from the supplied files.
"""
from __future__ import annotations

import json
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-materials")
EXTRACTED = os.path.join(SRC, "extracted")
PUBLIC = os.path.join(ROOT, "site", "public")
BRAND = os.path.join(PUBLIC, "brand")
IMAGES = os.path.join(PUBLIC, "images")

for path in (BRAND, IMAGES, PUBLIC):
    os.makedirs(path, exist_ok=True)

# Brand palette (sampled from the company profile: page 3 solid = #004AAC,
# page 7 accent block = #FFDE58; logo navy = #000838, logo red = #E80010).
NAVY = (6, 24, 47)
BLUE = (0, 74, 172)
YELLOW = (255, 201, 60)

logo_path = os.path.join(SRC, "website icon no background.png")
logo = Image.open(logo_path).convert("RGBA")

# ---------------------------------------------------------------- alpha cleanup
# The supplied PNG never reaches alpha 255 (max 254); normalise so the logo is
# rendered at full opacity where it is solid.
arr = np.array(logo)
alpha = arr[:, :, 3].astype(np.float32)
peak = float(alpha.max()) or 1.0
arr[:, :, 3] = np.clip(alpha * (255.0 / peak), 0, 255).astype(np.uint8)
logo = Image.fromarray(arr, "RGBA")
def trim(image: Image.Image, threshold: int = 24, margin: int = 3) -> Image.Image:
    mask = np.array(image.getchannel("A")) > threshold
    ys, xs = np.where(mask)
    box = (
        max(0, int(xs.min()) - margin),
        max(0, int(ys.min()) - margin),
        min(image.size[0], int(xs.max()) + 1 + margin),
        min(image.size[1], int(ys.max()) + 1 + margin),
    )
    return image.crop(box)


logo = trim(logo)
W, H = logo.size
print(f"logo trimmed to {W}x{H}")
# The published lockup is used at ~80 px height in the header and as the
# schema.org logo, so ship a 480 px-tall rendition instead of the full-size
# 1447x980 master (1 MB): same artwork, ~5x smaller, reliably fast to load.
header_h = 480
header_w = round(W * header_h / H)
logo.resize((header_w, header_h), Image.LANCZOS).save(
    os.path.join(BRAND, "mouldex-logo-full.png"), optimize=True
)
logo.save(os.path.join(SRC, "mouldex-logo-master.png"), optimize=True)

# Retina-width downscales of the lockup (never upscale below 1x).
for target_h in (256, 160, 96, 72):
    ratio = target_h / H
    if ratio < 1:
        w = max(1, round(W * ratio))
        logo.resize((w, target_h), Image.LANCZOS).save(
            os.path.join(BRAND, f"mouldex-logo-{target_h}.png"), optimize=True
        )

# The mark (house/building symbol) is the top band of the lockup; the wordmark
# starts after the first horizontal gap in the alpha profile.
a = np.array(logo.getchannel("A"))
rows = (a > 8).sum(axis=1)
gaps = [y for y in range(int(H * 0.3), int(H * 0.75)) if rows[y] <= 3]
split = gaps[0] if gaps else int(round(H * 0.56))
mark = logo.crop((0, 0, W, split))
mark = trim(mark, threshold=24, margin=2)
mark.save(os.path.join(BRAND, "mouldex-mark.png"), optimize=True)
print(f"mark split at y={split}; trimmed to {mark.size[0]}x{mark.size[1]}")

# ------------------------------------------------------------- reversed lockup
# For dark backgrounds: navy strokes become white, the white negative space is
# knocked out, brand red and the concrete-grey "M"/"X" survive.
def reverse_lockup(image: Image.Image) -> Image.Image:
    a = np.array(image).astype(np.int16)
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mn = np.minimum(np.minimum(r, g), b)
    is_red = (r > g + 60) & (r > b + 60)
    # near-white negative space (the page background inside the artwork)
    is_light = (mn > 224) & ~is_red
    # the wordmark's concrete-grey M/X: neutral, clearly not the bluish strokes
    is_grey = (~is_red) & (~is_light) & (np.abs(b - g) < 22) & (np.abs(r - g) < 26) & (mn > 60)
    out = a.copy()
    out[..., 3] = np.where(is_light, 0, al)
    for channel, value in enumerate((196, 204, 214)):
        out[..., channel] = np.where(is_grey, value, out[..., channel])
    for channel in range(3):
        out[..., channel] = np.where((~is_red) & (~is_grey) & (~is_light), 255, out[..., channel])
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGBA")


rev = reverse_lockup(logo)
rev.save(os.path.join(BRAND, "mouldex-logo-reversed.png"), optimize=True)
for target_h in (256, 160, 96, 72):
    ratio = target_h / rev.size[1]
    rev.resize((max(1, round(rev.size[0] * ratio)), target_h), Image.LANCZOS).save(
        os.path.join(BRAND, f"mouldex-logo-reversed-{target_h}.png"), optimize=True
    )

# ---------------------------------------------------------------------- favicon
# The client supplied this mark artwork (house/building symbol without the
# wordmark) to be used as the browser/tab and taskbar icon. It reads far better
# at 16-32 px than the full lockup, so the favicon set is this artwork, trimmed
# of its white border and centred on a white square tile (the white window
# panes must stay white, hence an opaque background rather than transparency).
# No page markup changes: the existing /favicon.ico, /favicon-*.png,
# /apple-touch-icon.png and web-manifest icon URLs are reused.
FAVICON_SOURCE = os.path.join(SRC, "mouldex-icon-source.png")


def _trim_light_border(image: Image.Image, threshold: int = 245) -> Image.Image:
    a = np.array(image.convert("RGB"))
    mask = a.min(axis=2) < threshold
    ys, xs = np.where(mask)
    margin = 2
    left = max(0, int(xs.min()) - margin)
    top = max(0, int(ys.min()) - margin)
    right = min(image.size[0], int(xs.max()) + 1 + margin)
    bottom = min(image.size[1], int(ys.max()) + 1 + margin)
    return image.crop((left, top, right, bottom))


def logo_tile(inner: Image.Image, size: int, pad_ratio: float) -> Image.Image:
    pad = int(round(size * pad_ratio))
    box = size - pad * 2
    ratio = min(box / inner.size[0], box / inner.size[1])
    glyph = inner.convert("RGBA").resize(
        (max(1, round(inner.size[0] * ratio)), max(1, round(inner.size[1] * ratio))),
        Image.LANCZOS,
    )
    tile = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    tile.alpha_composite(glyph, ((size - glyph.size[0]) // 2, (size - glyph.size[1]) // 2))
    return tile


with Image.open(FAVICON_SOURCE) as favicon_art:
    favicon_art = _trim_light_border(favicon_art.convert("RGB"))

icon_sizes = [512, 192, 180, 48, 32, 16]
icons = {}
for size in icon_sizes:
    tile = logo_tile(favicon_art, size, 0.03 if size <= 48 else 0.06)
    icons[size] = tile
    name = "apple-touch-icon.png" if size == 180 else f"favicon-{size}.png"
    tile.save(os.path.join(PUBLIC, name), optimize=True)

icons[48].save(
    os.path.join(PUBLIC, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)

# ------------------------------------------------------------------ photographs
# page ref -> (output name, target widths (never above the source width))
PHOTOS = {
    "page-13-img-01-984a86619e12f338.jpeg": ("bulgari-ocean-villas", [1152, 800, 480]),
    "page-12-img-01-c2c26199a65b15b1.jpeg": ("lamborghini-villas", [937, 800, 480]),
    "page-12-img-02-a39c76a4961e31b2.jpeg": ("madinat-jumeirah-living", [532, 480]),
    "page-13-img-02-351a0989a4878a34.jpeg": ("al-kharafi", [474]),
    "page-14-img-01-f4a737465ccb73b1.jpeg": ("beachgate-address", [474]),
    "page-14-img-02-917405f5d42e4aba.jpeg": ("palmiera-oasis", [474]),
    "page-07-img-01-b11b7a58b4eb525d.jpeg": ("site-panels-01", [474]),
    "page-07-img-02-8086edef9be0ab3f.jpeg": ("site-structure-02", [403]),
    "page-07-img-03-7c8e1e3493807cab.jpeg": ("site-installation-03", [640]),
    "page-01-img-01-b1b9e17717189d71.jpeg": ("dubai-tower", [1081, 800, 480]),
}

manifest = []
for source_name, (out_name, widths) in PHOTOS.items():
    src_path = os.path.join(EXTRACTED, "images", source_name)
    if not os.path.exists(src_path):
        raise SystemExit(f"missing source image: {src_path}")
    im = Image.open(src_path).convert("RGB")
    entries = []
    for w in widths:
        if w > im.size[0]:
            continue
        h = round(im.size[1] * w / im.size[0])
        out = im.resize((w, h), Image.LANCZOS)
        filename = f"{out_name}-{w}.jpg"
        out.save(
            os.path.join(IMAGES, filename),
            optimize=True,
            quality=84,
            progressive=True,
            subsampling="4:2:0",
        )
        entries.append(
            {"file": f"/images/{filename}", "width": w, "height": h,
             "bytes": os.path.getsize(os.path.join(IMAGES, filename))}
        )
    manifest.append(
        {"name": out_name, "source": source_name, "sourceSize": list(im.size),
         "variants": entries}
    )
    print(f"{out_name}: {im.size} -> {[e['width'] for e in entries]}")

with open(os.path.join(EXTRACTED, "web-images.json"), "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, indent=1)

# ---------------------------------------------------------------------- og card
hero = Image.open(os.path.join(EXTRACTED, "images", "page-13-img-01-984a86619e12f338.jpeg")).convert("RGB")
og = Image.new("RGB", (1200, 630), NAVY)
panel_w = 640
scale = max(panel_w / hero.size[0], 630 / hero.size[1])
crop = hero.resize((round(hero.size[0] * scale), round(hero.size[1] * scale)), Image.LANCZOS)
crop = crop.crop(((crop.size[0] - panel_w) // 2, (crop.size[1] - 630) // 2,
                  (crop.size[0] - panel_w) // 2 + panel_w, 630))
og.paste(crop, (1200 - panel_w, 0))
# fade the photograph into the navy field instead of washing it out
wash = Image.new("RGBA", (1200, 630), NAVY + (0,))
wd = ImageDraw.Draw(wash)
start = 1200 - panel_w
for x in range(start, start + 320):
    t = (x - start) / 320
    wd.line([(x, 0), (x, 630)], fill=NAVY + (int(255 * (1 - t) ** 1.4),))
og = Image.alpha_composite(og.convert("RGBA"), wash).convert("RGB")
# yellow rule
d = ImageDraw.Draw(og)
d.rectangle([0, 0, 10, 630], fill=YELLOW)
# reversed lockup
rev_og = rev.copy()
og_h = 190
rev_og = rev_og.resize((round(rev_og.size[0] * og_h / rev_og.size[1]), og_h), Image.LANCZOS)
og.paste(rev_og, (92, 630 - 88 - og_h), rev_og)
og.save(os.path.join(PUBLIC, "og-image.jpg"), quality=90, optimize=True, progressive=True)
print("og image written")

print("done")



