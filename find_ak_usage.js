import fs from 'fs';

const files = ['public/assets/index-CbV5ml0j-v5.js', 'public/assets/index-CbV5ml0j.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const code = fs.readFileSync(file, 'utf8');
    let idx = -1;
    let count = 0;
    // Search for occurrences of variable 'ak'
    // Since it's minified, let's search for exact patterns like 'ak,' or '=ak' or ':ak' or 'ak}' or 'ak]' or 'ak(' or 'ak?' or 'ak:' or 'ak;' or 'ak.' or 'ak[' or 'ak '
    // We can use a regex to find occurrences of the exact identifier `ak`
    const regex = /\bak\b/g;
    let match;
    console.log(`=== References to 'ak' in ${file} ===`);
    while ((match = regex.exec(code)) !== null) {
      count++;
      const pos = match.index;
      // skip the massive definition at 418884
      if (pos >= 418881 && pos <= 418887 + 100000) {
        console.log(`Usage #${count} at ${pos}: [Skipping massive base64 definition...]`);
        regex.lastIndex = pos + 300000; // skip the whole base64
        continue;
      }
      console.log(`Usage #${count} at ${pos}: ...${code.slice(Math.max(0, pos - 80), pos + 100)}...`);
    }
  }
});
