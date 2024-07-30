import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./UserQualification.css";
import apiService from "../../../../Services/ApiServices";
function UserQualification({ formValues, setFormValues, errors, setErrors }) {
  // const [formValues, setFormValues] = useState({
  //   educations: [
  //     {
  //       exam_types_master_id: 7,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       year_end: '',
  //       grade_division: '',
  //       grade_percent: '',
  //     }, // educations[0] mein highSchool ka data
  //     {
  //       exam_types_master_id: 8,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       year_end: '',
  //       grade_division: '',
  //       grade_percent: '',
  //       stream: '',
  //     }, // educations[1] mein higherSecondary ka data
  //     {
  //       exam_types_master_id: 2,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       degree_types_name: '',
  //       year_end: '',
  //       grade_percent: '',
  //       specialization_area_1: '',
  //     }, // educations[2] mein Graduation ka data
  //     {
  //       exam_types_master_id: 3,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       degree_types_name: '',
  //       year_end: '',
  //       grade_percent: '',
  //       specialization_area_1: '',
  //     }, // educations[3] mein PostGraduation ka data
  //     {
  //       exam_types_master_id: 5,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       degree_types_name: '',
  //       year_end: '',
  //       grade_percent: '',
  //       specialization_area_1: '',
  //     }, // educations[4] mein MPHIL ka data
  //     {
  //       exam_types_master_id: 4,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       degree_types_name: '',
  //       year_end: '',
  //       grade_percent: '',
  //       specialization_area_1: '',
  //       specialization_area_2: '',
  //       specialization_area_3: '',
  //     }, // educations[5] mein Phd ka data
  //     {
  //       exam_types_master_id: 11,

  //       year_end: '',
  //     }, // educations[6] mein Gate ka data
  //     {
  //       exam_types_master_id: 9,

  //       year_end: '',
  //     },// educations[7] mein Neet ka data
  //     {
  //       exam_types_master_id: 1,
  //       country: '',
  //       year_start: '',
  //       institute_name: '',
  //       board_university_name: '',
  //       year_end: '',
  //       grade_division: '',
  //       grade_percent: '',
  //       stream: '',
  //     },// educations[8] mein Diploma ka data
  //   ],
  // });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    apiService
      .getCountries()
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleHighSchoolChange = (field, value) => {
    setErrors({
      ...errors,
      country: "",
      year_start: "",
      institute_name: "",
      board_university_name: "",
      year_end: "",
      grade_division: "",
      grade_percent: "",
      stream: "",
    });
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          {
            ...prevFormValues.UserDetails.educations[0],
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(1),
        ],
      },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value ? "" : "This field is required",
    }));
  };

  const handleHigherSecondaryChange = (field, value) => {
    setErrors({
      ...errors,
      country: "",
      year_start: "",
      institute_name: "",
      board_university_name: "",
      year_end: "",
      grade_division: "",
      grade_percent: "",
      stream: "",
    });
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 1),
          {
            ...prevFormValues.UserDetails.educations[1], // Higher Secondary ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(2), // Baaki ke education categories rehne do
        ],
      },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value ? "" : "This field is required",
    }));
  };
  const handleGraduationChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 2), // High School and Higher Secondary ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[2], // Graduation ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(3), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handlePostGraduationChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 3), // High School, Higher Secondary, and Graduation ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[3], // PostGraduation ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(4), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handleMPHILChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 4), // High School, Higher Secondary, Graduation, and PostGraduation ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[4], // MPHIL ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(5), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handlePhdChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 5), // High School, Higher Secondary, Graduation, PostGraduation, and MPHIL ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[5], // Phd ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(6), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handleGateChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 6), // High School, Higher Secondary, Graduation, PostGraduation, and MPHIL ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[6], // Phd ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(7), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handleNeetChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 7), // High School, Higher Secondary, Graduation, PostGraduation, and MPHIL ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[7], // Phd ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(8), // Baaki ke education categories rehne do
        ],
      },
    }));
  };
  const handleDiplomaChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      UserDetails: {
        ...prevFormValues.UserDetails,
        educations: [
          ...prevFormValues.UserDetails.educations.slice(0, 8), // High School, Higher Secondary, Graduation, PostGraduation, and MPHIL ke data rehne do
          {
            ...prevFormValues.UserDetails.educations[8], // Phd ke data ko update karo
            [field]: value,
          },
          ...prevFormValues.UserDetails.educations.slice(9), // Baaki ke education categories rehne do
        ],
      },
    }));
  };

  return (
    <>
      <form method="post">
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            <div>
              <h5 className="UD-heading">
                Academic Professional Qualifications
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            {/* High School */}
            <div>
              <p className="HS-heading">High School</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[0].country}
                    onChange={(e) =>
                      handleHighSchoolChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.country}</span>
              </div>
              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[0].year_start}
                    onChange={(e) =>
                      handleHighSchoolChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.year_start}</span>
              </div>
              <div className="col-md-4">
                {/* *School*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>School
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[0].institute_name}
                    onChange={(e) =>
                      handleHighSchoolChange("institute_name", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message"> {errors.institute_name}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* *Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[0].board_university_name}
                    onChange={(e) =>
                      handleHighSchoolChange(
                        "board_university_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <span className="error-message">
                  {errors.board_university_name}
                </span>
              </div>

              <div className="col-md-4">
                {/* *Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[0].year_end}
                    onChange={(e) =>
                      handleHighSchoolChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.year_end}</span>
              </div>

              <div className="col-md-4">
                {/* *Division (First/Second/Third)*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Division (First/Second/Third)
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_division"
                    id=""
                    value={formValues.educations[0].grade_division}
                    onChange={(e) =>
                      handleHighSchoolChange("grade_division", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.grade_division}</span>
              </div>
            </div>
            {/* VALIDATION IS NOT WORKING */}
            <div className="row">
              <div className="col-md-4">
                {/* *Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[0].grade_percent}
                    onChange={(e) =>
                      handleHighSchoolChange("grade_percent", e.target.value)
                    }
                  ></input>
                </div>
              </div>
              <span className="error-message">{errors.grade_percent}</span>
            </div>

            {/* Higher secondary */}

            <div>
              <p className="HS-heading">Higher secondary</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[1].country}
                    onChange={(e) =>
                      handleHigherSecondaryChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.country}</span>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[1].year_start}
                    onChange={(e) =>
                      handleHigherSecondaryChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.year_start}</span>
              </div>

              <div className="col-md-4">
                {/* *School*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>School
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[1].institute_name}
                    onChange={(e) =>
                      handleHigherSecondaryChange(
                        "institute_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.institute_name}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* *Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[1].board_university_name}
                    onChange={(e) =>
                      handleHigherSecondaryChange(
                        "board_university_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <span className="error-message">
                  {errors.board_university_name}
                </span>
              </div>

              <div className="col-md-4">
                {/* *Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[1].year_end}
                    onChange={(e) =>
                      handleHigherSecondaryChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.year_end}</span>
              </div>

              <div className="col-md-4">
                {/* *Division (First/Second/Third)*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Division (First/Second/Third)
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_division"
                    id=""
                    value={formValues.educations[1].grade_division}
                    onChange={(e) =>
                      handleHigherSecondaryChange(
                        "grade_division",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.grade_division}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* *Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[1].grade_percent}
                    onChange={(e) =>
                      handleHigherSecondaryChange(
                        "grade_percent",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.grade_percent}</span>
              </div>

              <div className="col-md-4">
                {/* *Stream*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Stream
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="stream"
                    id=""
                    value={formValues.educations[1].stream}
                    onChange={(e) =>
                      handleHigherSecondaryChange("stream", e.target.value)
                    }
                  ></input>
                </div>
                <span className="error-message">{errors.stream}</span>
              </div>
            </div>
            {/* ----------------------------------------------------------------------- */}
            {/* Diploma */}

            <div>
              <p className="HS-heading">Diploma</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[8].country}
                    onChange={(e) =>
                      handleDiplomaChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[8].year_start}
                    onChange={(e) =>
                      handleDiplomaChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* *School*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>School
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[8].institute_name}
                    onChange={(e) =>
                      handleDiplomaChange("institute_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* *Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[8].board_university_name}
                    onChange={(e) =>
                      handleDiplomaChange(
                        "board_university_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* *Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[8].year_end}
                    onChange={(e) =>
                      handleDiplomaChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* *Division (First/Second/Third)*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Division (First/Second/Third)
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_division"
                    id=""
                    value={formValues.educations[8].grade_division}
                    onChange={(e) =>
                      handleDiplomaChange("grade_division", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* *Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[8].grade_percent}
                    onChange={(e) =>
                      handleDiplomaChange("grade_percent", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* *Stream*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Stream
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="stream"
                    id=""
                    value={formValues.educations[8].stream}
                    onChange={(e) =>
                      handleDiplomaChange("stream", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}

            {/* Graduation*/}

            <div>
              <p className="HS-heading">Graduation</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[2].country}
                    onChange={(e) =>
                      handleGraduationChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[2].year_start}
                    onChange={(e) =>
                      handleGraduationChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* University/ Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>University/ Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[2].board_university_name}
                    onChange={(e) =>
                      handleGraduationChange(
                        "board_university_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Institute/ College*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Institute/ College
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[2].institute_name}
                    onChange={(e) =>
                      handleGraduationChange("institute_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Degree Name*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Degree Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="degree_types_name"
                    id=""
                    value={formValues.educations[2].degree_types_name}
                    onChange={(e) =>
                      handleGraduationChange(
                        "degree_types_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[2].year_end}
                    onChange={(e) =>
                      handleGraduationChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Specialization/ Area*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Specialization/ Area
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="specialization_area_1"
                    id=""
                    value={formValues.educations[2].specialization_area_1}
                    onChange={(e) =>
                      handleGraduationChange(
                        "specialization_area_1",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[2].grade_percent}
                    onChange={(e) =>
                      handleGraduationChange("grade_percent", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            {/* Post Graduation*/}

            <div>
              <p className="HS-heading">Post Graduation</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[3].country}
                    onChange={(e) =>
                      handlePostGraduationChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[3].year_start}
                    onChange={(e) =>
                      handlePostGraduationChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* University/ Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>University/ Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[3].board_university_name}
                    onChange={(e) =>
                      handlePostGraduationChange(
                        "board_university_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Institute/ College*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Institute/ College
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[3].institute_name}
                    onChange={(e) =>
                      handlePostGraduationChange(
                        "institute_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Degree Name*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Degree Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name=" degree_types_name"
                    id=""
                    value={formValues.educations[3].degree_types_name}
                    onChange={(e) =>
                      handlePostGraduationChange(
                        "degree_types_name",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[3].year_end}
                    onChange={(e) =>
                      handlePostGraduationChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Specialization/ Area*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Specialization/ Area
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="specialization_area_1"
                    id=""
                    value={formValues.educations[3].specialization_area_1}
                    onChange={(e) =>
                      handlePostGraduationChange(
                        "specialization_area_1",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[3].grade_percent}
                    onChange={(e) =>
                      handlePostGraduationChange(
                        "grade_percent",
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>

            {/* ------------------------------------- */}

            {/* M. Phil*/}

            <div>
              <p className="HS-heading">M. Phil</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[4].country}
                    onChange={(e) =>
                      handleMPHILChange("country", e.target.value)
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[4].year_start}
                    onChange={(e) =>
                      handleMPHILChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* University/ Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>University/ Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name=" board_university_name"
                    id=""
                    value={formValues.educations[4].board_university_name}
                    onChange={(e) =>
                      handleMPHILChange("board_university_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Institute/ College*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Institute/ College
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[4].institute_name}
                    onChange={(e) =>
                      handleMPHILChange("institute_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Degree Name*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Degree Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="degree_types_name"
                    id=""
                    value={formValues.educations[4].degree_types_name}
                    onChange={(e) =>
                      handleMPHILChange("degree_types_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[4].year_end}
                    onChange={(e) =>
                      handleMPHILChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Specialization/ Area*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Specialization/ Area
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="specialization_area_1"
                    id=""
                    value={formValues.educations[4].specialization_area_1}
                    onChange={(e) =>
                      handleMPHILChange("specialization_area_1", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[4].grade_percent}
                    onChange={(e) =>
                      handleMPHILChange("grade_percent", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            {/* PhD*/}

            <div>
              <p className="HS-heading">PhD</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* *Country */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={formValues.educations[5].country}
                    onChange={(e) => handlePhdChange("country", e.target.value)}
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    value={formValues.educations[5].year_start}
                    onChange={(e) =>
                      handlePhdChange("year_start", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* University/ Board*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>University/ Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    value={formValues.educations[5].board_university_name}
                    onChange={(e) =>
                      handlePhdChange("board_university_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Institute/ College*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Institute/ College
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="institute_name"
                    id=""
                    value={formValues.educations[5].institute_name}
                    onChange={(e) =>
                      handlePhdChange("institute_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Degree Name*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Degree Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="degree_types_name"
                    id=""
                    value={formValues.educations[5].degree_types_name}
                    onChange={(e) =>
                      handlePhdChange("degree_types_name", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Passing Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Passing Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_end"
                    id=""
                    value={formValues.educations[5].year_end}
                    onChange={(e) =>
                      handlePhdChange("year_end", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* Specialization/ Area*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Specialization/ Area
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="specialization_area_1"
                    id=""
                    value={formValues.educations[5].specialization_area_1}
                    onChange={(e) =>
                      handlePhdChange("specialization_area_1", e.target.value)
                    }
                  ></input>
                </div>
              </div>

              <div className="col-md-4">
                {/* Aggregate Percentage/CGPA*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    value={formValues.educations[5].grade_percent}
                    onChange={(e) =>
                      handlePhdChange("grade_percent", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-12">
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Topic of Research (Post-Doctoral), If
                    Applicable
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="specialization_area_2"
                    id=""
                    value={formValues.educations[5].specialization_area_2}
                    onChange={(e) =>
                      handlePhdChange("specialization_area_2", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-12">
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Topic of Research (Doctoral), If Applicable
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="specialization_area_3"
                    id=""
                    value={formValues.educations[5].specialization_area_3}
                    onChange={(e) =>
                      handlePhdChange("specialization_area_3", e.target.value)
                    }
                  ></input>
                </div>
              </div>
            </div>
            {/* Qualified Examination*/}

            <div>
              <p className="HS-heading">Qualified Examination</p>
            </div>
            <div className="row" style={{ marginTop: "-20px" }}>
              <div className="col-md-4">
                {/* Gate*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Gate
                  </label>
                  <select
                    className="UD-set-dropdown"
                    id="gateDropdown"
                    name="exam_name"
                    value={formValues.educations[6].exam_name}
                    onChange={(e) =>
                      handleGateChange("exam_name", e.target.value)
                    }
                  >
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              {formValues.educations[6].exam_name === "Yes" && (
                <div className="col-md-4">
                  {/* Year*/}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span></span>Year
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      placeholder=" "
                      name="year_end"
                      id=""
                      value={formValues.educations[6].year_end}
                      onChange={(e) =>
                        handleGateChange("year_end", e.target.value)
                      }
                    ></input>
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-4">
                {/* NET*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>NEET
                  </label>
                  <select
                    className="UD-set-dropdown"
                    id="netDropdown"
                    name="exam_name"
                    value={formValues.educations[7].exam_name}
                    onChange={(e) =>
                      handleNeetChange("exam_name", e.target.value)
                    }
                  >
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {formValues.educations[7].exam_name === "Yes" && (
                <div className="col-md-4">
                  {/* Year*/}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span></span>Year
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      placeholder=" "
                      name="year_end"
                      id=""
                      value={formValues.educations[7].year_end}
                      onChange={(e) =>
                        handleNeetChange("year_end", e.target.value)
                      }
                    ></input>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserQualification;
