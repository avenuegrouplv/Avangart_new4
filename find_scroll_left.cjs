const fs = require('fs');
const content = fs.readFileSync('public/assets/index-CbV5ml0j-v6.js', 'utf-8');

// Find all scrollBy or "Scroll left"
let pos = 0;
while (true) {
    const idx = content.indexOf('Scroll left', pos);
    if (idx === -1) break;
    console.log(`--- Match at index ${idx} ---`);
    console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
    pos = idx + 11;
}
