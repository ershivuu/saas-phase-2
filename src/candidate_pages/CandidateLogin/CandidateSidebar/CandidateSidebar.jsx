import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CandidateSidebar.css";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import {
  faBuildingColumns,
  faBriefcase,
  faSearch,
  faUsers,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import candidatesApiService from "../../candidateService";
import { ApiDataProvider } from "..//..//../context/CandidateContext";
function CandidateSidebar() {
  // const [screen, setScreen] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    // Handle image upload logic here
    const uploadedFile = event.target.files[0];
    // Perform necessary validations and set the uploaded image
    setUploadedImage(URL.createObjectURL(uploadedFile));
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await candidatesApiService.fetchCandidateImage();

        if (imageUrl) {
          setSelectedImage(imageUrl);
        } else {
          // If there is no image, set selectedImage to null or use a default image URL
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);
  useEffect(() => {
    // Update isOpen state only if the window width is less than 768
    const checkIsMobile = () => {
      if (window.innerWidth < 821) {
        setIsOpen(false); // Close sidebar by default on mobile
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIsMobile();

    // Event listener to check window width and update isOpen state
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile); // Clean up the event listener
    };
  }, []);

  const handleSideBar = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleLinkClick = (event) => {
    const allSpans = document.querySelectorAll(".set-menu span");
    const dropSpans = document.querySelectorAll(".dropdown-item");
    allSpans.forEach((span) => {
      span.style.color = "inherit";
    });
    dropSpans.forEach((span) => {
      span.style.color = "inherit";
    });
    event.target.style.color = "maroon";
    if (isMobile) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const defaultActiveSpan = document.querySelector(".set-menu span");
    defaultActiveSpan.style.color = "maroon";
  }, []);
  return (
    <>
      <div className="toggle-div">
        {isMobile && (
          <Button className="sidebar-btn" onClick={() => handleSideBar()}>
            ☰
          </Button>
        )}
      </div>

      {/* ------------sidebar start----------------- */}
      <div className="row1">
        <div className={`col-md-2 set-col-2 ${isOpen ? "isClose" : ""}`}>
          <div className="set-sidebar">
            <div>
              <nav>
                <ul className="set-menu" style={{ listStyle: "none" }}>
                  <li>
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected Profile"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUserTie}
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <Link
                      to="/candidate-dashboard/personal-details"
                      onClick={handleLinkClick}
                    >
                      <span> &nbsp;Personal Details</span>
                    </Link>
                  </li>

                  <li>
                    <FontAwesomeIcon
                      className="set-menu-icon"
                      icon={faBuildingColumns}
                    />
                    <Link
                      to="/candidate-dashboard/personal-qualification"
                      onClick={handleLinkClick}
                    >
                      <span> &nbsp;Academic Qualifications</span>
                    </Link>
                  </li>

                  <div className="dropdown show">
                    <a
                      className="btn dropdown-toggle set-a"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ paddingLeft: "0" }}
                    >
                      <FontAwesomeIcon
                        className="set-menu-icon"
                        icon={faBriefcase}
                      />
                      <span>&nbsp;&nbsp; &nbsp;Experience</span>
                    </a>

                    <div
                      className="dropdown-menu master-dd"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <Link
                        to="/candidate-dashboard/candidate-experience"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Experience Data</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-totalexperience"
                        className="dropdown-item "
                        onClick={handleLinkClick}
                      >
                        <span>Total Experience</span>
                      </Link>
                    </div>
                  </div>

                  <div className="dropdown show ">
                    <a
                      className="btn dropdown-toggle set-a"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ paddingLeft: "0" }}
                    >
                      <FontAwesomeIcon
                        className="set-menu-icon"
                        icon={faSearch}
                      />
                      <span>&nbsp;&nbsp; &nbsp;Research Work</span>
                    </a>

                    <div
                      className="dropdown-menu master-dd"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <Link
                        to="/candidate-dashboard/candidate-research"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Research</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-journalPublication"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Journal Publication</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-confrencePublication"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Confrence Publication</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-patents"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Patents</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-copyrights"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Copyrights</span>
                      </Link>
                    </div>
                  </div>

                  <div className="dropdown show">
                    <a
                      className="btn dropdown-toggle set-a"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ paddingLeft: "0", paddingBottom: "1em" }}
                    >
                      <FontAwesomeIcon
                        className="set-menu-icon"
                        icon={faUsers}
                      />
                      <span style={{ paddingLeft: "5px" }}>
                        &nbsp;&nbsp;&nbsp;Seminars
                      </span>
                    </a>

                    <div
                      className="dropdown-menu master-dd"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <Link
                        to="/candidate-dashboard/candidate-organised"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Seminar Organised</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-attend"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>Seminar Attends</span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-otherInfo"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>
                          Seminar Other <br />
                          Information
                        </span>
                      </Link>
                      <Link
                        to="/candidate-dashboard/candidate-otheractivites"
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span>
                          Seminar Other <br /> Activites
                        </span>
                      </Link>
                    </div>
                  </div>

                  <li>
                    <FontAwesomeIcon className="set-menu-icon" icon={faFile} />
                    <Link
                      to="/candidate-dashboard/personal-reference"
                      onClick={handleLinkClick}
                    >
                      <span> &nbsp; Reference/ Resume</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candidate-dashboard/current-opening"
                      style={{ textDecoration: "underline" }}
                      onClick={handleLinkClick}
                    >
                      <span> Current Openings</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateSidebar;
