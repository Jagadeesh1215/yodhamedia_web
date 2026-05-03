"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, Network, Newspaper, Building2 } from "lucide-react";

const HUBS = [
  {
    id: "01",
    label: "Infrastructure",
    title: "City Pages",
    desc: "Dedicated digital real estate for every major Indian commercial hub, capturing local search volume natively.",
    icon: <Building2 size={20} />,
  },
  {
    id: "02",
    label: "Editorial",
    title: "Business Features",
    desc: "High-authority spotlights that transform standard business listings into compelling brand stories.",
    icon: <Newspaper size={20} />,
  },
  {
    id: "03",
    label: "Scale",
    title: "Campaign Amplification",
    desc: "Proprietary distribution algorithms that push content across our network of owned media nodes.",
    icon: <Network size={20} />,
  },
];

export default function BusinessHubView() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container-wide px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <SectionLabel className="justify-start mb-8">
            The Distribution Layer
          </SectionLabel>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[ -0.04em] text-white leading-none">
            Mastering <span className="text-gold-highlight">Local</span> <br />
            Discovery.
          </h1>
          <div className="mt-12 flex flex-col md:flex-row md:items-end gap-8">
            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
              We don&apos;t just create content; we own the pipes it flows
              through. Our Business Hub is a private network of high-authority
              city nodes.
            </p>
            <div className="flex-1 h-[1px] bg-zinc-800 hidden md:block mb-4" />
          </div>
        </div>

        {/* Feature Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-zinc-800">
          {HUBS.map((hub, idx) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-zinc-800 hover:bg-zinc-900/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-16">
                <span className="font-mono text-gold-highlight text-sm tracking-widest">
                  {hub.id} {`//`} {hub.label}
                </span>
                <div className="text-zinc-600 group-hover:text-gold-highlight transition-colors">
                  <ArrowUpRight size={24} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-400 group-hover:border-gold-highlight group-hover:text-gold-highlight transition-all">
                  {hub.icon}
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {hub.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{hub.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Footer Stat */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Network Nodes", val: "50+" },
            { label: "Monthly Reach", val: "2.4M" },
            { label: "City Coverage", val: "All-India" },
            { label: "Authority Score", val: "High" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/20"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
