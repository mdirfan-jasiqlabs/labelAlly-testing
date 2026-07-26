import fs from 'fs';
import path from 'path';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(json|js|jsx)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const re = /["'](\/(?:images|brand|artists)[^"']+\.(?:png|jpe?g|webp|svg))["']/g;
const missing = [];
const checked = new Set();

for (const file of walk('src')) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = re.exec(text))) {
    const asset = m[1];
    if (checked.has(asset)) continue;
    checked.add(asset);
    const fsPath = path.join('public', asset.replace(/^\//, '').replace(/\//g, path.sep));
    if (!fs.existsSync(fsPath)) missing.push({ asset, file });
  }
}

console.log(JSON.stringify({ checked: checked.size, missingCount: missing.length, missing }, null, 2));
process.exit(missing.length ? 1 : 0);
