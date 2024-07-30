import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Importing required components from Material-UI

import candidatesApiService from "../../../../candidateService";

function AddCandidateResearchForm({ handleCloseResearchClick,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    orcid: "",
    scopusid: "",
    researchid: "",
  });

  const [formErrors, setFormErrors] = useState({
    orcid: "",
    scopusid: "",
    researchid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newFormErrors = { ...formErrors };

    // Basic validation - check for empty fields
    if (formData.orcid.trim() === "") {
      newFormErrors.orcid = "Please enter Orcid Id";
      hasErrors = true;}
  try {
      const response = await candidatesApiService.addCandidateResearch(formData);
      // console.log(response.data); 
  
      if (response) {
        setNotificationMessage(`added successfully`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        handleCloseResearchClick();
        fetchData();
      }
    } catch (error) {
      console.error(`Error submitting data: ${error.message}`);    
    }
    if (formData.scopusid.trim() === "") {
      newFormErrors.scopusid = "Please enter Scopus Id";
      hasErrors = true;
    }
    if (formData.researchid.trim() === "") {
      newFormErrors.researchid = "Please enter Research Id";
      hasErrors = true;
    }

    // Set the updated errors state
    setFormErrors(newFormErrors);

    if (!hasErrors) {
      try {
        await candidatesApiService.addCandidateResearch(formData);
        // console.log(response.data); 
        handleCloseResearchClick();
        fetchData();
      } catch (error) {
        console.error(`Error submitting data: ${error.message}`);    
      }
    }

  };

  return (
    <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
      <DialogTitle className="candidate-form-heading">Add Research Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Orcid Id</label>
              <input
              className="set-input"
                label="Orcid Id"
                type="text"
                name="orcid"
                value={formData.orcid}
                onChange={handleChange}
                fullWidth
              />
                   {formErrors.orcid && (
                <span className="error-message">{formErrors.orcid}</span>
              )}
            </div>

            <div className="col-md-6">
              <label className="SetLabel-Name">Scopus Id</label>
              <input
              className="set-input"
                label="Scopus Id"
                type="text"
                name="scopusid"
                value={formData.scopusid}
                onChange={handleChange}
                fullWidth
              />
                  {formErrors.scopusid && (
                <span className="error-message">{formErrors.scopusid}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="SetLabel-Name">Research Id</label>
              <input
              className="set-input"
                label="Research Id"
                type="text"
                name="researchid"
                value={formData.researchid}
                onChange={handleChange}
                fullWidth
              />
                  {formErrors.researchid && (
                <span className="error-message">{formErrors.researchid}</span>
              )}
            </div>
         
          </div>

 

          <DialogActions>
            <button className="submitbtn" type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <button className="canclebtn" onClick={handleCloseResearchClick}>Cancle</button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCandidateResearchForm;
