import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../components/toastConfig";
import { UserContext } from "../ContextAPI/UserContext";

const AuthProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    toast.warning("Login First", toastConfig);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProvider;
