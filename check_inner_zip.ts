import fs from 'fs';
import AdmZip from 'adm-zip';

// If inner_avangart.zip doesn't exist, extract it from outer zip first
if (!fs.existsSync('inner_avangart.zip')) {
  const outerZip = new AdmZip('Avangart_new3-main.zip');
  const innerZipEntry = outerZip.getEntry('Avangart_new3-main/avangart-main(1).zip');
  if (innerZipEntry) {
    fs.writeFileSync('inner_avangart.zip', outerZip.readFile(innerZipEntry));
  }
}

const zip = new AdmZip('inner_avangart.zip');
const entries = zip.getEntries();
console.log(`Found ${entries.length} entries in inner_avangart.zip:`);
for (const entry of entries) {
  if (entry.entryName.includes('App.tsx') || entry.entryName.includes('.tsx')) {
    console.log(` - ${entry.entryName} (${entry.header.size} bytes)`);
  }
}
