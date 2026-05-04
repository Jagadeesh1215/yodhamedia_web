"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/constants/case-studies";

export default function PortfolioLedger({ cases }: { cases: CaseStudy[] }) {
  return (
    <section className="py-24 lg:py-44 bg-[var(--bg-app)]">
      <div className="container-wide px-6">
        {/* Minimal Editorial Header */}
        <div className="max-w-6xl mb-32 md:mb-56">
          <SectionLabel className="justify-start mb-8 text-[var(--gold-warm)]">
            Our Works
          </SectionLabel>
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-[var(--text-primary)] mb-16">
            Campaign Systems <br />
            <span className="opacity-40 text-gold-warm">
              Not One-Off Deliverables.
            </span>
          </h1>
          <div className="h-px w-24 bg-[var(--gold-warm)] mb-8" />
          <p className="text-sm md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            A curated archive of the systems we build, showing the strategy,
            implementation, and business outcome behind each engagement.
          </p>
        </div>

        {/* The Ledger List */}
        <div className="relative border-t border-[var(--border-soft)]">
          {cases.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 lg:py-32 border-b border-[var(--border-soft)] transition-colors hover:bg-[var(--gold-warm)]/[0.02]"
            >
              {/* 01. Metadata (The 'Tab') */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-sm text-[var(--gold-warm)] flex items-center gap-2 mb-4">
                    <span className="w-8 h-[1px] bg-[var(--gold-warm)]" />
                    Archive No. 0{idx + 1}
                  </span>
                  <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                    {project.category}
                  </p>
                </div>

                {/* Impact Stat - Minimalist version */}
                <div className="hidden lg:block mt-auto">
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">
                    Impact Metric
                  </p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* 02. Title & Description */}
              <div className="lg:col-span-5 space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tighter group-hover:text-[var(--gold-warm)] transition-colors duration-500">
                  {project.title}
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md">
                  {project.description}
                </p>
                <p className="text-sm leading-7 text-[var(--text-secondary)] max-w-xl">
                  {project.details}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--gold-warm)] group-hover:gap-4 transition-all">
                  Read Case Study <ArrowUpRight size={14} />
                </button>
              </div>

              {/* 03. Minimal Visual (The 'Preview') */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/5] bg-[var(--bg-panel)] rounded-sm overflow-hidden border border-[var(--border-soft)] group-hover:border-[var(--gold-warm)] transition-colors">
                  {/* Subtle Text Mask */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700">
                    <span className="text-8xl font-black tracking-tighter uppercase transform -rotate-90">
                      {project.imageText || "Project"}
                    </span>
                  </div>

                  {/* Grain Overlay for Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
