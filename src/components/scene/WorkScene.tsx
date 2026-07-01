"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { projects } from "@/lib/projects";
import { ProjectShard } from "./ProjectShard";
import { useMousePosition } from "@/lib/useMousePosition";
import { CameraRig } from "./CameraRig";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  activeIndex: number;
  onSelect: (i: number) => void;
};

export function WorkScene({ activeIndex, onSelect }: Props) {
  const mouseRef = useMousePosition();
  const reduced = useReducedMotion();

  // Arrange 6 shards in a slow orbit around origin
  const layout = useMemo(() => {
    const radius = 2.8;
    return projects.map((p, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - 0.5;
      const y = Math.sin(angle * 2) * 0.4;
      return { p, angle, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  if (reduced) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-mono text-sm text-[color:var(--muted)]">
          [motion reduced — see panels →]
        </div>
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0A0E10"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={0.55} color="#7CFFB0" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#5AB0FF" />
      <Suspense fallback={null}>
        {layout.map(({ p, angle, position }, i) => (
          <ProjectShard
            key={p.slug}
            project={p}
            position={position}
            angle={angle}
            active={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </Suspense>
      <CameraRig mouseRef={mouseRef} />
    </Canvas>
  );
}
