/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronUp, 
  Instagram, 
  Facebook, 
  Linkedin,
  Mail, 
  Phone,
  MapPin,
  Compass,
  Layers,
  Wrench,
  Sparkles,
  Award,
  Users,
  ShieldAlert,
  Cookie,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from './lib/utils';
import { DarbaGaitaView } from './components/DarbaGaitaView';
import { CookiePolicyView, PrivacyPolicyView } from './components/PolicyViews';

// --- Image Imports ---
const staircaseHeroImg = '/images/staircase_hero.webp';
const step1Img = '/images/consultation_meeting.webp';
const step2Img = '/images/staircase_design.webp';
const step3Img = '/images/furniture_crafting.webp';
const step4Img = '/images/staircase_installation.webp';
const catStairsImg = '/images/bespoke_staircase.webp';
const catFurnitureImg = '/images/bespoke_furniture.webp';
const catInteriorImg = '/images/bespoke_interior.webp';
const designerCollabImg = '/images/designer_collaboration.webp';
const logoCleanImg = '/images/logo.webp';

// --- Portfolio WebP Images ---
const stair1 = '/images/stair1.webp';
const stair2 = '/images/stair2.webp';
const stair3 = '/images/stair3.webp';

const kitchen1 = '/images/kitchen1.webp';
const kitchen2 = '/images/kitchen2.webp';
const kitchen3 = '/images/kitchen3.webp';

const living1 = '/images/living1.webp';
const living2 = '/images/living2.webp';

const bedroom1 = '/images/bedroom1.webp';
const bedroom2 = '/images/bedroom2.webp';
const bedroom3 = '/images/bedroom3.webp';
const bedroom4 = '/images/bedroom4.webp';
const bedroom5 = '/images/bedroom5.webp';
const bedroom6 = '/images/bedroom6.webp';

const bathroom1 = '/images/bathroom1.webp';
const bathroom2 = '/images/bathroom2.webp';
const bathroom3 = '/images/bathroom3.webp';
const bathroom4 = '/images/bathroom4.webp';

// --- Types ---
interface PortfolioItem {
  id: number;
  title: string;
  category: "Kāpnes" | "Virtuve" | "Viesistaba" | "Guļamistaba" | "Vannas istaba";
  images: string[];
  description: string;
  materials: string;
  year: string;
  titleEN?: string;
  descriptionEN?: string;
  materialsEN?: string;
}
// --- Data ---
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Individuālas masīvkoka kāpnes privātmājā",
    titleEN: "Bespoke solid oak stairs in a private home",
    category: "Kāpnes",
    images: [stair1, stair2, stair3],
    description: "Projektētas un uzstādītas modernas masīvkoka kāpnes privātmājā Mārupē. Tās ir izgatavotas no atlasīta, augstas kvalitātes ozola, kas apstrādāts ar nodilumizturīgu dabīgo aizsargeļļu. Konstrukcija ir rūpīgi izstrādāta, lai nodrošinātu maksimālu izturību un drošību, lieliski iekļaujoties mājas koptēlā.",
    descriptionEN: "Designed and installed modern solid wood stairs in a private home in Mārupe. Crafted from select, high-quality oak treated with a durable protective natural oil. The structure is carefully designed to ensure maximum durability and safety, fitting perfectly into the overall home design.",
    materials: "Masīvs ozols",
    materialsEN: "Solid oak",
    year: "2024"
  },
  {
    id: 2,
    title: "Pēc mēra iebūvēta premium ozolkoka virtuve",
    titleEN: "Custom premium oak fitted kitchen",
    category: "Virtuve",
    images: [kitchen1, kitchen2, kitchen3],
    description: "Iebūvētā virtuves iekārta izstrādāta divstāvu privātmājā Babītē. Tajā izmantotas dabīgā ozola fasādes ar saskaņotu koksnes tekstūru un eleganta akmens darba virsma. Koka detaļas ir tonētas siltā smilšu tonī un lakotas ar ekoloģisku, ūdens bāzes matēto laku. Aprīkota ar pilnībā integrētu Blum klusās aizvēršanas furnitūru un slēpto LED apgaismojumu darba virsmām.",
    descriptionEN: "A built-in kitchen set designed for a two-story private home in Babīte. It features natural oak facades with matched wood grain and an elegant stone worktop. Wooden details are tinted in a warm sand tone and varnished with an eco-friendly water-based matte lacquer. Equipped with integrated Blum soft-close hardware and hidden countertop LED lighting.",
    materials: "Ozols, akmens virsma",
    materialsEN: "Oak, stone surface",
    year: "2024"
  },
  {
    id: 3,
    title: "TV apdare un mediju siena viesistabā",
    titleEN: "TV wall wood cladding and media unit in living room",
    category: "Viesistaba",
    images: [living1, living2],
    description: "Mūsdienīga TV apdare, kas izgatavota dzīvoklim Rīgas centrā. Korpuss izstrādāts no premium ozola finierējuma, bet fasādes veidotas no smalki rievota masīvkoka profilējuma, kas tonēts ar pelēko eļļas vasku. Mēbelē iestrādāti slēptie kabeļu kanāli un integrēta silta, dimmējama LED fona gaisma izsmalcinātam un mājīgam interjera akcentam.",
    descriptionEN: "A modern TV wall wood cladding and media unit crafted for an apartment in the center of Rīga. The body is built with premium oak veneer, while the facades feature finely ribbed solid wood profiles treated with grey oil wax. Features integrated cable routing channels and warm, dimmable LED backlight accents.",
    materials: "Masīvs ozols, LED",
    materialsEN: "Solid oak, LED",
    year: "2025"
  },
  {
    id: 4,
    title: "Ozolkoka guļamistabas mēbeļu komplekts",
    titleEN: "Oak bedroom furniture set",
    category: "Guļamistaba",
    images: [bedroom1, bedroom2, bedroom3, bedroom4, bedroom5, bedroom6],
    description: "Guļamistabas mēbeļu komplekts privātmājai Ādažos. Gultas rāmis un pie sienas montētie naktsskapīši izgatavoti von īpaši atlasītiem ozolkoka dēļiem, kas pulēti ar dabīgo vasku. Galvgalis apvilkts ar nodilumizturīgu dabisko lina maisauduma tekstilu. Pie sienas montētie naktsskapīši rada gaisīgu un modernu efektu telpā.",
    descriptionEN: "A bedroom furniture collection for a private house in Ādaži. The bed frame and wall-mounted bedside tables are made of specially selected oak planks polished with natural wax. The headboard is upholstered in highly durable natural linen textile. The wall-mounted bedside tables create a light and modern feel in the space.",
    materials: "Ozols, tekstils",
    materialsEN: "Oak, textile",
    year: "2025"
  },
  {
    id: 5,
    title: "Ekskluzīvas mitrumizturīgas ozolkoka mēbeles vannas istabai",
    titleEN: "Premium humidity-resistant solid oak bathroom vanity system",
    category: "Vannas istaba",
    images: [bathroom1, bathroom2, bathroom3, bathroom4],
    description: "Izsmalcināts vannas istabas mēbeļu komplekts, kas izgatavots no speciāli apstrādāta mitrumizturīga masīvā ozolkoka, kas aizsargāts ar speciālu eļļu. Komplektā ietilpst atvilktņu un durvju konsoles komplekts ar izlietni un spoguli, kurā iestrādāts slēpts LED aizmugures apgaismojums.",
    descriptionEN: "A sophisticated master bathroom furniture set crafted from custom-treated humidity-resistant solid oak, sealed with premium protective oil. The set features a drawer and door vanity console with a sink and a matching mirror with integrated hidden LED backlighting.",
    materials: "Mitrumizturīgs ozols, LED",
    materialsEN: "Moisture-resistant oak, LED",
    year: "2024"
  }
];

const PORTFOLIO_NAV_CATEGORIES: ("Kāpnes" | "Virtuve" | "Viesistaba" | "Guļamistaba" | "Vannas istaba")[] = [
  "Kāpnes", 
  "Virtuve", 
  "Viesistaba", 
  "Guļamistaba", 
  "Vannas istaba"
];

const catParamMap: Record<string, string> = {
  "Kāpnes": "kapnes",
  "Virtuve": "virtuve",
  "Viesistaba": "viesistaba",
  "Guļamistaba": "gulamistaba",
  "Vannas istaba": "vannas-istaba"
};

const paramCatMap: Record<string, "Kāpnes" | "Virtuve" | "Viesistaba" | "Guļamistaba" | "Vannas istaba"> = {
  "kapnes": "Kāpnes",
  "virtuve": "Virtuve",
  "viesistaba": "Viesistaba",
  "gulamistaba": "Guļamistaba",
  "vannas-istaba": "Vannas istaba",
  "stairs": "Kāpnes",
  "kitchen": "Virtuve",
  "livingroom": "Viesistaba",
  "bedroom": "Guļamistaba",
  "bathroom": "Vannas istaba"
};

// --- LogoImage Component ---
const LogoImage = ({ className, isDarkBackground = false }: { className?: string; isDarkBackground?: boolean }) => {
  return (
    <img
      src={logoCleanImg}
      alt="AVANGART logo"
      loading="eager"
      referrerPolicy="no-referrer"
      className={cn(
        "object-contain select-none transition-all duration-300",
        isDarkBackground ? "brightness-0 invert opacity-95" : "brightness-100",
        className
      )}
    />
  );
};

