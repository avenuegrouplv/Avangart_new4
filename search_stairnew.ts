import fs from 'fs';
import path from 'path';

function searchForPattern(dir: string, pattern: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    try {
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
          searchForPattern(full, pattern);
        }
      } else {
        if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.txt')) {
          const content = fs.readFileSync(full, 'utf-8');
          if (content.includes(pattern)) {
            console.log(`FOUND in ${full} (size: ${content.length})`);
          }
        }
      }
    } catch (e) {}
  }
}

console.log('--- Searching for "stairNew1" in workspace ---');
searchForPattern('.', 'stairNew1');
console.log('--- Searching in /tmp ---');
if (fs.existsSync('/tmp')) {
  searchForPattern('/tmp', 'stairNew1');
}
