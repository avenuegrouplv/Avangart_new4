import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const index = content.indexOf('ku={');
  if (index !== -1) {
    console.log(`=== ${file} ===`);
    console.log(content.slice(index, index + 500));
  } else {
    console.log(`❌ ku={ not found in ${file}`);
  }
});
