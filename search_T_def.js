import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  // Let's find "$T" definition. We know from earlier search that it contains avangart-projects-list-v12. Let's find $T = [ ... ] or similar.
  const idx = code.indexOf('$T=');
  if (idx !== -1) {
    console.log("Found $T= at index:", idx);
    console.log(code.slice(idx, idx + 1500));
  } else {
    console.log("No exact $T= found");
  }
}
