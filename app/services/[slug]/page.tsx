import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CTABanner,
  IndustriesSection,
} from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants/services";
import { CheckCircle2, XCircle, ArrowRight, ChevronRight } from "lucide-react";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.name} | YodhaMedia`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();

  return (
    <main className="bg-[var(--bg-app)]">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-shell">
        <div className="container-wide px-6">
          <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-12">
            <Link
              href="/"
              className="hover:text-[var(--gold-warm)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={10} />
            <Link
              href="/services"
              className="hover:text-[var(--gold-warm)] transition-colors"
            >
              Services
            </Link>
            <ChevronRight size={10} />
            <span className="text-[var(--text-primary)]">{service.name}</span>
          </nav>

          <div className="max-w-5xl">
            <SectionLabel className="justify-start mb-6 text-sm">
              {service.category}
            </SectionLabel>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-[var(--text-primary)] leading-[0.95] mb-8">
              {service.hero}
            </h1>
            <p className="text-xl md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-12">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <Button href="/contact" className="h-14 px-10 text-lg shadow-lg">
                Book Consultation
              </Button>
              <Button
                href="/our-work"
                variant="outline"
                className="h-14 px-10 text-lg group border-[var(--border-strong)]"
              >
                See Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHALLENGE / SOLUTION SECTION --- */}
      <section className="py-24 border-y border-[var(--border-soft)] surface-band">
        <div className="container-wide px-6 grid gap-12 lg:grid-cols-2">
          <ServiceOutcomeCard
            type="challenge"
            title="The Industry Friction"
            items={service.challenge}
          />
          <ServiceOutcomeCard
            type="solution"
            title="The Engineered Response"
            items={service.solution}
          />
        </div>
      </section>

      {/* --- MINIMALIST DELIVERABLES --- */}
      <section className="py-20">
        <div className="container-wide px-6">
          <div className="mb-16">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-[var(--gold-warm)] mb-4">
              Service Scope
            </h2>
            <div className="h-px w-12 bg-[var(--gold-warm)]" />
          </div>

          <div className="divide-y divide-[var(--border-soft)] border-t border-[var(--border-soft)]">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="group grid grid-cols-1 md:grid-cols-12 py-8 items-baseline transition-all duration-300 hover:bg-[var(--bg-panel)] px-4 -mx-4 rounded-lg"
              >
                <span className="col-span-1 font-mono text-[10px] text-[var(--text-muted)]">
                  0{idx + 1}
                </span>
                <h3 className="col-span-1 md:col-span-7 text-xl md:text-2xl font-medium text-[var(--text-primary)]">
                  {item}
                </h3>
                <p className="col-span-1 md:col-span-4 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] md:text-right mt-2 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  Fully Integrated
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IndustriesSection />
      <div className="py-12">
        <CTABanner />
      </div>
    </main>
  );
}

function ServiceOutcomeCard({
  type,
  title,
  items,
}: {
  type: "challenge" | "solution";
  title: string;
  items: string[];
}) {
  const isProblem = type === "challenge";
  return (
    <div
      className={`p-10 rounded-[2.5rem] border transition-all duration-500 ${
        isProblem
          ? "border-red-500/20 bg-red-500/5"
          : "border-[var(--gold-warm)]/20 bg-[var(--gold-warm)]/5"
      }`}
    >
      <div className="flex items-center gap-4 mb-8">
        {isProblem ? (
          <XCircle className="text-red-500" size={20} />
        ) : (
          <CheckCircle2 className="text-[var(--gold-warm)]" size={20} />
        )}
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        {items.map((item, idx) => (
          <p
            key={idx}
            className="text-lg text-[var(--text-secondary)] leading-relaxed font-medium"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
