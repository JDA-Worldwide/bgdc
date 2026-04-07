import SectionLabel from "./SectionLabel";
import ArrowIcon from "./ArrowIcon";

interface ReachItem {
  _key?: string;
  time: string;
  place: string;
}

interface LinkField {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

interface LocationSectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  reachItems?: ReachItem[];
  extraLine?: string;
  ctaButton?: LinkField;
}

const defaultReachItems: ReachItem[] = [
  { time: "25 min", place: "Indianapolis International Airport (IND)" },
  { time: "25 min", place: "Downtown Indianapolis" },
  { time: "60 min", place: "Bloomington & Indiana University" },
  { time: "60 min", place: "Camp Atterbury & Crane Naval Surface Warfare Center" },
  { time: "90 min", place: "Purdue University (West Lafayette)" },
];

export default function LocationSection({
  sectionLabel = "Access & Infrastructure",
  heading = "The center of Indiana\u2019s regional corridor network",
  description = "Bargersville sits at the intersection of I-69 and SR 144 \u2014 a node purpose-built for movement. Whether your business depends on goods in motion or talent in commute, the infrastructure is already here.",
  reachItems,
  extraLine = "Active rail line with freight access",
  ctaButton = { label: "View Available Parcels", url: "/available-land" },
}: LocationSectionProps) {
  const resolvedReach = reachItems?.length ? reachItems : defaultReachItems;

  return (
    <section className="relative bg-brand-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(192,202,128,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 20% 20%, rgba(183,199,211,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-content)] px-6 lg:px-8 py-section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left content */}
          <div>
            {sectionLabel && (
              <SectionLabel variant="light">{sectionLabel}</SectionLabel>
            )}

            <h2 className="mt-5 font-heading text-3xl sm:text-[40px] font-bold leading-[1.15] text-white">
              {heading}
            </h2>

            {description && (
              <p className="mt-6 text-base leading-[1.75] text-white/70 font-light">
                {description}
              </p>
            )}

            {/* Reach items */}
            <div className="mt-10 space-y-3">
              {resolvedReach.map((item, i) => (
                <div
                  key={item._key || `reach-${i}`}
                  className="flex items-center gap-4"
                >
                  <div className="size-1.5 rounded-full bg-brand-secondary shrink-0" />
                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="font-semibold text-white whitespace-nowrap">
                      {item.time}
                    </span>
                    <span className="text-white/78 font-light">{item.place}</span>
                  </div>
                </div>
              ))}
              {extraLine && (
                <div className="flex items-center gap-4">
                  <div className="size-1.5 rounded-full bg-brand-secondary shrink-0" />
                  <p className="text-sm text-white/78 font-light">{extraLine}</p>
                </div>
              )}
            </div>

            {ctaButton?.url && (
              <a
                href={ctaButton.url}
                target={ctaButton.isExternal ? "_blank" : undefined}
                rel={ctaButton.isExternal ? "noopener noreferrer" : undefined}
                className="mt-10 inline-flex items-center gap-2.5 rounded-[3px] border border-white/35 px-6 py-3 text-[13px] font-medium uppercase tracking-[0.78px] text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                {ctaButton.label}
                <ArrowIcon className="size-3" />
              </a>
            )}
          </div>

          {/* Right — Map placeholder */}
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.06] overflow-hidden flex items-center justify-center min-h-[376px]">
            <div className="relative w-full h-full min-h-[376px] p-8 flex items-center justify-center">
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="25%" y1="0" x2="75%" y2="100%" stroke="rgba(255,191,60,0.15)" strokeWidth="1.5" />
                <line x1="0" y1="62%" x2="100%" y2="62%" stroke="rgba(183,199,211,0.12)" strokeWidth="1" />
              </svg>
              <div className="relative text-center">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                  <div className="size-3 rounded-full border-2 border-brand-steel/50 mx-auto" />
                  <span className="block mt-1 text-[10px] text-brand-steel/75">
                    Indianapolis
                  </span>
                </div>
                <div>
                  <div className="size-4 rounded-full bg-brand-secondary/80 border-2 border-brand-secondary mx-auto" />
                  <span className="block mt-1.5 text-[11px] text-white font-medium">
                    Bargersville
                  </span>
                </div>
                <div className="absolute -left-20 top-4">
                  <span className="text-[9px] font-bold text-brand-secondary">I-69</span>
                </div>
                <div className="absolute -right-16 top-6">
                  <span className="text-[9px] text-brand-steel">SR 144</span>
                </div>
                <div className="absolute -top-32 -left-24">
                  <span className="text-[11px] text-brand-steel/40">N</span>
                  <svg className="w-px h-3 mx-auto mt-0.5" aria-hidden="true">
                    <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="rgba(183,199,211,0.3)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
