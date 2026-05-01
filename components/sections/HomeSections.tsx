"use client";

import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Hospital,
  LineChart,
  Radio,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { blogPosts } from "@/lib/constants/blog";
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
            <span className="animate-shimmer bg-gradient-to-r from-gold-warm via-gold-pale to-gold-warm bg-[length:200%_auto] bg-clip-text text-label text-white font-medium uppercase tracking-[0.2em] text-transparent">
              Digital Growth Partner
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
              {item}{" "}
              <span className="ml-8 text-gold-warm">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhoWeHelp() {
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
  return (
    <section className="section surface-band">
      <div className="container-wide text-center">
        <SectionHeading
          label="Who We Serve"
          title="Built for Professionals"
          accent="Who Want to Grow"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
  {cards.map((card, index) => (
    <ScrollReveal key={card.title} delay={index * 0.06}>
      <div className="group panel h-full p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
        
        {/* ICON CONTAINER */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hero-orb-1)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--hero-orb-2)]">
          
          {/* THE ICON */}
          <card.icon 
            className="h-8 w-8 transition-colors duration-300 
            text-[var(--purple-electric)] 
            dark:text-[var(--gold-bright)]" 
          />
          
        </div>

        <h3 className="mt-6 font-heading text-xl font-semibold text-[var(--text-primary)]">
          {card.title}
        </h3>
        
        <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">
          {card.text}
        </p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--border-soft)] to-transparent opacity-50 group-hover:from-[var(--gold-bright)] group-hover:to-[var(--purple-electric)] group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }} 
                />

                {/* MAIN CONTENT AREA */}
                <div 
                  className="relative h-full bg-[var(--bg-panel)] p-8 transition-colors duration-500 group-hover:bg-[var(--bg-frost)]"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                    backdropFilter: 'blur(10px)'
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
                <div className="absolute bottom-0 right-0 h-8 w-8 bg-[var(--gold-highlight)] opacity-0 transition-all duration-500 group-hover:opacity-100" 
                     style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
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
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setSvgHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
  });

  // S‑curve path (you can tweak the Q/T control points)
  const curvePath = `
    M 50 0 
    Q 50 150, 80 250 
    T 50 500 
    T 20 750 
    T 50 1000
  `;

  return (
    <section
      ref={containerRef}
      className="section surface-band relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container-wide">
        <SectionHeading
          label="Our Journey"
          title="The Strategic"
          accent="Roadmap"
        />

        <div className="relative mt-12 md:mt-16">
          {/* ANIMATED CURVED LINE (SVG) */}
          <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 pointer-events-none hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Dotted guideline */}
              <path
                d={curvePath}
                fill="none"
                stroke="var(--border-soft)"
                strokeWidth="0.5"
                strokeDasharray="1.5 2"
                opacity="0.6"
              />
              {/* Animated glowing path */}
              <motion.path
                d={curvePath}
                fill="none"
                stroke="var(--stroke-accent)"
                strokeWidth="1"
                style={{ pathLength }}
                filter="url(#glow)"
              />
              {/* SVG filter for glow */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur
                    stdDeviation="1.5"
                    result="coloredBlur"
                  />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* STEPS */}
          <div className="flex flex-col gap-16 md:gap-0">
            {steps.map((step, index) => (
              <TimelineItem
                key={index}
                step={step}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ step, index, progress }: any) {
  const isLeft = step.side === "left";
  const threshold = (index + 0.2) / steps.length;

  const opacity = useTransform(progress, [threshold - 0.15, threshold], [0, 1]);
  const scale = useTransform(progress, [threshold - 0.15, threshold], [0.9, 1]);
  const xOffset = useTransform(
    progress,
    [threshold - 0.15, threshold],
    [-10, 0]
  );

  return (
    <div className="relative flex w-full flex-col md:flex-row items-center justify-center md:h-[280px]">
      {/* Spacer (left/right) */}
      <div
        className={`hidden md:block w-1/2 ${
          isLeft ? "order-1" : "order-3"
        }`}
      />

      {/* Junction dot on the spine */}
      <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 z-20 -translate-y-1/2 md:-translate-x-1/2">
        <motion.div
          style={{ scale }}
          className="h-4 w-4 rounded-full bg-[var(--stroke-accent)] shadow-[0_0_15px_var(--stroke-accent)]"
        />
      </div>

      {/* Content card */}
      <motion.div
        style={{ opacity, scale, x: isLeft ? xOffset : undefined }}
        className={`w-full md:w-[42%] ml-12 md:ml-0 p-6 md:p-8 panel group relative z-10 border-[0.5px] border-[var(--border-soft)] hover:border-[var(--gold-bright)] transition-all duration-300 ${
          isLeft
            ? "md:order-3 md:text-left"
            : "md:order-1 md:text-right"
        }`}
      >
        <div
          className={`flex items-center gap-3 mb-3 ${
            !isLeft && "md:flex-row-reverse"
          }`}
        >
          <span className="font-mono text-xl font-bold text-[var(--gold-bright)] uppercase tracking-wider">
            0{index + 1}
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)]">
            {step.title}
          </h3>
        </div>
        <p className="font-body text-sm leading-7 text-[var(--text-secondary)]">
          {step.text}
        </p>

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-bright)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </div>
  );
}

