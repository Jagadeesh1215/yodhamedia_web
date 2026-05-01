"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ---------- THEME-AWARE SHATTER PARTICLE ---------- */
const ShatterParticle = ({
  x,
  y,
  isGold,
}: {
  x: number;
  y: number;
  isGold: boolean;
}) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 40 + Math.random() * 60;
  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: moveX,
        y: moveY,
        opacity: 0,
        scale: 0,
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="absolute w-2.5 h-2.5 z-[1000]"
      style={{
        left: x,
        top: y,
        // Using your theme variables for particles
        backgroundColor: isGold
          ? "var(--gold-highlight)"
          : "var(--purple-electric)",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 80%)",
        filter: "drop-shadow(0 0 4px var(--purple-electric))",
      }}
    />
  );
};

/* ---------- SWORD SVG (THEME OPTIMIZED) ---------- */
const SwordBlade = ({
  isActive,
  stabValue,
}: {
  isActive: boolean;
  stabValue: any;
}) => {
  // Pull back and thrust animation
  const stabY = useTransform(stabValue, [0, 0.2, 0.5, 1], [0, -15, 35, 0]);
  const stabScaleY = useTransform(
    stabValue,
    [0, 0.2, 0.5, 1],
    [1, 0.9, 1.4, 1],
  );

  return (
    <motion.svg
      viewBox="0 0 30 120"
      className="w-full h-full overflow-visible"
      style={{
        y: stabY,
        scaleY: stabScaleY,
        rotate: -25,
        transformOrigin: "50% 0%",
      }}
    >
      <defs>
        {/* Dynamic Gradient based on Theme Variables */}
        <linearGradient id="swordGrad" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={isActive ? "var(--gold-highlight)" : "var(--off-white)"}
          />
          <stop
            offset="50%"
            stopColor={isActive ? "var(--gold-warm)" : "var(--slate)"}
          />
          <stop offset="100%" stopColor="var(--purple-vivid)" />
        </linearGradient>

        <filter id="swordGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(0, 5)" filter={isActive ? "url(#swordGlow)" : ""}>
        {/* Blade Body */}
        <path
          d="M15 0 L22 25 L20 80 L15 90 L10 80 L8 25 Z"
          fill="url(#swordGrad)"
          stroke={isActive ? "var(--gold-warm)" : "var(--purple-deep)"}
          strokeWidth="0.75"
        />

        {/* Hilt / Guard - uses Purple Electric for that "magic" look in Dark Mode */}
        <rect
          x="4"
          y="85"
          width="22"
          height="5"
          rx="1"
          fill="var(--purple-electric)"
        />

        {/* Grip */}
        <rect
          x="12"
          y="90"
          width="6"
          height="18"
          rx="1"
          fill="var(--purple-deep)"
        />

        {/* Pommel Gem */}
        <circle cx="15" cy="110" r="3" fill="var(--gold-highlight)" />
      </g>
    </motion.svg>
  );
};

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [shards, setShards] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 1800, damping: 90 });
  const cursorY = useSpring(mouseY, { stiffness: 1800, damping: 90 });

  const stabValue = useMotionValue(0);
  const isStabbing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      setActive(
        !!target.closest("a, button, [role='button'], input, .interactive"),
      );
    };

    const triggerStab = async () => {
      if (isStabbing.current) return;
      isStabbing.current = true;

      // Burst shards on impact
      setTimeout(() => {
        const newShards = Array.from({ length: 8 }).map((_, i) => ({
          id: Date.now() + i,
          x: mouseX.get(),
          y: mouseY.get(),
        }));
        setShards(newShards);
        setTimeout(() => setShards([]), 500);
      }, 80);

      // Animation: Pull back (0.2), Pierce (0.5), Reset (1)
      await animate(stabValue, 1, { duration: 0.22, ease: "backOut" });

      stabValue.set(0);
      isStabbing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", triggerStab);

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", triggerStab);
      document.documentElement.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Fragments */}
      {shards.map((shard) => (
        <ShatterParticle
          key={shard.id}
          x={shard.x}
          y={shard.y}
          isGold={active}
        />
      ))}

      {/* Main Cursor Container */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-2%",
          width: 50,
          height: 40,
        }}
      >
        <SwordBlade isActive={active} stabValue={stabValue} />
      </motion.div>
    </div>
  );
}
