"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { navItems } from "@/lib/constants/navigation";
import { services } from "@/lib/constants/services";
import { site } from "@/lib/constants/site";
import { motion } from "framer-motion";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="surface-band border-t border-[var(--border-soft)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          {/* Animated Logo */}
          <Link href="/" className="group relative flex items-center gap-3">
            <div className="absolute -inset-2 rounded-lg bg-gold-warm/20 blur-xl opacity-0 transition-opacity duration-500" />

            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-warm to-gold-highlight rounded-sm rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-[2px] bg-[var(--bg-app)] rounded-sm rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.span
                className="relative flex h-10 w-10 items-center justify-center font-display text-lg font-bold text-gold-warm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                Y
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-display text-xl font-bold tracking-widest text-ghost group-hover:text-gold transition-colors duration-300">
                  YODHA
                </span>
                <span className="block font-heading text-[11px] tracking-[0.3em] text-gold-warm/80 -mt-1">
                  MEDIA
                </span>
              </motion.div>
            </div>
          </Link>
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
