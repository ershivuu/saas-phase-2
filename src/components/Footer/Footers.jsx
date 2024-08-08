import React, { useState, useEffect } from "react";
import "./Footers.css";
import whitelogo from "../../assets/logos/med-logo-white.png";
import facebook from "../../assets/logos/facebook.png";
import instagram from "../../assets/logos/instagram.png";
import twitter from "../../assets/logos/twitter.png";
import youtube from "../../assets/logos/youtube.png";
import linkedin from "../../assets/logos/linkedin.png";
import { getFooter } from "../../Admin/Services/FrontendServices";
import { Link } from "react-router-dom";

function Footers() {
  const [footerData, setFooterData] = useState({
    id: "",
    footer_col: "",
    box_no: 1,
    contact_address: "",
    contact_email: "",
    contact_1: "",
    contact_2: "",
    link_1: "",
    link_2: "",
    link_3: "",
    link_4: "",
    img_link_1: "",
    img_link_2: "",
    img_link_3: "",
    img_link_4: "",
    footer_logo_url: "",
    img_link_1_url: "",
    img_link_2_url: "",
    img_link_3_url: "",
    img_link_4_url: "",
  });
  const fetchFooter = async () => {
    try {
      const data = await getFooter();
      console.log("Footer data------------------------------>", data);
      setFooterData(data[0]);
    } catch (error) {
      console.error("Error fetching Footer Data:", error);
    }
  };
  useEffect(() => {
    fetchFooter();
  }, []);
  return (
    <>
      <div
        className="inner-warpper"
        style={{ backgroundColor: footerData.footer_col }}
      >
        <div className="footer">
          <div className="f-white-logo">
            <img src={footerData.footer_logo_url} alt="" />
          </div>
          <div className="f-contact-us">
            <p className="c-heading">Contact</p>
            <p>{footerData.contact_address}</p>
            <p>
              <a href={`mailto:${footerData.contact_email}`}>
                {footerData.contact_email}
              </a>
            </p>
            <p>
              <a href={`tel:${footerData.contact_1}`}>{footerData.contact_1}</a>
              ,
              <a href={`tel:${footerData.contact_2}`}>{footerData.contact_2}</a>
            </p>
          </div>
          <div className="further-info">
            <p className="info-heading">Further Information</p>
            <p>Contact Us</p>
            <div className="social-logos">
              <div>
                <a href={footerData.link_1} target="_blank">
                  <img src={footerData.img_link_1_url} alt="" />
                </a>
              </div>
              <div>
                <a href={footerData.link_2} target="_blank">
                  <img src={footerData.img_link_2_url} alt="" />
                </a>
              </div>
              <div>
                <a href={footerData.link_3} target="_blank">
                  <img src={footerData.img_link_3_url} alt="" />
                </a>
              </div>

              <div>
                <a href={footerData.link_4} target="_blank">
                  <img
                    src={footerData.img_link_4_url}
                    style={{ width: "35px", height: "35px" }}
                    alt=""
                  />
                </a>
              </div>
              <div>
                <Link to="/registeradmin">
                  {" "}
                  <button>Register Admin</button>
                </Link>
              </div>
              {/* <div>
              <a href="/" target="_blank">
                <img
                  src={twitter}
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
              </a>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-2">
        <div>
          <p>Designed and Developed By Corusview </p>
        </div>
        <div>
          <p>Privacy Policy | Terms of Use</p>
        </div>
      </div>
    </>
  );
}

export default Footers;
