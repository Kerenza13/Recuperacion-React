import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CitaProvider } from "./context/CitaContext";
import { AuthProvider } from "./context/AuthContext";
import { HorarioProvider } from "./context/HorarioContext";
import { ServiceProvider } from "./context/ServiceContext"; // Import the ServiceProvider
import App from "./App.jsx";

// Render the root of the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CitaProvider>
        <HorarioProvider>
          <ServiceProvider> {/* Wrap with ServiceProvider */}
            <App />
          </ServiceProvider>
        </HorarioProvider>
      </CitaProvider>
    </AuthProvider>
  </StrictMode>
);
