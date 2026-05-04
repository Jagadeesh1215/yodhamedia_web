import Link from "next/link";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { site } from "@/lib/constants/site";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Library" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/blog", label: "Public Blog" },
];

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="admin-scope min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)]">
      <div className="admin-shell min-h-screen">
        <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[var(--bg-frost)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 md:px-10 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link href="/admin" className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] font-display text-lg font-bold text-[var(--gold-warm)] transition group-hover:border-[var(--border-strong)]">
                  Y
                </div>
                <div>
                  <p className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[var(--gold-warm)]">
                    Digital Sovereignty
                  </p>
                  <h1 className="mt-1 text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                    Admin control room
                  </h1>
                </div>
              </Link>

              <div className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.32em] text-[var(--text-muted)] xl:hidden">
                {isAdmin ? "Session active" : "Private workspace"}
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 py-2 xl:flex">
                <span className="h-2 w-2 rounded-full bg-[var(--gold-warm)]" />
                <div className="leading-none">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    Admin access
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {isAdmin
                      ? session?.user?.name || "Authenticated"
                      : "Login required"}
                  </p>
                </div>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-10 items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                Support
              </a>

              {isAdmin ? <SignOutButton /> : null}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
