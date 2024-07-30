import React, { useState } from "react";
import "./FrontendSidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function FrontendSidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <Link to="/FrontendDashboard/EditHeader">
                <a>Header</a>
              </Link>

              <button className="dropdown-btn" onClick={handleDropdown}>
                Home Section
                <span className="custom-btn">
                  {dropdownOpen ? '-' : '+'}
                  {/* {dropdownOpen ? "▲" : "▼"} */}
                </span>
              </button>
              <div
                className={`dropdown-container ${dropdownOpen ? "active" : ""}`}
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/FrontendDashboard/EditHomePage" onClick={closeDropdown}>
                  <a href="#">Home </a>
                </Link>
                <Link to="/FrontendDashboard/Section1" onClick={closeDropdown}>
                  <a href="#">Section 1 </a>
                </Link>
                <Link to="/FrontendDashboard/Section2" onClick={closeDropdown}>
                  <a href="#">Section 2 </a>
                </Link>
                <Link to="/FrontendDashboard/Section3" onClick={closeDropdown}>
                  <a href="#">Section 3 </a>
                </Link>

                <Link to="/FrontendDashboard/Section4" onClick={closeDropdown}>
                  <a href="#">Section 4 </a>
                </Link>
                <Link to="/FrontendDashboard/Section5" onClick={closeDropdown}>
                  <a href="#">Section 5 </a>
                </Link>
              </div>

              <Link to="/FrontendDashboard/EditInterviewSchedule">
                <a href="#"> Interview Schedule </a>
              </Link>

              <Link to="/FrontendDashboard/FaqSection">
                <a href="#">FAQ</a>
              </Link>
              <Link to="/FrontendDashboard/EditContact">
                <a href="#"> Contact </a>
              </Link>

              <Link to="/FrontendDashboard/EditFooter">
                <a href="#">Footer</a>
              </Link>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default FrontendSidebar;
