import fs from 'fs';
import path from 'path';

function findAppFiles(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        findAppFiles(full);
      }
    } else {
      if (file.toLowerCase().includes('app') && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.bak'))) {
        console.log(full, fs.statSync(full).size);
      }
    }
  }
}

console.log('--- Searching for App files in / ---');
findAppFiles('.');
console.log('--- Searching in /tmp ---');
if (fs.existsSync('/tmp')) {
  try {
    findAppFiles('/tmp');
  } catch (e: any) {
    console.error(e.message);
  }
}
