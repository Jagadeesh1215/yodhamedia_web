import type { Metadata } from "next";
import {
  CTABanner,
  ProcessSteps,
  StatsSection,
} from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/constants/services";

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
            <SectionLabel className="justify-start">
              About YodhaMedia
            </SectionLabel>
            <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
              A Digital Growth Partner Built for{" "}
              <span className="text-gold-highlight">Modern Businesses</span>
            </h1>
            <p className="body-dark mt-6">
              We are a structured growth agency for professionals who need
              serious systems across content, reputation, websites, advertising,
              and distribution.
            </p>
          </div>
          <div className="panel-strong relative min-h-[340px] overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,145,13,0.28),transparent_35%)]" />
            <div className="relative flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-panel)]">
              <span className="font-display text-[150px] font-bold italic text-gold-highlight/80">
                Y
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel className="justify-start">Who We Are</SectionLabel>
            <h2 className="heading-light">
              Built Like a Partner,{" "}
              <span className="text-gold-warm">Not a Vendor</span>
            </h2>
          </div>
          <p className="body-light">
            YodhaMedia LLP combines strategic planning, creative production,
            online reputation, performance marketing, and distribution into one
            operating model. Our work is especially tuned for trust-heavy
            sectors like healthcare, where consistency and credibility matter
            before conversion.
          </p>
        </div>
      </section>
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
      <ProcessSteps />
      <section className="section bg-[var(--bg-app)]">
        <div className="container-wide text-center">
          <SectionLabel>What Makes Us Different</SectionLabel>
          <h2 className="heading-dark">
            Content, Marketing, and Distribution{" "}
            <span className="text-gold-highlight">Working Together</span>
          </h2>
          <p className="body-dark mx-auto mt-5 max-w-3xl">
            The network advantage is simple: your presence is not limited to
            your own page. We use business hub pages, influencer networks,
            consistent reporting, and integrated strategy to expand reach while
            keeping communication professional.
          </p>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
