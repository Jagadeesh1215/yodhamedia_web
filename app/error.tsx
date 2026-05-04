"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw, TriangleAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the runtime error visible in development while showing users a recovery path.
    console.error(error);
  }, [error]);

  return (
    <section className="relative overflow-hidden bg-[var(--bg-app)] px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(201,145,13,0.14),transparent_34%)]" />
      <div className="container-wide relative z-10">
        <div className="panel-strong mx-auto max-w-3xl p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-[var(--gold-warm)]">
            <TriangleAlert className="h-4 w-4" />
            Something broke
          </div>
          <h1 className="mt-6 text-4xl font-heading font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl">
            We hit a server-side error.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            The page could not finish rendering, but the app can recover. Retry
            the request or head back to a safe page.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--gold-warm)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-black transition hover:opacity-95"
            >
              <RefreshCcw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
