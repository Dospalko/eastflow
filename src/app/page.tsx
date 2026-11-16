import Link from 'next/link';
import { Process3DScene } from '@/components/Process3DScene';
import { ProcessShowcase } from '@/components/ProcessShowcase';
import { AuditForm } from '@/components/AuditForm';

interface ServiceCard {
  title: string;
  duration: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Audit firemných procesov',
    duration: '5 dní',
    description:
      'Sadneme si s obchodníkmi, skladníkmi aj účtovníkmi. Zmapujeme opakovanú prácu a vyberieme procesy s najrýchlejšou návratnosťou.',
    metricLabel: 'Typická úspora',
    metricValue: '6 až 15 hodín týždenne na tím',
  },
  {
    title: 'Doklady a faktúry do ERP',
    duration: '14 dní',
    description:
      'Automatické vyčítanie dodacích listov, objednávok a e-mailov s kontrolou cien, IČO a skladových kariet pre Pohodu, Kros či SAP.',
    metricLabel: 'Kontrola kvality',
    metricValue: 'Schválenie človekom pri odchýlke',
  },
  {
    title: 'Interný firemný asistent',
    duration: '14 dní',
    description:
      'Okamžité vyhľadávanie a príprava odpovedí nad vašimi smernicami, technickými listami a históriou zákaziek bez úniku dát.',
    metricLabel: 'Prevádzka dát',
    metricValue: 'Váš server alebo dedikovaný EÚ cloud',
  },
  {
    title: 'Zaškolenie a odovzdanie tímu',
    duration: 'V cene',
    description:
      'Praktické workshopy priamo u vás vo firme, aby zamestnanci nové nástroje denne používali s istotou a bez odporu.',
    metricLabel: 'Podpora',
    metricValue: 'Dokumentácia a servisná linka',
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#top">
        Preskočiť na obsah
      </a>

      <header className="sticky top-0 z-50 border-b border-[#e5e5e0] bg-[#fbfbfa]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-6 sm:px-10">
          <Link href="#top" className="flex items-center gap-2.5 text-lg font-medium tracking-tight text-[#141416]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0f5257] font-mono-code text-xs font-semibold text-white">
              E
            </span>
            <span>EastFlow AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5f6066]" aria-label="Hlavná navigácia">
            <a href="#services" className="hover:text-[#141416] transition-colors">
              Služby
            </a>
            <a href="#process" className="hover:text-[#141416] transition-colors">
              Postup
            </a>
            <a href="#audit" className="hover:text-[#141416] transition-colors">
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
        <section className="border-b border-[#e5e5e0] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e0] bg-white px-3.5 py-1 text-xs font-medium text-[#0f5257]">
                Košice · Prešov · Východné Slovensko
              </p>

              <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.06] text-[#141416]">
                Implementácia AI do firemných procesov
              </h1>

              <p className="text-base sm:text-lg text-[#5f6066] leading-relaxed">
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

              <dl className="grid grid-cols-3 gap-4 border-t border-[#e5e5e0] pt-6">
                <div>
                  <dt className="text-xs text-[#5f6066]">Prvý pilot</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-[#141416]">14 dní</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5f6066]">Spolupráca</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-[#141416]">Osobne vo firme</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5f6066]">Prevádzka</dt>
                  <dd className="mt-1 font-mono-code text-sm font-medium text-[#141416]">On-premise / EÚ</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <Process3DScene />
            </div>
          </div>
        </section>

        {/* Služby */}
        <section id="services" aria-labelledby="services-heading" className="border-b border-[#e5e5e0] py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="max-w-2xl mb-12">
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#141416]">
                Služby implementácie AI.{' '}
                <span className="text-[#5f6066]">Čisté napojenie na softvér, ktorý už vo firme používate.</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SERVICES.map((service) => (
                <article key={service.title} className="card-3d p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-xl font-medium text-[#141416]">{service.title}</h3>
                      <span className="rounded-md bg-[#f3f3ef] px-2.5 py-1 font-mono-code text-xs font-medium text-[#0f5257]">
                        {service.duration}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#5f6066] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-[#e5e5e0] pt-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="text-[#5f6066]">{service.metricLabel}</span>
                    <span className="font-medium text-[#141416]">{service.metricValue}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Postup implementácie */}
        <section id="process" aria-labelledby="process-heading" className="border-b border-[#e5e5e0] py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="max-w-2xl mb-12">
              <h2 id="process-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#141416]">
                Postup implementácie vo firme
              </h2>
              <p className="mt-3 text-base text-[#5f6066]">
                Vyberte si krok spolupráce a pozrite si, čo presne odovzdávame.
              </p>
            </div>
            <ProcessShowcase />
          </div>
        </section>

        {/* Audit formulár */}
        <section id="audit" aria-labelledby="audit-heading" className="border-b border-[#e5e5e0] bg-[#f3f3ef] py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 space-y-6">
              <h2 id="audit-heading" className="text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-[#141416]">
                Objednať audit procesov
              </h2>
              <p className="text-base sm:text-lg text-[#5f6066] leading-relaxed">
                Napíšte nám, ktoré oddelenie alebo ručné prepisovanie vás najviac brzdí. Stretneme sa na 30 minút online alebo osobne v Košiciach a okolí.
              </p>
              <ul className="divide-y divide-[#e5e5e0] border-t border-b border-[#e5e5e0] text-sm">
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-[#141416]">Úvodný rozhovor s vývojármi</span>
                  <span className="font-mono-code font-medium text-[#0f5257]">30 minút</span>
                </li>
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-[#141416]">Prvý funkčný prototyp na vašich dátach</span>
                  <span className="font-mono-code font-medium text-[#0f5257]">Do 14 dní</span>
                </li>
                <li className="flex items-center justify-between py-3.5">
                  <span className="text-[#141416]">Umiestnenie systému</span>
                  <span className="font-mono-code font-medium text-[#0f5257]">Váš server / EÚ</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <AuditForm />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#fbfbfa] py-14">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-12 pb-10 border-b border-[#e5e5e0]">
            <div className="sm:col-span-6 space-y-3">
              <Link href="#top" className="flex items-center gap-2.5 text-lg font-medium text-[#141416]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0f5257] font-mono-code text-xs font-semibold text-white">
                  E
                </span>
                <span>EastFlow AI</span>
              </Link>
              <p className="max-w-sm text-sm text-[#5f6066] leading-relaxed">
                Vývojári pre východné Slovensko, ktorí sa rozprávajú s ľuďmi vo firmách a zrýchľujú procesy cez AI.
              </p>
            </div>
            <div className="sm:col-span-3 space-y-2.5 text-sm">
              <h3 className="font-medium text-[#141416]">Navigácia</h3>
              <ul className="space-y-2 text-[#5f6066]">
                <li><a href="#services" className="hover:text-[#141416]">Služby</a></li>
                <li><a href="#process" className="hover:text-[#141416]">Postup implementácie</a></li>
                <li><a href="#audit" className="hover:text-[#141416]">Audit procesov</a></li>
              </ul>
            </div>
            <div className="sm:col-span-3 space-y-2.5 text-sm">
              <h3 className="font-medium text-[#141416]">Región &amp; Kontakt</h3>
              <ul className="space-y-2 text-[#5f6066]">
                <li>Košice · Prešov · Východné Slovensko</li>
                <li><a href="mailto:ahoj@eastflow.example" className="hover:text-[#141416]">Napísať vývojárom</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-[#5f6066]">
            <span>&copy; 2026 EastFlow AI</span>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-[#141416]">Ochrana údajov</Link>
              <Link href="/terms" className="hover:text-[#141416]">Podmienky</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
