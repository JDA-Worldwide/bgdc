const MAPBOX_CSS_URL =
  "https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css";

let cssPromise: Promise<void> | null = null;

/** Load the Mapbox GL CSS stylesheet once, deduped across callers. */
export function ensureMapboxCSS(): Promise<void> {
  if (document.querySelector(`link[href="${MAPBOX_CSS_URL}"]`)) {
    return Promise.resolve();
  }

  if (!cssPromise) {
    cssPromise = new Promise((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = MAPBOX_CSS_URL;
      link.onload = () => resolve();
      link.onerror = () => resolve(); // proceed even if CDN fails
      document.head.appendChild(link);
    });
  }

  return cssPromise;
}

/** Mapbox Studio style URL for the Bargersville brand map. */
export const BRAND_MAP_STYLE = "mapbox://styles/prolific/cmo2rdliz00ay01pc1w7t6rat";

/** Verify a Mapbox token is accepted before handing it to mapbox-gl. */
export async function validateMapboxToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8.json?secure&access_token=${token}`,
    );
    return res.ok;
  } catch {
    return false;
  }
}
