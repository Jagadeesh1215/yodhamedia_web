"use client";

import {
  SiYoutube,
  SiFacebook,
  SiInstagram,
  SiNotion,
  SiN8N,
  SiOpenai,
  // SiLinkedin,
  SiTiktok,
  SiWhatsapp,
  SiGoogleads,
} from "react-icons/si";

import { Camera, Globe, Linkedin, BarChart2 } from "lucide-react";

/* ---------- wrap helper ---------- */

const wrap = (Icon: any, name: string, color?: string) => {
  const W = (props: any) => (
    <Icon {...props} size={props.size ?? 20} style={{ color: color ?? "currentColor" }} />
  );
  W.displayName = name;
  return W;
};

/* ---------- Custom SVG icons ---------- */

const IconClaude = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#D97706" />
    <path
      d="M24 10C16.268 10 10 16.268 10 24s6.268 14 14 14 14-6.268 14-14S31.732 10 24 10zm0 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4a6 6 0 1 0 0 12A6 6 0 0 0 24 18z"
      fill="white"
      fillOpacity="0.9"
    />
    <circle cx="24" cy="24" r="3" fill="white" />
  </svg>
);

const IconGemini = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="url(#gem-bg)" />
    <defs>
      <linearGradient id="gem-bg" x1="0" y1="0" x2="48" y2="48">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* Gemini star shape */}
    <path
      d="M24 8 C24 8 24 20 16 24 C24 28 24 40 24 40 C24 40 24 28 32 24 C24 20 24 8 24 8Z"
      fill="white"
      fillOpacity="0.95"
    />
  </svg>
);

const IconKling = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#0F172A" />
    <path d="M16 12v24M16 24l12-12M16 24l12 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="12" r="3" fill="#7C3AED" />
    <circle cx="32" cy="36" r="3" fill="#C9910D" />
  </svg>
);

const IconOpenArt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#1E1B4B" />
    <circle cx="16" cy="24" r="5" stroke="white" strokeWidth="2" />
    <circle cx="32" cy="24" r="5" stroke="white" strokeWidth="2" />
    <path d="M21 24h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 10v4M32 10v4M16 34v4M32 34v4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

const IconMake = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#6E3FF3" />
    <circle cx="14" cy="24" r="4" fill="white" />
    <circle cx="34" cy="14" r="4" fill="white" />
    <circle cx="34" cy="34" r="4" fill="white" />
    <path d="M18 24h6M28 14l-8 8M28 34l-8-8" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconPremiere = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#2D0064" />
    <text x="8" y="32" fontFamily="Georgia, serif" fontWeight="900" fontSize="22" fill="#9999FF" letterSpacing="-1">Pr</text>
  </svg>
);

const IconAfterEffects = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#1A005C" />
    <text x="7" y="32" fontFamily="Georgia, serif" fontWeight="900" fontSize="22" fill="#9999FF" letterSpacing="-1">Ae</text>
  </svg>
);

const IconWWW = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#1D4ED8" />
    <text x="5" y="33" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="17" fill="white">www</text>
  </svg>
);

/* ---------- ICON ENTRIES ---------- */
/* 
  Position system:
  - col: 0-12 grid column (out of 12)
  - row: 0-8 grid row  (out of 8)
  - These are converted to % in the component
  
  Layout zones (avoid center 3-9 col, 2-6 row = hero text):
  - Corners: (0-2,0-1), (10-12,0-1), (0-2,7-8), (10-12,7-8)
  - Edges mid: (0-1,3-5), (11-12,3-5), (3-9,0), (3-9,8)
*/

export type DemoIcon = {
  id: number;
  icon: React.ComponentType<any>;
  label: string;
  // desktop position (% from left, % from top)
  desktop: { left: number; top: number };
  // mobile: shown in a bottom row, order index
  mobileOrder: number;
  size?: "sm" | "md" | "lg";
  bgColor: string;
  glowColor: string;
};

