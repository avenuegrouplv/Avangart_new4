import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const query = 'Biroji un komerctelpas';
let idx = 0;
while (true) {
  idx = content.indexOf(query, idx);
  if (idx === -1) break;
  console.log('Found "Biroji un komerctelpas" at:', idx);
  console.log(content.slice(idx - 100, idx + 500));
  idx += query.length;
}
