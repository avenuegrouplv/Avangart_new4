import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('category: "Biroji un komerctelpas",');
if (sIdx !== -1) {
  // Let's print project 6 definition, starting from id: 6
  const id6Idx = content.lastIndexOf('id: 6,', sIdx);
  if (id6Idx !== -1) {
    const endIdx = content.indexOf('category: "Garderobes"', sIdx);
    console.log('Project 6 block:');
    console.log(content.slice(id6Idx - 10, endIdx - 20));
  }
}
