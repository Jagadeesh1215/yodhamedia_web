"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Camera,
  Globe,
  Linkedin,
  Package,
  LayoutTemplate,
  AppWindow,
} from "lucide-react";
import {
  SiYoutube,
  SiFacebook,
  SiInstagram,
  SiNotion,
  SiN8N,
  SiOpenai,
} from "react-icons/si";
import { cn } from "@/lib/utils";

/* ---------------- types ---------------- */

export type DemoIcon = {
  id: number;
  icon: React.ComponentType<any>;
  label: string;
  desktop: { left: number; top: number };
  mobileOrder: number;
  size?: "sm" | "md" | "lg";
  bgColor: string;
  glowColor: string;
};

interface FloatingIconsHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icons: DemoIcon[];
  children?: React.ReactNode;
}

/* ---------------- helpers ---------------- */

const wrap = (Icon: any, name: string, color?: string) => {
  const W = (props: any) => (
    <Icon
      {...props}
      size={props.size ?? 20}
      style={{ color: color ?? "currentColor" }}
    />
  );
  W.displayName = name;
  return W;
};

const SIZE = {
  sm: { outer: 46, inner: 22 },
  md: { outer: 58, inner: 28 },
  lg: { outer: 70, inner: 34 },
} as const;

/* ---------------- custom icons ---------------- */

const IconClaude = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#D97706" />
    <path
      d="M24 10C16.268 10 10 16.268 10 24s6.268 14 14 14 14-6.268 14-14S31.732 10 24 10zm0 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4a6 6 0 1 0 0 12A6 6 0 0 0 24 18z"
      fill="white"
      fillOpacity="0.92"
    />
    <circle cx="24" cy="24" r="3" fill="white" />
  </svg>
);

const IconGemini = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="url(#gem)" />
    <defs>
      <linearGradient id="gem" x1="0" y1="0" x2="48" y2="48">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      d="M24 8C24 8 24 20 16 24C24 28 24 40 24 40C24 40 24 28 32 24C24 20 24 8 24 8Z"
      fill="white"
    />
  </svg>
);

const IconKling = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#0F172A" />
    <path
      d="M16 12v24M16 24l12-12M16 24l12 12"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="12" r="3" fill="#7C3AED" />
    <circle cx="32" cy="36" r="3" fill="#C9910D" />
  </svg>
);

const IconOpenArt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#1E1B4B" />
    <circle cx="16" cy="24" r="5" stroke="white" strokeWidth="2" />
    <circle cx="32" cy="24" r="5" stroke="white" strokeWidth="2" />
    <path d="M21 24h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconMake = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#6E3FF3" />
    <circle cx="14" cy="24" r="4" fill="white" />
    <circle cx="34" cy="14" r="4" fill="white" />
    <circle cx="34" cy="34" r="4" fill="white" />
    <path d="M18 24h6M28 14l-8 8M28 34l-8-8" stroke="white" strokeWidth="2" />
  </svg>
);

const IconPremiere = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#2D0064" />
    <text x="8" y="32" fontSize="22" fontWeight="900" fill="#9999FF">Pr</text>
  </svg>
);

const IconAfterEffects = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#1A005C" />
    <text x="7" y="32" fontSize="22" fontWeight="900" fill="#9999FF">Ae</text>
  </svg>
);

const IconWWW = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#1D4ED8" />
    <text x="5" y="32" fontSize="16" fontWeight="900" fill="white">WWW</text>
  </svg>
);

const IconPixelApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#0F172A" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="#A855F7" />
    <rect x="21" y="13" width="8" height="8" rx="2" fill="#EAB308" />
    <rect x="29" y="13" width="8" height="8" rx="2" fill="#38BDF8" />
    <rect x="13" y="21" width="8" height="8" rx="2" fill="#22C55E" />
    <rect x="21" y="21" width="8" height="8" rx="2" fill="white" />
    <rect x="29" y="21" width="8" height="8" rx="2" fill="#F43F5E" />
  </svg>
);

/* ---------------- icon list ---------------- */

