'use client';

import { useState } from 'react';

interface ProcessStep {
  code: string;
  duration: string;
  title: string;
  summary: string;
  deliverables: string[];
  terminalTitle: string;
  terminalLines: string[];
}

const STEPS: ProcessStep[] = [
  {
    code: '01',
    duration: '5 dní',
    title: 'Rozhovory s ľuďmi v prevádzke',
    summary:
      'Prídeme priamo do vašej firmy v Košiciach či Prešove. Sadneme si s ľuďmi v sklade, obchode aj účtarni a zmeriame, kde sa stráca najviac hodín.',
    deliverables: [
      'Rozhovory s 5–12 kľúčovými pracovníkmi',
      'Zoznam úzkych miest zoradený podľa ušetrených hodín',
      'Pevný plán 14-dňového pilota pred začiatkom kódenia',
    ],
    terminalTitle: 'audit-report.json',
    terminalLines: [
      '{',
      '  "firma": "Strojársky podnik · Košice",',
      '  "bottleneck_1": "Ručný prepis dodacích listov do Pohody (11 h/týždeň)",',
      '  "bottleneck_2": "Triedenie dopytov a príprava ponúk (7 h/týždeň)",',
      '  "pilot_cieľ": "Znížiť ručný prepis o 80 % do 14 dní"',
      '}',
    ],
  },
  {
    code: '02',
    duration: '14 dní',
    title: 'Integrácia do ERP, CRM a pošty',
    summary:
      'Nevytvárame ďalší izolovaný chatbot. Napojíme AI priamo na systémy, ktoré už používate, s povinnou kontrolou človekom pred zápisom.',
    deliverables: [
      'Konektor na Pohoda / Kros / SAP alebo vlastnú databázu',
      'Automatické testy presnosti na vašich reálnych dokladoch',
      'Auditný log každého kroku pre kontrolu a súlad s EÚ AI Act',
    ],
    terminalTitle: 'erp-bridge.py · eval-gate',
    terminalLines: [
      '$ pytest tests/test_golden_invoices.py --strict',
      '✓ 30/30 dokladov: správne IČO a súčet položiek (100.0 %)',
      '✓ 29/30 dokladov: automatické párovanie SKU karty (96.7 %)',
      '✓ 1/30 dokladov: odchýlka ceny > 2 % → odoslané na schválenie',
      'STATUS: READY FOR PRODUCTION',
    ],
  },
  {
    code: '03',
    duration: 'Dlhodobo',
    title: 'Nasadenie na váš server a školenie',
    summary:
      'Riešenie beží u vás (On-Premise) alebo na vyhradenom serveri v EÚ. Váš tím zaškolíme tak, aby ho vedel samostatne používať aj rozvíjať.',
    deliverables: [
      'Dáta neodchádzajú mimo firmu ani na tréning cudzích modelov',
      'Praktické workshopy pre operátorov, obchod aj vedenie',
      'Dokumentácia, monitoring nákladov a servisná podpora',
    ],
    terminalTitle: 'deploy-check.sh',
    terminalLines: [
      '$ curl -s http://10.0.4.12:8080/health',
      '{"status":"ok","residency":"on-premise-sk","siem_logging":"active"}',
      '✓ Prístup len cez firemnú VPN / internú sieť',
      '✓ Tím zaškolený: 14 zamestnancov (obchod + sklad + účtáreň)',
    ],
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
              className={`w-full text-left rounded-lg border p-5 transition-colors cursor-pointer ${
                active
                  ? 'border-[#93f1f7]/60 bg-[#121215]'
                  : 'border-white/10 bg-[#0a0a0c] hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono-code text-xs text-[#93f1f7]">Krok {step.code}</span>
                <span className="font-mono-code text-xs text-white/55">{step.duration}</span>
              </div>
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{step.summary}</p>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-7 rounded-lg border border-white/15 bg-[#0d0d0d] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono-code text-xs text-[#93f1f7]">
              Fáza {current.code} · {current.duration}
            </span>
            <h3 className="text-xl font-medium text-white mt-1">{current.title}</h3>
          </div>
          <span className="rounded border border-white/15 px-2.5 py-1 font-mono-code text-xs text-white/70">
            {current.terminalTitle}
          </span>
        </div>

        <ul className="space-y-3">
          {current.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-white/85">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#93f1f7] shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-md border border-white/10 bg-black p-4 font-mono-code text-xs text-[#93f1f7]/90 overflow-x-auto leading-relaxed">
          {current.terminalLines.map((line) => (
            <div key={line} className="whitespace-pre">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
