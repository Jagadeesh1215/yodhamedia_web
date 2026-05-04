"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Cpu,
  Hospital,
  Layers,
  Minus,
  Plus,
  Quote,
  Radio,
  Repeat,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { BlogPost } from "@/lib/blog/types";
import { industries, stats } from "@/lib/constants/site";
import { services } from "@/lib/constants/services";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero";
import { demoIcons } from "@/components/ui/floating-icons-hero";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-24 pb-16 sm:px-4 sm:pt-32 sm:pb-24">
      {/* 🔥 Scaled floating background hero */}
      <div className="absolute inset-0 z-0 opacity-35 sm:opacity-55 lg:opacity-80">
        <FloatingIconsHero icons={demoIcons} className="!bg-transparent" />
      </div>

      {/* 🔥 Soft radial gradients */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_25%,rgba(124,58,237,0.10),transparent_38%),radial-gradient(circle_at_50%_78%,rgba(245,200,66,0.08),transparent_35%)]" />

      {/* 🔥 Readability overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-background/70 sm:bg-background/58 lg:bg-background/46" />

      {/* 🔥 Content */}
      <div className="relative z-30 mx-auto max-w-5xl text-center">
        <div className="relative group inline-flex items-center justify-center p-[1.5px] overflow-hidden rounded-full animate-float-slow shadow-purple-md">
          {/* 1. The Rotating "Aura" Border */}
          <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E8A915_0%,#1E1245_25%,#7C3AED_50%,#1E1245_75%,#E8A915_100%)]" />

          {/* 2. The Deep Purple Core */}
          <div className="relative flex items-center gap-3 rounded-full bg-purple-deep/95 px-5 py-2 backdrop-blur-xl">
            {/* 4. The Shimmering Gold Text */}
            <span className="animate-shimmer bg-gradient-to-r from-gold-warm via-gold-pale to-gold-warm bg-[length:200%_auto] bg-clip-text text-xs md:text-label text-white md:font-medium uppercase md:tracking-[0.2em] text-transparent">
              AI-driven digital growth
            </span>
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold leading-tight text-foreground sm:mt-8 sm:text-5xl md:text-7xl ">
          We Build <br />
          <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text  text-transparent">
            Digital Growth Systems
          </span>{" "}
          <br />
          for Modern Businesses
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:text-[17px] sm:leading-8">
          From content to conversions - we design, manage, and scale your
          digital presence with precision and performance.
        </p>

        <p className="mx-auto mt-3 max-w-lg text-xs text-muted-foreground/70 sm:text-xs leading-3">
          Serving hospitals, doctors, and businesses with structured digital
          solutions that drive visibility, trust, and measurable growth.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <MagneticButton>
            <ConsultationModal />
          </MagneticButton>
          <Button variant="outline">Explore Services</Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground sm:mt-10 sm:gap-8 sm:text-sm">
          {["50+ Clients", "100+ Projects", "5+ Industries"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-amber-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    "Trusted by 50+ Hospitals & Clinics",
    "100+ Projects Delivered",
    "Social Media Management",
    "Healthcare Marketing Experts",
    "Online Reputation Management",
    "Web Design & Development",
    "Performance-Driven Marketing",
    "Influencer Marketing Network",
  ];
  return (
    <div className="surface-band border-y-purple-electric/70 border-y">
      <div className=" overflow-hidden px-0 py-3">
        <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
          {[...items, ...items].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="font-label text-[18px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              {item} <span className="ml-8 text-gold-warm">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    icon: Hospital,
    title: "Hospitals & Healthcare",
    text: "Build trust, attract patients, and strengthen your digital reputation consistently.",
  },
  {
    icon: Stethoscope,
    title: "Doctors & Clinics",
    text: "Grow your practice with consistent social presence and ORM strategies.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Businesses & Services",
    text: "Expand reach, generate qualified leads, and scale with structured systems.",
  },
  {
    icon: Store,
    title: "Brands & Product Sellers",
    text: "Launch, market, and grow your brand in the digital ecosystem.",
  },
];
export function WhoWeHelp() {
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide">
        <SectionHeading
          label="Who We Serve"
          title="Built for Professionals"
          accent="Who Want to Grow"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.1}>
              <div className="group relative h-full transition-all duration-500 hover:-translate-y-2">
                {/* 1. THE NOTCHED BORDER (Glow Effect) */}
                <div
                  className="absolute inset-0 bg-[var(--border-soft)] opacity-50 group-hover:bg-gradient-to-br group-hover:from-[var(--purple-electric)] group-hover:to-[var(--gold-bright)] group-hover:opacity-100 transition-all duration-500"
                  style={{
                    clipPath:
                      "polygon(20% 0%, 100% 0, 100% 100%, 0 100%, 0% 20%)",
                  }}
                />

                {/* 2. THE MAIN BODY */}
                <div
                  className="relative m-[1px] h-full bg-[var(--bg-panel)] p-8 transition-colors duration-500 group-hover:bg-[var(--bg-frost)]"
                  style={{
                    clipPath:
                      "polygon(20% 0%, 100% 0, 100% 100%, 0 100%, 0% 20%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* TOP-LEFT DECORATIVE ACCENT */}
                  <div
                    className="absolute left-0 top-0 h-6 w-6 bg-[var(--purple-vivid)] opacity-20 group-hover:bg-[var(--gold-bright)] group-hover:opacity-100 transition-all"
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  />

                  {/* ICON BLOCK */}
                  <div className="relative mt-4 flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 bg-[var(--purple-electric)] opacity-10 group-hover:rotate-45 group-hover:opacity-20 transition-all duration-700 rounded-lg" />
                    <card.icon className="h-7 w-7 text-[var(--purple-electric)] dark:text-[var(--gold-bright)] group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <h3 className="mt-8 font-heading text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {card.title}
                  </h3>

                  <div className="my-4 h-[1px] w-12 bg-[var(--border-soft)] group-hover:w-full group-hover:bg-[var(--gold-warm)] transition-all duration-700" />

                  <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] opacity-80 group-hover:opacity-100">
                    {card.text}
                  </p>
                </div>

                {/* 3. SUBTLE BOTTOM GLOW (Hidden until hover) */}
                <div className="absolute -bottom-2 left-1/2 h-4 w-2/3 -translate-x-1/2 bg-[var(--gold-bright)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide">
        <SectionHeading
          label="Our Core Services"
          title="Complete Digital Growth,"
          accent="Under One System"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 0.1}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative block h-full p-[1px] transition-all duration-500 hover:-translate-y-2"
              >
                {/* OUTER BORDER (The Glow Frame) */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--border-soft)] to-transparent opacity-50 group-hover:from-[var(--gold-bright)] group-hover:to-[var(--purple-electric)] group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                  }}
                />

                {/* MAIN CONTENT AREA */}
                <div
                  className="relative h-full bg-[var(--bg-panel)] p-8 transition-colors duration-500 group-hover:bg-[var(--bg-frost)]"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* FLOATING INDEX NUMBER */}
                  <div className="absolute right-6 top-6 font-mono text-5xl font-black text-[var(--purple-vivid)] opacity-5 group-hover:opacity-10 transition-opacity">
                    {index + 1}
                  </div>

                  {/* ICON BLOCK: Using a "Hexagon-like" container */}
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rotate-45 rounded-xl bg-[var(--purple-vivid)] opacity-10 group-hover:rotate-90 group-hover:bg-[var(--gold-warm)] group-hover:opacity-20 transition-all duration-500" />
                    <service.icon className="relative h-8 w-8 text-[var(--purple-electric)] dark:text-[var(--gold-bright)] transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h3 className="mt-8 font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {service.name}
                  </h3>

                  <p className="mt-4 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                    {service.description}
                  </p>

                  {/* ANIMATED LINK FOOTER */}
                  <div className="mt-8 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-[var(--gold-warm)]">
                    <span className="h-[1px] w-8 bg-[var(--gold-warm)] transition-all duration-500 group-hover:w-12" />
                    <span>Discover More</span>
                  </div>
                </div>

                {/* DECORATIVE CORNER SHARD */}
                <div
                  className="absolute bottom-0 right-0 h-8 w-8 bg-[var(--gold-highlight)] opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Steps with Scroll-Linked Animations
