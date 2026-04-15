import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const readUserRole = () => {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return null;

  try {
    const user = JSON.parse(userRaw);
    return user?.role || null;
  } catch {
    return null;
  }
};

const PrivateRoute = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = readUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
