import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Portfolio examples and project systems by YodhaMedia LLP.",
};

export default function OurWorkPage() {
  const cases = [
    ["Healthcare ORM System", "Google profile optimization, review workflows, and local trust-building content."],
    ["Clinic Social Launch", "Reels, doctor explainers, campaign creatives, and platform management."],
    ["Business Website Build", "Responsive web presence with service pages, blog structure, and inquiry paths."],
  ];
  return (
    <>
      <section className="section hero-shell pt-32">
        <div className="container-wide text-center">
          <SectionLabel>Our Work</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">Campaign Systems, <span className="text-gold-highlight">Not One-Off Deliverables</span></h1>
          <p className="body-dark mx-auto mt-5 max-w-3xl">A polished placeholder portfolio for now, ready to be replaced with real case studies when project assets are available.</p>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {cases.map(([title, text], index) => (
            <div key={title} className="panel p-7">
              <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-deep to-purple-vivid font-display text-6xl font-bold text-gold-highlight">0{index + 1}</div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
              <p className="body-light mt-3">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
