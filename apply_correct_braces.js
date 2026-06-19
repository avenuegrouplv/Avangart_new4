import fs from 'fs';

const files = [
  'public/assets/index-CbV5ml0j-v5.js',
  'public/assets/index-CbV5ml0j.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace whatever ending brackets currently exist after setErrSrcs with the perfectly verified minified string
  // The current in-file string has: setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);
  // We want to replace it with: setErrSrcs(prev=>({...prev,[src]:true}))}})})}},[d,a.images]);
  
  content = content.replace(
    'setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);',
    'setErrSrcs(prev=>({...prev,[src]:true}))}})})}},[d,a.images]);'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully fixed braces in ${file}`);
});
