import React from "react";
import "./Logout.css";
import corusview from "../../assets/logos/corusview.png";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function SuperLogout({ handleLogout }) {
  return (
    <>
      <div className="admin-header fixed-top">
        <div>
          <img className="admin-logo" src={corusview} alt="" />
        </div>
        <div id="logout-btn">
          <button
            onClick={() => {
              handleLogout();
              sessionStorage.setItem("isLoggedIn", false);
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="show-dashboard"></div>
    </>
  );
}

export default SuperLogout;
