import fs from 'fs';

const code = fs.readFileSync('clean_replaced_debug.js', 'utf8');

let idx = 0;
while (true) {
  const found = code.indexOf('setErrSrcs', idx);
  if (found === -1) break;
  console.log(`Matched setErrSrcs at ${found}:`);
  console.log(code.slice(found - 50, found + 150));
  idx = found + 10;
}
