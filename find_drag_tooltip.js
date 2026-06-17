import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('Drag to 1st position as Cover!');
if (sIdx !== -1) {
  console.log('Found Drag to 1st position section:');
  console.log(content.slice(sIdx - 150, sIdx + 150));
}
