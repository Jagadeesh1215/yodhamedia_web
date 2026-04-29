"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, PerformanceMonitor, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type MeshRef = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

export function HeroSceneWrapper() {
  const [staticMode, setStaticMode] = useState(false);

  if (staticMode) return <HeroStaticFallback />;

  return (
    <div className="relative h-[420px] w-full md:h-[560px]" data-cursor="interactive">
      <Suspense fallback={<HeroStaticFallback />}>
        <Canvas camera={{ fov: 40, position: [0, 0, 10], near: 0.1, far: 100 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
          <PerformanceMonitor onDecline={() => setStaticMode(true)} />
          <ambientLight intensity={0.2} color="#1E1245" />
          <pointLight position={[8, 8, 6]} color="#7C3AED" intensity={3} />
          <pointLight position={[-6, -4, 4]} color="#C9910D" intensity={2} />
          <spotLight position={[0, 10, 0]} color="#ffffff" intensity={0.45} angle={0.3} penumbra={1} />
          <Float speed={1.7} rotationIntensity={0.15} floatIntensity={0.45}>
            <Laptop position={[-1.35, -0.5, 0]} rotation={[0.12, 0.35, 0]} />
          </Float>
          <Float speed={2.1} rotationIntensity={0.12} floatIntensity={0.3}>
            <Phone position={[2.2, -0.65, 0.45]} rotation={[0.02, -0.35, 0.08]} />
          </Float>
          <OrbitRing radius={4.1} speed={0.25} colors={["#1877F2", "#E1306C", "#FF0000", "#0A66C2", "#4A2C9E", "#C9910D"]} />
          <OrbitRing radius={2.9} speed={-0.18} colors={["#C9910D", "#7C3AED", "#F5C842", "#4A2C9E"]} tilt={0.45} />
          <Sparkles count={120} scale={12} size={1.4} speed={0.3} color="#C9910D" opacity={0.55} />
          <Sparkles count={80} scale={10} size={0.8} speed={0.16} color="#7C3AED" opacity={0.45} />
          <GlowOrb />
          <Environment preset="night" />
        </Canvas>
      </Suspense>
    </div>
  );
}

export function HeroStaticFallback() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-purple-electric/20 bg-card-gradient shadow-purple-lg md:h-[520px]">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-electric/20 blur-3xl" />
      <div className="absolute left-[18%] top-[28%] h-36 w-56 rotate-[-8deg] rounded-2xl border border-gold-warm/30 bg-dark-surface shadow-gold-sm">
        <div className="m-3 h-24 rounded-lg bg-gradient-to-br from-purple-deep via-purple-mid to-gold-warm p-3">
          <div className="h-3 w-20 rounded bg-gold-highlight" />
          <div className="mt-8 flex items-end gap-2">
            {[30, 54, 38, 72, 58].map((height) => (
              <span key={height} className="w-6 rounded-t bg-gold-warm" style={{ height }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[18%] top-[36%] h-56 w-28 rotate-[10deg] rounded-3xl border border-white/20 bg-dark-surface p-2 shadow-purple-md">
        <div className="h-full rounded-2xl bg-gradient-to-b from-purple-vivid to-purple-deep" />
      </div>
      <div className="absolute inset-x-10 bottom-12 flex justify-between">
        {["SEO", "ORM", "ADS"].map((label) => (
          <span key={label} className="rounded-full border border-gold-warm/35 bg-white/5 px-4 py-2 font-mono text-xs text-gold-highlight">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Laptop({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const screenRef = useRef<MeshRef>(null);
  const texture = useDashboardTexture();

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 0.8) * 0.14;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.85, -0.1]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[2.8, 1.9, 0.06]} />
        <meshStandardMaterial color="#181522" metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0.85, -0.063]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[2.58, 1.68]} />
        <meshStandardMaterial map={texture} emissive="#2D1B69" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.9, 0.1, 1.9]} />
        <meshStandardMaterial color="#202033" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.065, 0.34]}>
        <boxGeometry args={[0.86, 0.012, 0.55]} />
        <meshStandardMaterial color="#2D1B69" metalness={0.7} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Phone({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.82, 1.75, 0.08]} />
        <meshStandardMaterial color="#151126" metalness={0.85} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.7, 1.54]} />
        <meshStandardMaterial color="#4A2C9E" emissive="#7C3AED" emissiveIntensity={0.55} />
      </mesh>
      {[0.25, 0, -0.25].map((x, index) => (
        <mesh key={x} position={[x, -0.45 + index * 0.3, 0.052]}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial color={index === 1 ? "#C9910D" : "#F5C842"} emissive="#C9910D" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRing({ radius, speed, colors, tilt = 0 }: { radius: number; speed: number; colors: string[]; tilt?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * speed;
      group.current.rotation.x = tilt;
    }
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 120]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.22} />
      </mesh>
      {colors.map((color, index) => {
        const theta = (index / colors.length) * Math.PI * 2;
        return (
          <Float key={`${color}-${index}`} speed={3} rotationIntensity={0.4} floatIntensity={0.18}>
            <mesh position={[Math.cos(theta) * radius, 0, Math.sin(theta) * radius]}>
              <boxGeometry args={[0.42, 0.42, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} metalness={0.3} roughness={0.38} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <sphereGeometry args={[2.6, 64, 64]} />
      <MeshDistortMaterial color="#4A2C9E" emissive="#2D1B69" emissiveIntensity={0.8} distort={0.3} speed={1.5} transparent opacity={0.16} />
    </mesh>
  );
}

function useDashboardTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);
    ctx.fillStyle = "#1E1245";
    ctx.fillRect(0, 0, 512, 320);
    const bars = [60, 85, 45, 95, 70, 88, 55, 92];
    bars.forEach((height, index) => {
      const grad = ctx.createLinearGradient(0, 70, 0, 240);
      grad.addColorStop(0, "#C9910D");
      grad.addColorStop(1, "#4A2C9E");
      ctx.fillStyle = grad;
      ctx.fillRect(40 + index * 56, 240 - height * 1.75, 34, height * 1.75);
    });
    ctx.strokeStyle = "#F5C842";
    ctx.lineWidth = 4;
    ctx.beginPath();
    [[40, 200], [96, 160], [152, 180], [208, 120], [264, 140], [320, 90], [376, 100], [432, 60]].forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = "#F5C842";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("+128%", 22, 42);
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "15px sans-serif";
    ctx.fillText("Engagement Growth", 22, 66);
    return new THREE.CanvasTexture(canvas);
  }, []);
}
