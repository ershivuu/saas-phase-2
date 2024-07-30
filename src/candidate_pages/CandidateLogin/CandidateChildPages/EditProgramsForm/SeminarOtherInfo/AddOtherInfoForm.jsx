import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Importing required components from Material-UI
import candidatesApiService from "../../../../candidateService";

function AddOtherInfoForm({ handleCloseOtherInfoClick, fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    member_of_institute_name: "",
    membership_date_from: "",
    membership_date_to: "",
    position_held: "",
    contribution: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (!value.trim()) {
        validationErrors[key] = "This field is required";
      } else if (key === "membership_date_from" && !isValidDate(value)) {
        validationErrors[key] = "Please enter a valid date (YYYY-MM-DD)";
      } else if (key === "membership_date_to" && !isValidDate(value)) {
        validationErrors[key] = "Please enter a valid date (YYYY-MM-DD)";
      } else if (key === "membership_date_to" && formData.membership_date_from && compareDates(formData.membership_date_from, value) > 0) {
        validationErrors[key] = "End date must be after start date";
      }
    });

    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await candidatesApiService.addCandidateOtherinfo(
        formData
      );
      // console.log(response.data);
      if (response) {
        setNotificationMessage(`Added successfully`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        handleCloseOtherInfoClick();
        fetchData();
      }


    } catch (error) {
      console.error(`Error submitting data: ${error.message}`);
    }
  };

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  };

  const compareDates = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return date2.getTime() - date1.getTime();
  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">
        Add Other Information Form
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Member Of Institute Name</label>
              <input
                className="set-input"
                label="Member Of Institute Name"
                type="text"
                name="member_of_institute_name"
                value={formData.member_of_institute_name}
                onChange={handleChange}
                fullWidth
              />
              {errors.member_of_institute_name && (
                <span className="error">{errors.member_of_institute_name}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Membership Date From</label>
              <input
                className="set-input"
                label="Membership Date From"
                type="date"
                name="membership_date_from"
                value={formData.membership_date_from}
                onChange={handleChange}
                fullWidth
              /> 
               {errors.membership_date_from && (
                <span className="error">{errors.membership_date_from}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Membership Date To</label>
              <input
                className="set-input"
                label="Membership Date To"
                type="date"
                name="membership_date_to"
                value={formData.membership_date_to}
                onChange={handleChange}
                fullWidth
              /> 
               {errors.membership_date_to && (
                <span className="error">{errors.membership_date_to}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Position Held</label>
              <input
                className="set-input"
                label="Position Held"
                type="text"
                name="position_held"
                value={formData.position_held}
                onChange={handleChange}
                fullWidth
              />
               {errors.position_held && (
                <span className="error">{errors.position_held}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Contribution</label>
              <input
                className="set-input"
                label="Contribution"
                type="text"
                name="contribution"
                value={formData.contribution}
                onChange={handleChange}
                fullWidth
              />
               {errors.contribution && (
                <span className="error">{errors.contribution}</span>
              )}
            </div>
          </div>

          <DialogActions>
            <button className="submitbtn"  type="submit">
              Submit
            </button>
            <button className="canclebtn" onClick={handleCloseOtherInfoClick}>Cancle</button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddOtherInfoForm;
