import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
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
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login">Iniciar sesión</NavLink>
          )}
        </div>
      </nav>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
