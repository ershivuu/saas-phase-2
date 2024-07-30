import React, { useState, useEffect } from "react";
import "./EditQualificationForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import candidatesApiService from "../../../candidateService";
import Notification from "../../../../Notification/Notification";
function EditQualificationForm() {
  const [updateField, setUpdateField] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const candidateResponse = await candidatesApiService.getEducationById();
      // console.log("response-......", candidateResponse);
      setData(candidateResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    const body = document.body;
    if (loading) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [loading]);
  useEffect(() => {
    candidatesApiService
      .getCandidatesCountries()
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    // console.log("use-state");
    fetchData();
  }, []);

  const handleFieldChange = (fieldName, value, educationType, e) => {
    // console.log("handleField", fieldName, value);
    // ----------------------------------------------------------------------------
    // [fieldName, value] = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setErrors({
      ...errors,
      country: "",
      year_start: "",
      institute_name: "",
    });
    // ----------------------------------------------------------------------------
    if (educationType === "highSchoolData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 7
          ? { ...item, [fieldName]: value.toString() }
          : item
      );

      setData(updatedData);

      const highSchoolData = data.find(
        (item) => item.exam_types_master_id === 7
      );
      if (highSchoolData) {
        const additionalInfo = {
          exam_types_master_id: highSchoolData.exam_types_master_id,
          id: highSchoolData.id,
          [fieldName]: value.toString(),
        };
        // console.log("Additional Info:", additionalInfo);
        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: highSchoolData.exam_types_master_id,
          id: highSchoolData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "higherSecondaryData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 8
          ? { ...item, [fieldName]: value.toString() }
          : item
      );

      setData(updatedData);

      const higherSecondaryData = data.find(
        (item) => item.exam_types_master_id === 8
      );

      if (higherSecondaryData) {
        const additionalInfo = {
          exam_types_master_id: higherSecondaryData.exam_types_master_id,
          id: higherSecondaryData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: higherSecondaryData.exam_types_master_id,
          id: higherSecondaryData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "diplomaData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 1
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      // console.log("diplomaData>>",updatedData)
      setData(updatedData);

      const diplomaData = data.find((item) => item.exam_types_master_id === 1);

      if (diplomaData) {
        const additionalInfo = {
          exam_types_master_id: diplomaData.exam_types_master_id,
          id: diplomaData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: diplomaData.exam_types_master_id,
          id: diplomaData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "graduationData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 2
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const graduationData = data.find(
        (item) => item.exam_types_master_id === 2
      );

      if (graduationData) {
        const additionalInfo = {
          exam_types_master_id: graduationData.exam_types_master_id,
          id: graduationData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: graduationData.exam_types_master_id,
          id: graduationData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "postGraduationData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 3
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const postGraduationData = data.find(
        (item) => item.exam_types_master_id === 3
      );
      if (postGraduationData) {
        const additionalInfo = {
          exam_types_master_id: postGraduationData.exam_types_master_id,
          id: postGraduationData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: postGraduationData.exam_types_master_id,
          id: postGraduationData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "mphilData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 5
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const mphilData = data.find((item) => item.exam_types_master_id === 5);

      if (mphilData) {
        const additionalInfo = {
          exam_types_master_id: mphilData.exam_types_master_id,
          id: mphilData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: mphilData.exam_types_master_id,
          id: mphilData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "phdData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 4
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const phdData = data.find((item) => item.exam_types_master_id === 4);

      if (phdData) {
        const additionalInfo = {
          exam_types_master_id: phdData.exam_types_master_id,
          id: phdData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: phdData.exam_types_master_id,
          id: phdData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    let gateData;

    if (educationType === "gateData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 11
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const gateData = data.find((item) => item.exam_types_master_id === 11);

      if (gateData && gateData.exam_types_master) {
        const additionalInfo = {
          exam_types_master_id: gateData.exam_types_master_id,
          id: gateData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: gateData.exam_types_master_id,
          id: gateData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
    if (educationType === "neetData") {
      const updatedData = data.map((item) =>
        item.exam_types_master_id === 9
          ? { ...item, [fieldName]: value.toString() }
          : item
      );
      setData(updatedData);

      const neetData = data.find((item) => item.exam_types_master_id === 9);

      if (neetData) {
        const additionalInfo = {
          exam_types_master_id: neetData.exam_types_master_id,
          id: neetData.id,
          [fieldName]: value.toString(),
        };

        // console.log("Additional Info:", additionalInfo);

        setUpdateField((prev) => ({
          ...prev,
          exam_types_master_id: neetData.exam_types_master_id,
          id: neetData.id,
          [fieldName]: value.toString(),
        }));
      }
    }
  };

  // console.log("Data>>>>>",data)
  const highSchoolData = data.find((item) => item.exam_types_master_id === 7);

  const higherSecondaryData = data.find(
    (item) => item.exam_types_master_id === 8
  );

  const diplomaData = data.find((item) => item.exam_types_master_id === 1);

  const graduationData = data.find((item) => item.exam_types_master_id === 2);

  const postGraduationData = data.find(
    (item) => item.exam_types_master_id === 3
  );

  const mphilData = data.find((item) => item.exam_types_master_id === 5);

  const phdData = data.find((item) => item.exam_types_master_id === 4);

  const neetData = data.find((item) => item.exam_types_master_id === 9);

  const gateData = data.find((item) => item.exam_types_master_id === 11);

  const [countries, setCountries] = useState([]);
  // const validateQualificationForm = () => {
  //   const currentYear = new Date().getFullYear();
  //   const minYear = currentYear - 100;
  //   let errors = {};

  //   if (!formData.country) {
  //     errors.country = "! Country is Required ";
  //   }

  //   if (!formData.year_start) {
  //     errors.year_start = "! Year of Joining is Required";
  //   } else {
  //     const enteredStartYear = parseInt(formData.year_start, 10);

  //     if (
  //       isNaN(enteredStartYear) ||
  //       enteredStartYear > currentYear ||
  //       enteredStartYear < minYear
  //     ) {
  //       errors.year_start =
  //         "! Please enter a valid year within the last 100 years.";
  //     }
  //   }

  //   if (!formData.year_end) {
  //     errors.year_end = "! Passing Year is Required";
  //   } else {
  //     const enteredEndYear = parseInt(formData.year_end, 10);

  //     if (
  //       isNaN(enteredEndYear) ||
  //       enteredEndYear > currentYear ||
  //       enteredEndYear < minYear
  //     ) {
  //       errors.year_end =
  //         "! Please enter a valid passing year within the last 100 years.";
  //     }
  //   }

  //   if (!formData.institute_name) {
  //     errors.institute_name = "! School Name is Required.";
  //   } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(formData.institute_name)) {
  //     errors.institute_name = "! Please enter a valid name.";
  //   }
  //   setErrors(errors);
  //   return errors;
  // };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // const errors = validateQualificationForm();
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return false;
    // }
    try {
      await candidatesApiService.updateCandidateEducation({
        educations: [updateField],
      });
      setUpdateField({});
      fetchData();
      setNotificationMessage("Changes saved successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error saving changes:", error.message);
      setNotificationMessage("Error saving changes.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const [formData, setFormData] = useState({
    country: "",
    year_start: "",
    institute_name: "",
    board_university_name: "",
    year_end: "",
  });

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <form id="myForm" onSubmit={handleSaveChanges}>
        <div className="container" style={{ marginTop: "90px" }}>
          <div>
            <div>
              <h5 className="UD-heading">
                Academic Professional Qualifications &nbsp;{" "}
                <FontAwesomeIcon className="edit-pen-icon" icon={faPen} />
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>

              {/* Add edit button */}
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
                    <span>*</span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={highSchoolData ? highSchoolData.country : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "country",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                {errors.country && (
                  <span className="error-message">{errors.country}</span>
                )}
              </div>

              <div className="col-md-4">
                {/* *Year of Joining */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    defaultValue={
                      highSchoolData ? highSchoolData.year_start : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
                {errors.year_start && (
                  <span className="error-message">{errors.year_start}</span>
                )}
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
                    defaultValue={
                      highSchoolData ? highSchoolData.institute_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
                {errors.institute_name && (
                  <span className="error-message">{errors.institute_name}</span>
                )}
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
                    defaultValue={
                      highSchoolData ? highSchoolData.board_university_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
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
                    defaultValue={highSchoolData ? highSchoolData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "year_end",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
                {errors.year_end && (
                  <span className="error-message">{errors.year_end}</span>
                )}
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
                    defaultValue={
                      highSchoolData ? highSchoolData.grade_division : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_division",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    <span>*</span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    defaultValue={
                      highSchoolData ? highSchoolData.grade_percent : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
              </div>
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
                    <span>*</span> Country
                  </label>
                  <select
                    name="country"
                    className="UD-set-dropdown"
                    value={
                      higherSecondaryData ? higherSecondaryData.country : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "country",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    <span>*</span>Year of Joining
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="year_start"
                    id=""
                    defaultValue={
                      higherSecondaryData ? higherSecondaryData.year_start : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  ></input>
                </div>
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
                    defaultValue={
                      higherSecondaryData
                        ? higherSecondaryData.institute_name
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "higherSecondaryData"
                      )
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
                    <span>*</span>Board
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="board_university_name"
                    id=""
                    defaultValue={
                      higherSecondaryData
                        ? higherSecondaryData.board_university_name
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  ></input>
                </div>
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
                    defaultValue={
                      higherSecondaryData ? higherSecondaryData.year_end : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_end",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  ></input>
                </div>
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
                    defaultValue={
                      higherSecondaryData
                        ? higherSecondaryData.grade_division
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_division",
                        e.target.value,
                        "higherSecondaryData"
                      )
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
                    <span>*</span>Aggregate Percentage/CGPA
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="grade_percent"
                    id=""
                    defaultValue={
                      higherSecondaryData
                        ? higherSecondaryData.grade_percent
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  ></input>
                </div>
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
                    defaultValue={
                      higherSecondaryData ? higherSecondaryData.stream : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "stream",
                        e.target.value,
                        "higherSecondaryData"
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>

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
                    value={diplomaData ? diplomaData.country : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "country",
                        e.target.value,
                        "diplomaData"
                      )
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    defaultValue={diplomaData ? diplomaData.year_start : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    defaultValue={diplomaData ? diplomaData.institute_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    defaultValue={
                      diplomaData ? diplomaData.board_university_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "highSchoolData"
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
                    defaultValue={diplomaData ? diplomaData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "year_end",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    defaultValue={diplomaData ? diplomaData.grade_division : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_division",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    defaultValue={diplomaData ? diplomaData.grade_percent : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "highSchoolData"
                      )
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
                    defaultValue={diplomaData ? diplomaData.stream : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "stream",
                        e.target.value,
                        "highSchoolData"
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>

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
                    value={graduationData ? graduationData.country : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "country",
                        e.target.value,
                        "graduationData"
                      )
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    defaultValue={
                      graduationData ? graduationData.year_start : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "graduationData"
                      )
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
                    defaultValue={
                      graduationData ? graduationData.board_university_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "graduationData"
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
                    defaultValue={
                      graduationData ? graduationData.institute_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "graduationData"
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
                    name="degree_types_name"
                    id=""
                    defaultValue={
                      graduationData ? graduationData.degree_types_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "degree_types_name",
                        e.target.value,
                        "graduationData"
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
                    defaultValue={graduationData ? graduationData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "year_end",
                        e.target.value,
                        "graduationData"
                      )
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
                    defaultValue={
                      graduationData ? graduationData.specialization_area_1 : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "specialization_area_1",
                        e.target.value,
                        "graduationData"
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
                    defaultValue={
                      graduationData ? graduationData.grade_percent : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "graduationData"
                      )
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
                    value={postGraduationData ? postGraduationData.country : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "country",
                        e.target.value,
                        "postGraduationData"
                      )
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    value={
                      postGraduationData ? postGraduationData.year_start : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "postGraduationData"
                      )
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
                    value={
                      postGraduationData
                        ? postGraduationData.board_university_name
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "postGraduationData"
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
                    value={
                      postGraduationData
                        ? postGraduationData.institute_name
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "postGraduationData"
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
                    name="degree_types_name"
                    id=""
                    value={
                      postGraduationData
                        ? postGraduationData.degree_types_name
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "degree_types_name",
                        e.target.value,
                        "postGraduationData"
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
                    value={
                      postGraduationData ? postGraduationData.year_end : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "year_end",
                        e.target.value,
                        "postGraduationData"
                      )
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
                    value={
                      postGraduationData
                        ? postGraduationData.specialization_area_1
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "specialization_area_1",
                        e.target.value,
                        "postGraduationData"
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
                    value={
                      postGraduationData ? postGraduationData.grade_percent : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "postGraduationData"
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>

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
                    value={mphilData ? mphilData.country : ""}
                    onChange={(e) =>
                      handleFieldChange("country", e.target.value, "mphilData")
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    defaultValue={mphilData ? mphilData.year_start : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "year_start",
                        e.target.value,
                        "mphilData"
                      )
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
                    defaultValue={
                      mphilData ? mphilData.board_university_name : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "mphilData"
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
                    defaultValue={mphilData ? mphilData.institute_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "mphilData"
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
                    name="degree_types_name"
                    id=""
                    defaultValue={mphilData ? mphilData.degree_types_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "degree_types_name",
                        e.target.value,
                        "mphilData"
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
                    defaultValue={mphilData ? mphilData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange("year_end", e.target.value, "mphilData")
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
                    defaultValue={
                      mphilData ? mphilData.specialization_area_1 : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "specialization_area_1",
                        e.target.value,
                        "mphilData"
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
                    defaultValue={mphilData ? mphilData.grade_percent : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "mphilData"
                      )
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
                    value={phdData ? phdData.country : ""}
                    onChange={(e) =>
                      handleFieldChange("country", e.target.value, "phdData")
                    }
                  >
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                      <option
                        key={`${country.country}-${index}`}
                        value={country.country}
                      >
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
                    defaultValue={phdData ? phdData.year_start : ""}
                    onChange={(e) =>
                      handleFieldChange("year_start", e.target.value, "phdData")
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
                    defaultValue={phdData ? phdData.board_university_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "board_university_name",
                        e.target.value,
                        "phdData"
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
                    defaultValue={phdData ? phdData.institute_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "institute_name",
                        e.target.value,
                        "phdData"
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
                    name="degree_types_name"
                    id=""
                    defaultValue={phdData ? phdData.degree_types_name : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "degree_types_name",
                        e.target.value,
                        "phdData"
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
                    defaultValue={phdData ? phdData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange("year_end", e.target.value, "phdData")
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
                    defaultValue={phdData ? phdData.specialization_area_1 : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "specialization_area_1",
                        e.target.value,
                        "phdData"
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
                    defaultValue={phdData ? phdData.grade_percent : ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "grade_percent",
                        e.target.value,
                        "phdData"
                      )
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
                {/* Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Gate Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name=""
                    id=""
                    value={gateData ? gateData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange("year_end", e.target.value, "gateData")
                    }
                  ></input>
                </div>
              </div>
              {/* <div className="col-md-4"> */}
              {/* Gate*/}
              <div className="UD-form-section" style={{ display: "none" }}>
                <label className="UD-SetLabel-Name">
                  <span></span>Gate
                </label>
                <select
                  className="UD-set-dropdown"
                  id="gateDropdown"
                  name="exam_name"
                  value={
                    gateData ? (gateData.year_end !== "" ? "Yes" : "No") : ""
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "year_end",
                      e.target.value === "Yes" ? "" : "",
                      "gateData"
                    )
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {/* </div>             */}

              {/* <div className="col-md-4"> */}
              {/* NET*/}
              <div className="UD-form-section" style={{ display: "none" }}>
                <label className="UD-SetLabel-Name">
                  <span></span>NET
                </label>

                <select
                  className="UD-set-dropdown"
                  id=""
                  name="exam_name"
                  value={
                    neetData ? (neetData.year_end !== "" ? "Yes" : "No") : ""
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "year_end",
                      e.target.value === "Yes" ? "" : "",
                      "neetData"
                    )
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {/* </div> */}

              {/* <div className="row"> */}
              <div className="col-md-4">
                {/* Year*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span> NET Year
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name=""
                    id=""
                    value={neetData ? neetData.year_end : ""}
                    onChange={(e) =>
                      handleFieldChange("year_end", e.target.value, "neetData")
                    }
                  ></input>
                </div>
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
        {/* </div> */}
      </form>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default EditQualificationForm;
