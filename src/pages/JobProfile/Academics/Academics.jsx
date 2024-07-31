import React, { useState, useEffect } from "react";
import "./Academics.css";
import Header from "../../../components/Header/Header";
import Footers from "../../../components/Footer/Footers";
import Accordion from "react-bootstrap/Accordion";
import adminApiService from "../../adminApiService";

function Academics() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [jobprofileData, setJobprofileData] = useState([]);
  const [activeKey, setActiveKey] = useState("0");

  const fetchData = async () => {
    try {
      const response = await adminApiService.getJobProfileByCnD(
        selectedDepartment
      );
      console.log("API response:", response.jobprofileData);
      setJobprofileData(response.jobprofileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDepartment]);

  const handleAccordionToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };

  // Extract unique department names from jobprofileData
  const uniqueDepartments = Array.from(
    new Set(
      jobprofileData.map((profile) => profile.department_master.dept_name)
    )
  );

  return (
    <>
      <Header />
      <div className="apply-for-dean">
        <div className="post-name">
          <p>Job Profiles</p>
        </div>
        <div></div>
        <div></div>
        <div className="apply-btn-jp">
          <button type="button">
            <a href="/apply-now">Apply Now</a>
          </button>
        </div>
      </div>
      <div className="courses">
        {/* <p>
          Engineering | Management | Computer Applications Journalism | Film
          Production | Pharmacy | Physiotherapy | Hotel Management | Design |
          Education| Law | Multimedia & Animation | Physical Education |
          Sciences | Fashion | Research & Development | Polytechnic
        </p> */}
      </div>

      <div className="jd-dropdown top-spacing">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          {uniqueDepartments.map((dept, index) => (
            <div class="accordion-item" key={index}>
              <h2 class="accordion-header" id={`flush-heading${index}`}>
                <button
                  class={`accordion-button collapsed dept-name`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${index}`}
                  onClick={() => handleAccordionToggle(index.toString())}
                >
                  {dept}
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                class={`accordion-collapse collapse ${
                  activeKey === index.toString() ? "show" : ""
                }`}
                aria-labelledby={`flush-heading${index}`}
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div className="table-dropdown">
                    <div className="drp-table table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Designation</th>
                            <th scope="col">Qualification and experience</th>
                            <th scope="col">Highly desirable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobprofileData
                            .filter(
                              (profile) =>
                                profile.department_master.dept_name === dept
                            )
                            .map((profile, profileIndex) => (
                              <tr key={profileIndex}>
                                <th scope="row">
                                  {profile.applied_post_master.post_name}
                                </th>
                                <td>{profile.education_require}</td>
                                <td>{profile.qualification_require}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footers />
    </>
  );
}

export default Academics;
