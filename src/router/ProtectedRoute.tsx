import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface Props {
  component: ReactNode;
}

const ProtectedRoute = ({ component }: Props) => {
  const location = useLocation();
  const isAuthenticated =
    sessionStorage.getItem(btoa("email")) ??
    localStorage.getItem(btoa("email"));

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/form" />;
  }

  return component;
};

export default ProtectedRoute;