const steps = [
  {
    title: "Strategy",
    text: "We understand your business, audience, and goals to design a growth plan.",
    side: "left",
  },
  {
    title: "Creation",
    text: "From content to creatives, we build assets that reflect your brand professionally.",
    side: "right",
  },
  {
    title: "Execution",
    text: "We manage platforms, campaigns, and communication with precision.",
    side: "left",
  },
  {
    title: "Growth",
    text: "We track, optimize, and scale your digital presence continuously.",
    side: "right",
  },
];

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // Big Screen S-curve (Your original path)
  const desktopPath = `M 50 0 Q 50 150, 80 250 T 50 500 T 20 750 T 50 1000`;
  // Mobile Straight Line (Aligned with nodes at 24px/left-6)
  const mobilePath = `M 24 0 L 24 1000`;

  const activePath = isMobile ? mobilePath : desktopPath;

  return (
    <section
      ref={containerRef}
      className="section bg-[var(--bg-app)] relative py-24 overflow-hidden"
    >
      <div className="container-wide">
        <SectionHeading
          label="Our Journey"
          title="The Strategic"
          accent="Roadmap"
        />

        <div className="relative mt-16 md:mt-24">
          {/* THE SVG: Now responsive but never hidden */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox={isMobile ? "0 0 100 1000" : "0 0 100 1000"}
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <path
                d={activePath}
                fill="none"
                stroke="var(--border-soft)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <motion.path
                d={activePath}
                fill="none"
                stroke="var(--stroke-accent)"
                strokeWidth="1.5"
                style={{ pathLength }}
                className="dark:stroke-[var(--gold-bright)]"
              />
            </svg>
          </div>

          <div className="flex flex-col md:gap-0 gap-12">
            {steps.map((step, index) => (
              <TimelineItem
                key={index}
                step={step}
                index={index}
                progress={scrollYProgress}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ step, index, progress, isMobile }: any) {
  const isLeft = step.side === "left";
  const threshold = (index + 0.1) / steps.length;

  const opacity = useTransform(progress, [threshold - 0.1, threshold], [0, 1]);
  const scale = useTransform(progress, [threshold - 0.1, threshold], [0.98, 1]);

  // Disable X-axis slide on mobile to prevent horizontal overflow
  const x = useTransform(
    progress,
    [threshold - 0.1, threshold],
    isMobile ? [0, 0] : [isLeft ? -30 : 30, 0],
  );

  const cardClip = isLeft
    ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 15%)"
    : "polygon(0 0, 90% 0, 100% 15%, 100% 100%, 0 100%)";

  return (
    <div className="relative flex w-full flex-col md:flex-row items-center justify-center min-h-[150px] md:h-[300px]">
      {/* 1. THE SPACER */}
      <div
        className={`hidden md:block w-1/2 ${isLeft ? "order-1" : "order-3"}`}
      />

      {/* 2. THE CENTER NODE: Adjusted for mobile sidebar alignment */}
      <div className="absolute left-[24px] md:left-1/2 top-0 md:top-1/2 z-20 -translate-y-1/2 -translate-x-1/2">
        <div className="relative flex h-6 w-6 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)] opacity-20" />
          <div className="h-2 w-2 rounded-full bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)]" />
          <div className="absolute inset-0 rounded-full border border-[var(--border-soft)] bg-[var(--bg-app)]" />
        </div>
      </div>

      {/* 3. THE CARD: Adjusted padding/margins for mobile */}
      <motion.div
        style={{ opacity, scale, x }}
        className={`w-full md:w-[44%] pl-12 md:pl-0 group relative z-10 
                   ${isLeft ? "md:order-3 md:text-left" : "md:order-1 md:text-right"}`}
      >
        <div
          className="absolute inset-0 bg-[var(--border-soft)] group-hover:bg-gradient-to-r group-hover:from-[var(--purple-electric)] group-hover:to-[var(--gold-bright)] transition-all duration-500"
          style={{ clipPath: cardClip }}
        />

        <div
          className={`relative m-[1px] h-full p-6 md:p-8 bg-[var(--bg-panel)] backdrop-blur-xl transition-all duration-500
                     group-hover:bg-[var(--bg-frost)]`}
          style={{ clipPath: cardClip }}
        >
          <div
            className={`absolute top-0 h-[2px] w-12 bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)] 
                          ${isLeft ? "left-12" : "right-12"}`}
          />

          <div
            className={`flex flex-col ${!isLeft && !isMobile ? "md:items-end" : "items-start"}`}
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple-electric)] dark:text-[var(--gold-bright)] mb-2">
              Phase — 0{index + 1}
            </span>

            <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-3 transition-all">
              {step.title}
            </h3>

            <p className="font-body text-xs md:text-sm leading-relaxed text-[var(--text-secondary)] opacity-80">
              {step.text}
            </p>
          </div>
        </div>

        <div
          className={`absolute bottom-0 h-6 w-6 bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)] opacity-0 group-hover:opacity-100 transition-all duration-500
                     ${isLeft ? "left-0" : "right-0"}`}
          style={{
            clipPath: isLeft
              ? "polygon(0 0, 0 100%, 100% 100%)"
              : "polygon(100% 0, 0 100%, 100% 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "Business Hub Pages",
    text: "Local reach through our owned business hub network.",
    icon: ShieldCheck,
  },
  {
    title: "Influencer Network",
    text: "Creator and city-page distribution for launch visibility.",
    icon: Zap,
  },
  {
    title: "Data-Driven",
    text: "Campaign decisions guided by reporting and measurable signals.",
    icon: BarChart3,
  },
  {
    title: "Integrated Strategy",
    text: "Content, reputation, ads, and web working as one system.",
    icon: Sparkles,
  },
];

export function Advantage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  return (
    <section
      ref={sectionRef}
      className="section bg-[var(--bg-app)] relative py-12 overflow-hidden md:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-vivid/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold-warm/5 blur-3xl" />
      </div>

      <div className="container-wide px-4 md:px-6 lg:px-8">
        <motion.div
          style={{ opacity, y }}
          className="panel-strong relative flex flex-col gap-8 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-6 shadow-xl backdrop-blur-sm md:rounded-3xl md:p-10 lg:flex-row lg:items-center lg:gap-12 lg:p-12 xl:gap-16"
        >
          {/* Content Column */}
          <div className="relative z-10 w-full lg:w-1/2">
            <ScrollReveal>
              <SectionLabel className="justify-start text-gold-bright">
                Our Advantage
              </SectionLabel>

              <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl lg:text-5xl">
                More Than an Agency —{" "}
                <span className="bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold-warm)] bg-clip-text text-transparent">
                  A Growth Ecosystem
                </span>
              </h2>

              <p className="mt-4 font-body text-sm leading-relaxed text-[var(--text-secondary)] opacity-80 md:text-base lg:text-lg">
                Unlike traditional agencies, we combine content, marketing, and
                distribution systems to deliver consistent visibility and
                measurable growth.
              </p>

              {/* Features Grid */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-10 lg:grid-cols-1">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex h-full items-start gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-frost)] p-3 transition-all duration-300 hover:border-[var(--gold-bright)] hover:bg-[var(--bg-app)] hover:shadow-lg md:gap-4 md:p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--purple-vivid)]/10 text-[var(--gold-bright)] transition-colors group-hover:bg-[var(--gold-bright)] group-hover:text-[var(--purple-vivid)] md:h-10 md:w-10">
                        <feature.icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-heading text-sm font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--gold-bright)] md:text-base">
                          {feature.title}
                        </h3>
                        <p className="mt-1 font-body text-xs leading-relaxed text-[var(--text-secondary)] opacity-70 md:text-sm">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Column */}
          <div className="relative flex min-h-[320px] w-full items-center justify-center sm:min-h-[380px] md:min-h-[420px] lg:w-1/2">
            {/* Ambient glow behind orbit */}
            <div className="absolute h-64 w-64 rounded-full bg-[var(--purple-vivid)] opacity-20 blur-[80px] md:h-80 md:w-80" />
            <div className="absolute h-64 w-64 rounded-full bg-[var(--purple-vivid)] opacity-20 blur-[80px] md:h-80 md:w-80" />

            {/* Orbital rings glow */}
            <div className="absolute h-72 w-72 rounded-full border border-gold-bright/10 blur-xl md:h-[380px] md:w-[380px]" />

            {/* The Visual Container */}
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
              <OrbitVisual />
            </div>

            {/* Floating particle effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-[50%] left-[50%] h-1 w-1 rounded-full bg-gold-bright/40"
                  initial={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    scale: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.random() * 300 - 150,
                    y: Math.random() * 300 - 150,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full border border-gold-bright/5 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full border border-purple-electric/5 pointer-events-none" />
        </motion.div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="section py-16 md:py-24">
      <div className="container-wide">
        {/* 
          Grid Logic: 
          - 2 columns on mobile (grid-cols-2) 
          - 4 columns on desktop (lg:grid-cols-4)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              {/* THE CARD: Glass effect without changing the main background */}
              <div className="relative h-full overflow-hidden rounded-xl border border-[var(--border-soft)] bg-white/[0.02] backdrop-blur-sm p-6 md:p-10 transition-all duration-500 hover:border-[var(--gold-bright)]/40 hover:bg-white/[0.05]">
                {/* 1. TOP GLOW: Subtle light hit from the top */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* THE NUMBER: Using a thicker tracking-tighter for that premium look */}
                  <div className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)]">
                    <span className="inline-block transition-transform duration-500 group-hover:scale-110 group-hover:text-[var(--gold-bright)]">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </span>
                  </div>

                  {/* THE DIVIDER: Aesthetic small gold bar */}
                  <div className="mt-3 h-[2px] w-6 bg-[var(--border-soft)] transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--gold-bright)]" />

                  {/* THE LABEL: Monospace tech-style */}
                  <p className="mt-4 text-center text-[9px] md:text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                    {stat.label}
                  </p>
                </div>

                {/* 3. RADIAL HOVER: Follows the "Ecosystem" feel */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[var(--purple-vivid)]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="bg-[var(--bg-app)] py-24 lg:py-40">
      <div className="container-wide px-6">
        {/* Header with a unique thin vertical line */}
        <div className="flex gap-12 mb-24">
          <div className="w-[1px] bg-[var(--gold-warm)] h-32 hidden md:block" />
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--gold-warm)] mb-4 block">
              Market Segments
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--text-primary)]">
              Industries We Serve
            </h2>
          </div>
        </div>

        {/* The Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[var(--border-soft)]">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-10 lg:p-14 border-r border-b border-[var(--border-soft)] transition-colors hover:bg-[var(--gold-warm)]/[0.02]"
            >
              {/* Box Header: Icon & Index */}
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 rounded-full border border-[var(--border-soft)] text-[var(--text-muted)] group-hover:text-[var(--gold-warm)] group-hover:border-[var(--gold-warm)] transition-all duration-500">
                  <industry.icon size={20} strokeWidth={1.5} />
                </div>
              </div>

              {/* Box Body */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tighter text-[var(--text-primary)] group-hover:translate-x-1 transition-transform duration-500">
                  {industry.label}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light line-clamp-3">
                  {industry.desc ||
                    "Precision systems built for high-authority growth and digital sovereignty."}
                </p>
              </div>

              {/* Minimal "Internal" Button */}
              <div className="mt-10 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--gold-warm)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                Explore <ArrowUpRight size={12} />
              </div>

              {/* Corner Accent (Reveals on hover) */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-[var(--gold-warm)] group-hover:w-4 group-hover:h-4 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    id: 4,
    name: "Dr. Arjun Reddy",
    role: "Founder, Reddy Diagnostics",
    quote:
      "Our patient inflow has increased significantly since partnering with YodhaMedia. Their campaigns are precise and highly effective.",
  },
  {
    id: 5,
    name: "Sneha Verma",
    role: "Clinic Manager, SmileCare Dental",
    quote:
      "From branding to patient engagement, everything is handled seamlessly. We’ve seen a noticeable boost in walk-ins and trust.",
  },
  {
    id: 6,
    name: "Dr. Mohammed Faiz",
    role: "Chief Surgeon, Lifeline Hospital",
    quote:
      "They understand healthcare marketing deeply. Their strategies are ethical, compliant, and still deliver strong growth.",
  },
  {
    id: 7,
    name: "Kavita Nair",
    role: "Operations Head, Nair Wellness Center",
    quote:
      "The consistency in content and communication has elevated our brand image across all digital platforms.",
  },
  {
    id: 8,
    name: "Vikram Singh",
    role: "Founder, MedPlus Clinic",
    quote:
      "Their local SEO work helped us dominate search results in our area. We’re now the top choice for nearby patients.",
  },
  {
    id: 9,
    name: "Dr. Neha Kapoor",
    role: "Dermatologist, SkinGlow Clinic",
    quote:
      "Patient engagement on Instagram has doubled. The content feels premium and builds real trust with our audience.",
  },
  {
    id: 10,
    name: "Ramesh Gupta",
    role: "Administrator, CityCare Hospital",
    quote:
      "Transparent reporting and measurable results — exactly what we needed from a digital partner.",
  },
  {
    id: 11,
    name: "Dr. Sandeep Iyer",
    role: "Cardiologist, HeartBeat Clinic",
    quote:
      "They helped position us as a trusted authority online. The quality of leads has improved drastically.",
  },
  {
    id: 12,
    name: "Pooja Mehta",
    role: "Marketing Manager, CurePlus Hospitals",
    quote:
      "Their campaigns are data-driven and optimized continuously. We’ve seen steady month-on-month growth.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative min-h-[800px] w-full py-16 md:py-24 overflow-hidden bg-[var(--bg-app)]">
      {/* Structural Grid Background Overlay - Using your Purple Electric for the lines */}
      <div className="relative z-10 w-full flex items-start justify-around mb-12">
        <ScrollReveal>
          <SectionHeading
            label="Testimonials"
            title="Trusted by Professionals"
            accent=""
          />
        </ScrollReveal>
      </div>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--purple-electric) 1px, transparent 1px), linear-gradient(to bottom, var(--purple-electric) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Navigation */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-strong)] bg-[var(--bg-panel-strong)] rounded-none"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--purple-electric)] animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--purple-electric)] dark:text-[var(--gold-bright)]">
                  Success Stories
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tighter text-[var(--text-primary)]">
                THE{" "}
                <span className="text-[var(--purple-electric)] dark:text-[var(--gold-bright)] italic">
                  PROOF
                </span>{" "}
                <br />
                IN THE SYSTEM.
              </h2>

              <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-md leading-relaxed border-l-2 border-[var(--purple-electric)] pl-6">
                Real results from trust-heavy markets. We engineer distribution
                ecosystems that convert attention into authority.
              </p>
            </div>

            {/* Navigation - Responsive Flex */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex gap-2">
                <NavButton onClick={prev} icon={<ArrowLeft size={20} />} />
                <NavButton onClick={next} icon={<ArrowRight size={20} />} />
              </div>
              <div className="h-[1px] flex-1 bg-[var(--border-soft)]" />
              <div className="font-mono text-xs md:text-sm tracking-widest text-[var(--text-muted)]">
                0{active + 1} / 0{testimonials.length}
              </div>
            </div>
          </div>

          {/* Right Column: Card Engine */}
          <div className="lg:col-span-7 relative pt-10 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative"
              >
                {/* Decorative Stack Effect - Theme Aware */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 w-full h-full border border-[var(--purple-electric)] opacity-20 -z-10" />

                <div className="bg-[var(--bg-panel)] border border-[var(--border-strong)] p-8 md:p-14 relative overflow-hidden shadow-[var(--shadow-card)]">
                  {/* Industrial Corner - Gold Highlight */}
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 opacity-10 border-b border-l border-[var(--border-soft)] flex items-center justify-center">
                    <Quote className="text-gold-highlight h-5 w-5 md:h-6 md:w-6" />
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    {/* Dynamic Growth Badge */}
                    <div className="inline-block px-3 py-1 bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)] text-white dark:text-[var(--purple-deep)] font-mono text-[10px] uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                      {testimonials[active].name.split(" ")[0]} {"//"} GROWTH +
                      {Math.floor(Math.random() * 30) + 20}%
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-[var(--gold-highlight)] text-[var(--gold-highlight)]"
                        />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-[var(--text-primary)]">
                      &quot;{testimonials[active].quote}&quot;
                    </blockquote>

                    <div className="pt-6 md:pt-8 flex items-center justify-between border-t border-[var(--border-soft)]">
                      <div>
                        <h4 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          {testimonials[active].name}
                        </h4>
                        <p className="text-[var(--purple-electric)] dark:text-[var(--gold-bright)] text-xs font-bold uppercase tracking-widest mt-1">
                          {testimonials[active].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Kinetic Text - Responsive Scaling */}
            <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 opacity-[0.04] md:opacity-[0.03] select-none pointer-events-none">
              <span className="text-6xl md:text-[12rem] font-black leading-none uppercase italic text-[var(--purple-electric)] dark:text-[var(--gold-bright)]">
                TRUST
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="h-12 w-12 md:h-14 md:w-14 cursor-none flex items-center justify-center border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--purple-electric)] dark:text-[var(--gold-bright)] hover:bg-[var(--purple-electric)] hover:text-white dark:hover:bg-[var(--gold-bright)] dark:hover:text-[var(--purple-deep)] transition-all duration-300 active:scale-95 shadow-[var(--shadow-soft)]"
    >
      {icon}
    </button>
  );
}

