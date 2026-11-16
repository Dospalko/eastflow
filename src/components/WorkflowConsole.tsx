'use client';

import { useState } from 'react';

interface WorkflowCase {
  id: string;
  tab: string;
  inputLabel: string;
  inputPreview: string[];
  steps: { label: string; detail: string; ms: string }[];
  outputTitle: string;
  outputLines: string[];
  actionLabel: string;
  approvedText: string;
}

const CASES: WorkflowCase[] = [
  {
    id: 'erp',
    tab: 'Dodací list → ERP',
    inputLabel: 'Vstup: PDF sken zo skladu (dodaci_list_408.pdf)',
    inputPreview: [
      'Dodávateľ: KovoStroj Košice s.r.o. · IČO 31577890',
      '1. Jakel uzavretý 60x40x3 S235JR — 240 m — 4,85 €/m',
      '2. Plech valcovaný 4 mm 1000x2000 — 18 ks — 62,40 €/ks',
    ],
    steps: [
      { label: 'VLM extrakcia položiek', detail: '2 riadky · zhoda sumy 2 287,20 €', ms: '420 ms' },
      { label: 'Párovanie skladových kariet', detail: 'SKL-JAK-60403 (99,4 %) · SKL-PL4-1000 (98,8 %)', ms: '115 ms' },
      { label: 'Kontrola oproti objednávke', detail: 'OBJ-2026-118 sedí bez odchýlky', ms: '48 ms' },
    ],
    outputTitle: 'Pripravená príjemka pre Stormware Pohoda (mServer XML)',
    outputLines: [
      '<pri:prijemkaItem><pri:code>SKL-JAK-60403</pri:code><pri:quantity>240</pri:quantity></pri:prijemkaItem>',
      '<pri:prijemkaItem><pri:code>SKL-PL4-1000</pri:code><pri:quantity>18</pri:quantity></pri:prijemkaItem>',
    ],
    actionLabel: 'Schváliť zápis do ERP',
    approvedText: 'Príjemka #PRJ-2026-408 zapísaná do Pohody.',
  },
  {
    id: 'crm',
    tab: 'Dopyt e-mailom → CRM',
    inputLabel: 'Vstup: Prichádzajúci e-mail na obchod@firma.sk',
    inputPreview: [
      'Od: m.kovac@strojarne-presov.example',
      'Predmet: Cenová ponuka na 40 ks zváraných rámov do 12. decembra',
      'Príloha: vykres_ram_v3.pdf (1,4 MB)',
    ],
    steps: [
      { label: 'Klasifikácia dopytu', detail: 'Výroba · priorita vysoká · termín 12. 12.', ms: '190 ms' },
      { label: 'Kontrola histórie klienta', detail: 'Strojárne Prešov · 3 predchádzajúce zákazky', ms: '62 ms' },
      { label: 'Návrh kalkulácie a odpovede', detail: 'Pripravený koncept e-mailu + úloha pre obchodníka', ms: '340 ms' },
    ],
    outputTitle: 'Nový obchodný prípad + koncept odpovede',
    outputLines: [
      'CRM #OPP-892: Strojárne Prešov · 40 ks · odhad 6 400 €',
      'Koncept: „Dobrý deň p. Kováč, termín 12. 12. vieme potvrdiť..."',
    ],
    actionLabel: 'Vytvoriť prípad v CRM',
    approvedText: 'Prípad #OPP-892 vytvorený, koncept čaká v pošte obchodníka.',
  },
  {
    id: 'sop',
    tab: 'Interný asistent',
    inputLabel: 'Otázka technika v prevádzke (lokálny server EÚ)',
    inputPreview: [
      '„Aký je postup pri reklamácii zvarového spoja pre nemeckého odberateľa nad 2 000 €?“',
    ],
    steps: [
      { label: 'Hybridné vyhľadávanie v smerniciach', detail: 'Smernica kvality QMS-04 · kap. 6.2', ms: '54 ms' },
      { label: 'Overenie oprávnení používateľa', detail: 'Rola: Vedúci kvality · dáta v rámci firemnej LAN', ms: '12 ms' },
    ],
    outputTitle: 'Odpoveď s presnou citáciou interného dokumentu',
    outputLines: [
      '1. Zastaviť šaržu v karanténe a založiť 8D protokol do 24 hodín.',
      '2. Nad 2 000 € vyžaduje podpis vedúceho výroby (QMS-04, str. 14).',
    ],
    actionLabel: 'Otvoriť 8D šablónu',
    approvedText: 'Predvyplnený 8D protokol otvorený pre šaržu #SZ-114.',
  },
];

export function WorkflowConsole() {
  const [activeId, setActiveId] = useState<string>('erp');
  const [approvedIds, setApprovedIds] = useState<Record<string, boolean>>({});
  const [running, setRunning] = useState(false);

  const current = CASES.find((c) => c.id === activeId) ?? CASES[0];
  const isApproved = Boolean(approvedIds[current.id]);

  function handleSelect(id: string) {
    setActiveId(id);
    setRunning(true);
    setTimeout(() => setRunning(false), 260);
  }

  function handleApprove() {
    setApprovedIds((prev) => ({ ...prev, [current.id]: true }));
  }

  return (
    <div className="rounded-lg border border-white/15 bg-[#0d0d0d] overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#121214] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#93f1f7]" aria-hidden="true" />
          <span className="font-mono-code text-xs text-white/75">eastflow-runtime · on-premise</span>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Ukážky procesov">
          {CASES.map((item) => {
            const selected = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => handleSelect(item.id)}
                className={`rounded px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  selected
                    ? 'bg-[#93f1f7] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="rounded border border-white/10 bg-black/60 p-3.5">
          <p className="font-mono-code text-xs text-[#93f1f7] mb-2">{current.inputLabel}</p>
          <div className="space-y-1 font-mono-code text-xs text-white/80 leading-relaxed">
            {current.inputPreview.map((line) => (
              <div key={line} className="truncate">{line}</div>
            ))}
          </div>
        </div>

        <div className="space-y-2" aria-live="polite">
          {current.steps.map((step, idx) => (
            <div
              key={step.label}
              className={`flex items-center justify-between gap-3 rounded border border-white/10 bg-[#131316] px-3.5 py-2.5 transition-opacity duration-200 ${
                running ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="font-mono-code text-xs text-[#93f1f7]">0{idx + 1}</span>
                  <span>{step.label}</span>
                </div>
                <p className="text-xs text-white/60 truncate mt-0.5">{step.detail}</p>
              </div>
              <span className="font-mono-code text-xs text-white/50 shrink-0">{step.ms}</span>
            </div>
          ))}
        </div>

        <div className="rounded border border-white/10 bg-black/70 p-3.5">
          <p className="text-xs font-medium text-white/85 mb-2">{current.outputTitle}</p>
          <div className="space-y-1 font-mono-code text-[11px] text-[#93f1f7]/90 overflow-x-auto">
            {current.outputLines.map((line) => (
              <div key={line} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-xs text-white/55">
            {isApproved ? current.approvedText : 'Čaká na potvrdenie človekom pred zápisom'}
          </span>
          <button
            type="button"
            onClick={handleApprove}
            disabled={isApproved}
            className={`rounded px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
              isApproved
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-[#93f1f7] text-black hover:opacity-90'
            }`}
          >
            {isApproved ? 'Schválené' : current.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
