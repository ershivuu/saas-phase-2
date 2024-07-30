import React from "react";
import "./DropCV.css";
// import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalDeatils from "./PersonalDetails/PersonalDeatils";
import Qualification from "./Qualification/Qualification";
import CurrentExperience from "./CurrentExperience/CurrentExperience";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footers";
import OTPVerification from "./OTPVerifivation/OTPVerification";
import apiService from "../../Services/ApiServices";
// import { BASE_URL } from "../../config/config";
import { CANDIDATE_BASE_URL } from "../../config/config";
import Notification from "../../Notification/Notification";

const steps = ["", "", ""];

function Dropcv() {
  const [otpData, setOtpData] = useState({});
  const [otpButtonClicked, setOtpButtonClicked] = useState(false);
  const [isFresher, setIsFresher] = useState(false);
  // const [formErrors, setFormErrors] = useState({});
  const [showHeaderFooter, setShowHeaderFooter] = useState(true); // New state
  // const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // console.log("IS fresher data......................./", isFresher);
  const initialEducation = {
    degree_types_master_id: "",
    exam_types_master_id: "",
    degree_status: "",
  };
  const [formData, setFormData] = useState({
    personalDetails: {
      title_first_name: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      gender: "",
      email: "",
      password: "123456",
      contact_1: "",
      country: "",
      city: "",
      subjects_master_id: 0,
      applied_post_masters_id: 0,
      applied_subpost_master_id: 0,
      job_category_master_id: 0,
      educations: [initialEducation],
      total_experience: "",
      total_research_exp: "",
      total_industrial_exp: "",
      current_organization: "",
      current_designation: "",
      current_salary: "",
      candidate_cv: "",
    },
  });

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCheckboxChange = (newIsFresher) => {
    setIsFresher(newIsFresher);
    // Do anything else you need to do with the updated value in the parent component
  };

  const [errors, setErrors] = useState({});

  const [formDataToSend, setformDataToSend] = useState();
  const [selectedComponent, setSelectedComponent] = useState();
  const transferDropCvData = async () => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData.personalDetails).forEach(([key, value]) => {
        if (key === "educations" && Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      setformDataToSend(formDataToSend);
      setOtpButtonClicked(true);
      setShowHeaderFooter(false);

      // console.log("formDataToSend", formDataToSend);
      setformDataToSend(formDataToSend);
    } catch (error) {
      console.error(
        "Error while posting form data and file:",
        error.response || error
      );
      // console.log(error.response.data);
    }
    const otpData = {
      email: formData.personalDetails.email,
      contact_1: formData.personalDetails.contact_1,
      first_name: formData.personalDetails.first_name,
    };
    setOtpData(otpData);

    await apiService.generateOTP(otpData);
    // console.log("API Response:", response);
    setSelectedComponent("OTPVerification");
  };
  // const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   const isCurrentStepValid = validateCurrentStep();

  //   if (isCurrentStepValid) {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   } else {
  //     // alert("Please fill in all required fields before proceeding.");

  //   }
  //   console.log(formData);
  // };

  const handleNext = async () => {
    // console.log(">>>>>>", formData.personalDetails);
    const isCurrentStepValid = validateCurrentStep();

    if (isCurrentStepValid) {
      const emailToCheck = formData.personalDetails.email.trim();
      const contactToCheck = formData.personalDetails.contact_1.trim();

      try {
        // console.log("emailToCheck", emailToCheck);
        const response_email = await fetch(
          `${CANDIDATE_BASE_URL}/register/isemail_contact_exist?data=${emailToCheck}`,
          {
            method: "GET",
            headers: {
              key: "data",
              value: `${emailToCheck}`,
            },
          }
        );
        const response_contact = await fetch(
          `${CANDIDATE_BASE_URL}/register/isemail_contact_exist?data=${contactToCheck}`,
          {
            method: "GET",
            headers: {
              key: "data",
              value: `${contactToCheck}`,
            },
          }
        );

        // console.log(response_email.ok, "response");
        // console.log(response_contact.ok, "response");

        if (!response_email.ok) {
          throw new Error(`HTTP error! Status: ${response_email.status}`);
        }
        if (!response_contact.ok) {
          throw new Error(`HTTP error! Status: ${response_contact.status}`);
        }

        const data = await response_email.json();
        // console.log("fetch-data for email", data);
        const data_contact = await response_contact.json();
        // console.log("fetch-data contact", data_contact);

        if (data) {
          // alert("This email is already registered.");

          setAlertMessage("This email is already registered.");
          setAlertSeverity("error");
          setOpen(true);
        } else if (data_contact) {
          // alert("This contact is already registered.");
          setAlertMessage("This contact is already registered.");
          setAlertSeverity("error");
          setOpen(true);
        } else {
          // console.log("contact does not exist in database");
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } catch (error) {
        console.error("Error checking email existence:", error);
      }
    }

    // console.log(formData);
  };

  // --------------------------------------------------------------------------------
  const validateCurrentStep = () => {
    // modified validation function for all steps
    const {
      title_first_name,
      first_name,
      // middle_name,
      last_name,
      dob,
      gender,
      email,
      // password,
      contact_1,
      country,
      city,
      subjects_master_id,
      applied_post_masters_id,
      // applied_subpost_master_id,
      job_category_master_id,
      // candidate_cv,
      // total_experience,
      // total_research_exp,
      // total_industrial_exp,
      // current_organization,
      // current_salary,
      // current_designation,
    } = formData.personalDetails;

    let errors = {};

    switch (activeStep) {
      case 0:
        const currentYear = new Date().getFullYear();
        const dobYear = dob ? new Date(dob).getFullYear() : null;
        if (!title_first_name) {
          errors.title_first_name = "! Title is required.";
        }

        if (!first_name) {
          errors.first_name = "! First name is required.";
        } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(first_name)) {
          errors.first_name = "! Please enter a valid name.";
        }
        if (!last_name) {
          errors.last_name = "! Last name is required.";
        } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(last_name)) {
          errors.last_name = "! Please enter a valid name.";
        }
        if (
          !dob ||
          dobYear < currentYear - 100 ||
          dobYear > currentYear ||
          new Date(dob) > new Date()
        ) {
          errors.dob = "! Please enter a valid date of birth.";
        }

        if (!gender) {
          errors.gender = "! Gender is required.";
        }

        if (!email) {
          errors.email = "! Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "! Please enter a valid email address.";
        }

        if (!contact_1) {
          errors.contact_1 = "! Contact number is required.";
        } else if (contact_1.length !== 10)
          errors.contact_1 = "! Please enter a valid 10-digit contact number.";

        if (!country) {
          errors.country = "! Country is required.";
        }

        if (!city) {
          errors.city = "! City is required.";
        }
        if (!job_category_master_id) {
          errors.job_category_master_id = "! Category is required";
        }
        if (!applied_post_masters_id) {
          errors.applied_post_masters_id = "! Post is required";
        }

        if (!subjects_master_id) {
          errors.subjects_master_id = "! Subject is required";
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }

      case 1:
        if (
          formData.personalDetails.educations.some(
            (education) =>
              !education.degree_types_master_id ||
              !education.exam_types_master_id ||
              !education.degree_status
          )
        ) {
          setErrors({ qualification: "Education details are incomplete." });
          return false;
        } else if (!applied_post_masters_id || !subjects_master_id) {
          setErrors({
            qualification: "Applied Post Masters and Subjects are required.",
          });
          return false;
        }
        if (Object.keys(errors).length > 0) {
          // If there are errors, set the state with error messages
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }

      case 2:
        if (!isFresher) {
          if (!formData.personalDetails.total_experience) {
            setErrors({
              total_experience: "! Experience is Required",
            });
            return false;
          }
          if (!formData.personalDetails.total_research_exp) {
            setErrors({
              total_research_exp: "! Research is Required",
            });
            return false;
          }
          if (!formData.personalDetails.total_industrial_exp) {
            setErrors({
              total_industrial_exp: "! Industry is Required",
            });
            return false;
          }
          if (!formData.personalDetails.current_organization) {
            setErrors({
              current_organization: "! Current Organization is Required",
            });
            return false;
          }
          if (!formData.personalDetails.current_designation) {
            setErrors({
              current_designation: "! Current Designation is Required",
            });
            return false;
          }
          if (!formData.personalDetails.current_salary) {
            setErrors({
              current_salary: "! Current Salary is Required",
            });
            return false;
          }
          if (!formData.personalDetails.candidate_cv) {
            setErrors({
              candidate_cv: "! CV is Required",
            });
            return false;
          }
          if (!formData.personalDetails.candidate_cv) {
            setErrors({
              candidate_cv: "! CV is Required",
            });
            return false;
          }
          if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
          } else {
            setErrors({});
            return true;
          }
        } else {
          setErrors({
            total_experience: "00",
            total_research_exp: "00",
            total_industrial_exp: "00",
            current_organization: "NA",
            current_designation: "Freshers",
            current_salary: "00",
          });
        }
        if (!formData.personalDetails.candidate_cv) {
          setErrors({
            candidate_cv: "! CV is Required",
          });
          return false;
        }

      default:
        return true;
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
  };

  let componentToShow;
  switch (selectedComponent) {
    case "OTPVerification":
      componentToShow = (
        <OTPVerification
          otpData={otpData}
          transferDropCvData={formDataToSend}
        />
      );
      break;
    default:
      componentToShow = null;
  }
  // ----------------------------------------------------------
  return (
    <>
      {showHeaderFooter && <Header />}
      <div
        className={otpButtonClicked ? "contact-forms hidden" : "contact-forms"}
      >
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={transferDropCvData}>Get OTP</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <PersonalDeatils
                  formData={formData.personalDetails}
                  setFormData={setFormData}
                  // passed errors and set errors states as props
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 1 && (
                <Qualification
                  formData={formData.personalDetails}
                  setFormData={setFormData}
                  // passed errors and set errors states as props
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 2 && (
                <CurrentExperience
                  formData={formData.personalDetails}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors} // Make sure you pass setErrors as a prop
                  isFresher={isFresher}
                  // setFormErrors={setFormErrors}
                  onCheckboxChange={handleCheckboxChange}
                />
              )}
              {activeStep === 3 && <OTPVerification />}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep > 0 && (
                  <Button
                    className="prev-btn"
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Previous
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext} className="next-btn">
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  <Notification
                    open={open}
                    handleClose={handleClose}
                    alertMessage={alertMessage}
                    alertSeverity={alertSeverity}
                  />
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
      <div>{componentToShow}</div>
      {/* <Footer></Footer> */}
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default Dropcv;
