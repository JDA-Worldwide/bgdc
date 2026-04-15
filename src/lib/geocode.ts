/**
 * Server-side geocoding via Mapbox Geocoding API v5.
 * Only call this from server components or server actions — never from client code.
 */

import { stegaClean } from "@sanity/client/stega";

interface GeocodeResult {
  lng: number;
  lat: number;
}

/**
 * Geocode a free-text location string to [lng, lat].
 * Returns null if the query fails or returns no results.
 */
export async function geocodeAddress(
  address: string,
  proximityLng = -86.164665,
  proximityLat = 39.521121,
): Promise<GeocodeResult | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) {
    console.warn("[geocode] NEXT_PUBLIC_MAPBOX_TOKEN is not set");
    return null;
  }

  const cleanAddress = stegaClean(address);

  const params = new URLSearchParams({
    limit: "1",
    proximity: `${proximityLng},${proximityLat}`,
    country: "US",
  });

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cleanAddress)}.json?${params}&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }); // cache for 24 h
    if (!res.ok) {
      console.warn(`[geocode] Request failed for "${cleanAddress}": ${res.status}`);
      return null;
    }
    const data = await res.json();
    const feature = data?.features?.[0];
    if (!feature) {
      console.warn(`[geocode] No results for "${cleanAddress}"`);
      return null;
    }
    const [lng, lat] = feature.center as [number, number];
    return { lng, lat };
  } catch (err) {
    console.error(`[geocode] Error geocoding "${cleanAddress}":`, err);
    return null;
  }
}

/**
 * Geocode multiple addresses in parallel.
 * Entries that fail to resolve are returned as null.
 */
export async function geocodeAddresses(
  addresses: string[],
  proximityLng?: number,
  proximityLat?: number,
): Promise<(GeocodeResult | null)[]> {
  return Promise.all(
    addresses.map((a) => geocodeAddress(a, proximityLng, proximityLat)),
  );
}
