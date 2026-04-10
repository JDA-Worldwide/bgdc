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

const NAV_OFFSET = 32;

/**
 * Each image is absolutely positioned within the collage container
 * to create an overlapping, cascading layout per the design.
 * Coordinates are percentages of the container.
 */
const imageLayout = [
  {
    // Top-left — large aerial photo
    style: { top: "0%", left: "0%", width: "58%", rotate: "-1.5deg" },
    aspect: "aspect-[4/3.5]",
  },
  {
    // Top-right — smaller, offset down, overlaps image 1
    style: { top: "12%", left: "48%", width: "52%", rotate: "2.8deg" },
    aspect: "aspect-[4/3]",
  },
  {
    // Middle-left — large, overlaps above images
    style: { top: "42%", left: "-2%", width: "60%", rotate: "-2.9deg" },
    aspect: "aspect-[4/3.2]",
  },
  {
    // Bottom-center — overlaps image 3
    style: { top: "62%", left: "22%", width: "55%", rotate: "1.8deg" },
    aspect: "aspect-[4/3]",
  },
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

    // Each card starts hidden, then fades in sequentially on scroll
    cards.forEach((card) => {
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
        {/* Image collage — overlapping, cascading layout */}
        <div className="relative w-full max-w-[660px] shrink-0">
          {/* Padding-bottom sets the aspect ratio of the collage container */}
          <div className="relative" style={{ paddingBottom: "130%" }}>
            {resolvedImages.slice(0, 4).map((img, i) => {
              const layout = imageLayout[i];
              return (
                <div
                  key={i}
                  data-community-card
                  className="absolute overflow-hidden"
                  style={{
                    top: layout.style.top,
                    left: layout.style.left,
                    width: layout.style.width,
                    rotate: layout.style.rotate,
                    zIndex: i,
                  }}
                >
                  <div className={layout.aspect}>
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
