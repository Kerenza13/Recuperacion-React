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
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorInput, setColaboradorInput] = useState("");

  useEffect(() => {
    if (editar) {
      fetch(`${API_URL}recetas/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitulo(data.titulo);
          setIngredientes(data.ingredientes.join(", "));
          setInstrucciones(data.instrucciones);
          setDificultad(data.dificultad);
          setValoracion(data.valoracion);
          setColaboradores(data.colaboradores || []);
        });
    }
  }, [editar, id]);

  const handleAddColaborador = () => {
    if (colaboradorInput && !colaboradores.includes(colaboradorInput)) {
      setColaboradores([...colaboradores, colaboradorInput]);
      setColaboradorInput("");
    }
  };

  const handleRemoveColaborador = (username) => {
    setColaboradores(colaboradores.filter((colab) => colab !== username));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recetaData = {
      titulo,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      instrucciones,
      dificultad,
      valoracion: parseFloat(valoracion),
      autorId: user.id,
      colaboradores,
      ultimaEdicion: new Date().toISOString(),
    };

    const method = editar ? "PUT" : "POST";
    const endpoint = editar ? `${API_URL}recetas/${id}` : `${API_URL}recetas`;

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recetaData),
    });

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">
        {editar ? "Editar Receta" : "Nueva Receta"}
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">
          Ingredientes (separados por coma)
        </label>
        <input
          type="text"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Instrucciones</label>
        <textarea
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
          className="border p-2 w-full rounded"
          rows="4"
          required
        />
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Dificultad</label>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="fácil">Fácil</option>
          <option value="media">Media</option>
          <option value="difícil">Difícil</option>
        </select>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Valoración</label>
        <input
          type="number"
          value={valoracion}
          onChange={(e) => setValoracion(e.target.value)}
          className="border p-2 w-full rounded"
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>

      {/* Collaborators */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Colaboradores</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={colaboradorInput}
            onChange={(e) => setColaboradorInput(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Añadir colaborador por username"
          />
          <button
            type="button"
            onClick={handleAddColaborador}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Añadir
          </button>
        </div>
        <ul className="mt-2">
          {colaboradores.map((colab) => (
            <li key={colab} className="flex items-center justify-between">
              <span>{colab}</span>
              <button
                type="button"
                onClick={() => handleRemoveColaborador(colab)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        {editar ? "Guardar Cambios" : "Crear Receta"}
      </button>
    </form>
  );
}

export default RecetaForm;
