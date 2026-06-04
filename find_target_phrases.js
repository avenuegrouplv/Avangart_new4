import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

const keywords = [
  'Darba process',
  'Konsultācija',
  'pirmā skice',
  '3D modelēšana',
  'tehiskais projekts',
  'tehniskais projekts',
  'Ražošana darbnīcā',
  'Piegāde, montāža'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`\n--- Searching inside ${f} ---`);
    const content = fs.readFileSync(f, 'utf8');
    keywords.forEach(kw => {
      const idx = content.indexOf(kw);
      if (idx !== -1) {
        console.log(`Keyword "${kw}": FOUND at index ${idx}. Context: ${content.substring(idx - 60, idx + 200)}`);
      } else {
        console.log(`Keyword "${kw}": NOT FOUND`);
      }
    });
  } else {
    console.log(`File ${f} does not exist.`);
  }
});
