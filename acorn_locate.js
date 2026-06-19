import fs from 'fs';
import * as acorn from 'acorn';

const file = 'public/assets/index-CbV5ml0j-v5.js';
const code = fs.readFileSync(file, 'utf8');

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log("🥇🥇🥇 SUCCESS!!! acorn parsed the bundle 100% successfully!");
} catch (e) {
  console.log("❌ acorn found a syntax error:");
  console.log("Message:", e.message);
  console.log("Position:", e.pos);
  console.log("Line:", e.loc ? e.loc.line : "unknown");
  console.log("Column:", e.loc ? e.loc.column : "unknown");

  if (e.pos !== undefined) {
    console.log("\n=== CONTEXT AROUND ERROR ===");
    const start = Math.max(0, e.pos - 150);
    const end = Math.min(code.length, e.pos + 150);
    console.log(code.slice(start, end));
    console.log(" ".repeat(e.pos - start) + "^");
  }
}
