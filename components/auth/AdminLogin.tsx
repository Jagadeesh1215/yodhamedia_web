"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { ArrowRight, KeyRound, Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLogin({
  className,
  nextUrl = "/admin",
}: {
  className?: string;
  nextUrl?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        setError(null);

        startTransition(async () => {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: nextUrl,
          });

          if (result?.error) {
            setError("Invalid credentials. Please check the admin login.");
            return;
          }

          window.location.href = nextUrl;
        });
      }}
    >
      <div className="admin-panel-strong p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-4">
            <span className="admin-chip text-[var(--gold-warm)]">
              <Shield className="h-3.5 w-3.5" />
              Private Access
            </span>
            <div>
              <h2 className="text-3xl font-heading font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
                Sign in to the admin <span className="font-display italic text-[var(--gold-warm)]">sovereignty</span> layer
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                Use the private admin email and password to manage blog posts,
                leads, and the consultation pipeline.
              </p>
            </div>
          </div>

          <div className="hidden rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-muted)] md:inline-flex">
            Enter credentials
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="admin-kicker">Admin email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@yodhamedia.com"
              className="admin-field"
            />
          </label>

          <label className="grid gap-2">
            <span className="admin-kicker">Password</span>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="admin-field pl-11"
              />
            </div>
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          disabled={pending}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--gold-warm)] px-5 text-sm font-semibold text-black transition hover:border-[var(--border-strong)] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying
            </>
          ) : (
            <>
              <ArrowRight className="h-4 w-4" />
              Enter Admin
            </>
          )}
        </button>
      </div>
    </form>
  );
}
