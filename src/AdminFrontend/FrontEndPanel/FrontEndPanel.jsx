// src/App.js
import React, { useState } from "react";
import FrontendLogin from "../FrontendLogin/FrontendLogin";
import FrontendDashboard from "../FrontendDashboard/FrontendDashboard";

function FrontEndPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <FrontendDashboard onLogout={handleLogout} />
      ) : (
        <FrontendLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default FrontEndPanel;