// --- FAQ & Navigation Types and Components ---
interface FAQItem {
  id: number;
  question: string;
  intro?: string;
  bullets?: string[];
  outro?: string;
  questionEN?: string;
  introEN?: string;
  bulletsEN?: string[];
  outroEN?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "Cik ilgā laikā tiek izgatavotas un uzstādītas koka kāpnes?",
    intro: "Izgatavošanas termiņš ir atkarīgs no projekta sarežģītības, materiāliem un noslodzes, taču vidēji pilns process aizņem no 3 līdz 8 nedēļām. Tas ietver uzmērīšanu, dizaina izstrādi, ražošanu un montāžu.",
    questionEN: "How long does it take to manufacture and install wooden stairs?",
    introEN: "The manufacturing time depends on the complexity of the project, materials, and current workshop schedule, but on average, the full process takes from 3 to 8 weeks. This includes site measurement, design approval, production, and installation."
  },
  {
    id: 2,
    question: "Cik ilgā laikā tiek izgatavotas un uzstādītas virtuves mēbeles?",
    intro: "Virtuves mēbeļu izgatavošanas termiņš parasti ir no 4 līdz 10 nedēļām, atkarībā no projekta sarežģītības, izvēlētajiem materiāliem un furnitūras. Termiņā ietilpst projektēšana, ražošana un montāža objektā.",
    questionEN: "How long does it take to manufacture kitchen furniture and systems?",
    introEN: "Bespoke kitchen furniture typically takes 4 to 10 weeks to manufacture and assemble, depending on overall layout, selected surface materials, and internal fittings. This includes architectural planning, production, and professional assembly."
  },
  {
    id: 3,
    question: "Vai iespējams izgatavot kāpnes pilnībā pēc individuāla dizaina?",
    intro: "Jā. Katrs projekts tiek pielāgots konkrētajai telpai, interjeram un klienta vēlmēm. Iespējams izvēlēties:",
    bullets: [
      "pakāpienu formu,",
      "margu dizainu,",
      "koka toni,",
      "metāla vai stikla elementus,",
      "apgaismojumu,",
      "kā arī dažādus modernus vai klasiskus risinājumus."
    ],
    questionEN: "Is it possible to manufacture a staircase fully customized to our specific layout?",
    introEN: "Yes, absolutely. Every commission we undertake is fully adjusted to your unique room structure, inner style, and personal taste. You are completely free to customize:",
    bulletsEN: [
      "the format and profile of steps,",
      "railing profile and glass panels,",
      "timber species and custom finish tones,",
      "integrated LED step lights,",
      "structural steel or composite structures,",
      "as well as and any other contemporary or classic woodworking elements."
    ]
  },
  {
    id: 4,
    question: "Kādi materiāli tiek izmantoti koka kāpņu izgatavošanā?",
    intro: "Visbiežāk tiek izmantots:",
    bullets: [
      "ozols,",
      "osis,",
      "bērzs,",
      "priede,",
      "kā arī metāls un stikls kombinētos dizainos."
    ],
    outro: "Materiāli tiek izvēlēti atbilstoši vēlamajam dizainam, izturībai un budžetam.",
    questionEN: "What premium raw materials do we select for building stair structures?",
    introEN: "We primarily manufacture using high-grade materials:",
    bulletsEN: [
      "prime solid oak,",
      "premium European ash,",
      "stable Northern birch,",
      "solid structural pine,",
      "combined dry metals, and tempered safety glass."
    ],
    outroEN: "All selected resources are hand-picked to match structural durability requirements, design vision, and budget definitions."
  },
  {
    id: 5,
    question: "Vai iespējams pasūtīt arī individuālas mēbeles vai virtuves iekārtas vienotā stilā ar kāpnēm?",
    intro: "Jā. Papildus kāpnēm iespējams izgatavot:",
    bullets: [
      "virtuves iekārtas,",
      "skapjus,",
      "galdus,",
      "TV sienas,",
      "vannasistabas mēbeles,",
      "un citus interjera elementus vienotā dizaina stilā."
    ],
    outro: "Tas ļauj izveidot harmonisku un kvalitatīvu interjeru visā mājoklī.",
    questionEN: "Can we order both bespoke furniture or kitchens matching our new staircase style?",
    introEN: "Yes. To construct complete residence design cohesion, we specialize in building matching pieces alongside stairs:",
    bulletsEN: [
      "custom integrated kitchen sets,",
      "engineered wardrobes and closets,",
      "matching dining or coffee tables,",
      "modular media and TV wall displays,",
      "bespoke floating bathroom vanities,",
      "and other bespoke millwork details styled to fit your interior direction."
    ],
    outroEN: "This service ensures a visually balanced and uniform architectural style across all rooms."
  },
  {
    id: 6,
    question: "Kā notiek sadarbības process no idejas līdz gatavam rezultātam?",
    intro: "Sadarbība parasti notiek šādi:",
    bullets: [
      "Konsultācija un ideju apspriešana;",
      "Objekta uzmērīšana;",
      "3D vizualizācijas/maketa izveide;",
      "Dizaina un izmaksu piedāvājuma sagatavošana;",
      "Ražošana;",
      "Piegāde un profesionāla uzstādīšana."
    ],
    outro: "Klients tiek iesaistīts visos svarīgākajos posmos, lai gala rezultāts pilnībā atbilstu vēlmēm, telpai un interjera stilam.",
    questionEN: "What steps are involved in the collaborative workflow from first contact to key hand-off?",
    introEN: "Our systematic step-by-step custom design process runs as follows:",
    bulletsEN: [
      "Initial consultation and idea sharing;",
      "Precise on-site laser dimensioning study;",
      "3D CAD visual design modeling & drafts;",
      "Detailed proposal and price visualization;",
      "Careful workshop manufacturing by our master carpenters;",
      "Cushioned secure delivery and white-glove installation."
    ],
    outroEN: "We involve you in all key milestones to confirm the final fit aligns with your custom design expectations, style, and structure."
  },
  {
    id: 7,
    question: "Vai iespējams apvienot koku ar metālu, stiklu vai citiem materiāliem?",
    intro: "Jā. Mūsdienu interjeros ļoti pieprasīti ir kombinētie risinājumi, kuros koks tiek apvienots ar:",
    bullets: [
      "metālu,",
      "stiklu,",
      "akmens virsmām,",
      "LED apgaismojumu,",
      "vai dekoratīviem paneļiem."
    ],
    outro: "Tas ļauj izveidot modernu, izturīgu un vizuāli unikālu dizainu.",
    questionEN: "Can we combine timber with custom metals, smart glass, or other texture finishes?",
    introEN: "Yes. Modern architectural spaces frequently leverage composite systems. We seamlessly merge fine wood with:",
    bulletsEN: [
      "blackened, brushed, or stainless steel profiles,",
      "tempered, clear, or frosted architectural glass panels,",
      "engineered stone or sintered porcelain surfaces,",
      "ambient low-voltage LED step lights,",
      "and acoustic wood-slat wall panel details."
    ],
    outroEN: "This approach delivers visually outstanding, modern, and highly structural customized products."
  },
  {
    id: 8,
    question: "Vai iespējams izgatavot kāpnes nestandarta telpām vai sarežģītiem plānojumiem?",
    intro: "Jā. Individuāla izgatavošana ir īpaši piemērota nestandarta situācijām:",
    bullets: [
      "šaurām telpām,",
      "augstiem griestiem,",
      "mansardiem,",
      "loft tipa interjeriem,",
      "vai projektiem ar specifiskām dizaina prasībām."
    ],
    outro: "Katrs risinājums tiek pielāgots konkrētajai telpai un tās tehniskajām iespējām.",
    questionEN: "Are you able to engineer stairs for compact, angled, or non-standard rooms?",
    introEN: "Yes, custom spatial engineering is our key strength. We excel in complex conditions such as:",
    bulletsEN: [
      "highly compact or narrow landing zones,",
      "ultra-high ceilings requiring custom structures,",
      "tight attics and sloped loft configurations,",
      "modern open-concept industrial environments,",
      "or specific design limitations defined by structural engineers."
    ],
    outroEN: "Every framework is custom-crafted to fit safely, maximizing utility and respecting architectural guidelines."
  },
  {
    id: 9,
    question: "Kā tiek aprēķinātas izmaksas individuālam pasūtījumam?",
    intro: "Izmaksas ietekmē:",
    bullets: [
      "izmēri,",
      "materiāli,",
      "dizaina sarežģītība,",
      "furnitūra,",
      "apdares veids,",
      "kā arī montāžas specifika."
    ],
    outro: "Pēc konsultācijas un uzmērīšanas tiek sagatavots individuāls piedāvājums ar precīzām izmaksām.",
    questionEN: "How do you calculate the project proposal for a custom millwork order?",
    introEN: "Every piece has a bespoke quote. Pricing depends primarily on:",
    bulletsEN: [
      "exact dimensions and flight height configs,",
      "wood class and lumber selections,",
      "complexity in joinery, curves, or structural details,",
      "hinges, mechanisms, or functional hardware series,",
      "surface processing oils, lacquers, or coloring paints,",
      "and site installation constraints."
    ],
    outroEN: "A transparent itemized cost estimate is prepared for you following initial counseling and measurement."
  },
  {
    id: 10,
    question: "Vai tiek nodrošināta piegāde un uzstādīšana?",
    intro: "Jā. Tiek nodrošināts pilns pakalpojums:",
    bullets: [
      "piegāde,",
      "profesionāla montāža,",
      "regulēšana pēc uzstādīšanas,",
      "kā arī konsultācijas par kopšanu un ekspluatāciju."
    ],
    outro: "Tas ļauj klientam saņemt pilnībā gatavu rezultātu bez nepieciešamības piesaistīt citus speciālistus.",
    questionEN: "Is secure transport and professional installation handled directly by your workshop?",
    introEN: "Yes, we guarantee single-source responsibility. Our premium services include:",
    bulletsEN: [
      "secure custom transport to protect finishes,",
      "precision on-site joinery and assembly by our own carpenters,",
      "accurate micro-alignments, hardware setups,",
      "and guidelines on natural wood care and maintenance."
    ],
    outroEN: "This keeps responsibility in our hands and lets you enjoy a clean, finished, ready-to-live product."
  },
  {
    id: 11,
    question: "Kāda garantija tiek nodrošināta Jūsu izgatavotajām kāpnēm un mēbelēm?",
    intro: "Visiem AVANGART izgādātajiem materiāliem un uzstādīšanas darbiem mēs nodrošinām oficiālu 2 gadu (24 mēnešu) garantiju. Tā kā mēs ticam mūsu konstrukciju ilgmūžībai un meistaru darba kvalitātei, mēs sniedzam:",
    bullets: [
      "Garantiju pret konstrukciju deformāciju vai plaisāšanu saprātīgos ekspluatācijas apstākļos;",
      "Garantiju pret pakāpienu čīkstēšanu un mezglu stiprinājumu atslāpšanu;",
      "Garantiju izmantotajai premium Eiropas furnitūrai (piemēram, Blum) saskaņā ar ražotāja sniegtajiem nosacījumiem."
    ],
    outro: "Garantija ir spēkā, ja tiek ievēroti pareizas koka kopšanas un telpas mikroklimata noteikumi (optimāls mitruma un temperatūras režīms).",
    questionEN: "What warranty is provided for your custom staircases and bespoke furniture?",
    introEN: "We provide an official 2-year (24-month) warranty for all AVANGART custom-fabricated materials and professional installation works. Believing in the extreme durability of our structures and the class of our craft, we deliver:",
    bulletsEN: [
      "warranty against structural deformation or splintering under standard indoor climates,",
      "warranty against squeaks in steps or loosening of invisible structural anchors,",
      "warranty for premium European hardware fittings (such as Blum) in accordance layout and manufacturer terms."
    ],
    outroEN: "The warranty remains valid provided proper maintenance guidelines are respected and balanced room humidity and temperature metrics are sustained."
  }
];

