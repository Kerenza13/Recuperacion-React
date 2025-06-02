import React, { useEffect, useState } from "react";
import { useCita } from "../context/CitaContext";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addService } = useCita();

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}services`);
        if (!response.ok) {
          throw new Error("Error al cargar los servicios");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message || "Error al cargar los servicios");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [API_URL]);

  if (loading)
    return <p className="p-4 text-gray-600">Cargando servicios...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Servicios Disponibles</h2>
      {services.length === 0 ? (
        <p className="text-gray-600">
          No hay servicios disponibles en este momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p>Precio: ${Number(service.price).toFixed(2)}</p>
              <p>Duración: {service.duration} minutos</p>
              <p>
                Categoría:{" "}
                {service.category
                  ? service.category.charAt(0).toUpperCase() +
                    service.category.slice(1)
                  : "N/A"}
              </p>
              <button
                onClick={() => addService(service)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
