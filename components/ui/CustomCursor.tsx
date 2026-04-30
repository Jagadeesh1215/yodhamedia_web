"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useGlobalMouse } from "@/lib/mouse";

/* ---------- REALISTIC SWORD SVG ---------- */

const SwordBlade = ({
  isActive,
  isEngagement,
}: {
  isActive: boolean;
  isEngagement: boolean;
}) => {
  const steelGrad = isActive ? "url(#steelActive)" : "url(#steel)";
  const edgeGlow = isEngagement ? "#FDE68A" : "#ffffff";

  return (
    <svg viewBox="0 0 44 72" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#f8fafc" />
          <stop offset="45%" stopColor="#d1d5db" />
          <stop offset="72%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>

        <linearGradient id="steelActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff7cc" />
          <stop offset="24%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#f5c842" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <linearGradient id="hiltMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="35%" stopColor="#a1a1aa" />
          <stop offset="65%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#f4f4f5" />
        </linearGradient>

        <linearGradient id="gripLeather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b1d16" />
          <stop offset="50%" stopColor="#171717" />
          <stop offset="100%" stopColor="#0f0f10" />
        </linearGradient>

        <filter id="bladeSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow core to give the blade depth */}
      <path
        d="M22 4 L29 18 L27.5 43 L21.5 52 L16.5 43 L15 18 Z"
        fill="rgba(0,0,0,0.18)"
        transform="translate(0.8 1.2)"
      />

      {/* Blade body */}
      <path
        d="M22 4
           L29 18
           L27.5 43
           L22 54
           L16.5 43
           L15 18
           Z"
        fill={steelGrad}
        filter="url(#bladeSoftGlow)"
      />

      {/* Center ridge */}
      <path
        d="M22 7 L21.7 50"
        stroke="rgba(255,255,255,0.58)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Main highlight */}
      <path
        d="M22 4 L19.1 17.5 L18.2 39"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Opposite edge shading */}
      <path
        d="M22 4 L25.2 18.2 L26.4 39.5"
        stroke="rgba(17,24,39,0.25)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Tip glint */}
      <circle cx="22" cy="4.6" r="1.35" fill="#fff" opacity="0.9">
        <animate attributeName="opacity" values="0.45;1;0.45" dur="1.1s" repeatCount="indefinite" />
      </circle>

      {/* Small edge spark */}
      <path
        d="M22 4 L18.3 10.5"
        stroke={edgeGlow}
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M22 4 L25.6 10.5"
        stroke={edgeGlow}
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Engagement energy */}
      {isEngagement && (
        <>
          <circle cx="18.5" cy="16.5" r="1" fill="#FDE68A">
            <animate attributeName="opacity" values="0;1;0" dur="0.45s" repeatCount="indefinite" />
            <animate attributeName="cy" values="16.5;11;16.5" dur="0.45s" repeatCount="indefinite" />
          </circle>
          <circle cx="26.7" cy="19.5" r="0.9" fill="#F5C842">
            <animate attributeName="opacity" values="0;1;0" dur="0.55s" repeatCount="indefinite" />
            <animate attributeName="cy" values="19.5;14.2;19.5" dur="0.55s" repeatCount="indefinite" />
          </circle>
          <circle cx="21.8" cy="28" r="0.85" fill="#A855F7">
            <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="28;22.5;28" dur="0.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Guard */}
      <path
        d="M14 50.8
           C16.4 49.6, 27.6 49.6, 30 50.8
           C28.8 52.1, 15.2 52.1, 14 50.8 Z"
        fill={isActive ? "#A855F7" : "#6b7280"}
      />
      <rect x="16.2" y="48.9" width="11.6" height="2.8" rx="1.2" fill={isActive ? "#c084fc" : "#9ca3af"} opacity="0.9" />

      {/* Grip */}
      <rect x="18" y="52" width="8" height="13" rx="2" fill="url(#gripLeather)" />
      <path d="M19.5 53.2 V62.1" stroke="rgba(255,255,255,255)" strokeWidth="0.6" />
      <path d="M22 53.2 V62.1" stroke="rgba(255,255,255,255)" strokeWidth="0.6" />
      <path d="M24.5 53.2 V62.1" stroke="rgba(255,255,255,255)" strokeWidth="0.6" />

      {/* Pommel */}
      <circle cx="22" cy="66.4" r="3.1" fill="#f5c842" />
      <circle cx="22" cy="66.4" r="1.3" fill="#fff7cc" opacity="0.75" />
    </svg>
  );
};

