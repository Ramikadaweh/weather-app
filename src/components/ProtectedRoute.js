import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ email }) => {
  return <>{email ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
