import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
