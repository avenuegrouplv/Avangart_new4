import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const base64Start = 'iVBORw0KGgoAAAANSUhEUgAAAlgAAAEy';
  const idx = code.indexOf(base64Start);
  if (idx !== -1) {
    console.log("Found base64 at index:", idx);
    console.log("Declaration context (before):");
    console.log(code.slice(Math.max(0, idx - 150), idx));
    console.log("Content start:");
    console.log(code.slice(idx, idx + 100));
  } else {
    console.log("Start not found");
  }
}
