import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('clean_replaced_debug.js', 'utf8');

try {
  new vm.Script(code, { filename: 'clean_replaced_debug.js' });
  console.log("✅ PARSED SUCCESS!");
} catch (e) {
  console.log("❌ ERROR PROPERTIES:");
  console.log("Message:", e.message);
  console.log("Stack:", e.stack);
}
