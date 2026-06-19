import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const term = 'errSrcs';
  let idx = -1;
  while ((idx = code.indexOf(term, idx + 1)) !== -1) {
    console.log(`Found errSrcs at index ${idx}:`);
    console.log(code.slice(idx - 150, idx + 250));
  }
}
