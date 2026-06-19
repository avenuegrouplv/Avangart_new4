import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('ok_component_debug_pretty.js', 'utf8');

try {
  new vm.Script(code, { filename: 'ok_component_debug_pretty.js' });
  console.log("✅ PARSED ok_component_debug_pretty.js PERFECTLY!");
} catch (e) {
  console.log("❌ ERROR IN ok_component_debug_pretty.js:");
  console.log(e.message);
  console.log(e.stack);
}
