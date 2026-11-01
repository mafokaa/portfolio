// Сжимает фотографии сайта в WebP нужного размера.
//
//   npm run images                  — все картинки в src/
//   npm run images -- путь/к/папке  — только в этой папке (или файл)
//
// Что делает с каждой картинкой (jpg, png, webp, avif, tif):
//  1. уменьшает до предельного размера по длинной стороне (см. LIMITS);
//  2. сохраняет как .webp рядом с исходником;
//  3. если исходник был не .webp — переносит его в _archive/originals/
//     и меняет путь в index.md проекта и в src/data/site.ts;
//  4. уже сжатые файлы не трогает: если новый файл не меньше старого, старый остаётся.

import { readdir, readFile, writeFile, stat, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const QUALITY = 80;
// Предельный размер по длинной стороне; первое совпадение по пути
const LIMITS = [
  ['src/assets/site/hero/', 800],
  ['src/assets/site/contact/', 600],
  ['src/assets/site/about/', 2000],
  ['', 2400]
];
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
const kb = n => (n / 1024).toFixed(0) + ' КБ';

async function* walk(p) {
  const s = await stat(p);
  if (s.isFile()) { yield p; return; }
  for (const e of await readdir(p, { withFileTypes: true })) yield* walk(path.join(p, e.name));
}

// Меняет ссылку ./name.png → ./name.webp в файлах, где она упоминается
async function relink(file, oldName, newName) {
  const targets = [path.join(path.dirname(file), 'index.md'), path.join(ROOT, 'src/data/site.ts')];
  for (const t of targets) {
    let text;
    try { text = await readFile(t, 'utf8'); } catch { continue; }
    const re = new RegExp(`(/|\\./)${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"\\s]|$)`, 'gm');
    if (!re.test(text)) continue;
    await writeFile(t, text.replace(re, `$1${newName}$2`));
    console.log(`  путь обновлён в ${rel(t)}`);
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXT.has(ext)) return null;
  const r = rel(file);
  const max = LIMITS.find(([prefix]) => r.startsWith(prefix))[1];
  const input = await readFile(file);
  const out = await sharp(input, { failOn: 'none' })
    .rotate()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
    .toBuffer();
  const target = file.slice(0, -ext.length) + '.webp';

  if (ext === '.webp') {
    if (out.length >= input.length) { console.log(`= ${r} уже сжат (${kb(input.length)})`); return [input.length, input.length]; }
    await writeFile(target, out);
    console.log(`✓ ${r}: ${kb(input.length)} → ${kb(out.length)}`);
    return [input.length, out.length];
  }

  await writeFile(target, out);
  const archived = path.join(ROOT, '_archive/originals', r);
  await mkdir(path.dirname(archived), { recursive: true });
  await rename(file, archived);
  console.log(`✓ ${r} → ${path.basename(target)}: ${kb(input.length)} → ${kb(out.length)} (исходник в ${rel(archived)})`);
  await relink(file, path.basename(file), path.basename(target));
  return [input.length, out.length];
}

const args = process.argv.slice(2);
const roots = (args.length ? args : ['src']).map(a => path.resolve(ROOT, a));
let before = 0, after = 0, n = 0;
for (const r of roots) {
  for await (const f of walk(r)) {
    const res = await optimize(f);
    if (res) { before += res[0]; after += res[1]; n++; }
  }
}
console.log(`\nГотово: ${n} файлов, ${kb(before)} → ${kb(after)}`);
