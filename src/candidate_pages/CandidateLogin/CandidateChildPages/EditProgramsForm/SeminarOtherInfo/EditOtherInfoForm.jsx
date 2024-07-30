import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  input,
} from "@mui/material";
// import close from "../../../assets/logos/close.png";

import candidatesApiService from "../../../../candidateService";
function EditOtherInfoForm({ filteredItem, handleClose, fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    member_of_institute_name: "",
    membership_date_from: "",
    membership_date_to: "",
    position_held: "",
    contribution: "",
  });
  const [updateField, setUpdateField] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (filteredItem) {
      setFormData({
        member_of_institute_name: filteredItem.member_of_institute_name || "",
        membership_date_from: filteredItem.membership_date_from || "",
        membership_date_to: filteredItem.membership_date_to || "",
        position_held: filteredItem.position_held || "",
        contribution: filteredItem.contribution || "",
      });
    }
  }, [filteredItem]);

  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //     setUpdateField((prev) => ({ ...prev, [fieldName]: value.toString() }));
  // };

  const handleChange = (fieldName, value, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setUpdateField((prevUpdateField) => ({
      ...prevUpdateField,
      [fieldName]: value.toString(),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value.trim() ? "" : "This field is required",
    }));

    // console.log(`Field '${fieldName}' updated to:`, value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        validationErrors[key] = "This field is required";
      } else if (
        (key === "membership_date_from" || key === "membership_date_to") &&
        !isValidDate(value)
      ) {
        validationErrors[key] = "Please enter a valid date (YYYY-MM-DD)";
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Don't proceed with submission if there are validation errors
    }


    try {
      const updatedFormData = {
        ...updateField,
        member_id: filteredItem.id,
      };

      await candidatesApiService.updateOtherInfoForm(updatedFormData);
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


  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">
        Edit Other Information Form
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Member Of Institute Name</label>
              <input
                className="set-input"
                label="Member Of Institute Name"
                type="text"
                name="member_of_institute_name"
                value={formData.member_of_institute_name}
                onChange={(e) =>
                  handleChange("member_of_institute_name", e.target.value)
                }
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
                value={formatDateForInput(formData.membership_date_from)}
                onChange={(e) =>
                  handleChange("membership_date_from", e.target.value)
                }
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
                value={formatDateForInput(formData.membership_date_to)}
                onChange={(e) =>
                  handleChange("membership_date_to", e.target.value)
                }
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
                onChange={(e) => handleChange("position_held", e.target.value)}
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
                label="contribution"
                type="text"
                name="contribution"
                value={formData.contribution}
                onChange={(e) => handleChange("contribution", e.target.value)}
                fullWidth
              />
                {errors.contribution && (
                <span className="error">{errors.contribution}</span>
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
  );
}

export default EditOtherInfoForm;
