import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import sharp from 'sharp';

const jsFiles = ['assets/index-CbV5ml0j.js', 'assets/index-CbV5ml0j-v6.js'];

console.log("Converting custom process steps and logo...");
const customImages = [
  { src: 'Tehniskais-projekts.png', dest: 'images/tehniskais-projekts/img_01.webp' },
  { src: 'Razosanas-darbnica.png', dest: 'images/razosana-darbnica/img_01.webp' },
  { src: 'Piegade-montaza-garantija.jpeg', dest: 'images/piegade-montaza-garantija/img_01.webp' },
  { src: 'Avangart-new.png', dest: 'images/logo/Avangart-new.webp' }
];

for (const item of customImages) {
  if (fs.existsSync(item.src)) {
    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    console.log(`Converting custom image ${item.src} to ${item.dest}...`);
    try {
      await sharp(item.src)
        .webp({ quality: 90 })
        .toFile(item.dest);
      fs.unlinkSync(item.src);
    } catch (err) {
      console.error(`Error converting ${item.src}:`, err);
    }
  }
}

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
    id: 105,
    title: "Jūrmala. Dzintara prospekts",
    titleEN: "Jurmala. Dzintara Avenue",
    category: "PREMIUM PROJEKTI",
    images: [
      "/images/premium/Jūrmala. Dizaina elementi/img_01.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_02.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_03.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_04.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_05.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_06.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_07.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_08.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_09.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_10.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_11.webp",
      "/images/premium/Jūrmala. Dizaina elementi/img_12.webp"
    ],
    description: "Ekskluzīvs mēbeļu apdares un dizaina elementu projekts Jūrmalā. Eleganti koka sienu paneļi, individuālas apdares tekstūras un smalkas iedetaļas, kas lieliski papildina mūsdienu interjeru un piešķir telpai unikālu estētisko vērtību.",
    descriptionEN: "An exclusive furniture finish and design elements project in Jurmala. Featuring elegant wood wall panels, custom finishes, and subtle details that beautifully complement the modern interior and add unique aesthetic value to the space.",
    materials: "Dabīgais ozols, ekskluzīvas detaļas, integrēts LED apgaismojums, sienas paneļi",
    materialsEN: "Natural oak, exclusive details, integrated LED lighting, wall panels",
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
    images: [],
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
    title: "Portfolio 1",
    titleEN: "Custom premium oak fitted kitchen",
    category: "Virtuves", images: [YT],
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
    titleEN: "Bespoke kids room furniture set",
    category: "Bērnistabas", images: [],
    description: "Bērnistabas mēbeļu komplekts privātmājai Ādažos. Gultas rāmis un pie sienas montētie naktsskapīši izgatavoti no īpaši atlasītiem ozolkoka dēļiem, kas pulēti ar dabīgo vasku. Galvgalis apvilkts ar nodilumizturīgu dabisko lina maisauduma tekstilu. Pie sienas montētie naktsskapīši rada gaisīgu un modernu efektu telpā.",
    descriptionEN: "A kids room furniture collection for a private house in Ādaži. The bed frame and wall-mounted bedside tables are made of specially selected oak planks polished with natural wax. The headboard is upholstered in highly durable natural linen textile. The wall-mounted bedside tables create a light and modern feel in the space.",
    materials: "Ozols, tekstils",
    materialsEN: "Oak, textile",
    year: "2025"
  },
  {
    id: 5,
    title: "Ekskluzīvas mitrumizturīgas ozolkoka mēbeles vannas istabai",
    titleEN: "Premium humidity-resistant solid oak bathroom vanity system",
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

    // Replace the base64 logo string
    content = content.replace(/ak="data:image\/png;base64,[^"]*"/g, 'ak="/images/logo/Avangart-new.webp"');

    // Replace work process step image URLs
    content = content.replace(/y0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_design\.webp"/g, 'y0="/images/tehniskais-projekts/img_01.webp"');
    content = content.replace(/x0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/furniture_crafting\.webp"/g, 'x0="/images/razosana-darbnica/img_01.webp"');
    content = content.replace(/j0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_installation\.webp"/g, 'j0="/images/piegade-montaza-garantija/img_01.webp"');

    // Replace Zoom/Lightbox full thumbnails list with sliding 9-thumbnails window with fifth-index centering
    const targetString = 'a.images.map((V,H)=>u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-brand-orange ring-1 ring-brand-orange scale-105 opacity-100":"border-white/20 opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},H))';
    const replacementString = 'Array.from({length:9}).map((_,s)=>{const startIdx=a.images.length>9?Math.max(0,Math.min(d-3,a.images.length-9)):0;const H=startIdx+s;const V=H<a.images.length?a.images[H]:null;return V?u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-[2px] border-brand-orange ring-2 ring-brand-orange/80 scale-110 opacity-100 z-10 shadow-lg":"border-transparent opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},s):null})';
    content = content.split(targetString).join(replacementString);

    // 1. Navigation buttons for Mūsu īstenotie projekti
    const navTarget = 'b.titleLV})})]},g))})';
    const navReplacement = 'b.titleLV})})]},g))}),u.jsxs("div",{className:"flex justify-center items-center gap-12 mt-1 mb-8",children:[u.jsx("button",{onClick:()=>window.scrollPortfolioPrev&&window.scrollPortfolioPrev(),className:"text-zinc-500 hover:text-brand-orange text-[100px] font-extralight flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none outline-none focus:outline-none","aria-label":"Scroll left",children:"<"}),u.jsx("button",{onClick:()=>window.scrollPortfolioNext&&window.scrollPortfolioNext(),className:"text-zinc-500 hover:text-brand-orange text-[100px] font-extralight flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none outline-none focus:outline-none","aria-label":"Scroll right",children:">"})]})';
    content = content.split(navTarget).join(navReplacement);

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


    fs.writeFileSync(file, content, 'utf8');
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

// Copy local /images folder to dist/images
if (fs.existsSync('images')) {
  fs.readdirSync('images').forEach(item => {
    const srcPath = path.join('images', item);
    const destPath = path.join('dist/images', item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log("Copy completed. Dist folder populated.");
