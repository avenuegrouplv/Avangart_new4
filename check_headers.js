import fs from 'fs';
import path from 'path';

const dir = 'public/images/premium/jurmala';
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    const buffer = fs.readFileSync(fullPath);
    const isRIFF = buffer.toString('ascii', 0, 4) === 'RIFF';
    const isWEBP = buffer.toString('ascii', 8, 12) === 'WEBP';
    console.log(`File: ${f} - size: ${buffer.length} - isRIFF: ${isRIFF} - isWEBP: ${isWEBP}`);
  });
}