const FAQAccordion = ({ items, lang }: { items: FAQItem[], lang: "LV" | "ENG" }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto text-left py-1">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const questionText = lang === "ENG" && item.questionEN ? item.questionEN : item.question;
        const introText = lang === "ENG" && item.introEN ? item.introEN : item.intro;
        const bulletsList = lang === "ENG" && item.bulletsEN ? item.bulletsEN : item.bullets;
        const outroText = lang === "ENG" && item.outroEN ? item.outroEN : item.outro;

        return (
          <div 
            key={item.id} 
            className="border border-zinc-200 bg-white shadow-sm transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center p-5 text-left text-brand-brown-dark hover:text-brand-orange transition-colors cursor-pointer select-none"
            >
              <span className="font-serif font-bold text-sm md:text-base leading-snug">
                {item.id}. {questionText}
              </span>
              <span className="p-1 text-brand-orange shrink-0 ml-4">
                <ChevronDown 
                  size={18} 
                  className={cn(
                    "transition-transform duration-300", 
                    isOpen ? "rotate-180" : ""
                  )} 
                />
              </span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 0.99 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-1 text-zinc-650 font-light text-xs md:text-sm leading-relaxed border-t border-zinc-100">
                    {introText && <p className="mb-2">{introText}</p>}
                    {bulletsList && bulletsList.length > 0 && (
                      <ul className="list-disc pl-5 mb-2 mt-2 space-y-1">
                        {bulletsList.map((bullet, idx) => (
                          <li key={idx} className="marker:text-brand-orange">{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {outroText && <p className="mt-2">{outroText}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const BackToHomeButton = ({ lang }: { lang?: "LV" | "ENG" }) => {
  return (
    <button
      onClick={() => {
        window.location.hash = lang === "ENG" ? "#home" : "#sakums";
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
      className="inline-flex items-center space-x-2 btn-wood-oak text-white text-[10px] tracking-widest font-extrabold uppercase py-2.5 px-5 cursor-pointer rounded-none shadow-sm"
    >
      <ArrowLeft size={13} className="mr-1" />
      <span>{lang === "ENG" ? "Back to home" : "Atpakaļ uz sākumu"}</span>
    </button>
  );
};

const ScrollToTopButton = ({ lang }: { lang?: "LV" | "ENG" }) => {
  return (
    <div className="pt-12 border-t border-zinc-200/60 mt-12 flex justify-center">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="inline-flex items-center justify-center space-x-3 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
      >
        <ArrowUp size={15} />
        <span>{lang === "ENG" ? "To top" : "Uz augšu"}</span>
      </button>
    </div>
  );
};

// --- Navbar Component ---
interface NavbarProps {
  currentPath: string;
  lang: "LV" | "ENG";
  onLanguageChange: (newLang: "LV" | "ENG") => void;
}

const Navbar = ({ currentPath, lang, onLanguageChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = lang === "ENG" ? [
    { name: "Home", href: "#home" },
    { name: "Work process", href: "#work-process" },
    { name: "Portfolio", href: "#portfolio-stairs" },
    { name: "Cooperation", href: "#cooperation" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ] : [
    { name: "Sākums", href: "#sakums" },
    { name: "Darba gaita", href: "#darba-gaita" },
    { name: "Portfolio", href: "#portfolio-kapnes" },
    { name: "Sadarbība ar dizaineriem", href: "#sadarbiba-dizaineriem" },
    { name: "BUJ", href: "#buj" },
    { name: "Kontakti", href: "#kontakti" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Custom handling for homepage hash sub-scrolls
    if (href.startsWith("#sakums#") || href.startsWith("#home#")) {
      const subSectionId = href.split("#")[2];
      const isCurrentlyHome = currentPath.startsWith("#sakums") || currentPath.startsWith("#home") || currentPath === "" || currentPath === "#";
      if (isCurrentlyHome) {
        window.location.hash = href;
        setTimeout(() => {
          const el = document.getElementById(subSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        window.location.hash = href;
      }
    } else {
      window.location.hash = href;
    }
  };

  const isHomeActive = currentPath.startsWith('#sakums') || currentPath.startsWith('#home') || currentPath === '' || currentPath === '#';

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-colors duration-100 px-6 py-0.5 md:py-1",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md border-b border-zinc-200/50" 
        : (isHomeActive
            ? "bg-gradient-to-b from-black/50 via-black/25 to-transparent text-white"
            : "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200/50"
          )
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-transparent">
        <a 
          href={lang === "ENG" ? "#home" : "#sakums"} 
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(lang === "ENG" ? "#home" : "#sakums");
          }}
          className="flex items-center select-none cursor-pointer outline-none transition-transform hover:scale-[1.02] h-auto"
        >
          <LogoImage 
            isDarkBackground={!(isScrolled || !isHomeActive)} 
            className="w-auto h-[61px] sm:h-[74px] md:h-[88px]"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href || 
                (link.href === '#portfolio-kapnes' && currentPath.startsWith('#portfolio')) ||
                (link.href === '#portfolio-stairs' && currentPath.startsWith('#portfolio')) ||
                ((currentPath === '#sakums' || currentPath === '#home' || currentPath === '' || currentPath === '#') && (link.href === '#sakums' || link.href === '#home'));
              return (
                <button 
                  key={link.name} 
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "text-[11px] md:text-[12px] uppercase tracking-widest font-extrabold transition-all duration-150 cursor-pointer border-b-2 pb-0.5",
                    isActive 
                      ? ((isScrolled || !isHomeActive) ? "text-brand-orange border-brand-orange" : "text-brand-orange-light border-brand-orange-light")
                      : "border-transparent " + ((isScrolled || !isHomeActive) ? "text-brand-grey hover:text-brand-orange" : "text-white/90 hover:text-white drop-shadow-sm")
                  )}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
          <div className={cn("h-4 w-px", (isScrolled || !isHomeActive) ? "bg-zinc-300" : "bg-white/30")} />
          <div className="flex items-center space-x-2 text-[11px] md:text-[12px] uppercase tracking-widest font-extrabold select-none">
            <button 
              onClick={() => onLanguageChange("LV")}
              className={cn(
                "cursor-pointer transition-colors duration-150 outline-none", 
                lang === "LV"
                  ? ((isScrolled || !isHomeActive) ? "text-brand-orange" : "text-brand-orange-light")
                  : ((isScrolled || !isHomeActive) ? "text-zinc-400 hover:text-brand-orange" : "text-white/60 hover:text-white")
              )}
            >
              LV
            </button>
            <span className={cn((isScrolled || !isHomeActive) ? "text-zinc-300" : "text-white/40")}>/</span>
            <button 
              onClick={() => onLanguageChange("ENG")}
              className={cn(
                "cursor-pointer transition-colors duration-155 outline-none", 
                lang === "ENG"
                  ? ((isScrolled || !isHomeActive) ? "text-brand-orange" : "text-brand-orange-light")
                  : ((isScrolled || !isHomeActive) ? "text-zinc-400 hover:text-brand-orange" : "text-white/60 hover:text-white")
              )}
            >
              ENG
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-2 transition-colors cursor-pointer",
            (isScrolled || !isHomeActive) ? "text-brand-brown hover:text-brand-orange" : "text-white hover:text-brand-orange-light"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          id="mobile-nav-toggle"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-8 flex flex-col space-y-6 lg:hidden shadow-xl"
            id="mobile-nav-dropdown"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 border-b border-zinc-100 text-base font-serif tracking-wide text-brand-brown-dark hover:text-brand-orange font-medium"
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs uppercase tracking-widest font-extrabold text-brand-grey">{lang === "ENG" ? "Language" : "Valoda / Language"}</span>
              <div className="flex items-center space-x-3 text-sm uppercase tracking-widest font-extrabold select-none">
                <button 
                  onClick={() => { onLanguageChange("LV"); setIsMobileMenuOpen(false); }}
                  className={cn("cursor-pointer transition-colors duration-200", lang === "LV" ? "text-brand-orange font-black" : "text-zinc-400 hover:text-brand-orange")}
                >
                  LV
                </button>
                <span className="text-zinc-300">/</span>
                <button 
                  onClick={() => { onLanguageChange("ENG"); setIsMobileMenuOpen(false); }}
                  className={cn("cursor-pointer transition-colors duration-200", lang === "ENG" ? "text-brand-orange font-black" : "text-zinc-400 hover:text-brand-orange")}
                >
                  ENG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Homepage (Sākums) Component ---
interface HomeViewProps {
  onNavigateToContact: () => void;
  lang: "LV" | "ENG";
}

const HomeView = ({ onNavigateToContact, lang }: HomeViewProps) => {
  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center bg-brand-grey-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={staircaseHeroImg} 
            alt="Avangart mākslas un kāpņu dizains" 
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-grey-dark/95 via-brand-grey-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl text-white font-sans"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-orange/25 text-brand-orange px-4 py-1.5 uppercase text-[10px] tracking-[0.3em] font-extrabold mb-6 border border-brand-orange/40">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></span>
              <span>{lang === "ENG" ? "Bespoke projects and design solutions" : "Individuāli projekti un dizaina risinājumi"}</span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-[36px] lg:text-[40px] font-serif leading-tight mb-6 tracking-tight">
              {lang === "ENG" ? (
                <>
                  Modern design and modern <br className="hidden md:inline" />
                  technologies combined <br className="hidden md:inline" />
                  with master craftsmanship
                </>
              ) : (
                <>
                  Moderns dizains un mūsdienu <br className="hidden md:inline" />
                  tehnoloģijas apvienojumā <br className="hidden md:inline" />
                  ar meistara darbu
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-light mb-8 opacity-95 tracking-wide max-w-xl leading-relaxed text-zinc-200 border-l-2 border-brand-orange pl-6">{lang === "ENG"
              ? "AVANGART specializes in manufacturing custom stairs, premium furniture, and other bespoke interior items. Our work combines bold design with uncompromising quality."
              : "AVANGART nodarbojas ar kāpņu, ekskluzīvu mēbeļu un citu mājas interjera priekšmetu izgatavošanu pēc individuāla pasūtījuma. Mūsu darbs apvieno mūsdienīgu dizainu ar bezkompromisa kvalitāti."}</p>

            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              <button 
                onClick={() => {
                  window.location.hash = lang === 'ENG' ? '#portfolio-stairs' : '#portfolio-kapnes';
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="inline-flex items-center justify-center bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <span>{lang === "ENG" ? "Implemented projects" : "Īstenotie projekti"}</span>
              </button>
              <button 
                onClick={onNavigateToContact}
                className="inline-flex items-center justify-center space-x-4 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
              >
                <span>{lang === "ENG" ? "Contact us" : "Sazināties ar mums"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-zinc-350 text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">
              <span>{lang === "ENG" ? "Premium stairs" : "Premium kāpnes"}</span>
              <span className="text-brand-orange">•</span>
              <span>{lang === "ENG" ? "Design furniture" : "Dizaina mēbeles"}</span>
              <span className="text-brand-orange">•</span>
              <span>{lang === "ENG" ? "Interior design" : "Interjera dizains"}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Precizitātes un detaļu sadaļa (Precision in every detail) */}
      <section id="precision" className="pt-10 pb-6 md:pt-14 md:pb-8 bg-white border-b border-zinc-100/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Satura kolonna (Now on the left side) */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold block">{lang === "ENG" ? "Precision down to the millimetre" : "Kvalitāte bez kompromisiem"}</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-brand-brown-dark">{lang === "ENG" ? "Precision in every detail" : "Precizitāte katrā detaļā"}</h2>
              <div className="space-y-6 text-brand-grey font-light text-sm md:text-base leading-relaxed">
                <p><strong>AVANGART</strong> {lang === "ENG" 
                  ? "is a design furniture studio where innovative production technologies, refined aesthetics, and the best craftsmanship traditions are combined. We create furniture and living design elements that are not just objects, but creators of space character."
                  : "ir dizaina mēbeļu studija, kurā apvienotas inovatīvas ražošanas tehnoloģijas, izsmalcināta estētika un labākās amatniecības tradīcijas. Mēs radām mēbeles un mājokļa dizaina elementus, kas nav tikai priekšmeti, bet gan telpas rakstura veidotāji."}</p>
                <p>{lang === "ENG" 
                  ? "Every detail we create is carefully thought out, using only the highest quality materials — from solid oak to innovative composite materials. Our goal is to create an environment that inspires and will serve for generations."
                  : "Katra mūsu radītā detaļa ir rūpīgi pārdomāta, izmantojot tikai augstvērtīgākos materiālus — sākot no masīva ozolkoka līdz inovatīviem kompozītmateriāliem. Mūsu mērķis ir radīt vidi, kas iedvesmo un kalpos daudzus gadus."}</p>
              </div>
              <div className="pt-4">
                <div className="h-0.5 w-16 bg-brand-orange" />
              </div>
            </motion.div>

            {/* Attēla kolonna (Now on the right side) */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 relative aspect-[4/3] overflow-hidden shadow-2xl border border-zinc-200 bg-zinc-50"
            >
              <img 
                src={kitchen1} 
                alt="Smalkas mēbeļu detaļas un telpas raksturs" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-brown-dark/5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Par mums section */}
      <section id="about" className="pt-6 pb-10 md:pt-8 md:pb-14 bg-brand-grey-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Exquisite joinery craftsmanship" : "Izcila amatniecības māksla"}</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-brand-brown-dark mb-6">{lang === "ENG" ? "Staircases and furniture with lasting value" : "Kāpnes un mēbeles ar paliekošu vērtību"}</h2>
              <div className="space-y-5 text-brand-grey leading-relaxed text-sm md:text-base font-light">
                {lang === "ENG" ? (
                  <>
                    <p>We believe that a home is a mirror of your personality, the main structure of which consists of solid and lovingly crafted elements. Since day one, AVANGART has been creating solutions that serve both as a functional tool and as a unique design sculpture.</p>
                    <p>Precise woodwork in our well-planned AVANGART workshop allows us to realize the most complex orders – from airy, modern wood and iron constructions to solid, minimalistic kitchen and living room furniture, completed with innovative technologies and elegant LED lighting.</p>
                    <p className="font-semibold text-brand-brown text-sm">We design, manufacture, and install solutions from initial sketches down to the very last screw.</p>
                  </>
                ) : (
                  <>
                    <p>Kopš pirmās dienas AVANGART rada risinājumus, kuri kalpo gan kā funkcionāls rīks, gan kā unikāls dizaina elements.</p>
                    <p>Precīza koka apstrāde pārdomātajā AVANGART darbnīcā ļauj mums realizēt vissarežģītāko – no gaisīgām un modernām koka un dzelzs konstrukcijām līdz masīvām, lakoniskām virtuves un viesistabas mēbelēm, kas papildinātas ar inovatīvām tehnoloģijām un gaumīgu LED apgaismojumu.</p>
                    <p className="font-semibold text-brand-brown text-sm">Mēs projektējam, ražojam un uzstādām risinājumus no idejas skices līdz pat pēdējai skrūvītei.</p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45 }}
              className="relative aspect-[16/11] lg:aspect-[4/3] overflow-hidden shadow-xl border border-zinc-200 bg-zinc-300"
            >
              <img 
                src={stair1} 
                alt="Modernas kāpnes dizaina mājā" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-brown/5 hover:bg-transparent transition-all duration-300" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm py-3 px-5 shadow-lg border-l-4 border-brand-orange">
                <p className="text-[9px] uppercase tracking-[0.2em] text-brand-grey font-extrabold">{lang === "ENG" ? "Made in Latvia" : "Ražots Latvijā"}</p>
                <p className="text-xs font-serif font-bold text-brand-brown-dark">{lang === "ENG" ? "100% Bespoke Craft" : "100% individuāls darbs"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kā notiek darbs (Process) Section */}
      <ProcessPr lang={lang} />

      {/* Portfolio Teaser Block */}
      <section className="pt-14 pb-8 md:pt-20 md:pb-10 bg-zinc-50 border-t border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-brown-dark mb-4 max-w-xl mx-auto leading-tight">{lang === "ENG" ? "Our implemented projects" : "Mūsu īstenotie projekti"}</h2>
          <p className="text-zinc-500 font-light text-sm max-w-2xl mx-auto leading-relaxed mb-8">{lang === "ENG"
            ? "We design and build exclusive stairs, built-in furniture and kitchen installations, shelves, as well as design elements that will perfectly fit into your home's overall mood."
            : "Dizainējam un būvējam ekskluzīvas kāpnes, iebūvētās mēbeles un virtuves iekārtas, plauktus, kā arī dizaina elementus, kas lieliski iekļausies Jūsu mājokļa kopējā noskaņā."}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto mb-12 text-left">
            {[
              {
                titleLV: "Koka kāpnes",
                titleEN: "Wooden Stairs",
                img: stair1,
                hashLV: "#portfolio-kapnes",
                hashEN: "#portfolio-stairs"
              },
              {
                titleLV: "Virtuves iekārtas",
                titleEN: "Kitchen Systems",
                img: kitchen1,
                hashLV: "#portfolio-virtuve",
                hashEN: "#portfolio-kitchen"
              },
              {
                titleLV: "Iebūvētās mēbeles",
                titleEN: "Living Room Furniture",
                img: living1,
                hashLV: "#portfolio-viesistaba",
                hashEN: "#portfolio-livingroom"
              },
              {
                titleLV: "Guļamistaba",
                titleEN: "Bedroom Suite",
                img: bedroom1,
                hashLV: "#portfolio-gulamistaba",
                hashEN: "#portfolio-bedroom"
              },
              {
                titleLV: "Vannas istaba",
                titleEN: "Bathroom",
                img: bathroom1,
                hashLV: "#portfolio-vannas-istaba",
                hashEN: "#portfolio-bathroom"
              }
            ].map((card, idx) => (
              <button
                key={idx}
                onClick={() => {
                  window.location.hash = lang === "ENG" ? card.hashEN : card.hashLV;
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="group flex flex-col bg-white shadow-sm border border-zinc-200/70 overflow-hidden hover:border-brand-orange hover:shadow-md transition-all duration-300 w-full text-center cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                  <img
                    src={card.img}
                    alt={card.titleLV}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="p-4 flex items-center justify-center min-h-[64px] border-t border-zinc-100">
                  <h4 className="font-serif font-bold text-xs text-brand-brown-dark group-hover:text-brand-orange transition-colors duration-200 uppercase tracking-widest leading-snug">
                    {lang === "ENG" ? card.titleEN : card.titleLV}
                  </h4>
                </div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => { window.location.hash = lang === "ENG" ? "#portfolio-stairs" : "#portfolio-kapnes"; }}
            className="inline-flex items-center justify-center space-x-3 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-wider font-extrabold hover:scale-102 transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>{lang === "ENG" ? "View portfolio" : "Apskatīt portfolio"}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Sākuma BUJ Section (In design alignment with other blocks) */}
      <section id="sakums-buj" className="pt-8 pb-14 md:pt-10 md:pb-20 bg-white border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Frequently Asked Questions" : "Biežāk uzdotie jautājumi"}</span>
          <h2 className="text-xl md:text-3xl font-serif text-brand-brown-dark mb-10 max-w-xl mx-auto leading-tight">{lang === "ENG" ? "Learn more about our work" : "Uzziniet vairāk par mūsu darbu"}</h2>

          <FAQAccordion items={FAQ_ITEMS.slice(0, 5)} lang={lang} />

          <div className="mt-12">
            <button 
              onClick={() => { window.location.hash = lang === "ENG" ? "#faq" : "#buj"; }}
              className="inline-flex items-center justify-center space-x-3 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-wider font-extrabold hover:scale-102 transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>{lang === "ENG" ? "Read all FAQs" : "Lasīt visus BUJ"}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Repositioned Counters - Place where homepage content ends, above the bottom banner */}
      <section className="py-10 bg-brand-grey-dark text-white border-t border-brand-orange/15 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800">
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-serif text-brand-orange-light font-bold mb-1">15+</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">
                {lang === "ENG" ? "Years Experience" : "Gadi Pieredze"}
              </div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-serif text-brand-orange-light font-bold mb-1">450+</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">
                {lang === "ENG" ? "Completed spaces" : "Realizēti Interjeri"}
              </div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-serif text-brand-orange-light font-bold mb-1">100%</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">
                {lang === "ENG" ? "Handcrafted" : "Roku Darbs"}
              </div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-serif text-brand-orange-light font-bold mb-1">A+</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">
                {lang === "ENG" ? "Quality timber" : "Kvalitātes Koksne"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner instead of the contact form */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-grey-light to-zinc-100 flex items-center justify-center border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-brown-dark tracking-tight leading-tight">
            {lang === "ENG" ? "Ready for a fresh transformation in your home?" : "Vai esat gatavs jaunām pārmaiņām savā mājoklī?"}
          </h2>
          <p className="text-zinc-500 font-light text-sm max-w-xl mx-auto">
            {lang === "ENG"
              ? "AVANGART master craftsmen and designers are ready to turn your concept into a superb masterpiece."
              : "AVANGART amata meistari un dizaineri ir gatavi pārvērst Jūsu ideju izcilā meistardarbā."}
          </p>
          <div className="pt-2">
            <button 
              onClick={onNavigateToContact}
              className="inline-flex items-center space-x-3 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-widest font-extrabold hover:scale-102 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>{lang === "ENG" ? "Contact us" : "Sazināties ar mums"}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom row back to top */}
      <div className="bg-zinc-50 py-10 border-t border-zinc-200 flex justify-center">
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="inline-flex items-center justify-center space-x-3 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
        >
          <ArrowUp size={15} />
          <span>{lang === "ENG" ? "To top" : "Uz augšu"}</span>
        </button>
      </div>
    </div>
  );
};

// --- Darba gaita (Process) Component ---
interface ProcessPrProps {
  lang: "LV" | "ENG";
}

const ProcessPr = ({ lang }: ProcessPrProps) => {
  const steps = lang === "ENG" ? [
    {
      num: "01",
      title: "Consultation & Design Concept",
      desc: "Our collaboration always begins with an in-depth conversation. We carefully explore your wishes, needs, and space constraints, offering a custom sketch of premium wood and metal pairings. This initial phase ensures every edge of your staircase or custom furniture reflects your personal taste. We conduct an on-site evaluation and prepare recommendation schemas for ergonomics.",
      img: step1Img,
      badge: "Initial Discovery"
    },
    {
      num: "02",
      title: "3D Modeling & Technical CAD",
      desc: "Next, we develop high-precision 3D digital models to visualize structure and form. Our engineering team prepares full technical worksheets and structural stress calculations. We hand-select appropriate timber species (oak, ash, walnut) matching your project requirements and prepare custom finish samples. Only when every mounting bracket and aesthetic line complies with your exact approval is the folder released for fabrication.",
      img: step2Img,
      badge: "Engineering & Design"
    },
    {
      num: "03",
      title: "Fabrication in AVANGART Workshop",
      desc: "The real magic and exquisite hand detailing happens within our specialized AVANGART workshop. Our exceptional team of master craftsmen shape every wood grain with jeweler-like precision. Combining first-class Italian and German machinery with time-honored joinery secrets, we achieve pristine bends, flawless finishes, and incredible strength. Each component undergoes strict quality checks before dispatch.",
      img: step3Img,
      badge: "Handicraft & Quality Control"
    },
    {
      num: "04",
      title: "Delivery, Professional Installation & Warranty",
      desc: "The crowning piece of any superb architectural joinery is professional and safe installation. Our skilled specialists execute clean, prompt, and acoustically isolated mounting within your residence. We guarantee zero squeaks, invisible structural anchors, and stability that spans generations. Upon completion, we provide detailed preservation guidelines for premium wood surfaces and issue a long-term warranty.",
      img: step4Img,
      badge: "Installation & Warranty"
    }
  ] : [
    {
      num: "01",
      title: "Konsultācija un telpas dizaina koncepts",
      desc: "Mūsu sadarbība vienmēr sākas ar sarunu, kurā mēs izzinām Jūsu vēlmes, vajadzības un telpas raksturu, kā arī piedāvājam piemērotāko kokmateriālu un citu materiālu kombināciju skici. Pirmā tikšanās un ideju apspriešana ir pamats tam, lai katra mūsu izgatavotās mēbeles šķautne un līnija būtu precīzs Jūsu mājokļa identitātes spogulis. Tādā veidā mēs veicam rūpīgu Jūsu ideju izpēti un sagatavojam ieteikumus augstākai ergonomikai.",
      img: step1Img,
      badge: "Sākotnējā plānošana"
    },
    {
      num: "02",
      title: "3D modelēšana un tehnisks projekts",
      desc: "Šajā posmā tiek izstrādāts precīzs projekta tehniskais risinājums. Mūsu inženieri un dizaineri sagatavo detalizētus trīsdimensiju (3D) rasējumus, modeļus un veic nepieciešamos mezglu aprēķinus. Mēs piemeklējam projektam atbilstošas koksnes sugas (ozols, osis, riekstkoks) un saskaņojam apdares toņu paraugus. Tikai tad, kad katrs stiprinājums un konstrukcijas līnija saņem Jūsu apstiprinājumu, projekts tiek nodots ražošanā.",
      img: step2Img,
      badge: "Projekta inženierija"
    },
    {
      num: "03",
      title: "Ražošana AVANGART darbnīcā",
      desc: "Ražošanas process norisinās AVANGART galdniecības darbnīcā, kurā pieredzējuši meistari apstrādā katru detaļu. Izmantojot profesionālas iekārtas un tradicionālas galdniecības metodes, mēs nodrošinām izcilu apstrādes kvalitāti, virsmu gludumu un konstrukciju izturību. Katra detaļa pirms nosūtīšanas tiek rūpīgi pārbaudīta, lai garantētu tās atbilstību tehniskajām prasībām.",
      img: step3Img,
      badge: "Amatnieku darbs"
    },
    {
      num: "04",
      title: "Piegāde, uzstādīšana un garantija",
      desc: "Svarīgs posms ir profesionāla un droša konstrukciju montāža. Mūsu speciālisti veic ātru un precīzu uzstādīšanu Jūsu mājoklī, nodrošinot mezglu stiprību, neredzamus stiprinājumus un ilgmūžību. Pēc darbu pabeigšanas mēs sniedzam rekomendācijas par tālāku koka izstrādājumu kopšanu un noformējam garantiju.",
      img: step4Img,
      badge: "Montāža un garantija"
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-[#111c2a] text-white border-t border-b border-zinc-900/40 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 text-center md:text-left">
          <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Our Approach" : "Darba gaita"}</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">{lang === "ENG" ? "Work process from vision to perfection" : "Darba process no vīzijas līdz rezultātam"}</h2>
          <p className="text-zinc-400 font-light text-xs md:text-sm max-w-2xl mt-3 leading-relaxed">
            {lang === "ENG"
              ? "We treat each joinery piece as a unique work of art, ensuring the highest class of service and material execution at every milestone."
              : "Katru galdniecības izstrādājumu mēs uztveram kā unikālu mākslas darbu, nodrošinot augstāko pakalpojuma un materiālu klasi katrā procesa solī."}
          </p>
        </div>

        {/* Alternating Zig-zag layout on Home Page */}
        <div className="space-y-12 md:space-y-18 lg:space-y-22">
          {steps.map((step, idx) => {
            const isWordEven = idx % 2 === 1; // Alternating layout (Solis 1 Left, Solis 2 Right, Solis 3 Left, Solis 4 Right)
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center",
                  isWordEven ? "lg:flex-row-reverse" : ""
                )}
              >
                {/* Image side */}
                <div className={cn(
                  "lg:col-span-6 relative aspect-[16/10] overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900",
                  isWordEven ? "lg:order-last" : ""
                )}>
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="w-full h-full object-cover select-none pointer-events-none hover:scale-102 transition-transform duration-700 opacity-90" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-brown/10 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm py-1.5 px-3 text-[9px] tracking-widest font-extrabold uppercase text-white border-l-2 border-brand-orange">
                    {step.badge}
                  </div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-brand-orange" />
                  <p className="text-zinc-350 font-light text-xs md:text-sm leading-relaxed font-sans">
                    {step.desc}
                  </p>
                  <button
                    onClick={() => {
                      window.location.hash = lang === "ENG" ? "#work-process" : "#darba-gaita";
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="inline-flex items-center space-x-1.5 text-brand-orange text-[10px] uppercase tracking-widest font-extrabold hover:text-white transition-colors cursor-pointer group pt-1"
                  >
                    <span>{lang === "ENG" ? "Learn more" : "Uzzināt vairāk"}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Sadarbība ar dizaineriem Component ---
interface CollaborationViewProps {
  onNavigateToContact: () => void;
  lang: "LV" | "ENG";
}

const CollaborationView = ({ onNavigateToContact, lang }: CollaborationViewProps) => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        {/* Top navigation row */}
        <div className="mb-8 flex justify-start">
          <BackToHomeButton lang={lang} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-zinc-100 text-brand-brown px-4 py-1 uppercase text-[9px] tracking-[0.25em] font-extrabold border-l-2 border-brand-orange">
              <span>{lang === "ENG" ? "The Art of Collaboration and Co-creation" : "Sadarbības un koprades māksla"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-brown-dark leading-tight mt-1 mb-3">
              {lang === "ENG" ? (
                <>Our collaboration with <br />artists and designers</>
              ) : (
                <>Mūsu sadarbība ar <br />māksliniekiem un dizaineriem</>
              )}
            </h1>
            
            <p className="text-brand-grey font-light leading-relaxed text-sm md:text-base">
              {lang === "ENG"
                ? "AVANGART collaborates with leading Latvian and international interior artists and designers. We understand the importance of every single line, material harmony, and precision in drawings, ensuring flawless project implementation."
                : "AVANGART sadarbojas ar vadošajiem Latvijas un ārvalstu interjera māksliniekiem un dizaineriem. Mēs izprotam katras līnijas nozīmi, materiālu saspēli un augstu precizitāti rasējumos, nodrošinot nevainojamu projektu realizāciju."}
            </p>
            
            <div className="space-y-4 border-l-2 border-brand-orange/30 pl-6 text-zinc-650 font-light text-xs md:text-sm">
              <p>
                <strong className="font-serif font-bold text-brand-brown text-sm block mb-0.5">
                  {lang === "ENG" ? "Full Architectural Realization" : "Pilnīga idejas realizācija"}
                </strong>
                {lang === "ENG"
                  ? "We consistently execute high-complexity conceptual shapes and layout drawings without risking aesthetic focus or solid wood mechanics."
                  : "Mēs spējam kvalitatīvi un precīzi izpildīt pat vissarežģītākās dizaineru ieceres un rasējumus, nepieļaujot kompromisus uz vizuālās tīrības rēķina."}
              </p>
              <p>
                <strong className="font-serif font-bold text-brand-brown text-sm block mb-0.5">
                  {lang === "ENG" ? "Structural Woodworking Engineering" : "Sarežģīti pasūtījumi un konstrukcijas"}
                </strong>
                {lang === "ENG"
                  ? "From self-supporting helical stairs to cantilever steps and wide floor-to-ceiling partitions, our seasoned team handles the hardest geometry."
                  : "Mūsu pieredze ļauj uzbūvēt un montēt sarežģītus risinājumus – sākot ar nestandarta spirālveida kāpnēm līdz platiem monolītiem paneļiem un konsolēm."}
              </p>
              <p>
                <strong className="font-serif font-bold text-brand-brown text-sm block mb-0.5">
                  {lang === "ENG" ? "Adaptive Problem Solving" : "Risinājumi nestandarta situācijās"}
                </strong>
                {lang === "ENG"
                  ? "If unexpected obstacles arise during the project, we work together to find the best technical and material solutions to preserve the author's vision."
                  : "Ja projekta gaitā parādās negaidīti šķēršļi, kopīgiem spēkiem rodam labākos tehniskos un materiālos risinājumus, lai saglabātu autora vīziju."}
              </p>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6 max-w-md mx-auto lg:ml-auto w-full"
          >
            <div className="relative aspect-[3/2] overflow-hidden shadow-xl border border-zinc-200 bg-zinc-200">
              <img 
                src={designerCollabImg} 
                alt={lang === "ENG" ? "Collaboration with interior designers" : "Sadarbība ar dizaineriem"} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-brand-brown/5 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl" />
            </div>

            <div className="relative aspect-[3/2] overflow-hidden shadow-xl border border-zinc-200 bg-zinc-200">
              <img 
                src={catInteriorImg} 
                alt={lang === "ENG" ? "Completed collaborative interior spaces" : "Īstenotie kopsadarbības dizaina interjeri"} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-brown/5 pointer-events-none" />
              <div className="absolute top-4 -right-6 w-24 h-24 bg-brand-orange/5 rounded-full blur-2xl" />
            </div>
          </motion.div>

        </div>

        {/* Action Buttons: side-by-side, centered below the columns */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 border-t border-zinc-100 pt-12">
          {/* Uz Augšu (To Top) Button on LEFT - Wood Oak style */}
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center justify-center space-x-3 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-sm min-w-[220px]"
          >
            <ArrowUp size={15} />
            <span>{lang === "ENG" ? "To top" : "Uz augšu"}</span>
          </button>

          {/* Pieteikties uz konsultāciju (Consultation) Button on RIGHT - Oak wood styled */}
          <button 
            onClick={onNavigateToContact}
            className="inline-flex items-center justify-center space-x-3 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-md min-w-[220px]"
          >
            <span>{lang === "ENG" ? "Apply for collaboration" : "Pieteikties sadarbībai"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Portfolio Page Component ---
interface PortfolioViewProps {
  currentPath: string;
  lang: "LV" | "ENG";
}

const CAT_TRANSLATIONS: Record<string, { LV: string, EN: string }> = {
  "Kāpnes": { LV: "Kāpnes", EN: "Stairs" },
  "Virtuve": { LV: "Virtuve", EN: "Kitchens" },
  "Viesistaba": { LV: "Viesistaba", EN: "Living Room" },
  "Guļamistaba": { LV: "Guļamistaba", EN: "Bedroom Suite" },
  "Vannas istaba": { LV: "Vannas istaba", EN: "Bathroom" }
};

// --- Custom Portfolio Card Component ---
interface CustomPortfolioCardProps {
  project: {
    id: string | number;
    title: string;
    titleEN?: string;
    category: string;
    images: string[];
    description: string;
    descriptionEN?: string;
    materials: string;
    materialsEN?: string;
    year: string;
    isPlaceholder?: boolean;
    placeholderNum?: number;
  };
  lang: "LV" | "ENG";
  isDev: boolean;
  onUpdateImages: (projectId: string | number, newImages: string[]) => void;
}

const PortfolioCard = ({ project, lang, isDev, onUpdateImages }: CustomPortfolioCardProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Synchronise images count in case index goes out of bounds
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [project.id]);

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, destIndex: number) => {
    e.preventDefault();
    const srcIndexStr = e.dataTransfer.getData("text/plain");
    if (!srcIndexStr) return;
    const srcIndex = parseInt(srcIndexStr, 10);
    if (srcIndex === destIndex) return;

    const newImages = [...project.images];
    const [removed] = newImages.splice(srcIndex, 1);
    newImages.splice(destIndex, 0, removed);
    onUpdateImages(project.id, newImages);
    setCurrentImgIndex(destIndex);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 bg-white p-6 md:p-8 shadow-lg border border-zinc-200/50 min-h-[440px] items-center">
      {/* Visual Section & Slider */}
      <div className="lg:col-span-7 flex flex-col justify-between min-h-[360px] space-y-3 lg:space-y-0">
        <div 
          onClick={() => project.images.length > 0 && setIsLightboxOpen(true)}
          className={cn(
            "relative w-full h-[300px] sm:h-[320px] lg:flex-grow lg:h-0 overflow-hidden border border-zinc-200 bg-zinc-200 shadow-inner group lg:mb-2.5",
            project.images.length > 0 ? "cursor-zoom-in" : "cursor-default"
          )}
        >
          {project.images.length > 0 ? (
            <img 
              src={project.images[currentImgIndex]} 
              alt={`${lang === "ENG" ? (project.titleEN || project.title) : project.title} - img ${currentImgIndex + 1}`} 
              className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 select-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 select-none">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400/80">
                {lang === "ENG" ? "No images added yet" : "Pagaidām nav pievienotu attēlu"}
              </span>
            </div>
          )}
          
          {/* Sliders Arrow Handlers */}
          {project.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/75 text-white rounded-full p-2.5 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
                aria-label={lang === "ENG" ? "Previous image" : "Iepriekšējais attēls"}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/75 text-white rounded-full p-2.5 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
                aria-label={lang === "ENG" ? "Next image" : "Nākamais attēls"}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Floating badge top-left styled with OAK wood grain */}
          <div className="absolute top-3 left-3 btn-wood-oak border-none text-white py-1.5 px-3.5 text-[9px] uppercase tracking-widest font-extrabold select-none shadow-md">
            {lang === "ENG" 
              ? (project.isPlaceholder ? `Portfolio ${project.placeholderNum}` : (CAT_TRANSLATIONS[project.category]?.EN || project.category)) 
              : (project.isPlaceholder ? `Portfolio ${project.placeholderNum}` : (CAT_TRANSLATIONS[project.category]?.LV || project.category))
            }
          </div>

          {/* Floating Counter Badge bottom right */}
          {project.images.length > 0 && (
            <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-sm text-white py-1 px-2.5 text-[10px] tracking-wider font-extrabold select-none">
              {currentImgIndex + 1} / {project.images.length}
            </div>
          )}
        </div>

        {/* 7-Image Clickable Thumbnail Strip with Drag and Drop */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-7 gap-1.5">
          {project.images.map((imgUrl, idx) => {
            const isFirst = idx === 0;
            return (
              <button
                key={idx}
                type="button"
                draggable={isDev}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => setCurrentImgIndex(idx)}
                className={cn(
                  "aspect-[4/3] w-full overflow-hidden border bg-zinc-100 transition-all duration-200 relative group cursor-pointer",
                  currentImgIndex === idx 
                    ? "border-brand-orange ring-1 ring-brand-orange scale-102 opacity-100" 
                    : "border-zinc-200 opacity-60 hover:opacity-100 shadow-sm",
                  isDev ? "cursor-grab active:cursor-grabbing border-zinc-300" : ""
                )}
                aria-label={lang === "ENG" ? `View image ${idx + 1}` : `Skatīt attēlu ${idx + 1}`}
                title={isDev ? (lang === "ENG" ? "Drag and drop to rearrange. Drag to 1st position as Cover!" : "Velciet, lai mainītu secību. Pirmā pozīcija ir titulbilde!") : undefined}
              >
                <img 
                  src={imgUrl} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

              </button>
            );
          })}
        </div>
        )}
      </div>

      {/* Description Section */}
      <div className="lg:col-span-5 flex flex-col justify-between min-h-[360px] lg:pl-4 space-y-4 lg:space-y-0">
        <div className="space-y-2.5">
          <h3 className="text-xl md:text-2xl font-serif text-brand-brown-dark leading-tight">
            {lang === "ENG" ? (project.titleEN || project.title) : project.title}
          </h3>
          <div className="h-0.5 w-12 bg-brand-orange" />
          
          {project.isPlaceholder ? (
            <div className="py-4 flex flex-col items-start space-y-3 opacity-60">
              <div className="h-4 bg-zinc-100 rounded-sm w-3/4 animate-pulse"></div>
              <div className="h-4 bg-zinc-100 rounded-sm w-1/2 animate-pulse"></div>
              <p className="text-zinc-400 font-light text-xs italic">
                {lang === "ENG" 
                  ? "Project is currently under draft preparation..." 
                  : "Projekta materiāli šobrīd tiek sagatavoti..."}
              </p>
            </div>
          ) : (
            <p className="text-zinc-650 font-normal text-xs md:text-sm leading-relaxed">
              {lang === "ENG" ? (project.descriptionEN || project.description) : project.description}
            </p>
          )}
        </div>

        <div className="space-y-2.5 pt-4 border-t border-zinc-150">
          <div className="flex justify-between text-[10px] uppercase tracking-widest leading-relaxed border-b border-zinc-100 pb-2">
            <span className="text-zinc-400 font-medium shrink-0">{lang === "ENG" ? "Materials" : "Materiāli"}</span>
            <span className="font-extrabold text-brand-grey-dark max-w-[200px] text-right truncate" title={project.isPlaceholder ? "—" : (lang === "ENG" ? (project.materialsEN || project.materials) : project.materials)}>
              {project.isPlaceholder ? "—" : (lang === "ENG" ? (project.materialsEN || project.materials) : project.materials)}
            </span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest leading-relaxed border-b border-zinc-100 pb-2">
            <span className="text-zinc-400 font-medium">{lang === "ENG" ? "Year" : "Gads"}</span>
            <span className="font-extrabold text-brand-grey-dark">{project.isPlaceholder ? "—" : project.year}</span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest leading-relaxed">
            <span className="text-zinc-400 font-medium">{lang === "ENG" ? "Location" : "Izpildes Vieta"}</span>
            <span className="font-extrabold text-brand-grey-dark font-sans">{project.isPlaceholder ? "—" : (lang === "ENG" ? "Riga / Latvia" : "Rīga / Latvija")}</span>
          </div>
        </div>
      </div>

      {/* Full-screen Lightbox overlay */}
      <AnimatePresence>
        {isLightboxOpen && project.images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-6 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Header */}
            <div className="flex justify-between items-center text-white text-xs tracking-wider border-b border-white/10 pb-4 h-12">
              <div className="font-serif italic font-light truncate max-w-[80%] uppercase">
                {lang === "ENG" ? (project.titleEN || project.title) : project.title} ({lang === "ENG" ? (CAT_TRANSLATIONS[project.category]?.EN || project.category) : (CAT_TRANSLATIONS[project.category]?.LV || project.category)})
              </div>
              <button 
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-2.5 rounded-full transition-transform duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                aria-label={lang === "ENG" ? "Close" : "Aizvērt"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image content */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              <img 
                src={project.images[currentImgIndex]} 
                alt={`${lang === "ENG" ? (project.titleEN || project.title) : project.title} - Zoom`} 
                className="max-w-full max-h-[75vh] object-contain shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label={lang === "ENG" ? "Previous image" : "Iepriekšējais attēls"}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label={lang === "ENG" ? "Next image" : "Nākamais attēls"}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Footer with thumb selection */}
            <div className="border-t border-white/10 pt-4" onClick={(e) => e.stopPropagation()}>
              <div className="max-w-xl mx-auto flex flex-col items-center space-y-4">
                <div className="text-white text-[11px] tracking-widest uppercase font-extrabold opacity-75">
                  {currentImgIndex + 1} / {project.images.length}
                </div>
                
                <div className="flex justify-center flex-wrap gap-2 overflow-x-auto max-w-full pb-2">
                  {project.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImgIndex(idx)}
                      className={cn(
                        "w-12 h-9 overflow-hidden border transition-all duration-200 relative shrink-0 cursor-pointer",
                        currentImgIndex === idx 
                          ? "border-brand-orange ring-1 ring-brand-orange scale-105 opacity-100" 
                          : "border-white/20 opacity-40 hover:opacity-100"
                      )}
                      aria-label={`Select page ${idx + 1}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortfolioView = ({ currentPath, lang }: PortfolioViewProps) => {
  const activeCategory = (() => {
    if (currentPath.startsWith("#portfolio-")) {
      const param = currentPath.substring("#portfolio-".length);
      return paramCatMap[param] || "Kāpnes";
    }
    return "Kāpnes";
  })();

  const [projectsList, setProjectsList] = useState<any[]>(PORTFOLIO_ITEMS);
  const [placeholdersOrder, setPlaceholdersOrder] = useState<Record<string, string[]>>({});

  const handleUpdateImages = (projectId: string | number, newImages: string[]) => {
    if (typeof projectId === 'string' && projectId.startsWith('placeholder-')) {
      setPlaceholdersOrder(prev => ({
        ...prev,
        [projectId]: newImages
      }));
    } else {
      setProjectsList(prev => prev.map(p => p.id === projectId ? { ...p, images: newImages } : p));
    }
  };

  const activeCategoryProject = projectsList.find(item => item.category === activeCategory) || projectsList[0];

  // Dev mode detector (localhost and preview systems)
  const isDev = typeof window !== "undefined" && (
    window.location.hostname.includes("localhost") || 
    window.location.hostname.includes("ais-dev") ||
    window.location.hostname.includes("ais-pre")
  );

  const handleCategoryChange = (cat: typeof PORTFOLIO_NAV_CATEGORIES[number]) => {
    window.location.hash = `#portfolio-${catParamMap[cat]}`;
  };

  // Compile full set of 3 cards for this active category
  const portfolio2Id = `placeholder-2-${activeCategory}`;
  const portfolio2Images = placeholdersOrder[portfolio2Id] || [];

  const portfolio3Id = `placeholder-3-${activeCategory}`;
  const portfolio3Images = placeholdersOrder[portfolio3Id] || [];

  const categoryProjects = [
    { ...activeCategoryProject },
    {
      id: portfolio2Id,
      isPlaceholder: true,
      placeholderNum: 2,
      title: "Portfolio 2",
      titleEN: "Portfolio 2",
      category: activeCategory,
      images: portfolio2Images,
      description: "",
      descriptionEN: "",
      materials: "",
      materialsEN: "",
      year: ""
    },
    {
      id: portfolio3Id,
      isPlaceholder: true,
      placeholderNum: 3,
      title: "Portfolio 3",
      titleEN: "Portfolio 3",
      category: activeCategory,
      images: portfolio3Images,
      description: "",
      descriptionEN: "",
      materials: "",
      materialsEN: "",
      year: ""
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-grey-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        {/* Top navigation row */}
        <div className="mb-8 flex justify-start">
          <BackToHomeButton lang={lang} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Projects catalog" : "Projektu katalogs"}</span>
          <h1 className="text-3xl md:text-5xl font-serif text-brand-brown-dark mb-4">{lang === "ENG" ? "Portfolio" : "Portfolio"}</h1>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-4 border-b border-zinc-200/80 pb-3 mb-10">
          {PORTFOLIO_NAV_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "px-5 py-2.5 uppercase text-[10px] tracking-wider font-extrabold transition-all duration-300 border cursor-pointer",
                activeCategory === cat 
                  ? "btn-wood-oak text-white border-transparent shadow-sm" 
                  : "bg-white text-zinc-500 border-zinc-200 hover:text-brand-orange hover:border-brand-orange/50"
              )}
            >
              {lang === "ENG" ? (CAT_TRANSLATIONS[cat]?.EN || cat) : (CAT_TRANSLATIONS[cat]?.LV || cat)}
            </button>
          ))}
        </div>



        {/* Stack list of exactly 3 identical-sized cards/projects */}
        <div className="space-y-12 md:space-y-16">
          <AnimatePresence mode="popLayout">
            {categoryProjects.map((proj) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <PortfolioCard 
                  project={proj} 
                  lang={lang} 
                  isDev={isDev} 
                  onUpdateImages={handleUpdateImages} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ScrollToTopButton />
      </div>
    </div>
  );
};

// --- BUJ (Biežāk uzdotie jautājumi) Page Component ---
interface BUJViewProps {
  lang: "LV" | "ENG";
}

const BUJView = ({ lang }: BUJViewProps) => {
  return (
    <div className="pt-24 min-h-screen bg-brand-grey-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        {/* Top navigation row */}
        <div className="mb-8 flex justify-start">
          <BackToHomeButton lang={lang} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-2xl md:text-3xl font-serif text-brand-brown-dark mb-4">
            {lang === "ENG" ? "Frequently Asked Questions" : "Biežāk uzdotie jautājumi"}
          </h1>
        </div>

        {/* Accordion with all 10 FAQ items */}
        <FAQAccordion items={FAQ_ITEMS} lang={lang} />

        {/* Bottom Scroll To Top Button */}
        <ScrollToTopButton lang={lang} />

      </div>
    </div>
  );
};

// --- Contacts Component ---
interface ContactsViewProps {
  lang: "LV" | "ENG";
}

const ContactsView = ({ lang }: ContactsViewProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTermsAccepted(false);
    }, 6000);
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        {/* Top navigation row */}
        <div className="mb-8 flex justify-start">
          <BackToHomeButton lang={lang} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* General info & location details */}
          <div className="lg:col-span-5 space-y-8 lg:pr-4">
            <div>
              <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Get in Touch" : "Saziņa un pieteikumi"}</span>
              <h1 className="text-3xl md:text-5xl font-serif text-brand-brown-dark leading-tight mb-4">{lang === "ENG" ? "Contact us" : "Sazinieties ar mums"}</h1>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-zinc-50 border border-zinc-150 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">{lang === "ENG" ? "Legal Address" : "Juridiskā adrese"}</h4>
                  <p className="text-brand-grey-dark font-light text-xs md:text-sm mt-0.5">Katlakalna iela 11, Rīga, LV-1073</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-zinc-50 border border-zinc-150 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">{lang === "ENG" ? "Email" : "E-pasts"}</h4>
                  <p className="text-brand-grey-dark font-light text-xs md:text-sm mt-0.5">info@avangart.lv</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-zinc-50 border border-zinc-150 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">{lang === "ENG" ? "Phone" : "Tālrunis"}</h4>
                  <p className="text-brand-grey-dark font-light text-xs md:text-sm mt-0.5">+371 29 883 456</p>
                </div>
              </div>
            </div>

          </div>

          {/* Dedicated form block ONLY present in this section */}
          <div className="lg:col-span-7 bg-brand-grey-light p-6 md:p-10 border border-zinc-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-orange" />
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="contact-form-direct"
                  className="space-y-6 md:space-y-8" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">
                        {lang === "ENG" ? "Full Name" : "Vārds, Uzvārds"}{" "}
                        <span className="text-red-550 inline-block align-middle ml-0.5 font-bold">*</span>
                      </label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-transparent border-b border-zinc-350 py-2 focus:outline-none focus:border-brand-orange transition-colors font-light text-brand-grey-dark placeholder-zinc-300 text-xs md:text-sm"
                        placeholder={lang === "ENG" ? "John Doe" : "Mārtiņš Bērziņš"}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">
                        {lang === "ENG" ? "Email" : "E-pasts"}{" "}
                        <span className="text-red-550 inline-block align-middle ml-0.5 font-bold">*</span>
                      </label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-transparent border-b border-zinc-350 py-2 focus:outline-none focus:border-brand-orange transition-colors font-light text-brand-grey-dark placeholder-zinc-300 text-xs md:text-sm"
                        placeholder={lang === "ENG" ? "john@example.com" : "martins@avangart.lv"}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">
                        {lang === "ENG" ? "Phone" : "Tālrunis"}{" "}
                        <span className="text-red-550 inline-block align-middle ml-0.5 font-bold">*</span>
                      </label>
                      <input 
                        required
                        type="tel" 
                        className="w-full bg-transparent border-b border-zinc-350 py-2 focus:outline-none focus:border-brand-orange transition-colors font-light text-brand-grey-dark placeholder-zinc-300 text-xs md:text-sm"
                        placeholder="+371 29 883 456"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">
                      {lang === "ENG" ? "Services of Interest" : "Mūs interesējošais pasūtījums"}
                    </label>
                    <select className="w-full bg-transparent border-b border-zinc-350 py-2 focus:outline-none focus:border-brand-orange transition-colors font-light text-brand-grey-dark text-xs md:text-sm cursor-pointer">
                      {lang === "ENG" ? (
                        <>
                          <option>Apply for collaboration</option>
                          <option>Staircase manufacturing</option>
                          <option>Kitchen system manufacturing</option>
                          <option>Living room furniture manufacturing</option>
                          <option>Bedroom suite manufacturing</option>
                          <option>Signature elements & decor</option>
                        </>
                      ) : (
                        <>
                          <option>Pieteikties sadarbībai</option>
                          <option>Kāpņu izgatavošana</option>
                          <option>Virtuves mēbeļu izgatavošana</option>
                          <option>Viesistabas mēbeļu izgatavošana</option>
                          <option>Guļamistabas mēbeļu izgatavošana</option>
                          <option>Dizaina elementi un dekori</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-brand-grey">
                      {lang === "ENG" ? "Project Details & Description" : "Jūsu vēlmes apraksts"}
                    </label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-zinc-350 py-2 focus:outline-none focus:border-brand-orange transition-colors font-light text-brand-grey-dark placeholder-zinc-300 text-xs md:text-sm resize-none"
                      placeholder={lang === "ENG" ? "Describe your desired stairs shape, custom design requirements..." : "Aprakstiet vēlamo kāpņu veidu vai mēbeļu elementus un Jūsu vēlmes..."}
                    />
                  </div>

                  {/* GDPR Terms Consent Checkbox Row */}
                  <div className="flex items-start space-x-3 pt-2">
                    <input 
                      type="checkbox"
                      id="data-consent"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 h-4.5 w-4.5 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange-light cursor-pointer accent-brand-orange"
                    />
                    <label htmlFor="data-consent" className="text-xs text-zinc-550 font-light select-none leading-relaxed">
                      {lang === "ENG" ? (
                        <>
                          I have read and agree to the{" "}
                          <button 
                            type="button" 
                            onClick={() => window.location.hash = '#privacy-policy'}
                            className="text-brand-orange hover:text-brand-brown underline font-normal cursor-pointer transition-colors"
                          >
                            privacy policy
                          </button>
                        </>
                      ) : (
                        <>
                          Esmu iepazinies un piekrītu{" "}
                          <button 
                            type="button" 
                            onClick={() => window.location.hash = '#privātuma-politika'}
                            className="text-brand-orange hover:text-brand-brown underline font-normal cursor-pointer transition-colors"
                          >
                            datu apstrādes noteikumiem
                          </button>
                        </>
                      )}
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={!termsAccepted}
                    className="w-full btn-wood-oak text-white py-4 md:py-5 uppercase text-xs tracking-wider font-extrabold hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer shadow-md disabled:opacity-100 disabled:brightness-100 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {lang === "ENG" ? "Send inquiry" : "Nosūtīt pieteikumu"}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                   key="success-message-direct"
                   className="h-full flex flex-col justify-center items-center text-center p-6 space-y-6"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
                    <Sparkles className="text-green-600 animate-pulse" size={28} />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-brown-dark font-extrabold tracking-tight">
                    {lang === "ENG" ? "Inquiry successfully sent!" : "Pieteikums veiksmīgi nosūtīts!"}
                  </h3>
                  <p className="text-zinc-650 font-light max-w-sm text-xs md:text-sm leading-relaxed text-zinc-650">
                    {lang === "ENG"
                      ? "Thank you for getting in touch! Your message has been routed to our team, and we will get back to you within 24 hours."
                      : "Paldies par Jūsu pieteikumu! Jūsu vēlmes ir veiksmīgi saņemtas un nosūtītas AVANGART meistariem. Sazināsimies ar Jums nākamo 24 stundu laikā, lai vienotos par tālāko."}
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setTermsAccepted(false);
                    }}
                    className="border border-zinc-300 text-zinc-600 px-6 py-2 uppercase text-[10px] tracking-widest font-extrabold hover:bg-zinc-100 hover:text-black transition-all cursor-pointer"
                  >
                    {lang === "ENG" ? "Send another message" : "Sūtīt vēl vienu ziņu"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <ScrollToTopButton />
      </div>
    </div>
  );
};

// --- Footer Component ---
interface FooterProps {
  onOpenPolicy: (type: 'sīkdatnes' | 'privātums') => void;
  lang: "LV" | "ENG";
}

const Footer = ({ onOpenPolicy, lang }: FooterProps) => {
  return (
    <footer className="bg-brand-grey-dark text-white pt-4 pb-4 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-3">
          
          {/* Brand Col - Left */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center select-none py-1 h-auto">
              <LogoImage 
                isDarkBackground={true} 
                className="w-auto h-[61px] sm:h-[74px] md:h-[88px]" 
              />
            </div>
            <div className="relative -translate-y-1 md:-translate-y-3">
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">
                {lang === "ENG" ? "Bespoke design and craftsmanship" : "Individuāls dizains un roku darbs"}
              </p>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                {lang === "ENG"
                  ? "Every step in your home is a unique sculpture. We develop designs from the first sketch of an idea to the very last screw."
                  : "Katrs mājokļa solis ir unikāla skulptūra. Mēs izstrādājam dizainus no pirmās idejas skices līdz pēdējai skrūvītei."}
              </p>
            </div>
          </div>

          {/* Social Networks Center Col */}
          <div className="lg:col-span-4 flex flex-col items-center justify-start text-center space-y-4 pt-10 lg:pt-12">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-orange-light">
              {lang === "ENG" ? "Social Networks" : "Sociālie tīkli"}
            </h4>
            <div className="flex items-center space-x-6 text-zinc-400 py-1 justify-center">
              <a href="#" className="hover:text-brand-orange transition-colors duration-200" aria-label="Instagram">
                <Instagram size={28} />
              </a>
              <a href="#" className="hover:text-brand-orange transition-colors duration-200" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href="#" className="hover:text-brand-orange transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={28} />
              </a>
            </div>
          </div>

          {/* Contacts Col - Right */}
          <div className="lg:col-span-4 flex flex-col space-y-3 pt-10 lg:pt-12 lg:items-start lg:text-left lg:pl-16">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-orange-light">
              {lang === "ENG" ? "Contacts" : "Kontakti"}
            </h4>
            <div className="space-y-2 text-xs text-zinc-300 font-light font-sans flex flex-col lg:items-start">
              <p className="font-extrabold text-white tracking-wider uppercase">SIA "AVANGART"</p>
              <p className="flex items-center space-x-2.5">
                <MapPin size={13} className="text-brand-orange shrink-0" />
                <span>Katlakalna iela 11, Rīga, LV-1073</span>
              </p>
              <p className="flex items-center space-x-2.5">
                <Mail size={13} className="text-brand-orange shrink-0" />
                <span>info@avangart.lv</span>
              </p>
              <p className="flex items-center space-x-2.5">
                <Phone size={13} className="text-brand-orange shrink-0" />
                <span>+371 29 883 456</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-2 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left copyright (one font size larger: text-[11px] md:text-[12px]) */}
          <div className="text-[11px] md:text-[12px] text-zinc-500 font-medium select-none text-center md:text-left tracking-wide">
            {lang === "ENG" ? "SIA AVANGART © 2026 All rights reserved...." : "SIA AVANGART © 2026 Visas tiesības aizsargātas...."}
          </div>

          {/* Right policy links (one font size larger: text-[11px] md:text-[12px]) */}
          <div className="flex items-center space-x-3 text-zinc-500 font-medium select-none text-[11px] md:text-[12px] tracking-wide">
            <button 
              onClick={() => onOpenPolicy('sīkdatnes')}
              className="hover:text-brand-orange transition-colors cursor-pointer text-[11px] md:text-[12px]"
            >
              {lang === "ENG" ? "Cookie Policy" : "Sīkdatņu politika"}
            </button>
            <span className="text-zinc-500">|</span>
            <button 
              onClick={() => onOpenPolicy('privātums')}
              className="hover:text-brand-orange transition-colors cursor-pointer text-[11px] md:text-[12px]"
            >
              {lang === "ENG" ? "Privacy Policy" : "Privātuma politika"}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- URL Hash Translation Mapping ---
const HASH_LV_TO_ENG: Record<string, string> = {
  '#sakums': '#home',
  '#darba-gaita': '#work-process',
  '#portfolio-kapnes': '#portfolio-stairs',
  '#portfolio-virtuve': '#portfolio-kitchen',
  '#portfolio-viesistaba': '#portfolio-livingroom',
  '#portfolio-gulamistaba': '#portfolio-bedroom',
  '#portfolio-vannas-istaba': '#portfolio-bathroom',
  '#sadarbiba-dizaineriem': '#cooperation',
  '#buj': '#faq',
  '#kontakti': '#contact',
  '#sikdatnu-politika': '#cookie-policy',
  '#privatuma-politika': '#privacy-policy',
  '#sikdatņu-politika': '#cookie-policy',
  '#privātuma-politika': '#privacy-policy'
};

const HASH_ENG_TO_LV: Record<string, string> = {
  '#home': '#sakums',
  '#work-process': '#darba-gaita',
  '#portfolio-stairs': '#portfolio-kapnes',
  '#portfolio-kitchen': '#portfolio-virtuve',
  '#portfolio-livingroom': '#portfolio-viesistaba',
  '#portfolio-bedroom': '#portfolio-gulamistaba',
  '#portfolio-bathroom': '#portfolio-vannas-istaba',
  '#cooperation': '#sadarbiba-dizaineriem',
  '#faq': '#buj',
  '#contact': '#kontakti',
  '#cookie-policy': '#sikdatnu-politika',
  '#privacy-policy': '#privatuma-politika'
};

// --- App Root Component ---
export default function App() {
  const [lang, setLang] = useState<"LV" | "ENG">(() => {
    const hash = window.location.hash || '#sakums';
    const englishHashes = Object.keys(HASH_ENG_TO_LV);
    if (englishHashes.includes(hash)) {
      return 'ENG';
    }
    return 'LV';
  });

  const [currentPath, setCurrentPath] = useState(() => {
    const initialHash = window.location.hash || '#sakums';
    if (initialHash === '#portfolio') {
      return lang === 'ENG' ? '#portfolio-stairs' : '#portfolio-kapnes';
    }
    return initialHash;
  });

  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const changeLanguage = (newLang: "LV" | "ENG") => {
    if (lang === newLang) return;
    setLang(newLang);
    let currentHash = window.location.hash || '#sakums';
    if (newLang === 'ENG') {
      const translated = HASH_LV_TO_ENG[currentHash];
      if (translated) {
        window.location.hash = translated;
      } else if (currentHash === '#sakums' || currentHash === '' || currentHash === '#') {
        window.location.hash = '#home';
      }
    } else {
      const translated = HASH_ENG_TO_LV[currentHash];
      if (translated) {
        window.location.hash = translated;
      } else if (currentHash === '#home' || currentHash === '' || currentHash === '#') {
        window.location.hash = '#sakums';
      }
    }
  };

  useEffect(() => {
    // Initial redirect from bare #portfolio matching current language
    if (window.location.hash === '#portfolio') {
      window.location.hash = lang === 'ENG' ? '#portfolio-stairs' : '#portfolio-kapnes';
    }

    const consent = localStorage.getItem('avangart-cookie-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  useEffect(() => {
    // Synchronize unique page-routing on state load/shift
    const handleHashChange = () => {
      let currentHash = window.location.hash || '#sakums';
      if (currentHash === '#portfolio') {
        window.location.hash = lang === 'ENG' ? '#portfolio-stairs' : '#portfolio-kapnes';
        return;
      }

      // Check and update language automatically when hash matches a language
      if (Object.keys(HASH_ENG_TO_LV).includes(currentHash)) {
        setLang('ENG');
      } else if (Object.keys(HASH_LV_TO_ENG).includes(currentHash)) {
        setLang('LV');
      }

      setCurrentPath(currentHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Call handleHashChange once on load to route initial hashes correctly
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lang]);

  const navigateToContact = () => {
    window.location.hash = lang === 'ENG' ? "#contact" : "#kontakti";
  };

  return (
    <div className="font-sans selection:bg-brand-orange selection:text-white overflow-x-hidden antialiased scroll-smooth bg-white">
      
      {/* Upper Navigation Bar */}
      <Navbar currentPath={currentPath} lang={lang} onLanguageChange={changeLanguage} />

      {/* Main Dynamic View Controller */}
      <main className="transition-all duration-300">
        <AnimatePresence mode="wait">
          {(currentPath === '#sakums' || currentPath === '#home' || currentPath === '' || currentPath === '#') && (
            <motion.div 
              key="sakums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomeView onNavigateToContact={navigateToContact} lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#sadarbiba-dizaineriem' || currentPath === '#cooperation') && (
            <motion.div 
              key="dizaineriem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CollaborationView onNavigateToContact={navigateToContact} lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#darba-gaita' || currentPath === '#work-process') && (
            <motion.div 
              key="darba-gaita"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DarbaGaitaView lang={lang} />
            </motion.div>
          )}

          {currentPath.startsWith('#portfolio') && (
            <motion.div 
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioView currentPath={currentPath} lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#kontakti' || currentPath === '#contact') && (
            <motion.div 
              key="kontakti"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactsView lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#buj' || currentPath === '#faq') && (
            <motion.div 
              key="buj"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BUJView lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#cookie-policy' || currentPath === '#sikdatņu-politika' || currentPath === '#sikdatnu-politika') && (
            <motion.div 
              key="cookie-policy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CookiePolicyView lang={lang} />
            </motion.div>
          )}

          {(currentPath === '#privacy-policy' || currentPath === '#privātuma-politika' || currentPath === '#privatuma-politika') && (
            <motion.div 
              key="privacy-policy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyPolicyView lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Common Page Footer */}
      <Footer lang={lang} onOpenPolicy={(type) => {
        if (type === 'sīkdatnes') {
          window.location.hash = lang === 'ENG' ? '#cookie-policy' : '#sikdatnu-politika';
        } else {
          window.location.hash = lang === 'ENG' ? '#privacy-policy' : '#privatuma-politika';
        }
      }} />

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto w-auto md:w-[calc(100%-3rem)] md:max-w-5xl z-[120] bg-white/98 backdrop-blur-md text-zinc-900 border-l-[6px] border-brand-orange border-t border-r border-b border-zinc-200 shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-2xl p-6 md:p-8"
          >
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
              {/* Close 'X' Button on top-right */}
              <button
                onClick={() => {
                  localStorage.setItem('avangart-cookie-consent', 'dismissed');
                  setShowCookieBanner(false);
                }}
                className="absolute -top-2 -right-2 p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer rounded-full hover:bg-zinc-100"
                aria-label="Aizvērt"
              >
                <X size={18} />
              </button>

              {/* Left Column: Text & Header */}
              <div className="flex-1">
                <div className="flex items-center space-x-2.5 mb-2.5">
                  <div className="p-1 px-1.5 bg-brand-orange/10 rounded-lg">
                    <Cookie className="text-brand-orange animate-pulse" size={18} />
                  </div>
                  <h4 className="text-sm md:text-base font-serif font-bold text-brand-brown-dark tracking-wide">
                    {lang === "ENG" ? "Cookie Settings" : "Sīkdatņu uzstādījumi"}
                  </h4>
                </div>
 
                {/* Text content with converted policy links */}
                <p className="text-[11px] md:text-[13px] leading-relaxed text-zinc-600 font-sans tracking-wide pr-4">
                  {lang === "ENG" ? (
                    <>
                      We use our own and third-party cookies to ensure and improve the performance of our website, personalize information about our products and services, and analyze website traffic. By clicking "Accept All", you agree to the use of all cookies. Closing the cookie window with "X" does not activate cookies. Read more about the{' '}
                      <button
                        onClick={() => {
                          window.location.hash = '#cookie-policy';
                        }}
                        className="text-brand-orange font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline-block align-baseline font-sans text-[11px] md:text-[13px]"
                      >
                        Cookie Policy
                      </button>{' '}
                      and{' '}
                      <button
                        onClick={() => {
                          window.location.hash = '#privacy-policy';
                        }}
                        className="text-brand-orange font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline-block align-baseline font-sans text-[11px] md:text-[13px]"
                      >
                        Privacy Policy
                      </button>.
                    </>
                  ) : (
                    <>
                      Mēs izmantojam savas un trešo pušu sīkdatnes, lai nodrošinātu un uzlabotu tīmekļa vietnes darbību, pielāgotu informāciju mūsu produktiem un pakalvijumiem, kā arī analizētu vietnes apmeklējumu. Spiežot "Apstiprināt visas", jūs piekrītat visu sīkdatņu izmantošanai. Sīkdatņu loga aizvēršana ar "X" neaktivizē sīkdatnes. Lasiet vairāk par{' '}
                      <button
                        onClick={() => {
                          window.location.hash = '#sikdatnu-politika';
                        }}
                        className="text-brand-orange font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline-block align-baseline font-sans text-[11px] md:text-[13px]"
                      >
                        Sīkdatņu politiku
                      </button>{' '}
                      un{' '}
                      <button
                        onClick={() => {
                          window.location.hash = '#privatuma-politika';
                        }}
                        className="text-brand-orange font-bold hover:underline bg-transparent border-none p-0 cursor-pointer inline-block align-baseline font-sans text-[11px] md:text-[13px]"
                      >
                        Privātuma politiku
                      </button>.
                    </>
                  )}
                </p>
              </div>

              {/* Right Column: Dynamic Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto md:flex-row justify-end xs:justify-start">
                <button
                  onClick={() => {
                    localStorage.setItem('avangart-cookie-consent', 'rejected');
                    setShowCookieBanner(false);
                  }}
                  className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-800 py-3 px-6 rounded-lg uppercase text-[10px] tracking-widest font-extrabold cursor-pointer transition-colors text-center w-1/2 md:w-auto"
                >
                  {lang === "ENG" ? "Decline" : "Noraidīt"}
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('avangart-cookie-consent', 'accepted');
                    setShowCookieBanner(false);
                  }}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-900 text-white py-3 px-7 rounded-lg shadow-md hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-200 uppercase text-[10px] tracking-widest font-extrabold cursor-pointer text-center w-1/2 md:w-auto"
                >
                  {lang === "ENG" ? "Accept All" : "Apstiprināt visas"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
