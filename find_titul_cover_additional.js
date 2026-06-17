import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

// Find all occurrences of "titul" or "cover" in lowercase/uppercase
let idx = -1;
const searchTerms = ['titul', 'cover'];
searchTerms.forEach(term => {
  let pos = -1;
  while ((pos = content.toLowerCase().indexOf(term, pos + 1)) !== -1) {
    console.log(`Found term "${term}" at ${pos}:`);
    console.log(content.slice(pos - 150, pos + 150));
    console.log('---');
  }
});
