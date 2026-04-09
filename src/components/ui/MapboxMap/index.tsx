"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
const BRAND_STYLE: mapboxgl.StyleSpecification = {
  version: 8,
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}",
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
        "text-font": ["DIN Offc Pro Regular", "Arial Unicode MS Regular"],
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
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
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

export default function MapboxMap({
  center = [-86.1581, 39.5534],
  zoom = 10,
  markers = [],
  className = "",
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: BRAND_STYLE,
      center,
      zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.on("load", () => {
      markers.forEach((marker) => {
        const el = document.createElement("div");
        el.className = "mapbox-marker";

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

        const m = new mapboxgl.Marker({ element: el })
          .setLngLat([marker.lng, marker.lat]);

        if (marker.label) {
          m.setPopup(
            new mapboxgl.Popup({
              offset: 16,
              closeButton: false,
              className: "mapbox-brand-popup",
            }).setHTML(
              `<span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:600;color:#003B71;">${marker.label}</span>`
            )
          );
        }

        m.addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
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
