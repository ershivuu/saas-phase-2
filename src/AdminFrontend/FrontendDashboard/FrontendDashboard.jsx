import React, { useState, useEffect } from "react";

import logout from "../../assets/logos/Logout.png";
import FrontendSidebar from "../FrontendSidebar/FrontendSidebar";
import { Outlet} from "react-router-dom";
import { getHeaderInfo } from "../FrontendServices";
import { useNavigate } from "react-router-dom";
function FrontendDashboard({ onLogout }) {
  const [imageUrl, setImageUrl] = useState("");
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
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/admin-login");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: "5em",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <div >
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
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            margin: 0,
            height: "85vh",
            width: "100%",
          }}
        >
          <div
            style={{
              maxWidth: "17%",
              flexShrink: 0,
              textAlign: "left",
              // overflowY: "auto",
              // overflowX: "hidden",
            }}
          >
            <FrontendSidebar />
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              marginTop: "3%",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontendDashboard;
