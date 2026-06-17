import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

let idx = -1;
while ((idx = content.indexOf('Latvija', idx + 1)) !== -1) {
  console.log(`Found "Latvija" at ${idx}:`);
  console.log(content.slice(idx - 300, idx + 300));
  console.log('---');
}
