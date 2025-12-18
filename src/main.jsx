import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import router from "./routes/router";

// ✅ GLOBAL CSS
import "./index.css";

import AuthProvider from "./contexts/AuthContext/AuthProvider";
import ThemeProvider from "./contexts/ThemeContext/ThemeContext";

// ✅ STRIPE PUBLIC KEY
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>

          {/* ✅ STRIPE PROVIDER (SAFE) */}
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>

        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
