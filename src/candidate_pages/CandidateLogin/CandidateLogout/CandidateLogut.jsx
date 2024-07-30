import React from "react";
import "./CandidateLogut.css";
// import medilogo from "../../../assets/logos/medi-logo.png";
// import CandidateDashboard from "../CandidateDashboard/CandidateDashboard";
function CandidateLogut({ handleLogout }) {
  return (
    <>
      {/* <div className="admin-header">
        <div>
          <img className="admin-logo" src={medilogo} alt="" />
        </div>
        <div id="logout-btn">
          <button
            onClick={() => {
              sessionStorage.clear();
            
              sessionStorage.clear();
              handleLogout();
            }}
          >
            LOGOUT
          </button>
        </div>
      </div> */}

      <div className="show-dashboard">
        {/* <CandidateDashboard></CandidateDashboard> */}
      </div>
    </>
  );
}

export default CandidateLogut;
