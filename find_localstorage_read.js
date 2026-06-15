import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('localStorage.getItem("avangart-projects-list-v5"');
if (sIdx !== -1) {
  console.log('Found localStorage read at:', sIdx);
  console.log(content.slice(sIdx - 300, sIdx + 1200));
} else {
  console.log('Not found');
}
