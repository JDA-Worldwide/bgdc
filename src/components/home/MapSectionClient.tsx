"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
import type { MapMarker, MapboxMapHandle } from "@/components/ui/MapboxMap";

interface Destination {
  time: string;
  label: string;
}

interface MapSectionClientProps {
  heading?: string;
  body?: string;
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
  const mapRef = useRef<MapboxMapHandle>(null);

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
            ref={mapRef}
            center={center}
            zoom={zoom}
            markers={markers}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Bottom row — stagger fade in */}
        <div ref={contentRef} className="flex flex-col gap-10 lg:flex-row lg:gap-[60px]">
          <div data-animate-fadeinup className="flex flex-col gap-[25px] text-brand-charcoal lg:w-[35%] lg:shrink-0">
            {heading && (
              <h2 className="text-2xl font-medium leading-[35px] md:text-[28px]">
                {heading}
              </h2>
            )}
            {body && <p className="text-base leading-7">{body}</p>}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-[23px] sm:grid-cols-2">
            {destinations.map((dest, i) => {
              const marker = markers[i + 1];
              return (
                <div
                  key={i}
                  data-animate-fadeinup
                  className="flex cursor-pointer items-start gap-4 transition-opacity hover:opacity-70 sm:items-center sm:gap-5"
                  role="button"
                  tabIndex={0}
                  aria-label={`Show ${dest.label} on map`}
                  onClick={() => {
                    if (marker) mapRef.current?.flyTo(marker.lng, marker.lat, dest.label);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (marker) mapRef.current?.flyTo(marker.lng, marker.lat, dest.label);
                    }
                  }}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
