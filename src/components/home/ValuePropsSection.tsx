"use client";

import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

interface ValueCard {
  _key?: string;
  icon?: SanityImageSource;
  title: string;
  body: string;
}

interface ValuePropsSectionProps {
  heading?: string;
  cards?: ValueCard[];
}

const defaultCards: ValueCard[] = [
  {
    title: "Strategic Location",
    body: "Bargersville sits at the intersection of I-69 and SR 144\u2014strategically positioned at one of the region\u2019s fastest-growing transportation corridors. Businesses here stay connected to regional and national markets while operating in a calmer, more efficient environment than crowded metro markets.",
  },
  {
    title: "Quality of Place",
    body: "Some communities make you choose between opportunity and quality of life \u2014 Bargersville is not one of them. It\u2019s a tight-knit community with top-rated schools, reliable locally-owned utilities, and a revitalizing downtown that\u2019s drawing people in. This is a place where people don\u2019t just work \u2014 they stay.",
  },
  {
    title: "Pro-Business Government",
    body: "Bargersville Economic Development exists to build momentum for businesses that want to grow with confidence \u2014 offering hands-on guidance, practical resources, and real partnership that goes beyond permits and paperwork. Our municipal leadership is committed to pro-business policies, long-range planning, and thoughtful development that preserves what makes this community worth investing in.",
  },
];

export default function ValuePropsSection({
  heading = "The Right Location.\nThe Right Place.\nThe Right Partner.",
  cards,
}: ValuePropsSectionProps) {
  const resolvedCards = cards?.length ? cards : defaultCards;
  const headingLines = heading?.split("\n") ?? [];

  const sectionRef = useGsap<HTMLElement>((el) => {
    const rows = el.querySelectorAll<HTMLElement>("[data-value-row]");

    rows.forEach((row) => {
      const heading = row.querySelector<HTMLElement>("[data-value-heading]");
      const card = row.querySelector<HTMLElement>("[data-value-card]");

      if (!heading || !card) return;

      gsap.set([heading, card], { opacity: 0, y: 40 });

      gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "top 40%",
          scrub: false,
          toggleActions: "play none none none",
        },
      })
        .to(heading, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(card,    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1);
    });

    ScrollTrigger.refresh();
  });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-brand-blue py-16 flex flex-col gap-16 lg:gap-20">
      {resolvedCards.map((card, i) => (
        <div
          key={card._key ?? i}
          data-value-row
          className="mx-auto flex w-full max-w-container flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-start lg:px-gutter"
        >
          {/* Left heading */}
          <div className="shrink-0 lg:w-[36%]">
            <h2
              data-value-heading
              className="text-2xl font-medium leading-tight text-white sm:text-3xl md:text-[43px] md:leading-[60px]"
            >
              {headingLines[i] ?? card.title}
            </h2>
          </div>

          {/*
            Right card — bleeds to the viewport edge.
            -mr-6/-mr-10/-mr-gutter mirrors the container padding so the white
            background extends flush to the edge; pr-* keeps content inset.
          */}
          <div className="flex-1 -mr-6 sm:-mr-10 lg:-mr-gutter">
            <div
              data-value-card
              className="flex gap-5 bg-white p-6 pr-6 sm:gap-[30px] sm:p-10 sm:pr-10 lg:pr-gutter"
            >
              <div className="hidden h-[55px] w-[65px] shrink-0 sm:block">
                {card.icon?.asset ? (
                  <SanityImage
                    image={card.icon}
                    width={65}
                    height={55}
                    className="h-full w-full object-contain"
                    decorative
                  />
                ) : (
                  <div className="h-full w-full rounded bg-brand-sky" aria-hidden="true" />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-[30px]">
                <h3 className="text-2xl font-medium leading-[35px] text-brand-blue md:text-[28px]">
                  {card.title}
                </h3>
                <hr className="border-brand-sun" />
                <p className="text-base leading-7 text-brand-blue">{card.body}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
