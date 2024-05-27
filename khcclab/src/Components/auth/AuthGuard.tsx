import React from "react";
import { Navigate } from "react-router-dom";
import { USER_ROLE, ACCESS_TOKEN } from "utils/constant";

interface AuthGuardProps {
  role: string;
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, role }) => {
  const tokenRole = localStorage.getItem(USER_ROLE) || "";
  const token = localStorage.getItem(ACCESS_TOKEN) || "";

  if (token && tokenRole === role) {
    return <>{children}</>;
  }
  localStorage.clear();
  return <Navigate to="/" replace />;
};

export default AuthGuard;
