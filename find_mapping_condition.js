import fs from 'fs';

const content = fs.readFileSync('assets/index-CbV5ml0j.js', 'utf8');

const targetStr = 'defaultProj.id === 101 || ';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  console.log('--- FOUND SECTION ---');
  console.log(content.substring(idx - 200, idx + 800));
} else {
  console.log('No such condition found!');
}
