import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 shadow-md sticky top-0 z-10">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservar"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Reservar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Perfil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Iniciar Sesión
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
