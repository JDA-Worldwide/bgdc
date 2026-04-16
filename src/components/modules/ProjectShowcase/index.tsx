import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { ProjectShowcaseProps, Project } from "./types";

const statusColors: Record<string, string> = {
  "In Progress": "bg-brand-sky/30 text-brand-primary",
  "Now Selling": "bg-brand-prairie/30 text-brand-soybean",
  "Upcoming": "bg-brand-sun/20 text-brand-primary",
  "Planning": "bg-brand-sky/30 text-brand-primary",
  "Under Construction": "bg-brand-sun/30 text-brand-primary",
  "Approved": "bg-brand-prairie/30 text-brand-soybean",
  "Coming Soon": "bg-brand-limestone/60 text-brand-primary",
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
    <article className="bg-white">
      <div className={hasImages ? "lg:grid lg:grid-cols-2" : ""}>
        <div className="p-8 lg:p-10">
          {/* Mobile: badge first, then eyebrow. Desktop: eyebrow left + badge top-right on same row. */}
          {project.status && statusClass && (
            <span
              className={`mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold font-accent italic sm:hidden ${statusClass}`}
            >
              {project.status}
            </span>
          )}

          <div className="mb-3 flex items-start justify-between gap-4">
            {project.tagLabel ? (
              <p className="font-accent text-sm italic text-brand-primary">
                {project.tagLabel}
              </p>
            ) : (
              <span />
            )}
            {project.status && statusClass && (
              <span
                className={`hidden shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold font-accent italic sm:inline-flex ${statusClass}`}
              >
                {project.status}
              </span>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-heading text-2xl font-medium text-brand-text-heading sm:text-[28px] sm:leading-[35px]">
              {project.title}
            </h3>
          </div>

          <hr className="mb-[30px] border-brand-sun" />

          {project.body && (project.body as unknown[]).length > 0 && (
            <div className="mb-6 text-brand-blue">
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
              variant="blue-dark-outline"
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
          <p className="text-sm italic text-brand-text">
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
    <section className="bg-brand-limestone py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        {(heading || introText) && (
          <div className="mb-10 px-0 md:mb-[60px] lg:px-[109px]">
            {heading && (
              <h2 className="mb-4 text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
                {heading}
              </h2>
            )}
            {introText && (
              <p className="max-w-3xl text-base leading-7 text-brand-black">
                {introText}
              </p>
            )}
          </div>
        )}

        {projects && projects.length > 0 && (
          <div className="mx-auto space-y-8 px-0 lg:px-[109px]">
            {projects.map((project, i) => (
              <AnimateIn key={project._key} delay={i * 0.05}>
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
