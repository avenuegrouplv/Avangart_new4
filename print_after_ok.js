import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const sIdx = content.indexOf('ok=({project:');
if (sIdx !== -1) {
  console.log("--- PART 9600-11600 ---");
  console.log(content.slice(sIdx + 9600, sIdx + 11600));
} else {
  console.log("ok not found");
}
