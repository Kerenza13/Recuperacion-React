import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header/>
      <main>
        <Outlet />
      </main>
      <footer/>
    </div>
  );
};

export default RootLayout;
