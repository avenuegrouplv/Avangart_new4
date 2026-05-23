import AdmZip from 'adm-zip';
import fs from 'fs';

try {
  const zip = new AdmZip('inner_avangart.zip');
  const entry = zip.getEntry('avangart-main/process_logo.js');
  if (entry) {
    const data = entry.getData();
    fs.writeFileSync('process_logo.js', data);
    console.log('Extracted process_logo.js successfully!');
    console.log('--- Content of process_logo.js ---');
    console.log(data.toString('utf-8'));
  } else {
    console.log('process_logo.js not found in zip');
  }
} catch (e: any) {
  console.error(e.message);
}
