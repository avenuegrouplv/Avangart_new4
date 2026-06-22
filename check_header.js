import fs from 'fs';

const filePath = 'assets/premium/filozofu/img_01.webp';
if (fs.existsSync(filePath)) {
  const buffer = fs.readFileSync(filePath);
  console.log('First 20 bytes:', buffer.slice(0, 20));
  console.log('First 4 bytes as string:', buffer.slice(0, 4).toString());
  console.log('Bytes 8-12 as string:', buffer.slice(8, 12).toString());
} else {
  console.log('File does not exist');
}
