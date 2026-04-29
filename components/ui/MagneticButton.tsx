"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

  return (
    <motion.span
      style={{ x, y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
