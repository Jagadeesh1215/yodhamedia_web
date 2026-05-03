"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiYoutube,
  SiInstagram,
  SiFacebook,
  SiLinkerd,
  //   SiAdobepremierepro, SiAdobeaftereffects,
  SiNotion,
  SiN8N,
  SiMake,
  SiOpenai,
  SiGooglegemini,
} from "react-icons/si";
import {
  IconAfterEffects,
  IconClaude,
  IconKling,
  IconMake,
  IconOpenArt,
  IconPixelApp,
} from "./floating-icons-hero";
import { Linkedin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────
   CUSTOM SVG ICONS — rendered inline inside each node box
   Each receives ({ size, color }) props.
───────────────────────────────────────────────────────────────────── */
const ClaudeIcon = ({ size = 16, color = "#c9910d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill={color}
      opacity="0.15"
    />
    <path
      d="M8 9.5C8 8.12 9.12 7 10.5 7h3C14.88 7 16 8.12 16 9.5v.5H8v-.5z"
      fill={color}
    />
    <rect x="8" y="10" width="8" height="1.5" rx="0.75" fill={color} />
    <path d="M9 13h6l-1 4H10l-1-4z" fill={color} />
  </svg>
);

const KlingIcon = ({ size = 16, color = "#7c3aed" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="4"
      width="14"
      height="16"
      rx="2"
      fill={color}
      opacity="0.2"
    />
    <rect
      x="2"
      y="4"
      width="14"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M16 9l6 3-6 3V9z" fill={color} />
    <line
      x1="6"
      y1="9"
      x2="11"
      y2="9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="12"
      x2="11"
      y2="12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="15"
      x2="9"
      y2="15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const OpenArtIcon = ({ size = 16, color = "#ec4899" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path
      d="M8 16c0-4 2-7 4-7s4 3 4 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="8" r="1.5" fill={color} />
    <path
      d="M9 13.5c.5-.5 1.5-.8 3-.8s2.5.3 3 .8"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const CameraIcon = ({ size = 16, color = "#0ea5e9" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="1.5" />
  </svg>
);

const ProductBoxIcon = ({ size = 16, color = "#10b981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 8l-9-5-9 5v8l9 5 9-5V8z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M3 8l9 5 9-5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line x1="12" y1="13" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
    <line
      x1="7.5"
      y1="5.5"
      x2="16.5"
      y2="10.5"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="1.5 1.5"
    />
  </svg>
);

const WWWIcon = ({ size = 16, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <line x1="2" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1.2" />
    <line x1="2" y1="15" x2="22" y2="15" stroke={color} strokeWidth="1.2" />
    <path
      d="M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const YMIcon = ({ size = 18, color = "#f5c842" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Ring */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="1.5"
      strokeOpacity="0.5"
    />

    {/* Stylized YM Monogram */}
    <path
      d="M7 8L12 13M17 8L12 13M12 13V20" // The "Y"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 20V12L9 16L12 12L15 16L19 12V20" // The "M" integrated into the base
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.8"
    />
  </svg>
);

const WebDesignIcon = ({ size = 16, color = "#06b6d4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <line x1="2" y1="7" x2="22" y2="7" stroke={color} strokeWidth="1.2" />
    <circle cx="4.5" cy="5" r="0.8" fill={color} />
    <circle cx="7" cy="5" r="0.8" fill={color} />
    <circle cx="9.5" cy="5" r="0.8" fill={color} />
    <line
      x1="8"
      y1="21"
      x2="16"
      y2="21"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
    <path
      d="M7 11h3M7 13.5h5M14 10l2 2-2 2"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PixelIcon = ({ size = 16, color = "#f472b6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="9"
      height="9"
      rx="1.5"
      fill={color}
      opacity="0.25"
      stroke={color}
      strokeWidth="1.2"
    />
    <rect
      x="13"
      y="2"
      width="9"
      height="9"
      rx="1.5"
      fill={color}
      opacity="0.5"
      stroke={color}
      strokeWidth="1.2"
    />
    <rect
      x="2"
      y="13"
      width="9"
      height="9"
      rx="1.5"
      fill={color}
      opacity="0.75"
      stroke={color}
      strokeWidth="1.2"
    />
    <rect
      x="13"
      y="13"
      width="9"
      height="9"
      rx="1.5"
      fill={color}
      stroke={color}
      strokeWidth="1.2"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────
   NODE MAP — 20 tools, each with SVG branch endpoint (cx, cy)
   ViewBox: 600 × 560
───────────────────────────────────────────────────────────────────── */
type IconProps = { size?: number; color?: string };
type Node = {
  label: string;
  color: string;
  cx: number;
  cy: number;
  delay: number;
  render: (p: IconProps) => JSX.Element;
};

const NODES: Node[] = [
  // ── APEX
  {
    label: "WWW",
    color: "#f59e0b",
    cx: 300,
    cy: 32,
    delay: 0.0,
    render: (p) => <WWWIcon {...p} color="#f59e0b" />,
  },
  // ── UPPER CANOPY
  {
    label: "YouTube",
    color: "#FF0000",
    cx: 180,
    cy: 72,
    delay: 0.04,
    render: (p) => <SiYoutube size={p.size} color="#FF0000" />,
  },
  {
    label: "Instagram",
    color: "#E4405F",
    cx: 420,
    cy: 72,
    delay: 0.04,
    render: (p) => <SiInstagram size={p.size} color="#E4405F" />,
  },
  // ── WIDE CANOPY
  {
    label: "Facebook",
    color: "#1877F2",
    cx: 76,
    cy: 130,
    delay: 0.08,
    render: (p) => <SiFacebook size={p.size} color="#1877F2" />,
  },
  {
    label: "LinkedIn",
    color: "#0A66C2",
    cx: 524,
    cy: 130,
    delay: 0.08,
    render: (p) => <Linkedin size={p.size} color="#0A66C2" />,
  },
  // ── MID-UPPER INNER
  {
    label: "ChatGPT",
    color: "#10a37f",
    cx: 208,
    cy: 150,
    delay: 0.12,
    render: (p) => <SiOpenai size={p.size} color="#10a37f" />,
  },
  {
    label: "Gemini",
    color: "#4285F4",
    cx: 392,
    cy: 150,
    delay: 0.12,
    render: (p) => <SiGooglegemini size={p.size} color="#4285F4" />,
  },
  // ── CREATIVE TOOLS
  {
    label: "Premiere Pro",
    color: "#9999FF",
    cx: 130,
    cy: 200,
    delay: 0.16,
    render: (p) => <IconKling color="#9999FF" />,
  },
  {
    label: "After Effects",
    color: "#9999FF",
    cx: 470,
    cy: 200,
    delay: 0.16,
    render: (p) => <IconAfterEffects color="#9999FF" />,
  },
  // ── AUTOMATION TIER
  {
    label: "N8N",
    color: "#ea4b71",
    cx: 56,
    cy: 268,
    delay: 0.2,
    render: (p) => <SiN8N size={p.size} color="#ea4b71" />,
  },
  {
    label: "Make",
    color: "#6d00cc",
    cx: 544,
    cy: 268,
    delay: 0.2,
    render: (p) => <IconMake color="#6d00cc" />,
  },
  // ── AI / CONTENT TOOLS
  {
    label: "Claude",
    color: "#c9910d",
    cx: 158,
    cy: 288,
    delay: 0.22,
    render: (p) => <IconClaude {...p} color="#c9910d" />,
  },
  {
    label: "Kling AI",
    color: "#7c3aed",
    cx: 442,
    cy: 288,
    delay: 0.22,
    render: (p) => <IconKling {...p} color="#7c3aed" />,
  },
  // ── PRODUCTIVITY / CREATIVE
  {
    label: "Notion",
    color: "#ffffff",
    cx: 110,
    cy: 336,
    delay: 0.26,
    render: (p) => <SiNotion size={p.size} color="#e5e5e5" />,
  },
  {
    label: "OpenArt",
    color: "#ec4899",
    cx: 490,
    cy: 336,
    delay: 0.26,
    render: (p) => <IconOpenArt {...p} color="#ec4899" />,
  },
  // ── LOWER TIER
  {
    label: "Camera",
    color: "#0ea5e9",
    cx: 176,
    cy: 388,
    delay: 0.28,
    render: (p) => <CameraIcon {...p} color="#0ea5e9" />,
  },
  {
    label: "Web Design",
    color: "#06b6d4",
    cx: 424,
    cy: 388,
    delay: 0.28,
    render: (p) => <WebDesignIcon {...p} color="#06b6d4" />,
  },
  // ── BASE
  {
    label: "Product Box",
    color: "#10b981",
    cx: 168,
    cy: 448,
    delay: 0.32,
    render: (p) => <ProductBoxIcon {...p} color="#10b981" />,
  },
  {
    label: "Pixel App",
    color: "#f472b6",
    cx: 432,
    cy: 448,
    delay: 0.32,
    render: (p) => <IconPixelApp {...p} color="#f472b6" />,
  },
  // ── ROOT
  {
    label: "Yodha Media",
    color: "#f59e0b",
    cx: 300,
    cy: 492,
    delay: 0.36,
    render: (p) => <YMIcon {...p} color="#f59e0b" />,
  },
];

/* ─────────────────────────────────────────────────────────────────────
   BRANCH PATHS — each endpoint aligns with a node cx/cy
───────────────────────────────────────────────────────────────────── */
const BRANCHES: { d: string; w: number; delay: number }[] = [
  // ── TRUNK (thick centre spine)
  { d: "M300 510 L300 310", w: 11, delay: 0.0 },
  // ── ROOTS SPLAY
  { d: "M300 510 Q270 516 240 512", w: 3.5, delay: 0.02 },
  { d: "M300 510 Q330 516 360 512", w: 3.5, delay: 0.02 },
  { d: "M300 510 L300 492", w: 5, delay: 0.01 }, // globe root
  // ── MAIN L1 off trunk
  { d: "M300 400 Q232 365 185 328", w: 7, delay: 0.08 },
  { d: "M300 400 Q368 365 415 328", w: 7, delay: 0.08 },
  // ── Lower branches off L1
  { d: "M186 330 Q182 360 176 388", w: 3, delay: 0.14 }, // camera
  { d: "M414 330 Q420 360 424 388", w: 3, delay: 0.14 }, // webdesign
  { d: "M176 388 Q172 418 168 448", w: 2.5, delay: 0.2 }, // product box
  { d: "M424 388 Q428 418 432 448", w: 2.5, delay: 0.2 }, // pixel
  // notion / openart off L1
  { d: "M186 330 Q150 332 110 336", w: 3, delay: 0.16 },
  { d: "M414 330 Q452 332 490 336", w: 3, delay: 0.16 },
  // n8n / make off notion/openart
  { d: "M110 336 Q84 302  56 268", w: 2.5, delay: 0.22 },
  { d: "M490 336 Q516 302 544 268", w: 2.5, delay: 0.22 },
  // ── L2 — centre spine continues up
  { d: "M300 310 L300 220", w: 6, delay: 0.1 },
  // claude / kling off L2
  { d: "M300 290 Q230 290 158 288", w: 3, delay: 0.18 },
  { d: "M300 290 Q370 290 442 288", w: 3, delay: 0.18 },
  // premiere / after effects
  { d: "M158 288 Q146 244 130 200", w: 2.5, delay: 0.22 },
  { d: "M442 288 Q456 244 470 200", w: 2.5, delay: 0.22 },
  // ── L3 — upper fork
  { d: "M300 220 Q258 188 210 152", w: 4, delay: 0.14 },
  { d: "M300 220 Q342 188 390 152", w: 4, delay: 0.14 },
  // chatgpt to premiere
  { d: "M210 152 Q172 176 130 200", w: 2, delay: 0.24 },
  // gemini to after effects
  { d: "M390 152 Q428 176 470 200", w: 2, delay: 0.24 },
  // facebook off youtube
  { d: "M180 72  Q130 100  76 130", w: 3, delay: 0.16 },
  // linkedin off instagram
  { d: "M420 72  Q472 100 524 130", w: 3, delay: 0.16 },
  // ── L4 — canopy upper
  { d: "M300 220 Q240 148 180 72", w: 3.5, delay: 0.12 },
  { d: "M300 220 Q360 148 420 72", w: 3.5, delay: 0.12 },
  // apex
  { d: "M300 220 L300 32", w: 2.5, delay: 0.14 },
];

/* ─── Leaf ellipses at natural branch joints ───────────────────── */
const LEAVES = [
  { cx: 96, cy: 148, rx: 14, ry: 7, a: -42 },
  { cx: 504, cy: 148, rx: 14, ry: 7, a: 42 },
  { cx: 148, cy: 270, rx: 13, ry: 6, a: -30 },
  { cx: 452, cy: 270, rx: 13, ry: 6, a: 30 },
  { cx: 194, cy: 360, rx: 12, ry: 6, a: -22 },
  { cx: 406, cy: 360, rx: 12, ry: 6, a: 22 },
  { cx: 240, cy: 118, rx: 11, ry: 5, a: -18 },
  { cx: 360, cy: 118, rx: 11, ry: 5, a: 18 },
  { cx: 206, cy: 52, rx: 10, ry: 5, a: -34 },
  { cx: 394, cy: 52, rx: 10, ry: 5, a: 34 },
  { cx: 160, cy: 178, rx: 10, ry: 5, a: -26 },
  { cx: 440, cy: 178, rx: 10, ry: 5, a: 26 },
  { cx: 126, cy: 310, rx: 11, ry: 5, a: -20 },
  { cx: 474, cy: 310, rx: 11, ry: 5, a: 20 },
  { cx: 270, cy: 440, rx: 10, ry: 5, a: -15 },
  { cx: 330, cy: 440, rx: 10, ry: 5, a: 15 },
];

const BOX = 38;
const HALF = BOX / 2;
const INNER = BOX - 16; // icon render size

export const GrowthTree = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      style={{ width: "100%", maxWidth: 620, margin: "0 auto" }}
      aria-label="Agency Growth Ecosystem"
    >
      <svg
        viewBox="0 0 600 528"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible" }}
        role="img"
      >
        <title>Agency Growth Ecosystem — 20 tools</title>

        {/* ── 1. BRANCHES ── */}
        {BRANCHES.map((b, i) => (
          <motion.path
            key={`b${i}`}
            d={b.d}
            stroke="#4a2810"
            strokeWidth={b.w}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.55, delay: b.delay, ease: "easeOut" }}
          />
        ))}

        {/* ── 2. LEAVES ── */}
        {LEAVES.map((l, i) => (
          <motion.ellipse
            key={`lf${i}`}
            cx={l.cx}
            cy={l.cy}
            rx={l.rx}
            ry={l.ry}
            fill="#4a7c50"
            fillOpacity="0.55"
            transform={`rotate(${l.a} ${l.cx} ${l.cy})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.48 + i * 0.03, duration: 0.3 }}
            style={{ transformOrigin: `${l.cx}px ${l.cy}px` }}
          />
        ))}

        {/* ── 3. ICON NODES ── */}
        {NODES.map((node, i) => {
          const isOn = active === i;

          return (
            <motion.g
              key={`nd${i}`}
              style={{
                transformOrigin: `${node.cx}px ${node.cy}px`,
                cursor: "pointer",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: 0.72 + node.delay,
                type: "spring",
                stiffness: 320,
                damping: 20,
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Outer glow on hover */}
              <motion.rect
                x={node.cx - HALF - 5}
                y={node.cy - HALF - 5}
                width={BOX + 10}
                height={BOX + 10}
                rx="14"
                fill={node.color}
                animate={{ opacity: isOn ? 0.2 : 0 }}
                transition={{ duration: 0.15 }}
              />

              {/* Main icon box */}
              <motion.rect
                x={node.cx - HALF}
                y={node.cy - HALF}
                width={BOX}
                height={BOX}
                rx="10"
                fill="var(--bg-panel, #111111)"
                stroke={node.color}
                animate={{
                  strokeWidth: isOn ? 1.8 : 0.8,
                  strokeOpacity: isOn ? 1 : 0.35,
                }}
                transition={{ duration: 0.15 }}
              />

              {/* Subtle inner fill tint */}
              <rect
                x={node.cx - HALF + 1}
                y={node.cy - HALF + 1}
                width={BOX - 2}
                height={BOX - 2}
                rx="9"
                fill={node.color}
                fillOpacity="0.06"
              />

              {/* Icon via foreignObject */}
              <foreignObject
                x={node.cx - INNER / 2}
                y={node.cy - INNER / 2}
                width={INNER}
                height={INNER}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {node.render({ size: 15, color: node.color })}
                </div>
              </foreignObject>

              {/* Tooltip */}
              {isOn && (
                <g>
                  {/* Stem */}
                  <line
                    x1={node.cx}
                    y1={node.cy - HALF - 2}
                    x2={node.cx}
                    y2={node.cy - HALF - 10}
                    stroke={node.color}
                    strokeWidth="0.75"
                    opacity="0.6"
                  />
                  {/* Pill */}
                  <rect
                    x={node.cx - 42}
                    y={node.cy - HALF - 30}
                    width={84}
                    height={20}
                    rx="10"
                    fill="var(--bg-panel, #111111)"
                    stroke={node.color}
                    strokeWidth="0.75"
                  />
                  <rect
                    x={node.cx - 42 + 1}
                    y={node.cy - HALF - 30 + 1}
                    width={82}
                    height={18}
                    rx="9.5"
                    fill={node.color}
                    fillOpacity="0.1"
                  />
                  <text
                    x={node.cx}
                    y={node.cy - HALF - 16}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="500"
                    fill={node.color}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.4"
                  >
                    {node.label}
                  </text>
                </g>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Legend strip */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 6,
        }}
      >
        {[
          { label: "Social", color: "#1877F2" },
          { label: "AI", color: "#10a37f" },
          { label: "Creative", color: "#9999FF" },
          { label: "Automation", color: "#ea4b71" },
          { label: "Web", color: "#06b6d4" },
        ].map((cat) => (
          <span
            key={cat.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              color: "var(--text-muted, #888)",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.3px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: cat.color,
                display: "inline-block",
              }}
            />
            {cat.label}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 }}
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "var(--text-muted, #777)",
          letterSpacing: "0.4px",
          margin: "4px 0 0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Tools powering your growth ecosystem
      </motion.p>
    </div>
  );
};
