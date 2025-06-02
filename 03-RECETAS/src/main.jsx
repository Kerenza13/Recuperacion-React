import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecetaDetalleProvider } from "./context/RecetaDetalleContext"; 
import router from "./router/index";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RecetaDetalleProvider> 
        <RouterProvider router={router} />
      </RecetaDetalleProvider>
    </AuthProvider>
  </React.StrictMode>
);
