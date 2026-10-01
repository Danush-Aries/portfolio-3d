"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
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
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const color = ACCENT_HEX[project.accent];

  useEffect(() => {
    if (typeof document === "undefined") return;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0A0E10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    ctx.fillStyle = color;
    ctx.fillRect(48, 48, 14, 14);
    ctx.fillStyle = "#5AB0FF";
    ctx.fillRect(72, 48, 14, 14);
    ctx.fillStyle = "#6B7772";
    ctx.fillRect(96, 48, 14, 14);

    ctx.fillStyle = "#6B7772";
    ctx.font = "600 24px 'JetBrains Mono', monospace";
    ctx.fillText(`~/dhanush/${project.slug}`, 128, 62);

    ctx.fillStyle = "#E6EDE9";
    ctx.font = "700 68px 'JetBrains Mono', monospace";
    ctx.fillText(project.name, 60, 240);

    ctx.fillStyle = color;
    ctx.font = "500 30px 'JetBrains Mono', monospace";
    const pitchWords = project.pitch.split(" ");
    let line = "";
    let y = 320;
    for (const word of pitchWords) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > canvas.width - 120) {
        ctx.fillText(line, 60, y);
        line = word + " ";
        y += 40;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, 60, y);

    ctx.fillStyle = "#6B7772";
    ctx.font = "500 22px 'JetBrains Mono', monospace";
    ctx.fillText(`[ ${project.role} · ${project.year} ]`, 60, canvas.height - 60);

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture((current) => {
      current?.dispose();
      return nextTexture;
    });

    return () => {
      nextTexture.dispose();
    };
  }, [color, project.name, project.pitch, project.role, project.slug, project.year]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    const targetY = hovered ? t * 1.6 : Math.sin(t * 0.35) * 0.25;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        setHovered(true);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "grab";
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "";
        }
      }}
    >
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.4, 2.3]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.15 : 0.06}
        />
      </mesh>
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
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[3.05, 1.9]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          toneMapped={false}
          transparent
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.2, 2.05, 0.1)]} />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.55}
        />
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
