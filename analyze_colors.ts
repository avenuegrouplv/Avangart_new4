import sharp from 'sharp';

async function analyze() {
  const image = sharp('Avangart_new.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  // Let's count some color statistics
  // We want to know what colors are there
  const colorCounts: Record<string, number> = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    const key = `${r},${g},${b}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }
  
  // Sort and display top 30 colors
  const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
  console.log('Top colors in Avangart_new.png:');
  sorted.slice(0, 35).forEach(([color, count]) => {
    console.log(` - Color [${color}]: ${count} pixels`);
  });
}

analyze().catch(console.error);
