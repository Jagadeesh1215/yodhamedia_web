"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "../ui/PageLoader";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger loader on every route change
  useEffect(() => {
    setIsLoading(true);
    setIsFinished(false);

    // We don't need a scroll lock here if Lenis handles it,
    // but it's safer to have it:
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
    document.body.style.overflow = "hidden";
  }, [pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* 1. THE LOADER: Runs its 3s timer + exit animation */}
      <AnimatePresence onExitComplete={() => setIsFinished(true)}>
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <SessionProvider>
        {children}
        <CustomCursor />
      </SessionProvider>
    </ThemeProvider>
  );
}
