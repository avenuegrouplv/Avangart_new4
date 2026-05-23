import sharp from 'sharp';

async function analyzeNonLight() {
  const image = sharp('Avangart_new.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  const darkCounts: Record<string, number> = {};
  let lightCount = 0;
  let darkCount = 0;
  
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    if (r > 150 && g > 150 && b > 150) {
      lightCount++;
    } else {
      darkCount++;
      const key = `${r},${g},${b}`;
      darkCounts[key] = (darkCounts[key] || 0) + 1;
    }
  }
  
  console.log(`Total pixels: ${data.length / info.channels}`);
  console.log(`Light pixels (r,g,b > 150): ${lightCount}`);
  console.log(`Other pixels: ${darkCount}`);
  
  const sorted = Object.entries(darkCounts).sort((a, b) => b[1] - a[1]);
  console.log('Top other/dark colors in Avangart_new.png:');
  sorted.slice(0, 30).forEach(([color, count]) => {
    console.log(` - Color [${color}]: ${count} pixels`);
  });
}

analyzeNonLight().catch(console.error);
