import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "blue-dark" | "blue-light" | "blue-dark-outline" | "blue-light-outline" | "blue-dark-alt" | "blue-light-alt";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
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

export default function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-button font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