export const demoIcons: DemoIcon[] = [
  // ── Social ────────────────────────────────
  {
    id: 1,
    icon: wrap(SiYoutube, "YouTube", "#FF0000"),
    label: "YouTube",
    desktop: { left: 5, top: 8 },
    mobileOrder: 0,
    size: "lg",
    bgColor: "rgba(255,0,0,0.12)",
    glowColor: "rgba(255,0,0,0.3)",
  },
  {
    id: 2,
    icon: wrap(SiFacebook, "Facebook", "#1877F2"),
    label: "Facebook",
    desktop: { left: 88, top: 12 },
    mobileOrder: 1,
    size: "lg",
    bgColor: "rgba(24,119,242,0.12)",
    glowColor: "rgba(24,119,242,0.3)",
  },
  {
    id: 3,
    icon: wrap(SiInstagram, "Instagram", "#E4405F"),
    label: "Instagram",
    desktop: { left: 4, top: 65 },
    mobileOrder: 2,
    size: "lg",
    bgColor: "rgba(228,64,95,0.12)",
    glowColor: "rgba(228,64,95,0.3)",
  },
  {
    id: 4,
    icon: wrap(Linkedin, "LinkedIn", "#0A66C2"),
    label: "LinkedIn",
    desktop: { left: 87, top: 70 },
    mobileOrder: 3,
    size: "lg",
    bgColor: "rgba(10,102,194,0.12)",
    glowColor: "rgba(10,102,194,0.3)",
  },
  {
    id: 5,
    icon: wrap(SiTiktok, "TikTok", "#ffffff"),
    label: "TikTok",
    desktop: { left: 14, top: 38 },
    mobileOrder: 4,
    size: "md",
    bgColor: "rgba(255,255,255,0.08)",
    glowColor: "rgba(255,255,255,0.2)",
  },
  {
    id: 6,
    icon: wrap(SiWhatsapp, "WhatsApp", "#25D366"),
    label: "WhatsApp",
    desktop: { left: 83, top: 40 },
    mobileOrder: 5,
    size: "md",
    bgColor: "rgba(37,211,102,0.12)",
    glowColor: "rgba(37,211,102,0.3)",
  },

  // ── Adobe ────────────────────────────────
  {
    id: 7,
    icon: IconPremiere,
    label: "Premiere",
    desktop: { left: 22, top: 5 },
    mobileOrder: 6,
    size: "md",
    bgColor: "rgba(153,153,255,0.1)",
    glowColor: "rgba(153,153,255,0.25)",
  },
  {
    id: 8,
    icon: IconAfterEffects,
    label: "After Effects",
    desktop: { left: 72, top: 6 },
    mobileOrder: 7,
    size: "md",
    bgColor: "rgba(153,153,255,0.1)",
    glowColor: "rgba(153,153,255,0.25)",
  },

  // ── Productivity ─────────────────────────
  {
    id: 9,
    icon: wrap(SiNotion, "Notion", "#ffffff"),
    label: "Notion",
    desktop: { left: 8, top: 82 },
    mobileOrder: 8,
    size: "sm",
    bgColor: "rgba(255,255,255,0.07)",
    glowColor: "rgba(255,255,255,0.15)",
  },
  {
    id: 10,
    icon: wrap(SiN8N, "n8n", "#FF6D5A"),
    label: "n8n",
    desktop: { left: 85, top: 83 },
    mobileOrder: 9,
    size: "sm",
    bgColor: "rgba(255,109,90,0.1)",
    glowColor: "rgba(255,109,90,0.25)",
  },
  {
    id: 11,
    icon: IconMake,
    label: "Make",
    desktop: { left: 46, top: 90 },
    mobileOrder: 10,
    size: "sm",
    bgColor: "rgba(110,63,243,0.12)",
    glowColor: "rgba(110,63,243,0.3)",
  },

  // ── AI ───────────────────────────────────
  {
    id: 12,
    icon: wrap(SiOpenai, "ChatGPT", "#10A37F"),
    label: "ChatGPT",
    desktop: { left: 80, top: 55 },
    mobileOrder: 11,
    size: "md",
    bgColor: "rgba(16,163,127,0.12)",
    glowColor: "rgba(16,163,127,0.3)",
  },
  {
    id: 13,
    icon: IconClaude,
    label: "Claude",
    desktop: { left: 6, top: 50 },
    mobileOrder: 12,
    size: "md",
    bgColor: "rgba(217,119,6,0.12)",
    glowColor: "rgba(217,119,6,0.3)",
  },
  {
    id: 14,
    icon: IconGemini,
    label: "Gemini",
    desktop: { left: 50, top: 4 },
    mobileOrder: 13,
    size: "md",
    bgColor: "rgba(139,92,246,0.12)",
    glowColor: "rgba(139,92,246,0.3)",
  },
  {
    id: 15,
    icon: IconOpenArt,
    label: "OpenArt",
    desktop: { left: 74, top: 28 },
    mobileOrder: 14,
    size: "sm",
    bgColor: "rgba(30,27,75,0.3)",
    glowColor: "rgba(99,102,241,0.2)",
  },
  {
    id: 16,
    icon: IconKling,
    label: "Kling",
    desktop: { left: 22, top: 80 },
    mobileOrder: 15,
    size: "sm",
    bgColor: "rgba(15,23,42,0.4)",
    glowColor: "rgba(124,58,237,0.2)",
  },

  // ── Tools ────────────────────────────────
  {
    id: 17,
    icon: IconWWW,
    label: "Web",
    desktop: { left: 37, top: 88 },
    mobileOrder: 16,
    size: "sm",
    bgColor: "rgba(29,78,216,0.12)",
    glowColor: "rgba(29,78,216,0.3)",
  },
  {
    id: 18,
    icon: wrap(Globe, "Globe", "#60a5fa"),
    label: "SEO",
    desktop: { left: 18, top: 18 },
    mobileOrder: 17,
    size: "sm",
    bgColor: "rgba(96,165,250,0.1)",
    glowColor: "rgba(96,165,250,0.2)",
  },
  {
    id: 19,
    icon: wrap(BarChart2, "Analytics", "#a78bfa"),
    label: "Analytics",
    desktop: { left: 62, top: 88 },
    mobileOrder: 18,
    size: "sm",
    bgColor: "rgba(167,139,250,0.1)",
    glowColor: "rgba(167,139,250,0.2)",
  },
  {
    id: 20,
    icon: wrap(SiGoogleads, "Google Ads", "#4285F4"),
    label: "Google Ads",
    desktop: { left: 27, top: 92 },
    mobileOrder: 19,
    size: "sm",
    bgColor: "rgba(66,133,244,0.12)",
    glowColor: "rgba(66,133,244,0.3)",
  },
];