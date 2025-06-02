import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useServices } from "../context/ServiceContext"; // Asegúrate de tener este contexto

const ProfilePage = () => {
  const { token: userId, logout } = useAuth();
  const { services } = useServices(); // Obtener la lista de servicios
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}appointments?userId=${userId}`);

        if (!response.ok) {
          setError("Error al cargar tus citas.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setAppointments(data);
      } catch {
        setError("Error al cargar tus citas.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAppointments();
    } else {
      setLoading(false);
      setError("No estás autenticado.");
    }
  }, [userId, API_URL]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const getServiceNames = (serviceIds) =>
    serviceIds
      .map((id) => {
        const service = services.find((s) => s.id === id);
        return service ? service.name : `Servicio desconocido (${id})`;
      })
      .join(", ");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>

      <h3 className="text-xl font-semibold mb-2">Mis Citas</h3>
      {loading ? (
        <p>Cargando tus citas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="border p-4 rounded shadow">
              <p>
                <strong>Servicios:</strong>{" "}
                {getServiceNames(appt.services)}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(appt.date).toLocaleString()}
              </p>
              <p>
                <strong>Estado:</strong> {appt.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
