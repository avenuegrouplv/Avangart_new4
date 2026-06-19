import fs from 'fs';

const file = 'full_index_formatted.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const idx = code.indexOf('$T=[');
  if (idx !== -1) {
    console.log("Found $T in full_index_formatted.js:", code.slice(idx, idx + 1500));
  } else {
    console.log("No $T found in full_index_formatted.js");
  }
}
