import vm from 'vm';

const prefix = 'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}';

// We want to append some combination of '}', ')', ',', '[', 'd', 'a.images', ']', ';' at the end
// Since the dependency array is always ',[d,a.images]);', let's fix that part, 
// and brute-force the closing braces before it!
// Let's generate all permutations of '}' and ')' of length 4 to 8.

function generatePermutations(chars, maxLength) {
  const results = [];
  function permute(current) {
    if (current.length > 0) results.push(current);
    if (current.length === maxLength) return;
    for (const char of chars) {
      permute(current + char);
    }
  }
  permute('');
  return results;
}

const combinations = generatePermutations(['}', ')'], 8);
console.log(`Testing ${combinations.length} brace combinations...`);

let successFound = false;
for (const comb of combinations) {
  const fullCode = `
    const Z = { useEffect: () => {} };
    const a = { images: [] };
    const d = 0;
    const loadingSrcs = {};
    const setLoadingSrcs = () => {};
    const setErrSrcs = () => {};
    
    ${prefix}${comb},[d,a.images]);
  `;
  try {
    new vm.Script(fullCode);
    console.log(`🏆 SUCCESS COMBINATION: "${comb}"`);
    successFound = true;
    break;
  } catch (e) {
    // Ignore error and continue
  }
}

if (!successFound) {
  console.log("No valid combination found!");
}
