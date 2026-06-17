import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('u.jsxs("nav"');
if (sIdx !== -1) {
  console.log('Nav element content:');
  console.log(content.slice(sIdx, sIdx + 3000));
}
