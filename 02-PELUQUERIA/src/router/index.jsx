import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";
import AuthPage from "../pages/AuthPage";
import BookingPage from "../pages/BookingPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "servicios", element: <ServicesPage /> },
      { path: "productos", element: <ProductsPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "reserva", element: <BookingPage /> },
      { path: "perfil", element: <ProfilePage /> },
    ],
  },
]);
