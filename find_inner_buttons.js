import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('bg-white/5 hover:bg-white/10 border border-white/10');
if (sIdx !== -1) {
  console.log('--- FOUND PORTION ---');
  console.log(content.slice(sIdx - 100, sIdx + 1100));
}
