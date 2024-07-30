import React, { useState } from "react";
import "./OTPVerification.css";
import { useNavigate } from "react-router-dom";
import apiService from "../../../Services/ApiServices";
import Notification from "../../../Notification/Notification";

function OTPVerification({ transferAllData,transferDropCvData, otpData }) {
  // console.log("AllData", transferAllData);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");

  const { contact_1 } = otpData;
  let digit = contact_1 ? contact_1.slice(-2) : "";
  const verifyOtp = async () => {
    try {
      // console.log("Contact 1:", otp, otpData);

      const response = await apiService.verifyEmailOTP({
        ...otpData,
        // inputOTP: parseInt(otp),
        inputOTP: otp,
      });

      if (response && response.data) {
        // setIsOtpVerified(response.data);
        // console.log("otp", response.data, isOtpVerified);

        setNotificationMessage(`OTP Verified! ${response.data}`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        if (transferAllData) {

          try {
            const response = await apiService.submitApplyNowData(
              transferAllData
            );

            if (!response) {
              console.error("Failed to post form data and file to the API");
              setNotificationMessage("Something went wrong! ,Please try again");
              setNotificationSeverity("warning");
              setNotificationOpen(true);
            }
            navigate("/submit");
            // console.log("Form data and file successfully posted to the API");
          } catch (error) {
            console.error(
              "Failed to post form data and file to the API",
              error
            );
          }
        } else {
          try {
            const response = await apiService.submitCandidateData(
              transferDropCvData
            );

            if (!response) {
              console.error("Failed to post form data and file to the API");
              setNotificationMessage("Something went wrong! ,Please try again");
              setNotificationSeverity("warning");
              setNotificationOpen(true);
            }
            // console.log("Form data and file successfully posted to the API");
            navigate("/submit");
          } catch (error) {
            console.error(
              "Failed to post form data and file to the API",
              error
            );
          }
        }
      } else {
        setVerificationError("Invalid OTP. Please try again.");
        // setIsOtpVerified(false);

        setNotificationMessage("Incorrect OTP. Please try again.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      setVerificationError("An error occurred during OTP verification.");

      setNotificationMessage(
        "An error occurred during OTP verification. Please try again."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await apiService.generateOTP({
        ...otpData,
      });

      // console.log("API Response:", response);
      // alert("OTP Resent Successfully!");
      setNotificationMessage("OTP Resent Successfully!");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error during OTP generation", error);
      // alert("Failed to resend OTP. Please try again.");
      setNotificationMessage("Failed to resend OTP. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };
  return (
    <>
      <div className="vrf-main-container">
        <div className="vrf-page">
          <p className="vrf-heading">Verification</p>
          <div className="sub-vrf-page">
            <p className="vrf-subheading">OTP Verification</p>
            <p style={{ color: "rgba(0, 0, 0, 0.666)", marginTop: "-17px" }}>
              {`Enter OTP sent to xxxxxxxx${digit}`}
            </p>
            <div className="otp-form">
              <form action="" method="post">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </form>
            </div>
            {verificationError && (
              <p style={{ color: "red" }}>{verificationError}</p>
            )}
            <button onClick={verifyOtp} type="button" id="verify-otp-btn">
              Verify OTP
            </button>
            &nbsp;
            <button onClick={resendOTP} type="button" id="resend-btn">
              Resend OTP
            </button>
          </div>
        </div>
        {/* <button onClick={submitsuccess} type="submit" id="otp-submit-btn">
          Submit
        </button> */}
      </div>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default OTPVerification;
