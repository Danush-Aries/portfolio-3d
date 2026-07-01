"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  EDGES,
  EDGE_COLOR,
  KIND_COLOR,
  NODES,
  type GraphNode,
} from "@/lib/graph-data";
import { useMousePosition, type MousePos } from "@/lib/useMousePosition";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ---------- helpers ----------

// Base-plane Y for the graph. Nodes lift above this by risk*RISK_HEIGHT.
const BASE_Y = -0.6;
const RISK_HEIGHT = 1.6;

function nodeWorldPos(n: GraphNode): [number, number, number] {
  return [n.x, BASE_Y + n.risk * RISK_HEIGHT, n.z];
}

// ---------- node ----------

type NodeProps = {
  node: GraphNode;
  onHover: (n: GraphNode | null, screen?: { x: number; y: number }) => void;
};

function Node({ node, onHover }: NodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = KIND_COLOR[node.kind];
  const [x, y, z] = nodeWorldPos(node);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // gentle bob keyed off risk — higher-risk nodes fidget more
    groupRef.current.position.y = y + Math.sin(t * (0.5 + node.risk) + node.x) * 0.05;
    if (meshRef.current) {
      const target = hovered ? 1.35 : 1;
      const s = meshRef.current.scale.x;
      const next = s + (target - s) * 0.15;
      meshRef.current.scale.set(next, next, next);
    }
  });

  // model is a small icosahedron, mcp/data/api/shell are octahedra, user is a plane
  const geometry = useMemo(() => {
    if (node.kind === "model") return <icosahedronGeometry args={[0.28, 0]} />;
    if (node.kind === "user") return <sphereGeometry args={[0.18, 12, 12]} />;
    return <octahedronGeometry args={[0.2, 0]} />;
  }, [node.kind]);

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Ground marker — where the node projects onto baseline */}
      <mesh position={[0, -(y - BASE_Y) + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.16, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Vertical riser — visually communicates "risk score" */}
      <mesh position={[0, -(y - BASE_Y) / 2, 0]}>
        <cylinderGeometry args={[0.006, 0.006, y - BASE_Y, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      {/* Node body */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          const c = (e as unknown as { clientX: number; clientY: number });
          onHover(node, { x: c.clientX, y: c.clientY });
          document.body.style.cursor = "pointer";
        }}
        onPointerMove={(e) => {
          const c = (e as unknown as { clientX: number; clientY: number });
          onHover(node, { x: c.clientX, y: c.clientY });
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "";
        }}
      >
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.4 + node.risk * 0.7}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Rim halo */}
      <mesh scale={hovered ? 1.6 : 1}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.18 : 0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ---------- edges ----------

function Edges() {
  const geo = useMemo(() => {
    const nodesById = new Map(NODES.map((n) => [n.id, n]));
    // one BufferGeometry per edge kind so we can color each group
    const byKind: Record<string, number[]> = {
      trusted: [],
      boundary: [],
      hostile: [],
    };
    for (const e of EDGES) {
      const a = nodesById.get(e.from);
      const b = nodesById.get(e.to);
      if (!a || !b) continue;
      const [ax, ay, az] = nodeWorldPos(a);
      const [bx, by, bz] = nodeWorldPos(b);
      byKind[e.kind].push(ax, ay, az, bx, by, bz);
    }
    return byKind;
  }, []);

  return (
    <group>
      {(Object.keys(geo) as Array<keyof typeof EDGE_COLOR>).map((k) => {
        const arr = new Float32Array(geo[k]);
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
        return (
          <lineSegments key={k} geometry={g}>
            <lineBasicMaterial
              color={EDGE_COLOR[k]}
              transparent
              opacity={k === "hostile" ? 0.75 : 0.4}
              depthWrite={false}
            />
          </lineSegments>
        );
      })}
    </group>
  );
}

// ---------- baseline grid ----------

function Baseline() {
  return (
    <group position={[0, BASE_Y, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14, 1, 1]} />
        <meshBasicMaterial
          color="#7CFFB0"
          transparent
          opacity={0.02}
        />
      </mesh>
      <gridHelper args={[10, 20, "#1e2a24", "#12181B"]} />
    </group>
  );
}

// ---------- camera ----------

type RigProps = {
  mouseRef: React.MutableRefObject<MousePos>;
  hoverActive: boolean;
};

function OrbitRig({ mouseRef, hoverActive }: RigProps) {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const RADIUS = 7.5;
  const IDLE_SPEED = 0.06;

  useFrame((_, delta) => {
    // slow idle orbit unless the user is hovering a node (feels more inspectable)
    if (!hoverActive) angleRef.current += delta * IDLE_SPEED;

    // mouse drift — layered on the orbit
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const baseX = Math.sin(angleRef.current) * RADIUS;
    const baseZ = Math.cos(angleRef.current) * RADIUS;
    const targetX = baseX + mx * 1.5;
    const targetY = 3.2 + my * 0.6;
    const targetZ = baseZ;

    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

// ---------- outer component ----------

export function HeroGraph() {
  const mouseRef = useMousePosition();
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<
    | {
        node: GraphNode;
        screen: { x: number; y: number };
      }
    | null
  >(null);

  if (reduced) {
    // Reduced motion: use the static SVG poster.
    return (
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "url(/hero-poster.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.2, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0A0E10"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 5, 3]} intensity={0.55} color="#7CFFB0" />
        <pointLight position={[-4, 2, -2]} intensity={0.35} color="#5AB0FF" />
        <pointLight position={[4, 2, -2]} intensity={0.2} color="#FF6B6B" />

        <Suspense fallback={null}>
          <Baseline />
          <Edges />
          {NODES.map((n) => (
            <Node
              key={n.id}
              node={n}
              onHover={(node, screen) => {
                if (!node) setHover(null);
                else if (screen) setHover({ node, screen });
              }}
            />
          ))}
        </Suspense>

        <OrbitRig mouseRef={mouseRef} hoverActive={hover !== null} />
      </Canvas>

      {/* Hover card */}
      {hover && (
        <div
          className="pointer-events-none fixed z-30 max-w-[280px] border border-[color:var(--muted)]/40 bg-[color:var(--surface)]/95 p-3 font-mono text-[12px] backdrop-blur"
          style={{
            left: Math.min(hover.screen.x + 14, window.innerWidth - 300),
            top: Math.min(hover.screen.y + 14, window.innerHeight - 140),
          }}
          role="tooltip"
        >
          <div
            className="mb-1 text-[11px] uppercase tracking-widest"
            style={{ color: KIND_COLOR[hover.node.kind] }}
          >
            {hover.node.kind} · risk {Math.round(hover.node.risk * 100)}
          </div>
          <div className="mb-2 text-[color:var(--text)]">
            {hover.node.label}
          </div>
          <div className="text-[color:var(--text)]/70">{hover.node.threat}</div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 hero-vignette" />
    </div>
  );
}