export const demoIcons: DemoIcon[] = [
  {
    id: 1,
    icon: wrap(SiYoutube, "YouTube", "#FF0000"),
    label: "YouTube",
    desktop: { left: 8, top: 12 },
    mobileOrder: 0,
    size: "lg",
    bgColor: "rgba(255,0,0,0.12)",
    glowColor: "rgba(255,0,0,0.28)",
  },
  {
    id: 2,
    icon: wrap(SiFacebook, "Facebook", "#1877F2"),
    label: "Facebook",
    desktop: { left: 90, top: 14 },
    mobileOrder: 1,
    size: "lg",
    bgColor: "rgba(24,119,242,0.12)",
    glowColor: "rgba(24,119,242,0.28)",
  },
  {
    id: 3,
    icon: wrap(SiInstagram, "Instagram", "#E4405F"),
    label: "Instagram",
    desktop: { left: 8, top: 68 },
    mobileOrder: 2,
    size: "lg",
    bgColor: "rgba(228,64,95,0.12)",
    glowColor: "rgba(228,64,95,0.28)",
  },
  {
    id: 4,
    icon: wrap(Linkedin, "LinkedIn", "#0A66C2"),
    label: "LinkedIn",
    desktop: { left: 90, top: 70 },
    mobileOrder: 3,
    size: "lg",
    bgColor: "rgba(10,102,194,0.12)",
    glowColor: "rgba(10,102,194,0.28)",
  },
  {
    id: 5,
    icon: IconPremiere,
    label: "Premiere Pro",
    desktop: { left: 18, top: 24 },
    mobileOrder: 4,
    size: "md",
    bgColor: "rgba(153,153,255,0.10)",
    glowColor: "rgba(153,153,255,0.24)",
  },
  {
    id: 6,
    icon: IconAfterEffects,
    label: "After Effects",
    desktop: { left: 82, top: 26 },
    mobileOrder: 5,
    size: "md",
    bgColor: "rgba(153,153,255,0.10)",
    glowColor: "rgba(153,153,255,0.24)",
  },
  {
    id: 7,
    icon: wrap(SiNotion, "Notion", "#ffffff"),
    label: "Notion",
    desktop: { left: 14, top: 84 },
    mobileOrder: 6,
    size: "sm",
    bgColor: "rgba(255,255,255,0.08)",
    glowColor: "rgba(255,255,255,0.16)",
  },
  {
    id: 8,
    icon: wrap(SiN8N, "n8n", "#FF6D5A"),
    label: "n8n",
    desktop: { left: 86, top: 84 },
    mobileOrder: 7,
    size: "sm",
    bgColor: "rgba(255,109,90,0.10)",
    glowColor: "rgba(255,109,90,0.22)",
  },
  {
    id: 9,
    icon: IconMake,
    label: "Make",
    desktop: { left: 33, top: 90 },
    mobileOrder: 8,
    size: "sm",
    bgColor: "rgba(110,63,243,0.12)",
    glowColor: "rgba(110,63,243,0.24)",
  },
  {
    id: 10,
    icon: wrap(SiOpenai, "ChatGPT", "#10A37F"),
    label: "ChatGPT",
    desktop: { left: 78, top: 54 },
    mobileOrder: 9,
    size: "md",
    bgColor: "rgba(16,163,127,0.12)",
    glowColor: "rgba(16,163,127,0.24)",
  },
  {
    id: 11,
    icon: IconClaude,
    label: "Claude",
    desktop: { left: 10, top: 52 },
    mobileOrder: 10,
    size: "md",
    bgColor: "rgba(217,119,6,0.12)",
    glowColor: "rgba(217,119,6,0.24)",
  },
  {
    id: 12,
    icon: IconGemini,
    label: "Gemini",
    desktop: { left: 50, top: 8 },
    mobileOrder: 11,
    size: "md",
    bgColor: "rgba(139,92,246,0.12)",
    glowColor: "rgba(139,92,246,0.24)",
  },
  {
    id: 13,
    icon: IconKling,
    label: "Kling",
    desktop: { left: 22, top: 76 },
    mobileOrder: 12,
    size: "sm",
    bgColor: "rgba(15,23,42,0.30)",
    glowColor: "rgba(124,58,237,0.22)",
  },
  {
    id: 14,
    icon: IconOpenArt,
    label: "OpenArt",
    desktop: { left: 76, top: 32 },
    mobileOrder: 13,
    size: "sm",
    bgColor: "rgba(30,27,75,0.28)",
    glowColor: "rgba(99,102,241,0.20)",
  },
  {
    id: 15,
    icon: wrap(Camera, "Camera", "#F8FAFC"),
    label: "Camera",
    desktop: { left: 23, top: 14 },
    mobileOrder: 14,
    size: "sm",
    bgColor: "rgba(255,255,255,0.08)",
    glowColor: "rgba(255,255,255,0.18)",
  },
  {
    id: 16,
    icon: wrap(Package, "Package", "#F59E0B"),
    label: "Product Box",
    desktop: { left: 68, top: 88 },
    mobileOrder: 15,
    size: "sm",
    bgColor: "rgba(245,158,11,0.10)",
    glowColor: "rgba(245,158,11,0.22)",
  },
  {
    id: 17,
    icon: IconWWW,
    label: "WWW",
    desktop: { left: 45, top: 92 },
    mobileOrder: 16,
    size: "sm",
    bgColor: "rgba(29,78,216,0.12)",
    glowColor: "rgba(29,78,216,0.24)",
  },
  {
    id: 18,
    icon: wrap(LayoutTemplate, "Webdesign", "#A78BFA"),
    label: "Webdesign",
    desktop: { left: 57, top: 86 },
    mobileOrder: 17,
    size: "sm",
    bgColor: "rgba(167,139,250,0.10)",
    glowColor: "rgba(167,139,250,0.22)",
  },
  {
    id: 19,
    icon: wrap(Globe, "Globe", "#60A5FA"),
    label: "Globe",
    desktop: { left: 18, top: 40 },
    mobileOrder: 18,
    size: "sm",
    bgColor: "rgba(96,165,250,0.10)",
    glowColor: "rgba(96,165,250,0.22)",
  },
  {
    id: 20,
    icon: IconPixelApp,
    label: "Pixel App",
    desktop: { left: 84, top: 42 },
    mobileOrder: 19,
    size: "sm",
    bgColor: "rgba(168,85,247,0.10)",
    glowColor: "rgba(168,85,247,0.22)",
  },
];

