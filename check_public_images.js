import fs from 'fs';
import path from 'path';

const dirs = ['public/images/premium/jurmala', 'public/images/premium/bergi'];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`=== Contents of ${dir} ===`);
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      const p = path.join(dir, f);
      const stat = fs.statSync(p);
      console.log(`File: ${f} - Size: ${stat.size} bytes`);
    });
  } else {
    console.log(`Dir does not exist: ${dir}`);
  }
});
