"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  IndustriesSection,
  CTABanner,
} from "@/components/sections/HomeSections";

interface ServiceDetailClientProps {
  service: {
    slug: string;
    emoji: string;
    name: string;
    category: string;
    hero: string;
    description: string;
    deliverables: string[];
    bestFor: string;
    challenge: string[];
    solution: string[];
    process: string[];
    benefits: string[];
  };
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div
      ref={containerRef}
      className="bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-500"
    >
      {/* --- PROTOCOL HERO --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 overflow-hidden border-b border-[var(--border-soft)] hero-shell">
        {/* Floating Background Text */}
        <motion.div
          style={{ y: watermarkY }}
          className="absolute top-20 left-6 pointer-events-none font-black text-[18vw] leading-none opacity-[0.03] select-none italic tracking-tighter"
        >
          {service.category}
        </motion.div>

        <div className="container-wide px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-16"
          >
            <Link
              href="/services"
              className="admin-chip hover:border-[var(--gold-warm)] transition-colors"
            >
              <ArrowLeft size={10} className="mr-2" />
              Archive / {service.slug}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_450px] gap-16 items-end">
            <div>
              <span className="admin-kicker mb-4 block underline decoration-var(--gold-warm)/30 underline-offset-8">
                Service Protocol 00{service.deliverables.length}
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] uppercase italic">
                {service.name.split(" ")[0]} <br />
                <span className="stroke-text opacity-80">
                  {service.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>

            <div className="panel p-8 backdrop-blur-md bg-[var(--bg-frost)]">
              <p className="body-light italic mb-8 border-l-2 border-[var(--gold-warm)] pl-6">
                {service.description}
              </p>
              <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                <div className="flex justify-between border-b border-[var(--border-soft)] pb-2">
                  <span className="text-[var(--text-muted)]">Objective</span>
                  <span className="text-[var(--gold-warm)]">
                    Growth & Authority
                  </span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-soft)] pb-2">
                  <span className="text-[var(--text-muted)]">
                    Client Archetype
                  </span>
                  <span className="text-[var(--text-primary)]">
                    {service.bestFor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE AUDIT: SYSTEM FRICTION VS SOLUTION --- */}
      <section className="relative z-20">
        <div className="grid md:grid-cols-2">
          {/* Challenge Side */}
          <div className="bg-[var(--dark-surface)] p-12 md:p-24 border-r border-[var(--border-soft)]">
            <div className="admin-kicker mb-12 text-red-500 opacity-70">
              Identified Friction
            </div>
            <div className="space-y-12">
              {service.challenge.map((text, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="font-mono text-xs text-white/20">
                    [{i + 1}]
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">
                    {text}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {/* Solution Side */}
          <div className="bg-[var(--bg-panel-strong)] p-12 md:p-24 surface-band">
            <div className="admin-kicker mb-12">System Resolution</div>
            <div className="space-y-12">
              {service.solution.map((text, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="font-mono text-xs text-[var(--gold-warm)]">
                    SPEC_0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic leading-none">
                    {text}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE DELIVERABLES GRID --- */}
      <section className="section bg-[var(--bg-app)]">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-20">
            <h2 className="heading-light text-5xl md:text-7xl uppercase italic tracking-tighter">
              The <span className="text-[var(--gold-warm)]">Outputs</span>
            </h2>
            <span className="admin-kicker hidden md:block">
              Delivery Manifest v1.0
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-strong)] border border-[var(--border-strong)]">
            {service.deliverables.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--bg-panel)] p-12 hover:bg-[var(--purple-deep)] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} className="text-[var(--gold-warm)]" />
                </div>
                <div className="mb-16 flex justify-between items-start">
                  <Zap size={20} className="text-[var(--gold-warm)]" />
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    LVL_0{i + 1}
                  </span>
                </div>
                <h4 className="text-xl font-bold uppercase leading-tight group-hover:text-white">
                  {item}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DEPLOYMENT PROTOCOL --- */}
      <section className="section border-t border-[var(--border-soft)] bg-[var(--bg-panel-strong)]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[450px_1fr] gap-20">
            <div className="sticky top-32 h-fit">
              <div className="admin-kicker mb-6">Workflow Orchestration</div>
              <h2 className="heading-light text-6xl leading-[0.85] mb-10 uppercase italic">
                Strategic <br /> Deployment.
              </h2>
              <Button
                href="/contact"
                className="w-full h-16 bg-[var(--purple-vivid)] text-white hover:bg-[var(--gold-warm)] transition-all rounded-[var(--radius-sm)] uppercase font-bold tracking-widest text-[11px]"
              >
                Initiate Project Protocol
              </Button>
            </div>

            <div className="divide-y divide-[var(--border-soft)]">
              {service.process.map((step, i) => (
                <div
                  key={i}
                  className="group py-10 flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-10">
                    <span className="font-mono text-4xl font-black text-[var(--gold-warm)] opacity-20 group-hover:opacity-100 transition-opacity italic">
                      0{i + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:translate-x-3 transition-transform">
                      {step}
                    </h3>
                  </div>
                  <Plus className="text-[var(--text-muted)] group-hover:rotate-90 group-hover:text-[var(--gold-warm)] transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
