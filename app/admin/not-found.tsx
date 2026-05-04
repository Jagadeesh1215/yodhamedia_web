import Link from "next/link";
import { ArrowLeft, CircleAlert, LayoutDashboard, Newspaper } from "lucide-react";

export default function AdminNotFound() {
  return (
    <section className="space-y-8">
      <div className="admin-panel-strong overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-6 md:p-10">
            <div className="admin-chip text-[var(--gold-warm)]">
              <CircleAlert className="h-4 w-4" />
              Admin route missing
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
              This workspace path does not exist.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              You may have followed an outdated admin link or typed a route that
              is not wired yet. Use the control-room links below to continue.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/blogs"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
              >
                <Newspaper className="h-4 w-4" />
                Content library
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--border-soft)] bg-[var(--bg-panel-strong)] p-6 md:p-10 lg:border-l lg:border-t-0">
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-6">
              <p className="admin-kicker">Quick exits</p>
              <div className="mt-5 grid gap-3">
                {[
                  { href: "/admin/leads", label: "Lead inbox" },
                  { href: "/blog", label: "Public blog" },
                  { href: "/book-consultation", label: "Booking page" },
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
    </section>
  );
}
