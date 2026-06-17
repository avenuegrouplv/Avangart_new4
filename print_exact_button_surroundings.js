import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('r&&a.images.length>1&&d!==0');
if (sIdx !== -1) {
  console.log('BEFORE AND AFTER BUTTON:');
  console.log(content.slice(sIdx - 150, sIdx + 700));
}
