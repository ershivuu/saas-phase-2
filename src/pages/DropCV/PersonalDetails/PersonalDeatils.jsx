import React, { useState, useEffect ,useRef} from "react";

import "./PersonalDeatils.css";
import apiService from "../../../Services/ApiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobile,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
// import { checkEmailExistence } from "../../../Services/ApiServices";

function PersonalDeatils({ formData, setFormData, errors, setErrors }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [subposts, setSubposts] = useState([]);
  const [selectedSubpost, setSelectedSubpost] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  // --------------------------------------------------FORM VALIDATION-------------------------------------------
  //  const [formErrors, setFormErrors] = useState({
  //   title_first_name: "",
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   dob: "",
  //   gender: "",
  //   email: "",
  //   password: "",
  //   contact_1: "",
  //   country: "",
  //   city: "",
  //   subjects_master_id: "",
  //   applied_post_masters_id: "",
  //   applied_subpost_master_id: "",
  //   job_category_master_id: "",
  // });

  const hasMounted = useRef(false);

  // -------------for jobcategory, post applies , sub post  ---------------

  const [maxCharacters] = useState(40);

  useEffect(() => {
    // if (!hasMounted.current) {
    //   hasMounted.current = true;
    //   return;
    // }
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const categoriesResponse = await apiService.getJobCategories(signal);
        setCategories(categoriesResponse.data);
        // console.log("categoriesResponse.data>>>>>>",categoriesResponse.data)
        // console.log("formData.applied_post_masters_id>>>>>",formData.applied_post_masters_id)
        if (formData.job_category_master_id) {
          const selectedCategoryObject = categoriesResponse.data.find(
            (category) => category.id == formData.job_category_master_id
          );
          // console.log("selectedCategoryObject>>>>>",selectedCategoryObject)
          if (selectedCategoryObject) {
            setSelectedCategory(selectedCategoryObject.category_name);
          }
        }
        // if (formData.applied_post_masters_id) {
        //   const selectedPostObject = categoriesResponse.data.find((post) => post.applied_post_masters.id == formData.applied_post_masters_id
        //   );
        //   console.log("selectedPostObject>>>>>",selectedPostObject)
        //   if (selectedPostObject) {
        //     setSelectedPost(selectedPostObject.post_name);
        //   }
        // }
        if (formData.applied_post_masters_id) {
          let selectedPostObject;
          categoriesResponse.data.forEach((category) => {
            category.applied_post_masters.forEach((post) => {
              if (post.id == formData.applied_post_masters_id) {
                selectedPostObject = post;
                return; // Break loop if post found
              }
            });
          });

          // console.log("selectedPostObject>>>>>", selectedPostObject);

          if (selectedPostObject) {
            setSelectedPost(selectedPostObject.post_name);
          }
        }
        if (formData.applied_subpost_master_id) {
          let selectedSubPostObject;
          categoriesResponse.data.forEach((category) => {
            category.applied_post_masters.forEach((post) => {
              post.applied_subpost_masters.forEach((subpost) => {
                if (subpost.id == formData.applied_subpost_master_id) {
                  selectedSubPostObject = subpost;
                  return;
                }
              });
            });
          });

          // console.log("selectedSubPostObject>>>>>", selectedSubPostObject);

          if (selectedSubPostObject) {
            setSelectedSubpost(selectedSubPostObject.subpost_name);
          }
        }

        const subjectRes = await apiService.getSubjectMaster(signal);
        setSubjects(subjectRes.data);
        if (formData.subjects_master_id) {
          const selectedSubjectObject = subjectRes.data.find(
            (subject) => subject.id == formData.subjects_master_id
          );
          // console.log("selectedSubjectObject>>>>>",selectedSubjectObject)
          if (selectedSubjectObject) {
            setSelectedSubject(selectedSubjectObject.subject_name);
          }
        }

        const countriesRes = await apiService.getCountries(signal);
        setCountries(countriesRes.data.data);
        if (formData.country) {
          setSelectedCountry(formData.country);
        }
        if (formData.city) {
          setSelectedCity(formData.city);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // Request was aborted, you can handle it if needed
          console.error("Error fetching job categories:", error);
        } else {
          // console.error("Error fetching job categories:", error);
        }
      }
    };

    fetchData();
    return () => {
      // Cleanup function to abort the request when the component unmounts
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selectedPost) {
      const selectedPostData = posts.find(
        (post) => post.post_name === selectedPost
      );
      setSubposts(
        selectedPostData ? selectedPostData.applied_subpost_masters : []
      );
      // console.log(subposts);
    } else {
      setSubposts([]);
    }
  }, [selectedPost, posts]);

  const handleCategoryChange = (event) => {
    setErrors({
      ...errors,
      job_category_master_id: "",
    });
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    const selectedCategoryData = categories.find(
      (category) => category.category_name === selectedCategory
    );
    setFormData((prevData) => ({
      personalDetails: {
        ...prevData.personalDetails,
        job_category_master_id: selectedCategoryData
          ? selectedCategoryData.id
          : "",
      },
    }));
    setPosts(
      selectedCategoryData ? selectedCategoryData.applied_post_masters : []
    );
    // Reset selected post and subposts
    setSelectedPost("");
    setSubposts([]);
  };

  const handlePostChange = (event) => {
    setErrors({
      ...errors,
      applied_post_masters_id: "",
    });
    const selectedPost = event.target.value;
    setSelectedPost(selectedPost);
    const selectedPostData = posts.find(
      (post) => post.post_name === selectedPost
    );

    setFormData((prevData) => ({
      personalDetails: {
        ...prevData.personalDetails,
        applied_post_masters_id: selectedPostData ? selectedPostData.id : "",
        // Add additional fields related to category if needed
      },
    }));
    setSubposts(
      selectedPostData ? selectedPostData.applied_subpost_masters : []
    );
  };

  const handleSubpostChange = (event) => {
    const selectedSubpostName = event.target.value;
    setSelectedSubpost(selectedSubpostName);
    const selectedSubpostData = subposts.find(
      (subpost) => subpost.subpost_name === selectedSubpostName
    );

    // Set applied_subpost_masters_id in the formData
    setFormData((prevData) => ({
      personalDetails: {
        ...prevData.personalDetails,
        applied_subpost_master_id: selectedSubpostData
          ? selectedSubpostData.id
          : "",
        // Add additional fields related to category if needed
      },
    }));
  };
  const handleSubjectChange = (event) => {
    setErrors({
      ...errors,
      subjects_master_id: "",
    });

    const selectedSubjectName = event.target.value;
    setSelectedSubject(selectedSubjectName);

    const selectedSubjectData = subjects.find(
      (subject) => subject.subject_name === selectedSubjectName
    );

    setFormData((prevData) => ({
      personalDetails: {
        ...prevData.personalDetails,
        subjects_master_id: selectedSubjectData ? selectedSubjectData.id : "",
      },
    }));
  };
  const handleCountryChange = (event) => {
    // set errors to null for country when changed
    setErrors({
      ...errors,
      country: "",
    });
    const countryValue = event.target.value;
    setSelectedCountry(countryValue);
    setSelectedCity("");
    setFormData((prevData) => ({
      personalDetails: {
        ...prevData.personalDetails,
        country: countryValue,
        city: "",
        // Add additional fields if needed
      },
    }));
  };
  const handleCityChange = (event) => {
    // set errors to null for city when changed
    setErrors({
      ...errors,
      city: "",
    });
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    setFormData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        city: cityValue,
      },
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxCharacters) {
      setFormData((prevData) => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          [name]: value,
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Maximum ${maxCharacters} characters allowed`,
      }));
    }
  };

  // --------------------------------------------------FORM VALIDATION-------------------------------------------

  return (
    <>
      <div className="container">
        <div className="personaldetails-form">
          <div>
            <h5 className="PD-heading">Personal Details</h5>
            <p className="PD-subheading">
              Please fill your information so we can get in touch with you.
            </p>
          </div>

          <form method="post">
            <div className="row">
              <div className="col-md-6">
                {/* Title */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Title
                  </label>
                  <select
                    name="title_first_name"
                    className="set-dropdown"
                    onChange={handleInputChange}
                    value={formData.title_first_name}
                    required
                  >
                    <option value="">Select Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.title_first_name}</span>
              </div>

              <div className="col-md-6">
                {/* Name */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>First Name
                  </label>

                  <input
                    autoFocus
                    className="set-input"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    id=""
                    onChange={handleInputChange}
                    value={formData.first_name}
                    required
                  ></input>

                  <FontAwesomeIcon className="set-icon" icon={faUser} />
                </div>
                <span className="error-message">{errors.first_name}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* *Last Name  */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Last Name
                  </label>

                  <input
                    className="set-input"
                    type="text"
                    name="last_name"
                    placeholder="Enter last Name"
                    id=""
                    value={formData.last_name}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <span className="error-message">{errors.last_name}</span>
              </div>
              <div className="col-md-6">
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Date of Birth:
                  </label>
                  <input
                    // className="date-input"
                    className="set-input"
                    type="date"
                    placeholder="MM/DD/YYYY"
                    name="dob"
                    id=""
                    onChange={handleInputChange}
                    value={formData.dob}
                    required
                  ></input>
                  {/* <FontAwesomeIcon  icon={faCalendar} /> */}
                </div>
                <span className="error-message">{errors.dob}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* Gender */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Gender
                  </label>
                  <select
                    name="gender"
                    className="set-dropdown"
                    onChange={handleInputChange}
                    value={formData.gender}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.gender}</span>
              </div>
              <div className="col-md-6">
                {/* Email */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Email
                  </label>
                  <input
                    className="set-input"
                    type="email"
                    placeholder="Email address"
                    name="email"
                    id=""
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  ></input>
                  <FontAwesomeIcon className="set-icon" icon={faEnvelope} />
                </div>
                <span className="error-message">{errors.email}</span>
                {/* ---------- */}
                {/* <span className="error-message">{emailExistenceError}</span> */}
                {/* ----------- */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* Phone No. */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Phone Number
                  </label>
                  <input
                    className="set-input"
                    type="number"
                    placeholder="(123)456-7890 "
                    name="contact_1"
                    id=""
                    maxLength={10}
                    value={formData.contact_1}
                    onChange={handleInputChange}
                    required
                  ></input>
                  <FontAwesomeIcon className="set-icon" icon={faMobile} />
                </div>
                <span className="error-message">{errors.contact_1}</span>
              </div>
              <div className="col-md-6">
                {/* Country */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Country
                  </label>
                  <select
                    name="country"
                    className="set-dropdown"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    required
                  >
                    <option key="" value="">
                      Select a country
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
              <div className="col-md-6">
                {/* City */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>City
                  </label>

                  <select
                    name="city"
                    className="set-dropdown"
                    value={selectedCity}
                    onChange={handleCityChange}
                    required
                  >
                    <option key="" value="">
                      Select a city
                    </option>
                    {(
                      countries.find(
                        (country) => country.country === selectedCountry
                      )?.cities || []
                    ).map((city,index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.city}</span>
              </div>
              <div className="col-md-6">
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Category of Appointment
                  </label>
                  <select
                    name="category_name"
                    id="categoryDropdown"
                    className="set-dropdown"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.category_name}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">
                  {errors.job_category_master_id}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Post Applied For
                  </label>
                  <select
                    id="postDropdown"
                    value={selectedPost}
                    onChange={handlePostChange}
                    className="set-dropdown"
                    required
                  >
                    {/* <option value="">Select a post</option> */}
                    <option value="">{selectedPost&&selectedPost?selectedPost: "Select a post"}</option>
                    {posts.map((post,index) => (
                      <option key={index} value={post.post_name}>
                        {post.post_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">
                  {errors.applied_post_masters_id}
                </span>
              </div>
              <div className="col-md-6">
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span> </span> Sub Post Applied For
                  </label>
                  <select
                    id="subpostDropdown"
                    className="set-dropdown"
                    value={selectedSubpost}
                    onChange={handleSubpostChange}
                  >
                  <option value="">{selectedSubpost&&selectedSubpost?selectedSubpost: "Select a subpost"}</option>
                 
                    {subposts.map((subpost,index) => (
                      <option
                        key={index}
                        value={subpost.subpost_name}
                      >
                        {subpost.subpost_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Subject
                  </label>
                  <select
                    id="subjectDropdown"
                    className="set-dropdown"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    required
                  >
                    {/* <option value="">Select a subject</option> */}
                    <option value="">{selectedSubject&&selectedSubject?selectedSubject: "Select a subject"}</option>
                    {subjects.map((subject,index) => (
                      <option key={index} value={subject.subject_name}>
                        {subject.subject_name}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">
                  {errors.subjects_master_id}
                </span>
              </div>
            </div>
            <p className="error-message">{errors.maxCharacters}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalDeatils;
