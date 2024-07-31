import React, { useState, useEffect } from "react";
import "./Qualification.css";
import apiService from "../../../Services/ApiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

function Qualification({ formData, setFormData, errors, setErrors }) {
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [degrees, setDegrees] = useState([]);
  
  const [selectedDegree, setSelectedDegree] = useState("");
  const [data, setData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  // const hasMounted = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    apiService.getExamTypes(signal)
      .then((response) => {
        setData(response.data);
      //  console.log("check dataaaa",response.data)
        const uniqueExams = Array.from(
          new Set(response.data.map((item) => item.exam_name))
        );
        setExamTypes(uniqueExams);
  
        const degreesForSelectedExam = response.data
          .filter((item) => item.exam_name === selectedExam)
          .map((item) => item.degree_types_master ? item.degree_types_master.degree_name : null);
  
        setDegrees(degreesForSelectedExam.filter(Boolean));
  
        // Check if formData already has selected exam and degree
        if (formData.educations && formData.educations.length > 0) {
          const selectedEducation = formData.educations[0];  
          const selectedExamObject = response.data.find((exam) => exam?.degree_types_master?.exam_types_master_id === selectedEducation.exam_types_master_id);          
        //  console.log("selectedExamObject???",selectedExamObject.exam_name)
         
          if (selectedExamObject) {
            setSelectedExam(selectedExamObject.exam_name);           
          }
          
        }
   
        if (formData.educations && formData.educations.length > 0) {
          const selectedEducation = formData.educations[0];  
          const selectedDegreeObject = response.data.find((exam) => exam?.degree_types_master?.id === selectedEducation.degree_types_master_id);          
          // console.log("selectedDegreeObject???",selectedDegreeObject.degree_types_master.degree_name)
          if (selectedDegreeObject) {
            setSelectedDegree(selectedDegreeObject.degree_types_master.degree_name);           
          }
        }


        
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
      });
  
    return () => {
      // Cleanup function to abort the request when the component unmounts
      controller.abort();
    };
  }, [formData]); // Dependency array to trigger useEffect whenever formData changes
  

  const handleExamChange = (event) => {
    setErrors({
      ...errors,
      qualification: "",
    });
    const selectedExam = event.target.value;
    const selectedExamName = event.target.value;
    setSelectedExam(selectedExam);
    const selectedExamObject = data.find(
      (item) => item.exam_name === selectedExamName
    );
    const selectedExamId = selectedExamObject ? selectedExamObject.id : "";
    setSelectedExam(selectedExamName);
    // Extract degree names for the second dropdown based on the selected exam
    const degreesForSelectedExam = data
      .filter((item) => item.exam_name === selectedExam)
      .map((item) =>
        item.degree_types_master ? item.degree_types_master.degree_name : null
      );

    setDegrees(degreesForSelectedExam.filter(Boolean));

    // Set the default selected degree (if needed)
    setSelectedDegree(degreesForSelectedExam[0]);
    setFormData((prevFormData) => ({
      personalDetails: {
        ...prevFormData.personalDetails,
        educations: [
          {
            ...prevFormData.personalDetails.educations[0], // Update the first education object
            exam_types_master_id: selectedExamId,
          },
          // ... you can add more education objects if needed
        ],

        // Add additional fields related to category if needed
      },
    }));
  };

  const handleDegreeChange = (event) => {
    setErrors({
      ...errors,
      qualification: "",
    });
    const selectedDegreeName = event.target.value;

    
    const selectedDegreeObject = data.find(
      (item) =>
        item.degree_types_master &&
        item.degree_types_master.degree_name === selectedDegreeName
    );

    
    const selectedDegreeId = selectedDegreeObject
      ? selectedDegreeObject.degree_types_master.id
      : "";

    setSelectedDegree(selectedDegreeName);

    setFormData((prevFormData) => ({
      personalDetails: {
        ...prevFormData.personalDetails,
        educations: [
          {
            ...prevFormData.personalDetails.educations[0], 
            degree_types_master_id: selectedDegreeId,
          },
          
        ],

        
      },
    }));
  };

  // const [selectedOption, setSelectedOption] = useState(null);
  const handleDropdownChange = (event) => {
    setErrors({
      ...errors,
      qualification: "",
    });
    const selectedStatus = event.target.value;

    // Update the formData state
    setFormData((prevFormData) => ({
      personalDetails: {
        ...prevFormData.personalDetails,
        educations: [
          {
            ...prevFormData.personalDetails.educations[0], // Update the first education object
            degree_status: selectedStatus,
          },
          // ... you can add more education objects if needed
        ],
      },
    }));
  };

  return (
    <>
      <div className="container">
        <div className="qualification-form">
          <div>
            <h5 className="qualification-heading">
              Qualification / Highest Qualification
            </h5>
            <p className="qualification-subheading">
              Please fill your information so we can get in touch with you.
            </p>
          </div>

          <form method="post">
            <div className="row">
              <div className="col-md-6">
                {/* *Exam Type */}

                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Exam Type
                  </label>
                  <select
                    value={selectedExam}
                    onChange={handleExamChange}
                    className="set-dropdown"
                  >
                    {/* <option value="">Select Type</option> */}
                    <option value="">{selectedExam&&selectedExam?selectedExam: "Select Exam Type"}</option>
                    {examTypes.map((exam, index) => (
                      <option key={`exam-${index}`} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.qualification}</span>
              </div>

              <div className="col-md-6">
                {/* Degree/Diploma Certificate */}
                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Degree/Diploma Certificate
                  </label>
                  <select
                    value={selectedDegree}
                    onChange={handleDegreeChange}
                    className="set-dropdown"
                  >               
                    <option value="">{selectedDegree&&selectedDegree?selectedDegree: "Select Degree"}</option>
                    {degrees.map((degree, index) => (
                      <option key={`degree-${index}`} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
                <span className="error-message">{errors.qualification}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* *Status */}

                <div className="form-section">
                  <label className="SetLabel-Name">
                    <span>*</span>Status
                  </label>
                  <select
                    name="degree_status"
                    className="set-dropdown"
                    onChange={handleDropdownChange}
                    value={formData.educations[0].degree_status}
                  >
                    <option value="">Select status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pursuing">Pursuing</option>
                  </select>
                  <FontAwesomeIcon className="set-icon" icon={faAngleDown} />
                </div>
              </div>
            </div>

            <span className="error-message">{errors.qualification}</span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Qualification;
