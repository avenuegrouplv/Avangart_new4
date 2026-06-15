import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('$T=[');
if (sIdx !== -1) {
  const eIdx = content.indexOf('],tk=', sIdx);
  console.log(content.slice(sIdx, eIdx + 100));
}
