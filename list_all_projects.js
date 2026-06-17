import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

// Find all occurrences of "Biroji un komerctelpas" in the file to see projects.
const matches = [];
let idx = -1;
while ((idx = content.indexOf('category:', idx + 1)) !== -1) {
  const block = content.slice(idx - 100, idx + 400);
  matches.push(block);
}

console.log('--- ALL PROJECTS DEFINED ---');
matches.forEach((m, i) => {
  console.log(`[Project ${i}]:`, m);
  console.log('============================');
});
