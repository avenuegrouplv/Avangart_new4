import fs from 'fs';
import vm from 'vm';

const filePath = 'public/assets/index-CbV5ml0j-v5.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Starting application of the requested changes...');

// 1. Remove the "Set as Cover" / "Titulbilde" button overlay
const buttonTarget = `r&&a.images.length>1&&d!==0&&u.jsx("button",{type:"button",onClick:V=>{V.stopPropagation();const H=[...a.images],[Y]=H.splice(d,1);H.unshift(Y),l(a.id,H),h(0)},className:"absolute top-2.5 right-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white px-2.5 py-1 text-[8.5px] uppercase tracking-widest font-extrabold select-none shadow-md cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-1",title:i==="ENG"?"Set as cover image":"Iestatīt kā titulbildi",children:u.jsx("span",{children:i==="ENG"?"Set as Cover":"Titulbilde"})}),`;

if (content.indexOf(buttonTarget) === -1) {
  console.error('[ERROR] Button target not found!');
  process.exit(1);
} else {
  content = content.replace(buttonTarget, '');
  console.log('✅ Removed "Set as Cover" button overlay.');
}

// 2. Update the drag-and-drop thumbnail title tooltip (to remove Cover/Titulbilde references)
const tooltipTarget = `title:r?i==="ENG"?"Drag and drop to rearrange. Drag to 1st position as Cover!":"Velciet, lai mainītu secību. Pirmā pozīcija ir titulbilde!":void 0`;
const tooltipRepl = `title:r?i==="ENG"?"Drag and drop to rearrange.":"Velciet, lai mainītu secību.":void 0`;

if (content.indexOf(tooltipTarget) === -1) {
  console.error('[ERROR] Tooltip target not found!');
  process.exit(1);
} else {
  content = content.replace(tooltipTarget, tooltipRepl);
  console.log('✅ Updated drag-and-drop tooltip text.');
}

// 3. Update the Location rendering of the project to check for dynamic a.location properties
const locationTarget = `children:a.isPlaceholder?i==="ENG"?"Riga, Latvia":"Rīga, Latvija":a.id===1?i==="ENG"?"Marupe, Latvia":"Mārupe, Latvija":a.id===2?i==="ENG"?"Babite, Latvia":"Babīte, Latvija":a.id===3?i==="ENG"?"Riga, Latvia":"Rīga, Latvija":a.id===4?i==="ENG"?"Adazi, Latvia":"Ādaži, Latvija":(a.id===5,i==="ENG"?"Riga, Latvia":"Rīga, Latvija")`;
const locationRepl = `children:a.location?i==="ENG"?(a.locationEN||a.location):a.location:a.isPlaceholder?i==="ENG"?"Riga, Latvia":"Rīga, Latvija":a.id===1?i==="ENG"?"Marupe, Latvia":"Mārupe, Latvija":a.id===2?i==="ENG"?"Babite, Latvia":"Babīte, Latvija":a.id===3?i==="ENG"?"Riga, Latvia":"Rīga, Latvija":a.id===4?i==="ENG"?"Adazi, Latvia":"Ādaži, Latvija":i==="ENG"?"Riga, Latvia":"Rīga, Latvija"`;

if (content.indexOf(locationTarget) === -1) {
  console.error('[ERROR] Location target not found!');
  process.exit(1);
} else {
  content = content.replace(locationTarget, locationRepl);
  console.log('✅ Updated location rendering logic to support dynamic locations.');
}

// 4. Update the portfolio page rendering lists inside `ck` to group active commercial files to 6 galleries
const zTarget = `g=\`placeholder-2-\${h}\`,v=l[g]||[],x=\`placeholder-3-\${h}\`,j=l[x]||[],z=[{...f},{id:g,isPlaceholder:!0,placeholderNum:2,title:"Portfolio 2",titleEN:"Portfolio 2",category:h,images:v,description:"",descriptionEN:"",materials:"",materialsEN:"",year:""},{id:x,isPlaceholder:!0,placeholderNum:3,title:"Portfolio 3",titleEN:"Portfolio 3",category:h,images:j,description:"",descriptionEN:"",materials:"",materialsEN:"",year:""}];`;

