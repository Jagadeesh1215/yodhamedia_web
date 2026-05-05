import type { Metadata } from "next";
import { CTABanner, StatsSection } from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/constants/services";
import { GrowthTree } from "@/components/ui/GrowthTree";
import WhoWeAre from "@/components/ui/whoweare";
import DifferentiationEditorial from "@/components/ui/differentiationsection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet YodhaMedia LLP, a structured digital growth partner for hospitals, doctors, clinics, and modern businesses.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section hero-shell pt-32">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="flex justify-start text-gold-highlight font-semibold mb-4 tracking-wider uppercase text-sm">
              About YodhaMedia
            </span>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
              A Digital Growth Partner Built for{" "}
              <span className="text-gold-highlight">Modern Businesses</span>
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-lg">
              We help hospitals, doctors, and businesses build a strong,
              consistent, and result-driven digital presence.
            </p>
          </div>

          <div className="panel-strong relative md:min-h-[450px] overflow-hidden p-8 rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-panel)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,145,13,0.15),transparent_60%)]" />
            <div className="relative flex items-center justify-center">
              <GrowthTree />
            </div>
          </div>
        </div>
      </section>
      <WhoWeAre />
      <StatsSection />
      <section className="section surface-band">
        <div className="container-wide">
          <SectionLabel>What We Do</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="panel p-6">
                <service.icon className="h-8 w-8 text-gold-warm" />
                <h3 className="mt-4 font-heading text-xl font-semibold text-[var(--text-primary)]">
                  {service.name}
                </h3>
                <p className="mt-3 font-body text-sm leading-7 text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DifferentiationEditorial />
      <CTABanner />
    </>
  );
}
