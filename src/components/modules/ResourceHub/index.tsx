import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { ResourceHubProps, Resource } from "./types";

function ResourceCard({ resource }: { resource: Resource }) {
  const hasLink = !!resource.url;

  return (
    <div className="flex flex-col gap-[30px] bg-brand-sky p-10">
      <h3 className="text-[23px] font-medium leading-[30px] text-brand-blue">
        {resource.title}
      </h3>
      <hr className="border-brand-blue/20" />
      <div className="flex flex-1 flex-col gap-6">
        {resource.description && (
          <p className="flex-1 text-base leading-7 text-brand-blue">
            {resource.description}
          </p>
        )}
        <div className="mt-auto">
          {hasLink ? (
            <Button
              href={resource.url}
              isExternal={resource.isExternal}
              variant="blue-dark"
              size="sm"
            >
              {resource.linkLabel || "View Resource"}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue/60 italic">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Link coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResourceHub({
  heading,
  introText,
  resources,
}: ResourceHubProps) {
  if (!resources?.length && !heading) return null;

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

      {resources && resources.length > 0 && (
        <AnimateIn stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource._key} resource={resource} />
          ))}
        </AnimateIn>
      )}
    </Container>
  );
}
