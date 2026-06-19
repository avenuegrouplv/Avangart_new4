import vm from 'vm';

const code = `
const Z = {
  useState: (x) => [x, () => {}],
  useEffect: () => {}
};
const u = { jsxs: () => {}, jsx: () => {} };
const ie = () => {};
const Ni = {};
const Mr = {};
const r0 = {};
const Ad = {};

const ok = ({project:a,lang:i,isDev:r,onUpdateImages:l})=>{
  var z,k,M,B;
  const[d,h]=Z.useState(0),[f,p]=Z.useState(!1),[errSrcs,setErrSrcs]=Z.useState({}),[loadingSrcs,setLoadingSrcs]=Z.useState({});

  Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})}})},[d,a.images]);

  Z.useEffect(()=>{h(0)},[a.id]);
  return null;
};
`;

const target = 'setErrSrcs(prev=>({...prev,[src]:true}))}})}})},[d,a.images]);';
const replacement = 'setErrSrcs(prev=>({...prev,[src]:true}))}})}},[d,a.images]);';

const idx = code.indexOf(target);
console.log("Index of target in code:", idx);

// Let's directly construct the clean function with the brute-forced ending:
const cleanCode = `
const Z = {
  useState: (x) => [x, () => {}],
  useEffect: () => {}
};
const u = { jsxs: () => {}, jsx: () => {} };
const ie = () => {};
const Ni = {};
const Mr = {};
const r0 = {};
const Ad = {};

const ok = ({project:a,lang:i,isDev:r,onUpdateImages:l})=>{
  var z,k,M,B;
  const[d,h]=Z.useState(0),[f,p]=Z.useState(!1),[errSrcs,setErrSrcs]=Z.useState({}),[loadingSrcs,setLoadingSrcs]=Z.useState({});

  Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})}}),[d,a.images]);

  Z.useEffect(()=>{h(0)},[a.id]);
  return null;
};
`;

// Wait, the brute-forced suffix is we replace the end with "}})}}" and dependencies!
// Let's do that!
const testBrute = 'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})}})},[d,a.images]);';
// Wait, is there a curly inside "}},[d,a.images]);"?
// Yes! "}}" is two curlies.
// Let's test this exact string!

try {
  new vm.Script(testBrute, { filename: 'testBrute.js' });
  console.log("🥇 testBrute PARSED PERFECTLY!");
} catch (e) {
  console.log("❌ testBrute failed:");
  console.log(e.stack);
}
