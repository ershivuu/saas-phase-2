import React, { useEffect, useState } from "react";
import user from "../../assets/logos/user.png";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import { getHeaderInfo } from "../../Admin/Services/FrontendServices";

function Header() {
  const [ribbonContent, setRibbonContent] = useState("");
  const [ribbonBgCol, setRibbonBgCol] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ribbon_content, ribbon_bg_col, image_url } =
          await getHeaderInfo();

        setRibbonContent(ribbon_content || "");
        setRibbonBgCol(ribbon_bg_col || "");
        setImageUrl(image_url || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="fixed-header">
        <div className="ribbon-top" style={{ backgroundColor: ribbonBgCol }}>
          <marquee className="marquee" behavior="scroll" direction="left">
            {ribbonContent}
          </marquee>
        </div>
        <div className="my-header">
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{ marginTop: "-16px" }}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img
                  src={imageUrl}
                  className="University-Logo"
                  alt="University-Logo"
                />
              </a>
              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ paddingLeft: "6px", paddingRight: "6px" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to="/current-opening"
                      className="nav-link active"
                      aria-current="page"
                      target="_top"
                    >
                      Current Opening
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/job-profiles"
                      className="nav-link active"
                      aria-current="page"
                      target="_top"
                    >
                      Job Profiles
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/interview-schedule"
                      className="nav-link"
                      target="_top"
                    >
                      Interview Schedule
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/faq-section" className="nav-link" target="_top">
                      FAQ's
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/drop-cv" className="nav-link" target="_top">
                      Drop CV
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact-us" className="nav-link" target="_top">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/process" className="nav-link" target="_top">
                      Process
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/candidate-login"
                      className="nav-link user-link"
                      target="_top"
                    >
                      <img src={user} id="userlogo" alt="University-Logo" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
