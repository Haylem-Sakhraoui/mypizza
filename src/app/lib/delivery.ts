// ─── Restaurant constants ─────────────────────────────────────────────────────

export const RESTAURANT = {
  lat: 50.98135,
  lng: 11.03282,
  address: "Schmidtstedter Straße 28, 99084 Erfurt",
} as const;

export const MAX_DELIVERY_KM = 7.0; // delivery not available beyond this distance

// ─── Distance-based delivery tiers ───────────────────────────────────────────
// Each tier applies when distanceKm <= maxKm.
// fee        — surcharge added to order total
// minOrder   — minimum cart total (after discount) required for delivery
export const DELIVERY_TIERS = [
  { maxKm: 2,   fee: 0.00, minOrder: 15 },
  { maxKm: 3,   fee: 1.50, minOrder: 20 },
  { maxKm: 4,   fee: 2.00, minOrder: 20 },
  { maxKm: 5,   fee: 2.50, minOrder: 20 },
  { maxKm: 6,   fee: 3.00, minOrder: 30 },
  { maxKm: 7,   fee: 3.50, minOrder: 30 },
] as const;

/** Delivery fee in € for a given distance. Returns 0 if no tier matches (too far handled separately). */
export function calculateDeliveryFee(distanceKm: number): number {
  const tier = DELIVERY_TIERS.find((t) => distanceKm <= t.maxKm);
  return tier ? tier.fee : 0;
}

/** Minimum cart total required for delivery at a given distance. */
export function getMinOrderAmount(distanceKm: number): number {
  const tier = DELIVERY_TIERS.find((t) => distanceKm <= t.maxKm);
  return tier ? tier.minOrder : 0;
}

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
