import Link from "next/link";
import { ArrowLeft, Home, Mail, Search, Sparkles } from "lucide-react";
import { site } from "@/lib/constants/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-app)] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(201,145,13,0.14),transparent_34%)]" />
      <div className="container-wide relative z-10">
        <div className="panel-strong mx-auto max-w-4xl overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-[var(--gold-warm)]">
                <Sparkles className="h-4 w-4" />
                Page not found
              </div>
              <h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold tracking-tight text-[var(--text-primary)] md:text-7xl">
                The page drifted out of the system.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                The URL might be misspelled, the page may have moved, or the
                content may no longer exist. Use the links below to get back to
                the main site quickly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  <Search className="h-4 w-4" />
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[var(--gold-warm)] transition hover:text-[var(--gold-highlight)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  View services
                </Link>
                <span className="hidden h-4 w-px bg-[var(--border-soft)] md:block" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition hover:text-[var(--text-primary)]"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--border-soft)] bg-[var(--bg-panel-strong)] p-8 md:p-12 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)]">
                  Helpful links
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    { href: "/services", label: "Services" },
                    { href: "/our-work", label: "Case studies" },
                    { href: "/book-consultation", label: "Book consultation" },
                    { href: "/admin", label: "Admin workspace" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-app)] px-4 py-4 text-sm text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
                    >
                      <span>{item.label}</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
