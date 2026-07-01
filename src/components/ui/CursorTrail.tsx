"use client";

import { useEffect, useRef } from "react";

const POINTS = 14;

export function CursorTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPolylineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const points = useRef<Array<[number, number]>>(
    Array.from({ length: POINTS }, () => [-100, -100])
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Hide on touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target: [number, number] = [-100, -100];
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target = [e.clientX, e.clientY];
    };

    const tick = () => {
      // Smooth chain: each point eases toward the previous
      points.current[0][0] += (target[0] - points.current[0][0]) * 0.35;
      points.current[0][1] += (target[1] - points.current[0][1]) * 0.35;
      for (let i = 1; i < POINTS; i++) {
        points.current[i][0] +=
          (points.current[i - 1][0] - points.current[i][0]) * 0.32;
        points.current[i][1] +=
          (points.current[i - 1][1] - points.current[i][1]) * 0.32;
      }
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "points",
          points.current.map((p) => `${p[0]},${p[1]}`).join(" ")
        );
      }
      if (dotRef.current) {
        dotRef.current.setAttribute("cx", String(points.current[0][0]));
        dotRef.current.setAttribute("cy", String(points.current[0][1]));
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      width="100%"
      height="100%"
      aria-hidden
    >
      <polyline
        ref={pathRef}
        fill="none"
        stroke="rgb(124 255 176 / 0.55)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        ref={dotRef}
        r="3"
        fill="rgb(124 255 176)"
        style={{ filter: "drop-shadow(0 0 6px rgb(124 255 176 / 0.7))" }}
      />
    </svg>
  );
}
