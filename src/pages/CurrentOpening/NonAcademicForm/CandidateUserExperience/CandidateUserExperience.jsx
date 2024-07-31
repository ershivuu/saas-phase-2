import React from "react";
import "./CandidateUserExperience.css";
import plusicon from "../../../../assets/logos/plus.png";
import minusicon from "../../../../assets/logos/minus.png";

function CandidateUserExperience({ formValues, setFormValues, errors, setErrors }) {
  const handleAddExperience = (e) => {
    e.preventDefault();
    setFormValues((prevExperience) => ({
      UserDetails: {
        ...prevExperience.UserDetails,
        experiences: [
          ...prevExperience.UserDetails.experiences,
          {
            company_experience_name: "",
            designation: "",
            gross_pay: "",
            exp_work_from: "",
            exp_work_to: "",
          },
        ],
      },
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormValues((prevExperience) => ({
      UserDetails: {
        ...prevExperience.UserDetails,
        experiences: prevExperience.UserDetails.experiences.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleInputChange = (index, event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : " ! This field is required",
    }));
    const { name, value } = event.target;
    setFormValues((prevExperience) => ({
      UserDetails: {
        ...prevExperience.UserDetails,
        experiences: prevExperience.UserDetails.experiences.map(
          (experience, i) =>
            i === index ? { ...experience, [name]: value } : experience
        ),
      },
    }));
  };

  const handleTotalExperienceChange = (event) => {
    setErrors({
      ...errors,
      total_academic_exp: "",
      total_industrial_exp: "",
      accommodation: "",
      transportation: "",
      food: "",
      mediclaim: "",
      others: "",
    });
    const { name, value } = event.target;
    setFormValues((prevExperience) => ({
      UserDetails: {
        ...prevExperience.UserDetails,
        [name]: value,
      },
    }));
  };
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  return (
    <>
      <form>
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            <div>
              <h5 className="UD-heading">
                Experience
                {/* <button onClick={handleAddExperience} className="plus-buttons">
                  <img src={plusicon} />
                </button> */}
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            {/* Experience */}
            {formValues.experiences.map((experience, index) => (
              <div key={index}>
                {" "}
                {index > 0 && <hr style={{ margin: '24px 0' }} />}
                <div className="row">
                  <div>
                    {formValues.experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="minus-buttons"
                      >
                        <img src={minusicon} alt="Remove Experience" />
                      </button>
                    )}
                    {index === formValues.experiences.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add Experience" />
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Name of Institute / Company
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="company_experience_name"
                        value={experience.company_experience_name}
                        onChange={(e) => handleInputChange(index, e)}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.company_experience_name}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Designation
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="designation"
                        value={experience.designation}
                        onChange={(e) => handleInputChange(index, e)}
                      ></input>
                    </div>
                    <span className="error-message">{errors.designation}</span>
                  </div>

                  <div className="col-md-4">
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Date From
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder=" MM/DD/YYYY"
                        name="exp_work_from"
                        value={experience.exp_work_from}
                        onChange={(e) => handleInputChange(index, e)}
                      ></input>
                    </div>
                    <span className="error-message">
                      {errors.exp_work_from}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span>*</span>Date To
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder="MM/DD/YYYY "
                        name="exp_work_to"
                        value={experience.exp_work_to}
                        onChange={(e) => handleInputChange(index, e)}
                      ></input>
                    </div>
                    <span className="error-message">{errors.exp_work_to}</span>
                  </div>

                  {index === 0 && (
                    <div className="col-md-4">
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span>*</span>Current Gross Pay (Per Month)
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="gross_pay"
                          value={experience.gross_pay}
                          onChange={(e) => handleInputChange(index, e)}
                        ></input>
                      </div>
                      <span className="error-message">{errors.gross_pay}</span>
                    </div>
                  )}
                </div>
                {/* {index > 0 && (
              <button
                onClick={() => handleRemoveExperience(index)}
                className="minus-buttons"
              >
                Remove
              </button>
            )} */}
              </div>
            ))}

            {/* Experience */}

            {/* Total Experience */}
            <div style={{ marginTop: "40px" }}>
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
                    value={formValues.total_academic_exp}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
                <span className="error-message">
                  {errors.total_academic_exp}
                </span>
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
                    value={formValues.total_industrial_exp}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
                <span className="error-message">
                  {errors.total_industrial_exp}
                </span>
              </div>
            </div>

            {/* Other Benefits */}
            <div style={{ marginTop: "40px" }}>
              <p className="HS-heading">Other Benefits</p>
            </div>

            <div className="row" style={{ marginTop: "-14px" }}>
              <div className="col-md-4">
                {/* benefits_accommodation */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Accommodation
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_accommodation"
                    value={formValues.benefits_accommodation}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* benefits_transportation*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Transportation
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_transportation"
                    value={formValues.benefits_transportation}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/*benefits_food*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Food
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_food"
                    value={formValues.benefits_food}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* benefits_mediclaim */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Mediclaim
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_mediclaim"
                    value={formValues.benefits_mediclaim}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* benefits_others*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Others
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="benefits_others"
                    value={formValues.benefits_others}
                    onChange={handleTotalExperienceChange}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <button type="submit">
          Submit
        </button> */}
      </form>
    </>
  );
}

export default CandidateUserExperience;
