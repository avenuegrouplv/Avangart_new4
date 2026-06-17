import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

let idx = -1;
while ((idx = content.indexOf('#1a0f05', idx + 1)) !== -1) {
  console.log(`Found #1a0f05 at offset ${idx}:`);
  console.log(content.slice(idx - 150, idx + 150));
  console.log('---------------------------');
}
