"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface Industry {
  name: string;
  description?: string;
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
  {
    name: "Agribusiness",
    description:
      "With deep agricultural roots, available land, and access to regional markets, Bargersville offers agribusinesses the space, infrastructure, and community support needed to grow sustainably.",
  },
  {
    name: "Biosciences & Healthcare",
    description:
      "Located near leading research, education, and healthcare institutions, Bargersville supports bioscience and healthcare organizations with access, stability, and room to expand.",
  },
  {
    name: "Information Technology",
    description:
      "Bargersville provides tech companies with proximity to major metros and talent pipelines—Purdue, IU Indy, and IU—creating a focused environment for innovation and scalable growth.",
  },
  {
    name: "Corporate HQs",
    description:
      "For corporate headquarters seeking connectivity, workforce retention, and long-term stability, Bargersville offers a strategic location where leadership, operations, and culture can grow together.",
  },
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
      el.querySelectorAll("[data-animate-fadeinup]"),
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
        <div data-animate-fadeinup className="mb-10 px-0 md:mb-[60px] lg:px-[109px]">
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
              data-animate-fadeinup
              key={industry.name}
              tabIndex={0}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden p-10 sm:min-h-[325px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sun focus-visible:ring-offset-2"
            >
              {/* Background image / fallback */}
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 group-focus:scale-105">
                {industry.image?.asset ? (
                  <SanityImage
                    image={industry.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    decorative
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-charcoal" />
                )}
              </div>

              {/* Rest: gradient darkens toward bottom */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/70 transition-opacity duration-400 group-hover:opacity-0 group-focus:opacity-0" />
              {/* Hover: flat dark overlay matching Figma rgba(0,0,0,0.7) */}
              <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus:opacity-100" />

              {/* Content — heading + hr always visible; description reveals on hover */}
              <div className="relative z-10 flex flex-col gap-[30px]">
                <h3 className="text-2xl font-medium leading-[35px] text-brand-sun md:text-[28px]">
                  {industry.name}
                </h3>
                <hr aria-hidden="true" className="border-white" />
                {/* CSS grid row trick: 0fr → 1fr reveals the description */}
                {industry.description && (
                  <div className="grid grid-rows-[0fr] -mt-[30px] transition-[grid-template-rows,margin] duration-400 ease-out group-hover:grid-rows-[1fr] group-hover:mt-0 group-focus:grid-rows-[1fr] group-focus:mt-0">
                    <p className="overflow-hidden text-base leading-7 text-white">
                      {industry.description}
                    </p>
                  </div>
                )}
              </div>
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
