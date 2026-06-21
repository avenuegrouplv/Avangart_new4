import fs from 'fs';

const content = fs.readFileSync('assets/index-CbV5ml0j.js', 'utf8');

const bergiIndex = content.indexOf('id:103,title:"Rīga. Berģi"');
if (bergiIndex !== -1) {
  console.log('--- FOUND ID 103 END SECTION ---');
  // Look 2500 characters after bergiIndex to see description, materials, year, etc.
  console.log(content.substring(bergiIndex + 1400, bergiIndex + 2500));
} else {
  console.log('ID 103 not found directly!');
}
