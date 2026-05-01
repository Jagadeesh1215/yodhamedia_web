import type { Metadata } from "next";
import Link from "next/link";
import {
  CTABanner,
  ProcessSteps,
  WhyChoose,
} from "@/components/sections/HomeSections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore YodhaMedia LLP services across social media, ORM, branding, web design, digital marketing, and influencer marketing.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section hero-shell pt-32">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel className="justify-start">Our Services</SectionLabel>
            <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
              Complete Digital Growth,{" "}
              <span className="text-gold-highlight">Under One System</span>
            </h1>
            <p className="body-dark mt-6">
              We do not offer isolated services. We build integrated systems
              that move visibility, trust, and enquiries together.
            </p>
          </div>
          <div className="relative mx-auto h-80 w-80 rounded-full border border-gold-warm/20 bg-purple-electric/10 shadow-[var(--shadow-card)]">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-panel)] text-2xl shadow-[var(--shadow-soft)]"
                style={{
                  transform: `rotate(${index * 60}deg) translateX(145px) rotate(-${index * 60}deg)`,
                }}
              >
                {service.emoji}
              </div>
            ))}
            <div className="absolute inset-20 flex items-center justify-center rounded-full bg-purple-deep font-display text-6xl font-bold text-gold-highlight">
              Y
            </div>
          </div>
        </div>
      </section>
      <section className="section surface-band">
        <div className="container-wide">
          <div className="panel p-8">
            <h2 className="mt-1 font-heading text-3xl font-bold text-[var(--text-primary)]">
              Not Just Services. A Connected Growth System.
            </h2>
            <p className="body-light mt-4">
              Each service is designed to support the next: content builds
              familiarity, ORM builds trust, websites convert intent, ads
              accelerate demand, and distribution expands reach.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="panel p-7 transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-warm font-display text-xl font-bold text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <service.icon className="h-7 w-7 text-purple-vivid" />
                      <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                        {service.name}
                      </h3>
                      <span className="rounded-full bg-purple-vivid/10 px-3 py-1 font-label text-[10px] uppercase tracking-wider text-purple-vivid">
                        {service.category}
                      </span>
                    </div>
                    <p className="body-light mt-4">{service.description}</p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {service.deliverables.slice(0, 6).map((item) => (
                        <span
                          key={item}
                          className="font-body text-sm text-[var(--text-secondary)]"
                        >
                          + {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl bg-gold-pale/45 p-4 font-body text-sm text-[var(--text-primary)]">
                      Best For: {service.bestFor}
                    </div>
                    <Button variant="ghost" className="mt-5 px-0">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProcessSteps />
      <WhyChoose />
      <CTABanner />
    </>
  );
}
