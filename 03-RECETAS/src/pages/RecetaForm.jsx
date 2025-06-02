import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_URL_API;

function RecetaForm({ editar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [instrucciones, setInstrucciones] = useState("");
  const [dificultad, setDificultad] = useState("media");
  const [valoracion, setValoracion] = useState(0);

  useEffect(() => {
    if (editar) {
      fetch(`${API_URL}/recetas/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitulo(data.titulo);
          setIngredientes(data.ingredientes.join(", "));
          setInstrucciones(data.instrucciones);
          setDificultad(data.dificultad);
          setValoracion(data.valoracion);
        });
    }
  }, [editar, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recetaData = {
      titulo,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      instrucciones,
      dificultad,
      valoracion: parseFloat(valoracion),
      autorId: user.id,
      colaboradores: [],
      ultimaEdicion: new Date().toISOString(),
    };

    if (editar) {
      await fetch(`${API_URL}/recetas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaData),
      });
    } else {
      await fetch(`${API_URL}/recetas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recetaData),
      });
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editar ? "Editar Receta" : "Nueva Receta"}</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Ingredientes (separados por coma)</label>
        <input
          type="text"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Instrucciones</label>
        <textarea
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
          className="border p-2 w-full"
          rows="4"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Dificultad</label>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="fácil">Fácil</option>
          <option value="media">Media</option>
          <option value="difícil">Difícil</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Valoración</label>
        <input
          type="number"
          value={valoracion}
          onChange={(e) => setValoracion(e.target.value)}
          className="border p-2 w-full"
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editar ? "Guardar Cambios" : "Crear Receta"}
      </button>
    </form>
  );
}

export default RecetaForm;
