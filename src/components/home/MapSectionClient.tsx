"use client";

import { useEffect, useId, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import { PortableText } from "@portabletext/react";

const MAP_FALLBACK_DIMENSIONS = { width: 2048, height: 1152 };
const LIGHTBOX_MAX_WIDTH = 4096;

interface MapAssetExpanded {
  _ref?: string;
  _id?: string;
  url?: string;
  metadata?: { dimensions?: { width: number; height: number } };
}

/** Map module image supports expanded `asset->{ metadata }` from GROQ. */
export interface MapSectionMapImage extends Omit<SanityImageSource, "asset"> {
  asset?: MapAssetExpanded;
}

interface Destination {
  _key?: string;
  time: string;
  label: string;
  description?: string;
}

interface MapSectionClientProps {
  heading?: string;
  body?: unknown[];
  destinations: Destination[];
  mapImage?: MapSectionMapImage;
}

function getIntrinsicDimensions(image: MapSectionMapImage): { width: number; height: number } {
  const d = image.asset?.metadata?.dimensions;
  const w = d?.width ?? MAP_FALLBACK_DIMENSIONS.width;
  const h = d?.height ?? MAP_FALLBACK_DIMENSIONS.height;
  return w > 0 && h > 0 ? { width: w, height: h } : MAP_FALLBACK_DIMENSIONS;
}

function lightboxDimensions(image: MapSectionMapImage) {
  const { width: w, height: h } = getIntrinsicDimensions(image);
  const capW = Math.min(w, LIGHTBOX_MAX_WIDTH);
  const capH = Math.round((h * capW) / w);
  return { width: capW, height: capH };
}

export default function MapSectionClient({
  heading,
  body,
  destinations,
  mapImage,
}: MapSectionClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const sidebarRef = useGsap<HTMLDivElement>((el) => {
    const target = el.querySelector<HTMLElement>("[data-animate-fadeinup]");
    if (!target) return;
    gsap.fromTo(
      target,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    );
  });

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const { width: layoutW, height: layoutH } = mapImage ? getIntrinsicDimensions(mapImage) : MAP_FALLBACK_DIMENSIONS;
  const lightboxSizing = mapImage ? lightboxDimensions(mapImage) : MAP_FALLBACK_DIMENSIONS;

  return (
    <>
      <section className="py-section">
        <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
            <div className="w-full lg:w-[55%] lg:shrink-0 lg:pr-10">
              {mapImage?.asset ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                  aria-haspopup="dialog"
                  aria-expanded={lightboxOpen}
                  aria-label="Open regional map — full-size view"
                >
                  <figure className="relative m-0 w-full overflow-hidden lg:rounded-sm">
                    <SanityImage
                      image={mapImage as SanityImageSource}
                      width={layoutW}
                      height={layoutH}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="h-auto w-full object-contain"
                    />
                  </figure>
                  <span
                    className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 bg-brand-charcoal/0 p-5 transition-colors duration-200 group-hover:bg-brand-charcoal/10 group-focus-visible:bg-brand-charcoal/10 md:p-6"
                    aria-hidden
                  >
                    <span className="inline-flex translate-y-1 scale-95 items-center justify-center gap-2 self-center rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-brand-charcoal opacity-0 shadow-md transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:text-sm">
                      <svg
                        className="size-5 shrink-0 text-brand-charcoal"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                      View full-size map
                    </span>
                  </span>
                </button>
              ) : null}
            </div>

            <div
              ref={sidebarRef}
              className="flex w-full min-w-0 flex-1 flex-col gap-8"
            >
              <div data-animate-fadeinup className="flex flex-col gap-8">
                <div className="flex flex-col gap-[25px] text-brand-charcoal">
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
                      block: {
                        normal: ({ children }) => <p className="text-base leading-7">{children}</p>,
                      },
                      marks: {
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        link: ({ children, value }) => (
                          <a
                            href={value?.href}
                            target={value?.blank ? "_blank" : undefined}
                            rel={value?.blank ? "noopener noreferrer" : undefined}
                            className="underline hover:no-underline"
                          >
                            {children}
                          </a>
                        ),
                      },
                    }}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-5">
                {destinations.map((dest, i) => (
                  <div
                    key={dest._key ?? i}
                    className="grid grid-cols-[auto_1fr] items-start gap-x-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-[5px] w-[23px] shrink-0 bg-brand-sun" />
                      <p className="whitespace-nowrap text-sm font-semibold text-brand-charcoal sm:text-base">
                        {dest.time}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm text-brand-charcoal sm:text-base">{dest.label}</p>
                      {dest.description && (
                        <p className="text-xs leading-snug text-brand-muted">{dest.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && mapImage?.asset ? (
        <MapLightbox
          mapImage={mapImage}
          lightboxSizing={lightboxSizing}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}

function MapLightbox({
  mapImage,
  lightboxSizing,
  onClose,
}: {
  mapImage: MapSectionMapImage;
  lightboxSizing: { width: number; height: number };
  onClose: () => void;
}) {
  const lightboxHeadingId = useId();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={lightboxHeadingId}
      onClick={onClose}
    >
      <h2 id={lightboxHeadingId} className="sr-only">
        Regional corridor map — full size
      </h2>

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[60] rounded-full bg-white/15 p-2 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Close map"
      >
        <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-h-[min(92dvh,calc(100dvh-2rem))] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <SanityImage
          image={mapImage as SanityImageSource}
          width={lightboxSizing.width}
          height={lightboxSizing.height}
          sizes="92vw"
          priority
          className="max-h-[min(92dvh,calc(100dvh-2rem))] w-auto max-w-[92vw] object-contain"
        />
      </div>
    </div>
  );
}
