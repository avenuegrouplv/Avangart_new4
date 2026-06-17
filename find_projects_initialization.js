import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

// Find "[r,l]=Z.useState(" or something that holds the projects list state.
const sIdx = content.indexOf('localStorage.getItem("avangart-projects-list-v5"');
if (sIdx !== -1) {
  console.log('Found projects list initialization context:');
  console.log(content.slice(sIdx - 1000, sIdx + 1000));
}
