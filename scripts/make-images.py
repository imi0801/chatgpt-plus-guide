"""Generate src/og-default.png (1200x630) and src/icon-512.png. Run once; outputs are committed."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / 'src'
BRAND, ACCENT, INK, PAPER = (15, 107, 87), (226, 162, 59), (23, 32, 31), (250, 249, 246)

def font(size, bold=True):
    for name in ['NotoSansCJK-Bold.ttc', 'NotoSansCJKtc-Bold.otf', 'NotoSansCJK-Regular.ttc']:
        for base in ['/usr/share/fonts/opentype/noto', '/usr/share/fonts/truetype/noto', '/usr/share/fonts']:
            for p in Path(base).rglob(name):
                try: return ImageFont.truetype(str(p), size, index=0)
                except Exception: pass
    return ImageFont.load_default()

def mark(d, x, y, s):
    d.rounded_rectangle([x, y, x + s, y + s], radius=s * 0.25, fill=BRAND)
    w = max(3, int(s * 0.1))
    d.line([(x + s * .28, y + s * .55), (x + s * .42, y + s * .69), (x + s * .72, y + s * .38)], fill='white', width=w, joint='curve')
    r = s * 0.08
    d.ellipse([x + s * .73 - r, y + s * .28 - r, x + s * .73 + r, y + s * .28 + r], fill=ACCENT)

# OG image
W, H = 1200, 630
im = Image.new('RGB', (W, H), PAPER)
d = ImageDraw.Draw(im)
d.rectangle([0, 0, 14, H], fill=BRAND)
d.rectangle([14, 0, 22, H], fill=ACCENT)
mark(d, 80, 72, 64)
d.text((162, 78), 'ChatGPT 订阅百科', font=font(40), fill=INK)
d.text((162, 128), 'guide.goplus.pro', font=font(22, False), fill=(123, 134, 132))
d.text((80, 230), 'ChatGPT Plus 怎么开通、怎么付款？', font=font(66), fill=INK)
d.text((80, 320), '开通条件 · 微信支付宝 · 付款失败排查 · Plus / Pro 对比 · 取消与退款', font=font(30, False), fill=(74, 85, 83))
for i, t in enumerate(['面向中国大陆用户', '先给结论再给步骤', '按官方帮助中心核验']):
    x = 80 + i * 300
    d.rounded_rectangle([x, 470, x + 270, 528], radius=29, fill=(227, 242, 236))
    tw = d.textlength(t, font=font(24))
    d.text((x + (270 - tw) / 2, 483), t, font=font(24), fill=(11, 79, 65))
im.save(ROOT / 'og-default.png', optimize=True)

# Icon
S = 512
ic = Image.new('RGBA', (S, S), (0, 0, 0, 0))
mark(ImageDraw.Draw(ic), 0, 0, S)
ic.save(ROOT / 'icon-512.png', optimize=True)
print('ok')
