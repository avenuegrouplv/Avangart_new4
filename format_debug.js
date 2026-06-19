import fs from 'fs';
import vm from 'vm';

const file = 'public/assets/index-CbV5ml0j-v5.js';
const content = fs.readFileSync(file, 'utf8');

// To locate the exact error in the big file, let's break it down to newline after braces
let formatted = content
  .replace(/\{/g, '{\n')
  .replace(/\}/g, '\n}\n')
  .replace(/;/g, ';\n');

fs.writeFileSync('full_index_formatted.js', formatted, 'utf8');

try {
  new vm.Script(formatted, { filename: 'full_index_formatted.js' });
  console.log("✅ PERFECT PARSE!");
} catch (e) {
  console.log("❌ SYNTAX ERROR IN INDEX FILE:");
  console.log(e.message);
  console.log(e.stack);
}
