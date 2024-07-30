import React from "react";
import "./Submitsuccess.css";

import logo from "../../../assets/logos/success.png";

function Submitsuccess() {
  return (
    <>
    <div className="back-to-home"> <a href="/"><span>&#8592;</span> Back To Home Page </a></div>
      <div className="success-main-container">
        <div className="success-page">
          <p className="success-heading">Verification</p>
          <div className="success-sub-container">
            <p className="success-subheading">Submit Successfully</p>
            <div className="success-logo">
              <img src={logo} alt="Qualification" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Submitsuccess;
