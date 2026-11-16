'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlowMode {
  id: string;
  label: string;
  caption: string;
  speed: number;
  coreColor: number;
}

const MODES: FlowMode[] = [
  {
    id: 'erp',
    label: 'Doklady → ERP',
    caption: 'PDF dodacie listy a faktúry priamo do Pohody alebo Krosu',
    speed: 0.0065,
    coreColor: 0x0f5257,
  },
  {
    id: 'crm',
    label: 'Dopyty → CRM',
    caption: 'Automatické triedenie e-mailov a návrh cenovej ponuky',
    speed: 0.009,
    coreColor: 0x166970,
  },
  {
    id: 'sop',
    label: 'Interné dáta',
    caption: 'Súkromné vyhľadávanie nad smernicami na vašom serveri',
    speed: 0.005,
    coreColor: 0x1d4e5f,
  },
];

export function Process3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modeId, setModeId] = useState<string>('erp');
  const speedRef = useRef<number>(MODES[0].speed);
  const coreMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  const currentMode = MODES.find((m) => m.id === modeId) ?? MODES[0];

  useEffect(() => {
    speedRef.current = currentMode.speed;
    if (coreMatRef.current) {
      coreMatRef.current.color.setHex(currentMode.coreColor);
    }
  }, [currentMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f3ef);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 8.2);
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

    // Clean studio lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd7ecee, 0.7);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Shared materials
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xd4d4cc,
      transparent: true,
      opacity: 0.9,
    });
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f5257,
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    });
    coreMatRef.current = coreMat;

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0f5257,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.28,
    });

    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x0f5257 });
    const curveMat = new THREE.LineBasicMaterial({
      color: 0xc5c5bc,
      transparent: true,
      opacity: 0.85,
    });

    const disposables: { dispose: () => void }[] = [
      whiteMat,
      edgeMat,
      coreMat,
      ringMat,
      pulseMat,
      curveMat,
    ];

    // Left input blocks (3 document/email sources)
    const inputGeo = new THREE.BoxGeometry(0.95, 0.62, 0.24);
    const inputEdgeGeo = new THREE.EdgesGeometry(inputGeo);
    disposables.push(inputGeo, inputEdgeGeo);

    const inputPositions = [
      new THREE.Vector3(-2.7, 1.05, -0.2),
      new THREE.Vector3(-2.85, 0, 0.15),
      new THREE.Vector3(-2.7, -1.05, -0.2),
    ];

    const inputMeshes: THREE.Group[] = inputPositions.map((pos, i) => {
      const g = new THREE.Group();
      const box = new THREE.Mesh(inputGeo, whiteMat);
      const wire = new THREE.LineSegments(inputEdgeGeo, edgeMat);
      g.add(box, wire);
      g.position.copy(pos);
      g.rotation.set(0.15, 0.35, i === 1 ? 0 : i === 0 ? -0.06 : 0.06);
      rootGroup.add(g);
      return g;
    });

    // Center AI Core (icosahedron + orbital ring)
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(0.88, 0);
    const coreWireGeo = new THREE.IcosahedronGeometry(1.06, 0);
    const coreWireEdges = new THREE.EdgesGeometry(coreWireGeo);
    const ringGeo = new THREE.TorusGeometry(1.38, 0.018, 12, 64);
    disposables.push(coreGeo, coreWireGeo, coreWireEdges, ringGeo);

    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    const coreWire = new THREE.LineSegments(
      coreWireEdges,
      new THREE.LineBasicMaterial({ color: 0x0f5257, transparent: true, opacity: 0.35 })
    );
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.4;
    orbitRing.rotation.y = 0.25;

    coreGroup.add(coreMesh, coreWire, orbitRing);
    rootGroup.add(coreGroup);

    // Right output blocks (ERP + CRM)
    const outGeo = new THREE.BoxGeometry(1.15, 0.82, 0.34);
    const outEdgeGeo = new THREE.EdgesGeometry(outGeo);
    disposables.push(outGeo, outEdgeGeo);

    const outputPositions = [
      new THREE.Vector3(2.7, 0.72, 0),
      new THREE.Vector3(2.7, -0.72, 0),
    ];

    const outputMeshes: THREE.Group[] = outputPositions.map((pos) => {
      const g = new THREE.Group();
      const box = new THREE.Mesh(outGeo, whiteMat);
      const wire = new THREE.LineSegments(outEdgeGeo, edgeMat);
      g.add(box, wire);
      g.position.copy(pos);
      g.rotation.set(0.12, -0.38, 0);
      rootGroup.add(g);
      return g;
    });

    // Curved data paths + animated spheres
    const curves: THREE.QuadraticBezierCurve3[] = [
      new THREE.QuadraticBezierCurve3(inputPositions[0], new THREE.Vector3(-1.3, 0.9, 0.3), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(inputPositions[1], new THREE.Vector3(-1.3, 0.1, 0.4), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(inputPositions[2], new THREE.Vector3(-1.3, -0.9, 0.3), new THREE.Vector3(0, 0, 0)),
      new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.3, 0.65, 0.3), outputPositions[0]),
      new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.3, -0.65, 0.3), outputPositions[1]),
    ];

    const pulseGeo = new THREE.SphereGeometry(0.065, 16, 16);
    disposables.push(pulseGeo);

    const pulses = curves.map((curve, idx) => {
      const pts = curve.getPoints(32);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      disposables.push(lineGeo);
      const line = new THREE.Line(lineGeo, curveMat);
      rootGroup.add(line);

      const sphere = new THREE.Mesh(pulseGeo, pulseMat);
      rootGroup.add(sphere);
      return { curve, sphere, progress: (idx * 0.21) % 1 };
    });

    // Subtle pointer parallax
    let targetRx = 0;
    let targetRy = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRy = nx * 0.16;
      targetRx = ny * 0.1;
    };
    const onPointerLeave = () => {
      targetRx = 0;
      targetRy = 0;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);

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
        coreMesh.rotation.y += 0.0055;
        coreMesh.rotation.x += 0.0025;
        coreWire.rotation.y -= 0.003;
        orbitRing.rotation.z += 0.004;

        inputMeshes.forEach((m, i) => {
          m.position.y = inputPositions[i].y + Math.sin(t * 1.4 + i * 1.1) * 0.07;
        });
        outputMeshes.forEach((m, i) => {
          m.position.y = outputPositions[i].y + Math.cos(t * 1.3 + i * 1.4) * 0.06;
        });

        pulses.forEach((p) => {
          p.progress = (p.progress + speedRef.current) % 1;
          p.curve.getPoint(p.progress, p.sphere.position);
        });
      }

      rootGroup.rotation.y += (targetRy - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetRx - rootGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="rounded-2xl border border-[#e5e5e0] bg-[#f3f3ef] overflow-hidden shadow-[0_20px_50px_-28px_rgba(20,20,22,0.16)]">
      <div
        ref={containerRef}
        className="h-[340px] sm:h-[400px] w-full cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Interaktívna 3D vizualizácia prepojenia firemných dokladov cez AI jadro do ERP a CRM"
      />
      <div className="border-t border-[#e5e5e0] bg-white px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Režim 3D toku dát">
          {MODES.map((m) => {
            const active = m.id === modeId;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setModeId(m.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0f5257] text-white'
                    : 'bg-[#f3f3ef] text-[#5f6066] hover:text-[#141416] hover:bg-[#e8e8e2]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-[#5f6066]">{currentMode.caption}</p>
      </div>
    </div>
  );
}
