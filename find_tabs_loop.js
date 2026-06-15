import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const query = 'tk.map';
let idx = content.indexOf(query);
if (idx !== -1) {
  console.log(`Found "${query}" at index ${idx}:`);
  console.log(content.slice(idx - 150, idx + 150));
} else {
  console.log(`"${query}" NOT found.`);
}
