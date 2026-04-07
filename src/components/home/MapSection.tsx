import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface Destination {
  time: string;
  label: string;
}

interface MapSectionProps {
  heading?: string;
  body?: string;
  mapImage?: SanityImageSource;
  destinations?: Destination[];
}

const defaultDestinations: Destination[] = [
  { time: "30 min.", label: "Downtown Indianapolis Airport (IND)" },
  { time: "30 min.", label: "Downtown Indianapolis" },
  { time: "60 min.", label: "Bloomington & Indiana University" },
  { time: "60 min.", label: "Camp Atterbury & Crane Naval Surface Warfare Center" },
  { time: "90 min.", label: "Purdue University (West Lafayette)" },
];

export default function MapSection({
  heading = "The Center of Indiana\u2019s Regional Corridor Network",
  body = "Bargersville sits at the intersection of I-69 and SR 144 \u2014 a node purpose-built for movement. Whether your business depends on goods in motion or talent in commute, the infrastructure is already here.",
  mapImage,
  destinations,
}: MapSectionProps) {
  const resolvedDestinations = destinations?.length ? destinations : defaultDestinations;

  return (
    <section className="px-6 py-section sm:px-gutter">
      <div className="flex flex-col gap-[60px]">
        {/* Map image */}
        <div className="relative aspect-[1320/487] w-full overflow-hidden bg-brand-limestone">
          {mapImage?.asset ? (
            <SanityImage
              image={mapImage}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[60px]">
          <div className="flex flex-1 flex-col gap-[25px] text-brand-charcoal">
            {heading && (
              <h2 className="text-2xl font-medium leading-[35px] md:text-[28px]">
                {heading}
              </h2>
            )}
            {body && <p className="text-base leading-7">{body}</p>}
          </div>

          <div className="flex flex-1 flex-col gap-[23px]">
            {resolvedDestinations.map((dest) => (
              <div key={dest.label} className="flex items-start gap-4 sm:items-center sm:gap-5">
                <div className="mt-2.5 h-[5px] w-[23px] flex-shrink-0 bg-brand-sun sm:mt-0" />
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <p className="text-base font-semibold leading-[27px] text-brand-charcoal">
                    {dest.time}
                  </p>
                  <p className="text-sm leading-6 text-brand-charcoal sm:text-base sm:leading-7">
                    {dest.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
