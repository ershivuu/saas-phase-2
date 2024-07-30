import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import candidatesApiService from "../../../../candidateService";

function AddOrganisedForm({ handleCloseOrganizedClick,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    name_of_course: "",
    name_of_industry: "",
    name_of_institute: "",
    organise_date_from: "",
    organise_date_to: "",
    participants_number: "",
    sponsered_by: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "participants_number" && !/^\d+$/.test(value)) {
      setErrors({ ...errors, [name]: "Please enter a valid number" });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "Field is required";
      }
    });

    if (
      formData.organise_date_from &&
      formData.organise_date_to &&
      new Date(formData.organise_date_to) <
        new Date(formData.organise_date_from)
    ) {
      validationErrors.organise_date_to = "End date must be after start date";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  try {
      const response = await candidatesApiService.addCandidateOrganised(formData);
      if (response) {
        setNotificationMessage(`added successfully`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        handleCloseOrganizedClick();
        fetchData();
      }

    } catch (error) {
      console.error(`Error submitting data: ${error.message}`);
    }
  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">Add Organised Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Name of Course</label>
              <input
                className="set-input"
                label="Name of Course"
                type="text"
                name="name_of_course"
                value={formData.name_of_course}
                onChange={handleChange}
                fullWidth
              />
              {errors.name_of_course && (
                <span className="error">{errors.name_of_course}</span>
              )}
            </div>

            <div className="col-md-6">
              <label className="SetLabel-Name">Name of Industry</label>
              <input
                className="set-input"
                label="Name of Industry"
                type="text"
                name="name_of_industry"
                value={formData.name_of_industry}
                onChange={handleChange}
                fullWidth
              />
              {errors.name_of_industry && (
                <span className="error">{errors.name_of_industry}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Name of Institute</label>
              <input
                className="set-input"
                label="Name of Institute"
                type="text"
                name="name_of_institute"
                value={formData.name_of_institute}
                onChange={handleChange}
                fullWidth
              />
              {errors.name_of_institute && (
                <span className="error">{errors.name_of_institute}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Organise Date From</label>
              <input
                className="set-input"
                label="Organise Date From"
                type="date"
                name="organise_date_from"
                value={formData.organise_date_from}
                onChange={handleChange}
                fullWidth
              />
              {errors.organise_date_from && (
                <span className="error">{errors.organise_date_from}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Organise Date To</label>
              <input
                className="set-input"
                label="Organise Date To"
                type="date"
                name="organise_date_to"
                value={formData.organise_date_to}
                onChange={handleChange}
                fullWidth
              />
              {errors.organise_date_to && (
                <span className="error">{errors.organise_date_to}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Participants Number</label>
              <input
                className="set-input"
                label="Participants Number"
                type="text"
                name="participants_number"
                value={formData.participants_number}
                onChange={handleChange}
                fullWidth
              />
              {errors.participants_number && (
                <span className="error">{errors.participants_number}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Sponsored By</label>
              <input
                className="set-input"
                label="Sponsored By"
                type="text"
                name="sponsered_by"
                value={formData.sponsered_by}
                onChange={handleChange}
                fullWidth
              />
              {errors.sponsered_by && (
                <span className="error">{errors.sponsered_by}</span>
              )}
            </div>
          </div>

          <DialogActions>
            <button
             className="submitbtn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button className="canclebtn" onClick={handleCloseOrganizedClick}>Cancle</button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddOrganisedForm;
