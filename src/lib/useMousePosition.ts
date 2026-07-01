"use client";

import { useEffect, useRef } from "react";

export type MousePos = { x: number; y: number };

/**
 * Shared, normalized (-1..1) mouse position. Uses a ref so consumers can
 * read the latest value inside animation loops without triggering re-renders.
 */
export function useMousePosition(): React.MutableRefObject<MousePos> {
  const ref = useRef<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ref.current.x = (e.clientX / w) * 2 - 1;
      ref.current.y = -((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
