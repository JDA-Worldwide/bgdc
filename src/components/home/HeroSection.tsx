"use client";

import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import SanityImage from "@/components/ui/SanityImage";
import CtaButtons from "@/components/ui/CtaButtons";
import type { CtaButtonItem } from "@/components/ui/CtaButtons";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface HeroSectionProps {
  callout?: string;
  heading?: string;
  body?: string;
  ctas?: CtaButtonItem[];
  backgroundImage?: SanityImageSource;
}

export default function HeroSection({
  callout,
  heading,
  body,
  ctas,
  backgroundImage,
}: HeroSectionProps) {
  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.to(
      el.querySelectorAll("[data-animate-fadeinup]"),
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
            decorative
          />
        ) : (
          <div className="absolute inset-0 bg-brand-blue" />
        )}
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
      </div>

      {callout && (
        <p data-animate-fadeinup className="font-accent text-xl italic leading-7 text-brand-sun">
          {callout}
        </p>
      )}

      <div className="mt-10 flex max-w-4xl flex-col gap-8 text-center text-white md:mt-[60px] md:gap-[54px]">
        {heading && (
          <h1 data-animate-fadeinup className="text-3xl font-medium text-white sm:text-5xl md:text-[70px] md:leading-[1.15]">
            {heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
        )}
        {body && (
          <p data-animate-fadeinup className="text-base leading-relaxed sm:text-lg md:text-[22px] md:leading-[33px]">
            {body.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
      </div>

      <CtaButtons
        data-animate-fadeinup
        ctas={ctas}
        className="mt-10 justify-center sm:gap-[60px] md:mt-[60px]"
      />
    </section>
  );
}
