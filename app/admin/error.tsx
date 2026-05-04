"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw, ShieldAlert } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Admin failures should still be visible in the console so we can diagnose them quickly.
    console.error(error);
  }, [error]);

  return (
    <section className="space-y-8">
      <div className="admin-panel-strong p-6 md:p-8">
        <div className="admin-chip text-[var(--gold-warm)]">
          <ShieldAlert className="h-4 w-4" />
          Admin error
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl">
          The control room hit a snag.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          The admin page failed while loading or mutating data. Retry the
          request, or jump back to the dashboard and continue from there.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </button>
          <Link
            href="/admin"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
