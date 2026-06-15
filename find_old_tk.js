import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j.js', 'utf8');

const sIdx = content.indexOf(',tk=[');
if (sIdx !== -1) {
  console.log(content.slice(sIdx, sIdx + 500));
} else {
  console.log('Not found');
}
