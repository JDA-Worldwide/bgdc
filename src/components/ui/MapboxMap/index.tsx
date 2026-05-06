"use client";

import type { Feature } from "geojson";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { BRAND_MAP_STYLE, ensureMapboxCSS, validateMapboxToken } from "@/lib/mapbox";

export interface MapMarker {
  lng: number;
  lat: number;
  label?: string;
  isPrimary?: boolean;
}

export interface MapboxMapHandle {
  flyTo: (lng: number, lat: number, label: string) => void;
}

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

const MapboxMap = forwardRef<MapboxMapHandle, MapboxMapProps>(function MapboxMap({
  center = [-86.164665, 39.521121],
  zoom = 10,
  markers = [],
  className = "",
}, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markerInstancesRef = useRef<Map<string, unknown>>(new Map());

  useImperativeHandle(ref, () => ({
    flyTo(lng: number, lat: number, label: string) {
      const m = mapRef.current as { flyTo: (opts: unknown) => void } | null;
      if (!m) return;
      m.flyTo({ center: [lng, lat], zoom: 10, duration: 800 });
      const mkr = markerInstancesRef.current.get(label) as
        | { getPopup: () => { isOpen: () => boolean } | null; togglePopup: () => void }
        | undefined;
      if (mkr) {
        const popup = mkr.getPopup();
        if (popup && !popup.isOpen()) mkr.togglePopup();
      }
    },
  }));

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current || mapRef.current) return;

    let map: unknown;
    let cancelled = false;

    Promise.all([import("mapbox-gl"), ensureMapboxCSS(), validateMapboxToken(token)]).then(
      ([mapboxgl, , tokenValid]) => {
        if (cancelled || !containerRef.current) return;

        if (!tokenValid) {
          console.warn(
            "Mapbox token is invalid or expired — map will not load. " +
              "Update NEXT_PUBLIC_MAPBOX_TOKEN environment variable.",
          );
          return;
        }

        mapboxgl.default.accessToken = token;

        const m = new mapboxgl.default.Map({
          container: containerRef.current,
          style: BRAND_MAP_STYLE,
          center,
          zoom,
          attributionControl: false,
          logoPosition: "bottom-right",
          interactive: false,
        });

        m.addControl(
          new mapboxgl.default.AttributionControl({ compact: true }),
          "bottom-left",
        );

        m.on("load", async () => {
          // Fit map to all marker positions
          const markerBounds = new mapboxgl.default.LngLatBounds();
          markers.forEach((mk) => markerBounds.extend([mk.lng, mk.lat]));
          if (!markerBounds.isEmpty()) {
            m.fitBounds(markerBounds, { padding: 80, maxZoom: 10, duration: 0 });
          }

          markers.forEach((marker) => {
            const el = document.createElement("div");
            el.className = "mapbox-marker";
            el.setAttribute("role", "img");
            el.setAttribute(
              "aria-label",
              marker.label
                ? `Map marker: ${marker.label}`
                : marker.isPrimary
                  ? "Primary location marker"
                  : "Location marker",
            );

            if (marker.isPrimary) {
              el.style.cssText = `
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #FFBF3C;
                border: 3px solid #FFBF3C;
                box-shadow: 0 0 0 4px rgba(255,191,60,0.25), 0 2px 8px rgba(0,0,0,0.4);
              `;
            } else {
              el.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #FFBF3C;
                border: 2px solid rgba(255,191,60,0.5);
                box-shadow: 0 1px 4px rgba(0,0,0,0.3);
              `;
            }

            const mkr = new mapboxgl.default.Marker({ element: el }).setLngLat([
              marker.lng,
              marker.lat,
            ]);

            mkr.addTo(m);

            if (marker.label) {
              markerInstancesRef.current.set(marker.label, mkr);
            }
          });

          // Build a stretchable rounded-rectangle image for label backgrounds.
          // Using a 9-patch canvas so Mapbox stretches only the middle strip,
          // preserving crisp rounded corners at any label width.
          const bSize = 40;
          const bRadius = 10;
          const bubbleCanvas = document.createElement("canvas");
          bubbleCanvas.width = bSize;
          bubbleCanvas.height = bSize;
          const bCtx = bubbleCanvas.getContext("2d")!;
          bCtx.fillStyle = "#FFFFFF";
          bCtx.beginPath();
          bCtx.moveTo(bRadius, 0);
          bCtx.lineTo(bSize - bRadius, 0);
          bCtx.arcTo(bSize, 0, bSize, bRadius, bRadius);
          bCtx.lineTo(bSize, bSize - bRadius);
          bCtx.arcTo(bSize, bSize, bSize - bRadius, bSize, bRadius);
          bCtx.lineTo(bRadius, bSize);
          bCtx.arcTo(0, bSize, 0, bSize - bRadius, bRadius);
          bCtx.lineTo(0, bRadius);
          bCtx.arcTo(0, 0, bRadius, 0, bRadius);
          bCtx.closePath();
          bCtx.fill();

          m.addImage(
            "label-bubble",
            bCtx.getImageData(0, 0, bSize, bSize),
            {
              pixelRatio: 2,
              stretchX: [[bRadius, bSize - bRadius]],
              stretchY: [[bRadius, bSize - bRadius]],
              content: [bRadius, bRadius, bSize - bRadius, bSize - bRadius],
            },
          );

          // Symbol layer for labels — Mapbox handles collision detection natively
          const labelFeatures: Feature[] = markers
            .filter((mk) => mk.label)
            .map((mk) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [mk.lng, mk.lat] },
              properties: { label: mk.label ?? "" },
            }));

          m.addSource("marker-labels", {
            type: "geojson",
            data: { type: "FeatureCollection", features: labelFeatures },
          });

          m.addLayer({
            id: "marker-labels",
            type: "symbol",
            source: "marker-labels",
            layout: {
              "icon-image": "label-bubble",
              "icon-text-fit": "both",
              "icon-text-fit-padding": [5, 10, 5, 10],
              "text-field": ["get", "label"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Regular"],
              "text-size": 12,
              "text-variable-anchor": ["bottom", "top", "left", "right", "bottom-left", "bottom-right", "top-left", "top-right"],
              "text-radial-offset": 1.0,
              "text-justify": "auto",
              "text-max-width": 10,
              "text-allow-overlap": false,
            },
            paint: {
              "text-color": "#003B71",
            },
          });
        });

        map = m;
        mapRef.current = m;
      },
    ).catch((err) => {
      console.warn("Mapbox GL failed to load:", err);
    });

    return () => {
      cancelled = true;
      if (map && typeof (map as { remove: () => void }).remove === "function") {
        (map as { remove: () => void }).remove();
      }
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="Interactive map showing Bargersville location"
      role="img"
    />
  );
});

export default MapboxMap;
