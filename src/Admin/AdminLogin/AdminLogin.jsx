import React, { useState, useEffect } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "../../Notification/Notification";
import { useNavigate, useLocation } from "react-router-dom";
import { loginAdmin } from "../Services/AdminServices";
import "./AdminLogin.css"

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    open: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { email, password, autoLogin } = location.state || {};

    if (autoLogin) {
      // Automatically log in if autoLogin flag is set
      handleAutoLogin(email, password);
    } else if (email && password) {
      // Set email and password for manual login
      setUsername(email);
      setPassword(password);
    }
  }, [location.state]);

  const handleAutoLogin = async (email, password) => {
    try {
      const response = await loginAdmin(email, password);

      console.log("API Response:", response);

      if (response && response.data.token) {
        sessionStorage.setItem("Token", JSON.stringify(response.data.token));
        localStorage.setItem("Token", JSON.stringify(response.data.token));
        navigate(`/admin-dashboard/admin-page`);
        setErrorNotification({
          open: true,
          message: "Login Successful",
        });
      } else {
        setErrorMessage("Invalid credentials");
        setErrorNotification({
          open: true,
          message: "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
        setErrorNotification({
          open: true,
          message: error.response.data.message || "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1);
      } else {
        setErrorMessage("An error occurred during login");
        setErrorNotification({
          open: true,
          message: "An error occurred during login",
        });
        setErrorCount((prevCount) => prevCount + 1);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(username, password);

      console.log("API Response:", response);

      if (response && response.data.token) {
        sessionStorage.setItem("Token", JSON.stringify(response.data.token));
        localStorage.setItem("Token", JSON.stringify(response.data.token));
        navigate(`/admin-dashboard/admin-page`);
        setErrorNotification({
          open: true,
          message: "Login Successful",
        });
      } else {
        setErrorMessage("Invalid credentials");
        setErrorNotification({
          open: true,
          message: "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
        setErrorNotification({
          open: true,
          message: error.response.data.message || "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1);
      } else {
        setErrorMessage("An error occurred during login");
        setErrorNotification({
          open: true,
          message: "An error occurred during login",
        });
        setErrorCount((prevCount) => prevCount + 1);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseNotification = () => {
    setErrorNotification({ ...errorNotification, open: false });
  };

  return (
    <>
      <Notification
        open={errorNotification.open}
        handleClose={handleCloseNotification}
        alertMessage={errorNotification.message}
        alertSeverity="error"
      />
      <div className="login-container">
        <div style={{ textAlign: "center" }}>
          <p className="login-content">ADMIN LOGIN</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="login-form"
          autoComplete="on"
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`password-input ${
                errorMessage ? "shake-animation input-error" : ""
              }`}
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="btn-login">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
        <div className="design-content">
          <p>Design & Developed By CorusView</p>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
