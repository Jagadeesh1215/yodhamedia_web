import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/lib/constants/site";
import { services } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact YodhaMedia LLP for digital growth consultation.",
};

export default function ContactPage() {
  return (
    <section className="section hero-shell pt-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
          <div className="mt-8 grid gap-3 font-body text-[var(--text-secondary)]">
            <p>{site.location}</p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <p>{site.website}</p>
          </div>
        </div>
        <form className="panel-strong p-7">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Name" className="form-field" />
            <input required placeholder="Phone" className="form-field" />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-field mt-4 w-full"
          />
          <select className="form-field mt-4 w-full">
            <option>Service Interested In</option>
            {services.map((service) => (
              <option key={service.slug}>{service.name}</option>
            ))}
          </select>
          <textarea
            placeholder="Message"
            rows={5}
            className="form-field mt-4 h-auto w-full resize-none py-4"
          />
          <button className="mt-5 h-12 w-full rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-gold-md">
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}
