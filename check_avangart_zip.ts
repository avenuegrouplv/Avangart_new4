import AdmZip from 'adm-zip';

try {
  const outerZip = new AdmZip('inner_avangart.zip');
  const entries = outerZip.getEntries();
  console.log('Total entries inside avangart-main(1).zip:', entries.length);
  let count = 0;
  entries.forEach(entry => {
    if (entry.entryName.toLowerCase().includes('logo') || entry.entryName.toLowerCase().includes('png') || entry.entryName.toLowerCase().includes('webp')) {
      console.log(` - ${entry.entryName} (${entry.header.size} bytes)`);
      count++;
    }
  });
  if (count === 0) {
    console.log('No logo/image entries found.');
  }
} catch (e: any) {
  console.error(e.message);
}
