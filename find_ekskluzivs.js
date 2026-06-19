import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const term = 'Ekskluzīvs';
  const idx = code.indexOf(term);
  if (idx !== -1) {
    console.log("Found:", code.slice(idx - 200, idx + 1000));
  } else {
    // try lowercase
    const idx2 = code.toLowerCase().indexOf('ekskluz');
    if (idx2 !== -1) {
      console.log("Found lower:", code.slice(idx2 - 200, idx2 + 1000));
    } else {
      console.log("Not found 'Ekskluzīvs'");
    }
  }
}
