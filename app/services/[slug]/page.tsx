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

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="section hero-shell pt-32">
        <div className="container-wide">
          <p className="font-body text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-gold-highlight">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/services" className="hover:text-gold-highlight">
              Services
            </Link>{" "}
            / {service.name}
          </p>
          <SectionLabel className="mt-8 justify-start">
            {service.category}
          </SectionLabel>
          <h1 className="max-w-4xl font-heading text-h2 font-bold text-[var(--text-primary)]">
            {service.hero}
          </h1>
          <p className="body-dark mt-6 max-w-3xl">{service.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">Book Consultation</Button>
            <Button href="/our-work" variant="outline">
              See Our Work
            </Button>
          </div>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <ProblemSolution
            title="The Challenge"
            tone="problem"
            items={service.challenge}
          />
          <ProblemSolution
            title="Our Solution"
            tone="solution"
            items={service.solution}
          />
        </div>
      </section>
      <section className="section bg-[var(--bg-app)]">
        <div className="container-wide">
          <SectionLabel>What We Offer</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="panel p-5 font-heading font-semibold text-[var(--text-primary)]"
              >
                <span className="mr-2 text-gold-warm">+</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide">
          <SectionLabel>Service Process</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, index) => (
              <div key={step} className="panel p-6 text-center">
                <span className="font-display text-4xl font-bold text-gold-warm">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-heading font-bold text-[var(--text-primary)]">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-[var(--bg-app)]">
        <div className="container-wide">
          <SectionLabel>Benefits You Get</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="panel-strong p-6 text-center">
                <div className="text-3xl">{service.emoji}</div>
                <p className="mt-4 font-heading font-semibold text-[var(--text-primary)]">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <IndustriesSection />
      <CTABanner />
    </>
  );
}

function ProblemSolution({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "problem" | "solution";
  items: string[];
}) {
  return (
    <div
      className={`rounded-3xl border p-7 ${tone === "problem" ? "border-gold-warm/40 bg-gold-pale/30" : "panel"}`}
    >
      <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
        {tone === "problem" ? "-" : "+"} {title}
      </h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p
            key={item}
            className="font-body text-sm leading-7 text-[var(--text-secondary)]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
