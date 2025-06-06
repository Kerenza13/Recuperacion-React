import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_URL_API;

function Favoritas() {
  const { user } = useAuth();
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}recetas`)
        .then((res) => res.json())
        .then((data) =>
          setFavoritas(data.filter((receta) => user.favoritas.includes(receta.id)))
        )
        .catch((err) => console.error("Error loading favorites:", err));
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">⭐ Mis Recetas Favoritas</h1>
      {favoritas.length > 0 ? (
        <ul>
          {favoritas.map((receta) => (
            <li key={receta.id} className="mb-2">
              <h2 className="font-bold">{receta.titulo}</h2>
              <p>Dificultad: {receta.dificultad}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes recetas favoritas.</p>
      )}
    </div>
  );
}

export default Favoritas;
