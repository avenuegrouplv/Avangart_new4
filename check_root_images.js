import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.startsWith('img_') && f.endsWith('.jpg'));
files.forEach(f => {
  const stat = fs.statSync(f);
  console.log(`File: ${f} - Size: ${stat.size} bytes`);
});
