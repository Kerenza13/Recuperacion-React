import React, { createContext, useContext, useState, useEffect } from "react";

const HorarioContext = createContext();
export const HorarioProvider = ({ children }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  useEffect(() => {
    if (fechaSeleccionada) {
      const horarios = generarHorarios(fechaSeleccionada);
      setHorariosDisponibles(horarios);
    }
  }, [fechaSeleccionada]);

  const generarHorarios = (fecha) => {
    const horarios = [];
    const inicio = new Date(fecha);
    inicio.setHours(9, 0, 0, 0);

    const fin = new Date(fecha);
    fin.setHours(18, 0, 0, 0);

    while (inicio < fin) {
      horarios.push(new Date(inicio));
      inicio.setMinutes(inicio.getMinutes() + 30);
    }

    return horarios;
  };

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  return (
    <HorarioContext.Provider
      value={{
        horariosDisponibles,
        fechaSeleccionada,
        seleccionarFecha,
      }}
    >
      {children}
    </HorarioContext.Provider>
  );
};

export const useHorario = () => useContext(HorarioContext);
