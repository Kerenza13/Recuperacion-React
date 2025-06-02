import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="root-layout min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white">
        <div className="p-4 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold">Peluquería</h1>
        </div>
        <NavBar />
      </header>
      <main className="flex-grow p-4 md:p-6 flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 text-sm md:text-base">
        <p>
          &copy; {new Date().getFullYear()} Peluquería. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
