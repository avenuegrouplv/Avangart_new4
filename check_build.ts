import fs from 'fs';

const jsFile = 'dist/assets/index-Cz1NZTdP.js';
if (fs.existsSync(jsFile)) {
  const content = fs.readFileSync(jsFile, 'utf-8');
  console.log('File size:', content.length);
  console.log('Contains "konsolkāpnes":', content.includes('konsolkāpnes'));
  console.log('Contains "masīvkoka kāpnes":', content.includes('masīvkoka kāpnes'));
  console.log('Contains "stairNew1":', content.includes('stairNew1'));
  console.log('Contains "/images/stair1.webp":', content.includes('/images/stair1.webp'));
} else {
  console.log('No compiled build found at', jsFile);
}
