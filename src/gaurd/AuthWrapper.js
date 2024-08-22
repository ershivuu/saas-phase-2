import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ element }) => {
  const getAdminToken = () => {
    let token = sessionStorage.getItem("Token");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    return token;
  };
  const token = getAdminToken();
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return element;
};

export default AuthWrapper;
