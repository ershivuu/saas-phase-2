import React, { useState, useEffect } from "react";
// import "./EditExperience.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

// import candidatesApiService from "../../../candidateService";
import candidatesApiService from "../../../../candidateService";
// import { useApiData } from "../../../../../context/CandidateContext";
import Notification from "../../../../../Notification/Notification";
function TotalExperienceForm() {
  // const [educations, setEducations] = useState({
  //   candidate_experiences: [],
  //   total_academic_exp: "",
  //   total_industrial_exp: "",
  //   benefits_accommodation: "",
  //   benefits_transportation: "",
  //   benefits_others: "",
  //   benefits_food: "",
  //   benefits_mediclaim: "",
  // });

  // const { apiData } = useApiData();
  // const [updateField, setUpdateField] = useState({});
  // const [loading, setLoading] = useState(true);
  const [updateNewField, setUpdateNewField] = useState({});
  // const [educations, setEducations] = useState([]);
  const [data, setData] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const fetchPersonalData = async () => {
    try {
      // setLoading(true);
      const fetchedData = await candidatesApiService.getCandidateById();
      setData(fetchedData);
      // console.log("fetchedData", fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  useEffect(() => {
    fetchPersonalData();
    
  }, []);

//   useEffect(() => {
//     setData(apiData);
//   }, [apiData]);


  const handleExperienceChange = (fieldName, value) => {
    // console.log("handlefild", fieldName, value, updateNewField);
    setUpdateNewField((prev) => ({ ...prev, [fieldName]: value.toString() }));
    setData((prev) => ({ ...prev, [fieldName]: value.toString() }));
  };

 
  const handleSaveChanges = async () => {
    try {
    //   await candidatesApiService.updateCandidateExperience({
    //     experiences: [updateField],
    //   });

      await candidatesApiService.updateCandidatePersonalInfo(updateNewField);
      // setUpdateField({});
      setUpdateNewField({});
      setNotificationMessage("Changes saved successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      // console.log("Changes saved successfully.");
    } catch (error) {
      console.error("Error saving changes:", error.message);
      setNotificationMessage("Error saving changes.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };


  return (
    <>
      {/* {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )} */}
      <form id="myForm" onSubmit={handleSaveChanges}>
        <div
          className="container"
          style={{
            marginTop: "90px",
          }}
        >
          <div>
            <div>
              <h5 className="UD-heading">
              Total Experience &nbsp;{" "}
                <FontAwesomeIcon className="edit-pen-icon" icon={faPen} />
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

       

            {/* Total Experience */}

            <div>
              <p className="HS-heading">Total Experience</p>
            </div>

            <div className="row" style={{ marginTop: "-14px" }}>
              <div className="col-md-4">
                {/* *Academic Experience */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Academic Experience
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder="In Years"
                    name="total_academic_exp"
                    id=""
                    value={data?.total_academic_exp || ""}
                    onChange={(e) =>
                      handleExperienceChange(
                        "total_academic_exp",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* *Industry Experience*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Industry Experience
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder="In Years"
                    name="total_industrial_exp"
                    id=""
                    value={data?.total_industrial_exp || ""}
                    onChange={(e) =>
                      handleExperienceChange(
                        "total_industrial_exp",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>

            {/* Other Benefits */}

            <div>
              <p className="HS-heading">Other Benefits</p>
            </div>

            <div className="row" style={{ marginTop: "-14px" }}>
              <div className="col-md-4">
                {/* Accommodation */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>accommodation
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_accommodation"
                    id=""
                    value={data?.benefits_accommodation || ""}
                    onChange={(e) =>
                      handleExperienceChange(
                        "benefits_accommodation",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Transportation*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>transportation
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_transportation"
                    id=""
                    value={data?.benefits_transportation || ""}
                    onChange={(e) =>
                      handleExperienceChange(
                        "benefits_transportation",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/*Food*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>food
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_food"
                    id=""
                    value={data?.benefits_food || ""}
                    onChange={(e) =>
                      handleExperienceChange("benefits_food", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* Mediclaim */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>mediclaim
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_mediclaim"
                    id=""
                    value={data?.benefits_mediclaim || ""}
                    onChange={(e) =>
                      handleExperienceChange(
                        "benefits_mediclaim",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Others*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>others
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="exp_benefits_others"
                    id=""
                    value={data?.benefits_others || ""}
                    onChange={(e) =>
                      handleExperienceChange("benefits_others", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            <div className="edit-save-btn">
              <button
                className="savebtn"
                type="button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default TotalExperienceForm;
