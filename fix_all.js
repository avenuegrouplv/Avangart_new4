const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Fix large thumbnails border class
    const thumbTarget1 = 'd===H?"border-[3px] border-brand-orange ring-2 ring-brand-orange scale-[1.08] opacity-100 z-10 shadow-lg":"border-transparent opacity-65 hover:opacity-100 shadow-sm"';
    const thumbRep1 = 'd===H?"active-gallery-thumbnail opacity-100 z-10 shadow-lg":"border-transparent opacity-65 hover:opacity-100 shadow-sm"';
    content = content.split(thumbTarget1).join(thumbRep1);

    // 2. Fix small thumbnails (lightbox) border class
    const thumbTarget2 = 'd===H?"border-[2px] border-brand-orange ring-2 ring-brand-orange/80 scale-110 opacity-100 z-10 shadow-lg":"border-transparent opacity-40 hover:opacity-100"';
    const thumbRep2 = 'd===H?"active-lightbox-thumbnail opacity-100 z-10 shadow-lg":"border-transparent opacity-40 hover:opacity-100"';
    content = content.split(thumbTarget2).join(thumbRep2);
    
    // 3. Fix nav buttons spacing and size
    const navTarget = 'u.jsxs("div",{className:"flex justify-center items-center gap-6 mt-1 mb-2",children:[u.jsx("button",{onClick:()=>{const c=document.getElementById("portfolio-categories-container");if(c)c.scrollBy({left:-300,behavior:"smooth"})},className:"text-zinc-400 hover:text-brand-orange text-4xl font-light flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none","aria-label":"Scroll left",children:"<"}),u.jsx("button",{onClick:()=>{const c=document.getElementById("portfolio-categories-container");if(c)c.scrollBy({left:300,behavior:"smooth"})},className:"text-zinc-400 hover:text-brand-orange text-4xl font-light flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none","aria-label":"Scroll right",children:">"})]})';
    const navRep = 'u.jsxs("div",{className:"flex justify-center items-center gap-12 pt-2 mb-10",children:[u.jsx("button",{onClick:()=>{const c=document.getElementById("portfolio-categories-container");if(c)c.scrollBy({left:-300,behavior:"smooth"})},className:"text-zinc-400 hover:text-brand-orange text-3xl font-light flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none","aria-label":"Scroll left",children:"<"}),u.jsx("button",{onClick:()=>{const c=document.getElementById("portfolio-categories-container");if(c)c.scrollBy({left:300,behavior:"smooth"})},className:"text-zinc-400 hover:text-brand-orange text-3xl font-light flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all bg-transparent border-none","aria-label":"Scroll right",children:">"})]})';
    content = content.split(navTarget).join(navRep);

    fs.writeFileSync(filePath, content, 'utf-8');
}

fixFile('public/assets/index-CbV5ml0j-v6.js');
fixFile('dist/assets/index-CbV5ml0j-v6.js');

let indexHtml = fs.readFileSync('index.html', 'utf-8');
if (!indexHtml.includes('.active-gallery-thumbnail')) {
    const cssToAdd = `
      .active-gallery-thumbnail {
        border: 3px solid #e28743 !important;
        box-shadow: 0 0 0 2px rgba(226, 135, 67, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        transform: scale(1.08) !important;
      }
      .active-lightbox-thumbnail {
        border: 2px solid #e28743 !important;
        box-shadow: 0 0 0 2px rgba(226, 135, 67, 0.8), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        transform: scale(1.10) !important;
      }
    `;
    indexHtml = indexHtml.replace('</style>', cssToAdd + '</style>');
    fs.writeFileSync('index.html', indexHtml, 'utf-8');
    
    // Also update dist/index.html if it exists
    if (fs.existsSync('dist/index.html')) {
        let distHtml = fs.readFileSync('dist/index.html', 'utf-8');
        distHtml = distHtml.replace('</style>', cssToAdd + '</style>');
        fs.writeFileSync('dist/index.html', distHtml, 'utf-8');
    }
}
