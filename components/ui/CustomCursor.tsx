"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [engagement, setEngagement] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  
  // Warrior's core — fast & sharp
  const coreX = useSpring(x, { stiffness: 500, damping: 28 });
  const coreY = useSpring(y, { stiffness: 500, damping: 28 });
  
  // Shield ring — protective & strong
  const shieldX = useSpring(x, { stiffness: 200, damping: 30 });
  const shieldY = useSpring(y, { stiffness: 200, damping: 30 });
  
  // Social radar — trailing pulse like social reach
  const radarX = useSpring(x, { stiffness: 100, damping: 20 });
  const radarY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    
    const over = (event: Event) => {
      const target = event.target as HTMLElement;
      const isCTA = Boolean(target.closest("a, button, [data-cursor='interactive']"));
      const isSocial = Boolean(target.closest("[data-social='true'], .social-icon, [data-like='true']"));
      setActive(isCTA);
      setEngagement(isSocial);
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
      
      {/* SOCIAL RADAR — outer ring representing media reach */}
      <motion.span
        className="fixed rounded-full"
        animate={{
          scale: engagement ? [1, 1.5, 1] : active ? 1.3 : 1,
          opacity: engagement ? [0.5, 0.9, 0.5] : 0.5,
        }}
        transition={{
          duration: engagement ? 0.6 : 0,
          repeat: engagement ? Infinity : 0,
        }}
        style={{
          x: radarX,
          y: radarY,
          translateX: "-50%",
          translateY: "-50%",
          width: "48px",
          height: "48px",
          border: "2px solid",
          borderColor: "#F5C842", // gold-highlight (bright)
          boxShadow: "0 0 20px rgba(245, 200, 66, 0.7), 0 0 40px rgba(124, 58, 237, 0.4)",
        }}
      />
      
      {/* WARRIOR SHIELD — main ring (strong & bold) */}
      <motion.span
        className="fixed rounded-full"
        animate={{
          scale: active ? 1.8 : 1,
          rotate: active ? [0, 15, -15, 0] : 0,
          borderColor: active ? "#F5C842" : "#7C3AED",
        }}
        transition={{ duration: 0.25 }}
        style={{
          x: shieldX,
          y: shieldY,
          translateX: "-50%",
          translateY: "-50%",
          width: "38px",
          height: "38px",
          borderWidth: "2.5px",
          borderStyle: "solid",
          borderColor: "#7C3AED", // purple-electric
          backgroundColor: "rgba(124, 58, 237, 0.15)",
          boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
        }}
      />
      
      {/* WARRIOR CORE — bright center dot */}
      <motion.span
        className="fixed rounded-full"
        animate={{
          scale: active ? 1.5 : 1,
          backgroundColor: engagement ? "#FDE68A" : "#F5C842", // gold-pale or gold-highlight
          boxShadow: engagement 
            ? "0 0 20px rgba(245, 200, 66, 0.8)" 
            : "0 0 10px rgba(245, 200, 66, 0.5)",
        }}
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          width: "10px",
          height: "10px",
        }}
      />
    </div>
  );
}