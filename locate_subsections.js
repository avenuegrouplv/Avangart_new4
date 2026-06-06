import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const searchKeywords = [
  'Sadarbības un koprades māksla',
  'Darba gaita',
  'Sadarbība ar dizaineriem',
  'Mūsu sadarbība ar māksliniekiem un dizaineriem',
  'Mums ir svarīgi, lai jums izdodas, un jūsu klients ir apmierināts'
];

searchKeywords.forEach(kw => {
  const idx = content.indexOf(kw);
  if (idx !== -1) {
    console.log(`\nKW "${kw}" found at ${idx}`);
    console.log(`Context before: ${content.substring(idx - 600, idx)}`);
    console.log(`Context after: ${content.substring(idx, idx + 1800)}`);
  } else {
    console.log(`\nKW "${kw}" not found`);
  }
});
