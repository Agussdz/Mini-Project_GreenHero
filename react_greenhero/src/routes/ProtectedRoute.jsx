import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Jika tidak ada data user di localStorage, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Jika ada data user, render children di dalam outlet
  return <Outlet />;
};

export default ProtectedRoute;
