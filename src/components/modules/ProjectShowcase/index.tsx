import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import type { ProjectShowcaseProps, Project } from "./types";

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-800",
  "Now Selling": "bg-green-100 text-green-800",
  "Upcoming": "bg-amber-100 text-amber-800",
  "Planning": "bg-purple-100 text-purple-800",
  "Under Construction": "bg-orange-100 text-orange-800",
  "Approved": "bg-teal-100 text-teal-800",
  "Coming Soon": "bg-gray-100 text-gray-700",
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const statusClass = project.status
    ? (statusColors[project.status] ?? "bg-gray-100 text-gray-700")
    : null;

  const hasImages = project.images && project.images.length > 0;
  const hasContent = project.body || project.highlights?.length || project.cta?.label;

  return (
    <article className="border-l-4 border-brand-sun bg-brand-surface">
      <div className={hasImages ? "lg:grid lg:grid-cols-2" : ""}>
        <div className="p-8 lg:p-10">
          {project.tagLabel && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              {project.tagLabel}
            </p>
          )}

          <div className="mb-4 flex flex-wrap items-start gap-3">
            <h3 className="font-heading text-2xl font-medium text-brand-text-heading sm:text-[28px] sm:leading-[35px]">
              {project.title}
            </h3>
            {project.status && statusClass && (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass}`}
              >
                {project.status}
              </span>
            )}
          </div>

          {project.body && (project.body as unknown[]).length > 0 && (
            <div className="mb-6 text-brand-charcoal">
              <PortableText value={project.body as unknown[]} />
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mb-6 space-y-2" aria-label="Vision highlights">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal">
                  <CheckIcon />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {project.cta?.label && project.cta.url && (
            <Button
              href={project.cta.url}
              isExternal={project.cta.isExternal}
              variant="outline"
              size="sm"
            >
              {project.cta.label}
            </Button>
          )}
        </div>

        {hasImages && (
          <div className="relative min-h-[280px] lg:min-h-0">
            {project.images!.length === 1 ? (
              <div className="relative h-full min-h-[280px]">
                <SanityImage
                  image={project.images![0]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="grid h-full grid-cols-2 gap-1">
                {project.images!.slice(0, 4).map((img) => (
                  <div key={img._key} className="relative min-h-[140px]">
                    <SanityImage
                      image={img}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {!hasImages && !hasContent && (
        <div className="flex items-center justify-center border-t border-brand-border p-8">
          <p className="text-sm italic text-brand-muted">
            Project details coming soon — stay connected for updates.
          </p>
        </div>
      )}
    </article>
  );
}

export default function ProjectShowcase({
  heading,
  introText,
  projects,
}: ProjectShowcaseProps) {
  if (!projects?.length && !heading) return null;

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
            <p className="max-w-3xl text-base leading-7 text-brand-muted">
              {introText}
            </p>
          )}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project._key} project={project} />
          ))}
        </div>
      )}
    </Container>
  );
}
