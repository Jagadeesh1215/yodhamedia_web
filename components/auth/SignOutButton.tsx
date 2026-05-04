"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-panel)] px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:text-[var(--gold-warm)]"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
