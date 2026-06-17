import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('const $T = [');
if (sIdx !== -1) {
  console.log('Found $T array definition:');
  console.log(content.slice(sIdx, sIdx + 1200));
} else {
  // seek generic "const $T"
  const fallback = content.indexOf('$T = [');
  if (fallback !== -1) {
    console.log('Found $T = [ definition at fallback:', fallback);
    console.log(content.slice(fallback - 10, fallback + 1500));
  }
}
