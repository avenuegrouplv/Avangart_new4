import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import sharp from 'sharp';

const jsFiles = ['assets/index-CbV5ml0j.js', 'assets/index-CbV5ml0j-v6.js'];

console.log("Converting custom process steps and logo...");
const customImages = [
  { src: 'Avangart-new.png', dest: 'images/logo/Avangart-new.webp' },
  { src: 'Tehniskais-projekts.png', dest: 'images/tehniskais-projekts/img_01.webp', fallback: 'Tehniskais-projekts-1.png' },
  { src: 'Razosanas-darbnica.png', dest: 'images/razosana-darbnica/img_01.webp', fallback: 'Razosanas-darbnica-1.png' },
  { src: 'Piegade-montaza-garantija.jpeg', dest: 'images/piegade-montaza-garantija/img_01.webp', fallback: 'Piegade-montaza-garantija-1.jpeg' }
];

for (const item of customImages) {
  let sourceFile = item.src;
  if (!fs.existsSync(sourceFile) && item.fallback && fs.existsSync(item.fallback)) {
    sourceFile = item.fallback;
  }
  if (fs.existsSync(sourceFile)) {
    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    console.log(`Converting custom image ${sourceFile} to ${item.dest}...`);
    try {
      let pipeline = sharp(sourceFile);
      if (item.dest !== 'images/logo/Avangart-new.webp') {
        // High quality web resize: max width 1400px keeping aspect ratio
        pipeline = pipeline.resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true });
      }
      await pipeline
        .webp({ quality: 80 })
        .toFile(item.dest);
      fs.unlinkSync(sourceFile);
    } catch (err) {
      console.error(`Error converting ${sourceFile}:`, err);
    }
  } else {
    console.log(`Source file ${item.src} (or fallback) does not exist, skipping.`);
  }
}

async function optimizeWebpInDirectory(dirPath, maxWidth = 1400) {
  if (!fs.existsSync(dirPath)) return;
  console.log(`Checking directory for WebP optimization: ${dirPath}`);
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.webp')) {
      const filePath = path.join(dirPath, file);
      try {
        const stats = fs.statSync(filePath);
        // Optimize if larger than 120KB
        if (stats.size > 120 * 1024) {
          console.log(`Optimizing large webp image: ${filePath} (${Math.round(stats.size/1024)} KB)`);
          const buffer = await sharp(filePath)
            .resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();
          fs.writeFileSync(filePath, buffer);
          const newStats = fs.statSync(filePath);
          console.log(`Optimized ${filePath} to ${Math.round(newStats.size/1024)} KB`);
        }
      } catch (err) {
        console.error(`Error optimizing ${filePath}:`, err);
      }
    }
  }
}

// Automatically optimize the directories of interest
await optimizeWebpInDirectory('images/premium/filozofu', 1400);
await optimizeWebpInDirectory('images/tehniskais-projekts', 1400);
await optimizeWebpInDirectory('images/razosana-darbnica', 1400);
await optimizeWebpInDirectory('images/piegade-montaza-garantija', 1400);

