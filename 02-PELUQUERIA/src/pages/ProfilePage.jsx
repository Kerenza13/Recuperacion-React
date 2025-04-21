import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { token, logout, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_URL}/appointments?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError("Error al cargar tus citas.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAppointments();
    }
  }, [user, token]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p className="mb-4">Correo: {user?.email}</p>
      <button
        onClick={logout}
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
              <p><strong>Servicio ID:</strong> {appt.serviceId}</p>
              <p><strong>Fecha:</strong> {new Date(appt.date).toLocaleString()}</p>
              <p><strong>Estado:</strong> {appt.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
