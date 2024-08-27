import React from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthGaurd = ({ element }) => {
  const navigate = useNavigate();
  const getAdminToken = () => {
    let token = sessionStorage.getItem("Token");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    return token;
  };
  const token = getAdminToken();
  console.log("getAdminToken", token);
  if (!token) {
    console.log("dvsdvwjehfb qe f", token);
    navigate(`/shiv/admin`);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    return;
  }

  return element;
};

export default AdminAuthGaurd;
