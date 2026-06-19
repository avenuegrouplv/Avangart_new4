import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
const code = fs.readFileSync(file, 'utf8');

const startIdx = code.indexOf('$T=[');
if (startIdx !== -1) {
  let brackets = 1;
  let endIdx = startIdx + 4;
  while (brackets > 0 && endIdx < code.length) {
    if (code[endIdx] === '[') brackets++;
    else if (code[endIdx] === ']') brackets--;
    endIdx++;
  }
  const arrayBlob = code.slice(startIdx, endIdx);
  const matches = [...arrayBlob.matchAll(/(\{\s*id:\s*102[\s\S]*?\})/g)];
  matches.forEach(m => {
    console.log(m[1]);
  });
}
