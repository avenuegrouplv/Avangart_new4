import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('Location":"Vieta');
if (sIdx !== -1) {
  console.log('Location render string:');
  console.log(content.slice(sIdx - 100, sIdx + 500));
}
