import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_URL_API;

function Home() {
  const { user } = useAuth();
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}recetas`)
      .then((res) => res.json())
      .then(setRecetas)
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  const toggleFavorito = async (recetaId) => {
    if (!user) return;
    const isFavorite = user.favoritas.includes(recetaId);

    const updatedFavorites = isFavorite
      ? user.favoritas.filter((id) => id !== recetaId)
      : [...user.favoritas, recetaId];

    // Update user favorites
    await fetch(`${API_URL}usuarios/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favoritas: updatedFavorites }),
    });

    // Update frontend state
    user.favoritas = updatedFavorites;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🧑🍳 Recetas Públicas</h1>
      <div className="grid grid-cols-3 gap-4">
        {recetas.map((receta) => (
          <div key={receta.id} className="p-4 border rounded">
            <h2 className="font-bold">{receta.titulo}</h2>
            <p>Dificultad: {receta.dificultad}</p>
            {user && (
              <button
                onClick={() => toggleFavorito(receta.id)}
                className="mt-2 px-2 py-1 bg-yellow-500 text-white rounded"
              >
                {user.favoritas.includes(receta.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
              </button>
            )}
            <Link to={`/recetas/${receta.id}`} className="mt-2 block text-blue-500">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
