import fs from 'fs';
import AdmZip from 'adm-zip';

const outerZip = new AdmZip('Avangart_new3-main.zip');
const outerApp = outerZip.readAsText('Avangart_new3-main/src/App.tsx');

const innerZip = new AdmZip('inner_avangart.zip');
const innerApp = innerZip.readAsText('avangart-main/src/App.tsx');

console.log('--- Checking for the 15-hour improvements ---');
console.log('Outer size:', outerApp.length);
console.log('Inner size:', innerApp.length);

console.log('Outer contains "stairNew1":', outerApp.includes('stairNew1'));
console.log('Inner contains "stairNew1":', innerApp.includes('stairNew1'));

console.log('Outer contains "konsolkāpnes":', outerApp.includes('konsolkāpnes'));
console.log('Inner contains "konsolkāpnes":', innerApp.includes('konsolkāpnes'));

// Let's search for a few custom text segments or look at the differences between the two
const outerLines = outerApp.split('\n');
const innerLines = innerApp.split('\n');

console.log('Outer lines count:', outerLines.length);
console.log('Inner lines count:', innerLines.length);
