import fs from 'fs';
import https from 'https';
import { Jimp } from 'jimp';

const url = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/Avangart_New.png';
const dest = 'logo_test.png';

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  await downloadImage(url, dest);
  const img = await Jimp.read(dest);
  console.log(`Downloaded image width: ${img.bitmap.width}, height: ${img.bitmap.height}`);
}

main().catch(console.error);
