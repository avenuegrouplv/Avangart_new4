import fs from 'fs';

const code = fs.readFileSync('ok_component_debug.js', 'utf8');

// Let's do a much smarter scan. We will use the 'acorn' parser if available, 
// or simply try parsing the code after removing parts.
// Actually, let's write a parser that tokenizes or uses eval/new Function with try-catch.
// What if we just print the entire ok_component_debug.js with line numbers and look at the line 
// where there might be a bracket mismatch?
// Yes, let's write a script that adds a newline after every semicolon and print the whole file!

let formatted = '';
let indent = 0;
for (let i = 0; i < code.length; i++) {
  const char = code[i];
  if (char === '{' || char === '[') {
    formatted += char + '\n' + '  '.repeat(++indent);
  } else if (char === '}' || char === ']') {
    formatted += '\n' + '  '.repeat(--indent) + char;
  } else if (char === ';') {
    formatted += ';\n' + '  '.repeat(indent);
  } else {
    formatted += char;
  }
}

fs.writeFileSync('ok_component_debug_pretty.js', formatted, 'utf8');
console.log("Pretty debug file written to ok_component_debug_pretty.js");
