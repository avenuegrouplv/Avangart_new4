import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('mobile-nav-dropdown');
if (sIdx !== -1) {
  console.log('Mobile menu dropdown:');
  console.log(content.slice(sIdx - 1600, sIdx + 1600));
}
