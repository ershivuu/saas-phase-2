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
    copyright_applicationid: "",
    copyright_title: "",
    copyright_year: "",
    copyright_granted_by: "",
    copyright_incountry: "",
  });
  const [updateField, setUpdateField] = useState({});
  const [errors, setErrors] = useState({
    copyright_applicationid: "",
    copyright_title: "",
    copyright_year: "",
    copyright_granted_by: "",
    copyright_incountry: "",
  });

  useEffect(() => {
    if (filteredItem) {
      setFormData({
        copyright_applicationid: filteredItem.copyright_applicationid || "",
        copyright_title: filteredItem.copyright_title || "",
        copyright_year: filteredItem.copyright_year || "",
        copyright_granted_by: filteredItem.copyright_granted_by || "",
        copyright_incountry: filteredItem.copyright_incountry || "",
      });
    }
  }, [filteredItem]);

  // const handleChange = (fieldName, value, index) => {
  //     setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         [fieldName]: value
  //     }));
  //     setUpdateField((prevUpdateField) => ({
  //         ...prevUpdateField,
  //         [fieldName]: value.toString()
  //     }));

  //     // Console mein changes dikhaane ke liye
  //     console.log(`Field '${fieldName}' updated to:`, value);
  // };

  const handleChange = (fieldName, value, index) => {
    if (fieldName === "copyright_year") {
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
        copyright_id: filteredItem.id,
      };
      await candidatesApiService.updateCandidateCopyright(updatedFormData);
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
      <DialogTitle className="candidate-form-heading">Edit Copyrights Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Application ID</label>
              <input
                className="set-input"
                label="copyright_applicationid"
                type="text"
                name="copyright_applicationid"
                value={formData.copyright_applicationid}
                onChange={(e) =>
                  handleChange("copyright_applicationid", e.target.value)
                }
                fullWidth
              />
              {errors.copyright_applicationid && (
                <span className="error">{errors.copyright_applicationid}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Title</label>
              <input
                className="set-input"
                label="copyright_title"
                type="text"
                name="copyright_title"
                value={formData.copyright_title}
                onChange={(e) =>
                  handleChange("copyright_title", e.target.value)
                }
                fullWidth
              />
              {errors.copyright_title && (
                <span className="error">{errors.copyright_title}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Year</label>
              <input
                className="set-input"
                label="copyright_year"
                type="text"
                name="orcid"
                value={formData.copyright_year}
                onChange={(e) => handleChange("copyright_year", e.target.value)}
                fullWidth
              />
              {errors.copyright_year && (
                <span className="error">{errors.copyright_year}</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="SetLabel-Name">Published/Granted</label>
              <input
                className="set-input"
                label="copyright_granted_by"
                type="text"
                name="orcid"
                value={formData.copyright_granted_by}
                onChange={(e) =>
                  handleChange("copyright_granted_by", e.target.value)
                }
                fullWidth
              />
              {errors.copyright_granted_by && (
                <span className="error">{errors.copyright_granted_by}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Country</label>
              <input
                className="set-input"
                label="copyright_incountry"
                type="text"
                name="orcid"
                value={formData.copyright_incountry}
                onChange={(e) =>
                  handleChange("copyright_incountry", e.target.value)
                }
                fullWidth
              />
              {errors.copyright_incountry && (
                <span className="error">{errors.copyright_incountry}</span>
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
