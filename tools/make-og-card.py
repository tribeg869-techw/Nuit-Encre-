"""Kartu berbagi Nuit-Encre — 1200x630.

Latar: foto tinta putih membaur di air hitam (aset, lihat README).
Wordmark: Apfel Grotezk Fett asli dari assets/fonts, jadi hurufnya
identik dengan yang di situs — bukan tiruan font sistem.

Huruf disingkap oleh tinta: makin tebal tinta di suatu titik, makin
banyak huruf yang termakan di situ. Prinsipnya sama dengan efek hero.
"""
import math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

SRC = 'assets/img/src-ink.jpg'          # foto tinta sumber
OUT = 'assets/img/og-cover.jpg'
W, H = 1200, 630

# Apfel woff2 -> ttf agar bisa dipakai Pillow
TTF = '/tmp/ApfelFett.ttf'
if not os.path.exists(TTF):
    from fontTools.ttLib import TTFont
    _f = TTFont('assets/fonts/ApfelGrotezk-Fett.woff2'); _f.flavor = None; _f.save(TTF)

# ---------- 1. latar ----------
src = Image.open(SRC).convert('L')
# potong ke 1.905 lalu skala; tinta tetap di kanan
sw, sh = src.size
tgt = W/H
if sw/sh > tgt:
    nw = int(sh*tgt); src = src.crop(((sw-nw)//2, 0, (sw-nw)//2+nw, sh))
else:
    nh = int(sw/tgt); src = src.crop((0, (sh-nh)//2, sw, (sh-nh)//2+nh))
ink = np.asarray(src.resize((W, H), Image.LANCZOS), dtype=np.float32)/255.0

# angkat kontras: hitam benar-benar hitam, tinta tetap lembut
ink = np.clip((ink-0.045)/(1-0.045), 0, 1) ** 1.12

# ---------- 2. wordmark ----------
def fit(t, target):
    lo, hi = 10, 400
    while lo < hi:
        m = (lo+hi+1)//2
        f = ImageFont.truetype(TTF, m); b = f.getbbox(t)
        if b[2]-b[0] <= target: lo = m
        else: hi = m-1
    return lo

PAD = int(W*.058)
fs = min(fit("NUIT", int(W*.40)), fit("ENCRE", int(W*.40)))
f  = ImageFont.truetype(TTF, fs)
wm = Image.new('L', (W, H), 0); d = ImageDraw.Draw(wm)
lh = int(fs*.82)
b1, b2 = f.getbbox("NUIT"), f.getbbox("ENCRE")
y0 = int(H*.30)
d.text((PAD-b1[0], y0-b1[1]),    "NUIT",  font=f, fill=255)
d.text((PAD-b2[0], y0+lh-b2[1]), "ENCRE", font=f, fill=255)
wm_a = np.asarray(wm, dtype=np.float32)/255.0

# ---------- 3. singkap ----------
# gradien vertikal (bawah pekat -> atas luruh), digerus oleh tinta
ys = np.linspace(0, 1, H, dtype=np.float32)[:, None]
top, bot = y0/H, (y0+lh+fs*.78)/H
t = np.clip((ys-top)/(bot-top), 0, 1)
vert = np.clip(t*1.02+.46, 0, 1)
keep = np.clip(vert - ink*0.62*(1.0-vert*0.5), 0, 1) ** 0.70
wm_f = wm_a * keep

# ---------- 4. susun ----------
pure = np.array([250, 250, 250], dtype=np.float32)/255.0
out  = np.zeros((H, W, 3), dtype=np.float32) + np.array([5,5,5],dtype=np.float32)/255.0
out += np.dstack([ink]*3) * pure
a3   = np.dstack([wm_f]*3)
out  = out*(1-a3) + a3*pure
img  = Image.fromarray((np.clip(out,0,1)*255).astype(np.uint8), 'RGB')

# ---------- 5. caption ----------
dd = ImageDraw.Draw(img)
mono = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 14)
def track(xy, s, fill, sp=2.6):
    x, y = xy
    for ch in s:
        dd.text((x, y), ch, font=mono, fill=fill); x += dd.textlength(ch, font=mono)+sp
track((PAD, int(H*.085)),      "001 / SELF-INITIATED / 2026", (104,104,104))
track((PAD, H-int(H*.115)),    "VISUAL / CONCEPT DESIGNER",   (170,170,170))

img.save(OUT, quality=88, optimize=True)
print("tersimpan", OUT, os.path.getsize(OUT), "B | huruf", fs)
