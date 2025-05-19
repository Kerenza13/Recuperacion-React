import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Peluquería</h1>
      </header>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>
          &copy; {new Date().getFullYear()} Peluquería. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
