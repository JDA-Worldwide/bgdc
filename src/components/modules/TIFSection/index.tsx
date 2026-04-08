import Container from "@/components/ui/Container";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import type { TIFSectionProps } from "./types";

function MapPlaceholder() {
  return (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded border-2 border-dashed border-brand-border bg-brand-surface">
      <div className="text-center">
        <svg
          className="mx-auto mb-2 h-10 w-10 text-brand-border"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>
        <p className="text-sm text-brand-muted">TIF district map coming soon</p>
      </div>
    </div>
  );
}

export default function TIFSection({
  heading,
  introText,
  howItWorks,
  districts,
  mapImage,
  cta,
}: TIFSectionProps) {
  if (!heading && !introText && !howItWorks) return null;

  return (
    <Container>
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          {heading && (
            <h2 className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}

          {introText && (
            <p className="mb-6 text-base leading-7 text-brand-charcoal">{introText}</p>
          )}

          {howItWorks && (
            <div className="mb-8 border-l-4 border-brand-sun bg-brand-surface p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-primary">
                How TIF Works
              </p>
              <p className="text-sm leading-relaxed text-brand-charcoal">{howItWorks}</p>
            </div>
          )}

          {districts && districts.length > 0 ? (
            <div className="mb-8 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                TIF Districts
              </p>
              {districts.map((district) => (
                <div key={district._key} className="rounded border border-brand-border p-4">
                  <p className="font-medium text-brand-text-heading">{district.name}</p>
                  {district.eligibleUses && (
                    <p className="mt-1 text-sm text-brand-muted">{district.eligibleUses}</p>
                  )}
                  {district.contact && (
                    <p className="mt-1 text-sm text-brand-secondary">{district.contact}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-8 rounded border-2 border-dashed border-brand-border bg-brand-surface p-6 text-center">
              <p className="text-sm italic text-brand-muted">
                TIF district details coming soon — contact us for current information.
              </p>
            </div>
          )}

          {cta?.label && cta.url && (
            <Button href={cta.url} isExternal={cta.isExternal} variant="primary">
              {cta.label}
            </Button>
          )}
        </div>

        <div className="mt-10 lg:mt-0">
          {mapImage?.asset ? (
            <div className="relative min-h-[320px] overflow-hidden rounded">
              <SanityImage
                image={mapImage}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <MapPlaceholder />
          )}
        </div>
      </div>
    </Container>
  );
}
