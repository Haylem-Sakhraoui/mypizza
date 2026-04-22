import type { ReactNode } from "react";
import { Lock } from "lucide-react";

interface StoreGateProps {
  open: boolean;
  reason?: string | null;
  children: ReactNode;
}

/**
 * Wraps ordering UI. When `open` is false, overlays a transparent mask that
 * blocks all pointer interaction with the children.
 */
export function StoreGate({ open, reason, children }: StoreGateProps) {
  return (
    <div className="relative">
      {children}
      {!open && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(2px)",
            cursor: "not-allowed",
            pointerEvents: "all",
          }}
          aria-label="Bestellungen momentan nicht möglich"
        >
          <Lock size={18} style={{ color: "#ec6408" }} />
          {reason && (
            <p className="text-xs font-medium text-center px-3 max-w-[180px] leading-snug" style={{ color: "#f3f4f6" }}>
              {reason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
