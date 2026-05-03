"use client";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Handshake, Target, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhoWeAre() {
  const pillars = [
    { name: "Strategic Planning", icon: Target },
    { name: "Creative Production", icon: Zap },
    { name: "Online Reputation", icon: ShieldCheck },
    { name: "Performance Marketing", icon: BarChart3 },
    { name: "Distribution", icon: Handshake },
  ];

  return (
    <section className="section surface-band overflow-hidden ">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Narrative */}
          <div className="relative z-10">
            <SectionLabel className="justify-start mb-6">
              Who We Are
            </SectionLabel>
            <h2 className="heading-light text-4xl lg:text-5xl leading-tight">
              Built Like a Partner,{" "}
              <span className="text-gold-warm italic block lg:inline">
                Not a Vendor
              </span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="body-light text-lg leading-relaxed border-l-2 border-gold-warm/30 pl-6">
                YodhaMedia LLP combines strategic planning, creative production,
                online reputation, performance marketing, and distribution into
                one operating model.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-widest text-gold-warm font-bold mb-2">
                  The Healthcare Edge
                </p>
                <p className="body-light text-base italic">
                  &quot;Our work is especially tuned for trust-heavy sectors
                  where consistency and credibility matter before
                  conversion.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Ecosystem */}
          <div className="relative">
            {/* Background decorative element */}
            <div className="absolute -inset-4 bg-gold-warm/10 blur-[60px] rounded-full" />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`group p-6 rounded-3xl border transition-all duration-300 ${
                    idx === 0
                      ? "sm:col-span-2 bg-gold-warm/10 border-gold-warm/20"
                      : "bg-[var(--bg-panel)] border-[var(--border-soft)] hover:border-gold-warm/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${idx === 0 ? "bg-gold-warm text-black" : "bg-white/5 text-gold-warm"}`}
                    >
                      <pillar.icon size={24} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                      {pillar.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
