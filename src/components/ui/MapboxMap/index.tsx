"use client";

import { useEffect, useRef } from "react";

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

/**
 * Custom Mapbox style tuned to the Bargersville brand palette:
 *   - Background: #003B71 (brand-primary / navy)
 *   - Roads: #002550 (brand-navy-dark)
 *   - Labels: #B7C7D3 (brand-sky)
 *   - Water: #002040
 *   - Highways: #FFBF3C (brand-sun / gold)
 *   - Land: #002D5A
 */
function getBrandStyle(): Record<string, unknown> {
  return {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
      "mapbox-streets": {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      },
    },
    layers: [
      // Base land fill
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#002D5A" },
      },
      // Water
      {
        id: "water",
        type: "fill",
        source: "mapbox-streets",
        "source-layer": "water",
        paint: { "fill-color": "#001E3C" },
      },
      // Parks / green areas
      {
        id: "landuse-park",
        type: "fill",
        source: "mapbox-streets",
        "source-layer": "landuse",
        filter: ["==", ["get", "class"], "park"],
        paint: { "fill-color": "#003060", "fill-opacity": 0.6 },
      },
      // Buildings
      {
        id: "building",
        type: "fill",
        source: "mapbox-streets",
        "source-layer": "building",
        paint: { "fill-color": "#002550", "fill-opacity": 0.8 },
      },
      // Minor roads
      {
        id: "road-minor",
        type: "line",
        source: "mapbox-streets",
        "source-layer": "road",
        filter: ["in", ["get", "class"], ["literal", ["street", "street_limited", "service", "track"]]],
        paint: {
          "line-color": "#003B71",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 15, 1.5],
        },
      },
      // Secondary roads
      {
        id: "road-secondary",
        type: "line",
        source: "mapbox-streets",
        "source-layer": "road",
        filter: ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]],
        paint: {
          "line-color": "#004A8F",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 14, 2.5],
        },
      },
      // Primary roads
      {
        id: "road-primary",
        type: "line",
        source: "mapbox-streets",
        "source-layer": "road",
        filter: ["==", ["get", "class"], "primary"],
        paint: {
          "line-color": "#B7C7D3",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 14, 4],
        },
      },
      // Motorways / highways — gold accent
      {
        id: "road-motorway",
        type: "line",
        source: "mapbox-streets",
        "source-layer": "road",
        filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]],
        paint: {
          "line-color": "#FFBF3C",
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 1, 14, 5],
        },
      },
      // Road labels
      {
        id: "road-label",
        type: "symbol",
        source: "mapbox-streets",
        "source-layer": "road",
        minzoom: 12,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular", "Noto Sans Regular"],
          "text-size": 10,
          "symbol-placement": "line",
        },
        paint: {
          "text-color": "#B7C7D3",
          "text-halo-color": "#001E3C",
          "text-halo-width": 1,
        },
      },
      // Place labels
      {
        id: "place-label",
        type: "symbol",
        source: "mapbox-streets",
        "source-layer": "place_label",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 8, 10, 14, 14],
        },
        paint: {
          "text-color": "#B7C7D3",
          "text-halo-color": "#001E3C",
          "text-halo-width": 1.5,
        },
      },
    ],
  };
}

export default function MapboxMap({
  center = [-86.1581, 39.5534],
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

    /** Ensure mapbox-gl.css is loaded before creating the map so the
     *  library's built-in CSS check doesn't fire a warning. */
    function ensureCSS(): Promise<void> {
      if (document.querySelector('link[href*="mapbox-gl"]')) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css";
        link.onload = () => resolve();
        link.onerror = () => resolve(); // proceed even if CDN fails
        document.head.appendChild(link);
      });
    }

    /** Verify the token is accepted before handing it to mapbox-gl,
     *  which would spam console.error on every retry. */
    async function validateToken(): Promise<boolean> {
      try {
        const res = await fetch(
          `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8.json?secure&access_token=${token}`,
        );
        return res.ok;
      } catch {
        return false;
      }
    }

    Promise.all([import("mapbox-gl"), ensureCSS(), validateToken()]).then(
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
          style: getBrandStyle() as mapboxgl.default.StyleSpecification,
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
