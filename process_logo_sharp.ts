import sharp from 'sharp';
import fs from 'fs';

async function processLogo(inputPath: string, outputPath: string) {
  console.log(`Reading ${inputPath} with sharp...`);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const width = metadata.width;
  const height = metadata.height;
  if (!width || !height) {
    throw new Error('Could not get image dimensions');
  }
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Extract raw pixel data with alpha channel
  const { data, info } = await image
    .ensureAlpha() // Ensure there's an alpha channel (4 channels: RGBA)
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log(`Processing ${info.width}x${info.height} pixels (channels: ${info.channels})...`);
  
  // We modify the buffer in-place
  for (let idx = 0; idx < data.length; idx += 4) {
    const r = data[idx + 0];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    
    // Checkered background squares are either close to white or close to light gray and neutral in saturation
    const isNeutral = maxDiff < 15;
    const isLight = r > 160 && g > 160 && b > 160;
    
    if ((isLight && isNeutral) || (r > 235 && g > 235 && b > 235)) {
      data[idx + 3] = 0; // Set alpha to 0 (fully transparent)
    }
  }
  
  // Write the processed raw pixels back to a WebP file
  console.log(`Saving processed logo to ${outputPath}...`);
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .webp({ quality: 95 })
  .toFile(outputPath);
  
  console.log('Saved to WebP!');
}

async function main() {
  // Let's process Avangart_new.png first
  await processLogo('Avangart_new.png', 'public/images/logo.webp');
  
  // Overwrite Logo_new.webp
  fs.copyFileSync('public/images/logo.webp', 'public/images/Logo_new.webp');
  console.log('Copied logo.webp to Logo_new.webp');
}

main().catch(console.error);
