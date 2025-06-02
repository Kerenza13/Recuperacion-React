import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecetaDetalle } from "../context/RecetaDetalleContext";

function RecetaDetalle() {
  const { id } = useParams();
  const { receta, error, loading, fetchReceta } = useRecetaDetalle();

  useEffect(() => {
    fetchReceta(id);
  }, [id]);

  if (loading) {
    return <p>Cargando receta...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!receta) {
    return <p>No se encontró la receta.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{receta.titulo}</h1>
      <p className="mt-2">{receta.instrucciones}</p>
      <p className="mt-4">Dificultad: {receta.dificultad}</p>
      <p>
        Última edición: {new Date(receta.ultimaEdicion).toLocaleDateString()}
      </p>
    </div>
  );
}

export default RecetaDetalle;
