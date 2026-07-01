"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TAGLINE = "I build the AI.  I break the AI.  I ship with the AI.";

export function HoloTerminal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);
  const startRef = useRef<number>(0);

  // Build the terminal-face canvas texture
  const { texture, ctx, canvas } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const x = c.getContext("2d")!;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return { texture: t, ctx: x, canvas: c };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Idle rotation
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.06;
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.03;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.06;

    // Redraw terminal face
    if (startRef.current === 0) startRef.current = t;
    const dt = t - startRef.current;
    const charDur = 0.05;
    const totalChars = Math.min(
      TAGLINE.length,
      Math.floor(dt / charDur)
    );

    ctx.fillStyle = "#0A0E10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle grid
    ctx.strokeStyle = "rgba(124,255,176,0.05)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < canvas.width; gx += 48) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, canvas.height);
      ctx.stroke();
    }
    for (let gy = 0; gy < canvas.height; gy += 48) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(canvas.width, gy);
      ctx.stroke();
    }

    // top chrome
    ctx.fillStyle = "#12181B";
    ctx.fillRect(0, 0, canvas.width, 56);
    ctx.fillStyle = "#7CFFB0";
    ctx.fillRect(24, 22, 12, 12);
    ctx.fillStyle = "#5AB0FF";
    ctx.fillRect(48, 22, 12, 12);
    ctx.fillStyle = "#FF6B6B";
    ctx.fillRect(72, 22, 12, 12);

    ctx.fillStyle = "#6B7772";
    ctx.font = "600 22px 'JetBrains Mono', monospace";
    ctx.fillText("~/dhanush/agent — boot.log", 110, 38);

    // Prompt + streaming text
    ctx.fillStyle = "#7CFFB0";
    ctx.font = "600 40px 'JetBrains Mono', monospace";
    ctx.fillText("> ", 40, 160);
    ctx.fillStyle = "#E6EDE9";
    const streamed = TAGLINE.slice(0, totalChars);
    // Wrap manually
    const lineHeight = 56;
    const words = streamed.split(" ");
    let line = "";
    let y = 160;
    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > canvas.width - 140) {
        ctx.fillText(line, 100, y);
        line = w + " ";
        y += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, 100, y);

    // Blinking caret at end of stream
    const caretVisible = Math.floor(t * 2) % 2 === 0;
    if (caretVisible && totalChars <= TAGLINE.length) {
      const cx = 100 + ctx.measureText(line).width;
      ctx.fillStyle = "#7CFFB0";
      ctx.fillRect(cx, y - 34, 22, 40);
    }

    // Bottom hud
    ctx.fillStyle = "#6B7772";
    ctx.font = "400 18px 'JetBrains Mono', monospace";
    ctx.fillText(
      `[uptime ${Math.floor(t)}s]  [providers 6/6 up]  [tools 42 loaded]`,
      40,
      canvas.height - 32
    );

    // Scanline
    const sy = (t * 120) % canvas.height;
    ctx.fillStyle = "rgba(124,255,176,0.07)";
    ctx.fillRect(0, sy, canvas.width, 4);

    texture.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -1]}>
      {/* Rim light plane behind */}
      <mesh ref={rimRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[3.5, 2.25]} />
        <meshBasicMaterial color="#7CFFB0" transparent opacity={0.06} />
      </mesh>
      {/* Terminal slab */}
      <mesh ref={meshRef}>
        <boxGeometry args={[3.2, 2.0, 0.08]} />
        <meshStandardMaterial
          color="#0A0E10"
          metalness={0.4}
          roughness={0.35}
          emissive="#12181B"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Screen face */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[3.05, 1.85]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Bevel edge (mint tinted ring) */}
      <mesh position={[0, 0, 0.041]}>
        <ringGeometry args={[1.55, 1.62, 4]} />
        <meshBasicMaterial color="#7CFFB0" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}
