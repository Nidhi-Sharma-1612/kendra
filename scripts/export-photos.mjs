// Exports the curated photos (scripts/photo-picks.json) from the Dropbox download into
// public/images/<slug>/NN.jpg, resized for the web. Re-run after changing the picks.
// Usage: node scripts/export-photos.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "photos", "2022 New Photos");
const OUT = path.join(ROOT, "public", "images");
const picks = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "photo-picks.json"), "utf8"));

const byNumber = (a, b) => parseInt(a.match(/(\d+)\.jpe?g$/i)?.[1] ?? "0") - parseInt(b.match(/(\d+)\.jpe?g$/i)?.[1] ?? "0");

for (const [slug, { folder, picks: nums }] of Object.entries(picks)) {
  if (slug.startsWith("_")) continue;
  const dir = path.join(SRC, folder);
  const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).sort(byNumber);
  const outDir = path.join(OUT, slug);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  await Promise.all(nums.map((n, i) =>
    sharp(path.join(dir, files[n - 1])).rotate()
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 76, mozjpeg: true })
      .toFile(path.join(outDir, `${String(i + 1).padStart(2, "0")}.jpg`)),
  ));
  console.log(slug, nums.length);
}
