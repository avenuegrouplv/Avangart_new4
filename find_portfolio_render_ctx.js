import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('z=[{...f}');
if (sIdx !== -1) {
  console.log('Context of portfolio list rendering:');
  console.log(content.slice(sIdx - 1000, sIdx + 1500));
}
