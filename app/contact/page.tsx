import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/constants/site";
import { services } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact YodhaMedia LLP for digital growth consultation.",
};

export default function ContactPage() {
  return (
    <section className="section hero-shell pt-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionLabel className="justify-start">Contact Us</SectionLabel>
          <h1 className="font-heading text-h2 font-bold text-[var(--text-primary)]">
            Let&apos;s Build Your{" "}
            <span className="text-gold-highlight">Digital Growth System</span>
          </h1>
          <p className="body-dark mt-5">
            Share your goals and we&apos;ll help you choose the right path
            across content, ORM, web, ads, and distribution.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Reach us
              </p>
              <div className="mt-3 grid gap-2 font-body text-[var(--text-secondary)]">
                <p>{site.location}</p>
                <p>{site.phone}</p>
                <p>{site.email}</p>
                <p>{site.website}</p>
              </div>
            </div>
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Free booking
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                If you prefer a self-serve slot instead of a form reply, use the
                free consultation booking page. It is ready for a free Calendly
                or Cal.com link.
              </p>
              <Link
                href="/book-consultation"
                className="mt-4 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-gold-warm/10 px-4 text-sm font-semibold text-gold-warm transition hover:-translate-y-0.5"
              >
                Book a free slot
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
              Service options
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service.slug}
                  className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {service.name}
                </span>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
