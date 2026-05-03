"use client";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function DifferentiationEditorial() {
  const features = [
    {
      number: "01",
      title: "Content Production",
      desc: "We don't just 'make posts.' We build high-fidelity media assets designed to establish clinical and professional authority.",
    },
    {
      number: "02",
      title: "Strategic Marketing",
      desc: "Precision-engineered campaigns that prioritize credibility over clicks, ensuring your message reaches the right decision-makers.",
    },
    {
      number: "03",
      title: "The Network Advantage",
      desc: "Our unique distribution model leverages business hubs and influencer nodes to make your brand omnipresent, not just present.",
    },
  ];

  return (
    <section className="section bg-[var(--bg-app)] py-32">
      <div className="container-wide">
        <div className="max-w-4xl">
          <SectionLabel className="justify-start">
            What Makes Us Different
          </SectionLabel>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-[var(--text-primary)] mt-6 mb-12">
            Integration is our{" "}
            <span className="text-gold-highlight">unfair advantage.</span>
          </h2>
        </div>

        <div className="mt-20 border-t border-[var(--border-soft)]">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group border-b border-[var(--border-soft)] py-12 hover:bg-gold-highlight/[0.02] transition-colors duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1.5fr_1fr_auto] gap-8 items-center px-4">
                {/* Numbering */}
                <span className="text-sm font-mono text-gold-highlight/60 font-bold">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="body-dark text-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Integrated Logic */}
        <div className="mt-16 flex flex-col lg:flex-row justify-between items-center gap-6 p-8 ">
          <p className="text-xl font-medium text-[var(--text-primary)]">
            Every element works together to create a{" "}
            <span className="italic">self-sustaining growth loop.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
