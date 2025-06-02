import React, { createContext, useContext, useState, useEffect } from "react";

const HorarioContext = createContext();

export const HorarioProvider = ({ children }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citasExistentes, setCitasExistentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchCitasExistentes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}appointments`);
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

  const generarHorarios = (fecha) => {
    const horarios = [];

    // Morning: 9:30 - 14:30
    let current = new Date(fecha);
    current.setHours(9, 30, 0, 0);
    const finManana = new Date(fecha);
    finManana.setHours(14, 30, 0, 0);

    while (current < finManana) {
      horarios.push(new Date(current));
      current = new Date(current.getTime() + 30 * 60000); // +30 mins
    }

    // Afternoon: 17:00 - 20:00
    current = new Date(fecha);
    current.setHours(17, 0, 0, 0);
    const finTarde = new Date(fecha);
    finTarde.setHours(20, 0, 0, 0);

    while (current < finTarde) {
      horarios.push(new Date(current));
      current = new Date(current.getTime() + 30 * 60000); // +30 mins
    }

    return horarios;
  };

  const verificarDisponibilidad = (horaSeleccionada, duracion) => {
    if (!horaSeleccionada || !duracion) return false;

    for (const cita of citasExistentes) {
      const citaInicio = new Date(cita.date);
      const citaFin = new Date(citaInicio.getTime() + cita.duration * 60000);

      const seleccionInicio = new Date(horaSeleccionada);
      const seleccionFin = new Date(
        seleccionInicio.getTime() + duracion * 60000
      );

      const overlap = seleccionInicio < citaFin && seleccionFin > citaInicio;

      if (overlap) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (!fechaSeleccionada) {
      setHorariosDisponibles([]);
      return;
    }

    const posiblesHorarios = generarHorarios(fechaSeleccionada);

    const slotsLibres = posiblesHorarios.filter((hora) =>
      verificarDisponibilidad(hora, 30)
    );

    setHorariosDisponibles(slotsLibres);
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

// Custom hook to use the HorarioContext easily
export const useHorario = () => useContext(HorarioContext);
