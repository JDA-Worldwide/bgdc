"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import SectionLabel from "./SectionLabel";
import CtaButtons from "@/components/ui/CtaButtons";
import type { CtaButtonItem } from "@/components/ui/CtaButtons";

interface Incentive {
  _key?: string;
  icon?: string;
  title: string;
  description?: string;
}

interface IncentivesSectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  ctas?: CtaButtonItem[];
  incentives?: Incentive[];
}

const iconMap: Record<string, React.ReactNode> = {
  finance: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="16" width="28" height="16" rx="2" stroke="#003B71" strokeWidth="1.5" />
      <path d="M4 22h28" stroke="#003B71" strokeWidth="1" opacity="0.3" />
      <path d="M12 4h12l4 12H8L12 4z" stroke="#003B71" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="18" cy="10" r="3" fill="#FFBF3C" />
    </svg>
  ),
  people: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="14" r="8" stroke="#003B71" strokeWidth="1.5" />
      <path d="M10 30c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="14" r="3" fill="#FFBF3C" />
    </svg>
  ),
  building: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M6 30V10l12-6 12 6v20" stroke="#003B71" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 30V20h8v10" stroke="#003B71" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="18" cy="14" r="2.5" fill="#FFBF3C" />
    </svg>
  ),
  map: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="28" height="28" rx="3" stroke="#003B71" strokeWidth="1.5" />
      <path d="M4 14h28M14 4v28" stroke="#003B71" strokeWidth="1" opacity="0.3" />
      <circle cx="22" cy="22" r="4" fill="#FFBF3C" />
      <path d="M10 10h4v4h-4z" fill="#003B71" opacity="0.15" />
    </svg>
  ),
  shield: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 3L5 10v9c0 8 5.5 15.5 13 18 7.5-2.5 13-10 13-18v-9L18 3z" stroke="#003B71" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="4" fill="#FFBF3C" />
    </svg>
  ),
  document: (
    <svg className="size-9" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="6" y="3" width="24" height="30" rx="2" stroke="#003B71" strokeWidth="1.5" />
      <path d="M12 12h12M12 18h12M12 24h8" stroke="#003B71" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="27" cy="6" r="3" fill="#FFBF3C" />
    </svg>
  ),
};

const defaultIncentives: Incentive[] = [
  {
    icon: "finance",
    title: "TIF Districts",
    description:
      "Tax increment financing available within designated growth zones to fund public infrastructure supporting new development.",
  },
  {
    icon: "people",
    title: "Business Attraction Support",
    description:
      "Direct engagement from the Economic Development Director \u2014 site selection, introductions, and project facilitation from first contact through ribbon-cutting.",
  },
  {
    icon: "building",
    title: "Development Incentives",
    description:
      "Economic development tools including abatements and other mechanisms \u2014 tailored to the project type, scale, and job creation objectives.",
  },
  {
    icon: "map",
    title: "Town Resources",
    description:
      "GIS mapping, zoning, water/sewer infrastructure data, electric transmission maps, stormwater, and tax rate information \u2014 all in one place.",
  },
];

export default function IncentivesSection({
  sectionLabel = "Doing Business Here",
  heading = "The tools to make your investment work",
  description = "Bargersville Economic Development works directly with businesses to structure the right combination of incentives, zoning support, and resources.",
  ctas,
  incentives,
}: IncentivesSectionProps) {
  const resolvedIncentives = incentives?.length ? incentives : defaultIncentives;

  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-animate-fadeinup]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  });

  return (
    <section ref={sectionRef} className="py-section">
      <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
          {/* Left intro */}
          <div data-animate-fadeinup>
            {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}

            <h2 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-brand-primary">
              {heading}
            </h2>

            {description && (
              <p className="mt-6 text-[17px] leading-[1.75] text-brand-text font-light">
                {description}
              </p>
            )}

            <CtaButtons ctas={ctas} className="mt-8" />
          </div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 border border-brand-border rounded-lg overflow-hidden bg-brand-border gap-px">
            {resolvedIncentives.map((item, i) => (
              <div
                data-animate-fadeinup
                key={item._key || `incentive-${i}`}
                className="bg-white p-6 lg:p-7"
              >
                {item.icon && iconMap[item.icon] && (
                  <div className="mb-6">{iconMap[item.icon]}</div>
                )}
                <h3 className="text-[14.5px] font-semibold leading-snug text-brand-primary">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-3 text-[13px] leading-[1.6] text-brand-muted font-light">
                    {item.description}
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
