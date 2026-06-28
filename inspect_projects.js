import fs from 'fs';
const content = fs.readFileSync('public/assets/index-CbV5ml0j-v6.js', 'utf8');
const marker = '$T=';
const idx = content.indexOf(marker);
if (idx !== -1) {
  const bracketIdx = content.indexOf('[', idx);
  let depth = 0;
  let end = -1;
  for (let i = bracketIdx; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end !== -1) {
    const arrayStr = content.substring(bracketIdx, end);
    console.log("Found projects array of length:", arrayStr.length);
    fs.writeFileSync('original_projects.json', arrayStr);
    console.log("Saved original array to original_projects.json");
  } else {
    console.log("Matching bracket not found!");
  }
} else {
  console.log("Marker $T= not found!");
}
