import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  console.log("=== STARTING WEB CONVERSION OF UPLOADED IMAGES ===");
  
  // 1. Ensure target directory exists
  const targetDir = 'public/images/premium/jurmala';
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 2. Clear old files in yurmala directory to avoid leftovers
  const oldFiles = fs.readdirSync(targetDir);
  for (const f of oldFiles) {
    fs.unlinkSync(path.join(targetDir, f));
  }
  console.log("Cleared old files from target directory:", targetDir);

  // 3. Find files matching uploaded image pattern
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith('img_') && f.endsWith('.jpg'))
    .sort(); // sort alphabetically

  console.log("Found uploaded files:", files);

  if (files.length === 0) {
    console.error("No uploaded files starting with img_ and ending with .jpg were found remaining at the root!");
    return;
  }

  // 4. Convert each file to webp
  for (let i = 0; i < files.length; i++) {
    const srcFile = files[i];
    const index = i + 1;
    const destName = `${index}.webp`;
    const destPath = path.join(targetDir, destName);

    console.log(`Converting [${index}/${files.length}] ${srcFile} to ${destPath}...`);
    try {
      await sharp(srcFile)
        .webp({ quality: 90, effort: 4 })
        .toFile(destPath);
      console.log(`  -> Saved ${destPath} successfully!`);
    } catch (err) {
      console.error(`  -> ERROR converting ${srcFile}:`, err);
    }
  }

  console.log("=== WEBP CONVERSION SUCCESSFUL AND COMPLETED ===");
}

main().catch(err => {
  console.error("Unhandled error in main:", err);
});
