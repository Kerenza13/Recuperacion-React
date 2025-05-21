import { createContext, useContext, useState, useEffect } from "react";

const RecetaDetalleContext = createContext();

export function RecetaDetalleProvider({ children }) {
  const [receta, setReceta] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReceta = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/recetas/${id}`);
      if (!response.ok) {
        throw new Error("Receta no encontrada");
      }
      const data = await response.json();
      setReceta(data);
    } catch (err) {
      setError(err.message);
      setReceta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecetaDetalleContext.Provider value={{ receta, error, loading, fetchReceta }}>
      {children}
    </RecetaDetalleContext.Provider>
  );
}

export function useRecetaDetalle() {
  const context = useContext(RecetaDetalleContext);
  if (!context) {
    throw new Error("useRecetaDetalle debe usarse dentro de un RecetaDetalleProvider");
  }
  return context;
}
