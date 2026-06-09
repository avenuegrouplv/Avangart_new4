import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const regex = /["']([^"']+\.(png|jpe?g|gif|webp|svg|ico)[^"']*)["']/gi;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[1]);
}

console.log('--- ALL IMAGES REFERENCED IN JS BUNDLE ---');
found.forEach(f => console.log(f));
