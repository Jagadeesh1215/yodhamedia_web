import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { navItems } from "@/lib/constants/navigation";
import { services } from "@/lib/constants/services";
import { site } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="surface-band border-t border-[var(--border-soft)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-purple-vivid to-gold-warm font-heading text-xl font-bold text-white">
              Y
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-[var(--text-primary)]">
                YodhaMedia LLP
              </p>
              <p className="font-label text-label uppercase text-gold-warm">
                Digital Growth Systems
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm font-body text-sm leading-7 text-[var(--text-secondary)]">
            Helping hospitals, doctors, and businesses build strong online
            presence through structured content, marketing, and distribution
            systems.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:bg-gold-warm hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterColumn
          title="Quick Links"
          links={[
            { label: "Home", href: "/" },
            ...navItems.map(({ label, href }) => ({ label, href })),
          ]}
        />
        <FooterColumn
          title="Our Services"
          links={services.map((service) => ({
            label: service.name,
            href: `/services/${service.slug}`,
          }))}
        />
        <div>
          <h3 className="font-label text-label uppercase text-gold-warm">
            Contact Us
          </h3>
          <div className="mt-5 grid gap-3 font-body text-sm text-[var(--text-secondary)]">
            <p>{site.location}</p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <p>{site.website}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)] px-5 py-5">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 font-body text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>© 2026 YodhaMedia LLP. All Rights Reserved.</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-label text-label uppercase text-gold-warm">
        {title}
      </h3>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-sm text-[var(--text-secondary)] transition hover:text-gold-highlight"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
