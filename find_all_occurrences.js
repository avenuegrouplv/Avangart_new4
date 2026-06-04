import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

function findAllOccurrences(kw) {
  let indices = [];
  let idx = content.indexOf(kw);
  while (idx !== -1) {
    indices.push(idx);
    idx = content.indexOf(kw, idx + 1);
  }
  return indices;
}

const keywords = [
  'Darba process no vīzijas līdz rezultātam',
  'Konsultācija un pirmā skice',
  '3D modelēšana un tehnisks projekts',
  'Katrs AVANGART projekts rit saskaņoti',
  'No ieceres līdz rezultātam'
];

keywords.forEach(kw => {
  const occ = findAllOccurrences(kw);
  console.log(`Keyword "${kw}": found ${occ.length} times at indices ${occ.join(', ')}`);
  occ.forEach((pos, idx) => {
    console.log(`  Occur ${idx + 1} context: ${content.substring(pos - 50, pos + 250)}`);
  });
});
