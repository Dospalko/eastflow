import Link from 'next/link';
import { Process3DScene } from '@/components/Process3DScene';
import { AuditForm } from '@/components/AuditForm';

const WORKFLOW_CARDS = [
  {
    step: '01',
    body: 'Prídeme priamo do vašej prevádzky v Košiciach či Prešove, sadneme si s ľuďmi a zmapujeme, kde ručné prepisovanie berie najviac hodín.',
    tag: 'AUDIT PRIAMO VO FIRME',
    featured: true,
  },
  {
    step: '02',
    body: 'Nasadíme modely, ktoré čítajú PDF dodacie listy, objednávky a zákaznícke e-maily s automatickou kontrolou súčtov a IČO.',
    tag: 'EXTRAKCIA A KONTROLA DOKLADOV',
    featured: false,
  },
  {
    step: '03',
    body: 'Prepojíme výstupy priamo s vaším systémom Pohoda, Kros, SAP alebo CRM so schválením človekom pred každým zápisom.',
    tag: 'NAPOJENIE NA ERP A CRM',
    featured: false,
  },
  {
    step: '04',
    body: 'Systém beží na vašom serveri alebo v EÚ cloude. Zaškolíme váš tím, aby automatizáciu bezpečne používal každý deň.',
    tag: 'ON-PREMISE A ŠKOLENIE TÍMU',
    featured: false,
  },
];

