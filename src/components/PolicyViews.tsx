import React from 'react';
import { ArrowRight, ChevronLeft, Cookie, Shield } from 'lucide-react';

interface PolicyViewProps {
  lang: "LV" | "ENG";
}

export const CookiePolicyView = ({ lang }: PolicyViewProps) => {
  const navigateToHome = () => {
    window.location.hash = lang === 'ENG' ? '#home' : '#sakums';
  };

  return (
    <div className="pt-40 sm:pt-48 md:pt-[190px] lg:pt-[210px] min-h-screen bg-brand-grey-light font-sans pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back navigation button */}
        <button 
          onClick={navigateToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown hover:text-brand-orange transition-all duration-300 mb-8 cursor-pointer group"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>{lang === "ENG" ? "Back to Home" : "Atpakaļ uz sākumu"}</span>
        </button>

        {/* Content Card */}
        <div className="bg-white border border-zinc-200/50 p-6 md:p-12 shadow-xl rounded-none text-left">
          {/* Document Header */}
          <div className="border-b border-zinc-100 pb-6 mb-8">
            <div className="flex items-center space-x-4 text-brand-orange mb-2">
              <Cookie size={32} className="shrink-0 animate-pulse" />
              <h1 className="font-serif font-bold text-2xl md:text-4xl tracking-tight text-brand-brown-dark">
                {lang === "ENG" ? "Cookie Policy" : "Sīkdatņu politika"}
              </h1>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-wide mt-2">
              {lang === "ENG" ? "Last updated: May 2026" : "Pēdējo reizi atjaunots: 2026. gada maijs"}
            </p>
          </div>

          {/* Document Body */}
          <div className="text-zinc-600 font-light text-sm md:text-base leading-relaxed space-y-8 max-w-none">
            {lang === 'LV' ? (
              <>
                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">1. Kas ir sīkdatnes?</h2>
                  <p>
                    Sīkdatnes (cookies) ir mazi teksta faili, ko tīmekļa vietne saglabā Jūsu datorā vai mobilajā ierīcē, kad Jūs to apmeklējat. Katrā nākamajā apmeklējuma reizē sīkdatnes tiek nosūtītas atpakaļ uz izcelsmes vietni vai trešās puses vietni, kas atpazīst attiecīgo sīkdatni.
                  </p>
                  <p>
                    Sīkdatnes darbojas kā konkrētas vietnes atmiņa, ļaujot vietnei atcerēties Jūsu iestatījumus un darbības (piemēram, valodu, fontu izmērus un citus attēlošanas iestatījumus), lai Jums tie nebūtu jāievada no jauna katru reizi.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">2. Kāpēc mēs izmantojam sīkdatnes?</h2>
                  <p>SIA "AVANGART" izmanto sīkdatnes šādiem mērķiem:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Vietnes funkcionalitātes nodrošināšanai:</strong> Lai tīmekļa vietne varētu darboties un nodrošināt pamatfunkcijas.</li>
                    <li><strong>Lietošanas pieredzes uzlabošanai:</strong> Lai atcerētos Jūsu izvēles un sniegtu personalizētāku saturu.</li>
                    <li><strong>Analītikai un statistikai:</strong> Lai saprastu, kā apmeklētāji mijiedarbojas ar vietni (kuras lapas apmeklē visbiežāk, cik ilgi uzturas vietnē), kas palīdz mums uzlabot vietnes struktūru un saturu.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">3. Izmantoto sīkdatņu veidi</h2>
                  <div className="space-y-4 pl-4 border-l-2 border-brand-orange/30">
                    <div>
                      <p className="font-semibold text-zinc-850">Nepieciešamās sīkdatnes</p>
                      <p className="text-zinc-600 font-light mt-1">
                        Šīs sīkdatnes ir būtiskas, lai vietne varētu darboties. Bez tām dažas vietnes daļas var nedarboties pareizi. Tās parasti tiek iestatītas tikai reaģējot uz Jūsu veiktajām darbībām, piemēram, aizpildot kontaktformas.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-850 font-sans">Analītikas sīkdatnes</p>
                      <p className="text-zinc-600 font-light mt-1">
                        Mēs izmantojam trešo pušu rīkus (piemēram, Google Analytics), lai apkopotu anonīmu informāciju par apmeklētāju skaitu un populārākajām lapām. Šie dati mums palīdz uzlabot lietotāju pieredzi.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">4. Kā pārvaldīt un izdzēst sīkdatnes?</h2>
                  <p>
                    Lielākā daļa pārlūkprogrammu ir iestatītas tā, lai automātiski pieņemtu sīkdatnes. Jūs varat jebkurā laikā mainīt Savas pārlūkprogrammas iestatījumus, lai bloķētu sīkdatnes vai saņemtu brīdinājumu, kad tās tiek sūtītas.
                  </p>
                  <p className="font-semibold text-zinc-700 font-sans">Instrukcijas populārākajām pārlūkprogrammām:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <a 
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Google Chrome</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Safari</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Mozilla Firefox</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>MS Edge</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                  </div>

                  <p className="italic text-zinc-500 text-xs mt-4">
                    Ievērojiet: Ja Jūs bloķēsiet sīkdatnes, dažas mūsu tīmekļa vietnes funkcijas var nebūt pieejamas vai darboties nepilnīgi.
                  </p>
                  <p className="font-semibold text-brand-brown-dark mt-4 border-t border-zinc-100 pt-4">
                    Ja Jums ir jautājumi par mūsu sīkdatņu politiku, lūdzu, sazinieties ar mums, rakstot uz: <a href="mailto:info@avangart.lv" className="text-brand-orange hover:underline">info@avangart.lv</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">1. What are cookies?</h2>
                  <p>
                    Cookies are small text files that a website stores on your computer or mobile device when you visit it. On subsequent visits, cookies are sent back to the originating website or to a third-party website that recognizes them.
                  </p>
                  <p>
                    Cookies act as a memory for a specific site, allowing it to remember your preferences and actions (such as language, font size, and other display preferences) so you don't have to re-enter them each time.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">2. Why do we use cookies?</h2>
                  <p>SIA "AVANGART" uses cookies for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Website functionality:</strong> Essential to enable core features and navigation.</li>
                    <li><strong>User experience:</strong> To remember your choices and offer personalized content.</li>
                    <li><strong>Analytics and statistics:</strong> To understand how visitors interact with the site, helping us optimize the content and design.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">3. Types of cookies used</h2>
                  <div className="space-y-4 pl-4 border-l-2 border-brand-orange/30">
                    <div>
                      <p className="font-semibold text-zinc-850 font-sans">Necessary cookies</p>
                      <p className="text-zinc-600 font-light mt-1">
                        These are essential for the site to function properly. They are usually set in response to actions you take, such as filling out contact forms.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-850 font-sans">Analytical cookies</p>
                      <p className="text-zinc-600 font-light mt-1">
                        We use third-party analytics (such as Google Analytics) to collect anonymous information about visitor counts and popular pages. This data helps us improve user experience.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">4. How to manage and delete cookies?</h2>
                  <p>
                    Most web browsers are set to automatically accept cookies. You can configure your browser at any time to block cookies or notify you when they are sent.
                  </p>
                  <p className="font-semibold text-zinc-700 font-sans">Instructions for popular browsers:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <a 
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Google Chrome</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Safari</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>Mozilla Firefox</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                    <a 
                      href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-zinc-200 hover:border-brand-brown hover:bg-zinc-50 py-3 px-5 text-sm font-semibold text-zinc-805 tracking-wide transition-all cursor-pointer"
                    >
                      <span>MS Edge</span>
                      <ArrowRight size={15} className="text-brand-orange" />
                    </a>
                  </div>

                  <p className="italic text-zinc-500 text-xs mt-4">
                    Please note: If you block cookies, some features of our website may not be fully functional.
                  </p>
                  <p className="font-semibold text-brand-brown-dark mt-4 border-t border-zinc-100 pt-4">
                    If you have any questions, feel free to contact us at: <a href="mailto:info@avangart.lv" className="text-brand-orange hover:underline">info@avangart.lv</a>
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Close button at bottom */}
          <div className="mt-12 pt-6 border-t border-zinc-100 flex justify-end">
            <button
              onClick={navigateToHome}
              className="inline-flex items-center space-x-2 bg-brand-brown hover:bg-brand-orange text-white text-[10px] tracking-widest font-extrabold uppercase py-3 px-6 transition-colors duration-300 cursor-pointer border border-brand-brown hover:border-brand-orange"
            >
              <span>{lang === "ENG" ? "Close" : "Aizvērt"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const PrivacyPolicyView = ({ lang }: PolicyViewProps) => {
  const navigateToHome = () => {
    window.location.hash = lang === 'ENG' ? '#home' : '#sakums';
  };

  return (
    <div className="pt-40 sm:pt-48 md:pt-[190px] lg:pt-[210px] min-h-screen bg-brand-grey-light font-sans pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back navigation button */}
        <button 
          onClick={navigateToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown hover:text-brand-orange transition-all duration-300 mb-8 cursor-pointer group"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>{lang === "ENG" ? "Back to Home" : "Atpakaļ uz sākumu"}</span>
        </button>

        {/* Content Card */}
        <div className="bg-white border border-zinc-200/50 p-6 md:p-12 shadow-xl rounded-none text-left">
          {/* Document Header */}
          <div className="border-b border-zinc-100 pb-6 mb-8">
            <div className="flex items-center space-x-4 text-brand-orange mb-2">
              <Shield size={32} className="shrink-0 animate-pulse" />
              <h1 className="font-serif font-bold text-2xl md:text-4xl tracking-tight text-brand-brown-dark">
                {lang === "ENG" ? "Privacy Policy" : "Privātuma politika"}
              </h1>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-wide mt-2">
              {lang === "ENG" ? "Last updated: May 2026" : "Pēdējo reizi atjaunots: 2026. gada maijs"}
            </p>
          </div>

          {/* Document Body */}
          <div className="text-zinc-650 font-light text-sm md:text-base leading-relaxed space-y-8 max-w-none">
            {lang === 'LV' ? (
              <>
                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">1. Ievads</h2>
                  <p>
                    SIA "AVANGART" (turpmāk – "mēs", "mūsu" vai "uzņēmums") apņemas aizsargāt un respektēt Jūsu privātumu. Šī privātuma politika skaidro, kā mēs apkopojam, izmantojam, uzglabājam un aizsargājam Jūsu personas datus saskaņā ar Vispārīgo datu aizsardzības regulu (GDPR) un Latvijas Republikas tiesību aktiem.
                  </p>
                  <p>
                    Izmantojot mūsu mājas lapu un pakalpojumus, Jūs piekrītat šajā politikā aprakstītajai datu vākšanai un izmantošanai.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">2. Datu pārzinis</h2>
                  <div className="bg-zinc-50 p-6 border border-zinc-200/50 font-sans text-sm space-y-1.5 text-zinc-700">
                    <p><strong>Uzņēmums:</strong> SIA "AVANGART"</p>
                    <p><strong>Reģistrācijas numurs:</strong> 40203598561</p>
                    <p><strong>PVN Reģ.Nr.:</strong> LV40203598561</p>
                    <p className="pt-2"><strong>Juridiskā adrese:</strong> Katlakalna iela 11, Rīga, LV-1073</p>
                    <p><strong>E-pasts:</strong> <a href="mailto:info@avangart.lv" className="text-brand-orange hover:underline">info@avangart.lv</a></p>
                    <p><strong>Tālrunis:</strong> <a href="tel:+37129883456" className="text-brand-orange hover:underline">+371 29 883 456</a></p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">3. Kādus personas datus mēs vācam</h2>
                  <p>Mēs varam apkopot un apstrādāt šādu informāciju par Jums:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Kontaktinformācija:</strong> Vārds, uzņēmuma nosaukums, e-pasta adrese, tālruņa numurs.</li>
                    <li><strong>Tehniskā informācija:</strong> IP adrese, pārlūkprogrammas veids, ierīces informācija, apmeklējuma laiks un datums.</li>
                    <li><strong>Lietošanas dati:</strong> Informācija par to, kā Jūs izmantojat mūsu mājas lapu un pakalpojumus.</li>
                    <li><strong>Saziņas dati:</strong> Jūsu ziņojumu un komunikācijas saturs ar mūsu uzņēmumu.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">4. Kā mēs izmantojam Jūsu datus</h2>
                  <p>Mēs izmantojam Jūsu personas datus šādiem mērķiem:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Lai sniegtu Jums pieprasītos pakalpojumus un atbildētu uz Jūsu pieprasījumiem.</li>
                    <li>Lai sazinātos ar Jums par mūsu pakalpojumiem un piedāvājumiem.</li>
                    <li>Lai uzlabotu mūsu mājas lapu un pakalpojumu kvalitāti.</li>
                    <li>Lai izpildītu juridiskās saistības un aizsargātu savas likumīgās intereses.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">5. Juridiskais pamats datu apstrādei</h2>
                  <p>Mēs apstrādājam Jūsu personas datus, pamatojoties uz:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Jūsu piekrišanu</strong> – kad Jūs aizpildāt mūsu kontaktformu un piekrītat datu apstrādes noteikumiem.</li>
                    <li><strong>Līguma izpildi</strong> – lai sniegtu Jums pieprasītos kāpņu un mēbeļu izgatavošanas pakalpojumus.</li>
                    <li><strong>Likumīgām interesēm</strong> – lai uzlabotu mūsu pakalpojumus, nodrošinātu mājaslapas aizsardzību un attīstītu uzņēmumu.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">6. Datu uzglabāšana un drošība</h2>
                  <p>
                    Mēs uzglabājam Jūsu personas datus tikai tik ilgi, cik tas ir nepieciešams šajā politikā norādīto mērķu sasniegšanai vai saskaņā ar spēkā esošajiem likumiem.
                  </p>
                  <p>
                    Mēs izmantojam atbilstošus tehniskos un organizatoriskos drošības pasākumus, lai droši aizsargātu Jūsu datus pret nesankcionētu piekļuvi, izmantošanu, izmaiņām vai izpaušanu:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS šifrēšana visai datu pārsūtīšanai.</li>
                    <li>Ierobežota un autorizēta darbinieku piekļuve personas datiem.</li>
                    <li>Regulāras vietnes drošības sistēmu pārbaudes un atjauninājumi.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">7. Jūsu tiesības</h2>
                  <p>Saskaņā ar GDPR Jums ir šādas tiesības attiecībā uz Saviem personas datiem:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Piekļuves tiesības</strong> – pieprasīt piekļuvi un informāciju par Jūsu apstrādātajiem datiem.</li>
                    <li><strong>Labošanas tiesības</strong> – labot neprecīzus vai nepilnīgus datus.</li>
                    <li><strong>Dzēšanas tiesības</strong> – pieprasīt Savu datu dzēšanu ("tiesības tikt aizmirstam").</li>
                    <li><strong>Ierobežošanas tiesības</strong> – ierobežot Savu datu apstrādi uz noteiktu laiku.</li>
                    <li><strong>Pārnesamības tiesības</strong> – saņemt Savus datus strukturētā formātā pārnešanai citam pārzinim.</li>
                    <li><strong>Iebildumu tiesības</strong> – iebilst pret Savu datu apstrādi tiešā mārketinga vai citos nolūkos.</li>
                    <li><strong>Atsaukt piekrišanu</strong> – jebkurā laikā atsaukt Savu piekrišanu datu apstrādei, neietekmējot līdz tam veiktās apstrādes likumību.</li>
                  </ul>
                  <p className="pt-2 text-zinc-700">
                    Lai izmantotu Savas tiesības, lūdzu, sazinieties ar mums, rakstot uz e-pastu: <a href="mailto:info@avangart.lv" className="text-brand-orange hover:underline font-medium">info@avangart.lv</a>.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">8. Sīkdatnes (Cookies)</h2>
                  <p>
                    Mūsu mājas lapa izmanto sīkdatnes, lai uzlabotu Jūsu lietošanas pieredzi un analizētu mājas lapas apmeklējumu statistiku. Sīkdatnes ir mazi teksta faili, kas tiek saglabāti Jūsu ierīcē. Jūs varat pilnībā pārvaldīt sīkdatnes Savā interneta pārlūkprogrammā. Detalizētāka informācija pieejama mūsu Sīkdatņu politikā.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">9. Trešo pušu pakalpojumi</h2>
                  <p>
                    Mēs varam izmantot uzticamus trešo pušu pakalpojumu sniedzējus, piemēram, mājas lapas mitināšanas un uzturēšanas pakalpojumus vai analītikas rīkus (Google Analytics). Šie partneri piekļūst Jūsu datiem tikai tiktāl, cik tas ir strikti nepieciešams konkrēto pakalpojumu nodrošināšanai, un apņemas ievērot konfidencialitātes prasības.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">10. Izmaiņas privātuma politikā</h2>
                  <p>
                    Mēs paturam tiesības pēc vajadzības atjaunināt šo privātuma politiku. Visas izmaiņas stājas spēkā nekavējoties, tiklīdz atjauninātā privātuma politika tiek publicēta mūsu mājas lapā.
                  </p>
                </section>

                <section className="space-y-3 border-t border-zinc-100 pt-6">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">11. Sūdzības</h2>
                  <p>
                    Ja Jums ir sūdzības vai jautājumi, lūdzu, vispirms sazinieties ar mums. Jums ir arī tiesības iesniegt oficiālu sūdzību Datu valsts inspekcijā:
                  </p>
                  <div className="bg-zinc-50 p-6 border border-zinc-205/50 font-sans text-sm space-y-1.5 text-zinc-700 mt-3">
                    <p className="font-semibold text-zinc-800">Datu valsts inspekcija</p>
                    <p><strong>Adrese:</strong> Blaumaņa iela 11/13-15, Rīga, LV-1011</p>
                    <p><strong>E-pasts:</strong> <a href="mailto:info@dvi.gov.lv" className="text-brand-orange hover:underline">info@dvi.gov.lv</a></p>
                    <p><strong>Tālrunis:</strong> +371 67 22 31 31</p>
                    <p><strong>Mājas lapa:</strong> <a href="https://www.dvi.gov.lv" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">www.dvi.gov.lv</a></p>
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">1. Introduction</h2>
                  <p>
                    SIA "AVANGART" (hereinafter – "we", "our", or "company") is committed to protecting and respecting your privacy. This privacy policy explains how we collect, use, store, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and the laws of the Republic of Latvia.
                  </p>
                  <p>
                    By using our website and services, you consent to the collection and use of data as described in this policy.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">2. Data Controller</h2>
                  <div className="bg-zinc-50 p-6 border border-zinc-200/50 font-sans text-sm space-y-1.5 text-zinc-700">
                    <p><strong>Company:</strong> SIA "AVANGART"</p>
                    <p><strong>Registration Number:</strong> 40203598561</p>
                    <p><strong>VAT Reg.No:</strong> LV40203598561</p>
                    <p className="pt-2"><strong>Registered Address:</strong> Katlakalna iela 11, Riga, LV-1073</p>
                    <p><strong>E-mail:</strong> info@avangart.lv</p>
                    <p><strong>Phone:</strong> +371 29 883 456</p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">3. What Personal Data We Collect</h2>
                  <p>We may collect and process the following information about you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Contact Information:</strong> name, company name, email address, phone number.</li>
                    <li><strong>Technical Information:</strong> IP address, browser type, device details, timestamp of visits.</li>
                    <li><strong>Usage Data:</strong> information on how you interact with our website.</li>
                    <li><strong>Communication Data:</strong> content of your messages and matches with our support.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">4. How We Use Your Data</h2>
                  <p>We use your personal data for the following goals:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide requested services and answer inquiries.</li>
                    <li>To communicate with you regarding offers and updates.</li>
                    <li>To optimize the website and build a premium experience.</li>
                    <li>To fulfill legal obligations and protect legitimate interests.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">5. Legal Basis for Data Processing</h2>
                  <p>We process your personal data based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Your consent</strong> – when submitting contact forms.</li>
                    <li><strong>Contract performance</strong> – to deliver bespoke staircases or furniture.</li>
                    <li><strong>Legitimate interests</strong> – to improve security and optimize services.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">6. Storage and Information Security</h2>
                  <p>
                    We keep data only as long as necessary to fulfill the purposes or legal bounds. Secure actions we use:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption with modern cipher suites for all data transfers.</li>
                    <li>Strictly limited and authenticated data access by employees.</li>
                    <li>Periodic security reviews and system audits.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">7. Your GDPR Rights</h2>
                  <p>Under GDPR, you hold the following rights over your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The right to access, modify, or delete ("right to be forgotten") your personal information.</li>
                    <li>The right to restrict or object to processing of personal data.</li>
                    <li>The right to data portability in structured format.</li>
                    <li>The right to withdraw consent at any time without affecting prior legitimacy.</li>
                  </ul>
                  <p className="pt-2 text-zinc-700">
                    To exercise your rights, please reach out via email to <a href="mailto:info@avangart.lv" className="text-brand-orange hover:underline font-medium">info@avangart.lv</a>.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">8. Cookies</h2>
                  <p>
                    We use necessary and statistical cookies. You may toggle cookie settings in your browser settings. Please review our Cookie Policy for more details.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">9. Third-party Processing</h2>
                  <p>
                    We share data with trusted tech partners (Google Analytics, hosting platforms) purely to provide correct capabilities and improve page quality.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">10. Policy Updates</h2>
                  <p>
                    We maintain the right to update this policy, taking action immediately upon publishing the terms.
                  </p>
                </section>

                <section className="space-y-3 border-t border-zinc-100 pt-6">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-zinc-800">11. Complaints</h2>
                  <p>
                    If you have concerns, feel free to contact us first. You also have the right to appeal to the State Data Inspectorate in Latvia:
                  </p>
                  <div className="bg-zinc-50 p-6 border border-zinc-205/50 font-sans text-sm space-y-1.5 text-zinc-700 mt-3">
                    <p className="font-semibold text-zinc-800">Data State Inspectorate</p>
                    <p><strong>Address:</strong> Blaumana street 11/13-15, Riga, LV-1011</p>
                    <p><strong>E-mail:</strong> info@dvi.gov.lv</p>
                    <p><strong>Phone:</strong> +371 67 22 31 31</p>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Close button at bottom */}
          <div className="mt-12 pt-6 border-t border-zinc-100 flex justify-end">
            <button
              onClick={navigateToHome}
              className="inline-flex items-center space-x-2 bg-brand-brown hover:bg-brand-orange text-white text-[10px] tracking-widest font-extrabold uppercase py-3 px-6 transition-colors duration-300 cursor-pointer border border-brand-brown hover:border-brand-orange"
            >
              <span>{lang === "ENG" ? "Close" : "Aizvērt"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
