"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const brand = "YODHAMEDIA";

  useEffect(() => {
    // This timer controls how long the logo stays on screen
    const timer = setTimeout(() => {
      onComplete(); // Tells Providers.tsx to start the exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      // This "exit" property is triggered by AnimatePresence in Providers.tsx
      exit={{
        clipPath: "inset(50% 0 50% 0)",
        opacity: 0,
      }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* THE AMBIENT GLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.1] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold-warm)_0%,transparent_70%)]"
      />

      <div className="relative flex flex-col items-center">
        {/* THE "KNIGHT'S TRACE" (Horizontal Beam) */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1],
            opacity: [0, 1, 0.2],
            x: ["-100%", "0%", "100%"],
          }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute z-20 h-[1px] md:w-[150vw] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_var(--gold-warm)]"
        />

        {/* THE TEXT ASSEMBLY */}
        <div className="relative z-10 flex items-center gap-1 overflow-hidden px-4 py-2">
          {brand.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, skewY: 10 }}
              animate={{ y: 0, opacity: 1, skewY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + i * 0.05,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className={cn(
                "font-display text-4xl md:text-6xl font-black italic tracking-tighter md:text-[9rem] leading-none",
                i < 5
                  ? "text-white"
                  : "text-[var(--gold-warm)] drop-shadow-[0_0_30px_rgba(218,165,32,0.2)]",
              )}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* THE "CUT" SUBTEXT */}
        <div className="overflow-hidden mt-2">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/40"
          >
            Precision in Every Pixel
          </motion.p>
        </div>
      </div>

      {/* DYNAMIC BORDER OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 border-[20px] border-[#050505] z-50 pointer-events-none"
      />
    </motion.div>
  );
}
