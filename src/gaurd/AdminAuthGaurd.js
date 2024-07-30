import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ApiDataProvider } from "../context/CandidateContext";

const AdminAuthGaurd = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const checkToken = useCallback(() => {
    let Token = sessionStorage.getItem("Token");
    let admin = "";
    if (Token && Token.length) {
      Token = JSON.parse(Token);
      const splitToken = Token.token.split(".");
      const base64EncodedPayload = splitToken[1];
      const decodedPayload = atob(base64EncodedPayload);
      admin = JSON.parse(decodedPayload).admin_id
        ? JSON.parse(decodedPayload).admin_id
        : false;
      // console.log("admin", admin, decodedPayload);
      const loginData = {
        roleName: JSON.parse(decodedPayload).roleName,
        fullName: `${JSON.parse(decodedPayload).first_name} ${
          JSON.parse(decodedPayload).last_name
        }`,
      };
      setUserData(loginData);
    }
    if (!Token) {
      setStatus(false);
      navigate(`/`);
      sessionStorage.removeItem("Token");
      return;
    } else if (Token && !admin) {
      setStatus(false);
      navigate(`/`);
      sessionStorage.removeItem("Token");
      return;
    } else {
      setStatus(true);
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const userData = checkToken();
    if (userData) {
      setStatus(true);
    }
  }, [component, checkToken]);

  return status ? (
    <React.Fragment>
      <ApiDataProvider userData={userData}>{component}</ApiDataProvider>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AdminAuthGaurd;
