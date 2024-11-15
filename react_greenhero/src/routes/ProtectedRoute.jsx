import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Jika tidak ada data user di localStorage, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Jika ada data user, tampilkan children (komponen yang dilindungi)
  return children;
};

export default ProtectedRoute;
