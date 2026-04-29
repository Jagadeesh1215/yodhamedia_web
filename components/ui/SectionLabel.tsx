import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4 flex items-center justify-center gap-3 font-label text-label uppercase text-gold-warm", className)}>
      <span className="h-px w-8 bg-gold-warm" />
      <span>{children}</span>
    </div>
  );
}
