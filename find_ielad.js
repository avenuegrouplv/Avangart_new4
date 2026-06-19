import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const term = 'ielād';
  const idx = code.toLowerCase().indexOf(term);
  if (idx !== -1) {
    console.log("Found:", code.slice(idx - 200, idx + 1000));
  } else {
    console.log("Not found 'ielād'");
  }
}
