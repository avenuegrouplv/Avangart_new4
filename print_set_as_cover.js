import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('Set as Cover');
if (sIdx !== -1) {
  console.log('--- STRICT SECTION OF SET AS COVER ---');
  console.log(content.slice(sIdx - 300, sIdx + 400));
}
