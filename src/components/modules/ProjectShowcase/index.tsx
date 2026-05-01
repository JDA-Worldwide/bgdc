import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { ProjectShowcaseProps, Project } from "./types";


function ProjectCard({ project }: { project: Project }) {
  const hasImages = project.images && project.images.length > 0;
  const hasContent = project.body || project.highlights?.length || project.cta?.label;

  return (
    <article className="bg-white">
      <div className={hasImages ? "lg:grid lg:grid-cols-2" : ""}>
        <div className="p-8 lg:p-10">
          <div className="mb-3 flex items-center gap-[30px]">
            {project.tagLabel ? (
              <p className="flex-1 font-accent text-[20px] leading-7 italic text-brand-soybean">
                {project.tagLabel}
              </p>
            ) : (
              <span className="flex-1" />
            )}
            {project.status && (
              <span className="shrink-0 whitespace-nowrap font-heading font-semibold text-base leading-7 text-brand-text-heading">
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
            <ul className="mb-6 list-disc space-y-1 ps-6" aria-label="Vision highlights">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="text-base leading-7 text-brand-text-heading">
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {project.cta?.label && project.cta.url && (
            <Button
              href={project.cta.url}
              isExternal={project.cta.isExternal}
              variant="blue-dark"
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
