"use client";
import { motion } from "framer-motion";
import { services } from "@/lib/constants/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesHero() {
  return (
    <section className="bg-[var(--bg-app)]">
      {/* Introduction Header */}
      <div className="container-wide mt-16 pt-20 md:pt-32 pb-12 md:pb-20 px-6">
        <SectionLabel className="justify-start mb-6">Our Services</SectionLabel>
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-primary)] leading-[1.1] md:leading-[0.85]">
          Complete Digital Growth, <br />
          <span className="block md:inline text-gold-highlight">
            Under One System.
          </span>
        </h2>
        <p className="mt-6 md:mt-10 text-sm md:text-xl text-[var(--text-secondary)] max-w-4xl leading-relaxed">
          We do not offer isolated services. We build integrated systems that
          move visibility, trust, and enquiries together.
        </p>
      </div>

      {/* Vertical Service Stack */}
      <div className="flex flex-col mt-10 md:mt-60">
        {services.map((service, index) => (
          <div
            key={service.slug}
            // FIXED: Only use sticky on desktop (lg). On mobile, standard flow prevents content cutoff.
            className="lg:sticky top-0 min-h-[auto] lg:min-h-screen flex items-center bg-[var(--bg-app)]  overflow-hidden"
          >
            <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-20 px-6 relative z-10">
              {/* Left Side: Massive Branding & Context */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="order-1"
              >
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gold-highlight text-black shadow-xl shadow-gold-highlight/20">
                    <service.icon
                      className="w-6 h-6 md:w-8 md:h-8"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-gold-highlight">
                      {service.category}
                    </p>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] tracking-tighter">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <p className="text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8 md:mb-10">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[var(--border-soft)] text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] bg-[var(--bg-panel)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Side: Strategic Logic Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="order-1 lg:order-2  p-6 md:p-10 lg:p-12 "
              >
                <div className="space-y-8 md:space-y-10">
                  {/* The Problem */}
                  <div>
                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-red-500/60 mb-4 border-b border-white/5 pb-2">
                      The Market Gap
                    </h4>
                    <div className="space-y-3">
                      {service.challenge.map((c, i) => (
                        <p
                          key={i}
                          className="text-sm md:text-base text-[var(--text-secondary)] opacity-80 leading-relaxed"
                        >
                          <span className="text-red-500 mr-2">•</span> {c}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* The Solution */}
                  <div>
                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gold-highlight mb-4 border-b border-white/5 pb-2">
                      Our Resolution
                    </h4>
                    <div className="space-y-3">
                      {service.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gold-highlight shrink-0 mt-0.5" />
                          <p className="text-sm md:text-base font-bold text-[var(--text-primary)]">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/services/${service.slug}`} className="block">
                    <button className="w-full group py-4 md:py-5 px-6 md:px-8 rounded-xl cursor-none md:rounded-2xl bg-gold-highlight text-black font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-gold-bright active:scale-[0.98]">
                      More on this Service{" "}
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
