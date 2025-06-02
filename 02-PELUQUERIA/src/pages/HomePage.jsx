import React from "react";

const HomePage = () => {

  return (
    <div className="homepage min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Bienvenidos a Nuestra Peluquería
      </h1>
      <p className="text-lg text-gray-600 mb-2 text-center">
        Ubicación: Calle Principal #123, Ciudad
      </p>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Horarios: Lunes a Sábado, 9:00 AM - 7:00 PM
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW_L5gpQACYPFwOAgKBDAZaBqyjM1EZM_Ew&s"
        alt="Imagen destacada del local"
        className="rounded-xl shadow-lg mb-6 w-full max-w-md"
      />
    </div>
  );
};

export default HomePage;
