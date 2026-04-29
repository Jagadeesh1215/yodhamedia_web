"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function AnimatedCounter({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(typeof value === "number" ? 0 : value);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  useEffect(() => {
    if (!inView || typeof value !== "number") return;
    let frame = 0;
    const frames = 70;
    const timer = window.setInterval(() => {
      frame += 1;
      setDisplay(Math.round((value * frame) / frames));
      if (frame >= frames) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      <span className="text-gold-warm">{suffix}</span>
    </span>
  );
}
