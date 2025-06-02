import { createContext, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const API_URL = import.meta.env.VITE_URL_API;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}usuarios`);
      const usuarios = await response.json();
      const foundUser = usuarios.find((u) => u.username === username);

      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const userData = { ...foundUser };
        delete userData.password;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: "Usuario o contraseña incorrectos" };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error en el servidor" };
    }
  };

  const register = async (username, password) => {
    try {
      // Verificar que no exista usuario igual
      const res = await fetch(`${API_URL}usuarios?username=${username}`);
      const existingUsers = await res.json();
      if (existingUsers.length > 0) {
        return { success: false, message: "El nombre de usuario ya existe" };
      }

      // Encriptar contraseña
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        username,
        password: hashedPassword,
        favoritas: []
      };

      const response = await fetch(`${API_URL}usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: "Error al registrar usuario" };
      }
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, message: "Error en el servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
