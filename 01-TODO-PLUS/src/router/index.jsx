import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/TaskPage";
import CreateTaskPage from "../pages/CreateTaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreateTaskPage /> },
    ],
  },
]);
