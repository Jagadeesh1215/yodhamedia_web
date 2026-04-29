"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: Event) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a,button,[data-cursor='interactive']")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.span
        className="fixed h-2 w-2 rounded-full bg-gold-highlight"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.span
        className="fixed h-9 w-9 rounded-full border border-gold-warm/70 mix-blend-difference"
        animate={{ scale: active ? 1.65 : 1 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