const items = [
  {
    id: "01",
    title: "Integrated Digital Ecosystem",
    icon: <Layers size={20} />,
    desc: "A unified system that connects your brand across all distribution channels, removing silos and friction.",
  },
  {
    id: "02",
    title: "Healthcare & Professional Focus",
    icon: <ShieldCheck size={20} />,
    desc: "Specialized knowledge for high-trust markets where reputation and clinical accuracy are the baseline.",
  },
  {
    id: "03",
    title: "Strong Distribution Network",
    icon: <Radio size={20} />,
    desc: "We don't just create; we ensure your message reaches the right audience through engineered distribution.",
  },
  {
    id: "04",
    title: "Consistent Execution Systems",
    icon: <Repeat size={20} />,
    desc: "No freelancer guesswork. Just battle-tested processes that deliver high-end output on a predictable schedule.",
  },
  {
    id: "05",
    title: "Ethical & Compliant Approach",
    icon: <Scale size={20} />,
    desc: "Full adherence to professional guidelines and healthcare marketing ethics. No shortcuts on integrity.",
  },
  {
    id: "06",
    title: "Results-Driven Solutions",
    icon: <TrendingUp size={20} />,
    desc: "Growth metrics mapped directly to your business bottom line. We track what actually generates revenue.",
  },
];

