import React, { useState } from "react";
import "./ApplyNow.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserDetails from "../ApplyNowForm/UserDetails/UserDetails";
import UserExperience from "./UserExperience/UserExperience";
import ResearchWorks from "./ResearchWorks/ResearchWorks";
import UserQualification from "./UserQualification/UserQualification";
import Programs from "./Programs/Programs";
import Reference from "./Reference/Reference";
import OTPVerification from "../../DropCV/OTPVerifivation/OTPVerification";
import Submitsuccess from "../../DropCV/OTPVerifivation/Submitsuccess";
import Header from "../../../components/Header/Header";
import Footers from "../../../components/Footer/Footers";
import { CANDIDATE_BASE_URL } from "../../../config/config";
import apiService from "../../../Services/ApiServices";
import Notification from "../../../Notification/Notification";
const steps = ["", "", "", "", "", ""];
function ApplyNow() {
  const [otpButtonclicked, setOtpButtonclicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpData, setOtpData] = useState({});

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  const [formValues, setFormValues] = useState({
    UserDetails: {
      password: "123456",
      email: "",
      contact_1: "",
      title_first_name: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      gender: "",
      religion: "",
      city: "",
      cast_category_name: "",
      marital_status: "",
      address_1: "",
      contact_2: "",
      country: "",
      specialization: "",
      state_province: "",
      applied_post_masters_id: "",
      nature_of_job: "",
      department_master_id: "",
      pin_code: "",
      educations: [
        {
          exam_types_master_id: 7,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          year_end: "",
          grade_division: "",
          grade_percent: "",
        }, // educations[0] mein highSchool ka data
        {
          exam_types_master_id: 8,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          year_end: "",
          grade_division: "",
          grade_percent: "",
          stream: "",
        }, // educations[1] mein higherSecondary ka data
        {
          exam_types_master_id: 2,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          degree_types_name: "",
          year_end: "",
          grade_percent: "",
          specialization_area_1: "",
        }, // educations[2] mein Graduation ka data
        {
          exam_types_master_id: 3,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          degree_types_name: "",
          year_end: "",
          grade_percent: "",
          specialization_area_1: "",
        }, // educations[3] mein PostGraduation ka data
        {
          exam_types_master_id: 5,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          degree_types_name: "",
          year_end: "",
          grade_percent: "",
          specialization_area_1: "",
        }, // educations[4] mein MPHIL ka data
        {
          exam_types_master_id: 4,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          degree_types_name: "",
          year_end: "",
          grade_percent: "",
          specialization_area_1: "",
          specialization_area_2: "",
          specialization_area_3: "",
        }, // educations[5] mein Phd ka data
        {
          exam_types_master_id: 11,

          year_end: "",
        }, // educations[6] mein Gate ka data
        {
          exam_types_master_id: 9,

          year_end: "",
        }, // educations[7] mein Neet ka data
        {
          exam_types_master_id: 1,
          country: "",
          year_start: "",
          institute_name: "",
          board_university_name: "",
          year_end: "",
          grade_division: "",
          grade_percent: "",
          stream: "",
        }, // educations[8] mein Diploma ka data
      ],
      experiences: [
        {
          company_experience_name: "",
          designation: "",
          gross_pay: "",
          exp_work_from: "",
          exp_work_to: "",
        },
      ],
      total_academic_exp: "",
      total_industrial_exp: "",
      benefits_accommodation: "",
      benefits_transportation: "",
      benefits_food: "",
      benefits_mediclaim: "",
      benefits_others: "",
      // --------------------------------------------------------------------
      researches: [{ orcid: "", scopusid: "", researchid: "" }],
      journal_publications: [
        {
          journal_publication_year: "",
          journal_publication_title: "",
          journal_publication_author: "",
          journal_publication_index: "",
          journal_publication_name: "",
          journal_publication_issn: "",
          journal_publication_volume: "",
          journal_publication_issue: "",
        },
      ],
      conference_publications: [
        {
          conference_publication_year: "",
          conference_publication_title: "",
          conference_publication_author: "",
          conference_publication_index: "",
          conference_publication_name: "",
          conference_publication_issn: "",
          conference_publication_volume: "",
          conference_publication_issue: "",
        },
      ],
      patents: [
        {
          patent_applicationid: "",
          patent_application_title: "",
          patent_application_year: "",
          patent_granted_by: "",
          patent_incountry: "",
        },
      ],
      copyrights: [
        {
          copyright_applicationid: "",
          copyright_title: "",
          copyright_year: "",
          copyright_granted_by: "",
          copyright_incountry: "",
        },
      ],

      seminar_organised: [
        {
          organise_date_from: "",
          organise_date_to: "",
          name_of_course: "",
          sponsered_by: "",
          participants_number: "",
          name_of_institute: "",
          name_of_industry: "",
        },
      ],
      seminar_attend: [
        {
          attend_date_from: "",
          attend_date_to: "",
          name_of_course: "",
          sponsered_by: "",
        },
      ],
      other_membership_info: [
        {
          member_of_institute_name: "",
          membership_date_from: "",
          membership_date_to: "",
          position_held: "",
          contribution: "",
        },
      ],
      awards_won: "",
      extra_activities: "",
      any_other_info: "",
      expected_joining_time: "",

      reference_person_1: "",
      reference_person_2: "",
      ref_org_1: "",
      ref_org_2: "",
      ref_person_position_1: "",
      ref_person_position_2: "",
      hearing_source_about_us: "",
      application_purpose: "",
      ref_person_1_email: "",
      ref_person_2_email: "",
      ref_person_1_contact: "",
      ref_person_2_contact: "",
      candidate_cv: "",
    },
  });
  const [selectedComponent, setSelectedComponent] = useState();
  // const [formValuesToSend, setformValuesToSend] = useState();

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [formDataToSend, setformDataToSend] = useState();

  // const transferAllData = async () => {
  //   try {
  //     const formValuesToSend = { UserDetails: { ...formValues.UserDetails } };
  //     setformValuesToSend(formValuesToSend);
  //     const otpData = {
  //       email: formValues.UserDetails.email,
  //       contact_1: formValues.UserDetails.contact_1,
  //       first_name: formValues.UserDetails.first_name,
  //     };
  //     setOtpData(otpData);
  //     const response = await apiService.generateOTP(otpData);
  //     console.log("API Response:", response);
  //     setSelectedComponent("OTPVerification");
  //     setOtpButtonclicked(true);
  //     setShowHeaderFooter(false);
  //   } catch (error) {
  //     setOtpButtonclicked(true);
  //     console.error(
  //       "Error while posting form data and file:",
  //       error.response || error
  //     );
  //     console.log(error.response);
  //   }
  // };

  const transferAllData = async () => {
    try {
      const formDataToSend = new FormData();

      // Object.entries(formValues.UserDetails).forEach(([key, value]) => {
      //   if (key === "educations" && Array.isArray(value)) {
      //     formDataToSend.append(key, JSON.stringify(value));
      //   }
      //   if (key === "experiences" && Array.isArray(value)) {
      //     formDataToSend.append(key, JSON.stringify(value));
      //   } else {
      //     formDataToSend.append(key, value);
      //   }
      // });

      for (const [key, value] of Object.entries(formValues.UserDetails)) {
        if (key === "educations" && Array.isArray(value)) {
          value.forEach((education, index) => {
            Object.entries(education).forEach(([eduKey, eduValue]) => {
              formDataToSend.append(`${key}[${index}][${eduKey}]`, eduValue);
            });
          });
        }         
        else if (key === "seminar_attend" && Array.isArray(value)) {
          value.forEach((seminar_attends, index) => {
            Object.entries(seminar_attends).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } 
        else if (key === "experiences" && Array.isArray(value)) {
          value.forEach((experience, index) => {
            Object.entries(experience).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "researches" && Array.isArray(value)) {
          value.forEach((researche, index) => {
            Object.entries(researche).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "journal_publications" && Array.isArray(value)) {
          value.forEach((journal_publication, index) => {
            Object.entries(journal_publication).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "conference_publications" && Array.isArray(value)) {
          value.forEach((conference_publication, index) => {
            Object.entries(conference_publication).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "patents" && Array.isArray(value)) {
          value.forEach((patent, index) => {
            Object.entries(patent).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "copyrights" && Array.isArray(value)) {
          value.forEach((copyright, index) => {
            Object.entries(copyright).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else if (key === "seminar_organised" && Array.isArray(value)) {
          value.forEach((seminar_organiseds, index) => {
            Object.entries(seminar_organiseds).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        }else if (key === "other_membership_info" && Array.isArray(value)) {
          value.forEach((other_membership_infos, index) => {
            Object.entries(other_membership_infos).forEach(([expKey, expValue]) => {
              formDataToSend.append(`${key}[${index}][${expKey}]`, expValue);
            });
          });
        } else {
          formDataToSend.append(key, value);
        }
      }
      setformDataToSend(formDataToSend);
      setOtpButtonclicked(true);
      setShowHeaderFooter(false);

      console.log("formDataToSend", formDataToSend);
      setformDataToSend(formDataToSend);

      const otpData = {
        email: formValues.UserDetails.email,
        contact_1: formValues.UserDetails.contact_1,
        first_name: formValues.UserDetails.first_name,
      };
      setOtpData(otpData);

      const response = await apiService.generateOTP(otpData);
      console.log("API Response:", response);
      setSelectedComponent("OTPVerification");
    } catch (error) {
      console.error(
        "Error while posting form data and file:",
        error.response || error
      );
      // console.log(error.response.data);
    }
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNext = async () => {
    console.log("Form formValues:", formValues);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setSkipped(newSkipped);

    const isCurrentStepValid = inputValidations();
    // console.log("isCurrentStepValid", isCurrentStepValid);
    if (isCurrentStepValid) {
      const emailToCheck = formValues.UserDetails.email.trim();
      const contactToCheck = formValues.UserDetails.contact_1.trim().toString();
      try {
        const responseEmail = await fetch(
          `${CANDIDATE_BASE_URL}/register/isemail_contact_exist?data=${emailToCheck}`,
          {
            method: "GET",
            headers: {
              key: "data",
              value: `${emailToCheck}`,
            },
          }
        );
        const responseContact = await fetch(
          `${CANDIDATE_BASE_URL}/register/isemail_contact_exist?data=${contactToCheck}`,
          {
            method: "GET",
            headers: {
              key: "data",
              value: `${contactToCheck}`,
            },
          }
        );
        // console.log("response", responseEmail.ok, responseContact.ok);
        if (!responseEmail.ok) {
          // console.log("response", responseEmail.ok, responseContact.ok);
          throw new Error(`HTTP error! Status: ${responseEmail.status}`);
        }

        if (!responseContact.ok) {
          // console.log("response", responseEmail.ok, responseContact.ok);
          throw new Error(`HTTP error! Status: ${responseContact.status}`);
        }

        const dataEmail = await responseEmail.json();
        const dataContact = await responseContact.json();
        // console.log("dataEmail", dataEmail, dataContact);
        if (dataEmail) {
          // alert("This email is already registered.");

          setAlertMessage("This email is already registered.");
          setAlertSeverity("error");
          setOpen(true);
        } else if (dataContact) {
          // alert("This contact is already registered.");
          setAlertMessage("This contact is already registered.");
          setAlertSeverity("error");
          setOpen(true);
        } else {
          // console.log("Email and contact do not exist in the database");
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } catch (error) {
        console.error("Error checking email/contact existence:", error);
      }
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // console.log(formValues);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormValues((prevFormValues) => {
      return { ...prevFormValues };
    });
  };

  const inputValidations = () => {
    const {
      email,
      contact_1,
      title_first_name,
      first_name,
      // middle_name,
      last_name,
      dob,
      gender,
      religion,
      city,
      cast_category_name,
      marital_status,
      address_1,
      contact_2,
      country,
      // state_province,
      applied_post_masters_id,
      nature_of_job,
      department_master_id,
      pin_code,
      // exam_types_master_id,
      specialization,

      // year_start,
      // institute_name,
      // board_university_name,
      // year_end,
      // grade_division,
      // grade_percent,
      // stream,
      // candidate_cv,
      total_academic_exp,
      total_industrial_exp,
      // company_experience_name,
      // accept,
    } = formValues.UserDetails;
    const caseZerovalidation = () => {
      if (!email) {
        errors.email = "! Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "! Please enter a valid email address.";
      } else {
        try {
          const apiUrl = `${CANDIDATE_BASE_URL}/register/isemail_contact_exist?data=${encodeURIComponent(
            email
          )}`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.exists) {
                setErrors({ email: "! This email is already registered." });
              }
            })
            .catch((error) => {
              console.error("Error checking email existence:", error);
            });
        } catch (error) {
          console.error("Error Fetching Registered Email:", error);
        }
      }
      if (!contact_1) {
        errors.contact_1 = "! Contact number is Required.";
      } else if (contact_1.length !== 10) {
        errors.contact_1 = "! Please enter a valid 10-digit contact number.";
      }
      if (contact_2 && contact_2.length !== 10) {
        errors.contact_2 = "! Please enter a valid 10-digit contact number.";
      } else if (contact_1 && contact_2 && contact_1 === contact_2) {
        errors.contact_2 = "! Alternate numbers should be different.";
      }
      if (!title_first_name) {
        errors.title_first_name = "! Title is Required.";
      }
      if (!first_name) {
        errors.first_name = "! First Name is Required.";
      } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(first_name)) {
        errors.first_name = "! Please enter a valid name.";
      }
      if (!last_name) {
        errors.last_name = "! Last Name is Required.";
      } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/u.test(last_name)) {
        errors.last_name = "! Please enter a valid name.";
      }
      if (!dob) {
        errors.dob = "! Date Of Birt is Required";
      } else if (
        !dob ||
        dobYear < currentYear - 100 ||
        dobYear > currentYear ||
        new Date(dob) > new Date()
      ) {
        errors.dob = "! Please enter a valid date of Birth.";
      }
      if (!gender) {
        errors.gender = "! Gender is Required.";
      }
      if (!religion) {
        errors.religion = "! Relegion is Required";
      }
      if (!cast_category_name) {
        errors.cast_category_name = "! Cast Category is Required";
      }
      if (!marital_status) {
        errors.marital_status = "! Marital Status is Required";
      }
      if (!address_1) {
        errors.address_1 = "! Address is Required";
      }
      if (!country) {
        errors.country = "! Country is required.";
      }
      if (!city) {
        errors.city = "! City is required.";
      }
      if (!applied_post_masters_id) {
        errors.applied_post_masters_id = "! Post Applied is Required";
      }
      if (!nature_of_job) {
        errors.nature_of_job = "! Nature of Job is Required";
      }
      if (!department_master_id) {
        errors.department_master_id = "! Department is Required";
      }
      if (!pin_code) {
        errors.pin_code = "Pin Code is Required";
      } else if (!/^\d+$/.test(pin_code)) {
        errors.pin_code = "Please enter a Pin Code with only numeric digits.";
      } else if (pin_code.length !== 6) {
        errors.pin_code = "Pin Code must be exactly 6 digits.";
      } else {
      }
      if (!specialization) {
        errors.specialization = "Specialization is Required";
      } else if (/^\d+$/.test(specialization)) {
        errors.specialization = "Specialization should not contain numbers";
      }
    };
    const caseOnevalidation = () => {
      if (
        !formValues.UserDetails.educations[0].country ||
        !formValues.UserDetails.educations[1].country
      ) {
        errors.country = "! Country is Required";
      }

      if (!formValues.UserDetails.educations[0].year_start) {
        errors.year_start = "! Year of Joining is Required";
      } else {
        const enteredStartYear = parseInt(
          formValues.UserDetails.educations[0].year_start,
          10
        );

        if (
          isNaN(enteredStartYear) ||
          enteredStartYear > currentYear ||
          enteredStartYear < currentYear - 100
        ) {
          errors.year_start =
            "! Please enter a valid year within the last 100 years.";
        }
      }

      if (!formValues.UserDetails.educations[0].year_end) {
        errors.year_end = "! Passing Year is Required";
      } else {
        const enteredEndYear = parseInt(
          formValues.UserDetails.educations[0].year_end,
          10
        );

        if (
          isNaN(enteredEndYear) ||
          enteredEndYear > currentYear ||
          enteredEndYear < currentYear - 100
        ) {
          errors.year_end =
            "! Please enter a valid passing year within the last 100 years.";
        }
      }

      if (!formValues.UserDetails.educations[1].year_start) {
        errors.year_start_2 = "! Year of Joining is Required";
      } else {
        const enteredStartYear_2 = parseInt(
          formValues.UserDetails.educations[1].year_start,
          10
        );

        if (
          isNaN(enteredStartYear_2) ||
          enteredStartYear_2 > currentYear ||
          enteredStartYear_2 < currentYear - 100
        ) {
          errors.year_start_2 =
            "! Please enter a valid year within the last hundred years.";
        }
      }

      if (!formValues.UserDetails.educations[1].year_end) {
        errors.year_end_2 = "! Passing Year is Required";
      } else {
        const enteredEndYear_2 = parseInt(
          formValues.UserDetails.educations[1].year_end,
          10
        );

        if (
          isNaN(enteredEndYear_2) ||
          enteredEndYear_2 > currentYear ||
          enteredEndYear_2 < currentYear - 100
        ) {
          errors.year_end_2 =
            "! Please enter a valid passing year within the last 100 years.";
        }
      }

      if (
        !formValues.UserDetails.educations[0].institute_name ||
        !formValues.UserDetails.educations[1].institute_name
      ) {
        errors.institute_name = "! School Name is Required";
      }
      if (
        !formValues.UserDetails.educations[0].board_university_name ||
        !formValues.UserDetails.educations[0].board_university_name
      ) {
        errors.board_university_name = "! Board is Required";
      }

      if (
        !formValues.UserDetails.educations[0].grade_division ||
        !formValues.UserDetails.educations[0].grade_division
      ) {
        errors.grade_division = "! Division is Required";
      }
      if (
        !formValues.UserDetails.educations[0].grade_percent ||
        !formValues.UserDetails.educations[1].grade_percent
      ) {
        errors.grade_percent = "! Percentage is Required";
      }
      if (!formValues.UserDetails.educations[1].stream) {
        errors.stream = "! Stream is Required";
      }
    };
    const caseTwovalidation = () => {
      const companyName =
        formValues.UserDetails.experiences[0].company_experience_name;
      const userDesignation = formValues.UserDetails.experiences[0].designation;
      const userJoiningDate =
        formValues.UserDetails.experiences[0].exp_work_from;
      const userLeavingDate = formValues.UserDetails.experiences[0].exp_work_to;

      if (!formValues.UserDetails.experiences[0].company_experience_name) {
        errors.company_experience_name = "! Company Name is Required";
      } else {
        const isValidCompanyName = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(
          companyName
        );

        if (!isValidCompanyName) {
          errors.company_experience_name =
            "! Please enter a valid company name";
        }
      }
      if (!userDesignation) {
        errors.designation = "! Designation is Required";
      } else {
        const isValidDesignation = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(
          userDesignation
        );

        if (!isValidDesignation) {
          errors.designation = "! Please enter a valid designation";
        }
      }
      if (!formValues.UserDetails.experiences[0].gross_pay) {
        errors.gross_pay = "Current Gross-Pay is Required";
      } else {
        const numericValue = parseFloat(
          formValues.UserDetails.experiences[0].gross_pay
        );

        if (isNaN(numericValue) || numericValue <= 0) {
          errors.gross_pay = "Please enter a valid Gross-Pay .";
        } else if (
          !/^\d+(\.\d+)?$/.test(formValues.UserDetails.experiences[0].gross_pay)
        ) {
          errors.gross_pay = "Please enter a valid Gross-Pay .";
        }
      }

      const currentDate = new Date();
      const enteredJoiningDate = new Date(userJoiningDate);
      if (!userJoiningDate) {
        errors.exp_work_from = "! Joining Date is Required";
      } else {
        const currentDate = new Date();
        const enteredJoiningDate = new Date(userJoiningDate);

        const isJoiningDateValid =
          enteredJoiningDate < currentDate &&
          enteredJoiningDate >= new Date(currentDate.getFullYear() - 100, 0, 1);

        if (!isJoiningDateValid) {
          errors.exp_work_from = "! Please enter a valid Joining Date";
        }
      }

      if (!userLeavingDate) {
        errors.exp_work_to = "! Leaving Date is Required";
      } else {
        const enteredLeavingDate = new Date(userLeavingDate);

        const isLeavingDateValid =
          enteredLeavingDate < currentDate &&
          enteredLeavingDate >= new Date(currentDate.getFullYear() - 100, 0, 1);

        if (!isLeavingDateValid) {
          errors.exp_work_to = "! Please enter a valid Leaving Date";
        }

        if (enteredJoiningDate >= enteredLeavingDate) {
          errors.exp_work_from = "! Joining Date should be before Leaving Date";
          errors.exp_work_to = "! Leaving Date should be after Joining Date";
        }
      }

      if (!total_academic_exp) {
        errors.total_academic_exp = "Total Academic Experience is Required.";
      } else if (isNaN(total_academic_exp)) {
        errors.total_academic_exp = "Please enter a valid number.";
      } else {
        const numericValue = parseFloat(total_academic_exp);
        if (numericValue < 0 || numericValue > 100) {
          errors.total_academic_exp =
            "Please enter a number between 0 and 100.";
        }
      }
      if (!total_industrial_exp) {
        errors.total_industrial_exp = "Total Industry Experience is Required.";
      } else if (isNaN(total_industrial_exp)) {
        errors.total_industrial_exp = "Please enter a valid number.";
      } else {
        const numericValue = parseFloat(total_industrial_exp);
        if (numericValue < 0 || numericValue > 100) {
          errors.total_industrial_exp =
            "Please enter a number between 0 and 100.";
        }
      }
    };
    const caseFivevalidation = () => {
      if (!formValues.UserDetails.candidate_cv) {
        errors.candidate_cv = "Candidate Resume is Required";
      } else {
        const allowedExtensions = ["pdf", "doc", "docx"];
        const maxFileSize = 2 * 1024 * 1024;

        const file = formValues.UserDetails.candidate_cv;
        const fileNameParts = file.name.split(".");
        const fileExtension =
          fileNameParts[fileNameParts.length - 1].toLowerCase();
        const fileSize = file.size;

        if (!allowedExtensions.includes(fileExtension)) {
          errors.candidate_cv =
            "Invalid file format. Please upload a PDF, DOC, or DOCX file.";
        } else if (fileSize > maxFileSize) {
          errors.candidate_cv = "File size exceeds the limit of 2MB.";
        }
      }
    };

    let errors = {};
    const currentYear = new Date().getFullYear();
    const dobYear = dob ? new Date(dob).getFullYear() : null;
    switch (activeStep) {
      case 0:
        caseZerovalidation();
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }

      case 1:
        caseOnevalidation();
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }
      case 2:
        caseTwovalidation();
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }
      case 3:
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }
      case 4:
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }
      case 5:
        caseFivevalidation();
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return false;
        } else {
          setErrors({});
          return true;
        }
    }
  };
  let componentToShow;
  switch (selectedComponent) {
    case "OTPVerification":
      componentToShow = (
        <OTPVerification otpData={otpData} transferAllData={formDataToSend} />
      );
      break;
    default:
      componentToShow = null;
  }
  return (
    <>
      {showHeaderFooter && <Header />}
      <div
        className={
          otpButtonclicked ? "apply-now-forms hidden" : "apply-now-forms"
        }
      >
        <Box sx={{ width: "100%" }}>
          <div className="my-stepper">
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
          </div>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={transferAllData}>Get OTP</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <UserDetails
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 1 && (
                <UserQualification
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 2 && (
                <UserExperience
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 3 && (
                <ResearchWorks
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 4 && (
                <Programs
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 5 && (
                <Reference
                  formValues={formValues.UserDetails}
                  setFormValues={setFormValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {activeStep === 6 && <OTPVerification />}
              {activeStep === 7 && <Submitsuccess />}
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
      {showHeaderFooter && <Footers />}
    </>
  );
}

export default ApplyNow;
