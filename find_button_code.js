import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('Set as Cover');
if (sIdx !== -1) {
  // Let's find the start of the condition: 'r&&a.images.length>1&&d!==0&&'
  const condIdx = content.lastIndexOf('r&&', sIdx);
  if (condIdx !== -1) {
    console.log('Found full button code:');
    console.log(content.slice(condIdx, sIdx + 200));
  }
}