const DETECTED_CASES = [
  {
    badge: 'SKLAD A LOGISTIKA',
    title: 'Ručný prepis dodacích listov do Pohody',
    description:
      'Skladníci prepisovali 40+ papierových a PDF dodacích listov denne, pričom vznikali chyby v šaržiach a skladových kartách.',
    impact: 'Z 6 hodín denne na 25 minút kontroly · návratnosť za 5 týždňov',
  },
  {
    badge: 'OBCHOD A CENOTVORBA',
    title: 'Oneskorené odpovede na zákaznícke dopyty',
    description:
      'Dopyty z e-mailov s výkresmi čakali na ručné dohľadanie histórie klienta a kontrolu skladových zásob.',
    impact: 'Návrh ponuky v CRM do 2 minút · 3× rýchlejšia odozva',
  },
  {
    badge: 'KVALITA A VÝROBA',
    title: 'Zdlhavé hľadanie v smerniciach a normách',
    description:
      'Technici trávili desiatky minút hľadaním postupov pri reklamáciách a kontrolách kvality v stovkách PDF dokumentov.',
    impact: 'Okamžitá odpoveď s citáciou strany · 100 % dáta vo vnútri firmy',
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#top">
        Preskočiť na obsah
      </a>

      {/* Top Black Announcement Ribbon */}
      <div className="bg-[#0d0d0d] text-white text-xs py-2.5 px-4 text-center border-b border-white/10">
        <span className="text-white/85">
          Košice · Prešov · Východné Slovensko: 14-dňový pilotný projekt priamo vo vašej prevádzke.
        </span>{' '}
        <a href="#audit" className="text-[#87f700] font-medium hover:underline ml-1.5">
          Objednať audit →
        </a>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-[#d4d4cc] bg-[#f4f4f0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-10">
          <div className="flex items-center gap-10">
            <Link href="#top" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-[#141413]">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="11" height="11" rx="2.5" fill="none" stroke="#141413" strokeWidth="2.2" />
                <rect x="10" y="10" width="11" height="11" rx="2.5" fill="none" stroke="#141413" strokeWidth="2.2" />
              </svg>
              <span>eastflow</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm text-[#141413]/80" aria-label="Hlavná navigácia">
              <a href="#workbench" className="hover:text-[#141413] transition-colors">
                Ukážka
              </a>
              <a href="#manifesto" className="hover:text-[#141413] transition-colors">
                Prečo my
              </a>
              <a href="#postup" className="hover:text-[#141413] transition-colors">
                Postup
              </a>
              <a href="#vysledky" className="hover:text-[#141413] transition-colors">
                Výsledky
              </a>
              <a href="#audit" className="hover:text-[#141413] transition-colors">
                Audit
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="mailto:ahoj@eastflow.example"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#eaeae4] px-3.5 py-2 text-xs font-medium text-[#141413] hover:bg-[#dfdfd8] transition-colors"
            >
              Kontaktovať tím
            </a>
            <a
              href="#audit"
              className="inline-flex items-center justify-center rounded-md bg-[#87f700] px-4 py-2 text-xs font-medium text-[#141413] hover:bg-[#7ae000] transition-colors"
            >
              Objednať audit
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section: Two-tone headline + exposed horizontal hairline + lead & buttons */}
        <section className="border-b border-[#d4d4cc]">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 pt-14 sm:pt-20 pb-10">
            <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-[-0.035em] leading-[1.03] text-[#141413]">
              Zrýchlite <span className="text-[#7a7d6e]">firemné procesy</span> skôr, než vás spomalia.
            </h1>
          </div>

          <div className="border-t border-[#d4d4cc]">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-10 py-10 sm:py-12">
              <p className="max-w-xl text-base sm:text-lg text-[#5c5d56] leading-relaxed">
                Sme tím vývojárov z východného Slovenska. Prídeme priamo do vašej firmy, porozprávame sa s ľuďmi v prevádzke a nasadíme AI automatizáciu, ktorá prepojí doklady, e-maily a ERP do 14 dní.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#audit" className="btn-lime">
                  Objednať audit
                </a>
                <a href="#workbench" className="btn-stone">
                  <span>Pozrieť 3D ukážku</span>
                  <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3-Pane Interactive Workbench + 3D Scene */}
          <div id="workbench" className="mx-auto max-w-[1440px] px-5 sm:px-10 pb-14">
            <Process3DScene />
          </div>
        </section>

        {/* Architectural Grid Spacer Row */}
        <div className="border-b border-[#d4d4cc]" aria-hidden="true">
          <div className="mx-auto max-w-[1440px] grid grid-cols-12 h-16 sm:h-24">
            <div className="col-span-8 border-r border-[#d4d4cc]" />
            <div className="col-span-4" />
          </div>
        </div>

        {/* Editorial Manifesto Split ("The bottleneck moved.") */}
        <section id="manifesto" className="border-b border-[#d4d4cc] py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium text-[#141413]">Úzke miesto sa presunulo.</p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-[-0.03em] leading-[1.16] text-[#141413]">
                Firmy majú ERP, CRM aj zdieľané disky, no zamestnanci stále trávia hodiny ručným prepisovaním PDF dokladov, dopytov a tabuliek. Veríme, že AI nemá byť ďalšia ikonka v prehliadači: musí sedieť priamo vo vašom procese, pripraviť podklady a vypýtať si len finálne schválenie.
              </p>
            </div>
          </div>
        </section>

        {/* 4-Column Step Cards */}
        <section id="postup" className="border-b border-[#d4d4cc] py-14 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOW_CARDS.map((card) => (
                <article
                  key={card.step}
                  className={`rounded-md p-6 sm:p-7 flex flex-col justify-between min-h-[250px] border ${
                    card.featured
                      ? 'bg-white border-[#d4d4cc]'
                      : 'bg-[#eaeae4] border-transparent'
                  }`}
                >
                  <div className="space-y-4">
                    <span className="font-mono-code text-xs text-[#7a7d6e]">{card.step}</span>
                    <p className="text-sm sm:text-[15px] text-[#5c5d56] leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                  <div className="border-t border-[#d4d4cc]/70 pt-4 mt-6">
                    <span className="font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#141413]">
                      {card.tag}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 text-xs sm:text-sm text-[#5c5d56]">
              Nasadenie na vašom vlastnom serveri (On-Premise) alebo v dedikovanom EÚ cloude bez úniku dát.
            </p>
          </div>
        </section>

        {/* Impact Matrix with Exposed Vertical Grid Lines */}
        <section id="vysledky" className="border-b border-[#d4d4cc]">
          <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 border-b border-[#d4d4cc]">
            <div className="lg:col-span-8 p-6 sm:p-10 lg:border-r border-[#d4d4cc]">
              <p className="text-sm text-[#141413]">Merateľné výsledky v prevádzke.</p>
            </div>
            <div className="lg:col-span-4 hidden lg:block" />
          </div>

          <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12">
            <div className="lg:col-span-8 p-6 sm:p-10 lg:border-r border-[#d4d4cc] flex flex-col justify-between gap-10">
              <div>
                <p className="font-mono-code text-xs uppercase tracking-wider text-[#7a7d6e] mb-4">
                  KOŠICE · PREŠOV · VÝROBNÉ A OBCHODNÉ FIRMY
                </p>
                <blockquote className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.1] text-[#141413]">
                  „Namiesto polročnej analýzy sme za <span className="text-[#7a7d6e]">14 dní</span> mali funkčný automat na dodacie listy a dopyty priamo v našom ERP.“
                </blockquote>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div>
                  <div className="font-mono-code text-xs uppercase tracking-wider text-[#141413]">
                    MODEL SPOLUPRÁCE EASTFLOW
                  </div>
                  <div className="font-mono-code text-xs uppercase tracking-wider text-[#7a7d6e]">
                    PRIAMY KONTAKT S VÝVOJÁRMI · BEZ OBCHODNÍKOV
                  </div>
                </div>
                <a href="#audit" className="btn-lime">
                  Dohodnúť 30-minútový audit
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-10 flex flex-col justify-between gap-8 border-t lg:border-t-0 border-[#d4d4cc]">
              <div>
                <div className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-[#141413]">
                  30 min
                </div>
                <div className="mt-1.5 font-mono-code text-xs uppercase tracking-wider text-[#5c5d56]">
                  DENNÁ KONTROLA DOKLADOV, NÁHRADA ZA 6 HODÍN PREPISU
                </div>
              </div>

              <div className="border-t border-[#d4d4cc] pt-6">
                <div className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-[#141413]">
                  14 dní
                </div>
                <div className="mt-1.5 font-mono-code text-xs uppercase tracking-wider text-[#5c5d56]">
                  OD ÚVODNÉHO STRETNUTIA PO PRVÝ NASADENÝ PROCES
                </div>
              </div>

              <div className="border-t border-[#d4d4cc] pt-6">
                <div className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-[#141413]">
                  100 %
                </div>
                <div className="mt-1.5 font-mono-code text-xs uppercase tracking-wider text-[#5c5d56]">
                  SCHVÁLENIE ČLOVEKOM PRED ZÁPISOM DO ERP
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use-Case Cards ("Bugs caught by Momentic" layout adapted for processes automated) */}
        <section className="border-b border-[#d4d4cc]">
          <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12">
            <div className="lg:col-span-3 p-6 sm:p-10 lg:border-r border-[#d4d4cc] flex flex-col justify-between">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] leading-[1.08] text-[#141413]">
                Procesy <span className="text-[#7a7d6e]">zrýchlené</span> cez EastFlow
              </h2>
              <p className="mt-4 text-xs font-mono-code uppercase tracking-wider text-[#7a7d6e]">
                03 TYPOVÉ NASADENIA
              </p>
            </div>

            <div className="lg:col-span-9 p-6 sm:p-10 space-y-8">
              <p className="max-w-lg text-sm sm:text-base text-[#5c5d56]">
                Konkrétne miesta vo firme, kde naši vývojári nahrádzajú ručnú rutinu spoľahlivou AI linkou.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {DETECTED_CASES.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-md bg-[#eaeae4] p-6 flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#5c5d56]">Oblasť</span>
                        <span className="rounded border border-[#d4d4cc] bg-[#f4f4f0] px-2 py-0.5 font-mono-code text-[10px] uppercase tracking-wider text-[#141413]">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium tracking-[-0.02em] text-[#141413] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#5c5d56] leading-relaxed">{item.description}</p>
                    </div>

                    <div className="border-t border-[#d4d4cc] pt-4">
                      <div className="font-mono-code text-[10px] uppercase tracking-wider text-[#141413]">
                        PRÍNOS
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#141413]">{item.impact}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Column Enterprise Readiness Strip */}
        <section className="border-b border-[#d4d4cc]">
          <div className="mx-auto max-w-[1440px] grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#d4d4cc]">
            <div className="p-6 sm:p-8 space-y-2">
              <span className="font-mono-code text-xs text-[#7a7d6e]">01</span>
              <h3 className="text-base font-medium text-[#141413]">On-Premise alebo EÚ server</h3>
              <p className="text-xs sm:text-sm text-[#5c5d56]">
                Vaše faktúry, výkresy a zmluvy nikdy neopustia firemnú sieť ani neslúžia na tréning cudzích modelov.
              </p>
            </div>
            <div className="p-6 sm:p-8 space-y-2">
              <span className="font-mono-code text-xs text-[#7a7d6e]">02</span>
              <h3 className="text-base font-medium text-[#141413]">Pevná cena a termín</h3>
              <p className="text-xs sm:text-sm text-[#5c5d56]">
                Vopred dohodnutý rozsah 14-dňového pilota a merateľný cieľ úspory času pred začiatkom prác.
              </p>
            </div>
            <div className="p-6 sm:p-8 space-y-2">
              <span className="font-mono-code text-xs text-[#7a7d6e]">03</span>
              <h3 className="text-base font-medium text-[#141413]">Roly a auditný záznam</h3>
              <p className="text-xs sm:text-sm text-[#5c5d56]">
                Každý návrh AI je zaznamenaný spolu s menom pracovníka, ktorý zápis do ERP schválil.
              </p>
            </div>
            <div className="p-6 sm:p-8 space-y-2">
              <span className="font-mono-code text-xs text-[#7a7d6e]">04</span>
              <h3 className="text-base font-medium text-[#141413]">Osobne na východe</h3>
              <p className="text-xs sm:text-sm text-[#5c5d56]">
                Na stretnutie príde priamo vývojár, ktorý bude vaše riešenie navrhovať, programovať a školiť.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form Section */}
        <section id="audit" aria-labelledby="audit-heading" className="border-b border-[#d4d4cc]">
          <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12">
            <div className="lg:col-span-6 p-6 sm:p-12 lg:border-r border-[#d4d4cc] flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <span className="font-mono-code text-xs uppercase tracking-wider text-[#7a7d6e]">
                  ZAČNITE BEZ RIZIKA
                </span>
                <h2 id="audit-heading" className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-[#141413]">
                  Objednať <span className="text-[#7a7d6e]">audit procesov</span> vo vašej firme.
                </h2>
                <p className="text-base text-[#5c5d56] leading-relaxed max-w-lg">
                  Napíšte nám, ktoré oddelenie alebo ručné prepisovanie vás najviac brzdí. Stretneme sa na 30 minút online alebo osobne v Košiciach a Prešove.
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-[#d4d4cc] pt-6">
                <div>
                  <dt className="font-mono-code text-[11px] uppercase text-[#7a7d6e]">Stretnutie</dt>
                  <dd className="mt-1 text-base font-medium text-[#141413]">30 minút</dd>
                </div>
                <div>
                  <dt className="font-mono-code text-[11px] uppercase text-[#7a7d6e]">Pilot</dt>
                  <dd className="mt-1 text-base font-medium text-[#141413]">14 dní</dd>
                </div>
                <div>
                  <dt className="font-mono-code text-[11px] uppercase text-[#7a7d6e]">Región</dt>
                  <dd className="mt-1 text-base font-medium text-[#141413]">KE · PO</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-12 bg-[#eaeae4]/50">
              <AuditForm />
            </div>
          </div>
        </section>
      </main>

      {/* Matte Charcoal Footer (like momentic.ai) */}
      <footer id="contact" className="bg-[#161615] text-white">
        <div className="mx-auto max-w-[1440px] grid md:grid-cols-12 border-b border-white/10">
          <div className="md:col-span-4 p-6 sm:p-10 md:border-r border-white/10" />
          <div className="md:col-span-8 p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-mono-code text-xs uppercase tracking-wider text-white/50">
                Riešenia
              </h3>
              <ul className="space-y-2.5 text-white/85">
                <li><a href="#workbench" className="hover:text-[#87f700]">3D ukážka tokov</a></li>
                <li><a href="#postup" className="hover:text-[#87f700]">Postup implementácie</a></li>
                <li><a href="#vysledky" className="hover:text-[#87f700]">Príklady nasadenia</a></li>
                <li><a href="#audit" className="hover:text-[#87f700]">Audit procesov</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono-code text-xs uppercase tracking-wider text-white/50">
                Právne
              </h3>
              <ul className="space-y-2.5 text-white/85">
                <li><Link href="/privacy" className="hover:text-[#87f700]">Ochrana údajov</Link></li>
                <li><Link href="/terms" className="hover:text-[#87f700]">Podmienky spolupráce</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono-code text-xs uppercase tracking-wider text-white/50">
                Kontakt
              </h3>
              <ul className="space-y-2.5 text-white/85">
                <li>Košice · Prešov</li>
                <li><a href="mailto:ahoj@eastflow.example" className="hover:text-[#87f700]">ahoj@eastflow.sk</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] grid md:grid-cols-12">
          <div className="md:col-span-4 p-6 sm:p-10 md:border-r border-white/10 flex items-end">
            <span className="font-mono-code text-xs uppercase tracking-wider text-white/50">
              &copy; 2026 EASTFLOW AI
            </span>
          </div>
          <div className="md:col-span-8 p-6 sm:p-10 space-y-6">
            <p className="text-sm text-white/55">
              Implementácia AI pre firmy na východnom Slovensku
            </p>
            <div className="flex items-center gap-4 text-white">
              <svg width="56" height="56" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
                <rect x="3" y="3" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="10" y="10" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-5xl sm:text-7xl lg:text-[84px] font-medium tracking-[-0.04em] leading-none">
                eastflow
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
