"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
import type { MapMarker } from "@/components/ui/MapboxMap";
import { PortableText } from "@portabletext/react";

interface Destination {
  time: string;
  label: string;
}

interface MapSectionClientProps {
  heading?: string;
  body?: unknown[];
  destinations: Destination[];
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
}

export default function MapSectionClient({
  heading,
  body,
  destinations,
  center,
  zoom = 9,
  markers,
}: MapSectionClientProps) {
  const sidebarRef = useGsap<HTMLDivElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-animate-fadeinup]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    );
  });

  return (
    <section className="py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-0">
          {/* Map — full width mobile, flex-1 on desktop */}
          <div className="relative h-[90vh] overflow-hidden lg:flex-1">
            <MapboxMapClient
              center={center}
              zoom={zoom}
              markers={markers}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* Sidebar — below map on mobile, right column on desktop */}
          <div
            ref={sidebarRef}
            className="flex flex-col gap-8 lg:h-[90vh] lg:w-[380px] lg:shrink-0 lg:overflow-y-auto lg:pl-12"
          >
            <div data-animate-fadeinup className="flex flex-col gap-[25px] text-brand-charcoal">
              {heading && (
                <h2 className="text-2xl font-medium leading-[35px] md:text-[28px]">
                  {heading}
                </h2>
              )}
              {body?.length ? (
                <PortableText
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={body as any}
                  components={{
                    block: { normal: ({ children }) => <p className="text-base leading-7">{children}</p> },
                    marks: {
                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      link: ({ children, value }) => (
                        <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined} className="underline hover:no-underline">{children}</a>
                      ),
                    },
                  }}
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-[23px]">
              {destinations.map((dest, i) => (
                <div
                  key={i}
                  data-animate-fadeinup
                  className="flex items-start gap-4 sm:items-center sm:gap-5"
                >
                  <div className="mt-2.5 h-[5px] w-[23px] shrink-0 bg-brand-sun sm:mt-0" />
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <p className="text-base font-semibold leading-[27px] text-brand-charcoal">
                      {dest.time}
                    </p>
                    <p className="text-sm leading-6 text-brand-charcoal sm:text-base sm:leading-7">
                      {dest.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
