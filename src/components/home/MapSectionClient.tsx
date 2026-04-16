"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
import type { MapMarker } from "@/components/ui/MapboxMap";

interface Destination {
  time: string;
  label: string;
}

interface MapSectionClientProps {
  heading?: string;
  body?: string;
  destinations: Destination[];
  center: [number, number];
  markers: MapMarker[];
}

export default function MapSectionClient({
  heading,
  body,
  destinations,
  center,
  markers,
}: MapSectionClientProps) {
  const contentRef = useGsap<HTMLDivElement>((el) => {
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
      <div className="mx-auto flex max-w-container flex-col gap-[60px] px-6 sm:px-10 lg:px-gutter">
        {/* Interactive Mapbox map — no animation */}
        <div className="relative aspect-1320/487 w-full overflow-hidden">
          <MapboxMapClient
            center={center}
            zoom={8}
            markers={markers}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Bottom row — stagger fade in */}
        <div ref={contentRef} className="flex flex-col gap-10 lg:flex-row lg:gap-[60px]">
          <div data-animate-fadeinup className="flex flex-1 flex-col gap-[25px] text-brand-charcoal">
            {heading && (
              <h2 className="text-2xl font-medium leading-[35px] md:text-[28px]">
                {heading}
              </h2>
            )}
            {body && <p className="text-base leading-7">{body}</p>}
          </div>

          <div className="flex flex-1 flex-col gap-[23px]">
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
    </section>
  );
}
