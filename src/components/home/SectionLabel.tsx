import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}

export default function SectionLabel({
  children,
  variant = "dark",
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "h-[1.5px] w-8",
          variant === "dark" ? "bg-brand-olive" : "bg-brand-olive-light"
        )}
      />
      <span
        className={cn(
          "text-[10.5px] font-semibold uppercase tracking-[2.3px]",
          variant === "dark" ? "text-brand-olive" : "text-brand-olive-light"
        )}
      >
        {children}
      </span>
    </div>
  );
}
