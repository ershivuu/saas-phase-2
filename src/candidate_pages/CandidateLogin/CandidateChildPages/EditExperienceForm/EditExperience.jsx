import React, { useState, useEffect } from "react";
import "./EditExperience.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import plusicon from "../../../../assets/logos/plus.png";
import minusicon from "../../../../assets/logos/minus.png";
import candidatesApiService from "../../../candidateService";
// import { useApiData } from "../../../../context/CandidateContext";
import Notification from "../../../../Notification/Notification";
function EditExperience() {
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
  const [updateField, setUpdateField] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateNewField, setUpdateNewField] = useState({});
  const [educations, setEducations] = useState([]);
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedData = await candidatesApiService.getExperienceById();
      // console.log("check response",fetchedData)
      setEducations(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalData();
    fetchData();
  }, []);

  // useEffect(() => {
  //   setData(apiData);
  // }, [apiData]);
  // console.log("educatons",educations);
  // console.log("education222222s", educations);

  const handleAddEducation = (e) => {
    e.preventDefault();
    setEducations((prevEducations) => [
      ...prevEducations,
      {
        company_experience_name: "",
        designation: "",
        gross_pay: "",
        exp_work_from: "",
        exp_work_to: "",
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    setEducations((prevEducations) =>
      prevEducations.filter((_, i) => i !== index)
    );
  };

  // const handleExperienceArrayChange = (index, field, value) => {
  //   const updatedExperiences = [...educations.candidate_experiences];
  //   const experienceId = updatedExperiences[index].id;
  //   updatedExperiences[index][field] = value;
  //   setEducations({
  //     ...educations,
  //     candidate_experiences: updatedExperiences,
  //   });
  //   console.log("handlefild", field, value, updateField);
  //   console.log("experiece id", experienceId);
  //   setUpdateField((prev) => ({
  //     ...prev,
  //     [field]: value.toString(),
  //     id: experienceId,
  //   }));
  //   setEducations((prev) => ({ ...prev, [field]: value.toString() }));
  // };

  const handleExperienceArrayChange = (index, field, value) => {
    const updatedEducations = educations.map((experience, idx) => {
      if (idx === index) {
        return {
          ...experience,
          [field]: value,
        };
      }
      return experience;
    });
    const experienceId = updatedEducations[index].id;
    // console.log("Updated State:", updatedEducations);
    setUpdateField((prev) => ({
      ...prev,
      [field]: value.toString(),
      id: experienceId,
    }));
    setEducations((prev) => {
      const updatedEducation = [...prev];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value.toString(),
      };
      return updatedEducation;
    });
  };
  // console.log("updateField>>>>>>>>", updateField);

  //   const handleExperienceChange = (index, field, value) => {
  //     const updatedExperiences = [...educations.total_academic_exp];
  //     // const experienceId = updatedExperiences[index].id;
  //     updatedExperiences[index][field] = value;
  //     setEducations({
  //         ...educations,

  //     });
  //     console.log("handlefild", field, value, updateNewField)
  //      console.log("experiece id",  experienceId)
  //     setUpdateNewField(prev => ({ ...prev, [field]: value.toString() }))
  //     setEducations(prev => ({ ...prev, [field]: value.toString() }))
  // };

  const handleExperienceChange = (fieldName, value) => {
    // console.log("handlefild", fieldName, value, updateNewField);
    setUpdateNewField((prev) => ({ ...prev, [fieldName]: value.toString() }));
    setData((prev) => ({ ...prev, [fieldName]: value.toString() }));
  };

  // const handleSaveChanges = async () => {
  //   try {

  //     console.log(updateField);

  //     await candidatesApiService.updateCandidateExperience( {
  //       experiences: [updateField],
  //     });
  //     await candidatesApiService.updateCandidatePersonalInfo(

  //       updateNewField

  //     );
  //     setUpdateField({});
  //     setUpdateNewField({});
  //     // fetchData();
  //   } catch (error) {
  //     console.error("Error saving changes:", error.message);
  //     setNotificationMessage("Error saving changes.");
  //     setNotificationSeverity("error");
  //     setNotificationOpen(true);
  //   }
  // };

  const handleSaveChanges = async () => {
    try {
      await candidatesApiService.updateCandidateExperience({
        experiences: [updateField],
      });

      await candidatesApiService.updateCandidatePersonalInfo(updateNewField);
      setUpdateField({});
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

  const formatDateFrom = (dateString) => {
    // console.log("dateString",dateString);
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return ""; // Handle invalid dates
    }
    const year = dateObject.getFullYear().toString();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // console.log("final check experirenxes",educations)
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
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
                Experience &nbsp;{" "}
                <FontAwesomeIcon className="edit-pen-icon" icon={faPen} />
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            {/* Experience */}

            {educations.map((experience, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ margin: "24px 0" }} />}
                <div className="row">
                  <div>
                    {educations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(index)}
                        className="minus-buttons"
                      >
                        <img
                          src={minusicon}
                          alt="Remove candidate_experiences"
                        />
                      </button>
                    )}
                    {index === educations.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add candidate_experiences" />
                      </button>
                    )}
                  </div>

                  <div className="col-md-4">
                    {/* Name of Institute / Company */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Name of Institute / Company
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="company_experience_name"
                        id=""
                        value={experience.company_experience_name}
                        onChange={(e) =>
                          handleExperienceArrayChange(
                            index,
                            "company_experience_name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Designation */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Designation
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="designation"
                        id=""
                        value={experience.designation}
                        onChange={(e) =>
                          handleExperienceArrayChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Current Gross Pay (Per Month)*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Current Gross Pay (Per Month){" "}
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="gross_pay"
                        id=""
                        value={experience.gross_pay}
                        onChange={(e) =>
                          handleExperienceArrayChange(
                            index,
                            "gross_pay",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    {/* Date From*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Date From
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        name="exp_work_from"
                        id=""
                        value={formatDateFrom(experience.exp_work_from)}
                        onChange={(e) =>
                          handleExperienceArrayChange(
                            index,
                            "exp_work_from",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Date To */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Date To
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        name="exp_work_to"
                        id=""
                        value={formatDateFrom(experience.exp_work_to)}
                        onChange={(e) =>
                          handleExperienceArrayChange(
                            index,
                            "exp_work_to",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

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

export default EditExperience;
