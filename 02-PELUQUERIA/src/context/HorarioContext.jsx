import React, { createContext, useContext, useState, useEffect } from "react";

const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citasExistentes, setCitasExistentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_URL_API;

  // Fetch existing appointments
  useEffect(() => {
    const fetchCitasExistentes = async () => {
      try {
        const response = await fetch(`${API_URL}/appointments`);
        if (!response.ok) {
          throw new Error("Error al cargar las citas existentes");
        }
        const data = await response.json();
        setCitasExistentes(data);
      } catch {
        setError("Error al cargar las citas existentes");
      } finally {
        setLoading(false);
      }
    };

    fetchCitasExistentes();
  }, [API_URL]);

  // Generate time slots
  const generarHorarios = (fecha) => {
    const horarios = [];
    const inicioManana = new Date(fecha);
    inicioManana.setHours(9, 30, 0, 0); // 9:30 AM

    const finManana = new Date(fecha);
    finManana.setHours(14, 30, 0, 0); // 2:30 PM

    const inicioTarde = new Date(fecha);
    inicioTarde.setHours(17, 0, 0, 0); // 5:00 PM

    const finTarde = new Date(fecha);
    finTarde.setHours(20, 0, 0, 0); // 8:00 PM

    // Morning slots
    while (inicioManana < finManana) {
      horarios.push(new Date(inicioManana));
      inicioManana.setMinutes(inicioManana.getMinutes() + 30);
    }

    // Afternoon slots
    while (inicioTarde < finTarde) {
      horarios.push(new Date(inicioTarde));
      inicioTarde.setMinutes(inicioTarde.getMinutes() + 30);
    }

    return horarios;
  };

  // Check availability
  const verificarDisponibilidad = (horaSeleccionada, duracion) => {
    for (let cita of citasExistentes) {
      const citaFecha = new Date(cita.date);
      const citaFin = new Date(citaFecha);
      citaFin.setMinutes(citaFecha.getMinutes() + cita.duration);

      if (
        (horaSeleccionada >= citaFecha && horaSeleccionada < citaFin) ||
        (horaSeleccionada < citaFecha &&
          horaSeleccionada.getTime() + duracion * 60000 > citaFecha.getTime())
      ) {
        return false;
      }
    }
    return true;
  };

  // Update available time slots
  useEffect(() => {
    if (fechaSeleccionada) {
      const horarios = generarHorarios(fechaSeleccionada);
      const horariosFiltrados = horarios.filter((hora) =>
        verificarDisponibilidad(hora, 60)
      );
      setHorariosDisponibles(horariosFiltrados);
    }
  }, [fechaSeleccionada, citasExistentes]);

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  return (
    <HorarioContext.Provider
      value={{
        horariosDisponibles,
        fechaSeleccionada,
        seleccionarFecha,
        verificarDisponibilidad,
        loading,
        error,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};

// Custom hook
export const useHorario = () => useContext(HorarioContext);
