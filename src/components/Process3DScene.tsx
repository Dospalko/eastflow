'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Scenario {
  id: string;
  code: string;
  name: string;
  tag: string;
  sourceDoc: string;
  extractedFields: { k: string; v: string; status: string }[];
  resultNote: string;
  speed: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'erp',
    code: 'FLOW-01',
    name: 'Dodací list → Pohoda XML',
    tag: 'SKLAD A LOGISTIKA',
    sourceDoc: 'dodaci_list_kovostroj_408.pdf',
    extractedFields: [
      { k: 'Dodávateľ IČO', v: '31577890 (KovoStroj Košice)', status: 'OVERENÉ' },
      { k: 'Položka 1', v: 'Jakel 60x40x3 S235JR · 240 m → SKL-JAK-60403', status: '99.4 %' },
      { k: 'Položka 2', v: 'Plech 4 mm 1000x2000 · 18 ks → SKL-PL4-1000', status: '98.9 %' },
      { k: 'Kontrola sumy', v: '2 287,20 € (zhoda s OBJ-2026-118)', status: 'PASS' },
    ],
    resultNote: 'Príjemka pripravená na zápis do ERP po 1-klikovom schválení skladníkom.',
    speed: 0.007,
  },
  {
    id: 'crm',
    code: 'FLOW-02',
    name: 'Zákaznícky dopyt → CRM a ponuka',
    tag: 'OBCHOD A CENOTVORBA',
    sourceDoc: 'email_strojarne_presov.eml + vykres.pdf',
    extractedFields: [
      { k: 'Klient', v: 'Strojárne Prešov (3 predchádzajúce zákazky)', status: 'HISTÓRIA' },
      { k: 'Dopyt', v: '40 ks zváraných rámov · termín 12. 12.', status: 'EXTRAHOVANÉ' },
      { k: 'Odhad kapacity', v: 'Hala 2 voľná · materiál na sklade', status: 'OVERENÉ' },
      { k: 'Návrh ponuky', v: '6 400 € bez DPH · koncept odpovede v pošte', status: 'PRIPRAVENÉ' },
    ],
    resultNote: 'Obchodník len skontroluje vypočítanú maržu a odošle hotovú ponuku.',
    speed: 0.0095,
  },
  {
    id: 'sop',
    code: 'FLOW-03',
    name: 'Smernice a reklamácie → 8D protokol',
    tag: 'KVALITA A VÝROBA',
    sourceDoc: 'Smernica_QMS_04.pdf + reklamacia_114.msg',
    extractedFields: [
      { k: 'Klasifikácia', v: 'Odchýlka zvarového spoja · reklamácia > 2 000 €', status: 'KRITICKÉ' },
      { k: 'Smernica', v: 'QMS-04 kap. 6.2 (str. 14) · karanténa šarže', status: 'CITOVANÉ' },
      { k: 'Zodpovedný', v: 'Vedúci kvality · vyžaduje podpis do 24 h', status: 'PRIRADENÉ' },
      { k: 'Výstup', v: 'Predvyplnený 8D report #SZ-114', status: 'VYGENEROVANÉ' },
    ],
    resultNote: 'Beží výhradne na vašom internom serveri bez odosielania dát mimo firmu.',
    speed: 0.0055,
  },
];

