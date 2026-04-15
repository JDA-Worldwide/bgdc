"use client";

import { cn } from "@/lib/utils";
import { stegaClean } from "@sanity/client/stega";
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
      el.querySelectorAll("[data-animate-fadeinup]"),
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15 }
    );
  });

  const scheme = stegaClean(colorScheme) ?? "light";
  const hasImage = !!backgroundImage?.asset;
  const isDark = scheme === "dark";

  // Schemes that need dark text when used as a solid background (no image)
  const lightSchemes = new Set(["light", "surface", "limestone", "sky"]);
  const useDarkText = !hasImage && lightSchemes.has(scheme);

  // Overlay opacity: dark scheme keeps the strong black veil; lighter schemes
  // let more of the image colour through
  const overlayClass: Record<string, string> = {
    light:     "bg-black/70 mix-blend-multiply",
    dark:      "bg-black/70 mix-blend-multiply",
    surface:   "bg-black/40 mix-blend-multiply",
    limestone: "bg-black/40 mix-blend-multiply",
    sky:       "bg-black/35 mix-blend-multiply",
  };

  // No-image background: map scheme value to the scheme-* utility class
  const schemeBgClass: Record<string, string> = {
    light:     "",
    dark:      "scheme-dark",
    surface:   "scheme-surface",
    limestone: "scheme-limestone",
    sky:       "scheme-sky",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center overflow-hidden",
        !hasImage && schemeBgClass[scheme]
      )}
    >
      {hasImage && (
        <div className="absolute inset-0">
          <SanityImage
            image={backgroundImage}
            fill
            priority
            sizes="100vw"
            className="h-full w-full"
            decorative
          />
          <div className={cn("absolute inset-0", overlayClass[scheme] ?? overlayClass.light)} />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 mx-auto max-w-content px-4 py-20 text-center sm:px-6 lg:px-8",
          hasImage || isDark ? "text-white" : useDarkText ? "text-brand-text-heading" : "text-white"
        )}
      >
        <h1
          data-animate-fadeinup
          className={cn(
            "font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl",
            hasImage || isDark ? "text-white" : useDarkText ? "text-brand-text-heading" : "text-white"
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
            data-animate-fadeinup
            className={cn(
              "mx-auto mt-6 max-w-4xl text-lg sm:text-xl",
              hasImage || isDark ? "text-white/90" : useDarkText ? "text-brand-muted" : "text-white/90"
            )}
          >
            {subheading}
          </p>
        )}

        {cta?.label && (
          <div data-animate-fadeinup className="mt-10">
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
