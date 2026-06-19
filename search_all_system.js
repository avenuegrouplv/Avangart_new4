import fs from 'fs';
import path from 'path';

function searchImagesAll(dir, results = []) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'proc' || file === 'sys' || file === 'dev' || file === 'lib' || file === 'usr' || file === 'bin' || file === 'sbin' || file === 'etc' || file === 'var' || file === 'boot') {
        continue;
      }
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue;
      }
      if (stat.isDirectory()) {
         searchImagesAll(fullPath, results);
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (['.webp', '.png', '.jpg', '.jpeg', '.zip', '.rar'].includes(ext)) {
          // Skip known/dist files to keep output clean
          if (fullPath.includes('node_modules') || fullPath.includes('dist/')) continue;
          results.push({ path: fullPath, size: stat.size, mtime: stat.mtime });
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return results;
}

const images = searchImagesAll('/');
console.log(`=== FOUND ALL IMAGES IN SYSTEM (${images.length} files) ===`);
images.forEach(img => {
  console.log(`${img.path} - size: ${img.size} bytes, mtime: ${img.mtime}`);
});
