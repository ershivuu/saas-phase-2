import { useState } from "react";
import React from "react";
import "./CurrentExperience.css";

function CurrentExperience({
  formData,
  setFormData,
  errors,
  setErrors,

  isFresher,
  setIsFresher,
  onCheckboxChange,
}) {
  [isFresher, setIsFresher] = useState(false);
  // const [formData, setFormData] = useState(null);
  const [maxCharacters] = useState(40);
  const handleCheckboxChange = () => {
    setIsFresher(!isFresher);
    onCheckboxChange(!isFresher);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxCharacters) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personalDetails: {
          ...prevFormData.personalDetails,
          [name]: value,
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Maximum ${maxCharacters} characters allowed`,
      }));
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["pdf", "doc", "docx"];
    const maxFileSizeInMB = 2;
    // console.log("<<<<", file);
    if (!file) {
      setErrors({
        candidate_cv: "! CV file is Required",
      });
      return false;
    }
    const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
    if (fileSizeInMB > maxFileSizeInMB) {
      setErrors({
        candidate_cv: `! File size exceeds ${maxFileSizeInMB}MB`,
      });
      return false;
    }
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setErrors({
        candidate_cv:
          "! Invalid file format. Please upload a PDF, DOC, or DOCX file.",
      });
      return false;
    }
    setFormData((prevFormData) => ({
      personalDetails: {
        ...prevFormData.personalDetails,
        candidate_cv: file,
      },
    }));

    setErrors({});

    return true;
  };

  return (
    <>
      <div className="container">
        <form method="post">
          <div className="CE-form">
            <div>
              <h5 className="CE-heading">Current Experience / Upload Resume</h5>
              <p className="CE-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>
            <div>
              <span className="set-checkbox-span">
                <input
                  className="set-checkbox"
                  type="checkbox"
                  id=""
                  name=""
                  checked={isFresher}
                  onChange={handleCheckboxChange}
                />
                &nbsp; Select if you are applying as a Fresher
              </span>
            </div>
            {!isFresher && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    {/* Total Experience */}
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span>Total Experience
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder="00 (i.e Years.Months)"
                        name="total_experience"
                        id=""
                        onChange={handleInputChange}
                        value={formData.total_experience}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.total_experience}
                    </span>
                  </div>
                  <div className="col-md-6">
                    {/* Total Research */}
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span>Total Research
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder=""
                        name="total_research_exp"
                        id=""
                        onChange={handleInputChange}
                        value={formData.total_research_exp}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.total_research_exp}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span>Total Industry
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder="00 (i.e Years.Months)"
                        name="total_industrial_exp"
                        id=""
                        onChange={handleInputChange}
                        value={formData.total_industrial_exp}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.total_industrial_exp}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span>Current Organization
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder=""
                        name="current_organization"
                        id=""
                        onChange={handleInputChange}
                        value={formData.current_organization}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.current_organization}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span> Current Designation
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder=""
                        name="current_designation"
                        id=""
                        onChange={handleInputChange}
                        value={formData.currentDesignation}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.current_designation}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <div className="form-section">
                      <label className="SetLabel-Name">
                        <span></span>Current Salary
                      </label>
                      <input
                        className="set-input"
                        type="text"
                        placeholder=""
                        name="current_salary"
                        id=""
                        onChange={handleInputChange}
                        value={formData.current_salary}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.current_salary}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="uploadfile-section">
              <label className="SetLabel-Name">
                <span>*</span>Upload your Resume:
              </label>
              <p className="uploadresume-subheading">
                To upload your resume here:(maximum size 2MB, PDF, DOC and DOCX
                format only)
              </p>
              {/* <input type="file" name="candidate_cv" onChange={handleFileChange} /> */}
              <input
                type="file"
                name="candidate_cv"
                onChange={handleFileChange}
                accept=".pdf, .doc, .docx"
              />
            </div>
            <span className="error-message">{errors.candidate_cv}</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default CurrentExperience;
