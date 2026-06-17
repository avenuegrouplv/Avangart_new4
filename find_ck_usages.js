import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('u.jsx(ck');
if (sIdx !== -1) {
  console.log('Context of ck usage:');
  console.log(content.slice(sIdx - 300, sIdx + 400));
} else {
  console.log('Not found');
}
