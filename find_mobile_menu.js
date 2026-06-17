import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

// Let's find occurrences of backdrop-blur or mobile navigation structures
let idx = -1;
while ((idx = content.indexOf('backdrop-blur', idx + 1)) !== -1) {
  console.log(`Found backdrop-blur at offset ${idx}:`);
  console.log(content.slice(Math.max(0, idx - 150), Math.min(content.length, idx + 450)));
  console.log('---------------------------');
}
