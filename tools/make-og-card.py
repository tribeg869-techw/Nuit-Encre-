"""Kartu berbagi Nuit-Encre — bahasa visual identik dengan hero situs."""
import math, os, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

# Jalankan dari akar repo. Font situs (woff2) diubah ke ttf lebih dulu
# supaya huruf di kartu identik dengan huruf di situs.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
TTF = '/tmp/ApfelFett.ttf'
if not os.path.exists(TTF):
    from fontTools.ttLib import TTFont
    _f = TTFont('assets/fonts/ApfelGrotezk-Fett.woff2')
    _f.flavor = None
    _f.save(TTF)

W, H = 1200, 630
SS = 2
CW, CH = W*SS, H*SS
rnd = random.Random(20260825)

# ---------- 1. tinta bercabang, port dari grow() ----------
blobs = []
def grow(px, py, dr, nodes, step, thick, gen):
    for i in range(nodes):
        u = i/nodes
        dr += (rnd.random()-.5)*(1.25 if gen else .85)
        px += math.cos(dr)*step
        py += math.sin(dr)*step*.72
        taper = math.sin(math.pi*min(1, u*1.15+.12))
        blobs.append((px, py, thick*(.4+taper*.6)*(.7+rnd.random()*.5)))
        if gen < 1 and rnd.random() < .17:
            grow(px, py, dr+(1 if rnd.random()<.5 else -1)*(.5+rnd.random()*.7),
                 max(3, int(nodes*.45)), step*.7, thick*.42, gen+1)
        if rnd.random() < .18:
            blobs.append((px+(rnd.random()-.5)*.1, py+(rnd.random()-.5)*.07,
                          thick*.34*(.5+rnd.random()*.5)))

# Kartu ini lanskap dan tinta di sini berperan sebagai AKSEN, bukan
# penutup layar seperti di hero. Maka serat dibuat jauh lebih ramping
# (thick .022-.05 vs .10-.18) dan jumlahnya diperbanyak, supaya
# terbaca sebagai serat mengalir alih-alih satu massa gemuk.
S = min(CW, CH)
for k in range(9):
    ang = (k/9)*math.pi*2 + rnd.random()*.7
    # sebar melingkar, bukan acak murni: mencegah beberapa strand
    # berangkat dari titik berdekatan lalu menggumpal jadi satu massa
    rx, ry = CW*.185, CH*.30
    cx_, cy_ = CW*.755, CH*.50
    ox = cx_ + math.cos(ang)*rx*(.55+rnd.random()*.7)
    oy = cy_ + math.sin(ang)*ry*(.55+rnd.random()*.7)
    # Kunci agar terbaca sebagai SERAT, bukan manik: jari-jari harus
    # lebih besar dari langkah (rasio r/step >= 1.8), persis seperti
    # di hero. Serat tetap ramping, tapi langkahnya dirapatkan dan
    # simpulnya diperbanyak agar jejaknya panjang mengalir.
    grow(ox, oy, ang, rnd.randint(70,120),
         S*(.006+rnd.random()*.005), S*(.020+rnd.random()*.022), 0)
print("simpul:", len(blobs))

# ---------- 2. penumpukan ADITIF dgn gradien radial (spt canvas 'lighter')
# Inilah yang membuat tinta terbaca sebagai serat, bukan gumpalan:
# tiap simpul lembut di tepinya dan saling MENJUMLAH, tidak saling menimpa.
acc = np.zeros((CH, CW), dtype=np.float32)
yy, xx = np.mgrid[0:CH, 0:CW].astype(np.float32)
for bx, by, r in blobs:
    if r <= 1: continue
    x0, x1 = max(0,int(bx-r)), min(CW,int(bx+r)+1)
    y0_, y1 = max(0,int(by-r)), min(CH,int(by+r)+1)
    if x0>=x1 or y0_>=y1: continue
    sy, sx_ = yy[y0_:y1, x0:x1], xx[y0_:y1, x0:x1]
    dist = np.sqrt((sx_-bx)**2 + (sy-by)**2)/r
    m = dist < 1.0
    # dua colour-stop: .58 di pusat, .22 di 45%, 0 di tepi
    v = np.where(dist < .45,
                 .58 + (.22-.58)*(dist/.45),
                 .22*(1-(dist-.45)/.55))
    acc[y0_:y1, x0:x1] += np.where(m, np.clip(v,0,None), 0)
ink_a = np.clip(acc, 0, 1)
ink_a = np.asarray(Image.fromarray((ink_a*255).astype(np.uint8))
                   .filter(ImageFilter.GaussianBlur(CW*0.0007)), dtype=np.float32)/255.0
print("cakupan tinta >0.5:", round(float((ink_a>.5).mean())*100,1), "%")

# ---------- 3. wordmark Apfel asli ----------
def fit(text, target_w):
    lo, hi = 10, 600
    while lo < hi:
        mid = (lo+hi+1)//2
        f = ImageFont.truetype('/tmp/ApfelFett.ttf', mid)
        b = f.getbbox(text)
        if b[2]-b[0] <= target_w: lo = mid
        else: hi = mid-1
    return lo

PAD = int(CW*.055)
box_w = int(CW*.46)
fs = min(fit("NUIT", box_w), fit("ENCRE", box_w))
f = ImageFont.truetype('/tmp/ApfelFett.ttf', fs)

wm = Image.new('L', (CW, CH), 0)
dw = ImageDraw.Draw(wm)
line_h = int(fs*.82)
b1, b2 = f.getbbox("NUIT"), f.getbbox("ENCRE")
y0 = int(CH*.32)
dw.text((PAD-b1[0], y0-b1[1]), "NUIT",  font=f, fill=255)
dw.text((PAD-b2[0], y0+line_h-b2[1]), "ENCRE", font=f, fill=255)
wm_a = np.asarray(wm, dtype=np.float32)/255.0
print("ukuran huruf:", fs)

# ---------- 4. singkap: gradien vertikal spt CSS, digerus tinta ----------
ys = np.linspace(0, 1, CH, dtype=np.float32)[:, None]
top_wm, bot_wm = y0/CH, (y0+line_h+fs*.78)/CH
t = np.clip((ys-top_wm)/(bot_wm-top_wm), 0, 1)
vert = np.clip(t*1.05+.42, 0, 1)   # dasar .42 agar puncak huruf tetap terbaca
keep = np.clip(vert - ink_a*0.42*(1.0-vert*0.55), 0, 1) ** 0.68
wm_final = wm_a * keep

# ---------- 5. susun ----------
out = np.zeros((CH, CW, 3), dtype=np.float32)
out[:] = np.array([5,5,5], dtype=np.float32)/255.0
pure = np.array([250,250,250], dtype=np.float32)/255.0
out += np.dstack([ink_a]*3)*pure
a3 = np.dstack([wm_final]*3)
out = out*(1-a3) + a3*pure
img = Image.fromarray((np.clip(out,0,1)*255).astype(np.uint8), 'RGB').resize((W,H), Image.LANCZOS)

# ---------- 6. caption ----------
dd = ImageDraw.Draw(img)
mono = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 14)
def track(xy, s, fill, sp=2.6):
    x, y = xy
    for ch in s:
        dd.text((x,y), ch, font=mono, fill=fill); x += dd.textlength(ch,font=mono)+sp
p = int(W*.055)
track((p, int(H*.085)), "001 / SELF-INITIATED / 2026", (104,104,104))
track((p, H-int(H*.115)), "VISUAL / CONCEPT DESIGNER", (168,168,168))
img.save('assets/img/og-cover.jpg', quality=88, optimize=True)
print("tersimpan")
