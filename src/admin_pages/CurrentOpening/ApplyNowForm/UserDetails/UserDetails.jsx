import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobile,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDetails.css";
import apiService from "../../../../Services/ApiServices";
function UserDetails({ formValues, setFormValues, errors, setErrors }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  // const [maritalStatus, setMaritalStatus] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [maxCharacters] = useState(40);

  // console.log("formvalue",formValues)

  useEffect(() => {
    // Fetch data from the API using Axios
    apiService
      .getAppliedPosts()
      .then((response) => {
        
        const filteredPosts = response.data.filter(post => post.job_category_master.category_name !== "non-academic");

        // Update the state with the filtered data
        setPosts(filteredPosts);
        
        // console.log(formValues.applied_post_masters_id,"<<<")
        if (formValues.applied_post_masters_id) {
          const selectedPostObject = response.data.find(
            (post) => post.id == formValues.applied_post_masters_id
          );
          // console.log("final post check???",selectedPostObject)
          if (selectedPostObject) {
            setSelectedPost(selectedPostObject.post_name);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await apiService.getDepartments();
        setDepartments(response.data);

        // console.log(formValues.department_master_id,"<<<")
        if (formValues.department_master_id) {
          const selectedDepartmentObject = response.data.find(
            (department) => department.id == formValues.department_master_id
          );
          // console.log("final department check???",selectedDepartmentObject)
          if (selectedDepartmentObject) {
            setSelectedDepartment(selectedDepartmentObject.dept_name);
          }
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    apiService
      .getCountries()
      .then((response) => {
        setCountries(response.data.data);
        // console.log("country >>>>",formValues.country)
        if (formValues.country) {
          setSelectedCountry(formValues.country);
        }
        if (formValues.city) {
          setSelectedCity(formValues.city);
        }
      })

      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const countryValue = event.target.value;
    setSelectedCountry(countryValue);
    setSelectedCity("");
    // console.log("Selected Country:", countryValue);
    setFormValues((prevValues) => ({
      UserDetails: {
        ...prevValues.UserDetails,
        country: countryValue,
      },
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
    setFormValues((prevValues) => ({
      UserDetails: {
        ...prevValues.UserDetails,
        city: cityValue,
      },
    }));
    setErrors({
      ...errors,
      city: "",
    });
  };

  const handleDepartmentChange = (event) => {
    setErrors({
      ...errors,
      department_master_id: "",
    });
    const selectedDeptID = event.target.value;
    // console.log("selectedDeptID",selectedDeptID,departments)
    const selectedDepartmentObject = departments.find(
      (department) => department.id == selectedDeptID
    );
    // console.log("selectedDepartmentObject idf",selectedDepartmentObject);

    if (selectedDepartmentObject) {
      setSelectedDepartment(selectedDepartmentObject.dept_name_name);
      setFormValues((prevValues) => ({
        UserDetails: {
          ...prevValues.UserDetails,
          department_master_id: parseInt(selectedDeptID),
        },
      }));
    } else {
      console.error("Selected department not found");
    }
  };

  const handlePostChange = (event) => {
    setErrors({
      ...errors,
      applied_post_masters_id: "",
    });
    const selectedPostId = event.target.value;
    // console.log("selectedPostId",selectedPostId,posts)
    const selectedPostObject = posts.find((post) => post.id == selectedPostId);
    // console.log("category idf",selectedPostObject);
    if (selectedPostObject) {
      // console.log("category idf",selectedPostObject);
      setSelectedPost(selectedPostObject.post_name);
      const jobCategoryId = selectedPostObject.job_category_master.id;
      setFormValues((prevValues) => ({
        UserDetails: {
          ...prevValues.UserDetails,
          applied_post_masters_id: parseInt(selectedPostId),
          job_category_master_id: jobCategoryId,
        },
      }));
    } else {
      console.error("Selected post not found");
    }
  };

  const handleMaritalStatusChange = (event) => {
    setErrors({
      ...errors,
      marital_status: "",
    });
    const selectedMaritalStatus = event.target.value;
    // setMaritalStatus(selectedMaritalStatus);
    setFormValues((prevValues) => ({
      UserDetails: {
        ...prevValues.UserDetails,
        marital_status: selectedMaritalStatus,
      },
    }));
  };

  const handleInputChange = (e) => {
    setErrors({
      ...errors,
      specialization: "",
    });
    const { name, value } = e.target;
    if (value.length <= maxCharacters || name === "address_1") {
      setFormValues((prevValues) => ({
        ...prevValues,
        UserDetails: {
          ...prevValues.UserDetails,
          [name]: value,
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : " ! This field is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Maximum ${maxCharacters} characters allowed`,
      }));
    }
  };

  return (
    <>
      <form>
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            {/* <h1>hjswdjbekjhverd</h1> */}
            <div>
              <h5 className="UD-heading">Personal Details</h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
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
                    value={formValues.email}
                    onChange={handleInputChange}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faEnvelope} />
                </div>
                <span className="error-message">{errors.email}</span>
              </div>

              <div className="col-md-4">
                {/* Phone No. */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Phone Number
                  </label>
                  <input
                    className="UD-set-input"
                    type="number"
                    placeholder="(123) 456 - 7890 "
                    name="contact_1"
                    id=""
                    value={formValues.contact_1}
                    onChange={handleInputChange}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                </div>
                <span className="error-message">{errors.contact_1}</span>
              </div>

              <div className="col-md-4">
                {/* *Post Applied For (If Others, Please Specify) */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Post Applied For
                    {/* <span className="set-others">
                        &nbsp;(If Others, Please Specify)
                      </span> */}
                  </label>

                  <select
                    id="postDropdown"
                    value={selectedPost}
                    onChange={handlePostChange}
                    className="UD-set-dropdown"
                    style={{ textTransform: "capitalize" }}
                  >
                    <option value="">
                      {selectedPost && selectedPost
                        ? selectedPost
                        : "Select a post"}
                    </option>

                    {posts.map((post, index) => {
                      // console.log("post",post)
                      return (
                        <option key={index} value={post.id}>
                          {post.post_name}
                        </option>
                      );
                    })}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">
                  {errors.applied_post_masters_id}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* Departments */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Departments
                  </label>
                  <select
                    id="departmentDropdown"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="UD-set-dropdown"
                  >
                    <option value="">
                      {selectedDepartment && selectedDepartment
                        ? selectedDepartment
                        : "Select a department"}
                    </option>
                    {departments.map((department, index) => (
                      <option key={index} value={department.id}>
                        {department.dept_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">
                  {errors.department_master_id}
                </span>
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
                    onChange={handleInputChange}
                    value={formValues.specialization}
                  ></input>
                </div>
                <span className="error-message">{errors.specialization}</span>
              </div>

              <div className="col-md-4">
                {/* Nature of Job */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Nature of Job
                  </label>
                  <select
                    onChange={handleInputChange}
                    name="nature_of_job"
                    className="UD-set-dropdown"
                    value={formValues.nature_of_job}
                  >
                    <option value="">Select Nature of Job</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.nature_of_job}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* Title */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Title
                  </label>
                  <select
                    onChange={handleInputChange}
                    name="title_first_name"
                    className="UD-set-dropdown"
                    value={formValues.title_first_name}
                  >
                    <option value="">Select Option</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.title_first_name}</span>
              </div>

              <div className="col-md-4">
                {/* First Name  */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>First Name
                  </label>

                  <input
                    className="UD-set-input"
                    type="text"
                    name="first_name"
                    placeholder="Enter First Name"
                    id=""
                    onChange={handleInputChange}
                    value={formValues.first_name}
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
                    onChange={handleInputChange}
                    value={formValues.middle_name}
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
                    value={formValues.last_name}
                    onChange={handleInputChange}
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
                    placeholder="DD/MM/YYYY"
                    id=""
                    value={formValues.dob}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <span className="error-message">{errors.dob}</span>
              </div>

              <div className="col-md-4">
                {/* *Gender*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span>*</span>Gender
                  </label>
                  <select
                    onChange={handleInputChange}
                    name="gender"
                    className="UD-set-dropdown"
                    value={formValues.gender}
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
                    onChange={handleInputChange}
                    value={formValues.religion}
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
                    onChange={handleInputChange}
                    value={formValues.cast_category_name}
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
                    id="maritalStatusDropdown"
                    value={formValues.marital_status}
                    onChange={handleMaritalStatusChange}
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
                    placeholder="Enter Address "
                    id=""
                    onChange={handleInputChange}
                    value={formValues.address_1}
                  ></input>
                </div>
                <span className="error-message">{errors.address_1}</span>
              </div>

              <div className="col-md-4">
                {/* *Alternate Contact Number  */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Alternate Contact Number
                  </label>

                  <input
                    className="UD-set-input"
                    type="number"
                    name="contact_2"
                    placeholder="(123) 456 - 7890"
                    id=""
                    onChange={handleInputChange}
                    value={formValues.contact_2}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                </div>
                <span className="error-message">{errors.contact_2}</span>
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
                    <option value="">
                      {selectedCountry && selectedCountry
                        ? selectedCountry
                        : "Select a country"}
                    </option>
                    {countries.map((countryData, index) => (
                      <option key={index} value={countryData.country}>
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
                    <option value="">
                      {selectedCity && selectedCity
                        ? selectedCity
                        : "Select a city"}
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
                    type="text"
                    name="pin_code"
                    placeholder="Enter Pin Code "
                    id=""
                    onChange={handleInputChange}
                    value={formValues.pin_code}
                  ></input>
                </div>
                <span className="error-message">{errors.pin_code}</span>
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

export default UserDetails;
