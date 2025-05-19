import React, { useState } from "react";
import { useHorario } from "../context/HorarioContext";

const BookingPage = () => {
  const { horariosDisponibles, seleccionarFecha, loading, error } =
    useHorario();
  const [fecha, setFecha] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFecha(selectedDate);
    seleccionarFecha(selectedDate);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reservar Cita</h2>
      <input
        type="date"
        value={fecha}
        onChange={handleDateChange}
        className="w-full border px-4 py-2 rounded mb-4"
      />
      {loading && <p>Cargando horarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {horariosDisponibles.map((hora, index) => (
          <li key={index} className="border px-4 py-2 rounded">
            {hora.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;
