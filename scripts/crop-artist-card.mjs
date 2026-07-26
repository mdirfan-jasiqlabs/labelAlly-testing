/**
 * Face-safe 4:3 card crop for Featured Artists.
 * Usage: node scripts/crop-artist-card.mjs <slug> [focalY] [focalX]
 * focalY/focalX are 0-1 positions of the face in the source.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/crop-artist-card.mjs <slug> [focalY=0.32] [focalX=0.5]');
  process.exit(1);
}

const focalY = Number(process.argv[3] ?? 0.32);
const focalX = Number(process.argv[4] ?? 0.5);
const WIDTH = 900;
const HEIGHT = 675;
const TARGET_RATIO = WIDTH / HEIGHT;

const SRC = path.resolve('public/images/artists/portraits', `${slug}.webp`);
const OUT = path.resolve('public/images/artists/cards', `${slug}.webp`);
const TMP = path.resolve('public/images/artists/cards', `_${slug}.tmp.webp`);

if (!fs.existsSync(SRC)) {
  console.error('Missing source:', SRC);
  process.exit(1);
}

const meta = await sharp(SRC).rotate().metadata();
const srcW = meta.width;
const srcH = meta.height;
const srcRatio = srcW / srcH;

let extract;
if (srcRatio > TARGET_RATIO) {
  // Wider than 4:3 — crop sides around face X
  const cropH = srcH;
  const cropW = Math.round(srcH * TARGET_RATIO);
  let left = Math.round(srcW * focalX - cropW / 2);
  left = Math.max(0, Math.min(left, srcW - cropW));
  extract = { left, top: 0, width: cropW, height: cropH };
} else {
  // Taller — crop height around face Y
  const cropW = srcW;
  const cropH = Math.round(srcW / TARGET_RATIO);
  let top = Math.round(srcH * focalY - cropH * 0.4);
  top = Math.max(0, Math.min(top, srcH - cropH));
  extract = { left: 0, top, width: cropW, height: cropH };
}

if (extract.left + extract.width > srcW) extract.width = srcW - extract.left;
if (extract.top + extract.height > srcH) extract.height = srcH - extract.top;

await sharp(SRC)
  .rotate()
  .extract(extract)
  .resize(WIDTH, HEIGHT, { fit: 'fill' })
  .webp({ quality: 88 })
  .toFile(TMP);

fs.renameSync(TMP, OUT);

const out = await sharp(OUT).metadata();
console.log(
  JSON.stringify({
    slug,
    source: `${srcW}x${srcH}`,
    extract,
    focal: { x: focalX, y: focalY },
    out: `${out.width}x${out.height}`,
    ok: out.width === WIDTH && out.height === HEIGHT,
  })
);
