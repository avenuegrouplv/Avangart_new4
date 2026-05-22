import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Jimp } = require('jimp');

async function main() {
  console.log("Reading logo from URL...");
  const image = await Jimp.read('https://pub-48235835e18a4f87b5cf7fb2a1bca3b5.r2.dev/Avangart.png');
  
  console.log(`Processing pixels for image size ${image.width}x${image.height}...`);
  
  // Scan all pixels
  image.scan(0, 0, image.width, image.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    // The checkered background squares are either close to white or close to light gray and neutral in saturation
    const isNeutral = maxDiff < 15;
    const isLight = r > 160 && g > 160 && b > 160;
    
    if (isLight && isNeutral) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (fully transparent)
    } else if (r > 235 && g > 235 && b > 235) {
      // Catch near white backgrounds
      this.bitmap.data[idx + 3] = 0;
    }
  });

  console.log("Writing processed logo to ./src/assets/images/logo_clean.png...");
  await image.write('./src/assets/images/logo_clean.png');
  console.log("Completed logo cleanup perfectly!");
}

main().catch(console.error);
