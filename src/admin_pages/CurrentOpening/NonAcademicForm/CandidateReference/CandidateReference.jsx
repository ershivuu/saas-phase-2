import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";

function CandidateReference({ formValues, setFormValues, errors, setErrors }) {
  // const [checkboxError, setCheckboxError] = useState("");
  // const [formValues, setFormValues] = useState({

    // reference_person_1:'',
    // reference_person_2:'',
    // ref_org_1:'',
    // ref_org_2:'',
    // ref_person_position_1:'',
    // ref_person_position_2:'',
    // hearing_source_about_us:'',
    // application_purpose:'',
    // ref_person_1_email:'',
    // ref_person_2_email:'',
    // ref_person_1_contact:'',
    // ref_person_2_contact:'',

  // });



  // const handleChange = (e) => {
  //   setErrors({
  //     ...errors,
  //     hearing_source_about_us: "",
  //   });
  //   const { name, value } = e.target;
  //   setFormValues((prevData) => ({
  //     UserDetails: {
  //       ...prevData.UserDetails,
  //       [name]: value,
  //     },
  //   }));
  // };


  // const handleChange = (e) => {
  //   const { name, value } = e.target;  
    
  //   if (value.length > 40) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: `Maximum 40 characters allowed`,
  //     }));
  //   } else {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: "",
  //     }));
  //     setFormValues((prevData) => ({
  //       UserDetails: {
  //         ...prevData.UserDetails,
  //         [name]: value,
  //       },
  //     }));
  //   }  
  // };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxCharacters = name === "application_purpose" ? 100 : 40;
  
    if (value.length > maxCharacters) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Maximum ${maxCharacters} characters allowed`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      setFormValues((prevData) => ({
        UserDetails: {
          ...prevData.UserDetails,
          [name]: value,
        },
      }));
    }
  };
  



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["pdf", "doc", "docx"];
    const maxFileSizeInMB = 2;

    if (!file) {
      setErrors({
        candidate_cv: "! Resume file is Required",
      });
      return false;
    }
    const fileSizeInMB = file.size / (1024 * 1024);
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

    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        candidate_cv: file,
      },
    }));

    setErrors({});

    return true;
  };
  return (
    <>
      <form>
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            <div>
              <h5 className="UD-heading">Reference</h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h5 className="UD-heading">
                Where Did You Hear About Medi-Caps University From ?
              </h5>
              <p className="UD-subheading">
                Friend/ facebook/ Instagram/ LinkedIn/ Faculty Members at
                Medi-Caps
              </p>

              <input
                style={{ width: "99.5%" }}
                className="UD-set-input"
                type="text"
                placeholder=""
                name="hearing_source_about_us"
                id=""
                onChange={handleChange}
                value={formValues.hearing_source_about_us}
              ></input>
              <span className="error-message">
                {errors.hearing_source_about_us}
              </span>
            </div>

            {/* First Reference*/}

            <div>
              <p className="HS-heading"> First Reference</p>
            </div>

            <div className="row" style={{ marginTop: "-14px" }}>
              <div className="col-md-4">
                {/* Name */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder="Enter  Name "
                    name="reference_person_1"
                    id=""
                    onChange={handleChange}
                    value={formValues.reference_person_1}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faUser} />
                </div>
                <span className="error-message">
                {errors.reference_person_1}
              </span>
              </div>

              <div className="col-md-4">
                {/* Organization */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Organization
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="ref_org_1"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_org_1}
                  ></input>
                </div>
                <span className="error-message">
                {errors.ref_org_1}
              </span>
              </div>

              <div className="col-md-4">
                {/* Position*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Position
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="ref_person_position_1"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_position_1}
                  ></input>
                </div>
                <span className="error-message">
                {errors.ref_person_position_1}
              </span>
              </div>
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
                    name="ref_person_1_email"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_1_email}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faEnvelope} />
                </div>
                <span className="error-message">
                {errors.ref_person_1_email}
              </span>
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
                    name="ref_person_1_contact"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_1_contact}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                </div>
                <span className="error-message">
                {errors.ref_person_1_contact}
              </span>
              </div>
            </div>

            {/* Second Reference*/}

            <div>
              <p className="HS-heading">Second Reference</p>
            </div>

            <div className="row" style={{ marginTop: "-14px" }}>
              <div className="col-md-4">
                {/* Name */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Name
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder="Enter  Name "
                    name="reference_person_2"
                    id=""
                    onChange={handleChange}
                    value={formValues.reference_person_2}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faUser} />
                </div>
                <span className="error-message">
                {errors.reference_person_2}
              </span>
              </div>

              <div className="col-md-4">
                {/* Organization */}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Organization
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="ref_org_2"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_org_2}
                  ></input>
                </div>
                <span className="error-message">
                {errors.ref_org_2}
              </span>
              </div>

              <div className="col-md-4">
                {/* Position*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Position
                  </label>
                  <input
                    className="UD-set-input"
                    type="text"
                    placeholder=" "
                    name="ref_person_position_2"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_position_2}
                  ></input>
                </div>
                <span className="error-message">
                {errors.ref_person_position_2}
              </span>
              </div>
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
                    name="ref_person_2_email"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_2_email}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faEnvelope} />
                </div>
                <span className="error-message">
                {errors.ref_person_2_email}
              </span>
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
                    name="ref_person_2_contact"
                    id=""
                    onChange={handleChange}
                    value={formValues.ref_person_2_contact}
                  ></input>
                  <FontAwesomeIcon className="UD-set-icon" icon={faMobile} />
                </div>
                <span className="error-message">
                {errors.ref_person_2_contact}
              </span>
              </div>
            </div>

            <div className="row" style={{ marginTop: "-40px" }}>
              <div className="col-md-12">
                {/* Statement of Purpose*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Statement of Purpose
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="application_purpose"
                    id=""
                    onChange={handleChange}
                    value={formValues.application_purpose}
                  ></input>
                </div>
                <span className="error-message">
                {errors.application_purpose}
              </span>
              </div>
            </div>

            {/* Upload Resume*/}

            <div>
              <p className="HS-heading">Upload Resume</p>
            </div>

            <div className="uploadfile-section">
              <div>
                <label className="SetLabel-Name">
                  <span>*</span>Upload your Resume:
                </label>
                <p className="uploadresume-subheading">
                  To upload your resume here:(maximum size 2MB, PDF, DOC and
                  DOCX format only)
                </p>
                <input
                  type="file"
                  name="candidate_cv"
                  onChange={handleFileChange}
                  accept=".pdf, .doc, .docx"
                />
              </div>
              <span className="error-message">{errors.candidate_cv}</span>
            </div>
            <div>
              <span className="set-checkbox-span">
                <input
                  className="set-checkbox"
                  type="checkbox"
                  id="accept"
                  name="accept"
                />
                &nbsp; I confirm that the information provided here are true to
                my knowledge
              </span>
              {/* <span className="error-message">{checkboxError}</span> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CandidateReference;
