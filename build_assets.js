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
  // 1. Find the index of '{id:105,'
  const targetIdStr = '{id:105,';
  const id105Index = content.indexOf(targetIdStr);
  if (id105Index === -1) {
    console.log("Could not find id:105");
    return content;
  }
  
  // 2. Extract the complete object starting at id105Index
  let braceCount = 0;
  let endIndex = -1;
  for (let i = id105Index; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    else if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  if (endIndex === -1) {
    console.log("Could not find end of id:105 object");
    return content;
  }
  
  let objectStr = content.substring(id105Index, endIndex);
  
  // 3. Remove the object and the preceding or trailing comma from the original content
  let before = content.substring(0, id105Index);
  let after = content.substring(endIndex);
  
  // Clean up commas
  if (before.endsWith(',')) {
    before = before.slice(0, -1);
  } else if (after.startsWith(',')) {
    after = after.slice(1);
  }
  
  let contentWithout105 = before + after;
  
  // 4. Modify the object properties as requested
  objectStr = objectStr.replace('title:"Jūrmala. Dizaina elementi"', 'title:"Jūrmala. Dzintara prospekts 2"');
  objectStr = objectStr.replace('titleEN:"Jurmala. Design elements"', 'titleEN:"Jurmala. Dzintara prospekts 2"');
  objectStr = objectStr.replace('category:"Dizaina elementi"', 'category:"PREMIUM PROJEKTI"');
  
  // 5. Insert this modified object right after the id:101 object
  const id101Index = contentWithout105.indexOf('{id:101,');
  if (id101Index === -1) {
    console.log("Could not find id:101");
    return content;
  }
  
  braceCount = 0;
  let id101EndIndex = -1;
  for (let i = id101Index; i < contentWithout105.length; i++) {
    if (contentWithout105[i] === '{') braceCount++;
    else if (contentWithout105[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        id101EndIndex = i + 1;
        break;
      }
    }
  }
  
  if (id101EndIndex === -1) {
    console.log("Could not find end of id:101 object");
    return content;
  }
  
  let before101 = contentWithout105.substring(0, id101EndIndex);
  let after101 = contentWithout105.substring(id101EndIndex);
  
  let newContent = before101 + ',' + objectStr + after101;
  return newContent;
}

for (const file of jsFiles) {
  if (fs.existsSync(file)) {
    console.log(`Updating paths and logo in ${file}...`);
    let content = fs.readFileSync(file, 'utf8');

    // Replace the base64 logo string
    content = content.replace(/ak="data:image\/png;base64,[^"]*"/g, 'ak="/images/logo/Avangart-new.webp"');

    // Replace work process step image URLs
    content = content.replace(/y0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_design\.webp"/g, 'y0="/images/tehniskais-projekts/img_01.webp"');
    content = content.replace(/x0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/furniture_crafting\.webp"/g, 'x0="/images/razosana-darbnica/img_01.webp"');
    content = content.replace(/j0="https:\/\/pub-125a4c281d7c440d9eaaedcb178381f9\.r2\.dev\/staircase_installation\.webp"/g, 'j0="/images/piegade-montaza-garantija/img_01.webp"');

    // Replace Zoom/Lightbox full thumbnails list with sliding 7-thumbnails window
    const targetString = 'a.images.map((V,H)=>u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-brand-orange ring-1 ring-brand-orange scale-105 opacity-100":"border-white/20 opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},H))';
    const replacementString = 'Array.from({length:7}).map((_,s)=>{const startIdx=a.images.length>7?(d>=6?d-6:0):0;const H=startIdx+s;const V=H<a.images.length?a.images[H]:null;return V?u.jsx("button",{type:"button",onClick:()=>h(H),className:ie("w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",d===H?"border-brand-orange ring-1 ring-brand-orange scale-105 opacity-100":"border-white/20 opacity-40 hover:opacity-100"),"aria-label":"Select page "+(H+1),children:u.jsx("img",{src:V,alt:"",className:"w-full h-full object-cover",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async"})},s):null})';
    content = content.split(targetString).join(replacementString);

    // Apply the project move and rename logic
    content = moveAndRenameProject(content);

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
