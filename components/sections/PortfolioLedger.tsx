"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, MoveRight } from "lucide-react";

export default function PortfolioLedger({ cases }: { cases: any[] }) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-wide px-6">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 md:mb-40 gap-12">
          <div className="max-w-3xl">
            <SectionLabel className="justify-start mb-8">
              Selected Works
            </SectionLabel>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight text-[var(--text-primary)] leading-[0.85] mb-12">
              The <span className="text-gold-highlight">System</span> <br />
              Archive.
            </h1>
          </div>
          <p className="text-xl text-[var(--text-secondary)] max-w-sm pb-4 border-b border-[var(--border-soft)]">
            Moving beyond deliverables. We build self-sustaining digital
            ecosystems.
          </p>
        </div>

        {/* Overlapping Projects List */}
        <div className="space-y-32 md:space-y-64">
          {cases.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
            >
              {/* Visual "Box" - Placeholder for Image */}
              <div className="relative w-full lg:w-3/5 aspect-[4/3] bg-zinc-900 rounded-[2.5rem] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-highlight/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[15vw] font-black text-white/[0.03] select-none tracking-tighter">
                    {project.imageText}
                  </span>
                </div>
                <div className="absolute bottom-10 right-10 flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="text-xs font-mono uppercase text-gold-highlight">
                    View Case
                  </span>
                  <div className="p-3 bg-gold-highlight rounded-full text-black">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="space-y-4">
                  <span className="text-sm font-mono uppercase tracking-[0.3em] text-gold-highlight">
                    [ 0{idx + 1} { '//' }{project.category} ]
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tighter">
                    {project.title}
                  </h2>
                </div>

                <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-[var(--border-soft)]">
                  <p className="text-xs font-mono uppercase text-zinc-500 mb-2">
                    Primary Impact
                  </p>
                  <p className="text-2xl font-bold text-white flex items-center gap-3">
                    <MoveRight className="text-gold-highlight" size={20} />
                    {project.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
