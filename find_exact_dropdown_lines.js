import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const targetStr = 'key:"mobile-navigation-dropdown",initial:{opacity:0,y:-20}';
const matchIdx = content.indexOf(targetStr);
if (matchIdx !== -1) {
  console.log('--- TARGET EXPANSION ---');
  console.log(content.slice(matchIdx - 100, matchIdx + 1100));
} else {
  console.log('Target string not found');
}
