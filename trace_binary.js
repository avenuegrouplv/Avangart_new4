import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('ok_component_debug.js', 'utf8');

// To trace the exact token, let's make a version where every character is on its own line!
// Wait, that's incredibly smart! Since JS ignores white space and newlines (mostly), if we insert a newline
// between almost every token (except letters/numbers/keywords/strings), we can get the exact character offset!
// But even simpler, let's write a script that tries compiling from index 0 to length L of ok_component_debug.js!
// Since ok_component_debug.js is an expression like `(ok=()=>{...})`, if we truncate it, it will complain about
// "Unexpected end of input" (which means the prefix up to that point is syntactically valid)
// as opposed to "Unexpected token" (which means there's a syntax error BEFORE or AT the truncation point)!
// This is an absolute genius and bulletproof way to find the EXACT syntax error position mathematically.

for (let L = 100; L <= code.length; L++) {
  const sub = code.slice(0, L);
  try {
    // If we parse the slice, we need to balance brackets to avoid premature end errors.
    // In JS, any prefix of a function that is cut off will throw:
    // "Unexpected end of input", "Unterminated template literal", etc.
    // But if we have an UNEXPECTED TOKEN (like the extra paren/bracket we put in),
    // it will throw "Unexpected token" even if it's cut off!
    // So if the error message is "Unexpected token ')'", then the error is definitely BEFORE or AT L!
    new Function(sub);
  } catch (e) {
    if (e.message.includes("Unexpected token") && !e.message.includes("Unexpected token '}'")) {
      console.log(`First unexpected token error at length ${L}:`);
      console.log(`Message: ${e.message}`);
      console.log(`Context: ... ${code.slice(Math.max(0, L - 60), L)} <<ERROR HERE>> ${code.slice(L, L + 60)} ...`);
      break;
    }
  }
}
