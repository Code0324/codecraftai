// Scans src/ for every "/images/..." string literal and verifies the file exists in public/
const fs = require('fs');
const path = require('path');

const srcFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) srcFiles.push(p);
  }
}
walk('src');

const refs = new Map(); // ref -> [files]
const re = /["'](\/images\/[^"'?]+)(\?[^"']*)?["']/g;
for (const f of srcFiles) {
  const c = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = re.exec(c))) {
    const ref = m[1]; // strip any ?v= cache-buster query
    if (!refs.has(ref)) refs.set(ref, []);
    refs.get(ref).push(f);
  }
}

let missing = 0;
console.log('=== ALL /images/ REFERENCES FOUND IN CODE ===');
for (const [ref, srcs] of [...refs.entries()].sort()) {
  const p = 'public' + ref;
  if (fs.existsSync(p)) {
    console.log('OK   ' + ref);
  } else {
    missing++;
    console.log('MISS ' + ref + '  ->  ' + srcs.join(', '));
  }
}
console.log('=== MISSING COUNT: ' + missing + ' ===');
process.exit(missing > 0 ? 1 : 0);
