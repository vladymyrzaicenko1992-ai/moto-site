#!/usr/bin/env python3
"""Сжать все PNG/JPG в images/ в WebP: max 800px ширина, quality 80."""
import os
from pathlib import Path
from PIL import Image

MAX_WIDTH = 800
QUALITY = 80

def compress_image(src_path: Path) -> Path | None:
    dst = src_path.with_suffix(".webp")
    try:
        img = Image.open(src_path).convert("RGB")
        w, h = img.size
        if w > MAX_WIDTH:
            ratio = MAX_WIDTH / w
            img = img.resize((MAX_WIDTH, int(h * ratio)), Image.LANCZOS)
        img.save(dst, "webp", quality=QUALITY)
        src_sz = os.path.getsize(src_path)
        dst_sz = os.path.getsize(dst)
        saved = 100 * (1 - dst_sz / src_sz) if src_sz else 0
        print(f"  {src_path.name}: {src_sz//1024}KB -> {dst_sz//1024}KB ({saved:.0f}%)")
        return dst
    except Exception as e:
        print(f"  {src_path.name}: ERROR {e}")
        return None

def update_refs(root: Path):
    import re
    for ext in (".html", ".js"):
        for f in root.rglob(f"*{ext}"):
            txt = f.read_text()
            new = re.sub(r'(images/[^"]+)\.(png|jpg|jpeg)', r'\1.webp', txt)
            if new != txt:
                f.write_text(new)
                print(f"  updated: {f.name}")

def main():
    base = Path(__file__).parent.parent
    os.chdir(base)
    img_dir = Path("images")
    total_before = 0
    total_after = 0

    print("Сжатие...")
    for src in sorted(img_dir.rglob("*.png")) + sorted(img_dir.rglob("*.jpg")) + sorted(img_dir.rglob("*.jpeg")):
        total_before += os.path.getsize(src)
        dst = compress_image(src)
        if dst:
            total_after += os.path.getsize(dst)

    print(f"\nДо: {total_before//1024//1024} MB, После: {total_after//1024//1024} MB ({(1-total_after/total_before)*100:.0f}% меньше)")

    print("\nОбновление ссылок в HTML/JS...")
    update_refs(Path("."))
    print("Готово!")

if __name__ == "__main__":
    main()