export function Process3DScene() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>('erp');
  const speedRef = useRef<number>(SCENARIOS[0].speed);

  const current = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  useEffect(() => {
    speedRef.current = current.speed;
  }, [current]);

  useEffect(() => {
    const container = canvasHostRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161615);

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 7.6);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Architectural wireframe + lime node materials (matching momentic's isometric wireframe look)
    const darkBoxMat = new THREE.MeshStandardMaterial({
      color: 0x222220,
      roughness: 0.4,
      metalness: 0.1,
    });
    const wireGrayMat = new THREE.LineBasicMaterial({
      color: 0x52524c,
      transparent: true,
      opacity: 0.9,
    });
    const wireLimeMat = new THREE.LineBasicMaterial({
      color: 0x87f700,
      transparent: true,
      opacity: 0.95,
    });
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1d1d1b,
      roughness: 0.3,
      metalness: 0.2,
    });
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x87f700 });

    const disposables: { dispose: () => void }[] = [
      darkBoxMat,
      wireGrayMat,
      wireLimeMat,
      coreMat,
      pulseMat,
    ];

    // Isometric grid floor
    const gridHelper = new THREE.GridHelper(6.4, 12, 0x33332f, 0x262623);
    gridHelper.position.y = -1.35;
    rootGroup.add(gridHelper);

    // Input nodes (left)
    const nodeGeo = new THREE.BoxGeometry(0.85, 0.52, 0.28);
    const nodeEdges = new THREE.EdgesGeometry(nodeGeo);
    disposables.push(nodeGeo, nodeEdges);

    const inputPositions = [
      new THREE.Vector3(-2.2, 0.85, 0),
      new THREE.Vector3(-2.35, 0.0, 0.2),
      new THREE.Vector3(-2.2, -0.85, 0),
    ];

    const inputNodes = inputPositions.map((pos) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(nodeGeo, darkBoxMat));
      g.add(new THREE.LineSegments(nodeEdges, wireGrayMat));
      g.position.copy(pos);
      g.rotation.set(0.18, 0.42, 0);
      rootGroup.add(g);
      return g;
    });

    // Center AI Verification & Routing Core
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.OctahedronGeometry(0.82, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const outerCubeGeo = new THREE.BoxGeometry(1.32, 1.32, 1.32);
    const outerCubeEdges = new THREE.EdgesGeometry(outerCubeGeo);
    disposables.push(coreGeo, coreEdges, outerCubeGeo, outerCubeEdges);

    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    const coreWire = new THREE.LineSegments(coreEdges, wireLimeMat);
    const outerWire = new THREE.LineSegments(outerCubeEdges, wireGrayMat);
    coreGroup.add(coreMesh, coreWire, outerWire);
    rootGroup.add(coreGroup);

    // Output nodes (right)
    const outputPositions = [
      new THREE.Vector3(2.25, 0.58, 0),
      new THREE.Vector3(2.25, -0.58, 0),
    ];

    const outputNodes = outputPositions.map((pos) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(nodeGeo, darkBoxMat));
      g.add(new THREE.LineSegments(nodeEdges, wireLimeMat));
      g.position.copy(pos);
      g.rotation.set(0.18, -0.42, 0);
      rootGroup.add(g);
      return g;
    });

    // Curves + lime data pulses
    const curves = [
      new THREE.QuadraticBezierCurve3(inputPositions[0], new THREE.Vector3(-1.1, 0.75, 0.25), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(inputPositions[1], new THREE.Vector3(-1.1, 0.05, 0.35), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(inputPositions[2], new THREE.Vector3(-1.1, -0.75, 0.25), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.15, 0.55, 0.25), outputPositions[0]),
      new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.15, -0.55, 0.25), outputPositions[1]),
    ];

    const sphereGeo = new THREE.SphereGeometry(0.06, 12, 12);
    disposables.push(sphereGeo);

    const pulses = curves.map((curve, idx) => {
      const pts = curve.getPoints(28);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      disposables.push(lineGeo);
      rootGroup.add(new THREE.Line(lineGeo, wireGrayMat));

      const dot = new THREE.Mesh(sphereGeo, pulseMat);
      rootGroup.add(dot);
      return { curve, dot, progress: (idx * 0.22) % 1 };
    });

    let targetRx = 0.08;
    let targetRy = -0.18;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRy = -0.18 + nx * 0.22;
      targetRx = 0.08 + ny * 0.12;
    };

    container.addEventListener('pointermove', onPointerMove);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    let frameId = 0;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!reducedMotion) {
        t += 0.016;
        coreMesh.rotation.y += 0.008;
        coreWire.rotation.y += 0.008;
        outerWire.rotation.y -= 0.004;
        outerWire.rotation.x += 0.002;

        inputNodes.forEach((n, i) => {
          n.position.y = inputPositions[i].y + Math.sin(t * 1.5 + i) * 0.05;
        });
        outputNodes.forEach((n, i) => {
          n.position.y = outputPositions[i].y + Math.cos(t * 1.4 + i) * 0.05;
        });

        pulses.forEach((p) => {
          p.progress = (p.progress + speedRef.current) % 1;
          p.curve.getPoint(p.progress, p.dot.position);
        });
      }

      rootGroup.rotation.y += (targetRy - rootGroup.rotation.y) * 0.07;
      rootGroup.rotation.x += (targetRx - rootGroup.rotation.x) * 0.07;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="rounded-xl bg-[#eaeae4] p-3 sm:p-5 border border-[#d4d4cc]">
      <div className="rounded-lg border border-[#d4d4cc] bg-white overflow-hidden grid lg:grid-cols-12">
        {/* Column 1: Flow selector tree */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#d4d4cc] bg-[#fafaf7] p-4 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#5c5d56]">
                Firemné toky
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono-code text-[11px] text-[#141413]">
                <span className="h-2 w-2 rounded-full bg-[#87f700]" aria-hidden="true" />
                LIVE
              </span>
            </div>

            <div className="space-y-1.5" role="tablist" aria-label="Firemné automatizácie">
              {SCENARIOS.map((item) => {
                const selected = item.id === current.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left rounded-md px-3 py-2.5 transition-colors cursor-pointer border ${
                      selected
                        ? 'bg-white border-[#141413] text-[#141413]'
                        : 'bg-transparent border-transparent text-[#5c5d56] hover:bg-[#eaeae4]/60 hover:text-[#141413]'
                    }`}
                  >
                    <div className="font-mono-code text-[10px] tracking-wider uppercase text-[#7a7d6e]">
                      {item.code} · {item.tag}
                    </div>
                    <div className="text-xs sm:text-sm font-medium mt-0.5">{item.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded border border-[#d4d4cc] bg-[#f4f4f0] p-3">
            <div className="font-mono-code text-[10px] uppercase tracking-wider text-[#5c5d56]">
              Vstupný súbor
            </div>
            <div className="font-mono-code text-xs text-[#141413] mt-1 truncate">
              {current.sourceDoc}
            </div>
          </div>
        </div>

        {/* Column 2: Structured extraction & verification pane */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#d4d4cc] p-5 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e5e5e0]">
              <div>
                <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#7a7d6e]">
                  {current.tag}
                </span>
                <h3 className="text-base font-medium text-[#141413] mt-0.5">{current.name}</h3>
              </div>
              <span className="rounded bg-[#87f700] px-2 py-0.5 font-mono-code text-[11px] font-medium text-[#141413]">
                OVERENÉ
              </span>
            </div>

            <dl className="divide-y divide-[#ecece6] mt-2">
              {current.extractedFields.map((row) => (
                <div key={row.k} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <dt className="font-mono-code text-[11px] text-[#7a7d6e]">{row.k}</dt>
                    <dd className="text-[#141413] font-medium mt-0.5">{row.v}</dd>
                  </div>
                  <span className="rounded border border-[#d4d4cc] bg-[#f4f4f0] px-1.5 py-0.5 font-mono-code text-[10px] text-[#141413] shrink-0">
                    {row.status}
                  </span>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-xs text-[#5c5d56] border-t border-[#e5e5e0] pt-3">
            {current.resultNote}
          </p>
        </div>

        {/* Column 3: Interactive 3D Isometric Node Pipeline */}
        <div className="lg:col-span-4 bg-[#161615] flex flex-col justify-between">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-white/60">
              3D topológia procesu
            </span>
            <span className="font-mono-code text-[11px] text-[#87f700]">ON-PREMISE · EÚ</span>
          </div>
          <div
            ref={canvasHostRef}
            className="h-[280px] sm:h-[320px] w-full cursor-grab active:cursor-grabbing"
            role="img"
            aria-label="3D izometrická schéma prepojenia vstupov, AI jadra a firemného ERP"
          />
        </div>
      </div>
    </div>
  );
}
