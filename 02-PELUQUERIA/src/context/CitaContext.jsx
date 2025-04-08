import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CitaContext = createContext();

// Proveedor del contexto
export const CitaProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  // Función para añadir un servicio al carrito
  const addService = (service) => {
    setSelectedServices((prevServices) => [...prevServices, service]);
  };

  // Función para eliminar un servicio del carrito
  const removeService = (serviceId) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

  // Función para limpiar todos los servicios seleccionados
  const clearServices = () => {
    setSelectedServices([]);
  };

  return (
    <CitaContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        clearServices,
      }}
    >
      {children}
    </CitaContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCita = () => {
  return useContext(CitaContext);
};