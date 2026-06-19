import vm from 'vm';

// Let's test with THREE curlies before `)` -> `}}})`
const subStr = 'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);';

// Wait, where is the error?
// Let's replace `}})})` with `}}})})` or `}})})`?
// Let's try replacing `setErrSrcs(prev=>({...prev,[src]:true}))}})})` with:
// `setErrSrcs(prev=>({...prev,[src]:true}))}}})})`
// Let's test different combinations of closing braces on this string to find the exact one that compiles!

const variants = [
  'setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}}})},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}})})},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}}})})},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}}})}},[d,a.images]);', // <-- wait, earlier we had 5 curlies total, let's see!
  'setErrSrcs(prev=>({...prev,[src]:true}))}})})}},[d,a.images]);',
  'setErrSrcs(prev=>({...prev,[src]:true}))}}})[d,a.images]);'
];

const template = 'Z.useEffect(()=>{if(a.images&&a.images.length>0){const indices=[d,(d+1)%a.images.length,(d+2)%a.images.length,(d-1+a.images.length)%a.images.length];indices.forEach(idx=>{const src=a.images[idx];if(src&&!loadingSrcs[src]){setLoadingSrcs(prev=>({...prev,[src]:"loading"}));const img=new Image();img.src=src;img.onload=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}))};img.onerror=()=>{setLoadingSrcs(prev=>({...prev,[src]:"loaded"}));setErrSrcs(prev=>({...prev,[src]:true}))}';

// Let's construct a systematically correct closure:
// img.onerror body: closed by }
// if(src) body: closed by }
// indices.forEach callback body: closed by }
// indices.forEach call: closed by )
// if(a.images) body: closed by }
// useEffect callback body: closed by }
// useEffect call: closed by ),[d,a.images]); wait, useEffect is call, callback is first argument.
// So useEffect callback ends with }, and then the second parameter is ,[d,a.images]
// So the closure is:
// } (onerror)
// } (if(src))
// } (indices.forEach callback)
// ) (indices.forEach call)
// } (if(a.images))
// } (useEffect callback)
// ,[d,a.images]); (useEffect call)
// Together: } + } + } + ) + } + } + ,[d,a.images]); => }}})}}[d,a.images]); wait, } + } + } + ) + } + } + ,[d,a.images]); => } } } ) } } , [d,a.images]);
// Let's construct exactly that:
const definitiveClosure = '}}})}},[d,a.images]);';
const fullDefinitive = template + definitiveClosure;

try {
  new vm.Script(fullDefinitive);
  console.log("✅ SUCCESS with definitiveClosure:", definitiveClosure);
} catch (e) {
  console.log("❌ definitiveClosure failed:", e.message);
}
