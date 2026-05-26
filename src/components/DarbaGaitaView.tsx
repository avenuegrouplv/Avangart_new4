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
      title: "Konsultācija un pirmā skice",
      desc: "Mūsu sadarbība sākas ar tikšanos, kurā mēs klātienē vai attālināti uzklausām Jūsu vēlmes, vajadzības, kā arī piefiksējam telpas parametrus un izmērus. Mēs piedāvājam piemērotāko materiālu un tehnisko risinājumu Jūsu idejas realizācijai, kā arī uzzīmējam skici, kas kalpo kā pamats projekta tālākai izstrādei.",
      img: step1Img,
      badge: "Tikšanās un skice"
    },
    {
      num: "02",
      title: "3D modelēšana un tehnisks projekts",
      desc: "Nākošajā posmā mēs izstrādājam precīzu 3D digitālo modeli un rasējumus. Mēs piemērojam izvēlētos materiālus Jūsu telpai, saskaņojam konkrētus toņu paraugus, materiālu tekstūras un sagatavojam pilnu tehnisko projektu pirms ražošanas uzsākšanas. Tikai tad, kad katrs konstrukcijas elements un stiprinājums ir saņēmis Jūsu apstiprinājumu, projekts tiek nodots ražošanā.",
      img: step2Img,
      badge: "3D un projekts"
    },
    {
      num: "03",
      title: "Ražošana darbnīcā",
      desc: "Ražošanas process norisinās AVANGART darbnīcā, kurā mūsu pieredzējušie meistari iepriekš saskaņotās skices un tehniskos rasējumus pārvērš reālos izstrādājumos. Apvienojot modernās iekārtas ar tradicionālām amatniecības metodēm, mēs garantējam izcilu precizitāti un darba kvalitāti. Katra detaļa pirms nosūtīšanas tiek rūpīgi pārbaudīta, lai garantētu tās atbilstību tehniskajām prasībām.",
      img: step3Img,
      badge: "Ražošana"
    },
    {
      num: "04",
      title: "Piegāde, montāža un garantija",
      desc: "Pēdējā posmā mūsu speciālisti nogādā un veic izgatavoto mēbeļu vai kāpņu montāžu Jūsu mājoklī. Mēs garantējam precīzu uzstādīšanu, savienojumu vietu hermētiskumu, kas nodrošinās to ilgmūžību. Pēc izgatavoto mēbeļu vai citu detaļu montāžas nodrošinām to garantiju, kā arī rekomendācijas to pareizai kopšanai.",
      img: step4Img,
      badge: "Montāža"
    }
  ];

  const stepsEN = [
    {
      num: "01",
      title: "Consultation & Initial Sketch",
      desc: "Our collaboration starts with a meeting where we discuss your wishes and requirements either in person or remotely, and record the room's parameters and dimensions. We suggest the best materials and technical solutions for implementing your ideas, and draw a sketch that serves as the basis for further project development.",
      img: step1Img,
      badge: "Discovery & Sketch"
    },
    {
      num: "02",
      title: "3D Modeling & Technical Blueprint",
      desc: "In the next stage, we develop a precise 3D digital model and technical drawings. We adapt the selected materials to your space, match sample tones and physical textures, and prepare a complete technical layout before production begins. Only when each structural element and fastener receives your approval is the project sent to manufacturing.",
      img: step2Img,
      badge: "3D & Blueprint"
    },
    {
      num: "03",
      title: "Manufacturing in Workshop",
      desc: "The manufacturing takes place in the AVANGART workshop, where our experienced joinery masters transform the pre-approved drafts into tangible items. Uniting modern machinery with traditional artisan techniques, we guarantee absolute precision and work quality. Each component is thoroughly checked before shipping to ensure compliance with technical requirements.",
      img: step3Img,
      badge: "Manufacturing"
    },
    {
      num: "04",
      title: "Delivery, Mounting & Warranty",
      desc: "In the final step, our professional installers deliver and set up the completed furniture or stairs in your home. We guarantee highly accurate, precise mounting and tight node-seals, which will ensure their longevity. After assembly of the furniture or other parts, we provide a direct warranty alongside custom surface care guidelines.",
      img: step4Img,
      badge: "Installation"
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
