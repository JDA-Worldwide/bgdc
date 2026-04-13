"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface Industry {
  name: string;
  image?: SanityImageSource;
  link?: { label: string; url: string; isExternal?: boolean };
}

interface IndustriesSectionProps {
  heading?: string;
  body?: string;
  industries?: Industry[];
  cta?: { label: string; url: string; isExternal?: boolean };
}

const defaultIndustries: Industry[] = [
  { name: "Agribusiness" },
  { name: "Biosciences & Healthcare" },
  { name: "Information Technology" },
  { name: "Corporate HQs" },
];

export default function IndustriesSection({
  heading = "Room to Grow Across Industries",
  body = "Choosing Bargersville means gaining the advantages of city access without the friction of a crowded market. With direct access to I-69, a 30-minute commute to Indianapolis, and less competition, businesses here have room to stand out, grow faster, and build loyal local demand. Whatever your industry, Bargersville offers the space, infrastructure, and community support to grow sustainably.",
  industries,
  cta = { label: "Learn More About Doing Business Here", url: "#business" },
}: IndustriesSectionProps) {
  const resolvedIndustries = industries?.length ? industries : defaultIndustries;

  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-industries-animate]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  });

  return (
    <section ref={sectionRef} className="bg-brand-limestone py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div data-industries-animate className="mb-10 px-0 md:mb-[60px] lg:px-[109px]">
          {heading && (
            <h2 className="mb-[35px] text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body && (
            <p className="text-base leading-7 text-brand-black">{body}</p>
          )}
        </div>

        <div className="mx-auto grid grid-cols-1 gap-10 px-0 sm:grid-cols-2 lg:px-[111px]">
          {resolvedIndustries.map((industry) => (
            <div
              data-industries-animate
              key={industry.name}
              className="relative flex min-h-[200px] flex-col justify-end gap-[30px] overflow-hidden p-6 sm:min-h-[325px] sm:p-10"
            >
              <div className="absolute inset-0">
                {industry.image?.asset ? (
                  <>
                    <SanityImage
                      image={industry.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      decorative
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-brand-charcoal" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  </>
                )}
              </div>
              <h3 className="relative z-10 text-2xl font-medium leading-[35px] text-brand-sun md:text-[28px]">
                {industry.name}
              </h3>
              <hr aria-hidden="true" className="relative z-10 border-brand-sun/40" />
            </div>
          ))}
        </div>

        {cta?.url && (
          <div className="mt-[60px] flex justify-center">
            <a
              href={cta.url}
              target={cta.isExternal ? "_blank" : undefined}
              rel={cta.isExternal ? "noopener noreferrer" : undefined}
              className="rounded-button bg-brand-blue px-5 py-[15px] text-base font-semibold leading-[21px] text-white transition-colors hover:bg-brand-navy-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 active:bg-brand-navy-dark/90"
            >
              {cta.label}
              {cta.isExternal && (
                <span className="sr-only"> (opens in new tab)</span>
              )}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
