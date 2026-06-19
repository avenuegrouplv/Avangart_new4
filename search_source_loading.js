import fs from 'fs';

const file = 'full_index_formatted.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const term = 'localStorage.getItem("avangart-projects-list-v12")';
  const idx = code.indexOf(term);
  if (idx !== -1) {
    console.log("=== Found projects list loading logic in source ===");
    console.log(code.slice(idx - 400, idx + 1500));
  }
}
