"use client";

import MapboxMap from "./index";
import type { MapMarker } from "./index";

interface MapboxMapClientProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function MapboxMapClient(props: MapboxMapClientProps) {
  return <MapboxMap {...props} />;
}
