import { Navigate, useLocation } from "react-router";
import useWeb3 from "../hooks/useWeb3";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { account } = useWeb3();
  const location = useLocation();

  if (!account) {
    return <Navigate to="/connect-wallet" state={{ from: location }} replace />;
  }

  return children;
};
