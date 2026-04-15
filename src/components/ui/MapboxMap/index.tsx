"use client";

import { useEffect, useRef } from "react";
import { BRAND_MAP_STYLE, ensureMapboxCSS, validateMapboxToken } from "@/lib/mapbox";

export interface MapMarker {
  lng: number;
  lat: number;
  label?: string;
  isPrimary?: boolean;
}

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function MapboxMap({
  center = [-86.164665, 39.521121],
  zoom = 10,
  markers = [],
  className = "",
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

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
              "Update NEXT_PUBLIC_MAPBOX_TOKEN in .env.local.",
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
          scrollZoom: false,
        });

        m.addControl(
          new mapboxgl.default.AttributionControl({ compact: true }),
          "bottom-left",
        );

        m.addControl(
          new mapboxgl.default.NavigationControl({ showCompass: false }),
          "top-right",
        );

        m.on("load", () => {
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
                cursor: pointer;
              `;
            } else {
              el.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #B7C7D3;
                border: 2px solid rgba(183,199,211,0.5);
                box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                cursor: pointer;
              `;
            }

            const mkr = new mapboxgl.default.Marker({ element: el }).setLngLat([
              marker.lng,
              marker.lat,
            ]);

            if (marker.label) {
              mkr.setPopup(
                new mapboxgl.default.Popup({
                  offset: 16,
                  closeButton: false,
                  className: "mapbox-brand-popup",
                }).setHTML(
                  `<span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:600;color:#003B71;">${marker.label}</span>`,
                ),
              );
            }

            mkr.addTo(m);
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
}
