import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  let count = 0;
  let idx = -1;
  while ((idx = code.indexOf('Ekskluzīvs kokapstrādes darbs', idx + 1)) !== -1) {
    count++;
    console.log(`Match #${count} at ${idx}:`);
    console.log(code.slice(idx - 100, idx + 300));
  }
}
