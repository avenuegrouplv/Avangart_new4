import AdmZip from 'adm-zip';

try {
  const outerZip = new AdmZip('Avangart_new3-main.zip');
  const entries = outerZip.getEntries();
  console.log('Total entries:', entries.length);
  entries.forEach(entry => {
    if (entry.entryName.toLowerCase().includes('logo') || entry.entryName.toLowerCase().includes('avangart')) {
      console.log(` - ${entry.entryName} (${entry.header.size} bytes)`);
    }
  });
} catch (e: any) {
  console.error(e.message);
}
