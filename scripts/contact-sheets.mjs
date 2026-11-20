// Builds one numbered contact sheet per photo folder, for choosing covers and gallery order.
// Usage: node scripts/contact-sheets.mjs <photos dir> <output dir>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [src, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });

const W = 220, H = 147, COLS = 8;
for (const dir of fs.readdirSync(src)) {
  const full = path.join(src, dir);
  if (!fs.statSync(full).isDirectory()) continue;
  const files = fs.readdirSync(full).filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => (parseInt(a.match(/(\d+)\.jpe?g$/i)?.[1] ?? "0") - parseInt(b.match(/(\d+)\.jpe?g$/i)?.[1] ?? "0")));
  const rows = Math.ceil(files.length / COLS);
  const tiles = await Promise.all(files.map(async (f, i) => {
    const img = await sharp(path.join(full, f)).rotate().resize(W, H, { fit: "cover" }).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="${H}"><rect width="34" height="22" fill="black" opacity="0.7"/><text x="5" y="16" font-size="15" font-family="Arial" fill="white">${i + 1}</text></svg>`);
    return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % COLS) * W, top: Math.floor(i / COLS) * H };
  }));
  await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#fff" } })
    .composite(tiles).jpeg({ quality: 70 }).toFile(path.join(out, dir.replace(/[^a-z0-9]+/gi, "_") + ".jpg"));
  fs.writeFileSync(path.join(out, dir.replace(/[^a-z0-9]+/gi, "_") + ".txt"), files.map((f, i) => `${i + 1}\t${f}`).join("\n"));
  console.log(dir, files.length);
}
