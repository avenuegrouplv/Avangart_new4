import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Let's replace the invalid ternaries
  content = content.replace('Attēli tiek droši sagatavoti"})]})]})::u.jsx("div"', 'Attēli tiek droši sagatavoti"})]})]}):u.jsx("div"');
  content = content.replace('Attēli tiek droši sagatavoti"})]})]}):):u.jsx("div"', 'Attēli tiek droši sagatavoti"})]})]}):u.jsx("div"');

  // Let's replace the typo "opacity-50Y" with "opacity-50" just in case it is a typo in both!
  content = content.replace('opacity-50Y', 'opacity-50');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
