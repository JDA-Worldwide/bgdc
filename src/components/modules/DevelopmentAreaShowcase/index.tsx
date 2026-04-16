import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { DevelopmentAreaShowcaseProps, DevelopmentArea } from "./types";

function MapPlaceholder() {
  return (
    <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded border-2 border-dashed border-brand-border bg-brand-surface">
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
        <p className="text-sm text-brand-muted">Parcel map coming soon</p>
      </div>
    </div>
  );
}

function AreaSection({ area, index }: { area: DevelopmentArea; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="border-b border-brand-border pb-16 last:border-0 last:pb-0">
      <div className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}>
        <div>
          {area.areaLabel && (
            <div className="mb-4 flex flex-wrap gap-2">
              {area.areaLabel.split("|").map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-brand-sky/30 px-3 py-1 text-xs font-semibold font-accent italic text-brand-primary"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <h3 className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-[28px] sm:leading-[35px]">
            {area.title}
          </h3>

          {area.body && (area.body as unknown[]).length > 0 && (
            <div className="mb-6 text-brand-charcoal">
              <PortableText value={area.body as unknown[]} />
            </div>
          )}

          {area.opportunities && area.opportunities.length > 0 && (
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-text">
                Available Opportunities
              </p>
              <ul className="space-y-2">
                {area.opportunities.map((opp, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-brand-charcoal">
                    <div className="h-[5px] w-[23px] shrink-0 bg-brand-sun" aria-hidden="true" />
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {area.cta?.label && area.cta.url && (
            <Button
              href={area.cta.url}
              isExternal={area.cta.isExternal}
              variant="blue-dark"
              size="sm"
            >
              {area.cta.label}
            </Button>
          )}
        </div>

        <div className="mt-8 lg:mt-0">
          {area.mapImage?.asset ? (
            <div className="relative min-h-[280px] overflow-hidden rounded">
              <SanityImage
                image={area.mapImage}
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
    </div>
  );
}

export default function DevelopmentAreaShowcase({
  heading,
  introText,
  areas,
}: DevelopmentAreaShowcaseProps) {
  if (!areas?.length && !heading) return null;

  return (
    <Container>
      {(heading || introText) && (
        <div className="mb-12">
          {heading && (
            <h2 className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {introText && (
            <p className="max-w-3xl text-base leading-7 text-brand-text">
              {introText}
            </p>
          )}
        </div>
      )}

      {areas && areas.length > 0 && (
        <div className="space-y-16">
          {areas.map((area, index) => (
            <AnimateIn key={area._key} delay={index * 0.05}>
              <AreaSection area={area} index={index} />
            </AnimateIn>
          ))}
        </div>
      )}
    </Container>
  );
}
