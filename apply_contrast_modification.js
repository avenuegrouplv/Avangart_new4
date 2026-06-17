import fs from 'fs';
import vm from 'vm';

const filePath = 'public/assets/index-CbV5ml0j-v5.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Deploying mobile menu contrast adjustment...');

// Part 1: Dropdown container background & blur
const targetContainer = `className:"absolute top-[102%] left-4 right-4 bg-[#1a0f05]/98 backdrop-blur-md border border-[#d6a266]/30 p-6 flex flex-col space-y-4 lg:hidden rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto z-50",id:"mobile-nav-dropdown"`;
const replContainer = `className:"absolute top-[102%] left-4 right-4 bg-[#160d04]/99.3 backdrop-blur-xl border border-[#d6a266]/35 p-6 flex flex-col space-y-4 lg:hidden rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto z-50",id:"mobile-nav-dropdown"`;

if (content.indexOf(targetContainer) === -1) {
  console.error('[ERROR] Target container string not found!');
  process.exit(1);
} else {
  content = content.replace(targetContainer, replContainer);
  console.log('✅ Updated dropdown container backdrop to higher opacity (99.3%) and blur.');
}

// Part 2: Inactive button styling
const targetButton = `"w-full text-center px-5 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d6a266]/40 text-white/90 hover:text-white rounded-xl text-[11px] sm:text-[12px] tracking-widest uppercase font-extrabold transition-all duration-200 active:scale-98 cursor-pointer"`;
const replButton = `"w-full text-center px-5 py-5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#d6a266]/50 text-white hover:text-white rounded-xl text-[11px] sm:text-[12px] tracking-widest uppercase font-extrabold transition-all duration-200 active:scale-98 cursor-pointer"`;

if (content.indexOf(targetButton) === -1) {
  console.error('[ERROR] Target button style string not found!');
  process.exit(1);
} else {
  content = content.replace(targetButton, replButton);
  console.log('✅ Boosted inactive buttons background and border contrast inside mobile dropdown.');
}

// Part 3: Language switcher wrapper
const targetLangBox = `className:"flex items-center space-x-2 text-xs uppercase tracking-wider font-extrabold select-none bg-white/5 rounded-xl p-1.5 border border-white/10"`;
const replLangBox = `className:"flex items-center space-x-2 text-xs uppercase tracking-wider font-extrabold select-none bg-white/10 rounded-xl p-1.5 border border-white/20"`;

if (content.indexOf(targetLangBox) === -1) {
  console.error('[ERROR] Target language box wrapper string not found!');
  process.exit(1);
} else {
  content = content.replace(targetLangBox, replLangBox);
  console.log('✅ Boosted language switcher box contrast.');
}

// Save & Validate
fs.writeFileSync(filePath, content, 'utf8');

try {
  new vm.Script(content);
  console.log('🎉 Syntax check: SUCCESS! Modified bundle loaded without errors.');
} catch (e) {
  console.error('❌ SYNTAX ERROR IN MODIFIED BUNDLE!', e);
  process.exit(1);
}
