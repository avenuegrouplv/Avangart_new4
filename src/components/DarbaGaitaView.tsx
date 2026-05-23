import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

// Image Imports
const step1Img = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/consultation_meeting.webp';
const step2Img = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/staircase_design.webp';
const step3Img = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/furniture_crafting.webp';
const step4Img = 'https://pub-125a4c281d7c440d9eaaedcb178381f9.r2.dev/staircase_installation.webp';

const BackToHomeButton = ({ lang }: { lang: "LV" | "ENG" }) => {
  return (
    <button
      onClick={() => {
        window.location.hash = lang === "ENG" ? "#home" : "#sakums";
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
      className="inline-flex items-center space-x-2 btn-wood-oak text-white text-[10px] tracking-widest font-extrabold uppercase py-2.5 px-5 cursor-pointer rounded-none shadow-sm"
    >
      <ArrowLeft size={13} className="mr-1" />
      <span>{lang === "ENG" ? "Back to Home" : "Atpakaļ uz sākumu"}</span>
    </button>
  );
};

const ScrollToTopButton = ({ lang }: { lang: "LV" | "ENG" }) => {
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

// --- Darba gaita (Process) Page Component ---
export const DarbaGaitaView = ({ lang = "LV" }: { lang?: "LV" | "ENG" }) => {
  const stepsLV = [
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

  const stepsEN = [
    {
      num: "01",
      title: "Consultation & Space Design Concept",
      desc: "Our communication always begins with a nuanced conversation. Upon contacting you, we thoroughly learn your desires, needs, and the character of the space, as well as offer a preliminary concept combining wood and metal. The first meeting is the cornerstone to making every stair edge or furniture line a precise reflection of your home's identity.",
      img: step1Img,
      badge: "Initial Planning"
    },
    {
      num: "02",
      title: "3D Modeling & Technical Design",
      desc: "At this stage, the future work of art gains engineering precision. Our technical designers construct detailed three-dimensional (3D) diagrams, models, and run structural calculations. We select wood grains (oak, ash, walnut) specifically for your project and align finishing colors. Only when every joint and line receives your approval is the design sent to production.",
      img: step2Img,
      badge: "Engineering & Design"
    },
    {
      num: "03",
      title: "Manufacturing in AVANGART Workshop",
      desc: "The real magic and fine craftsmanship take place in our specialized AVANGART joinery workshop. Experienced artisans process every wood grain with jeweler's precision and devotion. Uniting top-tier German and Italian machinery with traditional woodworking secrets, we ensure flawless curves, superb smoothness, and durability. Every component undergoes strict quality checks before shipping.",
      img: step3Img,
      badge: "Craft & Quality Control"
    },
    {
      num: "04",
      title: "Delivery, Mounting & Warranty",
      desc: "The crowning of any exceptional joinery work is accurate and safe installation. Our assembly specialists perform quick, tidy, and acoustically insulated mounting in your home. We guarantee stairs won't squeak, fasteners are invisible, and structural integrity endures for generations. Upon completion, we provide care instructions and a comprehensive, long-term warranty.",
      img: step4Img,
      badge: "Installation & Warranty"
    }
  ];

  const steps = lang === "ENG" ? stepsEN : stepsLV;

  return (
    <div className="pt-24 min-h-screen bg-brand-grey-light font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        {/* Top navigation row */}
        <div className="mb-8 flex justify-start">
          <BackToHomeButton lang={lang} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-extrabold mb-3 block">{lang === "ENG" ? "Work Process" : "Darba gaita"}</span>
          <h1 className="text-2xl md:text-3xl font-serif text-brand-brown-dark mb-4 leading-tight">{lang === "ENG" ? "Work process from vision to result" : "Darba process no vīzijas līdz rezultātam"}</h1>
          <p className="text-zinc-500 font-light text-xs md:text-sm leading-relaxed">
            {lang === "ENG" 
              ? "Every AVANGART project flows in a coordinated, organized, and transparent manner. We do not look for easy workarounds, but focus on the durability and aesthetics of bold, elegant, and uncompromising structures."
              : "Katrs AVANGART projekts rit saskaņoti, organizēti un caurredzami. Mēs nemeklējam vienkāršākos ceļus, bet koncentrējamies uz drosmīgu, elegantu un bezkompromisa konstrukciju ilgmūžību un estētiku."}
          </p>
        </div>

        {/* Alternating Zig-zag layout */}
        <div className="space-y-12 md:space-y-18 lg:space-y-22">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1; // 01, 03 left-image; 02, 04 right-image
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center",
                  isEven ? "lg:flex-row-reverse" : ""
                )}
              >
                {/* Image side */}
                <div className={cn(
                  "lg:col-span-6 relative aspect-[16/10] overflow-hidden shadow-2xl border border-zinc-200 bg-zinc-200",
                  isEven ? "lg:order-last" : ""
                )}>
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="w-full h-full object-cover select-none pointer-events-none hover:scale-102 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-brown/5 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm py-1.5 px-3 shadow text-[9px] tracking-widest font-extrabold uppercase text-brand-brown-dark border-l-2 border-brand-orange">
                    {step.badge}
                  </div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-brown-dark tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-brand-orange" />
                  <p className="text-zinc-650 font-light text-xs md:text-sm leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 md:mt-36 bg-[#111c2a] text-white p-8 md:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
            {lang === "ENG" ? "Ready to Start Your Unique Project with AVANGART?" : "Esat gatavi uzsākt savu unikālo projektu ar AVANGART?"}
          </h3>
          <p className="text-zinc-400 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            {lang === "ENG"
              ? "Our team is capable of realizing your boldest dreams and material combinations with the highest execution and installation quality."
              : "Mūsu komanda spēj realizēt Jūsu drosmīgākās idejas un materiālu salikumus ar augstāko izpildījuma un montāžas kvalitāti."}
          </p>
          <div className="pt-2">
            <a 
              href={lang === "ENG" ? "#contact" : "#kontakti"}
              className="inline-flex items-center space-x-3 btn-wood-oak text-white px-8 py-4 uppercase text-xs tracking-widest font-extrabold transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span>{lang === "ENG" ? "Get in Touch" : "Aizpildīt pieteikumu"}</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <ScrollToTopButton lang={lang} />
      </div>
    </div>
  );
};
