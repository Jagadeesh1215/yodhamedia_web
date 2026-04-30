"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useGlobalMouse } from "@/lib/mouse";
/* ---------- SVG BLADE ---------- */

const Blade = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    {/* Blade body */}
    <path
      d="M12 2 
         L14.2 8 
         L13 20 
         L11 20 
         L9.8 8 
         Z"
      fill="url(#bladeGrad)"
    />

    {/* Center ridge (fuller) */}
    <path
      d="M12 3 L12 20"
      stroke="#fff"
      strokeOpacity="0.6"
      strokeWidth="0.6"
    />

    {/* Edge highlight */}
    <path
      d="M12 2 L14.2 8"
      stroke="#fff"
      strokeOpacity="0.8"
      strokeWidth="0.5"
    />

    {/* Guard */}
    <rect x="9" y="20" width="6" height="1.2" rx="0.4" fill="#7C3AED" />

    {/* Grip */}
    <rect x="10.5" y="21.2" width="3" height="1.8" rx="0.5" fill="#1f1f1f" />

    {/* Pommel */}
    <circle cx="12" cy="23.2" r="0.8" fill="#F5C842" />

    {/* Gradient */}
    <defs>
      <linearGradient id="bladeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e5e7eb" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
    </defs>
  </svg>
);

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [engagement, setEngagement] = useState(false);
  const { mouseX: x, mouseY: y } = useGlobalMouse();

  // Smooth motion layers
  const coreX = useSpring(x, { stiffness: 500, damping: 30 });
  const coreY = useSpring(y, { stiffness: 500, damping: 30 });

  const auraX = useSpring(x, { stiffness: 150, damping: 25 });
  const auraY = useSpring(y, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const over = (event: Event) => {
      const target = event.target as HTMLElement;

      const isCTA = Boolean(target.closest("a, button, [data-cursor='interactive']"));
      const isSocial = Boolean(target.closest("[data-social='true'], .social-icon"));

      setActive(isCTA);
      setEngagement(isSocial);
    };

    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">

      {/* 🔥 ENERGY AURA */}
      <motion.div
        className="fixed rounded-full"
        animate={{
          scale: engagement ? [1, 1.6, 1] : active ? 1.3 : 1,
          opacity: engagement ? [0.4, 0.9, 0.4] : 0.5,
        }}
        transition={{
          duration: 0.6,
          repeat: engagement ? Infinity : 0,
        }}
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          width: "50px",
          height: "50px",
          border: "2px solid",
          borderColor: "#F5C842",
          boxShadow:
            "0 0 20px rgba(245,200,66,0.7), 0 0 40px rgba(124,58,237,0.4)",
        }}
      />

      {/* ⚔️ BLADE CORE */}
      <motion.div
        className="fixed"
        animate={{
          scale: active ? 1.4 : 1,
          rotate: active ? 15 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          width: "18px",
          height: "18px",
          filter: "drop-shadow(0 0 10px rgba(245,200,66,0.8))",
        }}
      >
        <Blade />
      </motion.div>

      {/* 🔥 CORE DOT */}
      <motion.div
        className="fixed rounded-full"
        animate={{
          scale: active ? 1.6 : 1,
          backgroundColor: engagement ? "#FDE68A" : "#F5C842",
        }}
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          width: "6px",
          height: "6px",
          boxShadow: "0 0 10px rgba(245,200,66,0.7)",
        }}
      />
    </div>
  );
}