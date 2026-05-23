import sharp from 'sharp';
import fs from 'fs';

const files = [
  'src/assets/images/Avangart_new.png',
  'src/assets/images/Logo_new.png',
  'src/assets/images/logo_clean.png',
  'src/assets/images/logo_original_perfect_1to1.png',
  'Avangart_new.png',
  'Avangart_new-1.png'
];

async function testConvert() {
  for (const f of files) {
    if (fs.existsSync(f)) {
      try {
        const metadata = await sharp(f).metadata();
        console.log(`File: ${f} -> valid, size: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);
        // Let's see if we can convert it to a test output
        const dest = `public/images/test_${f.replace(/\//g, '_')}.webp`;
        await sharp(f).webp({ quality: 90 }).toFile(dest);
        console.log(`  Successfully converted ${f} to ${dest}`);
      } catch (e: any) {
        console.error(`Error on file ${f}:`, e.message);
      }
    } else {
      console.log(`File: ${f} does not exist`);
    }
  }
}

testConvert().catch(console.error);
