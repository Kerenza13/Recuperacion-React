import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_URL_API;

function Home() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/recetas`)
      .then((res) => res.json())
      .then(setRecetas);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Recetas Públicas</h1>
      <div className="grid grid-cols-3 gap-4">
        {recetas.map((receta) => (
          <Link
            to={`/recetas/${receta.id}`}
            key={receta.id}
            className="p-4 border rounded"
          >
            <h2>{receta.titulo}</h2>
            <p>{receta.dificultad}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
