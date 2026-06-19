import fs from 'fs';
import path from 'path';

function traverse(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath, list);
    } else {
      list.push(fullPath);
    }
  }
  return list;
}

const allFiles = traverse('.');
console.log("=== ALL FILES IN WORKSPACE (EXCLUDING node_modules, .git, dist) ===");
allFiles.forEach(f => console.log(f));
