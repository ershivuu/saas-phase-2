import React, { useState, useEffect } from "react";
import "./CandidateHeader.css";
import medilogo from "../../../assets/logos/medi-logo.png";
import logout from "../../../assets/logos/Logout.png";
// import Reset from "../../../assets/logos/Reset.png";
import { getHeaderInfo } from "../../../Admin/Services/FrontendServices";

import { useNavigate } from "react-router-dom";
function CandidateHeader() {
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/candidate-login");
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
  return (
    <>
      <div className="admin-header fixed-top">
        <div>
          <img className="admin-logo" src={imageUrl} alt="" />
        </div>
        <div id="logout-btn">
          <button onClick={() => handleLogout()}>
            <img src={logout} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CandidateHeader;
