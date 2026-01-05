import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but not authorized
    // You can redirect to dashboard or a "Not Authorized" page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
