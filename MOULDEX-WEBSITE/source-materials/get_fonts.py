import re, urllib.request, os
UA = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"}
os.makedirs("site/public/fonts", exist_ok=True)
def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=40).read()

archivo = fetch("https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap").decode()
plex = fetch("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap").decode()

def blocks(css):
    # split into comment + @font-face chunks
    out=[]
    for m in re.finditer(r"/\*\s*([^*]+?)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S):
        subset, body = m.group(1).strip(), m.group(2)
        props = dict(re.findall(r"([\w-]+):\s*([^;]+);", body))
        out.append((subset, props))
    return out

results = []
keep = {}
for css, family in ((archivo,"Archivo"), (plex,"IBM Plex Sans Arabic")):
    for subset, props in blocks(css):
        if family=="Archivo" and subset not in ("latin","latin-ext"): continue
        if family=="IBM Plex Sans Arabic" and subset not in ("arabic","latin"): continue
        url = re.search(r"url\((https://[^)]+)\)", props["src"]).group(1)
        weight = props["font-weight"].replace(" ","")
        css_subset = subset.replace(" ","-")
        fname = f"{family.lower().replace(' ','-')}-{css_subset}-{weight}.woff2"
        data = fetch(url)
        with open(os.path.join("site/public/fonts", fname),"wb") as f: f.write(data)
        keep[fname] = {"family": family, "subset": subset, "weight": props["font-weight"],
                       "style": props.get("font-style","normal"),
                       "unicode-range": props.get("unicode-range"), "bytes": len(data)}
        print(fname, len(data))
import json
json.dump(keep, open("site/public/fonts/fonts.json","w"), indent=1)
# local css
lines=["/* Self-hosted font files. Generated from Google Fonts CSS; no runtime third-party requests. */"]
for fname, meta in keep.items():
    lines.append("@font-face {")
    lines.append(f"  font-family: '{meta['family']}';")
    lines.append(f"  font-style: {meta['style']};")
    lines.append(f"  font-weight: {meta['weight']};")
    lines.append("  font-display: swap;")
    lines.append(f"  src: url('/fonts/{fname}') format('woff2');")
    if meta["unicode-range"]:
        lines.append(f"  unicode-range: {meta['unicode-range']};")
    lines.append("}")
open("site/src/styles/fonts.css","w",encoding="utf-8").write("\n".join(lines)+"\n")
print("css written")
