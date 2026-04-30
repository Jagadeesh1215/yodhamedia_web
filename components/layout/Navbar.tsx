"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border-soft)] bg-[var(--bg-frost)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gold-gradient rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            <div className="absolute inset-1 bg-ink rounded-sm rotate-45" />
            <span className="absolute inset-0 flex items-center justify-center text-gold font-display font-bold text-sm">
              Y
            </span>
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-widest text-ghost group-hover:text-gold transition-colors duration-300">
              YODHA
            </span>
            <span className="block font-heading text-xs tracking-[0.3em] text-gold/70 -mt-1">
              MEDIA
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div key={item.href} className="group relative py-7">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 font-heading text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]",
                    active && "text-[var(--text-primary)]",
                  )}
                >
                  {item.label}
                  {"dropdown" in item ? <ChevronDown className="h-3 w-3" /> : null}
                </Link>
                <span className={cn("absolute bottom-5 left-0 h-0.5 bg-gold-warm transition-all", active ? "w-full" : "w-0 group-hover:w-full")} />
                {item.dropdown ? (
                  <div className="invisible absolute left-0 top-full w-72 translate-y-3 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-frost)] p-3 opacity-0 shadow-[var(--shadow-card)] backdrop-blur-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.dropdown.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 font-body text-sm text-[var(--text-secondary)] transition hover:bg-gold-pale/25 hover:text-[var(--text-primary)]"
                      >
                        <span>{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ConsultationModal triggerClassName="animate-pulse-gold" />
        </div>

        <button className="rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-2 text-[var(--text-primary)] lg:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-[var(--bg-app)] px-6 py-6 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-heading text-xl font-bold text-[var(--text-primary)]">YodhaMedia LLP</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-2 text-[var(--text-primary)]" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="mt-12 grid gap-5">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="font-heading text-3xl font-semibold text-[var(--text-primary)]">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
