"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Sparkles, TrendingUp, Users, BarChart3, Home, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { navItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout>();

  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    
    // Add Home
    if (pathname !== "/") {
      breadcrumbs.push({ label: "Home", href: "/" });
    }
    
    // Add current path segments
    let currentPath = "";
    for (const segment of paths) {
      currentPath += `/${segment}`;
      const navItem = navItems.find(item => item.href === currentPath);
      if (navItem) {
        breadcrumbs.push({ label: navItem.label, href: currentPath });
      } else {
        // Try to find in dropdowns
        let found = false;
        for (const item of navItems) {
          if ("dropdown" in item && item.dropdown) {
            const child = item.dropdown.find(d => d.href === currentPath);
            if (child) {
              breadcrumbs.push({ label: child.label, href: currentPath });
              found = true;
              break;
            }
          }
        }
        if (!found && segment) {
          breadcrumbs.push({ 
            label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "), 
            href: currentPath 
          });
        }
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumb();
  const currentPageLabel = breadcrumbs[breadcrumbs.length - 1]?.label || "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedMobileItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (href: string) => {
    setExpandedMobileItem(expandedMobileItem === href ? null : href);
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--border-soft)] bg-[var(--bg-frost)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        {/* Animated Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const hasDropdown = "dropdown" in item && item.dropdown;
            const isDropdownActive = activeDropdown === item.label;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-heading text-sm font-medium transition-all duration-300",
                    active
                      ? "text-gold-warm bg-gold-warm/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel-strong)]"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {hasDropdown && (
                    <motion.div
                      animate={{ rotate: isDropdownActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.div>
                  )}
                  
                  {active && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-gold-warm/10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {hasDropdown && isDropdownActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-3 w-80"
                    >
                      <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-frost)] backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="p-2">
                          {item.dropdown?.map((child, idx) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                className="flex items-center gap-4 rounded-xl px-4 py-3 font-body text-sm text-[var(--text-secondary)] transition-all duration-300 hover:bg-gold-warm/10 hover:translate-x-1 group"
                              >
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-warm/10 text-gold-warm group-hover:scale-110 transition-transform">
                                  {child.icon}
                                </span>
                                <div>
                                  <div className="font-medium text-[var(--text-primary)]">{child.label}</div>
                                  <div className="text-xs text-[var(--text-muted)]">Explore {child.label.toLowerCase()}</div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="border-t border-[var(--border-soft)] bg-gold-warm/5 p-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--text-muted)]">Need help?</span>
                            <Link href="/contact" className="text-gold-warm hover:underline">
                              Contact us →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ConsultationModal triggerClassName="animate-pulse-gold" />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-2.5 text-[var(--text-primary)] lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
          {!scrolled && (
            <motion.span
              className="absolute -top-1 -right-1 flex h-2 w-2"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-warm opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-warm" />
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Unique Mobile Menu with Breadcrumb */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: "var(--bg-app)" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-purple-electric/20 blur-3xl" />
              <div className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-gold-warm/20 blur-3xl" />
            </div>

            {/* Mobile Menu Header */}
            <div className="relative flex items-center justify-between px-6 py-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="font-display text-xl font-bold text-gold-warm">YODHA MEDIA</span>
                <p className="text-[10px] tracking-wider text-[var(--text-muted)]">Digital Growth Partner</p>
              </motion.div>
              
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-panel)] p-2.5 text-[var(--text-primary)]"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="relative flex h-[calc(100%-200px)] flex-col justify-between px-6 pb-8 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const hasDropdown = "dropdown" in item && item.dropdown;
                  const isExpanded = expandedMobileItem === item.href;
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="overflow-hidden"
                    >
                      {hasDropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileDropdown(item.href)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-bold transition-all",
                              isActive
                                ? "text-gold-warm bg-gold-warm/10"
                                : "text-[var(--text-primary)] hover:bg-gold-warm/10"
                            )}
                          >
                            <span>{item.label}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gold-warm" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 space-y-2 border-l-2 border-gold-warm/30 pl-4 mt-2">
                                  {item.dropdown?.map((child, idx) => (
                                    <motion.div
                                      key={child.href}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      <Link
                                        href={child.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                          "flex items-center gap-4 rounded-xl px-4 py-3 font-body text-base transition-all hover:bg-gold-warm/10 hover:translate-x-2",
                                          pathname === child.href
                                            ? "text-gold-warm bg-gold-warm/5"
                                            : "text-[var(--text-secondary)]"
                                        )}
                                      >
                                        <span className="text-gold-warm">{child.icon}</span>
                                        {child.label}
                                        {pathname === child.href && (
                                          <span className="ml-auto text-[10px] text-gold-warm">● Active</span>
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
                                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center rounded-2xl px-4 py-4 font-display text-2xl font-bold transition-all hover:bg-gold-warm/10 hover:translate-x-2",
                            isActive
                              ? "text-gold-warm bg-gold-warm/10"
                              : "text-[var(--text-primary)]"
                          )}
                        >
                          {item.label}
                          {isActive && (
                            <span className="ml-auto text-sm text-gold-warm">← Current</span>
                          )}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 pt-6 mt-6 border-t border-[var(--border-soft)]"
              >
                <div className="flex justify-center gap-6">
                  {[
                    { icon: TrendingUp, label: "Growth" },
                    { icon: Users, label: "Community" },
                    { icon: BarChart3, label: "Analytics" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-warm/10 text-gold-warm">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">{item.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <ConsultationModal triggerClassName="w-full" />
                </div>
                
                <p className="text-center text-xs text-[var(--text-muted)]">
                  © 2024 YodhaMedia LLP. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-warm to-gold-highlight origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </header>
  );
}