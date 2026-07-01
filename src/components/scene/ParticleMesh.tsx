"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePos } from "@/lib/useMousePosition";

const POINTS = 1200;
const EDGE_PROB = 0.0025; // roughly 1200*1199/2 * 0.0025 ≈ ~1800 edges

type Props = {
  mouseRef: React.MutableRefObject<MousePos>;
};

export function ParticleMesh({ mouseRef }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  // Generate base positions + edge index pairs once
  const { basePositions, edgeIndices } = useMemo(() => {
    const positions = new Float32Array(POINTS * 3);
    // Distribute in a rough ellipsoid brain shape
    for (let i = 0; i < POINTS; i++) {
      // Spherical shell w/ noise for organic feel
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 3.2 + (Math.random() - 0.5) * 1.4;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4; // wider on x
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.9;
    }
    // Build edges: pair nearby points
    const edges: number[] = [];
    for (let i = 0; i < POINTS; i++) {
      for (let j = i + 1; j < POINTS; j++) {
        if (Math.random() > EDGE_PROB) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 2.5) {
          edges.push(i, j);
        }
      }
    }
    return { basePositions: positions, edgeIndices: new Uint16Array(edges) };
  }, []);

  // Live buffers we mutate every frame
  const livePositions = useMemo(
    () => new Float32Array(basePositions),
    [basePositions]
  );
  const lineBuffer = useMemo(
    () => new Float32Array(edgeIndices.length * 3),
    [edgeIndices]
  );

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(livePositions, 3));
    return g;
  }, [livePositions]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(lineBuffer, 3));
    return g;
  }, [lineBuffer]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow global rotation
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.05;

    // Project cursor to world Z=0 plane
    const mx = mouseRef.current.x * (viewport.width / 2);
    const my = mouseRef.current.y * (viewport.height / 2);

    // Repel points near cursor
    const repelRadius = 1.2;
    const repelStrength = 0.35;
    for (let i = 0; i < POINTS; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const dx = bx - mx;
      const dy = by - my;
      const d = Math.sqrt(dx * dx + dy * dy);
      let ox = 0;
      let oy = 0;
      if (d < repelRadius && d > 0.001) {
        const f = (1 - d / repelRadius) * repelStrength;
        ox = (dx / d) * f;
        oy = (dy / d) * f;
      }
      // Gentle drift
      const drift =
        Math.sin(state.clock.elapsedTime * 0.6 + i * 0.02) * 0.02;
      livePositions[i * 3] = bx + ox;
      livePositions[i * 3 + 1] = by + oy + drift;
      livePositions[i * 3 + 2] = bz;
    }
    (pointGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Update line buffer from edges
    for (let e = 0; e < edgeIndices.length; e += 2) {
      const a = edgeIndices[e];
      const b = edgeIndices[e + 1];
      lineBuffer[e * 3] = livePositions[a * 3];
      lineBuffer[e * 3 + 1] = livePositions[a * 3 + 1];
      lineBuffer[e * 3 + 2] = livePositions[a * 3 + 2];
      lineBuffer[e * 3 + 3] = livePositions[b * 3];
      lineBuffer[e * 3 + 4] = livePositions[b * 3 + 1];
      lineBuffer[e * 3 + 5] = livePositions[b * 3 + 2];
    }
    (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.035}
          color="#7CFFB0"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color="#7CFFB0"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
