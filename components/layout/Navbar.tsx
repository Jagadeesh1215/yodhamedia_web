"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { navItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/* ─────────────────────────────────────────────
   Magnetic underline indicator hook
───────────────────────────────────────────── */
function useIndicator(containerRef: React.RefObject<HTMLElement>) {
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const moveTo = (el: HTMLElement | null) => {
    if (!el || !containerRef.current) return;
    const parent = containerRef.current.getBoundingClientRect();
    const child = el.getBoundingClientRect();
    setStyle({
      left: child.left - parent.left,
      width: child.width,
      opacity: 1,
    });
  };

  const hide = () => setStyle((s) => ({ ...s, opacity: 0 }));

  return { style, moveTo, hide };
}

/* ─────────────────────────────────────────────
   Dropdown panel (desktop)
───────────────────────────────────────────── */
function DropdownPanel({
  item,
  visible,
}: {
  item: (typeof navItems)[number];
  visible: boolean;
}) {
  if (!("dropdown" in item) || !item.dropdown) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="absolute -translate-x-1/2 top-full pt-4 w-72 z-50"
        >
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-frost)] backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="p-2 space-y-0.5">
              {item.dropdown.map((child, idx) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.045 }}
                >
                  <Link
                    href={child.href}
                    className="flex items-center gap-3.5 rounded-xl px-3 py-2.5 group transition-all duration-200 hover:bg-gold-warm/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-warm/10 text-gold-warm transition-transform duration-200 group-hover:scale-110">
                      <child.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-[var(--text-primary)] leading-tight">
                        {child.label}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">
                        Explore {child.label.toLowerCase()}
                      </div>
                    </div>
                    <span className="ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-[var(--border-soft)] bg-gold-warm/5 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Need help?
              </span>
              <Link
                href="/contact"
                className="text-xs text-gold-warm hover:underline"
              >
                Contact us →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null!);
  const dropdownTimeout = useRef<NodeJS.Timeout>();
  const { style: indicatorStyle, moveTo, hide } = useIndicator(navRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedMobileItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openDropdown = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 160);
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-[var(--border-soft)] bg-[var(--bg-frost)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          {/* Logo — unchanged */}
          <Link href="/" className="group relative flex items-center gap-3">
            <div className="absolute -inset-2 rounded-lg bg-gold-warm/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-warm to-gold-highlight rounded-sm rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-[2px] bg-[var(--bg-app)] rounded-sm rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.span
                className="relative flex h-10 w-10 items-center justify-center font-display text-lg font-bold text-gold-warm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                Y
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-display text-xl font-bold tracking-widest text-ghost group-hover:text-gold transition-colors duration-300">
                  YODHA
                </span>
                <span className="block font-heading text-[11px] tracking-[0.3em] text-gold-warm/80 -mt-1">
                  MEDIA
                </span>
              </motion.div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-0.5 relative"
          >
            <motion.div
              className="absolute bottom-0 h-[2px] bg-gold-warm rounded-full pointer-events-none"
              animate={indicatorStyle}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const hasDropdown = "dropdown" in item && item.dropdown;
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={() => {
                    hide();
                    if (hasDropdown) closeDropdown();
                  }}
                >
                  {hasDropdown ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-heading text-sm font-medium transition-all duration-200 select-none",
                        active || isOpen
                          ? "text-gold-warm "
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                      )}
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : item.label)
                      }
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="flex"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.span>
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-2.5 font-heading text-sm font-medium transition-all duration-200",
                        active
                          ? "text-gold-warm bg-gold-warm/10"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  <DropdownPanel item={item} visible={isOpen} />
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex cursor-none items-center gap-3">
            <ThemeToggle />
            <ConsultationModal
              triggerClassName={cn(
                "relative overflow-hidden",
                "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
                "after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-700",
              )}
            />
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(true)}
            className="relative flex lg:hidden items-center justify-center w-10 h-10 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--text-primary)]"
            aria-label="Open menu"
          >
            {!scrolled && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-warm opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-warm" />
              </span>
            )}
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </header>

      {/*
        ══════════════════════════════════════════
        Mobile Drawer
        ──────────────────────────────────────────
        CRITICAL: rendered as a sibling of <header>,
        NOT inside it. This prevents the header's
        z-index stacking context from clipping the
        drawer when the page is scrolled down.

        Layout is a flex column:
          [shrink-0] Header row
          [flex-1 overflow-y-auto] Scrollable nav links
          [shrink-0] Pinned footer

        This means the sub-menu accordion always
        expands into the scrollable zone and is
        never hidden behind the footer.
        ══════════════════════════════════════════
      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 52px) 52px)" }}
            animate={{ clipPath: "circle(160% at calc(100% - 52px) 52px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 52px) 52px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] lg:hidden flex flex-col"
            style={{ background: "var(--bg-app)" }}
          >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold-warm/10 blur-3xl" />
              <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-purple-electric/10 blur-3xl" />
            </div>

            {/* Drawer Header — fixed height, never shrinks */}
            <div className="relative shrink-0 flex items-center justify-between px-6 py-5 border-b border-[var(--border-soft)]">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-warm to-gold-highlight rounded-sm rotate-45" />
                  <div className="absolute inset-[2px] bg-[var(--bg-app)] rounded-sm rotate-45" />
                  <span className="relative font-display text-lg font-bold text-gold-warm">
                    Y
                  </span>
                </div>
                <div>
                  <span className="block font-display text-xl font-bold tracking-widest text-[var(--text-primary)]">
                    YODHA
                  </span>
                  <span className="block text-[11px] tracking-[0.3em] text-gold-warm/80 -mt-1">
                    MEDIA
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--text-primary)]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Nav Links — takes all remaining vertical space and scrolls */}
            <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const hasDropdown = "dropdown" in item && item.dropdown;
                const isExpanded = expandedMobileItem === item.href;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedMobileItem(isExpanded ? null : item.href)
                          }
                          className={cn(
                            "w-full flex items-center justify-between rounded-2xl px-5 py-4 font-body text-xl font-normal transition-all",
                            isActive
                              ? "text-gold-warm bg-gold-warm/10"
                              : "text-[var(--text-primary)] hover:bg-gold-warm/[0.08]",
                          )}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown className="h-5 w-5 text-gold-warm" />
                          </motion.span>
                        </button>

                        {/* Sub-items accordion */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-5 mt-1 mb-2 border-l-2 border-gold-warm/25 pl-4 space-y-1">
                                {item.dropdown?.map((child, idx) => (
                                  <motion.div
                                    key={child.href}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                  >
                                    <Link
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-all hover:bg-gold-warm/10 hover:translate-x-1",
                                        pathname === child.href
                                          ? "text-gold-warm bg-gold-warm/5"
                                          : "text-[var(--text-secondary)]",
                                      )}
                                    >
                                      <span className="text-gold-warm shrink-0">
                                        <child.icon size={18} />
                                      </span>
                                      {child.label}
                                      {pathname === child.href && (
                                        <span className="ml-auto text-[10px] text-gold-warm bg-gold-warm/10 px-2 py-0.5 rounded-full">
                                          Active
                                        </span>
                                      )}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-5 py-4 font-body text-xl font-normal transition-all hover:bg-gold-warm/[0.08] hover:translate-x-1",
                          isActive
                            ? "text-gold-warm bg-gold-warm/10"
                            : "text-[var(--text-primary)]",
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className="text-xs text-gold-warm bg-gold-warm/10 px-2.5 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer — fixed height, never shrinks, always visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative shrink-0 px-6 py-6 border-t border-[var(--border-soft)] space-y-4"
            >
              <ConsultationModal triggerClassName="w-full" />
              <p className="text-center text-xs text-[var(--text-muted)]">
                © 2025 YodhaMedia LLP. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
