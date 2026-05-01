import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          deep: "#1E1245",
          mid: "#2D1B69",
          vivid: "#4A2C9E",
          electric: "#7C3AED",
        },
        gold: {
          warm: "#C9910D",
          bright: "#E8A915",
          highlight: "#F5C842",
          pale: "#FDE68A",
        },
        dark: {
          bg: "#080514",
          surface: "#120D2E",
        },
        off: {
          white: "#F5F3FF",
          lavender: "#EDE8FF",
        },
        slate: "#6B6B8A",
        charcoal: "#1A1035",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-label)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: ["clamp(52px,6vw,88px)", { lineHeight: "1.08" }],
        h2: ["clamp(32px,4vw,52px)", { lineHeight: "1.15" }],
        h3: ["20px", { lineHeight: "1.35" }],
        label: ["11px", { lineHeight: "1", letterSpacing: "0.2em" }],
        stat: ["clamp(56px,7vw,96px)", { lineHeight: "1" }],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #080514 0%, #1E1245 50%, #080514 100%)",
        "dark-gradient": "linear-gradient(180deg, #080514 0%, #1E1245 100%)",
        "gold-gradient": "linear-gradient(135deg, #C9910D, #F5C842)",
        "purple-gradient": "linear-gradient(135deg, #2D1B69, #7C3AED)",
        "card-gradient":
          "linear-gradient(145deg, rgba(45,27,105,0.4), rgba(18,13,46,0.8))",
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-mid": "float 4s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse": "spinReverse 40s linear infinite",
        "glow-breathe": "glowBreathe 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 20px rgba(201,145,13,0.3)" },
          "50%": {
            boxShadow:
              "0 0 50px rgba(201,145,13,0.7), 0 0 80px rgba(201,145,13,0.3)",
          },
        },
        spinReverse: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        glowBreathe: {
          "0%,100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "purple-sm": "0 4px 20px rgba(74,44,158,0.25)",
        "purple-md": "0 8px 40px rgba(74,44,158,0.35)",
        "purple-lg": "0 20px 80px rgba(74,44,158,0.5)",
        "gold-sm": "0 4px 20px rgba(201,145,13,0.3)",
        "gold-md": "0 8px 40px rgba(201,145,13,0.4)",
        "gold-glow":
          "0 0 60px rgba(201,145,13,0.5), 0 0 120px rgba(201,145,13,0.2)",
        card: "0 1px 1px rgba(255,255,255,0.04), 0 4px 40px rgba(8,5,20,0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
