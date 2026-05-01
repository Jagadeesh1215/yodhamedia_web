"use client";

import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  icon?: boolean;
  asChild?: boolean;
};

export function Button({
  href,
  variant = "primary",
  children,
  className,
  icon = true,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : href ? Link : "button";

  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 font-heading text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-highlight",

    // ✅ Variants
    variant === "primary" &&
      "bg-gradient-to-r from-gold-warm to-gold-bright text-white shadow-gold-sm hover:-translate-y-0.5 hover:shadow-gold-glow",

    variant === "outline" &&
      "border border-[var(--border-soft)] bg-[var(--bg-panel)] text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-soft)]",

    variant === "ghost" &&
      "text-gold-warm hover:text-gold-bright hover:bg-gold-pale/30",

    className,
  );

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  // ✅ asChild (for shadcn / floating hero)
  if (asChild) {
    return (
      <Comp className={classes} {...(props as any)}>
        {content}
      </Comp>
    );
  }

  // ✅ Link mode
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  // ✅ Button mode
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
