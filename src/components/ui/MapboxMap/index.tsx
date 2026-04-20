"use client";

import type { FeatureCollection } from "geojson";
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

        m.on("load", async () => {
          // Fetch district boundary, fit map to its bounds, then add layers
          try {
            const res = await fetch(
              "https://gis.townofbargersville.org/arcgis/rest/services/PublicData/StormwaterNetwork/MapServer/8/query?where=1%3D1&outFields=*&f=geojson",
            );
            if (cancelled) return;
            const geojson = await res.json() as FeatureCollection;
            if (cancelled) return;

            m.addSource("bargersville-district", { type: "geojson", data: geojson });
            m.addLayer({
              id: "bargersville-district-fill",
              type: "fill",
              source: "bargersville-district",
              paint: { "fill-color": "#FFBF3C", "fill-opacity": 0.1 },
            });
            m.addLayer({
              id: "bargersville-district-line",
              type: "line",
              source: "bargersville-district",
              paint: { "line-color": "#FFBF3C", "line-width": 2, "line-opacity": 0.7 },
            });

            // Compute bounding box from geometry coordinates
            const bounds = new mapboxgl.default.LngLatBounds();
            const extendBounds = (coords: unknown): void => {
              if (typeof (coords as number[])[0] === "number") {
                bounds.extend(coords as [number, number]);
              } else {
                (coords as unknown[]).forEach(extendBounds);
              }
            };
            geojson.features?.forEach((f) => extendBounds((f.geometry as { coordinates: unknown }).coordinates));
            if (!bounds.isEmpty()) {
              m.fitBounds(bounds, { padding: 30, maxZoom: 14, duration: 0 });
            }
          } catch (err) {
            console.warn("Failed to load district boundary:", err);
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
                cursor: pointer;
              `;
            } else {
              el.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #FFBF3C;
                border: 2px solid rgba(255,191,60,0.5);
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

            if (marker.label) {
              markerInstancesRef.current.set(marker.label, mkr);
            }

            // if (marker.isPrimary && marker.label) {
            //   mkr.togglePopup();
            // }
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
