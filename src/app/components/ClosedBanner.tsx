import { Clock } from "lucide-react";

interface ClosedBannerProps {
  reason?: string | null;
}

export function ClosedBanner({ reason }: ClosedBannerProps) {
  const message = reason?.trim() || "Wir haben momentan geschlossen. Bestellungen ab 18:00 Uhr.";

  return (
    <div
      className="w-full flex items-center justify-center gap-3 py-3 px-4 text-center"
      style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #2d2d2d" }}
      role="status"
      aria-live="polite"
    >
      <Clock size={15} className="shrink-0" style={{ color: "#ec6408" }} />
      <p className="text-sm font-medium" style={{ color: "#d1d5db" }}>
        {message}{" "}
        <span style={{ color: "#9ca3af" }}>Wir freuen uns, Ihnen bald zu dienen.</span>
      </p>
    </div>
  );
}

