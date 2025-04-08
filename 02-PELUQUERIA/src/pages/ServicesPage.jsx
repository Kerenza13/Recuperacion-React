import React, { useEffect, useState } from "react";
import { useCita } from "../context/CitaContext";

const ServiciosPage = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addService } = useCita();

  const API_URL = import.meta.env.VITE_URL_API;
  // Obtener los servicios de la API
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        setServicios(data);
      } catch (err) {
        setError("Error al cargar los servicios");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="services-container">
      <h2 className="text-2xl font-bold mb-4">Servicios Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicios.map((service) => (
          <div key={service.id} className="service-card p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{service.nombre}</h3>
            <p>Precio: ${service.precio}</p>
            <p>Duración: {service.duracion} minutos</p>
            <p>Categoría: {service.categoria}</p>
            <button
              onClick={() => addService(service)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosPage;
