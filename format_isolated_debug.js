import fs from 'fs';
import vm from 'vm';

const file = 'index-CbV5ml0j-v5.js_debug.js';
if (!fs.existsSync(file)) {
  console.log(`${file} does not exist`);
  process.exit(1);
}

const code = fs.readFileSync(file, 'utf8');

// Formatter that is safe (does not split inside string literals matching double/single quotes)
// We can use a simple state machine to format.
let formatted = '';
let inString = false;
let quoteChar = '';
let indent = 0;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  if (inString) {
    formatted += char;
    if (char === quoteChar && code[i - 1] !== '\\') {
      inString = false;
    }
  } else {
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      quoteChar = char;
      formatted += char;
    } else if (char === '{' || char === '[') {
      formatted += char + '\n' + '  '.repeat(++indent);
    } else if (char === '}' || char === ']') {
      formatted += '\n' + '  '.repeat(--indent) + char;
    } else if (char === ';') {
      formatted += ';\n' + '  '.repeat(indent);
    } else {
      formatted += char;
    }
  }
}

fs.writeFileSync('index_debug_formatted.js', formatted, 'utf8');

try {
  new vm.Script(formatted, { filename: 'index_debug_formatted.js' });
  console.log("✅ index_debug_formatted.js PARSED PERFECTLY!");
} catch (e) {
  console.log("❌ ERROR:", e.message);
  console.log(e.stack);
}
