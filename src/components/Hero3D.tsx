import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function useMouse() {
  const pos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      pos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return pos;
}

/* ── 1. Music: wireframe eighth note ── */
function MusicNote() {
  const g = useRef<THREE.Group>(null);
  const d = useRef<THREE.Group>(null);
  const p = useMouse();
  useFrame((s) => {
    if (!g.current) return;
    const t = s.clock.elapsedTime;
    g.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    g.current.rotation.x = Math.cos(t * 0.4) * 0.03;
    g.current.position.lerp(
      new THREE.Vector3(-2.2 + p.current.x * 0.18, -1.0 - p.current.y * 0.12, -0.5),
      0.04
    );
    if (d.current)
      d.current.children.forEach((c, i) => {
        const a = i * 2.1 + t * 0.8;
        c.position.set(Math.cos(a) * 0.35, Math.sin(a) * 0.35, 0.1);
      });
  });
  return (
    <group ref={g} position={[-2.2, -1.0, -0.5]}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.028, 0.65, 0.028]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.13} />
      </mesh>
      <mesh position={[0.08, -0.02, 0]} rotation={[0, 0, 0.35]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh position={[0.22, 0.38, 0]}>
        <boxGeometry args={[0.025, 0.48, 0.025]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.11} />
      </mesh>
      <mesh position={[0.28, 0.1, 0]} rotation={[0, 0, 0.35]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.09} />
      </mesh>
      <mesh position={[0.12, 0.42, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.22, 0.02, 0.02]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.11} />
      </mesh>
      <mesh position={[0.32, 0.35, 0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.06, 0.015, 0.015]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.09} />
      </mesh>
      <group ref={d}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.14} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── 2. Math: icosahedron + ring ── */
function MathPoly() {
  const m = useRef<THREE.Mesh>(null);
  const r = useRef<THREE.Mesh>(null);
  const p = useMouse();
  useFrame((_, d) => {
    if (!m.current || !r.current) return;
    m.current.rotation.x += d * 0.08;
    m.current.rotation.y += d * 0.12;
    r.current.rotation.x += d * 0.05;
    const tx = -3.0 + p.current.x * 0.25;
    const ty = 0.8 - p.current.y * 0.18;
    m.current.position.lerp(new THREE.Vector3(tx, ty, 0), 0.04);
    r.current.position.lerp(new THREE.Vector3(tx, ty, 0), 0.04);
  });
  return (
    <group>
      <mesh ref={m} position={[-3, 0.8, 0]}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshBasicMaterial color="#2DD4BF" wireframe transparent opacity={0.11} />
      </mesh>
      <mesh ref={m} position={[-3, 0.8, 0]} rotation={[0.8, 0, 0]}>
        <torusGeometry args={[0.68, 0.007, 8, 64]} />
        <meshBasicMaterial color="#2DD4BF" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ── 3. Extra polyhedron: wireframe dodecahedron ── */
function ExtraPoly() {
  const m = useRef<THREE.Mesh>(null);
  const p = useMouse();
  useFrame((_, d) => {
    if (!m.current) return;
    m.current.rotation.x += d * 0.05;
    m.current.rotation.z += d * 0.07;
    const tx = 2.5 + p.current.x * 0.2;
    const ty = 0.6 - p.current.y * 0.1;
    m.current.position.lerp(new THREE.Vector3(tx, ty, -0.6), 0.04);
  });
  return (
    <mesh ref={m} position={[2.5, 0.6, -0.6]}>
      <dodecahedronGeometry args={[0.35, 0]} />
      <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

/* ── 4. Extra polyhedron: wireframe octahedron ── */
function ExtraPoly2() {
  const m = useRef<THREE.Mesh>(null);
  const p = useMouse();
  useFrame((_, d) => {
    if (!m.current) return;
    m.current.rotation.y += d * 0.1;
    m.current.rotation.x += d * 0.06;
    const tx = p.current.x * 0.15;
    const ty = 1.7 - p.current.y * 0.1;
    m.current.position.lerp(new THREE.Vector3(tx, ty, -1.0), 0.04);
  });
  return (
    <mesh ref={m} position={[0, 1.7, -1.0]}>
      <octahedronGeometry args={[0.28, 0]} />
      <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.09} />
    </mesh>
  );
}

/* ── 5. Extra: small wireframe torus knot ── */
function ExtraPoly3() {
  const m = useRef<THREE.Mesh>(null);
  const p = useMouse();
  useFrame((_, d) => {
    if (!m.current) return;
    m.current.rotation.x += d * 0.04;
    m.current.rotation.y += d * 0.03;
    const tx = 1.8 + p.current.x * 0.18;
    const ty = -1.3 - p.current.y * 0.12;
    m.current.position.lerp(new THREE.Vector3(tx, ty, -0.8), 0.04);
  });
  return (
    <mesh ref={m} position={[1.8, -1.3, -0.8]}>
      <torusKnotGeometry args={[0.18, 0.04, 48, 8]} />
      <meshBasicMaterial color="#EF4444" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <MusicNote />
      <MathPoly />
      <ExtraPoly />
      <ExtraPoly2 />
      <ExtraPoly3 />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
