import React from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminAuthGaurd = ({ element }) => {
  const navigate = useNavigate();
  const getAdminToken = () => {
    let token = sessionStorage.getItem("Token");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    return token;
  };
  const token = getAdminToken();

  if (!token) {
    navigate(`/superadmin`);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    return;
  }

  return element;
};

export default SuperAdminAuthGaurd;
