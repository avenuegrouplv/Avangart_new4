import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

try {
  const zip = new AdmZip('inner_avangart.zip');
  
  const filesToExtract = [
    { zipPath: 'avangart-main/src/assets/images/logo_clean.png', localPath: 'src/assets/images/logo_clean.png' },
    { zipPath: 'avangart-main/src/assets/images/Logo_new.png', localPath: 'src/assets/images/Logo_new.png' },
    { zipPath: 'avangart-main/src/assets/images/logo_original_perfect_1to1.png', localPath: 'src/assets/images/logo_original_perfect_1to1.png' }
  ];
  
  for (const item of filesToExtract) {
    const entry = zip.getEntry(item.zipPath);
    if (entry) {
      const data = entry.getData();
      fs.mkdirSync(path.dirname(item.localPath), { recursive: true });
      fs.writeFileSync(item.localPath, data);
      console.log(`Extracted ${item.zipPath} to ${item.localPath} (${data.length} bytes)`);
    } else {
      console.error(`Could not find entry ${item.zipPath} in zip`);
    }
  }
} catch (e: any) {
  console.error(e.message);
}
