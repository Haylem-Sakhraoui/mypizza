// ─── Restaurant constants ─────────────────────────────────────────────────────

export const RESTAURANT = {
  lat: 50.98135,
  lng: 11.03282,
  address: "Schmidtstedter Straße 28, 99084 Erfurt",
} as const;

export const FREE_DELIVERY_KM = 3.0;
export const FEE_PER_500M = 1.5;

// ─── Haversine distance (km) ──────────────────────────────────────────────────

export function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// ─── Delivery fee ─────────────────────────────────────────────────────────────

export function calculateDeliveryFee(distanceKm: number): number {
  if (distanceKm <= FREE_DELIVERY_KM) return 0;
  const extraMeters = (distanceKm - FREE_DELIVERY_KM) * 1000;
  return Math.ceil(extraMeters / 500) * FEE_PER_500M;
}

// ─── Geocoding via Nominatim ──────────────────────────────────────────────────

export interface GeocoderResult {
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Geocode a customer delivery address using the free Nominatim API.
 * Returns null when the address cannot be resolved.
 * Rate-limit: Nominatim allows 1 req/s — debounce before calling.
 */
export async function geocodeAddress(
  street: string,
  plz: string,
  city: string
): Promise<GeocoderResult | null> {
  const query = encodeURIComponent(`${street}, ${plz} ${city}, Germany`);
  const url =
    `https://nominatim.openstreetmap.org/search?q=${query}` +
    `&format=json&limit=1&countrycodes=de`;

  const res = await fetch(url, {
    headers: {
      // Nominatim requires a meaningful User-Agent
      "User-Agent": "MyPizzaDeliveryApp/1.0 (contact@mypizza.de)",
      "Accept-Language": "de",
    },
  });

  if (!res.ok) return null;

  const data: Array<{ lat: string; lon: string; display_name: string }> =
    await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
}
