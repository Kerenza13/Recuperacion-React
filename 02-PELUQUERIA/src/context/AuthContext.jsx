import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

    const API_URL = import.meta.env.VITE_URL_API;
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Clear authentication when token is removed
    }
  }, [token]);

  const register = async (email, password) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch (`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      setError(error.message); // Set error state
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError(error.message); // Set error state
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        token,
        loading,
        error, // Add error to the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
