"use client";

import { forwardRef } from "react";
import MapboxMap from "./index";
import type { MapMarker, MapboxMapHandle } from "./index";

interface MapboxMapClientProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

const MapboxMapClient = forwardRef<MapboxMapHandle, MapboxMapClientProps>(
  function MapboxMapClient(props, ref) {
    return <MapboxMap ref={ref} {...props} />;
  },
);

export default MapboxMapClient;
