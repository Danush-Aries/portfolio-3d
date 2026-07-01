"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  position: [number, number, number];
  angle: number;
  active: boolean;
  onClick?: () => void;
};

const ACCENT_HEX: Record<Project["accent"], string> = {
  mint: "#7CFFB0",
  cyan: "#5AB0FF",
  red: "#FF6B6B",
};

export function ProjectShard({
  project,
  position,
  angle,
  active,
  onClick,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  const color = ACCENT_HEX[project.accent];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = angle + Math.sin(t * 0.4 + angle) * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.3 + angle) * 0.08;
    // Active lifts + rotates a bit more
    const targetLift = active ? 0.4 : 0;
    groupRef.current.position.y +=
      (position[1] + targetLift - groupRef.current.position.y) * 0.06;
    const targetScale = active ? 1.12 : 1;
    const s = groupRef.current.scale.x;
    const next = s + (targetScale - s) * 0.08;
    groupRef.current.scale.set(next, next, next);
  });

  const size: [number, number, number] = [1.6, 1.0, 0.06];

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      {/* Glass slab */}
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#12181B"
          metalness={0.5}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={active ? 0.28 : 0.08}
        />
      </mesh>
      {/* Neon edge lines */}
      <lineSegments ref={edgeRef}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(size[0], size[1], size[2])]}
        />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.95 : 0.55}
        />
      </lineSegments>
      {/* Rim halo */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[size[0] * 1.15, size[1] * 1.15]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.15 : 0.05}
        />
      </mesh>
    </group>
  );
}
