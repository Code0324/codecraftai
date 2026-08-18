// Removes the baked-in black background of public/logo/logo.png and writes an
// RGBA version with clean, halo-free edges so it blends on dark AND light.
//
// Method (classic black-background keying):
//   alpha = max(R,G,B)          (black bg -> 0, content -> 255)
//   color' = color / alpha      (unpremultiply: strips the black fringe so the
//                                logo's true colors are preserved at edges)
//
// This avoids the gray halos that plain color-distance keying leaves behind.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'public', 'logo', 'logo.png');
const OUT = path.join(__dirname, '..', 'public', 'logo', 'logo-rgba.png');

(async () => {
  const img = sharp(SRC);
  const meta = await img.metadata();
  console.log('input:', meta.width + 'x' + meta.height, 'channels:', meta.channels, 'hasAlpha:', meta.hasAlpha);

  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: ch } = info;
  const px = (x, y) => {
    const o = (y * w + x) * ch;
    return [data[o], data[o + 1], data[o + 2]];
  };

  // ── Background sanity check: corners should be near-black ──
  const corners = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)];
  const maxCornerLum = Math.max(...corners.map((c) => Math.max(...c)));
  console.log('corner max-luminance (should be low):', maxCornerLum);

  // ── Chroma key: alpha from max channel, then unpremultiply ──
  let removed = 0;
  let opaque = 0;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(r, g, b); // 0..255
    if (a < 12) {
      data[i + 3] = 0; // pure background
      removed++;
    } else {
      // unpremultiply to remove the black edge blend
      data[i] = Math.min(255, Math.round((r * 255) / a));
      data[i + 1] = Math.min(255, Math.round((g * 255) / a));
      data[i + 2] = Math.min(255, Math.round((b * 255) / a));
      data[i + 3] = a;
      opaque++;
    }
  }
  console.log('removed (fully transparent):', removed, 'opaque:', opaque, `(${(100 * opaque / (w * h)).toFixed(1)}% content)`);

  // ── Content integrity: bounding box of opaque pixels ──
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * ch + 3] > 40) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('content bounding box: x', minX, '->', maxX, 'y', minY, '->', maxY, `(fills ${(100 * (maxX - minX + 1) / w).toFixed(0)}% width, ${(100 * (maxY - minY + 1) / h).toFixed(0)}% height)`);

  // ── Write RGBA PNG ──
  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(OUT);

  const outMeta = await sharp(OUT).metadata();
  console.log('output:', path.basename(OUT), outMeta.width + 'x' + outMeta.height, 'channels:', outMeta.channels, 'hasAlpha:', outMeta.hasAlpha);

  // ── Verify corner transparency + sample center content ──
  const probe = await sharp(OUT).raw().toBuffer({ resolveWithObject: true });
  const pc = probe.info.channels;
  const cornerA = probe.data[pc - 1];
  const cx = Math.round(w / 2), cy = Math.round(h / 2);
  const cOff = (cy * w + cx) * pc;
  console.log('top-left alpha:', cornerA, cornerA === 0 ? 'TRANSPARENT ✓' : 'still opaque ✗');
  console.log('center pixel rgba:', probe.data[cOff], probe.data[cOff + 1], probe.data[cOff + 2], probe.data[cOff + 3]);
})();
