import fs from 'fs';

const file = 'assets/index-CbV5ml0j-v6.js';
const js = fs.readFileSync(file, 'utf8');

// locate "id:104"
const pos = js.indexOf('id:104');
if (pos !== -1) {
  console.log('--- FOUND ID:104 ---');
  console.log(js.substring(pos, pos + 1000));
} else {
  console.log('id:104 not found in js!');
}
