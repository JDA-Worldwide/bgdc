import { cn } from "@/lib/utils";

interface ChartRowProps {
  children: React.ReactNode;
  className?: string;
  /** Desktop column count */
  columns?: 2 | 3;
}

export default function ChartRow({ children, className, columns = 2 }: ChartRowProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-8 lg:gap-10",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
