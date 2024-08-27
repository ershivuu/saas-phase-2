import React, { useEffect, useState } from "react";
import user from "../../assets/logos/user.png";
import { Outlet, Link } from "react-router-dom";
import "./Header.css";
import { getHeaderInfo } from "../../Admin/Services/FrontendServices";
import { verifySlug, getUniqueSlug } from "../../slugs/getSlug";

function Header() {
  const slugs = getUniqueSlug();
  const [ribbonContent, setRibbonContent] = useState("");
  const [ribbonBgCol, setRibbonBgCol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    verifySlug();
  });
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
              <Link className="navbar-brand" to={`/${slugs}/`}>
                <img
                  src={imageUrl}
                  className="University-Logo"
                  alt="University-Logo"
                />
              </Link>
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
                      to={`/${slugs}/openings`}
                      className="nav-link active"
                      aria-current="page"
                      target="_top"
                    >
                      Current Opening
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/job-profiles`}
                      className="nav-link active"
                      aria-current="page"
                      target="_top"
                    >
                      Job Profiles
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/interview-schedule`}
                      className="nav-link"
                      target="_top"
                    >
                      Interview Schedule
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/faq-section`}
                      className="nav-link"
                      target="_top"
                    >
                      FAQ's
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/drop-cv`}
                      className="nav-link"
                      target="_top"
                    >
                      Drop CV
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/contact-us`}
                      className="nav-link"
                      target="_top"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/process`}
                      className="nav-link"
                      target="_top"
                    >
                      Process
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/${slugs}/candidate-login`}
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
