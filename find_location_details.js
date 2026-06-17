import fs from 'fs';

const content = fs.readFileSync('public/assets/index-CbV5ml0j-v5.js', 'utf8');

const keyIdx = content.indexOf('ok=({project:');
if (keyIdx !== -1) {
  // Find where materials, year or Location are rendered
  const detailsIdx = content.indexOf('year:', keyIdx);
  if (detailsIdx !== -1) {
    console.log('Context of details rendering in ok:');
    console.log(content.slice(detailsIdx - 1000, detailsIdx + 1500));
  } else {
    // fallback search
    console.log('year: not found, looking for materials or Latvija');
    const latvijaIdx = content.indexOf('Latvija', keyIdx);
    if (latvijaIdx !== -1) {
      console.log('Found Latvija at:', latvijaIdx);
      console.log(content.slice(latvijaIdx - 500, latvijaIdx + 500));
    }
  }
}
