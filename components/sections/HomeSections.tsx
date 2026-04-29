"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Check,
  Hospital,
  LineChart,
  Radio,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";
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

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((mod) => mod.HeroSceneWrapper), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-panel-strong)] md:h-[560px]" />,
});

export function HeroSection() {
  return (
    <section className="hero-shell relative min-h-screen overflow-hidden px-5 pb-16 pt-32 md:px-10">
      <div className="container-wide grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-[0.93fr_1.07fr]">
        <ScrollReveal>
          <div className="mb-5 inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-frost)] px-4 py-2 font-label text-label uppercase text-gold-warm shadow-[var(--shadow-soft)]">
            Digital Growth Partner
          </div>
          <h1 className="max-w-4xl font-display text-hero font-bold text-[var(--text-primary)]">
            We Build <span className="bg-gradient-to-r from-purple-vivid to-gold-warm bg-clip-text italic text-transparent">Digital Growth Systems</span> for Modern Businesses
          </h1>
          <p className="mt-6 max-w-2xl font-body text-[17px] leading-8 text-[var(--text-secondary)]">
            From content creation to customer acquisition, we design, manage, and scale your digital presence with precision and performance.
          </p>
          <p className="mt-4 max-w-2xl font-body text-[15px] leading-7 text-[var(--text-muted)]">
            Serving hospitals, doctors, and businesses with structured digital solutions that drive visibility, trust, and measurable growth.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <MagneticButton>
              <ConsultationModal />
            </MagneticButton>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 font-body text-sm text-[var(--text-muted)]">
            {["50+ Clients", "100+ Projects", "5+ Industries"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-warm" />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-0 scale-95 rounded-[var(--radius-lg)] bg-purple-electric/20 blur-3xl" />
          <div className="relative rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-panel-strong)] p-2 shadow-[var(--shadow-card)]">
            <HeroScene />
          </div>
        </div>
        <div className="md:hidden">
          <div className="panel-strong p-8 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-gold-highlight" />
            <p className="mt-4 font-heading text-2xl font-bold text-[var(--text-primary)]">Structured growth, built visually.</p>
          </div>
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
    <div className="surface-band px-5 py-6 md:px-10">
      <div className="container-wide panel overflow-hidden px-0 py-4">
        <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
          {[...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`} className="font-label text-[13px] uppercase tracking-wider text-[var(--text-secondary)]">
              <span className="text-gold-highlight">*</span> {item} <span className="ml-8 text-gold-warm">+</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhoWeHelp() {
  const cards = [
    { icon: Hospital, title: "Hospitals & Healthcare", text: "Build trust, attract patients, and strengthen your digital reputation consistently." },
    { icon: Stethoscope, title: "Doctors & Clinics", text: "Grow your practice with consistent social presence and ORM strategies." },
    { icon: Building2, title: "Businesses & Services", text: "Expand reach, generate qualified leads, and scale with structured systems." },
    { icon: Store, title: "Brands & Product Sellers", text: "Launch, market, and grow your brand in the digital ecosystem." },
  ];
  return (
    <section className="section surface-band">
      <div className="container-wide text-center">
        <SectionHeading label="Who We Serve" title="Built for Professionals" accent="Who Want to Grow" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.06}>
              <div className="panel h-full p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-vivid/10 text-purple-vivid transition group-hover:scale-110">
                  <card.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-[var(--text-primary)]">{card.title}</h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">{card.text}</p>
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
        <SectionHeading label="Our Core Services" title="Complete Digital Growth," accent="Under One System" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 0.05}>
              <Link href={`/services/${service.slug}`} className="panel group relative block h-full overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
                <span className="absolute left-0 top-0 h-full w-1 scale-y-0 bg-gold-warm transition-transform duration-500 group-hover:scale-y-100" />
                <span className="font-mono text-sm text-gold-warm">0{index + 1}</span>
                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-vivid to-purple-mid text-gold-highlight shadow-purple-sm transition group-hover:shadow-gold-sm">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-[var(--text-primary)]">{service.name}</h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                <span className="mt-6 inline-flex font-heading text-sm font-semibold text-gold-warm">Learn More {"->"}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    ["Strategy", "We understand your business, audience, and goals to design a clear, actionable growth plan."],
    ["Creation", "From content to creatives, we build assets that reflect your brand professionally and authentically."],
    ["Execution", "We manage platforms, campaigns, and communication with precision and consistency every day."],
    ["Growth", "We track, optimize, and scale your digital presence continuously for long-term results."],
  ];
  return (
    <section className="section surface-band">
      <div className="container-wide">
        <SectionHeading label="Our Process" title="Our Structured Approach" accent="to Growth" />
        <div className="relative mt-14 grid gap-8 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-gold-warm/30 lg:block" />
          {steps.map(([title, text], index) => (
            <ScrollReveal key={title} delay={index * 0.12}>
              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--bg-app)] bg-gold-warm font-display text-2xl font-bold text-white outline outline-2 outline-dashed outline-gold-warm/40">
                  0{index + 1}
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Advantage() {
  const features = [
    ["Business Hub Pages", "Local reach through our owned business hub network"],
    ["Influencer Network", "Creator and city-page distribution for launch visibility"],
    ["Data-Driven", "Campaign decisions guided by reporting and measurable signals"],
    ["Integrated Strategy", "Content, reputation, ads, and web working as one system"],
  ];
  return (
    <section className="section bg-[var(--bg-app)]">
      <div className="container-wide panel-strong grid items-center gap-12 p-8 lg:grid-cols-2 lg:p-12">
        <ScrollReveal>
          <SectionLabel className="justify-start">Our Advantage</SectionLabel>
          <h2 className="heading-dark">More Than an Agency - <span className="text-gold-highlight">A Growth Ecosystem</span></h2>
          <p className="body-dark mt-5">Unlike traditional agencies, we combine content, marketing, and distribution systems to deliver consistent visibility and reach.</p>
          <div className="mt-8 grid gap-4">
            {features.map(([title, text]) => (
              <GlassCard key={title} className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-electric/20 text-gold-highlight">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[var(--text-primary)]">{title}</h3>
                  <p className="mt-1 font-body text-sm text-[var(--text-secondary)]">{text}</p>
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
          <div key={stat.label} className="panel p-8 text-center transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
            <div className="font-display text-stat font-bold text-[var(--text-primary)]">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-3 font-label text-sm uppercase tracking-widest text-[var(--text-secondary)]">{stat.label}</p>
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
          <h2 className="heading-dark">A Digital Growth Partner <span className="text-gold-highlight">Built for Modern Businesses</span></h2>
          <p className="body-dark mt-5">YodhaMedia LLP is built for organizations that need more than disconnected digital tasks. We bring content, reputation, web, ads, and distribution into a structured operating system.</p>
          <div className="mt-7 grid gap-3">
            {["Healthcare-first communication sensitivity", "Professional content and creative direction", "Owned distribution and influencer support", "Reporting-led optimization", "Long-term partnership mindset"].map((item) => (
              <span key={item} className="font-body text-[var(--text-secondary)]"><span className="mr-2 text-gold-highlight">*</span>{item}</span>
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
        <SectionHeading label="Industries We Serve" title="Designed for Trust-Heavy" accent="Growth Markets" darkText />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div key={industry.label} className="rounded-[var(--radius-md)] border border-white/15 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 font-heading font-bold text-purple-deep">{industry.icon}</div>
              <p className="mt-3 font-label text-[13px] uppercase tracking-wider text-white/90">{industry.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const testimonials = [
    ["Dr. Priya Sharma", "Director, Sharma Multispeciality Clinic", "YodhaMedia transformed our clinic's online presence. We get 3x more appointment inquiries since they started managing our social media."],
    ["Rajesh Kumar", "Owner, HealthFirst Hospital", "Their ORM work helped us go from 3.2 to 4.8 stars on Google in 3 months. Absolutely professional and result-driven team."],
    ["Anita Patel", "Marketing Head, CareWell Hospitals", "The structured approach they bring is unlike any agency we've worked with. Every deliverable is on time and on brand."],
  ];
  return (
    <section className="section surface-band">
      <div className="container-wide">
        <SectionHeading label="Testimonials" title="Trusted by Professionals" accent="Who Value Structure" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map(([name, role, quote]) => (
            <div key={name} className="panel p-7 transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
              <div className="text-gold-highlight">*****</div>
              <p className="mt-5 font-body text-sm italic leading-7 text-[var(--text-secondary)]">&quot;{quote}&quot;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-deep font-heading font-bold text-white">{name.charAt(0)}</div>
                <div>
                  <p className="font-heading font-semibold text-[var(--text-primary)]">{name}</p>
                  <p className="font-body text-xs text-[var(--text-secondary)]">{role}</p>
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
        <SectionHeading label="Why Choose YodhaMedia" title="A Serious System," accent="Not a Freelancer Setup" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map(([icon, title]) => (
            <div key={title} className="panel p-6 transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-vivid/12 font-heading font-bold text-purple-vivid">{icon}</div>
              <p className="mt-4 font-heading text-sm font-semibold text-[var(--text-primary)]">{title}</p>
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
          <SectionHeading label="Insights" title="Digital Growth Notes" accent="for Serious Brands" align="left" />
          <Button href="/blog" variant="ghost">View Blog</Button>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel group overflow-hidden transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]">
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-purple-deep to-purple-vivid text-6xl transition group-hover:brightness-110">
                {post.icon}
                <span className="absolute left-4 top-4 rounded-full bg-gold-warm px-3 py-1 font-label text-[11px] uppercase tracking-wider text-white">{post.category}</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{post.title}</h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">{post.excerpt}</p>
                <span className="mt-5 inline-flex font-heading text-sm font-semibold text-gold-warm">Read More {"->"}</span>
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
          <h2 className="mx-auto max-w-3xl font-heading text-h2 font-bold text-white">Ready to Build Your <span className="font-display italic text-gold-highlight">Digital Presence?</span></h2>
          <p className="mx-auto mt-5 max-w-2xl font-body leading-8 text-white/70">Let&apos;s create a system that works for your business consistently and professionally.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ConsultationModal triggerClassName="animate-pulse-gold" />
            <Button href="/contact" variant="outline">Get Started Today</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ label, title, accent, align = "center", darkText = false }: { label: string; title: string; accent: string; align?: "center" | "left"; darkText?: boolean }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel className={align === "left" ? "justify-start" : undefined}>{label}</SectionLabel>
      <h2 className={darkText ? "font-heading text-h2 font-bold text-white" : "heading-dark"}>{title} <span className="text-gold-warm">{accent}</span></h2>
      <p className={darkText ? "mt-5 font-body text-base leading-8 text-white/75" : "body-dark mt-5"}>We partner with businesses and professionals who value consistency, quality, and long-term growth.</p>
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
            <span className="font-display text-6xl font-bold text-gold-highlight">50+</span>
            <p className="font-label text-label uppercase text-white/70">Happy Clients</p>
            <div className="mx-auto my-3 h-px w-10 bg-gold-warm/50" />
            <span className="font-display text-5xl font-bold text-gold-highlight">100+</span>
            <p className="font-label text-label uppercase text-white/70">Projects</p>
          </div>
        </div>
        {[LineChart, Radio, ShieldCheck, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-gold-warm text-white shadow-gold-sm"
            style={{ transform: `rotate(${index * 90}deg) translateX(176px) rotate(-${index * 90}deg)` }}
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
          <p className="mt-8 font-heading text-2xl font-bold text-[var(--text-primary)]">YodhaMedia LLP</p>
          <p className="mt-2 font-label text-label uppercase text-gold-warm">Structured Digital Growth</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
