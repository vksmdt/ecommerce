import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectiveRoute = ({ children, redirect = "/login", isAdmin }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  // if (user.role !== "admin" && isAdmin===true) {
  //   return <Navigate to={redirect} />;
  // }

  return children ? children : <Outlet />;
};

export default ProtectiveRoute;
