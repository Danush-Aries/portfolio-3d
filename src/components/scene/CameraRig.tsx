"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { MousePos } from "@/lib/useMousePosition";

type Props = {
  mouseRef: React.MutableRefObject<MousePos>;
};

export function CameraRig({ mouseRef }: Props) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    // Gentle mouse parallax around a fixed base
    const targetX = mouseRef.current.x * 0.4;
    const targetY = mouseRef.current.y * 0.25;
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 3);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 3);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
