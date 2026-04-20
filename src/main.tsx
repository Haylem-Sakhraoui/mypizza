
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "./app/context/CartContext";
import App from "./app/App.tsx";
import "./styles/index.css";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

if (!paypalClientId) {
  console.warn(
    "[PayPal] VITE_PAYPAL_CLIENT_ID is not set. " +
      "Add it to your .env file. Using sandbox 'test' as fallback — do NOT deploy this."
  );
}

// The PayPal environment (sandbox vs production) is determined entirely by
// which client-id you supply — there is no separate "mode" flag in the SDK.
// • Sandbox client-id  → redirects to sandbox.paypal.com  (test accounts)
// • Live client-id     → redirects to paypal.com          (real accounts, simple login flow)
createRoot(document.getElementById("root")!).render(
  <PayPalScriptProvider
    options={{
      clientId: paypalClientId ?? "test",
      currency: "EUR",
      intent: "capture",
    }}
  >
    <CartProvider>
      <App />
    </CartProvider>
  </PayPalScriptProvider>
);
  