/* ---------------- desktop icon ---------------- */

function DesktopIcon({
  iconData,
  index,
  mouseX,
  mouseY,
}: {
  iconData: DemoIcon;
  index: number;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });

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
      const radius = 160;

      if (dist < radius) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / radius) * 36;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, x, y]);

  const floatY = [0, -8, 0, 8, 0];
  const floatX = [0, 4, 0, -4, 0];
  const floatRot = [0, 3, 0, -3, 0];
  const dur = 5 + (index % 4) * 0.8;

  return (
    <motion.div
      ref={ref}
      className="absolute hidden lg:flex"
      style={{
        left: `${iconData.desktop.left}%`,
        top: `${iconData.desktop.top}%`,
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md"
        style={{
          width: sz.outer,
          height: sz.outer,
          background: iconData.bgColor,
          boxShadow: `0 0 20px ${iconData.glowColor}, 0 8px 20px rgba(0,0,0,0.22)`,
        }}
        animate={{ y: floatY, x: floatX, rotate: floatRot }}
        transition={{ duration: dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
      >
        <iconData.icon style={{ width: sz.inner, height: sz.inner }} />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- tablet rails ---------------- */

function TabletIconRails({ icons }: { icons: DemoIcon[] }) {
  const left = icons.filter((_, i) => i % 2 === 0).slice(0, 5);
  const right = icons.filter((_, i) => i % 2 !== 0).slice(0, 5);

  return (
    <div className="hidden md:flex lg:hidden absolute inset-0 pointer-events-none">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {left.map((icon) => (
          <div
            key={icon.id}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 backdrop-blur-md"
            style={{ background: icon.bgColor, boxShadow: `0 0 14px ${icon.glowColor}` }}
          >
            <icon.icon className="h-5 w-5" />
          </div>
        ))}
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {right.map((icon) => (
          <div
            key={icon.id}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 backdrop-blur-md"
            style={{ background: icon.bgColor, boxShadow: `0 0 14px ${icon.glowColor}` }}
          >
            <icon.icon className="h-5 w-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- mobile strip ---------------- */

const MOBILE_SIZE = {
  sm: { outer: 34, inner: 16 },
  md: { outer: 40, inner: 18 },
  lg: { outer: 46, inner: 22 },
} as const;

const MobileFloatingIcons = ({ icons }: { icons: DemoIcon[] }) => {
  const mobileIcons = [...icons]
    .sort((a, b) => a.mobileOrder - b.mobileOrder)
    .slice(0, 8);

  const mobilePositions = [
    { left: "12%", top: "10%" },
    { left: "88%", top: "12%" },
    { left: "8%", top: "32%" },
    { left: "92%", top: "35%" },
    { left: "15%", top: "58%" },
    { left: "85%", top: "62%" },
    { left: "25%", top: "85%" },
    { left: "75%", top: "88%" },
  ];

  return (
    <div className="absolute inset-0 md:hidden pointer-events-none z-0">
      {mobileIcons.map((icon, i) => {
        const sz = MOBILE_SIZE[icon.size ?? "md"];
        const pos = mobilePositions[i % mobilePositions.length];

        return (
          <motion.div
            key={icon.id}
            className="absolute flex items-center justify-center"
            style={{
              left: pos.left,
              top: pos.top,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0, 6, 0],
              x: [0, 3, 0, -3, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              opacity: { delay: i * 0.06, duration: 0.35 },
              scale: { delay: i * 0.06, duration: 0.35 },
              y: { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 4.8 + i * 0.25, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5.2 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="flex items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm"
              style={{
                width: sz.outer,
                height: sz.outer,
                background: icon.bgColor,
                boxShadow: `0 0 10px ${icon.glowColor}, 0 4px 12px rgba(0,0,0,0.22)`,
              }}
            >
              <icon.icon
                style={{ width: sz.inner, height: sz.inner }}
                className="shrink-0"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ---------------- wrapper ---------------- */

export const FloatingIconsHero = React.forwardRef<HTMLDivElement, FloatingIconsHeroProps>(
  ({ className, icons, children, ...props }, ref) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Desktop floating icons */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
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

        {/* Tablet side rails */}
        <TabletIconRails icons={icons} />

        {/* Mobile floating icons */}
        <MobileFloatingIcons icons={icons} />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    );
  }
);

FloatingIconsHero.displayName = "FloatingIconsHero";
