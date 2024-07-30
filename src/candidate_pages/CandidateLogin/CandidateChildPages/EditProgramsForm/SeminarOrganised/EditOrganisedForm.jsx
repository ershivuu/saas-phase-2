import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  input,
} from "@mui/material";


import candidatesApiService from "../../../../candidateService";
function EditOrganisedForm({ filteredItem, handleClose, fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    name_of_course: "",
    name_of_industry: "",
    name_of_institute: "",
    organise_date_from: "",
    organise_date_to: "",
    participants_number: "",
    sponsered_by: "",
  });
  const [updateField, setUpdateField] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (filteredItem) {
      setFormData({
        name_of_course: filteredItem.name_of_course || "",
        name_of_industry: filteredItem.name_of_industry || "",
        name_of_institute: filteredItem.name_of_institute || "",
        organise_date_from: filteredItem.organise_date_from || "",
        organise_date_to: filteredItem.organise_date_to || "",
        participants_number: filteredItem.participants_number || "",
        sponsered_by: filteredItem.sponsered_by || "",
      });
    }
  }, [filteredItem]);



  const handleChange = (fieldName, value, index) => {
    let newValue = value;
  
    if (fieldName === "participants_number" && !/^\d*$/.test(value)) {
      // If the entered value is not a number, set the field value to an empty string
      newValue = "";
      setErrors({ ...errors, [fieldName]: "Please enter a valid number" });
    } else {
      setErrors({ ...errors, [fieldName]: "" });
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  
    setUpdateField((prevUpdateField) => ({
      ...prevUpdateField,
      [fieldName]: newValue.toString(),
    }));
  
    // Console mein changes dikhaane ke liye
    // console.log(`Field '${fieldName}' updated to:`, newValue);
  };
  

  const handleUpdate = async (e) => {
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

    // Validation to allow only numbers in participants_number field
    const participantsNumberRegex = /^[0-9]+$/;
    if (!participantsNumberRegex.test(formData.participants_number)) {
      validationErrors.participants_number = "Only numbers are allowed";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedFormData = {
        ...updateField,
        organised_id: filteredItem.id,
      };

      await candidatesApiService.updateOrganisedForm(updatedFormData);
      setNotificationMessage(`updtaed successfully`);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);

    // Check if dateString is empty or dateObject is invalid
    if (!dateString || isNaN(dateObject.getTime())) {
      return ""; // Return an empty string for invalid or empty dates
    }

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
        <DialogTitle className="candidate-form-heading">Edit Organised Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-6">
                <label className="SetLabel-Name">Name of Course</label>
                <input
                  className="set-input"
                  label="Name of Course"
                  type="text"
                  name="name_of_course"
                  value={formData.name_of_course}
                  onChange={(e) =>
                    handleChange("name_of_course", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("name_of_industry", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("name_of_institute", e.target.value)
                  }
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
                  value={formatDateForInput(formData.organise_date_from)}
                  onChange={(e) =>
                    handleChange("organise_date_from", e.target.value)
                  }
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
                  value={formatDateForInput(formData.organise_date_to)}
                  onChange={(e) =>
                    handleChange("organise_date_to", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("participants_number", e.target.value)
                  }
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
                  onChange={(e) => handleChange("sponsered_by", e.target.value)}
                  fullWidth
                />
                {errors.sponsered_by && (
                  <span className="error">{errors.sponsered_by}</span>
                )}
              </div>
            </div>

            <DialogActions>
              <button className="submitbtn"  type="submit">
                Update
              </button>
              <button className="canclebtn" onClick={handleClose}>Cancle</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditOrganisedForm;
