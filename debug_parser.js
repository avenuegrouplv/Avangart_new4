import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');

  const key = 'ok=({project:a';
  const startIdx = content.indexOf(key);
  if (startIdx !== -1) {
    const codeStart = content.indexOf('=>', startIdx) + 2;
    const code = content.slice(codeStart, codeStart + 16000);
    
    // Find balance of curly braces starting from { after =>
    let openCount = 0;
    let closedCount = 0;
    let endIdx = -1;
    for (let i = 0; i < code.length; i++) {
      if (code[i] === '{') openCount++;
      if (code[i] === '}') {
        closedCount++;
        if (openCount > 0 && openCount === closedCount) {
          endIdx = i;
          break;
        }
      }
    }
    
    if (endIdx !== -1) {
      const fnBody = code.slice(0, endIdx + 1);
      const fullFn = `(${content.slice(startIdx, codeStart)}${fnBody})`;
      try {
        new Function(fullFn);
        console.log(`✅ ${file} ok component parses perfectly!`);
      } catch (e) {
        console.log(`❌ ${file} ok component HAS SYNTAX ERROR:`, e.message);
        
        // Write the failing function to a file to debug
        fs.writeFileSync(`${file.split('/').pop()}_debug.js`, fullFn, 'utf8');
      }
    } else {
      console.log(`Could not balance brackets in ${file}`);
    }
  } else {
    console.log(`ok component not found in ${file}`);
  }
});
