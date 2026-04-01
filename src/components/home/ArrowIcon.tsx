import { cn } from "@/lib/utils";

interface ArrowIconProps {
  className?: string;
}

export default function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      className={cn("size-3.5 shrink-0", className)}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}
