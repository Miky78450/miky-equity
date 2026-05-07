"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

// Parse a formatted value like "+39.0%" or "3.20" or "-25.5%" or "8.2 ans"
// Returns { prefix, number, suffix, decimals }
function parseValue(val: string) {
  const match = val.match(/^([+\-$]?)(\d+(?:\.\d+)?)(.*?)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, number: parseFloat(num), suffix, decimals };
}

export function CountUp({ value, className, duration = 1.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    const parsed = parseValue(value);
    if (!parsed) return;

    hasAnimated.current = true;
    const { prefix, number, suffix, decimals } = parsed;
    const startTime = performance.now();
    const startVal = 0;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const current = startVal + (number - startVal) * easeOut(progress);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
