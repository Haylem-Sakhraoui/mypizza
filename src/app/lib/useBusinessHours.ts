import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface StoreSettings {
  mode: "force_closed" | "force_open" | "automatic";
  reason: string | null;
}

export interface StoreStatus {
  open: boolean;
  reason: string | null;
  settings: StoreSettings | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Business hours: 18:00–04:00 (crosses midnight) */
function isOpenByTime(): boolean {
  const h = new Date().getHours();
  return h >= 18 || h < 4;
}

function deriveStatus(settings: StoreSettings): StoreStatus {
  if (settings.mode === "force_open")   return { open: true,  reason: null,            settings };
  if (settings.mode === "force_closed") return { open: false, reason: settings.reason, settings };
  // automatic
  const open = isOpenByTime();
  return {
    open,
    reason: open ? null : (settings.reason ?? "Wir haben momentan geschlossen. Bestellungen ab 18:00 Uhr."),
    settings,
  };
}

/** One-shot fetch of store_settings row — safe to call anywhere */
export async function fetchStoreSettings(): Promise<StoreSettings | null> {
  const { data, error } = await supabase
    .from("store_settings")
    .select("mode, reason")
    .eq("id", 1)
    .single();
  if (error || !data) return null;
  return data as StoreSettings;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

/**
 * Subscribes to store_settings in real-time.
 * - Optimistic initial state: time-based (no flicker while Supabase loads)
 * - Replaces state once Supabase responds
 * - Listens for live admin overrides via Postgres realtime
 * - Re-evaluates automatic mode every 60 s
 */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState<StoreStatus>(() => ({
    open: isOpenByTime(),
    reason: isOpenByTime() ? null : "Wir haben momentan geschlossen. Bestellungen ab 18:00 Uhr.",
    settings: null,
  }));
  useEffect(() => {
    let cancelled = false;

    // 1. Initial fetch
    fetchStoreSettings().then((s) => {
      if (!cancelled && s) setStatus(deriveStatus(s));
    });

    // 2. Realtime subscription — unique channel name per instance to avoid conflicts
    const channelName = `store_settings_changes_${Math.random().toString(36).slice(2)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "store_settings", filter: "id=eq.1" },
        (payload) => {
          const s = payload.new as StoreSettings;
          setStatus(deriveStatus(s));
        }
      )
      .subscribe();

    // 3. Clock tick — re-evaluate automatic mode every 60 s
    const tick = setInterval(() => {
      setStatus((prev) => {
        if (!prev.settings) return { ...prev, open: isOpenByTime() };
        return deriveStatus(prev.settings);
      });
    }, 60_000);

    return () => {
      cancelled = true;
      clearInterval(tick);
      supabase.removeChannel(channel);
    };
  }, []);

  return status;
}

