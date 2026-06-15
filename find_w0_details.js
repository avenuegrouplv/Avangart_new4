import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('w0={');
if (sIdx !== -1) {
  console.log('w0 content:');
  console.log(content.slice(sIdx, sIdx + 1100));
} else {
  console.log('w0 not found');
}