// Logo background transparency cleaning
const logoPath = 'images/logo/Avangart-new.webp';
if (fs.existsSync(logoPath)) {
  console.log("Cleaning logo background checkers and converting to true transparent WebP...");
  try {
    const logoImage = sharp(logoPath);
    const { data, info } = await logoImage.raw().toBuffer({ resolveWithObject: true });
    
    console.log(`Logo properties: ${info.width}x${info.height}, channels: ${info.channels}`);
    
    // Analyze colors to find background checkers
    const counts = {};
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      const a = info.channels === 4 ? data[i+3] : 255;
      const key = `${r},${g},${b},${a}`;
      counts[key] = (counts[key] || 0) + 1;
    }
    const topColors = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 25);
    fs.writeFileSync('logo_colors.txt', JSON.stringify(topColors, null, 2), 'utf8');
    console.log("Logo Top Colors logged with Alpha");

    // Search and log how the logo is rendered in JS files
    const logoUsage = [];
    const logoCalls = [];
    for (const file of jsFiles) {
      if (fs.existsSync(file)) {
        const fileContent = fs.readFileSync(file, 'utf8');
        const match = fileContent.match(/.{0,150}AVANGART logo.{0,150}/g);
        if (match) {
          logoUsage.push(`--- File: ${file} ---`);
          logoUsage.push(...match);
        }
        
        // Find component calls of Rv
        const calls = fileContent.match(/.{0,100}Rv\(.{0,100}/g) || fileContent.match(/.{0,100}u\.jsx\(Rv,.{0,100}/g);
        if (calls) {
          logoCalls.push(`--- File: ${file} ---`);
          logoCalls.push(...calls);
        }
      }
    }
    fs.writeFileSync('logo_usage.txt', logoUsage.join('\n'), 'utf8');
    fs.writeFileSync('logo_call.txt', logoCalls.join('\n'), 'utf8');
    console.log("Logged logo usage and calls");

    // Create transparent buffer (4 channels: RGBA)
    const outBuffer = Buffer.alloc(info.width * info.height * 4);
    let cleanedCount = 0;
    
    for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      const a = info.channels === 4 ? data[i+3] : 255;
      
      // A pixel is background if it is light grey or white (checkered pattern)
      // Checkers are usually neutral grey/white, i.e., r, g, b are close and all above 150
      const intensity = (r + g + b) / 3;
      const isChecker = intensity > 150;
      
      if (isChecker || a < 50) {
        // Transparent
        outBuffer[j] = 0;
        outBuffer[j+1] = 0;
        outBuffer[j+2] = 0;
        outBuffer[j+3] = 0;
        cleanedCount++;
      } else {
        // Keep original pixel but make sure it is fully opaque
        outBuffer[j] = r;
        outBuffer[j+1] = g;
        outBuffer[j+2] = b;
        outBuffer[j+3] = 255;
      }
    }
    
    console.log(`Cleaned ${cleanedCount} background pixels out of ${info.width * info.height} total pixels.`);
    
    // Save back the transparent image
    const tempLogoPath = 'images/logo/Avangart-new-clean.webp';
    await sharp(outBuffer, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .webp({ quality: 95 })
    .toFile(tempLogoPath);
    
    // Replace old logo with transparent logo
    fs.unlinkSync(logoPath);
    fs.renameSync(tempLogoPath, logoPath);
    console.log("Logo background cleaned successfully and saved.");

    // Generate ultimate premium favicon set from the transparent logo
    console.log("Generating premium favicon set from the cleaned logo...");
    const faviconBase = sharp(logoPath);
    const pubDir = 'public';
    if (!fs.existsSync(pubDir)) {
      fs.mkdirSync(pubDir, { recursive: true });
    }
    await faviconBase.clone().resize(32, 32).webp({ quality: 90 }).toFile(path.join(pubDir, 'favicon.webp'));
    await faviconBase.clone().resize(32, 32).png().toFile(path.join(pubDir, 'favicon.png'));
    await faviconBase.clone().resize(48, 48).png().toFile(path.join(pubDir, 'favicon-48.png'));
    await faviconBase.clone().resize(192, 192).png().toFile(path.join(pubDir, 'favicon-192.png'));
    fs.copyFileSync(path.join(pubDir, 'favicon.png'), path.join(pubDir, 'favicon.ico'));
    console.log("Favicon set generated successfully in public/.");
  } catch (err) {
    console.error("Error cleaning logo background:", err);
  }
}


console.log("Converting source JPG images to WebP...");
const targetDir = path.join('images', 'premium', 'Jūrmala. Dizaina elementi');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const sourceImages = [
  'img_0904_50314148253_l.jpg',
  'img_0913_50314997062_l.jpg',
  'img_0922_50314996792_l.jpg',
  'img_0927_50314996627_l.jpg',
  'img_0932_50314996407_l.jpg',
  'img_0937_50314147088_l.jpg',
  'img_0943_50314146858_l.jpg',
  'img_0946_50314817201_l.jpg',
  'img_0947_50314816941_l.jpg',
  'img_0953_50314994932_l.jpg',
  'img_0958_50314994662_l.jpg',
  'img_0963_50314997547_l.jpg'
];

for (let i = 0; i < sourceImages.length; i++) {
  const filename = sourceImages[i];
  const sourcePath = path.join('.', filename);
  const indexStr = String(i + 1).padStart(2, '0');
  const destPath = path.join(targetDir, `img_${indexStr}.webp`);

  if (fs.existsSync(sourcePath)) {
    console.log(`Converting ${filename} to ${destPath}...`);
    try {
      await sharp(sourcePath)
        .webp({ quality: 85 })
        .toFile(destPath);
      fs.unlinkSync(sourcePath);
    } catch (err) {
      console.error(`Error converting ${filename}:`, err);
    }
  }
}

