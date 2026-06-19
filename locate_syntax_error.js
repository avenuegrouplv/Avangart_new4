import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const startIdx = content.indexOf('ok=({project:a');
  if (startIdx !== -1) {
    console.log(`=== ${file} START COMPONENT ===`);
    console.log(content.slice(startIdx, startIdx + 2000));
    console.log(`=== ${file} END COMPONENT ===`);
  }
});
