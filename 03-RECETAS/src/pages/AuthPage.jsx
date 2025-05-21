import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" o "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Completa ambos campos");
      return;
    }

    if (mode === "login") {
      const res = await login(username.trim(), password.trim());
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message);
      }
    } else {
      // modo registro
      const res = await register(username.trim(), password.trim());
      if (res.success) {
        alert("Registro exitoso, ya puedes iniciar sesión");
        setMode("login");
        setUsername("");
        setPassword("");
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === "login" ? "Iniciar sesión" : "Registrar usuario"}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === "login" ? "Entrar" : "Registrar"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => {
                setError(null);
                setMode("register");
              }}
              className="text-blue-600 underline"
            >
              Regístrate
            </button>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={() => {
                setError(null);
                setMode("login");
              }}
              className="text-blue-600 underline"
            >
              Inicia sesión
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthPage;
