"use client";

import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { cn } from "@/lib/utils";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface CtaButton {
  _key: string;
  label: string;
  url: string;
  isExternal?: boolean;
  variant?: "primary" | "outline";
}

interface HeroSectionProps {
  callout?: string;
  heading?: string;
  body?: string;
  ctas?: CtaButton[];
  backgroundImage?: SanityImageSource;
}

const ctaVariants = {
  primary:
    "bg-brand-sky text-brand-blue hover:bg-brand-sky/80 active:bg-brand-sky/70",
  outline:
    "border border-brand-sky text-white hover:bg-brand-sky/15 active:bg-brand-sky/25",
};

export default function HeroSection({
  callout,
  heading,
  body,
  ctas,
  backgroundImage,
}: HeroSectionProps) {
  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-hero-animate]"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 }
    );

    const bg = el.querySelector("[data-hero-bg]");
    if (bg) {
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-section sm:px-10 md:min-h-[85vh] lg:min-h-[971px] lg:px-gutter"
    >
      {/* Background */}
      <div data-hero-bg className="absolute inset-0 -z-10">
        {backgroundImage?.asset ? (
          <SanityImage
            image={backgroundImage}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-navy-dark" />
        )}
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
      </div>

      {callout && (
        <p data-hero-animate className="font-accent text-xl italic leading-7 text-brand-sun">
          {callout}
        </p>
      )}

      <div className="mt-10 flex max-w-[var(--container-max)] flex-col gap-8 text-center text-white md:mt-[60px] md:gap-[54px]">
        {heading && (
          <h1 data-hero-animate className="text-3xl font-medium text-white sm:text-5xl md:text-[70px] md:leading-[1.15]">
            {heading}
          </h1>
        )}
        {body && (
          <p data-hero-animate className="text-base leading-relaxed sm:text-lg md:text-[22px] md:leading-[33px]">
            {body}
          </p>
        )}
      </div>

      {ctas?.length ? (
        <div data-hero-animate className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-[60px] md:mt-[60px]">
          {ctas.map((cta) => (
            <a
              key={cta._key}
              href={cta.url}
              target={cta.isExternal ? "_blank" : undefined}
              rel={cta.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "rounded-button px-5 py-[15px] text-base font-semibold leading-[21px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue",
                ctaVariants[cta.variant ?? "primary"]
              )}
            >
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
