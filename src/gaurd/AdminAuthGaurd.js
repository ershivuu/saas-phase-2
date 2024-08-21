import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ApiDataProvider } from "../context/CandidateContext";

const AdminAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const checkToken = useCallback(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        const splitToken = parsedToken.token.split(".");
        const base64EncodedPayload = splitToken[1];
        const decodedPayload = atob(base64EncodedPayload);
        const payload = JSON.parse(decodedPayload);

        if (payload.admin_id) {
          const loginData = {
            roleName: payload.roleName,
            fullName: `${payload.first_name} ${payload.last_name}`,
          };
          setUserData(loginData);
          setStatus(true);
          return true;
        }
      } catch (e) {
        console.error("Failed to parse token", e);
      }
    }

    setStatus(false);
    navigate(`/`);
    sessionStorage.removeItem("Token");
    return false;
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return status ? (
    <ApiDataProvider userData={userData}>{component}</ApiDataProvider>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AdminAuthGuard;
