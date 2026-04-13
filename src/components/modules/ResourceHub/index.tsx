import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import type { ResourceHubProps, Resource } from "./types";

function ResourceCard({ resource }: { resource: Resource }) {
  const hasLink = !!resource.url;

  return (
    <div className="flex flex-col bg-brand-surface p-6 transition-shadow hover:shadow-md">
      <h3 className="mb-1 font-heading text-base font-medium text-brand-text-heading">
        {resource.title}
      </h3>

      {resource.description && (
        <p className="mb-4 flex-1 text-sm leading-relaxed text-brand-muted">
          {resource.description}
        </p>
      )}

      <div className="mt-auto pt-3">
        {hasLink ? (
          <Button
            href={resource.url}
            isExternal={resource.isExternal}
            variant="outline"
            size="sm"
          >
            {resource.linkLabel || "View Resource"}
          </Button>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-brand-muted italic">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Link coming soon
          </span>
        )}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource._key} resource={resource} />
          ))}
        </div>
      )}
    </Container>
  );
}
