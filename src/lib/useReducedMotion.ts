"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event?: MediaQueryListEvent | MediaQueryList) => {
      setReduced(event ? event.matches : media.matches);
    };

    update();

    if (typeof media.addEventListener === "function") {
      const listener = ((event: MediaQueryListEvent) => update(event)) as EventListener;
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }

    const legacyListener = ((event: MediaQueryListEvent) => update(event)) as (event: MediaQueryListEvent) => void;
    media.addListener(legacyListener);
    return () => media.removeListener(legacyListener);
  }, []);

  return reduced;
}
