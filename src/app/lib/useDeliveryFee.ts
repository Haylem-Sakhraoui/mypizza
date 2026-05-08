import { useState, useEffect, useRef } from "react";
import {
  geocodeAddress,
  haversineKm,
  calculateDeliveryFee,
  RESTAURANT,
  type GeocoderResult,
} from "./delivery";
import type { DeliveryAddress } from "./supabase";

export interface DeliveryFeeResult {
  distanceKm: number | null;
  fee: number;
  loading: boolean;
  error: string | null;
  coords: Pick<GeocoderResult, "lat" | "lng"> | null;
}

const DEBOUNCE_MS = 900; // Nominatim: respect 1 req/s

/**
 * Given a delivery address, geocodes it (debounced) and returns:
 *  - distanceKm   — km from restaurant to customer
 *  - fee          — delivery surcharge in €
 *  - loading      — geocoding in progress
 *  - error        — user-friendly error string
 *  - coords       — customer lat/lng (stored with the order)
 *
 * Returns fee=0 / distanceKm=null while the address is incomplete.
 */
export function useDeliveryFee(address: DeliveryAddress | null): DeliveryFeeResult {
  const [result, setResult] = useState<DeliveryFeeResult>({
    distanceKm: null,
    fee: 0,
    loading: false,
    error: null,
    coords: null,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    // Need at least street + plz to geocode meaningfully
    if (!address || !address.street.trim() || !address.plz.trim()) {
      setResult({ distanceKm: null, fee: 0, loading: false, error: null, coords: null });
      return;
    }

    const key = `${address.street}|${address.plz}|${address.city}`.toLowerCase();
    if (key === lastKeyRef.current) return; // no change

    // Debounce
    if (timerRef.current) clearTimeout(timerRef.current);
    setResult((prev) => ({ ...prev, loading: true, error: null }));

    timerRef.current = setTimeout(async () => {
      lastKeyRef.current = key;
      try {
        const geo = await geocodeAddress(address.street, address.plz, address.city);
        if (!geo) {
          setResult({ distanceKm: null, fee: 0, loading: false, error: "Adresse nicht gefunden. Bitte prüfen Sie Ihre Eingabe.", coords: null });
          return;
        }
        const distKm = haversineKm(RESTAURANT.lat, RESTAURANT.lng, geo.lat, geo.lng);
        const fee = calculateDeliveryFee(distKm);
        setResult({
          distanceKm: Math.round(distKm * 10) / 10,
          fee,
          loading: false,
          error: null,
          coords: { lat: geo.lat, lng: geo.lng },
        });
      } catch {
        setResult({ distanceKm: null, fee: 0, loading: false, error: "Geocodierung fehlgeschlagen. Bitte erneut versuchen.", coords: null });
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [address?.street, address?.plz, address?.city]);

  return result;
}
