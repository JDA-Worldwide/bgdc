import MapSectionClient, {
  type MapSectionMapImage,
} from "./MapSectionClient";

interface Destination {
  _key?: string;
  time: string;
  label: string;
  description?: string;
}

interface MapSectionProps {
  heading?: string;
  body?: unknown[];
  destinations?: Destination[];
  mapImage?: MapSectionMapImage;
}

const defaultDestinations: Destination[] = [
  { time: "30 min.", label: "Indianapolis Int'l Airport (IND)" },
  { time: "30 min.", label: "Downtown Indianapolis" },
  { time: "60 min.", label: "Bloomington & Indiana University" },
  { time: "60 min.", label: "Camp Atterbury & Crane Naval Surface Warfare Center" },
  { time: "90 min.", label: "Purdue University (West Lafayette)" },
];

export default function MapSection({
  heading = "The Center of Indiana\u2019s Regional Corridor Network",
  body,
  destinations,
  mapImage,
}: MapSectionProps) {
  const resolvedDestinations = destinations?.length ? destinations : defaultDestinations;

  return (
    <MapSectionClient
      heading={heading}
      body={body}
      destinations={resolvedDestinations}
      mapImage={mapImage}
    />
  );
}
