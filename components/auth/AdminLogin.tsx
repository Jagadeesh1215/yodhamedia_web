"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { ShieldCheck, KeyRound, Loader2 } from "lucide-react";
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
      <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-8 shadow-[var(--shadow-card)]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-warm/20 bg-gold-warm/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-warm">
          <ShieldCheck className="h-4 w-4" />
          Admin access
        </div>
        <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)]">
          Sign in to the admin panel
        </h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
          Use the private admin email and password to manage blog posts, lead
          submissions, and booking requests.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Admin email
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@yodhamedia.com"
              className="form-field"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Password
            </span>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="form-field pl-11"
              />
            </div>
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          disabled={pending}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-gradient-to-r from-gold-warm to-gold-bright font-heading text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-gold-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking credentials
            </>
          ) : (
            "Enter Admin"
          )}
        </button>
      </div>
    </form>
  );
}
