#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 AI 生成的原图珠子(beads_raw/<name>.png) 标准化 → 打包进 beads_assets.js。
处理：白底 flood-fill 抠透明 → 裁到珠子外接框(顺带裁掉即梦右下角标) → 正方形留白(珠径~82%)
      → 边缘羽化 → 统一 512²  →  data URI。
缺图的 name 保留 base(现有 beads_assets.js) 里的旧珠 —— 支持"先加 5 颗、其余后补"。

用法：
  python3 build_beads.py --raw beads_raw --base /path/to/beads_assets.js --out /path/to/beads_assets.js
名字(对应系统 key)：nanhong moonstone bluelace citrine clear obsidian silver incense
"""
import os, sys, json, base64, io, argparse
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

NAMES = ['nanhong','moonstone','bluelace','citrine','clear','obsidian','silver','incense']
OUT_SIZE = 512      # 输出正方形边长
BEAD_FRAC = 0.82    # 珠径占画布比例(8 颗一致→串起来大小匀)
SENTINEL = (255, 0, 255)  # 抠底哨兵色(珠子里不会出现的洋红)

def find_raw(raw_dir, name):
    for ext in ('.png','.PNG','.jpg','.jpeg','.webp'):
        p = os.path.join(raw_dir, name+ext)
        if os.path.isfile(p): return p
    return None

def remove_bg_and_crop(path):
    """椭圆珠盘 mask：整颗珠子保留(含近白内部)、盘外一律透明；顺带切掉即梦角标；正方形留白 512²。
    比 flood-fill 稳——不会把白水晶/月光石这类近白珠子啃掉。"""
    im = Image.open(path).convert('RGB')
    arr = np.asarray(im).astype(np.int16)
    h, w = arr.shape[:2]
    lum = arr.mean(-1)
    sat = arr.max(-1) - arr.min(-1)
    not_white = (lum < 245) | (sat > 10)          # 珠子(边缘折射/颜色/内含)；纯白底=False
    m = not_white.copy()
    bf = max(2, int(min(w, h) * 0.02))             # 去掉外边框噪点
    m[:bf, :] = m[-bf:, :] = m[:, :bf] = m[:, -bf:] = False
    m[int(h*0.85):, int(w*0.70):] = False          # 抹掉即梦右下角标区域(仅用于定位珠子)
    ys, xs = np.where(m)
    if len(xs) < 50:                               # 兜底：整图当圆
        cx, cy, rx, ry = w/2, h/2, min(w, h)*0.45, min(w, h)*0.45
    else:
        # 用 2~98 百分位定珠盘外接框(抗零星噪点)
        x0, x1 = np.percentile(xs, 1), np.percentile(xs, 99)
        y0, y1 = np.percentile(ys, 1), np.percentile(ys, 99)
        cx, cy = (x0+x1)/2, (y0+y1)/2
        rx, ry = (x1-x0)/2*1.03, (y1-y0)/2*1.03    # 略放大避免削到珠边
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx-cx)/max(rx,1))**2 + ((yy-cy)/max(ry,1))**2)   # =1 在椭圆边
    sd = (1.0 - d) * ((rx+ry)/2)                   # 椭圆内的近似像素距离
    alpha = np.clip(sd/1.5 + 0.5, 0, 1)            # ~1.5px 羽化
    a8 = (alpha*255).astype('uint8')
    bead = Image.fromarray(np.dstack([np.asarray(im), a8]), 'RGBA')
    # 裁到椭圆外接框
    bx0, by0 = max(0, int(cx-rx-2)), max(0, int(cy-ry-2))
    bx1, by1 = min(w, int(cx+rx+2)), min(h, int(cy+ry+2))
    bead = bead.crop((bx0, by0, bx1, by1))
    # 正方形画布 + 留白让珠径占 BEAD_FRAC
    bw, bh = bead.size
    side = int(round(max(bw, bh) / BEAD_FRAC))
    canvas = Image.new('RGBA', (side, side), (0,0,0,0))
    canvas.paste(bead, ((side-bw)//2, (side-bh)//2), bead)
    return canvas.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)

def to_data_uri(img):
    buf = io.BytesIO(); img.save(buf, 'PNG', optimize=True)
    return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()

def load_base(path):
    if not path or not os.path.isfile(path): return {}
    t = open(path, encoding='utf-8').read()
    return json.loads(t[t.index('{'):t.rindex('}')+1])

def main():
    ap = argparse.ArgumentParser()
    here = os.path.dirname(os.path.abspath(__file__))
    ap.add_argument('--raw',  default=os.path.join(here, '..', 'beads_raw'))
    ap.add_argument('--base', default='')   # 现有 beads_assets.js(缺图的珠沿用旧图)
    ap.add_argument('--out',  default=os.path.join(here, '..', 'beads_assets.js'))
    ap.add_argument('--preview', default=os.path.join(here, '..', 'beads_raw', 'processed'))
    a = ap.parse_args()
    beads = load_base(a.base)
    os.makedirs(a.preview, exist_ok=True)
    added = []
    for name in NAMES:
        p = find_raw(a.raw, name)
        if not p:
            print(f'  · {name:10s} 无原图 → {"沿用旧珠" if name in beads else "缺失!"}')
            continue
        img = remove_bg_and_crop(p)
        img.save(os.path.join(a.preview, f'bead_{name}.png'))
        beads[name] = to_data_uri(img)
        added.append(name); print(f'  ✓ {name:10s} 处理完成 ← {os.path.basename(p)}')
    missing = [n for n in NAMES if n not in beads]
    if missing: print('  ⚠ 仍缺：', ', '.join(missing))
    with open(a.out, 'w', encoding='utf-8') as f:
        f.write('const BEAD_IMG=' + json.dumps(beads, ensure_ascii=False) + ';\n')
    print(f'\n写出 {a.out}（共 {len(beads)} 颗，本轮新增 {len(added)}：{", ".join(added) or "无"}）')

if __name__ == '__main__':
    main()
