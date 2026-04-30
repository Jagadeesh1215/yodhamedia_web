"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DemoIcon } from "../floating-icons-demo";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

export interface FloatingIconsHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: DemoIcon[];
  children?: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Size map
───────────────────────────────────────────── */

const SIZE = {
  sm: { outer: 48, inner: 24 },
  md: { outer: 58, inner: 28 },
  lg: { outer: 68, inner: 34 },
} as const;

/* ─────────────────────────────────────────────
   Single floating icon — desktop (absolute)
───────────────────────────────────────────── */

const DesktopIcon = ({
  iconData,
  index,
  mouseX,
  mouseY,
}: {
  iconData: DemoIcon;
  index: number;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  const sz = SIZE[iconData.size ?? "md"];

  React.useEffect(() => {
    const onMove = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mouseX.current - cx;
      const dy = mouseY.current - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 140;
      if (dist < radius) {
        const angle = Math.atan2(dy, dx);
        const force = ((1 - dist / radius) * 55);
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, mouseX, mouseY]);

  // Unique float params per icon
  const floatY   = [0, -10, 0, 10, 0];
  const floatX   = [0, 6, 0, -6, 0];
  const floatRot = [0, 4, 0, -4, 0];
  const dur      = 4.5 + (index % 5) * 0.7;

  return (
    <motion.div
      ref={ref}
      className="absolute hidden md:flex"
      style={{
        left: `${iconData.desktop.left}%`,
        top:  `${iconData.desktop.top}%`,
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex items-center justify-center rounded-2xl border border-white/10 backdrop-blur-sm cursor-default select-none"
        style={{
          width:      sz.outer,
          height:     sz.outer,
          background: iconData.bgColor,
          boxShadow:  `0 0 18px ${iconData.glowColor}, 0 4px 14px rgba(0,0,0,0.35)`,
        }}
        animate={{ y: floatY, x: floatX, rotate: floatRot }}
        transition={{ duration: dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        whileHover={{ scale: 1.18, boxShadow: `0 0 28px ${iconData.glowColor}, 0 6px 20px rgba(0,0,0,0.4)` }}
      >
        <iconData.icon
          style={{ width: sz.inner, height: sz.inner }}
          className="shrink-0"
        />
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Mobile icon strip (scrollable row at bottom)
───────────────────────────────────────────── */

const MobileIconStrip = ({ icons }: { icons: DemoIcon[] }) => {
  // Show only 12 most important on mobile, sorted by mobileOrder
  const sorted = [...icons].sort((a, b) => a.mobileOrder - b.mobileOrder).slice(0, 12);

  return (
    <div className="flex md:hidden w-full overflow-x-auto gap-3 pb-1 px-1 scrollbar-hide">
      {sorted.map((icon, i) => (
        <motion.div
          key={icon.id}
          className="flex flex-col items-center gap-1 flex-shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="flex items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm"
            style={{
              width:      44,
              height:     44,
              background: icon.bgColor,
              boxShadow:  `0 0 12px ${icon.glowColor}`,
            }}
          >
            <icon.icon style={{ width: 22, height: 22 }} className="shrink-0" />
          </div>
          <span className="text-[9px] text-white/40 leading-none">{icon.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Edge icon strips — narrow columns left/right
   visible on tablet (md) to avoid overlap
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, children, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* ── Desktop floating icons ── */}
      <div className="absolute inset-0 pointer-events-none">
        {icons.map((icon, i) => (
          <DesktopIcon
            key={icon.id}
            iconData={icon}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* ── Foreground content slot ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>

      {/* ── Mobile icon strip pinned at bottom of section ── */}
      <div className="relative z-10 mt-8 w-full max-w-sm px-4 md:hidden">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 text-center">
          Powered by
        </p>
        <MobileIconStrip icons={icons} />
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = "FloatingIconsHero";

export { FloatingIconsHero };