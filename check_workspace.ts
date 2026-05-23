import fs from 'fs';

try {
  if (fs.existsSync('/workspace')) {
    console.log('/workspace contents:', fs.readdirSync('/workspace'));
    // recursively find any .zip or .tsx there
  } else {
    console.log('/workspace does not exist');
  }
} catch (e: any) {
  console.error(e.message);
}
