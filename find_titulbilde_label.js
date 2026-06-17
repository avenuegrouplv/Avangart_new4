import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

let idx = -1;
while ((idx = content.indexOf('Titulbilde', idx + 1)) !== -1) {
  console.log(`Found "Titulbilde" at ${idx}:`);
  console.log(content.slice(idx - 200, idx + 200));
  console.log('---');
}

let idx2 = -1;
while ((idx2 = content.indexOf('Set as Cover', idx2 + 1)) !== -1) {
  console.log(`Found "Set as Cover" at ${idx2}:`);
  console.log(content.slice(idx2 - 200, idx2 + 200));
  console.log('---');
}
