import App from "@/App";
import FormView from "@/pages/FormView";
import Login from "@/pages/Login";
import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { PATHS } from "./paths";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: PATHS.form,
        element: <ProtectedRoute component={<FormView />} />,
      },
      {
        path: PATHS.login,
        element: <ProtectedRoute component={<Login />} />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={PATHS.login} />,
  },
]);

export default router;
