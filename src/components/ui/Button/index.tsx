"use client";

import { cn } from "@/lib/utils";
import { isPdfUrl, trackCtaClick } from "@/lib/gtm";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: "primary" | "secondary" | "outline" | "blue-dark" | "blue-light" | "blue-dark-outline" | "blue-light-outline" | "blue-dark-alt" | "blue-light-alt";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  /** When `href` is set, passed to the anchor for file downloads */
  download?: boolean | string;
  /** GTM `cta_location` for link buttons (e.g. `hero`, `cta_module`) */
  analyticsLocation?: string;
}

const variants = {
  primary:
    "bg-brand-secondary text-white hover:bg-brand-secondary/90 focus-visible:ring-brand-secondary",
  secondary:
    "bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary",
  outline:
    "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-brand-primary",
  "blue-dark":
    "btn-blue-dark focus-visible:ring-brand-blue",
  "blue-light":
    "btn-blue-light focus-visible:ring-brand-sky",
  "blue-dark-outline":
    "btn-blue-dark-outline focus-visible:ring-brand-blue",
  "blue-light-outline":
    "btn-blue-light-outline focus-visible:ring-brand-sky",
  "blue-dark-alt":
    "btn-blue-dark-alt focus-visible:ring-brand-blue",
  "blue-light-alt":
    "btn-blue-light-alt focus-visible:ring-brand-sky",
};

const sizes = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-[15px] text-base",
  lg: "px-7 py-[18px] text-lg",
};

function linkLabel(
  event: React.MouseEvent<HTMLAnchorElement>,
  children: React.ReactNode
): string {
  const fromDom = event.currentTarget.textContent?.trim();
  if (fromDom) return fromDom;
  if (typeof children === "string") return children;
  return "";
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  download,
  analyticsLocation,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-button font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const isFile = Boolean(download) || isPdfUrl(href);
      if (isFile) return;

      trackCtaClick({
        buttonText: linkLabel(event, children),
        buttonUrl: href,
        ctaLocation: analyticsLocation ?? "unknown",
      });
    };

    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={handleLinkClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
