import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-frost)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
