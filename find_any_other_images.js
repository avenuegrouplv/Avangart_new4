import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const regex = /pub-[a-zA-Z0-9_\.\-\/]+/g;
  let match;
  console.log("=== Matches for pub- ===");
  while ((match = regex.exec(code)) !== null) {
    console.log(`Matched pub-: ${match[0]} at index ${match.index}`);
    console.log(code.slice(match.index - 100, match.index + 200));
  }
}
