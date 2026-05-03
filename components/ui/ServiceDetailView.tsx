"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import {
  IndustriesSection,
  CTABanner,
} from "@/components/sections/HomeSections";

// Define the shape of the service data based on your constants
interface ServiceDetailProps {
  service: {
    name: string;
    hero: string;
    category: string;
    description: string;
    emoji: string;
    challenge: string[];
    solution: string[];
    deliverables: string[];
    process: string[];
    benefits: string[];
  };
}

export default function ServiceDetailView({ service }: ServiceDetailProps) {
  return (
    <div className="bg-[var(--bg-app)]">
      {/* Hero: Responsive padding and font-scaling */}
      <section className="relative pt-24 md:pt-32 pb-16 lg:pb-24 border-b border-[var(--border-soft)]">
        <div className="container-wide px-6">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-8 md:mb-12">
            <Link
              href="/services"
              className="flex items-center gap-1 hover:text-gold-highlight transition-colors"
            >
              <ArrowLeft size={12} /> Services
            </Link>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-gold-highlight truncate">{service.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <SectionLabel className="justify-start mb-6">
              {service.category}
            </SectionLabel>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-[var(--text-primary)] leading-[1.1]">
              {service.hero}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {service.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" className="w-full sm:w-auto px-8">
                Book Consultation
              </Button>
              <Button
                href="/our-work"
                variant="outline"
                className="w-full sm:w-auto px-8"
              >
                See Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategy Grid: Stacks on mobile, side-by-side on desktop */}
      <section className="py-12 md:py-20 bg-[var(--bg-panel)]/30">
        <div className="container-wide px-6 grid lg:grid-cols-2 gap-6 md:gap-8">
          <StrategyCard
            title="The Market Gap"
            items={service.challenge}
            type="problem"
            icon={<AlertCircle className="text-red-500/50" />}
          />
          <StrategyCard
            title="Our Resolution"
            items={service.solution}
            type="solution"
            icon={<CheckCircle2 className="text-gold-highlight" />}
          />
        </div>
      </section>

      {/* Deliverables: 3-column grid that simplifies to 1 on mobile */}
      <section className="py-20">
        <div className="container-wide px-6">
          <SectionLabel className="mb-12">Architecture & Output</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-soft)] flex items-center gap-4 hover:border-gold-highlight/40 transition-colors"
              >
                <span className="text-gold-highlight font-mono text-xs">
                  0{i + 1}
                </span>
                <span className="font-bold text-[var(--text-primary)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process: Horizontal on desktop, vertical on mobile */}
      <section className="py-20 border-y border-[var(--border-soft)]">
        <div className="container-wide px-6">
          <SectionLabel className="mb-12 text-center">
            Execution Roadmap
          </SectionLabel>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="relative p-8 rounded-3xl bg-[var(--bg-panel)] border border-[var(--border-soft)]"
              >
                <span className="block text-4xl font-black text-white/5 mb-4">
                  {i + 1}
                </span>
                <h3 className="font-bold text-[var(--text-primary)]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IndustriesSection />
      <CTABanner />
    </div>
  );
}

function StrategyCard({
  title,
  items,
  type,
  icon,
}: {
  title: string;
  items: string[];
  type: "problem" | "solution";
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`p-8 md:p-10 rounded-[2.5rem] border ${type === "problem" ? "border-red-500/10 bg-red-500/[0.02]" : "border-gold-highlight/20 bg-gold-highlight/[0.02]"}`}
    >
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-xl font-bold tracking-tight uppercase text-[var(--text-primary)]">
          {title}
        </h2>
      </div>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex gap-3 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed"
          >
            <span className="opacity-30 font-mono mt-1">[{idx + 1}]</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
