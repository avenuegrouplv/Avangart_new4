import fs from 'fs';
import vm from 'vm';

const file = 'clean_replaced_debug.js';
if (!fs.existsSync(file)) {
  console.log("No file");
  process.exit(1);
}

const code = fs.readFileSync(file, 'utf8');

// We will find the syntax error by trying to parse smaller and smaller chunks of the file starting from index 0.
// Once we find the first index L where parsing fails, we will know exactly where the error is.
for (let L = 1000; L <= code.length; L += 50) {
  const sub = code.slice(0, L);
  // To avoid unbalanced bracket errors at the end of the truncated slice, 
  // let's count how many brackets are unclosed, and append them!
  let openCurly = 0;
  let openParen = 0;
  let openSquare = 0;
  let inString = false;
  let quote = '';
  
  for (let i = 0; i < sub.length; i++) {
    const c = sub[i];
    if (inString) {
      if (c === quote && sub[i - 1] !== '\\') inString = false;
    } else {
      if (c === '"' || c === "'" || c === '`') {
        inString = true;
        quote = c;
      } else if (c === '{') openCurly++;
      else if (c === '}') openCurly--;
      else if (c === '(') openParen++;
      else if (c === ')') openParen--;
      else if (c === '[') openSquare++;
      else if (c === ']') openSquare--;
    }
  }
  
  // Create a perfectly closed wrapper
  let closedSub = sub;
  if (inString) closedSub += quote;
  if (openSquare > 0) closedSub += ']'.repeat(openSquare);
  if (openCurly > 0) closedSub += '}'.repeat(openCurly);
  if (openParen > 0) closedSub += ')'.repeat(openParen);
  
  try {
    new vm.Script(closedSub);
  } catch (e) {
    if (e.message.includes("Unexpected token") && !e.message.includes("Unexpected token '}'")) {
      console.log(`❌ SYNTAX ERROR FOUND AT OFFSET ${L}:`);
      console.log(e.message);
      console.log("Context:");
      console.log(code.slice(Math.max(0, L - 150), L + 150));
      break;
    }
  }
}