export function WhyChoose() {
  const [hovered, setHovered] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[var(--bg-app)] relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--purple-electric)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />

      <div className="container-wide relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Fixed Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <div className="space-y-4">
              <span className="text-[var(--purple-electric)] dark:text-[var(--gold-bright)] font-mono text-sm font-bold tracking-[0.3em] uppercase">
                System Infrastructure
              </span>
              <h2 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-[var(--text-primary)] leading-[0.9]">
                WHY <br />
                <span className="text-[var(--purple-electric)] dark:text-[var(--gold-bright)] italic">
                  YODHAMEDIA
                </span>
              </h2>
            </div>

            <p className="text-[var(--text-secondary)] text-lg max-w-sm border-l-2 border-[var(--purple-electric)] pl-6 italic">
              &quot;We replaced the volatility of freelancers with the precision
              of an integrated growth ecosystem.&quot;
            </p>

            {/* Active Status Display */}
            <div className="hidden lg:block pt-12">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-2">
                Module Status
              </div>
              <div className="flex gap-1">
                {items.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-8 transition-colors duration-500 ${hovered === i ? "bg-[var(--purple-electric)] dark:bg-[var(--gold-bright)]" : "bg-[var(--border-soft)]"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Ledger */}
          <div className="lg:col-span-7 border-t border-[var(--border-soft)]">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHovered(idx)}
                className="group border-b border-[var(--border-soft)] relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center py-8 px-4 transition-all duration-500 relative z-10">
                  {/* ID & Icon Container */}
                  <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                    <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--purple-electric)] dark:group-hover:text-[var(--gold-bright)] transition-colors">
                      {item.id}
                    </span>
                    <div className="p-3 bg-[var(--bg-panel-strong)] text-[var(--text-primary)] group-hover:text-[var(--purple-electric)] dark:group-hover:text-[var(--gold-bright)] transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="md:w-2/3 space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-[var(--text-primary)] group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <AnimatePresence>
                      {hovered === idx && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[var(--text-secondary)] text-sm leading-relaxed pr-8"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mechanical Indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                    {hovered === idx ? (
                      <Minus className="text-[var(--purple-electric)] dark:text-[var(--gold-bright)]" />
                    ) : (
                      <Plus className="text-[var(--border-strong)]" />
                    )}
                  </div>
                </div>

                {/* Animated Background Highlight */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[var(--purple-electric)]/5 to-transparent -z-0"
                  initial={{ x: "-100%" }}
                  animate={{ x: hovered === idx ? "0%" : "-100%" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section surface-band">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Insights"
            title="Digital Growth Notes"
            accent="for Serious Brands"
            align="left"
          />
          <Button href="/blog" variant="ghost">
            View Blog
          </Button>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="panel group overflow-hidden transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-deep to-purple-vivid text-6xl transition group-hover:brightness-110">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {post.icon}
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-gold-warm px-3 py-1 font-label text-[11px] uppercase tracking-wider text-white">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                  {post.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex font-heading text-sm font-semibold text-gold-warm">
                  Read More {"->"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(135deg,#080514_0%,#1E1245_35%,#2D1B69_65%,#080514_100%)] bg-[length:300%_300%] animate-gradient-shift">
      <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-radial-gradient(circle_at_center,white_0_1px,transparent_1px_58px)]" />
      <div className="container-wide bg-[var(--background)] relative text-center">
        <div className="px-6 py-12">
          <SectionLabel>Start the System</SectionLabel>
          <h2 className="mx-auto max-w-3xl font-heading text-h2 font-bold text-white">
            Ready to Build Your{" "}
            <span className="font-display italic text-gold-highlight">
              Digital Presence?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body leading-8 text-white/70">
            Let&apos;s create a system that works for your business consistently
            and professionally.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ConsultationModal triggerClassName="animate-pulse-gold" />
            <Button href="/contact" variant="outline">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  accent,
  align = "center",
  darkText = false,
}: {
  label: string;
  title: string;
  accent: string;
  align?: "center" | "left";
  darkText?: boolean;
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <SectionLabel className={align === "left" ? "justify-start" : undefined}>
        {label}
      </SectionLabel>
      <h2
        className={
          darkText
            ? "font-heading text-h2 font-bold text-white"
            : "heading-dark"
        }
      >
        {title} <span className="text-gold-warm">{accent}</span>
      </h2>
    </div>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-warm/30 animate-[spin_20s_linear_infinite]" />

      {/* Middle Ring */}
      <div className="absolute inset-[10%] rounded-full border border-purple-electric/40 animate-[spin-reverse_15s_linear_infinite]" />

      {/* Center Core */}
      <div className="absolute inset-[28%] flex items-center justify-center rounded-full bg-gradient-to-br from-purple-vivid to-purple-mid shadow-purple-lg">
        <div className="text-center">
          <span className="font-display text-xl font-bold text-gold-highlight sm:text-4xl ">
            50+
          </span>
          <p className=" text-[10px] uppercase text-white/70 sm:text-xs">
            Happy Clients
          </p>
          <div className="mx-auto my-1 h-px w-8 bg-gold-warm/50 md:my-3 md:w-10" />
          <span className="font-display text-lg font-bold text-gold-highlight sm:text-4xl">
            100+
          </span>
          <p className=" text-[10px] uppercase text-white/70 sm:text-xs">
            Projects
          </p>
        </div>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <ScrollReveal>
      <div className="relative mx-auto flex h-80 max-w-sm items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full bg-purple-electric/25 blur-3xl" />
        <div className="relative text-center">
          <div className="mx-auto flex h-40 w-40 rotate-[-6deg] items-center justify-center rounded-[2rem] border border-gold-warm/60 bg-gradient-to-br from-purple-mid to-purple-deep font-display text-8xl font-bold text-gold-highlight shadow-purple-lg animate-float-slow">
            Y
          </div>
          <p className="mt-8 font-heading text-2xl font-bold text-[var(--text-primary)]">
            YodhaMedia LLP
          </p>
          <p className="mt-2 font-label text-label uppercase text-gold-warm">
            Structured Digital Growth
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
