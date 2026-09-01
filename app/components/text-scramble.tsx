"use client";

import { useEffect, useState } from "react";

const DEFAULT_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/";

type TextScrambleProps = {
  text: string;
  duration?: number;
  glyphs?: string;
  className?: string;
};

export function TextScramble({
  text,
  duration = 680,
  glyphs = DEFAULT_GLYPHS,
  className,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !glyphs) {
      return;
    }

    const characters = text.split("");
    const startedAt = performance.now();
    let frame = 0;
    let lastUpdate = 0;

    const animate = (now: number) => {
      if (now - lastUpdate >= 40) {
        lastUpdate = now;
        const progress = Math.min((now - startedAt) / duration, 1);
        const settled = Math.floor(progress * characters.length);

        setDisplay(
          characters
            .map((character, index) => {
              if (index < settled || character === " ") return character;
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join(""),
        );
      }

      if (now - startedAt < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [duration, glyphs, text]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
