import fs from 'fs';
import path from 'path';

console.log('Current directory:', process.cwd());
try {
  const parent = path.resolve('..');
  console.log('Parent directory contents:', fs.readdirSync(parent));
  const grand = path.resolve('../..');
  console.log('Grandparent directory contents:', fs.readdirSync(grand));
} catch (e: any) {
  console.error(e.message);
}
