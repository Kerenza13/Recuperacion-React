import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_URL_API;

function RecetaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [receta, setReceta] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const recetaRes = await fetch(`${API_URL}recetas/${id}`);
        const recetaData = await recetaRes.json();
        setReceta(recetaData);

        const usuariosRes = await fetch(`${API_URL}usuarios`);
        const usuariosData = await usuariosRes.json();
        setUsuarios(usuariosData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Cargando receta...</p>;
  if (!receta) return <p>Receta no encontrada.</p>;

  const colaboradoresUsernames = receta.colaboradores
    .map((idColab) => usuarios.find((u) => u.id === idColab))
    .filter(Boolean)
    .map((u) => u.username);

  const handleAddCollaborator = async () => {
    const userToAdd = usuarios.find((u) => u.username === newCollaborator);

    if (!userToAdd) {
      alert("Usuario no encontrado");
      return;
    }
    if (receta.colaboradores.includes(userToAdd.id)) {
      alert("Usuario ya es colaborador");
      return;
    }

    const updatedCollaborators = [...receta.colaboradores, userToAdd.id];

    try {
      const res = await fetch(`${API_URL}recetas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ colaboradores: updatedCollaborators }),
      });

      if (!res.ok) throw new Error("Error al añadir colaborador");

      setReceta({ ...receta, colaboradores: updatedCollaborators });
      setNewCollaborator("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (user.id !== receta.autorId) {
      alert("No tienes permiso para eliminar esta receta.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}recetas/${id}`, { method: "DELETE" });
      if (res.ok) navigate("/");
      else alert("Error eliminando receta");
    } catch {
      alert("Error eliminando receta");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{receta.titulo}</h1>
      <p>{receta.instrucciones}</p>
      <p>Dificultad: {receta.dificultad}</p>
      <p>Colaboradores: {colaboradoresUsernames.join(", ") || "Ninguno"}</p>

      {user &&
        (user.id === receta.autorId || receta.colaboradores.includes(user.id)) && (
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Eliminar Receta
            </button>
            <input
              type="text"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              placeholder="Añadir colaborador por username"
              className="border p-2 ml-2"
            />
            <button
              onClick={handleAddCollaborator}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Añadir
            </button>
          </div>
        )}
    </div>
  );
}

export default RecetaDetalle;
