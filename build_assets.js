import fs from 'fs';
import { execSync } from 'child_process';

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

import path from 'path';

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
