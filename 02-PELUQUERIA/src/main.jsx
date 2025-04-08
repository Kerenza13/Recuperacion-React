import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CitaProvider } from "./context/CitaContext"; 
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CitaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CitaProvider>
  </StrictMode>
);
