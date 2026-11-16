'use client';

import { useState } from 'react';

interface ProcessStep {
  code: string;
  duration: string;
  title: string;
  summary: string;
  deliverables: string[];
  outcomeLabel: string;
  outcomeValue: string;
}

const STEPS: ProcessStep[] = [
  {
    code: '01',
    duration: '5 dní',
    title: 'Rozhovory s ľuďmi v prevádzke',
    summary:
      'Prídeme priamo do vašej firmy v Košiciach či Prešove. Sadneme si s ľuďmi v sklade, obchode aj účtarni a zmeriame, kde sa stráca najviac hodín.',
    deliverables: [
      'Osobné rozhovory s 5 až 12 kľúčovými pracovníkmi',
      'Zoznam úzkych miest zoradený podľa ušetrených hodín',
      'Presný rozsah 14-dňového pilota pred začiatkom programovania',
    ],
    outcomeLabel: 'Výstup auditu',
    outcomeValue: 'Mapa procesov a odhad úspory hodín',
  },
  {
    code: '02',
    duration: '14 dní',
    title: 'Integrácia do ERP, CRM a pošty',
    summary:
      'Nevytvárame ďalší samostatný chat. Napojíme AI priamo na systémy, ktoré už používate, s povinným schválením človekom pred zápisom.',
    deliverables: [
      'Priame prepojenie na Pohoda, Kros, SAP alebo firemnú databázu',
      'Overenie presnosti na vašich reálnych dokladoch a e-mailoch',
      'Prehľadný záznam každého kroku pre spätnú kontrolu',
    ],
    outcomeLabel: 'Výstup pilota',
    outcomeValue: 'Funkčný proces nasadený v prevádzke',
  },
  {
    code: '03',
    duration: 'Dlhodobo',
    title: 'Nasadenie na váš server a školenie',
    summary:
      'Riešenie beží u vás alebo na vyhradenom serveri v EÚ. Váš tím zaškolíme tak, aby ho vedel samostatne používať každý deň.',
    deliverables: [
      'Firemné dáta neodchádzajú na tréning cudzích modelov',
      'Praktické workshopy pre operátorov, obchod aj vedenie',
      'Dokumentácia, priebežná údržba a kontrola nákladov',
    ],
    outcomeLabel: 'Výstup odovzdania',
    outcomeValue: 'Zaškolený tím a plná kontrola nad systémom',
  },
];

export function ProcessShowcase() {
  const [selected, setSelected] = useState(0);
  const current = STEPS[selected];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Kroky spolupráce">
        {STEPS.map((step, index) => {
          const active = index === selected;
          return (
            <button
              key={step.code}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(index)}
              className={`w-full text-left rounded-xl border p-5 transition-all cursor-pointer ${
                active
                  ? 'border-[#0f5257] bg-white shadow-[0_12px_28px_-20px_rgba(15,82,87,0.35)]'
                  : 'border-[#e5e5e0] bg-[#f3f3ef]/60 hover:bg-white hover:border-[#cfcfc8]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono-code text-xs font-medium text-[#0f5257]">
                  Krok {step.code}
                </span>
                <span className="font-mono-code text-xs text-[#5f6066]">{step.duration}</span>
              </div>
              <h3 className="text-lg font-medium text-[#141416]">{step.title}</h3>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-7 card-3d p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e5e0] pb-5">
          <div>
            <span className="font-mono-code text-xs font-medium text-[#0f5257]">
              Fáza {current.code} · {current.duration}
            </span>
            <h3 className="text-2xl font-medium text-[#141416] mt-1">{current.title}</h3>
          </div>
          <span className="rounded-md bg-[#f3f3ef] px-3 py-1.5 text-xs font-medium text-[#141416]">
            {current.duration}
          </span>
        </div>

        <p className="text-base text-[#5f6066] leading-relaxed">{current.summary}</p>

        <ul className="space-y-3 pt-1">
          {current.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#141416]">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0f5257] shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-[#e5e5e0] bg-[#f3f3ef] px-4 py-3.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-[#5f6066]">{current.outcomeLabel}</span>
          <span className="text-sm font-medium text-[#141416]">{current.outcomeValue}</span>
        </div>
      </div>
    </div>
  );
}
