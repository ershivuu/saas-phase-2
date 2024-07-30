import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function EditCandidatePatentsForm({
  filteredItem,
  handleClose,
  fetchData,
  setNotificationOpen,
  setNotificationMessage,
  setNotificationSeverity,
}) {
  const [formData, setFormData] = useState({
    patent_applicationid: "",
    patent_application_title: "",
    patent_application_year: "",
    patent_granted_by: "",
    patent_incountry: "",
  });
  const [updateField, setUpdateField] = useState({});
  const [errors, setErrors] = useState({
    patent_applicationid: "",
    patent_application_title: "",
    patent_application_year: "",
    patent_granted_by: "",
    patent_incountry: "",
  });

  useEffect(() => {
    if (filteredItem) {
      setFormData({
        patent_applicationid: filteredItem.patent_applicationid || "",
        patent_application_title: filteredItem.patent_application_title || "",
        patent_application_year: filteredItem.patent_application_year || "",
        patent_granted_by: filteredItem.patent_granted_by || "",
        patent_incountry: filteredItem.patent_incountry || "",
      });
    }
  }, [filteredItem]);

  const handleChange = (fieldName, value, index) => {
    if (fieldName === "patent_application_year") {
      // Check if the value is not a number or has more than 4 characters
      if (isNaN(value) || value.length > 4) {
        // Display an error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Please enter a valid 4-digit year.",
        }));
        return;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setUpdateField((prevUpdateField) => ({
      ...prevUpdateField,
      [fieldName]: value.toString(),
    }));
    validateField(fieldName, value);
    // Console mein changes dikhaane ke liye
    // console.log(`Field '${fieldName}' updated to:`, value);
  };
  const validateField = (fieldName, value) => {
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage = `This field is required.`;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }
      const updatedFormData = {
        ...updateField,
        patent_id: filteredItem.id,
      };

      await candidatesApiService.updateCandidatePatent(updatedFormData);
      setNotificationMessage(`updated successfully`);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">Edit Patents Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Application ID</label>
              <input
                className="set-input"
                label="patent_applicationid"
                type="text"
                name="patent_applicationid"
                value={formData.patent_applicationid}
                onChange={(e) =>
                  handleChange("patent_applicationid", e.target.value)
                }
                fullWidth
              />
              {errors.patent_applicationid && (
                <span className="error">{errors.patent_applicationid}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Title</label>
              <input
                className="set-input"
                label="patent_application_title"
                type="text"
                name="patent_application_title"
                value={formData.patent_application_title}
                onChange={(e) =>
                  handleChange("patent_application_title", e.target.value)
                }
                fullWidth
              />
              {errors.patent_application_title && (
                <span className="error">{errors.patent_application_title}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Year</label>
              <input
                className="set-input"
                label="patent_application_year"
                type="text"
                name="orcid"
                value={formData.patent_application_year}
                onChange={(e) =>
                  handleChange("patent_application_year", e.target.value)
                }
                fullWidth
              />
              {errors.patent_application_year && (
                <span className="error">{errors.patent_application_year}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Published/Granted</label>
              <input
                className="set-input"
                label="patent_granted_by"
                type="text"
                name="orcid"
                value={formData.patent_granted_by}
                onChange={(e) =>
                  handleChange("patent_granted_by", e.target.value)
                }
                fullWidth
              />
              {errors.patent_granted_by && (
                <span className="error">{errors.patent_granted_by}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Country</label>
              <input
                className="set-input"
                label="patent_incountry"
                type="text"
                name="orcid"
                value={formData.patent_incountry}
                onChange={(e) =>
                  handleChange("patent_incountry", e.target.value)
                }
                fullWidth
              />
              {errors.patent_incountry && (
                <span className="error">{errors.patent_incountry}</span>
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

export default EditCandidatePatentsForm;
