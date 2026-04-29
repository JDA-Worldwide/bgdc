"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SanityImage from "@/components/ui/SanityImage";
import CtaButtons from "@/components/ui/CtaButtons";
import type { CtaButtonItem } from "@/components/ui/CtaButtons";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

interface CtaBannerProps {
  callout?: string;
  heading: string;
  body?: PortableTextBlock[];
  ctas?: CtaButtonItem[];
  backgroundImage?: SanityImageSource;
}

export default function CtaBanner({
  callout,
  heading,
  body,
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
        <h2 data-animate-fadeinup className="mt-8 text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
          {heading}
        </h2>
        {body?.length ? (
          <div data-animate-fadeinup className="mt-8">
            <PortableText
              value={body}
              components={{
                block: { normal: ({ children }) => <p className="text-base leading-7 text-brand-black">{children}</p> },
                marks: {
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => (
                    <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined} className="underline hover:no-underline">{children}</a>
                  ),
                },
              }}
            />
          </div>
        ) : null}
        <CtaButtons data-animate-fadeinup ctas={ctas} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