function moveAndRenameProject(content) {
  // Finds the "$T=" marker and replaces the entire following bracketed array with the newProjectsArray.
  const marker = '$T=';
  const markerIndex = content.indexOf(marker);
  if (markerIndex === -1) {
    console.log("Could not find $T= in content");
    return content;
  }

  // Find the first '[' after '$T='
  const firstBracketIndex = content.indexOf('[', markerIndex);
  if (firstBracketIndex === -1) {
    console.log("Could not find '[' after $T=");
    return content;
  }

  // Count brackets to find the matching ']'
  let bracketCount = 0;
  let endIndex = -1;
  for (let i = firstBracketIndex; i < content.length; i++) {
    if (content[i] === '[') {
      bracketCount++;
    } else if (content[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }

  if (endIndex === -1) {
    console.log("Could not find matching closing bracket via counting, attempting fallback search for ,RT=");
    const rtMarker = ',RT=';
    const rtIndex = content.indexOf(rtMarker, firstBracketIndex);
    if (rtIndex !== -1) {
      endIndex = rtIndex;
    }
  }

  if (endIndex === -1) {
    console.log("Could not find matching closing bracket for the array starting after $T=");
    return content;
  }

  const newProjectsArray = `[
  {
    id: 101,
    title: "Jūrmala. Dzintaru prospekts",
    titleEN: "Jurmala. Dzintaru Avenue",
    category: "PREMIUM PROJEKTI",
    images: [
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0904_50314148253_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0913_50314997062_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0922_50314996792_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0927_50314996627_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0932_50314996407_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0937_50314147088_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0943_50314146858_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0946_50314817201_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0947_50314816941_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0953_50314994932_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0958_50314994662_l.jpg",
      "https://pub-49ac8e2ba233437c8bf8122564d7997c.r2.dev/img_0963_50314997547_l.jpg"
    ],
    description: "Premium līmeņa interjera iekārtojums un mēbeles ekskluzīvā projektā Dzintaru prospektā, Jūrmalā. Individuāli izstrādāti dizaina risinājumi, kuros apvienots augstākās klases kokapstrādes izpildījums ar modernu un elegantu funkcionalitāti – no harmoniskas bērnistabas un izsmalcinātas dzīvojamās telpas līdz perfekti pārdomātai virtuvei, luksusa guļamistabai un kamīna zonai ar slēptajām durvīm.",
    descriptionEN: "Premium level interior design and bespoke furniture in an exclusive project on Dzintaru Avenue, Jurmala. Individually crafted design solutions combining top-class woodcraft execution with modern and elegant functionality – from a harmonious kids room and sophisticated living space to a perfectly planned kitchen, high-end master bedroom, and fireplace area with hidden doors.",
    materials: "Premium ozola finierējums, tonēts dabīgais ozols, ekskluzīvas auduma tekstūras, iebūvēts LED apgaismojums, premium furnitūra",
    materialsEN: "Premium oak veneer, tinted natural oak, exclusive fabric textures, integrated LED lighting, premium hardware",
    location: "Jūrmala",
    locationEN: "Jurmala",
    year: "2025"
  },

  {
    id: 102,
    title: "Rīga. Kuģu iela",
    titleEN: "Riga. Kugu Street",
    category: "PREMIUM PROJEKTI",
    images: [
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/2a7de5a5-d96c-4cbb-a530-fcfd562ab5b5%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/0a51ba85-c6f2-4aa2-a294-647d00f6a215.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/2b3c0404-28fb-4856-a511-effebfb8249b.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/2f75068c-4eaa-40fd-9b15-9d2f895c1a52.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/3041b52b-e6a8-4c74-8dff-69e692e29a94%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/3827fca1-9ca8-422c-91df-06d8cb2e7987.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/3a04ce85-da00-4735-b909-5fc0f7276f09%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/415b4547-ea6a-4c1b-8dd8-d0910eededc9%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/4e17e7f4-a63f-4512-a7ae-cb8884232a70.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/5b59ab4f-ee78-4d45-8deb-57cac289e2c7.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/622176ed-32e3-458b-acda-f8911d11a83b.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/6b6e628a-9b26-4a07-97ff-f02b61b82a11.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/6ecb00e5-3174-4f10-beef-ffd5ca643df3%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/b95ed618-9487-46a3-a8b9-21f66076b3d0%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/b9611c80-1025-4e88-ab92-9069f1635f3f%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/b9cc0004-0686-49b3-af0a-2e9b4a4cf631%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/c884e5ce-92ed-4508-8183-5ae19a679efa.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/ca4e3e34-a6a9-483c-b3a8-7035b3b0a06f%202.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/e4350976-7284-47b3-9262-e158980d8dd3.JPG",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_Ri%CC%84ga%20Kug%CC%A7u%20iela/f8f73c65-7c1f-4e89-a44a-7589eaccd0c4%202.JPG"
    ],
    description: "Jauns un ekskluzīvs mēbeļu dizaina un interjera projekts Klīversalā, Kuģu ielā, Rīgā. Augstākās klases integrētie risinājumi un eleganta estētika, kas radīta saskaņā ar unikālām arhitektūras līnijām.",
    descriptionEN: "A new and exclusive bespoke furniture design and interior project on Kugu Street, Riga. Featuring top-class integrated solutions and elegant aesthetics, crafted to match unique architectural lines.",
    materials: "Premium ozola un oša masīvkoks, ekskluzīva furnitūra, lakotas un krāsotas apdares",
    materialsEN: "Premium solid oak and ash, high-end hardware, custom lacquered and painted finishes",
    location: "Rīga, Kuģu iela",
    locationEN: "Riga, Kugu Street",
    year: "2025"
  },
  {
    id: 103,
    title: "Rīga. Berģi",
    titleEN: "Riga. Bergi",
    category: "PREMIUM PROJEKTI",
    images: [
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-10_49627034747_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-11_49627034622_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-12_49626761426_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-13_49627034347_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-14_49627034277_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-15_49627034152_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-16_49626760956_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-17_49626760791_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-18_49626760676_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-19_49626242138_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-1_49626244208_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-20_49627033677_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-21_49626241973_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-22_49627033452_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-23_49627033327_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-24_49626759936_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-25_49626241543_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-26_49626759711_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-27_49626241283_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-28_49626241153_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-29_49627032562_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-2_49626244023_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-30_49626240953_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-31_49627032372_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-32_49626758736_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-3_49626243888_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-4_49626762351_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-5_49626762201_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-6_49626762056_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-7_49626761941_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-8_49627034972_l.jpg",
      "https://pub-ba9eeea950024162b62a9badee82f816.r2.dev/Premium_R%C4%ABga%20Ber%C4%A3i/bergi-classic-9_49626243248_l.jpg"
    ],
    description: "Jauna ekskluzīva interjera projekta izstrāde Berģos, Rīgā. Tiek gatavots augstākās klases guļamistabas, iebūvējamo mēbeļu un ekskluzīvu apdares risinājumu kopums. Attēli un detalizētāka informācija par izpildīto darbu tiek pakāpeniski papildināta.",
    descriptionEN: "Development of a new exclusive interior project in Bergi, Riga. A collection of high-end bedrooms, built-in furniture, and exclusive finishing solutions is being prepared. Images and detailed information about the completed work will be added soon.",
    materials: "Ozols, premium dizaina detaļas, iebūvēti gaismas elementi",
    materialsEN: "Oak, premium design details, integrated light elements",
    location: "Rīga",
    locationEN: "Riga",
    year: "2025"
  },
  {
    id: 104,
    title: "Rīga. Filozofu rezidences",
    titleEN: "Riga. Philosophers' Residences",
    category: "PREMIUM PROJEKTI",
    images: [
      "/images/premium/filozofu/img_01.webp",
      "/images/premium/filozofu/img_02.webp",
      "/images/premium/filozofu/img_03.webp",
      "/images/premium/filozofu/img_04.webp",
      "/images/premium/filozofu/img_05.webp",
      "/images/premium/filozofu/img_06.webp",
      "/images/premium/filozofu/img_07.webp",
      "/images/premium/filozofu/img_08.webp",
      "/images/premium/filozofu/img_09.webp",
      "/images/premium/filozofu/img_10.webp",
      "/images/premium/filozofu/img_11.webp",
      "/images/premium/filozofu/img_12.webp",
      "/images/premium/filozofu/img_13.webp",
      "/images/premium/filozofu/img_14.webp"
    ],
    description: "Ekskluzīvs un augstvērtīgs interjera un mēbeļu dizaina projekts Filozofu rezidencēs, Rīgā. Individuāli izstrādātas mēbeles un augstākās klases iebūvētie risinājumi, kuros apvienots lakonisks modernisms ar izcilu un kvalitatīvu kokapstrādes izpildījumu.",
    descriptionEN: "An exclusive and premium-quality interior and furniture design project at the Philosophers' Residences in Riga. Featuring custom-made furniture and high-end integrated solutions combining sleek modernism with superior woodworking craftsmanship.",
    materials: "Ekskluzīvs ozola finierējums, dizaina elementi, integrēts LED apgaismojums",
    materialsEN: "Exclusive oak veneer, design elements, integrated LED lighting",
    location: "Rīga",
    locationEN: "Riga",
    year: "2025"
  },
  {
    id: 1,
    title: "Individuālas masīvkoka kāpnes privātmājā",
    titleEN: "Bespoke solid oak stairs in a private home",
    category: "Kāpnes",
    images: [OT, Av, HT, LT, GT, UT],
    description: "Projektētas un uzstādītas modernas masīvkoka kāpnes privātmājā Mārupē. Tās ir izgatavotas no atlasīta, augstas kvalitātes ozola, kas apstrādāts ar nodilumizturīgu dabīgo aizsargeļļu. Konstrukcija ir rūpīgi izstrādāta, lai nodrošinātu maksimālu izturību un drošību, lieliski iekļaujoties mājas koptēlā.",
    descriptionEN: "Designed and installed modern solid wood stairs in a private home in Mārupe. Crafted from select, high-quality oak treated with a durable protective natural oil. The structure is carefully designed to ensure maximum durability and safety, fitting perfectly into the overall home design.",
    materials: "Masīvs ozols",
    materialsEN: "Solid oak",
    year: "2024"
  },
  {
    id: 2,
    title: "Iebūvētās mēbeles",
    titleEN: "Built-in furniture",
    category: "Virtuves", images: [qT, YT],
    description: "Iebūvētā virtuves iekārta izstrādāta divstāvu privātmājā Babītē. Tajā izmantotas dabīgā ozola fasādes ar saskaņotu koksnes tekstūru un eleganta akmens darba virsma. Koka detaļas ir tonētas siltā smilšu tonī un lakotas ar ekoloģisku, ūdens bāzes matēto laku. Aprīkota ar pilnībā integrētu Blum klusās aizvēršanas furnitūru un slēpto LED apgaismojumu darba virsmām.",
    descriptionEN: "A built-in kitchen set designed for a two-story private home in Babīte. It features natural oak facades with matched wood grain and an elegant stone worktop. Wooden details are tinted in a warm sand tone and varnished with an eco-friendly water-friendly water-based matte lacquer. Equipped with integrated Blum soft-close hardware and hidden countertop LED lighting.",
    materials: "Ozols, akmens virsma",
    materialsEN: "Oak, stone surface",
    year: "2024"
  },
  {
    id: 3,
    title: "TV apdare un mediju siena dzīvojamā istabā",
    titleEN: "TV wall wood cladding and media unit in living room",
    category: "Dzīvojamās istabas",
    images: [Cv, QT],
    description: "Mūsdienīga TV apdare, kas izgatavota dzīvoklim Rīgas centrā. Korpuss izstrādāts no premium ozola finierējuma, bet fasādes veidotas no smalki rievota masīvkoka profilējuma, kas tonēts ar pelēko eļļas vasku. Mēbelē iestrādāti slēptie kabeļu kanāli un integrēta silta, dimmējama LED fona gaisma izsmalcinātam un mājīgam interjera akcentam.",
    descriptionEN: "A modern TV wall wood cladding and media unit crafted for an apartment in the center of Rīga. The body is built with premium oak veneer, while the facades feature finely ribbed solid wood profiles treated with grey oil wax. Features integrated cable routing channels and warm, dimmable LED backlight accents.",
    materials: "Masīvs ozols, LED",
    materialsEN: "Solid oak, LED",
    year: "2025"
  },
  {
    id: 4,
    title: "Portfolio 1",
    titleEN: "Portfolio 1",
    category: "Bērnistabas", images: [],
    description: "Bērnistabas mēbeļu komplekts privātmājai Ādažos. Gultas rāmis un pie sienas montētie naktsskapīši izgatavoti no īpaši atlasītiem ozolkoka dēļiem, kas pulēti ar dabīgo vasku. Galvgalis apvilkts ar nodilumizturīgu dabisko lina maisauduma tekstilu. Pie sienas montētie naktsskapīši rada gaisīgu un modernu efektu telpā.",
    descriptionEN: "A kids room furniture collection for a private house in Ādaži. The bed frame and wall-mounted bedside tables are made of specially selected oak planks polished with natural wax. The headboard is upholstered in highly durable natural linen textile. The wall-mounted bedside tables create a light and modern feel in the space.",
    materials: "Ozols, tekstils",
    materialsEN: "Oak, textile",
    year: "2025"
  },
  {
    id: 5,
    title: "Mitrumizturīgas ozolkoka vannas istabas mēbeles",
    titleEN: "Humidity-resistant oak bathroom furniture",
    category: "Vannas istabas",
    images: [Dv, FT, _T],
    description: "Izsmalcināts vannas istabas mēbeļu komplekts, kas izgatavots no speciāli apstrādāta mitrumizturīga masīvā ozolkoka, kas aizsargāts ar speciālu eļļu. Komplektā ietilpst atvilktņu un durvju konsoles komplekts ar izlietni un spoguli, kurā iestrādāts slēpts LED aizmugures apgaismojums.",
    descriptionEN: "A sophisticated master bathroom furniture set crafted from custom-treated humidity-resistant solid oak, sealed with premium protective oil. The set features a drawer and door vanity console with a sink and a matching mirror with integrated hidden LED backlighting.",
    materials: "Mitrumizturīgs ozols, LED",
    materialsEN: "Moisture-resistant oak, LED",
    year: "2024"
  },
  {
    id: 6,
    title: "Biroju un komerctelpu mēbeles un apdare",
    titleEN: "Office & Commercial Woodwork & Fit-out",
    category: "Biroji un komerctelpas",
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_room_white_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_room_white_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_5.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_5.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_6.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_7.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Zunda_1%20copy.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_private_grey_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_desk_white_1.webp"
    ],
    description: "Projektējam un uzstādām premium sabiedrisko telpu apdari, recepcijas letes, ekskluzīvus darbgaldus un augstākās klases biroju mēbeļu sistēmas.",
    descriptionEN: "We design and install premium public space wood fittings, reception counters, exclusive desks, and custom high-end office furniture systems structured for business.",
    materials: "Masīvkoks, finierējums, metāls",
    materialsEN: "Solid wood, oak veneer, metal profiles",
    year: "2025"
  },
  {
    id: 7,
    title: "Portfolio 1",
    titleEN: "Portfolio 1",
    category: "Garderobes",
    images: [],
    description: "Individuāli projektētas, plašas garderobes un bīdāmie skapji ar augstākās klases bīdāmiem mehānismiem, integrētiem plauktiem un LED profilu apgaismojumu.",
    descriptionEN: "Individually planned spacious walk-in closets and built-in wardrobes with premium soft-close sliding hardware, optimized shelves, and integrated LED fixtures.",
    materials: "Dabīgais ozols, LED, premium furnitūra",
    materialsEN: "Natural oak structure, LED fittings, premium runners",
    year: "2025"
  },
  {
    id: 8,
    title: "Portfolio 1",
    titleEN: "Portfolio 1",
    category: "Durvis",
    images: [],
    description: "Pēc mēra ražotas no masīva ozola, oša vai priedes iekšdurvis un drošas, termoizolētas ārdurvis ar dizaina stiklojumu un moderniem rokturiem.",
    descriptionEN: "Bespoke interior and highly secure, insulated exterior doors crafted from solid oak, ash, or pine with designer glazing and designer hardware integrations.",
    materials: "Atlasīts masīvkoks",
    materialsEN: "Select solid wood",
    year: "2025"
  },
  {
    id: 9,
    title: "Portfolio 1",
    titleEN: "Portfolio 1",
    category: "Dizaina priekšmeti",
    images: [],
    description: "Dizaina virtuves galdi, žurnālgaldiņi, dizaina krēsli un citi unikāli tēlotājmākslas vai funkcionāli priekšmeti, kas piešķir mājai izsmalcinātību.",
    descriptionEN: "Statement dining tables, coffee tables, tailored chairs, and other uniquely crafted artistic or functional furniture pieces that elevate your space.",
    materials: "Masīvs kūdrājs, relikvijas ozols, eļļa",
    materialsEN: "Bog oak, ancient prime oak, oil finish",
    year: "2025"
  },
  {
    id: 10,
    title: "Portfolio 1",
    titleEN: "Portfolio 1",
    category: "Dizaina elementi",
    images: [],
    description: "Koka akustiskie sienu paneļi, dekoratīvās starpsienas, telpu sadalītāji un griestu sijas grezna arhitektoniska plašuma un siltuma sajūtai telpā.",
    descriptionEN: "Acoustic wood wall paneling systems, decorative spatial dividers, custom partitions, and ceiling beams for achieving luxurious scale and warmth.",
    materials: "Rievots ozola finieris, slēptais LED",
    materialsEN: "Hand-finished ribbed oak, recessed LED",
    year: "2025"
  }
]`;

  return content.substring(0, firstBracketIndex) + newProjectsArray + content.substring(endIndex);
}

// Pre-calculate 600px optimized Base64 PNG logo string for Netlify & instant loading
const logoBase64 = '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';
for (const file of jsFiles) {
  const sourceTemplate = path.join('public', file);
  if (fs.existsSync(sourceTemplate)) {
    console.log(`Restoring clean template ${sourceTemplate} to ${file}...`);
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(sourceTemplate, file);
  }

  if (fs.existsSync(file)) {
    console.log(`Updating paths and logo in ${file}...`);
    let content = fs.readFileSync(file, 'utf8');

    // Replace window.location.hash with our clean pathname polyfill
    content = content.replace(/window\.location\.hash/g, 'window.LocationRoute.hash');

    // Run the project array updater/sync step
    content = moveAndRenameProject(content);

    // Replace step-by-step process image URLs directly with local optimized WebP paths
    content = content.replace(/https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/consultation_meeting\.webp/g, '/images/consultation-meeting/img_01.webp');
    content = content.replace(/https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_design\.webp/g, '/images/tehniskais-projekts/img_01.webp');
    content = content.replace(/https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/furniture_crafting\.webp/g, '/images/razosana-darbnica/img_01.webp');
    content = content.replace(/https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_installation\.webp/g, '/images/piegade-montaza-garantija/img_01.webp');

    // Optimize Hero (LCP) image loading by injecting high fetchPriority and async decoding
    content = content.replace('src:RT,alt:"Avangart mākslas un kāpņu dizains",className:"w-full h-full object-cover opacity-85",referrerPolicy:"no-referrer",loading:"eager"', 'src:RT,alt:"Avangart mākslas un kāpņu dizains",className:"w-full h-full object-cover opacity-85",referrerPolicy:"no-referrer",loading:"eager",fetchPriority:"high",decoding:"async"');

    // Replace the base64 logo string with optimized Base64 PNG string for Netlify
    content = content.replace(/ak="data:image\/png;base64,[^"]*"/g, `ak="data:image/png;base64,${logoBase64}"`);

    // Replace Zoom/Lightbox full thumbnails list with sliding 9-thumbnails window with fifth-index centering
    const targetString = 'a.images.map((V,H)=>u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-brand-orange ring-1 ring-brand-orange scale-105 opacity-100":"border-white/20 opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},H))';
    const replacementString = 'Array.from({length:9}).map((_,s)=>{const startIdx=a.images.length>9?Math.max(0,Math.min(d-3,a.images.length-9)):0;const H=startIdx+s;const V=H<a.images.length?a.images[H]:null;return V?u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-[2px] border-brand-orange ring-2 ring-brand-orange/80 scale-110 opacity-100 z-10 shadow-lg":"border-transparent opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},s):null})';
    content = content.split(targetString).join(replacementString);

    // 2. Fix the active thumbnail border in the Portfolio page to match the cards
    const thumbTarget = 'd===H?"border-[3px] border-brand-orange ring-4 ring-brand-orange/40 scale-[1.08] opacity-100 z-10 shadow-lg":"border-zinc-200 opacity-65 hover:opacity-100 shadow-sm"';
    const thumbReplacement = 'd===H?"active-gallery-thumbnail opacity-100 z-10 shadow-lg":"inactive-thumbnail-gray border-transparent shadow-sm"';
    content = content.split(thumbTarget).join(thumbReplacement);

    // Lightbox border 
    const lbBorderTarget = 'd===H?"border-[2px] border-brand-orange ring-2 ring-brand-orange/80 scale-110 opacity-100 z-10 shadow-lg":"border-transparent opacity-40 hover:opacity-100"';
    const lbBorderRep = 'd===H?"active-lightbox-thumbnail opacity-100 z-10 shadow-lg":"inactive-thumbnail-gray border-transparent shadow-sm"';
    content = content.split(lbBorderTarget).join(lbBorderRep);

    // 3. Fix the dark pause in the project image slider (Card)
    const cardImgTarget = 'className:"relative w-full h-full bg-black/90",children:[u.jsx(Ft.img,{key:d,initial:{opacity:0},animate:{opacity:1},transition:{duration:0.25,ease:"easeOut"},src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - img "+(d+1)';
    const cardImgReplacement = 'className:"relative w-full h-full bg-zinc-200",children:[u.jsx("img",{key:d,style:{opacity:0,transition:"opacity 0.6s ease-in-out"},onLoad:e=>e.currentTarget.style.opacity="1",onError:e=>e.currentTarget.style.opacity="1",src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - img "+(d+1)';
    content = content.split(cardImgTarget).join(cardImgReplacement);
    
    // In case build_assets.js already modified public before:
    const cardImgTargetFallback = 'u.jsx(Ft.img,{key:d,initial:{opacity:0},animate:{opacity:1},transition:{duration:0.25,ease:"easeOut"},src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - img "+(d+1)';
    const cardImgReplacementFallback = 'u.jsx("img",{key:d,style:{opacity:0,transition:"opacity 0.6s ease-in-out"},onLoad:e=>e.currentTarget.style.opacity="1",onError:e=>e.currentTarget.style.opacity="1",src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - img "+(d+1)';
    content = content.split(cardImgTargetFallback).join(cardImgReplacementFallback);
    content = content.split('bg-black/90').join('bg-zinc-200');

    // 4. Fix the dark pause in the Lightbox slider
    const lbImgTarget = 'u.jsx(Ft.img,{key:d,initial:{opacity:0},animate:{opacity:1},transition:{duration:0.25,ease:"easeOut"},src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - Zoom"';
    const lbImgReplacement = 'u.jsx("img",{key:d,style:{opacity:0,transition:"opacity 0.6s ease-in-out"},onLoad:e=>e.currentTarget.style.opacity="1",onError:e=>e.currentTarget.style.opacity="1",src:a.images[d],alt:(i==="ENG"&&a.titleEN||a.title)+" - Zoom"';
    content = content.split(lbImgTarget).join(lbImgReplacement);

    // 5. Remove all periods from Latvian copyright text
    content = content.split('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas..."').join('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas"');
    content = content.split('"SIA AVANGART © 2026 I Visas tiesības aizsargātas..."').join('"SIA AVANGART © 2026 I Visas tiesības aizsargātas"');
    content = content.split('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas.."').join('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas"');
    content = content.split('"SIA AVANGART © 2026 I Visas tiesības aizsargātas.."').join('"SIA AVANGART © 2026 I Visas tiesības aizsargātas"');
    content = content.split('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas."').join('"SIA AVANGART \\u00a9 2026 I Visas ties\\u012bbas aizsarg\\u0101tas"');
    content = content.split('"SIA AVANGART © 2026 I Visas tiesības aizsargātas."').join('"SIA AVANGART © 2026 I Visas tiesības aizsargātas"');


    fs.writeFileSync(file, content, 'utf8');
    const publicPath = path.join('public', file);
    fs.writeFileSync(publicPath, content, 'utf8');
  }
}

console.log("Preparing build target...");

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Re-copy HTML
fs.copyFileSync('index.html', 'dist/index.html');

// Create dist asset directories
if (!fs.existsSync('dist/assets')) {
  fs.mkdirSync('dist/assets', { recursive: true });
}
if (!fs.existsSync('dist/images/premium/bergi')) {
  fs.mkdirSync('dist/images/premium/bergi', { recursive: true });
}

// Copy public content to dist
const copyRecursive = (src, dest) => {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

if (fs.existsSync('public')) {
  fs.readdirSync('public').forEach(item => {
    copyRecursive(path.join('public', item), path.join('dist', item));
  });
}

// Copy local /assets folder to dist/assets
if (fs.existsSync('assets')) {
  fs.readdirSync('assets').forEach(item => {
    copyRecursive(path.join('assets', item), path.join('dist/assets', item));
  });
}

// Copy local /images folder to dist/images and public/images
if (fs.existsSync('images')) {
  if (!fs.existsSync('dist/images')) {
    fs.mkdirSync('dist/images', { recursive: true });
  }
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  fs.readdirSync('images').forEach(item => {
    const srcPath = path.join('images', item);
    copyRecursive(srcPath, path.join('dist/images', item));
    copyRecursive(srcPath, path.join('public/images', item));
  });
}

console.log("Copy completed. Dist folder populated.");