/* ---------- SPARK BURST ---------- */

const Sparkles = ({ x, y }: { x: number; y: number }) => {
  const sparks = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 18 + (i % 3) * 8;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 2 + (i % 3) * 0.8,
          delay: i * 0.02,
          color: i % 3 === 0 ? "#FDE68A" : i % 3 === 1 ? "#F5C842" : "#A855F7",
        };
      }),
    []
  );

  return (
    <>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ x: 0, y: 0, opacity: 0.95, scale: 1 }}
          animate={{
            x: spark.x,
            y: spark.y,
            opacity: 0,
            scale: 0.25,
          }}
          transition={{
            duration: 0.42,
            ease: "easeOut",
            delay: spark.delay,
          }}
          style={{
            position: "fixed",
            left: x,
            top: y,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            borderRadius: "9999px",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 10px ${spark.color}`,
          }}
        />
      ))}
    </>
  );
};

/* ---------- MAIN CURSOR ---------- */

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [engagement, setEngagement] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const { mouseX: x, mouseY: y } = useGlobalMouse();

  const swordX = useSpring(x, { stiffness: 700, damping: 34, mass: 0.8 });
  const swordY = useSpring(y, { stiffness: 700, damping: 34, mass: 0.8 });

  useEffect(() => {
    const handleMouseOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const isCTA = Boolean(
        target?.closest("a, button, [data-cursor='interactive'], input, select, textarea")
      );
      const isSocial = Boolean(target?.closest("[data-social='true'], .social-icon"));

      setActive(isCTA);
      setEngagement(isSocial);
      document.body.style.cursor = isCTA ? "pointer" : "default";
    };

    const handleMouseDown = () => {
      setClicking(true);
      setClickSparks((prev) => [...prev, { id: Date.now(), x: swordX.get(), y: swordY.get() }]);
      window.setTimeout(() => setClicking(false), 140);
      window.setTimeout(() => setClickSparks((prev) => prev.slice(1)), 380);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      document.body.style.cursor = "default";
    };
  }, [swordX, swordY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="fixed"
        animate={{
          scale: clicking ? 1.02 : active ? 1.12 : 1,
          rotate: clicking ? -10 : active ? (engagement ? 18 : 10) : 0,
        }}
        transition={{
          duration: 0.14,
          type: "spring",
          stiffness: 520,
          damping: 20,
        }}
        style={{
          x: swordX,
          y: swordY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? "60px" : "72px",
          height: clicking ? "60px" : "72px",
          filter: active
            ? `drop-shadow(0 0 ${engagement ? "16px" : "11px"} ${
                engagement ? "#FDE68A" : "#F5C842"
              })`
            : "drop-shadow(0 0 7px rgba(245,200,66,0.35))",
        }}
      >
        <SwordBlade isActive={active} isEngagement={engagement} />
      </motion.div>

      {clickSparks.map((spark) => (
        <Sparkles key={spark.id} x={spark.x} y={spark.y} />
      ))}

      {engagement && (
        <motion.div
          style={{
            position: "fixed",
            left: swordX,
            top: swordY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{ x: 0, y: 0, opacity: 0.75 }}
              animate={{
                x: [0, (Math.random() - 0.5) * 42],
                y: [0, (Math.random() - 0.5) * 34 - 12],
                opacity: [0.75, 0],
              }}
              transition={{
                duration: 0.75,
                delay: i * 0.06,
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
              style={{
                width: `${2 + Math.random() * 2.5}px`,
                height: `${2 + Math.random() * 2.5}px`,
                backgroundColor: i % 3 === 0 ? "#FDE68A" : "#F5C842",
                borderRadius: "9999px",
                boxShadow: "0 0 6px rgba(253,230,138,0.9)",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
