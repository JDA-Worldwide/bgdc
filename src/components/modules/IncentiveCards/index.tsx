import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { IncentiveCardsProps, IncentiveProgram } from "./types";

function ProgramCard({ program }: { program: IncentiveProgram }) {
  const isEmpty = !program.eligibility && !program.description;

  return (
    <div className="flex flex-col bg-white p-6">
      <h3 className="mb-2 font-heading text-xl font-medium text-brand-text-heading">
        {program.name}
      </h3>

      <div className="mb-4 h-px w-12 bg-brand-sky" aria-hidden="true" />

      {isEmpty ? (
        <p className="flex-1 text-sm italic text-brand-muted">
          Program details coming soon — contact us to learn more.
        </p>
      ) : (
        <>
          {program.eligibility && (
            <div className="mb-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Who It&apos;s For
              </p>
              <p className="text-sm text-brand-charcoal">{program.eligibility}</p>
            </div>
          )}
          {program.description && (
            <div className="mb-4 flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">
                What It Offers
              </p>
              <p className="text-sm leading-relaxed text-brand-charcoal">
                {program.description}
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-auto pt-4">
        {program.cta?.label && program.cta.url ? (
          <Button href={program.cta.url} isExternal={program.cta.isExternal} variant="outline" size="sm">
            {program.cta.label}
          </Button>
        ) : (
          <Link
            href="/get-in-touch"
            className="text-sm font-medium text-brand-secondary hover:underline"
          >
            Ask us about this program →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function IncentiveCards({
  heading,
  introText,
  programs,
}: IncentiveCardsProps) {
  if (!programs?.length && !heading) return null;

  return (
    <Container>
      {(heading || introText) && (
        <div className="mb-10">
          {heading && (
            <h2 className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {introText && (
            <p className="max-w-3xl text-base leading-7 text-brand-muted">{introText}</p>
          )}
        </div>
      )}

      {programs && programs.length > 0 ? (
        <AnimateIn stagger className="grid gap-px bg-brand-border sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program._key} program={program} />
          ))}
        </AnimateIn>
      ) : (
        <div className="flex items-center justify-center rounded border-2 border-dashed border-brand-border bg-brand-surface p-12 text-center">
          <div>
            <p className="font-medium text-brand-text-heading">Incentive programs coming soon</p>
            <p className="mt-2 text-sm text-brand-muted">
              Contact our team to learn about current development incentives.
            </p>
            <Link href="/get-in-touch" className="mt-4 inline-block text-sm font-medium text-brand-secondary hover:underline">
              Get in Touch →
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
