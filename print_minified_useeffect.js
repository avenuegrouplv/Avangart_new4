const testOk = () => {
  const Z = {};
  const a = {};
  const d = 0;
  const loadingSrcs = {};
  const setLoadingSrcs = () => {};
  const setErrSrcs = () => {};

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
};

// We will convert it to a single line and print it
const str = testOk.toString();
const blockStart = str.indexOf('Z.useEffect');
const blockEnd = str.indexOf(',[d,a.images]);') + 15;
const sub = str.slice(blockStart, blockEnd);
const minified = sub.replace(/\s+/g, '');
console.log("EXACT MINIFIED USEEFFECT CODE:");
console.log(minified);
