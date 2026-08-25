#!/usr/bin/env python3
"""NUIT-ENCRE — penyiap gambar studi.

Memotong tengah ke rasio 3:4, mengubah ukuran ke 1200×1600,
memaksa hitam-putih, lalu menulis assets/img/st-0N.jpg dan st-0N.webp.
Memberi peringatan kalau gambar terlalu gelap (kartu tidak aktif
dipakai brightness .6) atau menabrak zona lencana .gs__i di kiri atas.

Pemakaian:
    python3 tools/add-study.py <gambar> <slot>

<slot> boleh '7', '07', '007', atau 'st-07'.
Butuh Pillow: python3 -m pip install --break-system-packages pillow
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Butuh Pillow: python3 -m pip install --break-system-packages pillow")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img"

W, H = 1200, 1600            # kanvas studi (3:4, object-fit:cover di CSS)
BADGE = (115, 75)            # zona lencana .gs__i di kiri atas
DARK_MEAN = 12               # ambang rata-rata terang
DARK_BRIGHT = 2.0            # ambang % piksel terang
BADGE_BRIGHT = 1.0           # ambang % piksel terang di zona lencana


def norm_slot(s):
    d = "".join(ch for ch in s.lower() if ch.isdigit())
    if not d:
        sys.exit(f"Slot tidak dikenali: {s!r} — contoh: 07 atau st-07")
    return f"{int(d):02d}"


def pct_terang(hist):
    tot = sum(hist)
    return sum(hist[129:]) / tot * 100 if tot else 0.0


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    if not src.exists():
        sys.exit(f"Berkas tidak ditemukan: {src}")
    slot = norm_slot(sys.argv[2])

    im = Image.open(src).convert("L").convert("RGB")  # paksa hitam-putih
    w, h = im.size
    r = w / h
    if r > 0.75:  # terlalu lebar → potong kiri-kanan
        nw = round(h * 0.75)
        kiri = (w - nw) // 2
        im = im.crop((kiri, 0, kiri + nw, h))
        buang = (1 - nw / w) * 100
    elif r < 0.75:  # terlalu tinggi → potong atas-bawah
        nh = round(w / 0.75)
        atas = (h - nh) // 2
        im = im.crop((0, atas, w, atas + nh))
        buang = (1 - nh / h) * 100
    else:
        buang = 0.0
    im = im.resize((W, H), Image.LANCZOS)

    if buang > 10:
        print(f"PERINGATAN: {buang:.0f}% gambar terbuang karena potong tengah "
              f"(rasio sumber {r:.2f}). Ekspor Canva idealnya 3:4 (1200×1600).")

    g = im.convert("L")
    rata = sum(i * c for i, c in enumerate(g.histogram())) / (W * H)
    terang = pct_terang(g.histogram())
    zona = pct_terang(g.crop((0, 0, *BADGE)).histogram())

    jpg = OUT / f"st-{slot}.jpg"
    webp = OUT / f"st-{slot}.webp"
    im.save(jpg, quality=88, progressive=True, optimize=True)
    im.save(webp, quality=82, method=6)

    print(f"st-{slot}: {src.name} → {jpg.name} ({jpg.stat().st_size // 1024} KB) "
          f"+ {webp.name} ({webp.stat().st_size // 1024} KB)")
    print(f"  rata-rata terang {rata:.1f} · massa terang {terang:.1f}% · "
          f"zona lencana {zona:.1f}%")
    if rata < DARK_MEAN or terang < DARK_BRIGHT:
        print("  PERINGATAN: sangat gelap — kartu tidak aktif (brightness .6) "
              "akan nyaris hitam pekat. Pastikan ada elemen terang.")
    if zona > BADGE_BRIGHT:
        print("  PERINGATAN: kiri atas menabrak zona lencana .gs__i — "
              "biarkan 115×75 px kiri atas bersih gelap.")


if __name__ == "__main__":
    main()
