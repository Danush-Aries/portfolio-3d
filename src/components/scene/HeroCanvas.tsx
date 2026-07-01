"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticleMesh } from "./ParticleMesh";
import { HoloTerminal } from "./HoloTerminal";
import { CameraRig } from "./CameraRig";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMousePosition } from "@/lib/useMousePosition";

export function HeroCanvas() {
  const reduced = useReducedMotion();
  const mouseRef = useMousePosition();

  if (reduced) {
    // Static SVG fallback
    return (
      <div className="absolute inset-0" aria-hidden>
        <svg
          viewBox="0 0 800 600"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="g" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#12181B" />
              <stop offset="100%" stopColor="#0A0E10" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#g)" />
          <rect
            x="220"
            y="180"
            width="360"
            height="220"
            rx="6"
            fill="#0A0E10"
            stroke="#7CFFB0"
            strokeOpacity="0.4"
          />
          <text
            x="240"
            y="260"
            fill="#7CFFB0"
            fontFamily="monospace"
            fontSize="18"
          >
            &gt; I build the AI.
          </text>
          <text
            x="240"
            y="290"
            fill="#E6EDE9"
            fontFamily="monospace"
            fontSize="18"
          >
            &nbsp;&nbsp;I break the AI.
          </text>
          <text
            x="240"
            y="320"
            fill="#E6EDE9"
            fontFamily="monospace"
            fontSize="18"
          >
            &nbsp;&nbsp;I ship with the AI.
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0A0E10"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 2, 4]} intensity={0.6} color="#7CFFB0" />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#5AB0FF" />
        <Suspense fallback={null}>
          <ParticleMesh mouseRef={mouseRef} />
          <HoloTerminal />
        </Suspense>
        <CameraRig mouseRef={mouseRef} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 hero-vignette" />
    </div>
  );
}
