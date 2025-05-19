import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CitaProvider } from "./context/CitaContext";
import { AuthProvider } from "./context/AuthContext";
import { HorarioProvider } from "./context/HorarioContext";
import App from "./App.jsx";

// Render the root of the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CitaProvider>
        <HorarioProvider>
          <App />
        </HorarioProvider>
      </CitaProvider>
    </AuthProvider>
  </StrictMode>
);
