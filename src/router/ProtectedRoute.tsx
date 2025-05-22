import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { PATHS } from "./paths";

interface Props {
  component: ReactNode;
}

const ProtectedRoute = ({ component }: Props) => {
  const location = useLocation();
  const isAuthenticated =
    sessionStorage.getItem(btoa("email")) ??
    localStorage.getItem(btoa("email"));

  if (!isAuthenticated && location.pathname !== PATHS.login) {
    return <Navigate to={PATHS.login} />;
  }

  if (isAuthenticated && location.pathname === PATHS.login) {
    return <Navigate to={PATHS.form} />;
  }

  return component;
};

export default ProtectedRoute;
