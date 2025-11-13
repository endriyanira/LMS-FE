// src/ProtectedRoute.js (Diperbarui)

import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./utils/auth";

/**
 * Komponen untuk melindungi rute
 * @param {string} requiredRole - Role yang diperlukan ('admin' atau 'member'). Opsional.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const userRole = getUserRole();

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
