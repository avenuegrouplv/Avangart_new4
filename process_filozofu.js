import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import convert from 'heic-convert';

const urls = [
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1126%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1127%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1128%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1129%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1130%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1131%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1132%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1133%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1134%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1135%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1136%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1138%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1139%202.HEIC',
  'https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga.Filozofu%20rezidences/IMG_1140%202.HEIC'
];

const bundleFiles = [
  'assets/index-CbV5ml0j-v6.js',
  'assets/index-CbV5ml0j.js',
  'public/assets/index-CbV5ml0j-v6.js',
  'public/assets/index-CbV5ml0j.js'
];

const targetDir = 'public/assets/premium/filozofu';

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: status ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', err => reject(err));
  });
}

async function run() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const outputPaths = [];

  console.log(`Starting conversion of ${urls.length} HEIC files to WebP...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = `img_${String(i + 1).padStart(2, '0')}.webp`;
    const savePath = path.join(targetDir, filename);
    const relativePath = `/assets/premium/filozofu/${filename}`;

    console.log(`[${i + 1}/${urls.length}] Downloading: ${url}`);
    try {
      const buffer = await downloadImage(url);
      console.log(`  Converting to JPEG...`);
      const jpegBuffer = await convert({
        buffer: buffer,
        format: 'JPEG',
        quality: 0.95
      });
      console.log(`  Compressing to WebP...`);
      await sharp(jpegBuffer)
        .webp({ quality: 80, effort: 4 })
        .toFile(savePath);

      console.log(`  Saved to ${relativePath}`);
      outputPaths.push(relativePath);
    } catch (err) {
      console.error(`  Error processing ${url}:`, err.message);
    }
  }

  console.log('\nAll images converted successfully. Updating bundle files...');

  const imagesArrayStr = JSON.stringify(outputPaths);

  bundleFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`File ${file} not found, skipping.`);
      return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Rename "Filosofu" to "Filozofu" and "Philosophers Properties"
    // Let's replace the whole id:104 object in $T array
    const searchStr = 'id:104,title:"Rīga. Filosofu rezidences",titleEN:"Riga. Philosophers Residences",category:"PREMIUM PROJEKTI",images:[]';
    
    // Replacement string with full images array AND the spelling corrected: "Filozofu rezidences" & description updated
    const replacementStr = `id:104,title:"Rīga. Filozofu rezidences",titleEN:"Riga. Philosophers\\' Residences",category:"PREMIUM PROJEKTI",images:${imagesArrayStr},description:"Ekskluzīvs un augstvērtīgs interjera un mēbeļu dizaina projekts Filozofu rezidencēs, Rīgā. Individuāli izstrādātas mēbeles un augstākās klases iebūvētie risinājumi, kuros apvienots lakonisks modernisms ar izcilu un kvalitatīvu kokapstrādes izpildījumu.",descriptionEN:"An exclusive and premium-quality interior and furniture design project at the Philosophers\\' Residences in Riga. Featuring custom-made furniture and high-end integrated solutions combining sleek modernism with superior woodworking craftsmanship."`;

    if (content.indexOf(searchStr) !== -1) {
      content = content.replaceAll(searchStr, replacementStr);
      console.log(`[${file}] Successfully injected images and renamed "Filosofu" to "Filozofu"!`);
    } else {
      console.log(`[${file}] Search string for id:104 not found! Trying with single escape...`);
      const altSearchStr = 'id:104,title:"Rīga. Filosofu rezidences",titleEN:"Riga. Philosophers Residences",category:"PREMIUM PROJEKTI",images:[]';
      if (content.indexOf(altSearchStr) !== -1) {
        content = content.replaceAll(altSearchStr, replacementStr);
        console.log(`[${file}] Successfully replaced with alternative search string.`);
      } else {
        console.log(`[${file}] Warning: Unable to find id:104 object to replace!`);
      }
    }

    fs.writeFileSync(file, content, 'utf8');
  });

  console.log('\nProcess finished fully!');
}

run().catch(err => {
  console.error('Crash in processing script:', err);
});
