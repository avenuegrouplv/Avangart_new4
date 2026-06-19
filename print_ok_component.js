import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  console.log(code.slice(525800, 529800));
}
