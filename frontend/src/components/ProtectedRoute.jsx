import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectTo = "/auth",
}) => {
  const { user, loading, checkAuth } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!user && localStorage.getItem("token")) {
        await checkAuth();
      }
      setIsVerifying(false);
    };

    verifyAuth();
  }, [user, checkAuth]);

  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A0D585]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role_type)) {
    // Redirect to unauthorized page or their appropriate dashboard
    const userDashboard = `/${user.role_type}-dashboard`;
    return <Navigate to={userDashboard} replace />;
  }

  return children;
};

export default ProtectedRoute;
