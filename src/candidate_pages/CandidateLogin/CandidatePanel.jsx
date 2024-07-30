import React, { useState, useEffect } from "react";
import CandidateLogin from "./CandidateLogin/CandidateLogin";
import CandidateLogout from "./CandidateLogout/CandidateLogut";
import "./CandidatePanel.css";

function CandidatePanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check login status on component mount
    const checkLoginStatus = () => {
    // const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const token = sessionStorage.getItem("Token");
    const loggedIn = token ? true : false;
    setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("Token");
  };

  return (
    <div className="admin-container1">
      <div className="admin-data">
        {!isLoggedIn ? (
          <CandidateLogin handleLogin={handleLogin} />
        ) : (
          <CandidateLogout handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default CandidatePanel;
