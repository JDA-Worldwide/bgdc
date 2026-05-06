import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";
import type { DevelopmentAreaShowcaseProps, DevelopmentArea } from "./types";

function AreaSection({ area }: { area: DevelopmentArea }) {
  const hasBody = area.body && (area.body as unknown[]).length > 0;
  const hasOpportunities = area.opportunities && area.opportunities.length > 0;
  const useTwoColumns = hasBody && hasOpportunities;
  const hasMapImage = Boolean(area.mapImage?.asset);

  const bodyBlock =
    (hasBody || hasOpportunities) && (
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
    );

  const ctaHref = area.cta?.downloadUrl?.trim() || area.cta?.url?.trim();
  const ctaBlock =
    area.cta?.label &&
    ctaHref && (
      <Button
        href={ctaHref}
        download={area.cta.downloadUrl ? (area.cta.downloadFilename ?? true) : undefined}
        isExternal={area.cta.downloadUrl ? false : area.cta.isExternal}
        variant="blue-dark"
        size="sm"
      >
        {area.cta.label}
      </Button>
    );

  const mapImageBlock = hasMapImage && (
    <div className="relative aspect-4/3 w-full overflow-hidden">
      <SanityImage
        image={area.mapImage!}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );

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
      </div>

      {hasMapImage ? (
        <div className="mt-[30px] grid grid-cols-1 gap-[30px] lg:grid-cols-2 lg:items-start">
          <div className="order-1 lg:order-2">{mapImageBlock}</div>
          <div className="order-2 space-y-[30px] lg:order-1">
            {bodyBlock}
            {ctaBlock}
          </div>
        </div>
      ) : (
        <div className="mt-[30px] space-y-[30px]">
          {bodyBlock}
          {ctaBlock}
        </div>
      )}
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
