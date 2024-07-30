import React from "react";
import vector from "../../assets/images/Vector-top.png";
import vectorbottom from "../../assets/images/bottom.png";
import "./Process.css";
import Footers from "../../components/Footer/Footers";
import Headers from "../../components/Header/Header";
import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import step4 from "../../assets/images/step4.png";
import step5 from "../../assets/images/step5.png";
import step6 from "../../assets/images/step6.png";

function Process() {
  return (
    <>
      <Headers></Headers>
      <div style={{ marginBottom: "12%" }} className="top-spacing-200">
        <div className="process-vector">
          <img src={vector} />
        </div>

        <div className="app-process-heading ">
          <p>
            Application Process <br />
            Step By Step Procedure
          </p>
          <p>
            Follow the steps below in order to use the common recruitment
            portal. You can <br /> use your profile to apply to multiple
            positions with a single click.
          </p>
        </div>
        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step1} alt="step1" />
            </div>
            <p>Step 1</p>
          </div>
          <div className="step-content">
            <p>Search for job openings or job postings</p>
            <p>Use 'Current Opening' page to search for job openings</p>
          </div>
        </div>

        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step2} alt="step2" />
            </div>
            <p>Step 2</p>
          </div>
          <div className="step-content">
            <p>Click on the "Apply-Now" for the desired job</p>
            <p>
              This will redirect you to the Apply-Now form, where you can use
              the first step of the form to check wheather your profile exist or
              not
            </p>
          </div>
        </div>

        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step3} alt="step3" />
            </div>
            <p>Step 3</p>
          </div>
          <div className="step-content">
            <p>Fill out the apply-now form</p>
            <p>
              This is a six-step form that includes your personal information,
              academic background, employment history, research project,
              seminars, and short-term courses.
            </p>
          </div>
        </div>

        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step4} alt="step4" />
            </div>
            <p>Step 4</p>
          </div>
          <div className="step-content">
            <p>Use OTP verification to submit the form</p>
            <p>
              To submit the form, confirm the OTP sent to your Gmail account or
              mobile phone.
            </p>
          </div>
        </div>

        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step5} alt="step5" />
            </div>
            <p>Step 5</p>
          </div>
          <div className="step-content">
            <p>Login to your profile</p>
            <p>
              Use the password that was sent to your email to Loggin your
              profile, then apply directly for other job openings.
            </p>
          </div>
        </div>
        <div className="steps-section">
          <div className="step-1">
            <div className="step-icons">
              <img src={step6} alt="step6" />
            </div>
            <p>Step 6</p>
          </div>
          <div className="step-content">
            <p>Edit your profile</p>
            <p>
              Use the password that was sent to your email to Loggin your
              profile, then apply directly for other job openings.
            </p>
          </div>
        </div>
      </div>
      <div className="process-vector-2">
        <img src={vectorbottom} />
      </div>
      <Footers></Footers>
    </>
  );
}

export default Process;
