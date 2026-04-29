import { cn } from "@/lib/utils";

export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-purple-electric via-gold-warm to-gold-highlight bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
