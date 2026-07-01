"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  text: string;
  speed?: number; // ms per char
  startDelay?: number;
  className?: string;
  caret?: boolean;
};

export function TerminalText({
  text,
  speed = 32,
  startDelay = 200,
  className = "",
  caret = true,
}: Props) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) {
      setI(text.length);
      return;
    }
    setI(0);
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setI((n) => {
          if (n >= text.length) {
            clearInterval(id);
            return n;
          }
          return n + 1;
        });
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={className}>
      {text.slice(0, i)}
      {caret && <span className="caret" aria-hidden />}
    </span>
  );
}
