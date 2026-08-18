'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Device-aware constants ──────────────────────────────────── */
const isMobile =
  typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));

const PARTICLE_COUNT    = isMobile ? 2500  : 8000;
const CONNECTION_SAMPLE = isMobile ? 0     : 200;
const CONNECTION_DIST   = 90;
const SPHERE_RADIUS     = 180;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef  = useRef<THREE.LineSegments>(null);

  /* ── particle positions + colors ── */
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const colorA = new THREE.Color('#4F8EF7');
    const colorB = new THREE.Color('#7C3AED');
    const colorC = new THREE.Color('#06B6D4');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = SPHERE_RADIUS * (0.6 + Math.random() * 0.4);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c =
        t < 0.5
          ? colorA.clone().lerp(colorB, t * 2)
          : colorB.clone().lerp(colorC, (t - 0.5) * 2);

      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  /* ── neural connection lines (desktop only) ── */
  const linePositions = useMemo(() => {
    if (CONNECTION_SAMPLE === 0) return new Float32Array(0);
    const pts: number[] = [];
    for (let i = 0; i < CONNECTION_SAMPLE; i++) {
      const ix = positions[i * 3], iy = positions[i * 3 + 1], iz = positions[i * 3 + 2];
      for (let j = i + 1; j < CONNECTION_SAMPLE; j++) {
        const jx = positions[j * 3], jy = positions[j * 3 + 1], jz = positions[j * 3 + 2];
        const d = Math.sqrt((ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2);
        if (d < CONNECTION_DIST) pts.push(ix, iy, iz, jx, jy, jz);
      }
    }
    return new Float32Array(pts);
  }, [positions]);

  /* ── geometries ── */
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    if (linePositions.length > 0) {
      geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    }
    return geo;
  }, [linePositions]);

  /* ── materials ── */
  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: isMobile ? 1.5 : 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      }),
    []
  );

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#4F8EF7', transparent: true, opacity: 0.12 }),
    []
  );

  /* ── animation ── */
  useFrame((_, delta) => {
    const dy = delta * 0.08;
    const dx = delta * 0.03;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += dy;
      pointsRef.current.rotation.x += dx;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += dy;
      linesRef.current.rotation.x += dx;
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={particleGeo} material={particleMat} />
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef} geometry={lineGeo} material={lineMat} />
      )}
    </>
  );
}

export default function ParticleCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 350], fov: 60, near: 1, far: 2000 }}
        gl={{ antialias: false, alpha: true, powerPreference: isMobile ? 'low-power' : 'default' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
