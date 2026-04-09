import MapboxMapClient from "@/components/ui/MapboxMap/MapboxMapClient";
import { geocodeAddress, geocodeAddresses } from "@/lib/geocode";

interface Destination {
  time: string;
  label: string;
  address?: string;
}

interface MapSectionProps {
  heading?: string;
  body?: string;
  destinations?: Destination[];
  mapCenterAddress?: string;
  mapCenterLabel?: string;
}

const DEFAULT_CENTER: [number, number] = [-86.1581, 39.5534];
const DEFAULT_CENTER_LABEL = "Bargersville, IN";

const defaultDestinations: Destination[] = [
  { time: "30 min.", label: "Downtown Indianapolis Airport (IND)", address: "Indianapolis International Airport, IN" },
  { time: "30 min.", label: "Downtown Indianapolis", address: "Downtown Indianapolis, IN" },
  { time: "60 min.", label: "Bloomington & Indiana University", address: "Indiana University, Bloomington, IN" },
  { time: "60 min.", label: "Camp Atterbury & Crane Naval Surface Warfare Center", address: "Camp Atterbury, Edinburgh, IN" },
  { time: "90 min.", label: "Purdue University (West Lafayette)", address: "Purdue University, West Lafayette, IN" },
];

export default async function MapSection({
  heading = "The Center of Indiana\u2019s Regional Corridor Network",
  body = "Bargersville sits at the intersection of I-69 and SR 144 \u2014 a node purpose-built for movement. Whether your business depends on goods in motion or talent in commute, the infrastructure is already here.",
  destinations,
  mapCenterAddress,
  mapCenterLabel,
}: MapSectionProps) {
  const resolvedDestinations = destinations?.length ? destinations : defaultDestinations;

  // Geocode the primary pin
  const centerResult = mapCenterAddress
    ? await geocodeAddress(mapCenterAddress)
    : null;
  const center: [number, number] = centerResult
    ? [centerResult.lng, centerResult.lat]
    : DEFAULT_CENTER;
  const centerLabel = mapCenterLabel ?? (mapCenterAddress ?? DEFAULT_CENTER_LABEL);

  // Geocode destination markers in parallel — only for entries that have an address
  const addressedDestinations = resolvedDestinations.filter((d) => d.address);
  const geocoded = await geocodeAddresses(
    addressedDestinations.map((d) => d.address!),
    center[0],
    center[1],
  );

  const destinationMarkers = addressedDestinations
    .map((d, i) => ({ label: d.label, result: geocoded[i] }))
    .filter((entry): entry is { label: string; result: NonNullable<typeof entry.result> } =>
      entry.result !== null,
    )
    .map(({ label, result }) => ({ lng: result.lng, lat: result.lat, label }));

  return (
    <section className="py-section">
      <div className="mx-auto flex max-w-container flex-col gap-[60px] px-6 sm:px-10 lg:px-gutter">
        {/* Interactive Mapbox map */}
        <div className="relative aspect-[1320/487] w-full overflow-hidden">
          <MapboxMapClient
            center={center}
            zoom={8}
            markers={[
              { lng: center[0], lat: center[1], label: centerLabel, isPrimary: true },
              ...destinationMarkers,
            ]}
            className="absolute inset-0 h-full w-full"
          />
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
