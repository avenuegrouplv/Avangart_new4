import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const searchTerms = [
  'Montāža',
  'kopšanai',
  'Ikviens AVANGART projekts ir īpašs',
  'No ieceres līdz rezultātam'
];

searchTerms.forEach(term => {
  let idx = 0;
  while ((idx = content.indexOf(term, idx)) !== -1) {
    console.log(`\nFound term "${term}" at index ${idx}:`);
    console.log(content.substring(idx - 200, idx + 600));
    idx += term.length;
  }
});
