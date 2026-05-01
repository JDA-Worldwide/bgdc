import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";
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

function AreaSection({ area }: { area: DevelopmentArea }) {
  const hasBody = area.body && (area.body as unknown[]).length > 0;
  const hasOpportunities = area.opportunities && area.opportunities.length > 0;
  const useTwoColumns = hasBody && hasOpportunities;

  return (
    <div className="border-b border-brand-border pb-16 last:border-0 last:pb-0">
      <div className="space-y-[30px]">
        {(area.areaLabel || area.statusLabel) && (
          <div className="flex items-center gap-[30px]">
            {area.areaLabel && (
              <span className="flex-1 min-w-0 font-accent italic text-[20px] leading-7 text-brand-soybean">
                {area.areaLabel}
              </span>
            )}
            {area.statusLabel && (
              <span className="shrink-0 whitespace-nowrap font-heading font-semibold text-base leading-7 text-brand-text-heading">
                {area.statusLabel}
              </span>
            )}
          </div>
        )}

        <h3 className="font-heading text-[28px] font-medium leading-[35px] text-brand-text-heading">
          {area.title}
        </h3>

        <div className="h-px w-full bg-brand-sun" aria-hidden="true" />

        {(hasBody || hasOpportunities) && (
          <div className={cn(useTwoColumns && "grid grid-cols-1 gap-[30px] lg:grid-cols-2")}>
            {hasBody && (
              <div className="text-brand-text-heading">
                <PortableText value={area.body as unknown[]} />
              </div>
            )}
            {hasOpportunities && (
              <div>
                <p className="mb-3 text-base font-medium uppercase tracking-[2.4px] text-brand-text-heading">
                  Available Opportunities
                </p>
                <ul className="list-disc list-inside space-y-2">
                  {area.opportunities!.map((opp, i) => (
                    <li key={i} className="text-sm leading-7 text-brand-charcoal">
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

      <div className="mt-20">
        {area.mapImage?.asset ? (
          <div className="relative min-h-[300px] w-full overflow-hidden lg:min-h-[638px]">
            <SanityImage
              image={area.mapImage}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <MapPlaceholder />
        )}
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
    <div className="py-section">
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
                <AreaSection area={area} />
              </AnimateIn>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
