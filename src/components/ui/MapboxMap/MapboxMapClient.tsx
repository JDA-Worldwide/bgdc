"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "./index";

const MapboxMap = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[376px] animate-pulse bg-white/4 rounded-lg" />
  ),
});

interface MapboxMapClientProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function MapboxMapClient(props: MapboxMapClientProps) {
  return <MapboxMap {...props} />;
}
