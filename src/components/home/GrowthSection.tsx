import SectionLabel from "./SectionLabel";
import ArrowIcon from "./ArrowIcon";

interface LinkField {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

interface Project {
  _key?: string;
  tag: string;
  tagColor?: string;
  title: string;
  description?: string;
  link?: LinkField;
}

interface GrowthSectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  ctaButton?: LinkField;
  projects?: Project[];
}

const tagStyles: Record<string, string> = {
  active: "bg-brand-olive/10 text-[#5A6B12]",
  planned: "bg-brand-primary/[0.08] text-[#1A5A96]",
  residential: "bg-brand-secondary/[0.18] text-[#7A5500]",
  commercial: "bg-brand-steel/45 text-[#2E5570]",
};

const defaultProjects: Project[] = [
  {
    tag: "Active",
    tagColor: "active",
    title: "Downtown Redevelopment Plan",
    description:
      "A comprehensive master plan guiding the revitalization of Bargersville\u2019s downtown core \u2014 setting the framework for mixed-use development, streetscape improvements, and long-term investment.",
    link: { label: "View master plan document", url: "#" },
  },
  {
    tag: "Planned",
    tagColor: "planned",
    title: "The Jefferson",
    description:
      "A significant mixed-use development bringing new commercial and residential opportunity to Bargersville, part of the broader vision for downtown growth and reinvestment.",
    link: { label: "Learn more", url: "#" },
  },
  {
    tag: "Residential",
    tagColor: "residential",
    title: "Bellingham by Lennar",
    description:
      "New home community bringing workforce housing to Bargersville \u2014 adding to the residential base that supports employers establishing or growing operations in the area.",
    link: { label: "View community", url: "#" },
  },
  {
    tag: "Commercial",
    tagColor: "commercial",
    title: "SR 135 & Smokey Row Mixed-Use",
    description:
      "Under construction at the SE corner of SR 135 and Smokey Row \u2014 Ale Emporium, Five Guys, Swig, First Watch, and a neighborhood Meijer. The commercial anchor Bargersville has been building toward.",
  },
];

export default function GrowthSection({
  sectionLabel = "Growth in Progress",
  heading = "What\u2019s happening here right now",
  description = "New residential, commercial, and mixed-use development is actively reshaping Bargersville. Here\u2019s what\u2019s underway and what\u2019s on the horizon near the I-69/SR 144 interchange and SR 135 corridor.",
  ctaButton = { label: "View All Projects", url: "/growth" },
  projects,
}: GrowthSectionProps) {
  const resolvedProjects = projects?.length ? projects : defaultProjects;

  return (
    <section className="border-y border-brand-border bg-brand-surface py-section">
      <div className="mx-auto max-w-[var(--container-content)] px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-brand-primary">
              {heading}
            </h2>
          </div>
          <div className="lg:pt-1">
            {description && (
              <p className="text-[15px] leading-[1.7] text-brand-muted font-light">
                {description}
              </p>
            )}
            {ctaButton?.url && (
              <a
                href={ctaButton.url}
                target={ctaButton.isExternal ? "_blank" : undefined}
                rel={ctaButton.isExternal ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-2.5 rounded-[3px] bg-brand-primary px-5 py-3 text-[13px] font-medium uppercase tracking-[0.78px] text-white transition-colors hover:bg-brand-primary/90"
              >
                {ctaButton.label}
                <ArrowIcon className="size-3" />
              </a>
            )}
          </div>
        </div>

        {/* Project cards */}
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {resolvedProjects.map((project, i) => (
            <div
              key={project._key || `project-${i}`}
              className="rounded-lg border border-brand-border bg-white p-7"
            >
              <span
                className={`inline-block rounded-sm px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[1.8px] ${
                  tagStyles[project.tagColor || "active"] || tagStyles.active
                }`}
              >
                {project.tag}
              </span>

              <h3 className="mt-5 font-display text-[19px] font-semibold leading-snug text-brand-primary">
                {project.title}
              </h3>

              {project.description && (
                <p className="mt-3 text-sm leading-[1.65] text-brand-muted font-light">
                  {project.description}
                </p>
              )}

              <div className="mt-6">
                {project.link?.url ? (
                  <a
                    href={project.link.url}
                    target={project.link.isExternal ? "_blank" : undefined}
                    rel={
                      project.link.isExternal
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium tracking-[0.5px] text-brand-primary transition-colors hover:text-brand-primary/80"
                  >
                    {project.link.label}
                    <ArrowIcon className="size-3" />
                  </a>
                ) : (
                  <span className="text-[12.5px] font-medium tracking-[0.5px] text-brand-muted">
                    Details coming soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
