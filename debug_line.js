import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('ok_component_debug.js', 'utf8');

// The code starts with: (ok=({project:a,lang:i,isDev:r,onUpdateImages:l})=>{ ... })
// Let's do a sliding window or binary search, or we can use error line parsing if we run it as a vm Script!
try {
  new vm.Script(code, { filename: 'ok_component_debug.js' });
} catch (e) {
  console.log("Error details:");
  console.log(e.message);
  console.log(e.stack);
}
