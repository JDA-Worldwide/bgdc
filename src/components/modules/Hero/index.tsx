"use client";

import { cn } from "@/lib/utils";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import type { HeroProps } from "./types";

export default function Hero({
  heading,
  subheading,
  cta,
  backgroundImage,
  colorScheme,
}: HeroProps) {
  const ref = useGsap<HTMLDivElement>((el) => {
    gsap.to(
      el.querySelectorAll("[data-hero-animate]"),
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15 }
    );
  });

  const isDark = colorScheme === "dark";

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center overflow-hidden",
        !backgroundImage?.asset && isDark && "scheme-dark bg-brand-background"
      )}
    >
      {backgroundImage?.asset && (
        <div className="absolute inset-0">
          <SanityImage
            image={backgroundImage}
            fill
            priority
            sizes="100vw"
            className="h-full w-full"
            decorative
          />
          <div className="absolute inset-0 bg-brand-primary/60" />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 mx-auto max-w-content px-4 py-20 text-center sm:px-6 lg:px-8",
          backgroundImage?.asset || isDark ? "text-white" : "text-brand-text-heading"
        )}
      >
        <h1
          data-hero-animate
          className={cn(
            "font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl",
            backgroundImage?.asset || isDark ? "text-white" : "text-brand-text-heading"
          )}
        >
          {heading?.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {subheading && (
          <p
            data-hero-animate
            className={cn(
              "mx-auto mt-6 max-w-4xl text-lg sm:text-xl",
              backgroundImage?.asset || isDark ? "text-white/90" : "text-brand-muted"
            )}
          >
            {subheading}
          </p>
        )}

        {cta?.label && (
          <div data-hero-animate className="mt-10">
            <Button
              href={cta.url}
              isExternal={cta.isExternal}
              size="lg"
              variant="primary"
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
