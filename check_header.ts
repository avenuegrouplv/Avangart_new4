import fs from 'fs';

const files = [
  'src/assets/images/Avangart_new.png',
  'src/assets/images/Logo_new.png',
  'src/assets/images/logo_clean.png',
  'src/assets/images/logo_original_perfect_1to1.png'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const fd = fs.openSync(f, 'r');
    const buffer = Buffer.alloc(16);
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);
    console.log(`${f} magic bytes:`, buffer.toString('hex'), 'text:', buffer.toString('ascii').replace(/[^\x20-\x7E]/g, '.'));
  }
}
