import SectionLabel from "./SectionLabel";
import ArrowIcon from "./ArrowIcon";

interface HeroStat {
  _key?: string;
  value: string;
  suffix?: string;
  description?: string;
}

interface LinkField {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

interface HeroSectionProps {
  sectionLabel?: string;
  heading?: string;
  accentPhrase?: string;
  description?: string;
  primaryCta?: LinkField;
  secondaryCta?: LinkField;
  stats?: HeroStat[];
}

const defaultStats: HeroStat[] = [
  {
    value: "11",
    suffix: "K+",
    description:
      "Residents & growing — one of Indiana's fastest-growing communities",
  },
  {
    value: "25",
    suffix: "mi",
    description: "From Indianapolis International Airport via I-69",
  },
  {
    value: "I",
    suffix: "-69",
    description:
      "Direct interstate access at SR 144 — prime corridor for logistics & distribution",
  },
  {
    value: "Pro",
    suffix: "+",
    description:
      "Municipal partner committed to pro-business policies & streamlined development",
  },
];

function renderHeading(heading: string, accentPhrase?: string) {
  if (!accentPhrase || !heading.includes(accentPhrase)) {
    return <span className="text-white">{heading}</span>;
  }

  const parts = heading.split(accentPhrase);
  return (
    <>
      {parts[0] && (
        <span className="text-white block">{parts[0].trim()}</span>
      )}
      <span className="text-brand-secondary block">{accentPhrase}</span>
      {parts[1]?.trim() && (
        <span className="text-white block">{parts[1].trim()}</span>
      )}
    </>
  );
}

export default function HeroSection({
  sectionLabel = "Connected & Growing",
  heading = "Grow Where Access Meets Opportunity",
  accentPhrase = "Access Meets",
  description = "Bargersville sits at the crossroads of Indiana\u2019s future \u2014 where I-69 and SR 144 converge, where Indianapolis is 25 minutes away, and where a community committed to pro-business growth is ready to welcome you.",
  primaryCta = { label: "Explore Available Land", url: "/available-land" },
  secondaryCta = { label: "Why Bargersville?", url: "/why-bargersville" },
  stats,
}: HeroSectionProps) {
  const resolvedStats = stats?.length ? stats : defaultStats;

  return (
    <section className="relative min-h-screen bg-brand-navy-dark overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, #001A40 0%, #002D5C 40%, #003D7A 70%, #002E5E 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(174deg, rgba(0,37,80,0.88) 0%, rgba(0,59,113,0.72) 38%, rgba(0,37,80,0.55) 65%, rgba(0,22,56,0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 65% 45%, rgba(118,135,30,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 30% 70%, rgba(183,199,211,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Radiating lines background — 7 desktop, 5 tablet, 3 mobile */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1905 1080"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <line x1="952" y1="0" x2="0" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="hidden lg:block" />
        <line x1="952" y1="0" x2="190" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="hidden md:block" />
        <line x1="952" y1="0" x2="570" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="952" y1="0" x2="952" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="952" y1="0" x2="1335" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="952" y1="0" x2="1620" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="hidden md:block" />
        <line x1="952" y1="0" x2="1905" y2="1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="hidden lg:block" />
      </svg>

      {/* Content */}
      <div className="relative mx-auto max-w-[var(--container-content)] px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start pt-32 lg:pt-48 pb-24">
          {/* Left */}
          <div className="max-w-xl">
            {sectionLabel && (
              <SectionLabel variant="light">{sectionLabel}</SectionLabel>
            )}

            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-[68px] font-bold leading-[1.08] tracking-tight">
              {renderHeading(heading, accentPhrase)}
            </h1>

            {description && (
              <p className="mt-8 text-[17px] leading-[1.72] text-white/70 max-w-lg font-light">
                {description}
              </p>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-6">
              {primaryCta?.url && (
                <a
                  href={primaryCta.url}
                  target={primaryCta.isExternal ? "_blank" : undefined}
                  rel={primaryCta.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2.5 rounded-[3px] bg-brand-secondary px-6 py-3.5 text-[13.5px] font-semibold uppercase tracking-[0.675px] text-brand-navy-dark transition-colors hover:bg-brand-secondary/90"
                >
                  {primaryCta.label}
                  <ArrowIcon className="size-3.5" />
                </a>
              )}
              {secondaryCta?.url && (
                <a
                  href={secondaryCta.url}
                  target={secondaryCta.isExternal ? "_blank" : undefined}
                  rel={secondaryCta.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center border-b border-white/35 pb-1 text-[13.5px] tracking-[0.54px] text-white/80 transition-colors hover:text-white hover:border-white/60"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="hidden lg:grid grid-cols-2 gap-3 w-[340px]">
            {resolvedStats.map((stat, i) => (
              <div
                key={stat._key || `stat-${i}`}
                className={`rounded-md border border-white/[0.13] bg-white/[0.07] backdrop-blur-sm px-5 py-5 ${
                  i >= 2 ? "min-h-[152px]" : "min-h-[136px]"
                }`}
              >
                <div className="flex items-baseline gap-1 font-display font-bold">
                  <span className="text-4xl leading-none text-white">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-xl text-brand-secondary">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                {stat.description && (
                  <p className="mt-4 text-[11.5px] leading-[1.4] text-white/55">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
