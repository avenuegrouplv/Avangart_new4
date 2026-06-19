import fs from 'fs';

const file = 'public/assets/index-CbV5ml0j-v5.js';
if (fs.existsSync(file)) {
  const code = fs.readFileSync(file, 'utf8');
  const base64Start = 'iVBORw0KGgoAAAANSUhEUgAAAlgAAAEy';
  const idx = code.indexOf(base64Start);
  if (idx !== -1) {
    // Let's find the closing quote after base64
    // Since it's a huge string, let's find the next double quote starting from 100,000 chars after the start
    let endQuoteIdx = -1;
    for (let i = idx + 100000; i < code.length; i++) {
      if (code[i] === '"') {
        endQuoteIdx = i;
        break;
      }
    }
    if (endQuoteIdx !== -1) {
      console.log("Found end of base64 at index:", endQuoteIdx);
      console.log("Characters following base64 string:");
      console.log(code.slice(endQuoteIdx, endQuoteIdx + 200));
    } else {
      console.log("Could not find ending double-quote!");
    }
  } else {
    console.log("Start not found");
  }
}
