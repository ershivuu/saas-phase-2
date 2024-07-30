import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Importing required components from Material-UI
import candidatesApiService from "../../../../candidateService";
function AddCandidateExperienceForm({ handleCloseExperienceClick, fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    company_experience_name: "",
    designation: "",
    gross_pay: "",
    exp_work_from: "",
    exp_work_to: "",
  });

  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = "This field is required";
    }

    if (name === "exp_work_from" || name === "exp_work_to") {
      if (!isValidDate(value)) {
        errorMessage = "Please enter a valid date";
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dateRegex) !== null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (!value.trim()) {
        validationErrors[key] = "This field is required";
      } else if (
        (key === "exp_work_from" || key === "exp_work_to") &&
        !isValidDate(value)
      ) {
        validationErrors[key] = "Please enter a valid date";
      } else if (
        key === "exp_work_to" &&
        formData.exp_work_from &&
        new Date(value) < new Date(formData.exp_work_from)
      ) {
        validationErrors[key] = "End date must be after start date";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await candidatesApiService.addCandidateExperience(formData);
      // console.log(response.data);
      if (response) {
        setNotificationMessage(`added successfully`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        handleCloseExperienceClick();
        fetchData();
      }
 
    } catch (error) {
      console.error(`Error submitting data: ${error.message}`);
    }
  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">Add Experience Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>   

          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Name of Institute / Company</label>
              <input
                className="set-input"
                label="Name of Institute / Company"
                type="text"
                name="company_experience_name"
                value={formData.company_experience_name}
                onChange={handleChange}
                fullWidth
              />
               {errors.company_experience_name && (
                <span className="error">{errors.company_experience_name}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Designation</label>
              <input
                className="set-input"
                label="Designation"
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                fullWidth
              />
               {errors.designation && (
                <span className="error">{errors.designation}</span>
              )}
            </div>

          </div>
     <div className="row">
     <div className="col-md-6">
              <label className="SetLabel-Name">Current Gross Pay(per month)</label>
              <input
                className="set-input"
                label="Current Gross Pay(per month)"
                type="text"
                name="gross_pay"
                value={formData.gross_pay}
                onChange={handleChange}
                fullWidth
              />
               {errors.gross_pay && (
                <span className="error">{errors.gross_pay}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Date From</label>
              <input
                className="set-input"
                label="Date From"
                type="date"
                name="exp_work_from"
                value={formData.exp_work_from}
                onChange={handleChange}
                fullWidth
              />
                {errors.exp_work_from && (
                <span className="error">{errors.exp_work_from}</span>
              )}
            </div>
         
          </div>
          <div>
          <div className="col-md-6">
              <label className="SetLabel-Name">Date To</label>
              <input
                className="set-input"
                label="Date To"
                type="date"
                name="exp_work_to"
                value={formData.exp_work_to}
                onChange={handleChange}
                fullWidth
              />
              {errors.exp_work_to && (
                <span className="error">{errors.exp_work_to}</span>
              )}
            </div>
          </div>
          <DialogActions>
            <button className="submitbtn"  type="submit">
              Submit
            </button>
            <button className="canclebtn" onClick={handleCloseExperienceClick}>Cancle</button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCandidateExperienceForm;
