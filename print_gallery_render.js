import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('Thumbnail');
if (sIdx !== -1) {
  console.log('Thumbnail render block:');
  console.log(content.slice(sIdx - 300, sIdx + 1200));
}
