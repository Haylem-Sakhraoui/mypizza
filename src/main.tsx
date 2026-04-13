
  import { createRoot } from "react-dom/client";
  import { PayPalScriptProvider } from "@paypal/react-paypal-js";
  import { CartProvider } from "./app/context/CartContext";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
        currency: "EUR",
        intent: "capture",
      }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </PayPalScriptProvider>
  );
  