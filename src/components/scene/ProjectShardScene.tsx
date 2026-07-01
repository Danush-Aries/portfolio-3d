"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ACCENT_HEX: Record<Project["accent"], string> = {
  mint: "#7CFFB0",
  cyan: "#5AB0FF",
  red: "#FF6B6B",
};

type Props = {
  project: Project;
};

function Slab({ project }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const color = ACCENT_HEX[project.accent];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // idle: slow y-drift + subtle sway
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    const targetY = hovered ? t * 1.6 : Math.sin(t * 0.35) * 0.25;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.05;
  });

  // Build a canvas texture with the project title in mono
  const texture = useRef<THREE.CanvasTexture | null>(null);
  if (typeof document !== "undefined" && !texture.current) {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0A0E10";
      ctx.fillRect(0, 0, c.width, c.height);
      // border
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, c.width - 48, c.height - 48);
      // dot chrome
      ctx.fillStyle = color;
      ctx.fillRect(48, 48, 14, 14);
      ctx.fillStyle = "#5AB0FF";
      ctx.fillRect(72, 48, 14, 14);
      ctx.fillStyle = "#6B7772";
      ctx.fillRect(96, 48, 14, 14);
      // index label
      ctx.fillStyle = "#6B7772";
      ctx.font = "600 24px 'JetBrains Mono', monospace";
      ctx.fillText(`~/dhanush/${project.slug}`, 128, 62);
      // title big
      ctx.fillStyle = "#E6EDE9";
      ctx.font = "700 68px 'JetBrains Mono', monospace";
      ctx.fillText(project.name, 60, 240);
      // pitch
      ctx.fillStyle = color;
      ctx.font = "500 30px 'JetBrains Mono', monospace";
      const pitchWords = project.pitch.split(" ");
      let line = "";
      let y = 320;
      for (const w of pitchWords) {
        const test = line + w + " ";
        if (ctx.measureText(test).width > c.width - 120) {
          ctx.fillText(line, 60, y);
          line = w + " ";
          y += 40;
        } else {
          line = test;
        }
      }
      ctx.fillText(line, 60, y);
      // role/year
      ctx.fillStyle = "#6B7772";
      ctx.font = "500 22px 'JetBrains Mono', monospace";
      ctx.fillText(
        `[ ${project.role} · ${project.year} ]`,
        60,
        c.height - 60
      );
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    texture.current = t;
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      {/* rim halo */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.4, 2.3]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.15 : 0.06} />
      </mesh>
      {/* glass slab */}
      <mesh ref={meshRef}>
        <boxGeometry args={[3.2, 2.05, 0.1]} />
        <meshStandardMaterial
          color="#0A0E10"
          metalness={0.45}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>
      {/* face texture */}
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[3.05, 1.9]} />
        <meshBasicMaterial
          map={texture.current ?? undefined}
          toneMapped={false}
          transparent
        />
      </mesh>
      {/* neon edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.2, 2.05, 0.1)]} />
        <lineBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.55} />
      </lineSegments>
    </group>
  );
}

export function ProjectShardScene({ project }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex h-full items-center justify-center border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/40 p-6">
        <div className="font-mono text-sm text-[color:var(--muted)]">
          [motion reduced — {project.name} shard hidden]
        </div>
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0A0E10"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#7CFFB0" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#5AB0FF" />
      <Suspense fallback={null}>
        <Slab project={project} />
      </Suspense>
    </Canvas>
  );
}
