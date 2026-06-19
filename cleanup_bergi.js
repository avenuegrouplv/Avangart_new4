import fs from 'fs';

const rootFiles = fs.readdirSync('.');
rootFiles.forEach(f => {
  if (f.startsWith('bergi-classic-') && f.endsWith('.jpg')) {
    try {
      fs.unlinkSync(f);
      console.log(`Deleted root file: ${f}`);
    } catch(e) {}
  }
});
