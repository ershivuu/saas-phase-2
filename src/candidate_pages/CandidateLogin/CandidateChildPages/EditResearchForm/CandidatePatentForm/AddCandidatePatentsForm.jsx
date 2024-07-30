import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material"; // Importing required components from Material-UI

import candidatesApiService from "../../../../candidateService";

function AddCandidatePatentsForm({ handleClosePatentClick,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        patent_applicationid: "",
        patent_application_title: "",
        patent_application_year: "",
        patent_granted_by: "",
        patent_incountry: "",
    });

    const [formErrors, setFormErrors] = useState({
        patent_applicationid: "",
        patent_application_title: "",
        patent_application_year: "",
        patent_granted_by: "",
        patent_incountry: "",
      });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "patent_application_year") {
            // Check if the input is a number and has 4 digits
            if (/^\d*$/.test(value) && value.length <= 4) {
                setFormData({ ...formData, [name]: value });
                // Clear the error message if input is valid
                setFormErrors({ ...formErrors, [name]: '' });
            } else {
                // Set an error message for invalid input
                setFormErrors({ ...formErrors, [name]: 'Please enter a valid 4-digit number' });
            }
        } else {
            setFormData({ ...formData, [name]: value });
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };
    
    const validateForm = () => {
        let valid = true;
        const newFormErrors = { ...formErrors };
    
        for (const key in formData) {
          if (formData[key].trim() === "") {
            newFormErrors[key] = "This field is required.";
            valid = false;
          }
        }
    
        setFormErrors(newFormErrors);
        return valid;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
          }
          try {
              const response = await candidatesApiService.addCandidatePatent(formData);
            //   console.log(response.data); 

              if (response) {
                setNotificationMessage(`added successfully`);
                setNotificationSeverity("success");
                setNotificationOpen(true);
                handleClosePatentClick();
                fetchData();
              }
      

            } catch (error) {
              console.error(`Error submitting data: ${error.message}`);

            }
    };

    return (
        <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
            <DialogTitle className="candidate-form-heading">Add Patents Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="SetLabel-Name">Application ID</label>
                            <input
                                className="set-input"
                                label="patent_applicationid"
                                type="text"
                                name="patent_applicationid"
                                value={formData.patent_applicationid}
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.patent_applicationid && (
                <span className="error">{formErrors.patent_applicationid}</span>
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
                                onChange={handleChange}
                                fullWidth
                            />
                                           {formErrors.patent_application_title && (
                <span className="error">{formErrors.patent_application_title}</span>
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
                                name="patent_application_year"
                                value={formData.patent_application_year}
                                onChange={handleChange}
                                fullWidth
                                
                            />
                            {formErrors.patent_application_year && (
                <span className="error">{formErrors.patent_application_year}</span>
              )}
                        </div>
                        <div className="col-md-6">
                            <label className="SetLabel-Name">Published/Granted</label>
                            <input
                                className="set-input"
                                label="patent_granted_by"
                                type="text"
                                name="patent_granted_by"
                                value={formData.patent_granted_by}
                                onChange={handleChange}
                                fullWidth
                            />
                                           {formErrors.patent_granted_by && (
                <span className="error">{formErrors.patent_granted_by}</span>
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
                                name="patent_incountry"
                                value={formData.patent_incountry}
                                onChange={handleChange}
                                fullWidth
                            />
                                           {formErrors.patent_incountry && (
                <span className="error">{formErrors.patent_incountry}</span>
              )}
                        </div>                      
                    </div>
                  



                    <DialogActions>
                        <button className="submitbtn"  type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="canclebtn" onClick={handleClosePatentClick}>Cancle</button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddCandidatePatentsForm;
