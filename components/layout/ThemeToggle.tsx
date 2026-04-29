"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={cn("flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border", className)}
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4 text-gold-highlight" /> : <Moon className="h-4 w-4 text-purple-vivid" />}
    </button>
  );
}
