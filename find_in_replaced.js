import fs from 'fs';

const code = fs.readFileSync('clean_replaced_debug.js', 'utf8');

const sIdx = code.indexOf('setErrSrcs');
if (sIdx !== -1) {
  console.log("=== clean_replaced_debug.js surroundings of setErrSrcs ===");
  console.log(code.slice(sIdx - 100, sIdx + 500));
} else {
  console.log("setErrSrcs not found");
}
