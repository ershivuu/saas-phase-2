import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footers from "../../components/Footer/Footers";
import "./InterviewSchedule.css";
import logo1 from "../../assets/logos/academic.png";
import logo2 from "../../assets/logos/administration.png";
import logo3 from "../../assets/logos/research.png";
import logo4 from "../../assets/logos/technical.png";
import ScheduledAcademics from "./ScheduledAcademics/ScheduledAcademics";
import ScheduledAdministration from "./ScheduledAdministration/ScheduledAdministration";
import ScheduledResearch from "./ScheduledResearch/ScheduledResearch";
import ScheduledTechnical from "./ScheduledTechnical/ScheduledTechnical";
import { getInterviewInfo } from "../../AdminFrontend/FrontendServices";
function InterviewSchedule() {
  // ...........................Notes Data...................................

  // ...........................Notes Data...................................
  const [selectedComponent, setSelectedComponent] = useState();
  const [note, setNote] = useState("");
  const [repTime, setRepTime] = useState("");
  const [venue, setVenue] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [facilities, setFacilities] = useState("");
  const [OfferedPackage, setOfferedPackage] = useState("");
  const [heading, setheading] = useState("");
  const [subHeading, setsubHeading] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const showComponent = (componentName) => {
    setSelectedComponent(componentName);
  };
  let componentToShow;
  switch (selectedComponent) {
    case "Component1":
      componentToShow = <ScheduledAcademics />;
      break;
    case "Component2":
      componentToShow = <ScheduledResearch />;
      break;
    case "Component3":
      componentToShow = <ScheduledAdministration />;
      break;
    case "Component4":
      componentToShow = <ScheduledTechnical />;
      break;
    default:
      componentToShow = <ScheduledAcademics />;
      break;
  }

  const fetchInterviewInfo = async () => {
    try {
      const response = await getInterviewInfo();
      console.log("check data interview>>>>>", response);
      setNote(response.note);
      setRepTime(response.reporting_time);
      setVenue(response.am_venue);
      setContactNo(response.contact);
      setFacilities(response.facilities);
      setOfferedPackage(response.offered_package);
      setheading(response.banner_header);
      setsubHeading(response.banner_content);
      setBackgroundImg(response.banner_img);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchInterviewInfo();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="top-spacing">
        <div
          className="is-background"
          style={{
            background: `radial-gradient(
              96.31% 96.31% at 54.31% 100%,
              rgba(0, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0) 100%
            ),url(${backgroundImg})`,
          }}
        >
          <div className="data">
            <p>
              {/* <span>INTERVIEW SCHEDULE</span> */}
              <span>{heading}</span>
            </p>
            <p className="sub-heading">
              {/* “ Be your true self, grow and make a difference.” */}"
              {subHeading}"
            </p>
          </div>
        </div>
        <div className="is-header pc">
          <div className="row header-item">
            <div className="col-md-3">
              <button
                className="a1 a11"
                onClick={() => showComponent("Component1")}
              >
                <img
                  className="is-header-logo"
                  src={logo1}
                  alt="Academics Logo"
                />
                ACADEMICS
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="a1"
                onClick={() => showComponent("Component2")}
              >
                <img
                  className="is-header-logo"
                  src={logo3}
                  alt="Research Logo"
                />
                RESEARCH
              </button>
            </div>
            <div className="col-md-3">
              <button onClick={() => showComponent("Component3")}>
                <img
                  className="is-header-logo"
                  src={logo2}
                  alt="Administration Logo"
                />
                ADMINISTRATION
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="a1"
                onClick={() => showComponent("Component4")}
              >
                <img
                  className="is-header-logo"
                  src={logo4}
                  alt="Technical Logo"
                />
                TECHNICAL
              </button>
            </div>
          </div>
        </div>
        <div className="for-mobile">
          <ul>
            <li>
              <button onClick={() => showComponent("Component1")}>
                <img
                  className="is-header-logo"
                  src={logo1}
                  alt="Academics Logo"
                />
                ACADEMICS
              </button>
            </li>
            <li>
              <button onClick={() => showComponent("Component2")}>
                <img
                  className="is-header-logo"
                  src={logo3}
                  alt="Research Logo"
                />
                RESEARCH
              </button>
            </li>
            <li>
              <button onClick={() => showComponent("Component3")}>
                <img
                  className="is-header-logo"
                  src={logo2}
                  alt="Administration Logo"
                />
                ADMINISTRATION
              </button>
            </li>
            <li>
              <button onClick={() => showComponent("Component4")}>
                <img
                  className="is-header-logo"
                  src={logo4}
                  alt="Technical Logo"
                />
                TECHNICAL
              </button>
            </li>
          </ul>
        </div>
        <div>{componentToShow}</div>
        <div className="notes">
          <p>
            NOTE :- <span> {note}</span>
          </p>
          <p>
            Reporting Time :- <span>{repTime}</span>
          </p>
          <p>
            AMVenue :- <span>{venue}</span>
          </p>
          <p>
            Contact Number :- <span>{contactNo}</span>
          </p>
          <p>
            Facilities :- <span>{facilities}</span>{" "}
          </p>
          {/* <p>Salary Shall not be constraint for deserving condidates.</p> */}
          <p>{OfferedPackage}</p>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default InterviewSchedule;
