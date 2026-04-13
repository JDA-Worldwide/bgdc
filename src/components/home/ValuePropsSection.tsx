"use client";

import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

interface ValueCard {
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
    const headings = el.querySelectorAll<HTMLElement>("[data-value-heading]");
    const cardEls = el.querySelectorAll<HTMLElement>("[data-value-card]");
    const scrollPanels = el.querySelectorAll<HTMLElement>("[data-value-panel]");

    if (!headings.length || !cardEls.length || !scrollPanels.length) return;

    const count = Math.min(headings.length, cardEls.length, scrollPanels.length);

    // Hide all headings and cards initially except the first set
    for (let i = 0; i < count; i++) {
      gsap.set(headings[i], { opacity: i === 0 ? 0 : 0, y: i === 0 ? 30 : 30 });
      gsap.set(cardEls[i], { opacity: i === 0 ? 0 : 0, y: i === 0 ? 30 : 30 });
    }

    // First panel: fade in
    const firstTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollPanels[0],
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
    firstTl
      .to(headings[0], { opacity: 1, y: 0, duration: 0.5 })
      .to(cardEls[0], { opacity: 1, y: 0, duration: 0.5 }, 0.1);

    // Subsequent panels: crossfade previous out, current in
    for (let i = 1; i < count; i++) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollPanels[i],
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      tl.to(headings[i - 1], { opacity: 0, y: -20, duration: 0.4 }, 0)
        .to(cardEls[i - 1], { opacity: 0, y: -20, duration: 0.4 }, 0)
        .to(headings[i], { opacity: 1, y: 0, duration: 0.5 }, 0.2)
        .to(cardEls[i], { opacity: 1, y: 0, duration: 0.5 }, 0.25);
    }

    // Pin the visible area
    ScrollTrigger.create({
      trigger: el.querySelector("[data-value-pin]"),
      start: "top top",
      endTrigger: el.querySelector("[data-value-end]"),
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.refresh();
  });

  return (
    <section ref={sectionRef} className="relative bg-brand-blue">
      {/* Pinned viewport — stays fixed while scroll panels drive animation */}
      <div data-value-pin className="flex min-h-screen items-start bg-brand-blue pt-[135px] pb-16">
        <div className="mx-auto flex w-full max-w-container flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-start lg:px-gutter">
          {/* Left heading — stacked absolutely, only active one visible */}
          <div className="relative flex-shrink-0 lg:w-[36%]">
            {headingLines.map((line, i) => (
              <h2
                key={i}
                data-value-heading
                className={`text-2xl font-medium leading-tight text-white sm:text-3xl md:text-[43px] md:leading-[60px] ${
                  i > 0 ? "absolute inset-0" : ""
                }`}
              >
                {line}
              </h2>
            ))}
          </div>

          {/* Right card — stacked absolutely, only active one visible */}
          <div className="relative flex-1">
            {resolvedCards.map((card, i) => (
              <div
                key={card.title}
                data-value-card
                className={`flex gap-5 bg-white p-6 sm:gap-[30px] sm:p-10 ${
                  i > 0 ? "absolute inset-0" : ""
                }`}
              >
                {/* Decorative icon */}
                <div className="hidden h-[55px] w-[65px] flex-shrink-0 sm:block">
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

                {/* Content */}
                <div className="flex flex-1 flex-col gap-[30px]">
                  <h3 className="text-2xl font-medium leading-[35px] text-brand-blue md:text-[28px]">
                    {card.title}
                  </h3>
                  <hr className="border-brand-sky" />
                  <p className="text-base leading-7 text-brand-blue">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invisible scroll panels — drive the crossfade timeline */}
      {resolvedCards.map((card, i) => (
        <div
          key={card.title}
          data-value-panel
          className="h-screen"
          aria-hidden="true"
        />
      ))}

      {/* End marker for the pin */}
      <div data-value-end />
    </section>
  );
}
