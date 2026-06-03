import fs from 'fs';
import https from 'https';
import { Jimp, loadFont, measureText } from 'jimp';

const url = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/Avangart_New.png';
const tempPath = 'logo_for_og.png';
const outputPath = 'public/images/social_share_v1.png';

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download logo: ${response.statusCode}`));
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

// Custom horizontal line (macron) drawer for letters ē and ā
function drawMacron(image, cx, y, width, thickness, color) {
  const startX = Math.round(cx - width / 2);
  for (let t = 0; t < thickness; t++) {
    for (let w = 0; w < width; w++) {
      image.setPixelColor(color, startX + w, y + t);
    }
  }
}

// Custom caron/háček drawer for letter ž in Ražots
function drawCaron(image, cx, y, width, thickness, color) {
  // We span a V-shape from step 0 to step 3. 
  // Let the bottom tip of the V be at height (y).
  for (let step = 0; step <= 3; step++) {
    for (let t = 0; t < thickness; t++) {
      // Left wing
      image.setPixelColor(color, cx - step, y - 3 + step + t);
      // Right wing
      image.setPixelColor(color, cx + step, y - 3 + step + t);
    }
  }
}

async function run() {
  console.log('Downloading logo for Open Graph card...');
  await downloadImage(url, tempPath);
  console.log('Download complete.');

  console.log('Processing transparent logo...');
  const logo = await Jimp.read(tempPath);
  const lw = logo.bitmap.width;
  const lh = logo.bitmap.height;

  // Clean the checkered background
  for (let y = 0; y < lh; y++) {
    for (let x = 0; x < lw; x++) {
      const idx = (y * lw + x) * 4;
      const r = logo.bitmap.data[idx];
      const g = logo.bitmap.data[idx + 1];
      const b = logo.bitmap.data[idx + 2];

      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const diff = maxVal - minVal;

      const isCheckerboard = (r >= 210 && g >= 210 && b >= 210 && diff < 15);

      if (isCheckerboard) {
        logo.bitmap.data[idx] = 0;
        logo.bitmap.data[idx + 1] = 0;
        logo.bitmap.data[idx + 2] = 0;
        logo.bitmap.data[idx + 3] = 0; // Solid transparent
      }
    }
  }

  // Create standard Open Graph canvas: recommended 1200 x 630 pixels
  const bgW = 1200;
  const bgH = 630;
  
  console.log(`Creating premium background canvas (${bgW}x${bgH})...`);
  const canvas = new Jimp({
    width: bgW,
    height: bgH,
    color: 0xffffffff // Pure white background for maximum layout elegance
  });

  // Resize logo for the social card - make it look prominent but clean (640px width)
  const logoTargetW = 640;
  logo.resize({ w: logoTargetW });
  
  // Center logo horizontally, and place it at a high position leaving good breathing space below
  const logoX = Math.round((bgW - logoTargetW) / 2);
  const logoY = Math.round((bgH - logo.bitmap.height) / 2) - 35;

  console.log('Compositing logo onto background...');
  canvas.composite(logo, logoX, logoY);

  // Load the FONT_SANS_32_BLACK font from local node_modules
  const fontPath = 'node_modules/@jimp/plugin-print/fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt';
  console.log(`Loading Jimp Font from ${fontPath}...`);
  const font = await loadFont(fontPath);
  
  // Use compatible ASCII chars with beautiful middledot `·` separator (id=183 is supported in XML!)
  const textString = 'Mebeles  ·  Razots Latvija  ·  Roku darbs';
  
  // Calculate text dimensions to center it horizontally
  const textWidth = measureText(font, textString);
  const textStartX = Math.round((bgW - textWidth) / 2);
  const textY = logoY + logo.bitmap.height + 55;
  
  console.log(`Printing base text at X: ${textStartX}, Y: ${textY}...`);
  canvas.print({
    font: font,
    x: textStartX,
    y: textY,
    text: textString
  });

  // Now draw mathematically calculated accents for Latvian letters:
  // Color code for black text elements: 0x18181bFF (deep rich charcoal/black)
  const textColorValue = 0x111111ff;

  // Let's compute exact position helper
  const getCharCenter = (charIndex) => {
    const prefix = textString.slice(0, charIndex);
    const prefixW = measureText(font, prefix);
    const charW = measureText(font, textString[charIndex]);
    const charLeftX = textStartX + prefixW;
    return charLeftX + (charW / 2);
  };

  // 1. "e" in "Mebeles" (index 1) -> Macron for: ē
  const eIndex = 1;
  const eCenter = getCharCenter(eIndex);
  // Place macron around 8px above lowercase letter base level
  const eMacronY = textY + 9; 
  console.log(`Drawing macron (ē) at center X: ${eCenter}, Y: ${eMacronY}`);
  drawMacron(canvas, eCenter, eMacronY, 12, 2, textColorValue);

  // 2. "z" in "Razots" (index 14) -> Caron (V-shape) for: ž
  const zIndex = 14;
  const zCenter = getCharCenter(zIndex);
  const zCaronY = textY + 9;
  console.log(`Drawing caron (ž) at center X: ${zCenter}, Y: ${zCaronY}`);
  drawCaron(canvas, zCenter, zCaronY, 8, 2, textColorValue);

  // 3. "a" in "Latvija" (index 29) -> Macron for: ā
  const aIndex = 29;
  const aCenter = getCharCenter(aIndex);
  const aMacronY = textY + 9;
  console.log(`Drawing macron (ā) at center X: ${aCenter}, Y: ${aMacronY}`);
  drawMacron(canvas, aCenter, aMacronY, 12, 2, textColorValue);

  // Create directory if not exists
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  console.log(`Writing social share image to ${outputPath}...`);
  await canvas.write(outputPath);
  
  // Also write to dist/images to make sure it's immediately available during netlify copies
  if (!fs.existsSync('dist/images')) {
    fs.mkdirSync('dist/images', { recursive: true });
  }
  await canvas.write('dist/images/social_share_v1.png');

  console.log('Removing temp raw download...');
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }

  console.log('🎉 HIGH CONTRST LATVIAN SOCIAL PREVIEW BANNER GENERATED PERFECTLY!');
}

run().catch(err => {
  console.error('PREVIEW GENERATOR CRITICAL ERROR:', err);
  process.exit(1);
});
