"use client";

import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { useCallback } from "react";

interface CommunitySectionProps {
  heading?: string;
  leadText?: string;
  body?: string;
  images?: SanityImageSource[];
}

const rotations = ["-1.5deg", "-1.7deg", "2.8deg", "-2.9deg"];

const NAV_OFFSET = 32;

const imagePositions = [
  { col: "1", row: "1", align: "start", size: "lg" },
  { col: "2", row: "1", align: "end", size: "sm" },
  { col: "1", row: "2", align: "start", size: "lg" },
  { col: "2", row: "2", align: "end", size: "sm" },
] as const;

export default function CommunitySection({
  heading = "A Community Built for Business \u2014 and Built to Last",
  leadText = "Nestled in the heart of Johnson County, Bargersville provides a sense of community, hospitality, and possibility moving side by side. With roots dating back to 1850, this once-agricultural town has grown into a vibrant community that blends heritage with opportunity.",
  body = "Today, Bargersville is one of the fastest-growing communities in the state, expanding by over 10,000 residents in the last five years. We are conveniently located between Indianapolis and Bloomington, have access to top school districts in the county, and have acreage to spare\u2014providing growth opportunities for families and businesses alike. Bargersville offers all of this, while preserving the character, relationships, and quality of life that make the community feel like home.",
  images,
}: CommunitySectionProps) {
  const resolvedImages = images && images.length > 0 ? images : Array(4).fill(null);

  const stickyRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const header = document.querySelector("header");
    const navHeight = header ? header.offsetHeight : 103;
    node.style.top = `${navHeight + NAV_OFFSET}px`;
  }, []);

  const sectionRef = useGsap<HTMLElement>((el) => {
    const cards = el.querySelectorAll<HTMLElement>("[data-community-card]");
    if (!cards.length) return;

    // Each card starts hidden and stacked, then reveals sequentially
    cards.forEach((card, i) => {
      if (i === 0) return; // First card is already visible

      gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();
  });

  return (
    <section ref={sectionRef} className="py-section">
      <div className="@container mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div className="flex flex-col gap-10 @[68rem]:flex-row @[68rem]:gap-[65px]">
        {/* Image collage — images stack as user scrolls */}
        <div className="relative w-full max-w-[660px] shrink-0">
          <div className="grid grid-cols-2 gap-4">
            {resolvedImages.slice(0, 4).map((img, i) => {
              const pos = imagePositions[i];
              return (
                <div
                  key={i}
                  data-community-card
                  className={`aspect-square overflow-hidden ${
                    pos.align === "end" ? (i === 1 ? "mt-16" : "mt-10") : ""
                  } ${pos.size === "sm" ? "w-[85%] justify-self-end" : ""}`}
                  style={{ rotate: rotations[i] }}
                >
                  {img?.asset ? (
                    <SanityImage
                      image={img}
                      width={444}
                      height={444}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className={`h-full w-full ${
                        i % 2 === 0 ? "bg-brand-sky" : "bg-brand-limestone"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Text content — stays sticky on scroll */}
        <div
          ref={stickyRef}
          className="flex flex-1 flex-col gap-[60px] @[68rem]:sticky @[68rem]:top-[135px] @[68rem]:self-start"
        >
          <h2 className="text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
          <div className="flex flex-col gap-4 text-brand-charcoal">
            {leadText && (
              <p className="text-lg leading-relaxed md:text-[22px] md:leading-[33px]">
                {leadText}
              </p>
            )}
            {body && <p className="text-base leading-7">{body}</p>}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
