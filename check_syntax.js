import fs from 'fs';
import vm from 'vm';

const file1 = 'public/assets/index-CbV5ml0j-v5.js';
const file2 = 'public/assets/index-CbV5ml0j.js';

function checkSyntax(file) {
  if (!fs.existsSync(file)) {
    console.log(`${file} does not exist`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  try {
    new vm.Script(content);
    console.log(`✅ ${file} syntax is perfect!`);
  } catch (e) {
    console.log(`❌ ${file} has syntax error:`, e.message);
  }
}

checkSyntax(file1);
checkSyntax(file2);
