import React from "react";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";

export type CtaVariant =
  | "blue-dark"
  | "blue-dark-alt"
  | "blue-dark-outline"
  | "blue-light"
  | "blue-light-alt"
  | "blue-light-outline";

export interface CtaButtonItem {
  _key: string;
  label?: string;
  url?: string;
  isExternal?: boolean;
  variant?: CtaVariant;
}

interface CtaButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  ctas?: CtaButtonItem[];
}

const variantClasses: Record<CtaVariant, string> = {
  "blue-dark": "btn-blue-dark",
  "blue-dark-alt": "btn-blue-dark-alt",
  "blue-dark-outline": "btn-blue-dark-outline",
  "blue-light": "btn-blue-light",
  "blue-light-alt": "btn-blue-light-alt",
  "blue-light-outline": "btn-blue-light-outline",
};

export default function CtaButtons({ ctas, className, ...divProps }: CtaButtonsProps) {
  const resolved = ctas?.filter((cta) => stegaClean(cta.url));
  if (!resolved?.length) return null;

  return (
    <div {...divProps} className={cn("flex flex-wrap gap-4", className)}>
      {resolved.map((cta) => {
        const href = stegaClean(cta.url)!;
        const variant = stegaClean(cta.variant) ?? "blue-dark";
        return (
          <a
            key={cta._key}
            href={href}
            target={cta.isExternal ? "_blank" : undefined}
            rel={cta.isExternal ? "noopener noreferrer" : undefined}
            className={cn(
              "rounded-button px-5 py-[15px] text-base font-semibold leading-[21px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue",
              variantClasses[variant as CtaVariant] ?? variantClasses["blue-dark"]
            )}
          >
            {cta.label}
            {cta.isExternal && (
              <span className="sr-only"> (opens in new tab)</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
