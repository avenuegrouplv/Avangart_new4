import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

// Find where $T is declared of type object/array
let idx = -1;
while ((idx = content.indexOf('$T', idx + 1)) !== -1) {
  // we want to narrow down to variable assignment of $T
  const context = content.slice(idx - 30, idx + 100);
  if (context.includes('$T=') || context.includes('let $T') || context.includes('const $T') || context.includes('var $T')) {
    console.log(`Found declaration at ${idx}:`);
    console.log(content.slice(idx - 100, idx + 2000));
    break;
  }
}
