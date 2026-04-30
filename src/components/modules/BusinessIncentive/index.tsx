import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { BusinessIncentiveProps } from "./types";

export default function BusinessIncentive({
  heading,
  introText,
  calloutHeading,
  calloutText,
  cta,
}: BusinessIncentiveProps) {
  if (!heading && !introText && !calloutHeading && !calloutText) return null;

  return (
    <Container>
      <AnimateIn>
        {heading && (
          <h2 className="mb-4 font-heading text-[28px] font-medium leading-[35px] text-brand-text-heading">
            {heading}
          </h2>
        )}

        <hr className="mb-6 border-brand-sun" />

        {introText && (
          <p className="mb-6 text-base leading-7 text-brand-charcoal">{introText}</p>
        )}

        {(calloutHeading || calloutText) && (
          <div className="mb-6">
            {calloutHeading && (
              <p className="mb-2 text-sm font-medium uppercase tracking-[2.4px] text-brand-primary">
                {calloutHeading}
              </p>
            )}
            {calloutText && (
              <p className="text-base leading-7 text-brand-charcoal">{calloutText}</p>
            )}
          </div>
        )}

        {cta?.label && cta.url && (
          <Button
            href={cta.url}
            isExternal={cta.isExternal}
            variant={(stegaClean(cta.variant) as Parameters<typeof Button>[0]["variant"]) ?? "blue-dark"}
          >
            {cta.label}
          </Button>
        )}
      </AnimateIn>
    </Container>
  );
}
