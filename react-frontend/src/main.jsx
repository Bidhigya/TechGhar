import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminAuthProvider } from "./components/context/AdminAuth.jsx";
import App from "./App.jsx";
import { CartProvider } from "./components/context/Cart.jsx";
import { AuthProvider } from "./components/context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
