import React, { useState } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logos/logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import close from "../../../assets/logos/close.png";
import "./CandidateLogin.css";
import Backdrop from "@mui/material/Backdrop";
import { FormControl } from "@mui/material";

function ForgottenPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 310,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleXButtonClick = () => {
    // Close the modal when 'x' button is clicked
    setOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <div className="logo-section">
          <img className="logo-img" src={logo} alt="Logo" />
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="login-content">Forgotten Password</p>
        </div>

        <form className="login-form" style={{ height: "375px" }}>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="email"
            name=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <label htmlFor="password"> Confirm Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name=""
              // value=""

              required
              className="password-input"
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="btn-login">
            <button type="submit" onClick={handleOpen} className="login-button">
              Submit
            </button>
          </div>
          <Modal
             open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={(props) => (
        <Backdrop {...props} invisible onClick={() => {}} />
      )}
          >
            <Box sx={style}>
              <FormControl>
                <div>
                  <form>
                    <img
                      onClick={handleXButtonClick}
                      className="close-btn"
                      src={close}
                      alt=""
                    />
                    <label className="UD-SetLabel-Name">Enter OTP</label>

                    <input type="text" name="" id="" />
                    <button type="button" class="btn btn-success">
                      Ok
                    </button>
                  </form>
                </div>
              </FormControl>
            </Box>
          </Modal>
        </form>
        <div className="design-content">
          <p>Design & Developed By Corus View</p>
        </div>
      </div>
    </>
  );
}

export default ForgottenPassword;
