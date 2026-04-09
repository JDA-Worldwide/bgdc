import SectionLabel from "./SectionLabel";

interface Pillar {
  _key?: string;
  icon?: string;
  title: string;
  description?: string;
}

interface WhySectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  pillars?: Pillar[];
}

const iconMap: Record<string, React.ReactNode> = {
  location: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="#003B71" strokeWidth="1.5" />
      <path d="M20 8v24M8 20h24" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="4" fill="#FFBF3C" />
    </svg>
  ),
  place: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="12" width="32" height="22" rx="2" stroke="#003B71" strokeWidth="1.5" />
      <path d="M20 6v6M14 12l6-6 6 6" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="22" width="8" height="12" rx="1" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="2" fill="#FFBF3C" />
    </svg>
  ),
  business: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 18l12-12 12 12" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="18" width="16" height="16" rx="1" stroke="#003B71" strokeWidth="1.5" />
      <rect x="17" y="24" width="6" height="10" rx="0.5" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="4" fill="#FFBF3C" />
      <path d="M30 10h4M32 8v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M4 36L14 22l8 6 14-20" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="8" r="4" fill="#FFBF3C" />
    </svg>
  ),
  shield: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4L6 12v10c0 8.837 6.268 17.09 14 20 7.732-2.91 14-11.163 14-20V12L20 4z" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="5" fill="#FFBF3C" />
    </svg>
  ),
  people: (
    <svg className="size-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="6" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="28" cy="14" r="5" stroke="#003B71" strokeWidth="1.5" />
      <path d="M2 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2.5" fill="#FFBF3C" />
    </svg>
  ),
};

const defaultPillars: Pillar[] = [
  {
    icon: "location",
    title: "Strategic Location",
    description:
      "Positioned at the I-69 and SR 144 interchange \u2014 25 minutes from downtown Indianapolis, the airport, and Bloomington. Rail access included. The logistics math works here.",
  },
  {
    icon: "place",
    title: "Quality of Place",
    description:
      "Highly ranked schools, Parks & Recreation, a growing downtown, and a community character that draws and retains talent. The people your business needs want to live here.",
  },
  {
    icon: "business",
    title: "Pro-Business Partner",
    description:
      "A municipal government that\u2019s serious about economic development. TIF districts, development incentives, streamlined processes, and a director who picks up the phone.",
  },
];

export default function WhySection({
  sectionLabel = "Why Bargersville?",
  heading = "A community built for the next chapter of Indiana\u2019s growth",
  description = "Agricultural roots. Regional connectivity. A town that moves fast when a business wants to grow. Bargersville is the rare combination of pro-business momentum and quality-of-place that business leaders are looking for.",
  pillars,
}: WhySectionProps) {
  const resolvedPillars = pillars?.length ? pillars : defaultPillars;

  return (
    <section className="py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div className="max-w-3xl">
          {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}

          <h2 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-brand-primary">
            {heading}
          </h2>

          {description && (
            <p className="mt-6 text-[17px] leading-[1.75] text-brand-text font-light max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Three pillars */}
        <div className="mt-14 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-border border border-brand-border rounded-lg">
          {resolvedPillars.map((pillar, i) => (
            <div
              key={pillar._key || `pillar-${i}`}
              className="px-6 lg:px-8 py-10 first:pt-10"
            >
              <div className="h-[3px] w-12 rounded-full bg-brand-secondary mb-6" />
              {pillar.icon && iconMap[pillar.icon] && (
                <div className="mb-6">{iconMap[pillar.icon]}</div>
              )}
              <h3 className="font-heading text-[19px] font-semibold text-brand-primary leading-snug">
                {pillar.title}
              </h3>
              {pillar.description && (
                <p className="mt-3 text-[14.5px] leading-[1.72] text-brand-text font-light">
                  {pillar.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
