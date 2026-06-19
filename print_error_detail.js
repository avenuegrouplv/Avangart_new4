import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const start = content.indexOf('Attēli tiek droši sagatavoti');
  const end = content.indexOf('bg-zinc-100 text-zinc-400 select-none');
  if (start !== -1 && end !== -1) {
    console.log(`=== ${file} ===`);
    console.log(content.slice(start, end + 50));
  }
});
