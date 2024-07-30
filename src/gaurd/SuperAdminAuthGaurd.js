import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Function to get the token from session storage
const getAuthToken = () => {
  let token = sessionStorage.getItem("Token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  return token;
};

// RouteGuard component
const SuperAdminAuthGaurd = ({ children }) => {
  const location = useLocation();
  const token = getAuthToken();

  // Check if token exists
  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/superadmin" state={{ from: location }} />;
  }

  // Optionally add further validation for token expiry or authenticity
  // For example, make an API call to verify the token

  return children;
};

export default SuperAdminAuthGaurd;
