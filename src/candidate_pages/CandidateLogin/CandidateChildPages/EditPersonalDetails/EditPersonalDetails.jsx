import "./EditPersonalDetails.css";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobile,
  faUserTie,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import candidatesApiService from "../../../candidateService";
import apiService from "../../../../Services/ApiServices";
// import { useApiData } from "../../../../context/CandidateContext";
// import Footers from "../../../../components/Footer/Footers";
import Notification from "../../../../Notification/Notification";
// import { useContext } from "react";
// import axios from "axios";
function EditPersonalDetails({ token }) {
  // ---------profile image source---------
  // const { apiData, loading, fetchCandidateData } = useApiData()
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [data, setData] = useState({});
  const [updateField, setUpdateField] = useState({});

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("");
  const maxCharacters = 40;

  // const [loading, setLoading] = useState(true);

  const fetchCandidateData = async () => {
    try {
      // setLoading(true);
      const fetchedData = await candidatesApiService.getCandidateById();
      setData(fetchedData);
      // console.log("fetchedData", fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // useEffect(() => {

  //   setData(apiData)
  // }, [apiData]);
  useEffect(() => {
    fetchCandidateData();
  }, []);

  // console.log("apiData", apiData);
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

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await candidatesApiService.uploadProfileImage(file);
        // console.log("Image upload successful:", responseData);

        setSelectedImage(URL.createObjectURL(file));
        showNotification("Profile photo changed successfully.", "success");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        showNotification("Error changing profile photo.", "error");
        // Handle other errors that may occur during the request
      }
    }
  };
  // const validatepersonalForm = () => {
  //   let errors = {};
  //   if (!formValues.first_name) {
  //     errors.first_name = "! First Name is Required.";
  //   } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(formValues.first_name)) {
  //     errors.first_name = "! Please enter a valid name.";
  //   }
  //   if (!formValues.last_name) {
  //     errors.last_name = "! Last Name is Required.";
  //   } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(formValues.last_name)) {
  //     errors.last_name = "! Please enter a valid name.";
  //   }

  //   if (!formValues.gender) {
  //     errors.gender = "! Gender is Required";
  //   }
  //   if (!formValues.religion) {
  //     errors.religion = "! Religion is Required";
  //   }
  //   if (!formValues.cast_category_name) {
  //     errors.cast_category_name = "! Cast Category is Required";
  //   }
  //   if (!formValues.marital_status) {
  //     errors.marital_status = "! Marital Status is Required";
  //   }
  //   if (!formValues.address_1) {
  //     errors.address_1 = "! Current Address  is Required";
  //   }

  //   if (!formValues.pin_code) {
  //     errors.pin_code = "! Pin Code is Required";
  //   }

  //   setErrors(errors);
  //   return errors;
  // };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // const errors = validatepersonalForm();
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return false;
    // }

    try {
      await candidatesApiService.updateCandidatePersonalInfo(updateField);

      setUpdateField({});
      fetchCandidateData();
      showNotification("Changes saved successfully.", "success");
    } catch (error) {
      console.error("Error saving changes:", error.message);
      showNotification("Error saving changes.", "error");
    }
  };
  const [formValues, setFormValues] = useState({
    editDetails: {
      email: "",
      contact_1: "",
      specialization: "",
      title_first_name: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      gender: "",
      religion: "",
      cast_category_name: "",
      marital_status: "",
      address_1: "",
      contact_2: "",
      country: "",
      // state_province: "",
      city: "",
      pin_code: "",
    },
  });

  const handleCountryChange = (event) => {
    const countryValue = event.target.value;
    setSelectedCountry(countryValue);
    setSelectedCity("");
    // console.log("Selected Country:", countryValue);
    setUpdateField((prev) => ({
      ...prev,
      country: countryValue,
      city: "", // Reset city in updateField as well
    }));
    setErrors({
      ...errors,
      country: "",
    });
  };

  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    // console.log("Selected city:", cityValue);
    setUpdateField((prev) => ({
      ...prev,
      city: cityValue,
    }));
    setErrors({
      ...errors,
      city: "",
    });
  };

  const handleFieldChange = (fieldName, value) => {
    let truncatedValue = value;

    // Check if value length is more than 40 characters and field is not address_1
    if (value.length > maxCharacters && fieldName !== "address_1") {
      // Truncate the value to 40 characters
      truncatedValue = value.slice(0, maxCharacters);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Maximum character limit (${maxCharacters}) reached.`,
      }));
    } else {
      // Clear error if within character limit or if field is address_1
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    setUpdateField((prev) => ({
      ...prev,
      [fieldName]: truncatedValue.toString(),
    }));
    setData((prev) => ({ ...prev, [fieldName]: truncatedValue.toString() }));
    setFormValues({
      ...formValues,
      [fieldName]: truncatedValue,
    });
  };

  // const handleFieldChange = (fieldName, value) => {

  //    console.log("handlefild", fieldName, value, updateField);
  //   setUpdateField((prev) => ({ ...prev, [fieldName]: value.toString() }));
  //   setData((prev) => ({ ...prev, [fieldName]: value.toString() }));
  //   setErrors({
  //     ...errors,
  //     email: "",
  //     contact_1: "",
  //     specialization: "",
  //     title_first_name: "",
  //     first_name: "",
  //     middle_name: "",
  //     last_name: "",
  //     dob: "",
  //     gender: "",
  //     religion: "",
  //     cast_category_name: "",
  //     marital_status: "",
  //     address_1: "",
  //     contact_2: "",
  //     country: "",
  //     state_province: "",
  //     city: "",
  //     pin_code: "",
  //   });
  //   setFormValues({
  //     ...formValues,
  //     [fieldName]: value,
  //   });
  // };

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return "";
    }
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await candidatesApiService.fetchCandidateImage();
        console.log("check format", imageUrl);
        if (imageUrl) {
          setSelectedImage(imageUrl);
        } else {
          // If there is no image, set selectedImage to null or use a default image URL
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      {/* <h1>Hello</h1> */}
      {/* {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )} */}

      {/* {!loading && ( */}
      <form id="myForm" onSubmit={handleSaveChanges}>
        <div className="editdetails-form-container ">
          <div style={{ paddingLeft: "50px" }}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserTie}
                style={{
                  fontSize: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  padding: "20px",
                }}
              />
            )}
            <div>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" className="choose-img">
                Change Profile Picture
              </label>
              {/* Button to trigger file input */}
              {/* <button className="choose-img" onClick={handleChoosePictureClick}>
                Change Profile Picture
              </button> */}
            </div>
          </div>

          <div
            className="container"
            style={{
              marginTop: "30px",

              // paddingRight: "50px",
            }}
          >
            <div>
              <div>
                <h5 className="UD-heading">
                  Personal Details &nbsp;{" "}
                  <FontAwesomeIcon className="edit-pen-icon" icon={faPen} />
                </h5>
                <p className="UD-subheading">
                  Please fill your information so we can get in touch with you.
                </p>

                {/* Add edit profile button */}
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* Email */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Email
                    </label>
                    <input
                      className="UD-set-input"
                      type="email"
                      placeholder="Email address"
                      name="email"
                      id=""
                      required
                      value={data?.email}
                      readOnly
                      // onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                    <FontAwesomeIcon
                      className="UD-set-icon"
                      icon={faEnvelope}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* Phone No. */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Phone Number
                    </label>
                    <input
                      className="UD-set-input"
                      type="tel"
                      placeholder="(123) 456 - 7890 "
                      name="contact_1"
                      id=""
                      required
                      value={data?.contact_1}
                      readOnly
                      // onChange={(e) => handleFieldChange('contact_1', e.target.value)}
                    />
                    <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* Specialization  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Specialization
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      placeholder=" "
                      name="specialization"
                      id=""
                      value={data?.specialization}
                      onChange={(e) =>
                        handleFieldChange("specialization", e.target.value)
                      }
                    ></input>
                  </div>
                </div>
              </div>

              {/* <div className="row">
              <div className="col-md-4">
                   *Others *
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Others
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      placeholder=" "
                      name=""
                      id=""
                      required
                    ></input>
                  </div>
                </div>

              </div> */}

              <div className="row">
                {/* <div className="col-md-4">
                  Departments
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span> Departments
                    </label>
                    <select name="" className="UD-set-dropdown">
                      <option value="">Select Departments</option>
                      <option value="">Departments</option>
                      <option value="">Departments</option>
                      <option value="">Departments</option>
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                </div> */}

                {/* <div className="col-md-4">
         
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span> Nature of Job
                    </label>
                    <select name="nature_of_job" className="UD-set-dropdown"
                      value={data.candidate_applied_posts && data.candidate_applied_posts.length > 0 ? data.candidate_applied_posts[0].nature_of_job : ''}
                      onChange={(e) => handleFieldChange('nature_of_job', e.target.value)}>
                      <option value="">Select Nature of Job</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                </div> */}
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* Title */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span></span>Title
                    </label>
                    <select
                      name="title_first_name"
                      className="UD-set-dropdown"
                      value={data?.title_first_name}
                      onChange={(e) =>
                        handleFieldChange("title_first_name", e.target.value)
                      }
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* First Name  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span> First Name
                    </label>

                    <input
                      className="UD-set-input"
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                      id=""
                      value={data?.first_name}
                      onChange={(e) =>
                        handleFieldChange("first_name", e.target.value)
                      }
                    ></input>
                    <FontAwesomeIcon className="UD-set-icon" icon={faUser} />
                  </div>
                  <span className="error-message">{errors.first_name}</span>
                </div>
                <div className="col-md-4">
                  {/* Middle Name  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span></span>Middle Name
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      name="middle_name"
                      placeholder="Enter Middle Name "
                      id=""
                      value={data?.middle_name}
                      onChange={(e) =>
                        handleFieldChange("middle_name", e.target.value)
                      }
                    ></input>
                    <FontAwesomeIcon className="UD-set-icon" icon={faUser} />
                  </div>
                  <span className="error-message">{errors.middle_name}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* *Last Name  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Last Name
                    </label>

                    <input
                      className="UD-set-input"
                      type="text"
                      name="last_name"
                      placeholder="Enter last Name"
                      id=""
                      value={data?.last_name}
                      onChange={(e) =>
                        handleFieldChange("last_name", e.target.value)
                      }
                    ></input>
                    <FontAwesomeIcon className="UD-set-icon" icon={faUser} />
                  </div>
                  <span className="error-message">{errors.last_name}</span>
                </div>

                <div className="col-md-4">
                  {/* Date of Birth:  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Date of Birth:
                    </label>

                    <input
                      className="UD-set-input"
                      type="date"
                      name="dob"
                      placeholder=""
                      id=""
                      value={formatDateForInput(data?.dob)}
                      onChange={(e) => handleFieldChange("dob", e.target.value)}
                      readOnly
                    />
                  </div>
                  {/* <span className="error-message">{errors.dob}</span> */}
                </div>

                <div className="col-md-4">
                  {/* *Gender*/}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Gender
                    </label>
                    <select
                      name="gender"
                      className="UD-set-dropdown"
                      value={data?.gender}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                  <span className="error-message">{errors.gender}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* *Religion */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Religion
                    </label>

                    <input
                      className="UD-set-input"
                      type="text"
                      name="religion"
                      placeholder="Enter Religion"
                      id=""
                      value={data?.religion}
                      onChange={(e) =>
                        handleFieldChange("religion", e.target.value)
                      }
                    ></input>
                  </div>
                  <span className="error-message">{errors.religion}</span>
                </div>

                <div className="col-md-4">
                  {/* *Category  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Category
                    </label>

                    <input
                      className="UD-set-input"
                      type="text"
                      name="cast_category_name"
                      placeholder="Enter Category"
                      id=""
                      value={data?.cast_category_name}
                      onChange={(e) =>
                        handleFieldChange("cast_category_name", e.target.value)
                      }
                    ></input>
                  </div>
                  <span className="error-message">
                    {errors.cast_category_name}
                  </span>
                </div>

                <div className="col-md-4">
                  {/**Marital Status */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Marital Status
                    </label>
                    <select
                      name="marital_status"
                      id=""
                      value={data?.marital_status}
                      onChange={(e) =>
                        handleFieldChange("marital_status", e.target.value)
                      }
                      className="UD-set-dropdown"
                    >
                      <option value="">Select marital status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="separated">Separated</option>
                      <option value="Not to disclosed">Not to disclosed</option>
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                  <span className="error-message">{errors.marital_status}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* *Current address */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Current address
                    </label>
                    <input
                      className="UD-set-input"
                      type="text"
                      name="address_1"
                      placeholder="Enter Address"
                      id=""
                      value={data?.address_1}
                      onChange={(e) =>
                        handleFieldChange("address_1", e.target.value)
                      }
                      required
                    ></input>
                  </div>
                  <span className="error-message">{errors.address_1}</span>
                </div>

                <div className="col-md-4">
                  {/* *Alternate Contact Number  */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Alternate Number
                    </label>

                    <input
                      className="UD-set-input"
                      type="tel"
                      name="contact_2"
                      placeholder="(123) 456 - 7890"
                      id=""
                      value={data?.contact_2}
                      onChange={(e) =>
                        handleFieldChange("contact_2", e.target.value)
                      }
                      required
                    ></input>
                    <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* *Country */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Country
                    </label>
                    <select
                      name="country"
                      className="set-dropdown"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <option key="" value="">
                        {data?.country}
                      </option>
                      {countries.map((countryData) => (
                        <option
                          key={countryData.iso2}
                          value={countryData.country}
                        >
                          {countryData.country}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                  <span className="error-message">{errors.country}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {/* *Current Job City */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Current Job City
                    </label>
                    <select
                      name="city"
                      className="set-dropdown"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option key="" value="">
                        {data?.city}
                      </option>
                      {(
                        countries.find(
                          (country) => country.country === selectedCountry
                        )?.cities || []
                      ).map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                  </div>
                  <span className="error-message">{errors.city}</span>
                </div>

                <div className="col-md-4">
                  {/* **Pin Code */}
                  <div className="UD-form-section">
                    <label className="UD-SetLabel-Name">
                      <span>*</span>Pin Code
                    </label>

                    <input
                      className="UD-set-input"
                      type="number"
                      name="pin_code"
                      placeholder="Enter Pin Code "
                      id=""
                      value={data?.pin_code}
                      onChange={(e) =>
                        handleFieldChange("pin_code", e.target.value)
                      }
                      required
                    ></input>
                  </div>
                  <span className="error-message">{errors.pin_code}</span>
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
        </div>
      </form>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
      {/* // <Footers></Footers> */}
      {/* )}  */}
    </>
  );
}

export default EditPersonalDetails;
