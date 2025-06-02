import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import RecetaDetallePage from "../pages/RecetaDetalle";
import RecetaFormPage from "../pages/RecetaForm";
import FavoritasPage from "../pages/Favoritas";
import Protected from "../components/Protected";

  export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <AuthPage /> },
      { path: "recetas/:id", element: <RecetaDetallePage /> },
      {
        path: "recetas/:id/editar",
        element: (
          <Protected>
            <RecetaFormPage editar />
          </Protected>
        ),
      },
      {
        path: "favoritas",
        element: (
          <Protected>
            <FavoritasPage />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
