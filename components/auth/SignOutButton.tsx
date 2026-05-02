"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
