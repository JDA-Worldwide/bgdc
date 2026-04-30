import MapSectionClient from "./MapSectionClient";
import { geocodeAddress, geocodeAddresses } from "@/lib/geocode";

interface Destination {
  time: string;
  label: string;
  address?: string;
  showOnMap?: boolean;
  description?: string;
}

interface MapSectionProps {
  heading?: string;
  body?: unknown[];
  destinations?: Destination[];
  mapCenterAddress?: string;
  mapCenterLabel?: string;
  zoom?: number;
}

const DEFAULT_CENTER: [number, number] = [-86.164665, 39.521121];
const DEFAULT_CENTER_LABEL = "Bargersville, IN";

const defaultDestinations: Destination[] = [
  { time: "30 min.", label: "Indianapolis Int'l Airport (IND)", address: "Indianapolis International Airport, IN" },
  { time: "30 min.", label: "Downtown Indianapolis", address: "Downtown Indianapolis, IN" },
  { time: "60 min.", label: "Bloomington & Indiana University", address: "Indiana University, Bloomington, IN" },
  { time: "60 min.", label: "Camp Atterbury & Crane Naval Surface Warfare Center", address: "Camp Atterbury, Edinburgh, IN" },
  { time: "90 min.", label: "Purdue University (West Lafayette)", address: "Purdue University, West Lafayette, IN" },
];

export default async function MapSection({
  heading = "The Center of Indiana\u2019s Regional Corridor Network",
  body,
  destinations,
  mapCenterAddress,
  mapCenterLabel,
  zoom = 9,
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

  // Geocode destination markers in parallel — only for entries with an address and showOnMap !== false
  const addressedDestinations = resolvedDestinations.filter(
    (d) => d.address && d.showOnMap !== false,
  );
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

  const allMarkers = [
    { lng: center[0], lat: center[1], label: centerLabel, isPrimary: true },
    ...destinationMarkers,
  ];

  return (
    <MapSectionClient
      heading={heading}
      body={body}
      destinations={resolvedDestinations}
      center={center}
      zoom={zoom}
      markers={allMarkers}
    />
  );
}
