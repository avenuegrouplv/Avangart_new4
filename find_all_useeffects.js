import fs from 'fs';

const code = fs.readFileSync('index-CbV5ml0j-v5.js_debug.js', 'utf8');

let idx = 0;
while (true) {
  const found = code.indexOf('Z.useEffect', idx);
  if (found === -1) break;
  console.log(`Z.useEffect found at offset ${found}:`);
  console.log(code.slice(found, found + 120));
  idx = found + 11;
}
