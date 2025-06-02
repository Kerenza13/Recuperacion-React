import React, { createContext, useContext, useEffect, useState } from "react";

// Create a Context
const ServiceContext = createContext(null);

// Service Provider Component
export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    if (!API_URL) {
      console.error("API_URL is not defined. Please check your environment variables.");
      setError("API URL not defined.");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}services`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services.");
      }
    };

    fetchServices();
  }, [API_URL]);

  return (
    <ServiceContext.Provider value={{ services, error }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to use the ServiceContext
export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
