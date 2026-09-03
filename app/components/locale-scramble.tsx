"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/";

export function LocaleScramble({ active }: { active: boolean }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) return;

    const tick = () => {
      setDisplay(
        Array.from({ length: 3 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""),
      );
    };

    const firstTick = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 70);
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(interval);
    };
  }, [active]);

  return <span aria-hidden="true">{active ? display : ""}</span>;
}
