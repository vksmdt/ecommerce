import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const ProtectiveRoute = ({ children, redirect = "/login", isAdmin }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (user.role !== "admin" || !isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectiveRoute;