export function Advantage() {
  const features = [
    [
      "Business Hub Pages",
      "Local reach through our owned business hub network",
    ],
    [
      "Influencer Network",
      "Creator and city-page distribution for launch visibility",
    ],
    [
      "Data-Driven",
      "Campaign decisions guided by reporting and measurable signals",
    ],
    [
      "Integrated Strategy",
      "Content, reputation, ads, and web working as one system",
    ],
  ];
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide panel-strong grid items-center gap-12 p-8 lg:grid-cols-2 lg:p-12">
        <ScrollReveal>
          <SectionLabel className="justify-start">Our Advantage</SectionLabel>
          <h2 className="heading-dark">
            More Than an Agency -{" "}
            <span className="text-gold-highlight">A Growth Ecosystem</span>
          </h2>
          <p className="body-dark mt-5">
            Unlike traditional agencies, we combine content, marketing, and
            distribution systems to deliver consistent visibility and reach.
          </p>
          <div className="mt-8 grid gap-4">
            {features.map(([title, text]) => (
              <GlassCard key={title} className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-electric/20 text-gold-highlight">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-[var(--text-secondary)]">
                    {text}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
        <OrbitVisual />
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="section surface-band">
      <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="panel p-8 text-center transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
          >
            <div className="font-display text-stat font-bold text-[var(--text-primary)]">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-3 font-label text-sm uppercase tracking-widest text-[var(--text-secondary)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSnippet() {
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide panel-strong grid items-center gap-12 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <ScrollReveal>
          <SectionLabel className="justify-start">About Us</SectionLabel>
          <h2 className="heading-dark">
            A Digital Growth Partner{" "}
            <span className="text-gold-highlight">
              Built for Modern Businesses
            </span>
          </h2>
          <p className="body-dark mt-5">
            YodhaMedia LLP is built for organizations that need more than
            disconnected digital tasks. We bring content, reputation, web, ads,
            and distribution into a structured operating system.
          </p>
          <div className="mt-7 grid gap-3">
            {[
              "Healthcare-first communication sensitivity",
              "Professional content and creative direction",
              "Owned distribution and influencer support",
              "Reporting-led optimization",
              "Long-term partnership mindset",
            ].map((item) => (
              <span
                key={item}
                className="font-body text-[var(--text-secondary)]"
              >
                <span className="mr-2 text-gold-highlight">*</span>
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
        <BrandMark />
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="section bg-gradient-to-br from-purple-mid to-purple-deep">
      <div className="container-wide text-center">
        <SectionHeading
          label="Industries We Serve"
          title="Designed for Trust-Heavy"
          accent="Growth Markets"
          darkText
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div
              key={industry.label}
              className="rounded-[var(--radius-md)] border border-white/15 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 font-heading font-bold text-purple-deep">
                {industry.icon}
              </div>
              <p className="mt-3 font-label text-[13px] uppercase tracking-wider text-white/90">
                {industry.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const testimonials = [
    [
      "Dr. Priya Sharma",
      "Director, Sharma Multispeciality Clinic",
      "YodhaMedia transformed our clinic's online presence. We get 3x more appointment inquiries since they started managing our social media.",
    ],
    [
      "Rajesh Kumar",
      "Owner, HealthFirst Hospital",
      "Their ORM work helped us go from 3.2 to 4.8 stars on Google in 3 months. Absolutely professional and result-driven team.",
    ],
    [
      "Anita Patel",
      "Marketing Head, CareWell Hospitals",
      "The structured approach they bring is unlike any agency we've worked with. Every deliverable is on time and on brand.",
    ],
  ];
  return (
    <section className="section surface-band">
      <div className="container-wide">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Professionals"
          accent="Who Value Structure"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map(([name, role, quote]) => (
            <div
              key={name}
              className="panel p-7 transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="text-gold-highlight">*****</div>
              <p className="mt-5 font-body text-sm italic leading-7 text-[var(--text-secondary)]">
                &quot;{quote}&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-deep font-heading font-bold text-white">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-[var(--text-primary)]">
                    {name}
                  </p>
                  <p className="font-body text-xs text-[var(--text-secondary)]">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const items = [
    ["ID", "Integrated Digital Ecosystem"],
    ["HF", "Healthcare & Professional Focus"],
    ["DN", "Strong Distribution Network"],
    ["EX", "Consistent Execution Systems"],
    ["EC", "Ethical & Compliant Approach"],
    ["RD", "Results-Driven Solutions"],
  ];
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide text-center">
        <SectionHeading
          label="Why Choose YodhaMedia"
          title="A Serious System,"
          accent="Not a Freelancer Setup"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map(([icon, title]) => (
            <div
              key={title}
              className="panel p-6 transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-vivid/12 font-heading font-bold text-purple-vivid">
                {icon}
              </div>
              <p className="mt-4 font-heading text-sm font-semibold text-[var(--text-primary)]">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPreview() {
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
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="panel group overflow-hidden transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-purple-deep to-purple-vivid text-6xl transition group-hover:brightness-110">
                {post.icon}
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
      <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-radial-gradient(circle_at_center,white_0_1px,transparent_1px_58px)]" />
      <div className="container-wide panel-strong relative text-center">
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
      <p
        className={
          darkText
            ? "mt-5 font-body text-base leading-8 text-white/75"
            : "body-dark mt-5"
        }
      >
        We partner with businesses and professionals who value consistency,
        quality, and long-term growth.
      </p>
    </div>
  );
}

function OrbitVisual() {
  return (
    <ScrollReveal>
      <div className="relative mx-auto h-[330px] w-[330px] md:h-[380px] md:w-[380px]">
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-gold-warm/30" />
        <div className="absolute inset-10 animate-spin-reverse rounded-full border border-purple-electric/40" />
        <div className="absolute inset-20 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-vivid to-purple-mid shadow-purple-lg">
          <div className="text-center">
            <span className="font-display text-6xl font-bold text-gold-highlight">
              50+
            </span>
            <p className="font-label text-label uppercase text-white/70">
              Happy Clients
            </p>
            <div className="mx-auto my-3 h-px w-10 bg-gold-warm/50" />
            <span className="font-display text-5xl font-bold text-gold-highlight">
              100+
            </span>
            <p className="font-label text-label uppercase text-white/70">
              Projects
            </p>
          </div>
        </div>
        {[LineChart, Radio, ShieldCheck, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-gold-warm text-white shadow-gold-sm"
            style={{
              transform: `rotate(${index * 90}deg) translateX(176px) rotate(-${index * 90}deg)`,
            }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
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
