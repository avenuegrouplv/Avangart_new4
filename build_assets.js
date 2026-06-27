import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import sharp from 'sharp';

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
