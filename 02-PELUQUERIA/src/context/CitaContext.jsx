import React, { createContext, useContext, useState } from "react";

const CitaContext = createContext();

export const CitaProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const addService = (service) => {
    setSelectedServices((prevServices) => {
      if (prevServices.some((s) => s.id === service.id)) {
        return prevServices;
      }
      return [...prevServices, service];
    });
  };

  const removeService = (serviceId) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

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

export const useCita = () => {
  return useContext(CitaContext);
};