const zRepl = `g=\`placeholder-2-\${h}\`,v=l[g]||[],x=\`placeholder-3-\${h}\`,j=l[x]||[],z=h === "Biroji un komerctelpas" ? [
  {
    id: 110,
    title: "Konferenču zāle",
    titleEN: "Conference Room",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_room_white_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_room_white_2.webp"
    ],
    description: "Elegantas mūsdienu konferenču zāles sienu un griestu koka apdare ar izcilu dizainu un kvalitatīvu materiālu izpildījumu.",
    descriptionEN: "Elegant and modern conference room wall and ceiling wood paneling with premium materials and design.",
    materials: "Dabīgais finierējums, ekoloģiskas eļļas un krāsas",
    materialsEN: "Natural oak veneer, ecological oils and paints",
    year: "2025",
    location: "Rīga, Latvija",
    locationEN: "Riga, Latvia"
  },
  {
    id: 111,
    title: "Konferenču zāle 2",
    titleEN: "Conference Room 2",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Conf_white_3.webp"
    ],
    description: "Gaišas un tehnoloģiski aprīkotas sanāksmju telpas koka mēbeļu apšuvums un saskaņoti dizaina elementi.",
    descriptionEN: "Light and technologically integrated meeting space with custom wood fittings and design elements.",
    materials: "Rievoti ozola paneļi, premium finierējums",
    materialsEN: "Ribbed oak panels, premium oak veneer",
    year: "2025",
    location: "Rīga, Latvija",
    locationEN: "Riga, Latvia"
  },
  {
    id: 112,
    title: "Foaje Jūrmala",
    titleEN: "Foyer Jurmala",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Foaje_Jurm_5.webp"
    ],
    description: "Reprezentabla uzgaidāmās zonas un foajē apdare, radot greznu un aicinošu atmosfēru viesiem un darbiniekiem.",
    descriptionEN: "Representative waiting area and lobby woodwork, crafting a luxurious and welcoming environment for guests.",
    materials: "Finierēti MDF sienu paneļi, lakots masīvkoks",
    materialsEN: "Veneered MDF wall panels, lacquered solid wood",
    year: "2025",
    location: "Jūrmala, Latvija",
    locationEN: "Jurmala, Latvia"
  },
  {
    id: 113,
    title: "Offiss Jūrmala",
    titleEN: "Office Jurmala",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_5.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_6.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Jurm_7.webp"
    ],
    description: "Galdniecības risinājumi un integrētās mēbeļu sistēmas biroja darba zonām, ergonomikai un augstākai produktivitātei.",
    descriptionEN: "High-end cabinetry solutions and integrated storage systems for core workspace areas focusing on ergonomics.",
    materials: "Ozola un oša apdare, slāpējošie akustiskie risinājumi",
    materialsEN: "Oak and ash woodwork, noise-absorbing acoustic elements",
    year: "2025",
    location: "Jūrmala, Latvija",
    locationEN: "Jurmala, Latvia"
  },
  {
    id: 114,
    title: "Office 2",
    titleEN: "Office 2",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_Zunda_1%20copy.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Office_private_grey_2.webp"
    ],
    description: "Mūsdienīgs darba kabineta interjers ar minimālistiskām detaļām, pasūtījuma mēbelēm un integrētu koka furnitūru.",
    descriptionEN: "Modern private office interior defined by minimalist details, custom-built desk, and integrated wood furniture.",
    materials: "Finierēts saplāksnis, melnie metāla dizaina profili",
    materialsEN: "Veneered plywood, black designer metal profiles",
    year: "2025",
    location: "Rīga, Latvija",
    locationEN: "Riga, Latvia"
  },
  {
    id: 115,
    title: "Recepcija",
    titleEN: "Reception",
    category: h,
    images: [
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_1.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_2.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_3.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_brown_4.webp",
      "https://pub-259b6281ac664ea885ac1af3a4df6551.r2.dev/Reception_desk_white_1.webp"
    ],
    description: "Grezni recepcijas galdi un recepcijas zonu apdare ar augstas klases dizaina mēbelēm pēc individuāla pasūtījuma.",
    descriptionEN: "Statement reception desks and welcome counter wood fits made to project order combining rich wood lines.",
    materials: "Masīvs koks, dabīgais finieris un marmora ielaidumi",
    materialsEN: "Solid wood, natural veneer and marble details",
    year: "2025",
    location: "Rīga, Latvija",
    locationEN: "Riga, Latvia"
  }
] : [{...f},{id:g,isPlaceholder:!0,placeholderNum:2,title:"Portfolio 2",titleEN:"Portfolio 2",category:h,images:v,description:"",descriptionEN:"",materials:"",materialsEN:"",year:""},{id:x,isPlaceholder:!0,placeholderNum:3,title:"Portfolio 3",titleEN:"Portfolio 3",category:h,images:j,description:"",descriptionEN:"",materials:"",materialsEN:"",year:""}];`;

if (content.indexOf(zTarget) === -1) {
  console.error('[ERROR] zTarget not found! Stale context or matching error.');
  process.exit(1);
} else {
  content = content.replace(zTarget, zRepl);
  console.log('✅ Grouped Biroji un komerctelpas into 6 beautiful distinct galleries.');
}

fs.writeFileSync(filePath, content, 'utf8');

// Verify Syntax
try {
  new vm.Script(content);
  console.log('🎉 Syntax verify: SUCCESS! No syntax errors in modified index asset.');
} catch (e) {
  console.error('❌ SYNTAX VERIFICATION FAILED inside modified asset!');
  console.error(e);
  process.exit(1);
}
