import Link from 'next/link';
import { WorkflowConsole } from '@/components/WorkflowConsole';
import { ProcessShowcase } from '@/components/ProcessShowcase';
import { AuditForm } from '@/components/AuditForm';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#top">
        Preskočiť na obsah
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-6 sm:px-10">
          <Link href="#top" className="flex items-center gap-2.5 text-lg font-medium tracking-tight text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#93f1f7] font-mono-code text-xs font-semibold text-black">
              E
            </span>
            <span>EastFlow AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/75" aria-label="Hlavná navigácia">
            <a href="#services" className="hover:text-white transition-colors">
              Služby
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Postup
            </a>
            <a href="#audit" className="hover:text-white transition-colors">
              Audit
            </a>
          </nav>

          <a href="#audit" className="btn-primary text-sm">
            Objednať audit procesov
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="border-b border-white/10 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-6">
              <p className="inline-flex items-center gap-2 rounded border border-white/15 bg-[#0d0d0d] px-3 py-1 font-mono-code text-xs text-[#93f1f7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93f1f7]" aria-hidden="true" />
                Košice · Prešov · Východné Slovensko
              </p>

              <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
                Implementácia AI do firemných procesov
              </h1>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Naši vývojári prídu priamo k vám do firmy, porozprávajú sa s ľuďmi v prevádzke a zapoja AI automatizáciu do vášho ERP, CRM a pošty do 14 dní.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#audit" className="btn-primary">
                  Objednať audit procesov
                  <span aria-hidden="true">→</span>
                </a>
                <a href="#process" className="btn-secondary">
                  Pozrieť postup
                </a>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-xs text-white/50">Prvý pilot</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-white">14 dní</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">Pôsobenie</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-white">Osobne vo firme</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">Prevádzka</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-white">On-premise / EÚ</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <WorkflowConsole />
            </div>
          </div>
        </section>

        {/* Služby */}
        <section id="services" aria-labelledby="services-heading" className="border-b border-white/10 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="max-w-2xl mb-12">
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-white">
                Služby implementácie AI.{' '}
                <span className="text-white/50">Žiadne prázdne prezentácie, len funkčné napojenie na vaše nástroje.</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-lg border border-white/12 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-medium text-white">Audit procesov v prevádzke</h3>
                    <span className="font-mono-code text-xs text-[#93f1f7]">5 dní</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Sadneme si s obchodníkmi, skladníkmi aj účtovníkmi. Zmapujeme opakovanú prácu a vyberieme procesy s najrýchlejšou návratnosťou.
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-black p-4 font-mono-code text-xs space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Sklad: príjemky z PDF</span>
                    <span className="text-[#93f1f7]">−11 hod / týž.</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Obchod: triedenie dopytov</span>
                    <span className="text-[#93f1f7]">−7 hod / týž.</span>
                  </div>
                  <div className="flex justify-between text-white/55">
                    <span>Účtáreň: párovanie faktúr</span>
                    <span>−5 hod / týž.</span>
                  </div>
                </div>
              </article>

              <article className="rounded-lg border border-white/12 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-medium text-white">Doklady a faktúry priamo do ERP</h3>
                    <span className="font-mono-code text-xs text-[#93f1f7]">14 dní</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Automatické vyčítanie dodacích listov, objednávok a e-mailov s kontrolou cien, IČO a skladových kariet pre Pohodu, Kros či SAP.
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-black p-4 font-mono-code text-xs space-y-1.5 text-white/80">
                  <div className="text-white/45">// Kontrola pred zápisom</div>
                  <div>
                    <span className="text-[#93f1f7]">ico:</span> &quot;31577890&quot; ·{' '}
                    <span className="text-emerald-400">overené</span>
                  </div>
                  <div>
                    <span className="text-[#93f1f7]">sku:</span> &quot;SKL-JAK-60403&quot; ·{' '}
                    <span className="text-emerald-400">zhoda 99,4 %</span>
                  </div>
                </div>
              </article>

              <article className="rounded-lg border border-white/12 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-medium text-white">Interný firemný asistent</h3>
                    <span className="font-mono-code text-xs text-[#93f1f7]">14 dní</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Okamžité vyhľadávanie a príprava odpovedí nad vašimi smernicami, technickými listami a históriou zákaziek bez úniku dát mimo firmu.
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-black p-4 font-mono-code text-xs space-y-2">
                  <div className="text-white/60">&gt; Norma pre toleranciu zvaru na projekte Z-42?</div>
                  <div className="text-[#93f1f7]">
                    Zdroj: Smernica_QMS_04.pdf (str. 14) · lokálny index
                  </div>
                </div>
              </article>

              <article className="rounded-lg border border-white/12 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-medium text-white">Schvaľovanie človekom a školenie</h3>
                    <span className="font-mono-code text-xs text-[#93f1f7]">V cene</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Každý citlivý zápis čaká na potvrdenie jedným klikom. Po nasadení zaškolíme váš tím, aby systém používal s istotou každý deň.
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-black p-4 font-mono-code text-xs flex items-center justify-between gap-3">
                  <span className="text-white/80">Odchýlka ceny &gt; 2 % → zastaviť a upozorniť</span>
                  <span className="rounded bg-[#93f1f7]/15 px-2 py-0.5 text-[#93f1f7]">AKTÍVNE</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Postup implementácie */}
        <section id="process" aria-labelledby="process-heading" className="border-b border-white/10 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="max-w-2xl mb-12">
              <h2 id="process-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-white">
                Postup implementácie vo firme
              </h2>
              <p className="mt-3 text-base text-white/70">
                Kliknite na jednotlivé fázy a pozrite si, čo presne v každom kroku odovzdávame.
              </p>
            </div>
            <ProcessShowcase />
          </div>
        </section>

        {/* Audit formulár */}
        <section id="audit" aria-labelledby="audit-heading" className="border-b border-white/10 py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 space-y-6">
              <h2 id="audit-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-white">
                Objednať audit procesov
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Napíšte nám, ktoré oddelenie alebo ručné prepisovanie vás najviac brzdí. Stretneme sa na 30 minút online alebo osobne v Košiciach a okolí.
              </p>
              <ul className="divide-y divide-white/10 border-t border-b border-white/10 text-sm">
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-white/85">Úvodný rozhovor s vývojármi</span>
                  <span className="font-mono-code text-[#93f1f7]">30 minút</span>
                </li>
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-white/85">Prvý funkčný prototyp na vašich dátach</span>
                  <span className="font-mono-code text-[#93f1f7]">Do 14 dní</span>
                </li>
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-white/85">Umiestnenie systému</span>
                  <span className="font-mono-code text-[#93f1f7]">Váš server / EÚ</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <AuditForm />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-14">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-12 pb-10 border-b border-white/10">
            <div className="sm:col-span-6 space-y-3">
              <Link href="#top" className="flex items-center gap-2.5 text-lg font-medium text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#93f1f7] font-mono-code text-xs font-semibold text-black">
                  E
                </span>
                <span>EastFlow AI</span>
              </Link>
              <p className="max-w-sm text-sm text-white/65 leading-relaxed">
                Vývojári pre východné Slovensko, ktorí sa rozprávajú s ľuďmi vo firmách a zrýchľujú procesy cez AI.
              </p>
            </div>
            <div className="sm:col-span-3 space-y-2.5 text-sm">
              <h3 className="font-medium text-white">Navigácia</h3>
              <ul className="space-y-2 text-white/65">
                <li><a href="#services" className="hover:text-white">Služby</a></li>
                <li><a href="#process" className="hover:text-white">Postup implementácie</a></li>
                <li><a href="#audit" className="hover:text-white">Audit procesov</a></li>
              </ul>
            </div>
            <div className="sm:col-span-3 space-y-2.5 text-sm">
              <h3 className="font-medium text-white">Región &amp; Kontakt</h3>
              <ul className="space-y-2 text-white/65">
                <li>Košice · Prešov · Východné Slovensko</li>
                <li><a href="mailto:ahoj@eastflow.example" className="hover:text-white">Napísať vývojárom</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-white/50">
            <span>&copy; 2026 EastFlow AI</span>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white">Ochrana údajov</Link>
              <Link href="/terms" className="hover:text-white">Podmienky</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
