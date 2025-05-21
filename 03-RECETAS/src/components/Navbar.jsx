import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <NavLink to="/" className="text-lg font-bold">
        Recetas
      </NavLink>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hola, {user.username}</span>
            <NavLink to="/favoritas" className="mr-4">
              Favoritas
            </NavLink>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Salir
            </button>
          </>
        ) : (
          <NavLink to="/login">Iniciar sesión</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
