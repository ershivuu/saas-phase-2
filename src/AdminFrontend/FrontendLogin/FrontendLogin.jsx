// src/components/Login.js
import React, { useState, useEffect } from "react";
import "./FrontendLogin.css";
import logo from "../../assets/logos/logo.png";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHeaderInfo } from "../FrontendServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../../Notification/Notification";
import { ADMIN_BASE_URL } from "../../config/config";
function FrontendLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    open: false,
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (username === "admin" && password === "admin") {
  //     onLogin();
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/adminLogin/login_admin`,
        {
          login_field: username,
          password: password,
        }
      );
      // console.log(response);
      if (response && response.data.token) {
        sessionStorage.setItem("Token", JSON.stringify(response.data));
        // handleLogin();
        navigate(`/FrontendDashboard/EditHeader`);
        setErrorNotification({
          open: true,
          message: "Login Successful",
        });
      } else {
        // If response does not contain token (invalid credentials)
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
        // If status code is 400 (Bad Request), it indicates invalid credentials
        setErrorMessage(error.response.data.message || "Invalid credentials");
        setErrorNotification({
          open: true,
          message: error.response.data.message || "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      } else {
        // If any other error occurs, display a generic error message
        setErrorMessage("An error occurred during login");
        setErrorNotification({
          open: true,
          message: "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { image_url } = await getHeaderInfo();
        setImageUrl(image_url || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
        <div className="logo-section">
          <a href="/">
            <img className="logo-img" src={imageUrl} alt="Logo" />
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="login-content">FrontEnd Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" autoComplete="on">
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              id="password-eye"
              className="password-toggle "
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="btn-login">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>

        <div className="design-content">
          <p>Design & Developed By CorusView</p>
        </div>
      </div>
    </>
  );
}

export default FrontendLogin;
