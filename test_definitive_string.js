import vm from 'vm';

const code = `
const Z = { useEffect: () => {} };
const a = { images: [] };
const d = 0;
const loadingSrcs = {};
const setLoadingSrcs = () => {};
const setErrSrcs = () => {};

${'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);'}
`;

try {
  new vm.Script(code);
  console.log("✅ THE DEFINITIVE USEEFFECT STRING PARSES 100% PERFECTLY!");
} catch (e) {
  console.log("❌ ERROR:", e.message);
}
