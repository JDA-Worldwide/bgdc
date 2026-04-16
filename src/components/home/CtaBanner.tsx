"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SanityImage from "@/components/ui/SanityImage";
import CtaButtons from "@/components/ui/CtaButtons";
import type { CtaButtonItem } from "@/components/ui/CtaButtons";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface CtaBannerProps {
  callout?: string;
  heading?: string;
  body?: string;
  ctas?: CtaButtonItem[];
  backgroundImage?: SanityImageSource;
}

export default function CtaBanner({
  callout = "Let\u2019s Talk",
  heading = "Ready to Take the Next Step?",
  body = "Devoted to the good of our town, Bargersville Economic Development partners with entrepreneurs, business leaders, and community stakeholders to drive long-term economic growth. Through hands-on guidance and practical resources, we help businesses turn what they start here into lasting success\u2014going beyond permits and paperwork to support real growth.",
  ctas,
  backgroundImage,
}: CtaBannerProps) {
  const ref = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-animate-fadeinup]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 md:px-[170px] md:py-section border-t-[5px] border-t-white"
    >
      {/* Background: image base layer (fallback) + animated mesh gradient on top */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {backgroundImage?.asset ? (
          <SanityImage
            image={backgroundImage}
            fill
            sizes="100vw"
            className="object-cover"
            decorative
          />
        ) : (
          <div className="absolute inset-0 bg-brand-soybean" />
        )}
        {/* Animated mesh gradient overlay */}
        <div className="cta-gradient-canvas">
          <div className="cta-blob-3" />
          <div className="cta-blob-4" />
        </div>
      </div>

      <div className="mx-auto max-w-[816px]">
        {callout && (
          <p data-animate-fadeinup className="font-accent text-xl italic leading-7 text-brand-black">
            {callout}
          </p>
        )}
        {heading && (
          <h2 data-animate-fadeinup className="mt-8 text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
        )}
        {body && (
          <p data-animate-fadeinup className="mt-8 text-base leading-7 text-brand-black">{body}</p>
        )}
        <CtaButtons data-animate-fadeinup ctas={ctas} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
