import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { login, register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register(email, password);
    } else {
      const success = await login(email, password);
      if (success === true) {
        navigate("/perfil");
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Procesando..." : isRegister ? "Registrar" : "Ingresar"}
        </button>
      </form>
      <p
        className="mt-4 text-sm text-blue-600 cursor-pointer underline"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "¿Ya tienes una cuenta? Inicia sesión"
          : "¿No tienes una cuenta? Regístrate"}
      </p>
    </div>
  );
};

export default AuthPage;
