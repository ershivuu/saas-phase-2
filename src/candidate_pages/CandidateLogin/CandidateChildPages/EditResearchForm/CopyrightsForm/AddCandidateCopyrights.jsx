import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material"; // Importing required components from Material-UI

import candidatesApiService from "../../../../candidateService";

function AddCandidateCopyrights({ handleClosecopyrightsClick,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        copyright_applicationid: "",
        copyright_title: "",
        copyright_year: "",
        copyright_granted_by: "",
        copyright_incountry: "",
    });

    
    const [formErrors, setFormErrors] = useState({
        copyright_applicationid: "",
        copyright_title: "",
        copyright_year: "",
        copyright_granted_by: "",
        copyright_incountry: "",
      });


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "copyright_year") {
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
              const response = await candidatesApiService.addCandidateCopyright(formData);
            //   console.log(response.data); 
              if (response) {
                setNotificationMessage(`added successfully`);
                setNotificationSeverity("success");
                setNotificationOpen(true);
                handleClosecopyrightsClick();
                fetchData();
              }
         

            } catch (error) {
              console.error(`Error submitting data: ${error.message}`);

            }
    };

    return (
        <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
            <DialogTitle className="candidate-form-heading">Add Copyrights Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="SetLabel-Name">Application ID</label>
                            <input
                                className="set-input"
                                label="copyright_applicationid"
                                type="text"
                                name="copyright_applicationid"
                                value={formData.copyright_applicationid}
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.copyright_applicationid && (
                <span className="error">{formErrors.copyright_applicationid}</span>
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
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.copyright_title && (
                <span className="error">{formErrors.copyright_title}</span>
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
                                name="copyright_year"
                                value={formData.copyright_year}
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.copyright_year && (
                <span className="error">{formErrors.copyright_year}</span>
              )}
                        </div>
                        <div className="col-md-6">
                            <label className="SetLabel-Name">Published/Granted</label>
                            <input
                                className="set-input"
                                label="copyright_granted_by"
                                type="text"
                                name="copyright_granted_by"
                                value={formData.copyright_granted_by}
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.copyright_granted_by && (
                <span className="error">{formErrors.copyright_granted_by}</span>
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
                                name="copyright_incountry"
                                value={formData.copyright_incountry}
                                onChange={handleChange}
                                fullWidth
                            />
                            {formErrors.copyright_incountry && (
                <span className="error">{formErrors.copyright_incountry}</span>
              )}
                        </div>                      
                    </div>
                  

                    <DialogActions>
                        <button className="submitbtn"  type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="canclebtn" onClick={handleClosecopyrightsClick}>Cancle</button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}   

export default AddCandidateCopyrights;
