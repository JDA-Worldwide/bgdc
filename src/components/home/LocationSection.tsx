import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
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

interface SanityMapCenter {
  lng?: number;
  lat?: number;
}

interface LocationSectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  reachItems?: ReachItem[];
  extraLine?: string;
  ctaButton?: LinkField;
  mapCenter?: [number, number] | SanityMapCenter;
  mapZoom?: number;
}

const defaultReachItems: ReachItem[] = [
  { time: "25 min", place: "Indianapolis International Airport (IND)" },
  { time: "25 min", place: "Downtown Indianapolis" },
  { time: "60 min", place: "Bloomington & Indiana University" },
  { time: "60 min", place: "Camp Atterbury & Crane Naval Surface Warfare Center" },
  { time: "90 min", place: "Purdue University (West Lafayette)" },
];

// Bargersville, IN coordinates
const BARGERSVILLE_LNG = -86.1581;
const BARGERSVILLE_LAT = 39.5534;

const DEFAULT_MARKERS = [
  { lng: BARGERSVILLE_LNG, lat: BARGERSVILLE_LAT, label: "Bargersville", isPrimary: true },
  { lng: -86.2944, lat: 39.7684, label: "Indianapolis" },
  { lng: -86.1336, lat: 39.7684, label: "Indianapolis Int'l Airport (IND)" },
];

export default function LocationSection({
  sectionLabel = "Access & Infrastructure",
  heading = "The center of Indiana\u2019s regional corridor network",
  description = "Bargersville sits at the intersection of I-69 and SR 144 \u2014 a node purpose-built for movement. Whether your business depends on goods in motion or talent in commute, the infrastructure is already here.",
  reachItems,
  extraLine = "Active rail line with freight access",
  ctaButton = { label: "View Available Parcels", url: "/available-land" },
  mapCenter,
  mapZoom = 9,
}: LocationSectionProps) {
  const resolvedReach = reachItems?.length ? reachItems : defaultReachItems;

  const resolvedCenter: [number, number] = Array.isArray(mapCenter)
    ? mapCenter
    : mapCenter?.lng != null && mapCenter?.lat != null
      ? [mapCenter.lng, mapCenter.lat]
      : [BARGERSVILLE_LNG, BARGERSVILLE_LAT];

  return (
    <section className="relative bg-brand-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(192,202,128,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 20% 20%, rgba(183,199,211,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 py-section sm:px-10 lg:px-gutter">
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

          {/* Right — Mapbox interactive map */}
          <div className="rounded-lg border border-white/12 overflow-hidden min-h-[376px]">
            <MapboxMapClient
              center={resolvedCenter}
              zoom={mapZoom}
              markers={DEFAULT_MARKERS}
              className="w-full h-full min-h-[376px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
