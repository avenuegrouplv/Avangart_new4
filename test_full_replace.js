import fs from 'fs';
import vm from 'vm';

const file = 'index-CbV5ml0j-v5.js_debug.js';
let code = fs.readFileSync(file, 'utf8');

const uBlockStart = code.indexOf('Z.useEffect(()=>{');
const uBlockEnd = code.indexOf(',[d,a.images]);') + 15;

if (uBlockStart !== -1 && uBlockEnd !== -1) {
  const cleanMinified = 'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})})}},[d,a.images]);';
  
  const before = code.slice(0, uBlockStart);
  const after = code.slice(uBlockEnd);
  const replacedCode = before + cleanMinified + after;

  fs.writeFileSync('clean_replaced_debug.js', replacedCode, 'utf8');
  console.log("Wrote clean_replaced_debug.js");

  try {
    new vm.Script(replacedCode);
    console.log("✅ PARSED SUCCESS!");
  } catch (e) {
    console.log("❌ REPLACED SYNTAX ERROR:", e.message);
  }
} else {
  console.log("Could not find useEffect slice points");
}
