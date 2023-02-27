import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }, isAdmin) => function HOC() {
  const user = useSelector((state) => state.auth.user);
  let location = useLocation();

  if (!user || (isAdmin && user.role !== 'admin')) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
