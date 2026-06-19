import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  let idx = -1;
  while ((idx = code.indexOf('isPlaceholder', idx + 1)) !== -1) {
    console.log(`Matched isPlaceholder at ${idx}:`);
    console.log(code.slice(idx - 100, idx + 400));
  }
}
