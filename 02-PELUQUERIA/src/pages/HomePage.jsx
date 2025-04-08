import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenidos a Nuestra Peluquería
      </h1>
      <p className="text-lg text-gray-600 mb-2">
        Ubicación: Calle Principal #123, Ciudad
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Horarios: Lunes a Sábado, 9:00 AM - 7:00 PM
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW_L5gpQACYPFwOAgKBDAZaBqyjM1EZM_Ew&s"
        alt="Imagen destacada del local"
        className="rounded-xl shadow-lg mb-6 w-full max-w-md"
      />
      <div className="buttons flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/servicios")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Ver Servicios
        </button>
        <button
          onClick={() => navigate("/productos")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Ver Productos
        </button>
        <button
          onClick={() => navigate("/auth")}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          Registrarse / Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/reservar")}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          Reservar una cita
        </button>
      </div>
    </div>
  );
};

export default HomePage;
