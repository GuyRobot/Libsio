import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (Component, isAdmin) => function HOC() {
  const user = useSelector((state) => state.auth.user);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return <Component></Component>;
};

export default ProtectedRoute;
