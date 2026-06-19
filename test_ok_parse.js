import vm from 'vm';

const testOk = () => {
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

    Z.useEffect(()=>{
      if(a.images&&a.images.length>0){
        const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];
        indices.forEach(idx=>{
          const src=a.images[idx];
          if(src&&!loadingSrcs[src]){
            setLoadingSrcs(prev=>({...prev,[src]:"loading"}));
            const img=new Image();
            img.src=src;
            img.onload=()=>{
              setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))
            };
            img.onerror=()=>{
              setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));
              setErrSrcs(prev=>({...prev,[src]:true}))
            }
          }
        })
      }
    },[d,a.images]);

    Z.useEffect(()=>{h(0)},[a.id]);
    return null;
  };
};

try {
  new vm.Script("(" + testOk.toString() + ")");
  console.log("✅ THE HAND-WRITTEN FORMATTED FUNCTION PARSES PERFECTLY!");
} catch (e) {
  console.log("❌ ERROR:", e.message);
}
