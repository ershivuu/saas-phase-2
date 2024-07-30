import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function EditCandidateExperienceForm({ filteredItem, handleClose,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        company_experience_name: "",
        designation: "",
        gross_pay: "",
        exp_work_from: "",
        exp_work_to: "",
    });
    const [updateField, setUpdateField] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (filteredItem) {
            setFormData({
                company_experience_name: filteredItem.company_experience_name || "",    
                designation: filteredItem.designation || "",          
                gross_pay: filteredItem.gross_pay || "",          
                exp_work_from: filteredItem.exp_work_from || "",
                exp_work_to: filteredItem.exp_work_to || "",               
                
            });
        }
    }, [filteredItem]);




    const handleChange = (fieldName, value, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value
        }));
        setUpdateField((prevUpdateField) => ({
            ...prevUpdateField,
            [fieldName]: value.toString()
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
        }));
        
        
        // Console mein changes dikhaane ke liye
        // console.log(`Field '${fieldName}' updated to:`, value);
    };
    
    const isValidDate = (dateString) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateString);
    };

    const handleUpdate = async (e) => {
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
                validationErrors[key] = "Please enter a valid date (YYYY-MM-DD)";
            } else if (
                key === "exp_work_to" &&
                formData.exp_work_from &&
                new Date(value) < new Date(formData.exp_work_from)
            ) {
                validationErrors[key] = "End date must be after start date";
            }
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; // Don't proceed with update if there are validation errors
        }

        try {

            const updatedFormData = {
                ...updateField,
                experience_id: filteredItem.id
            };

            await candidatesApiService.updateCandidateExperience(updatedFormData);
            setNotificationMessage(`updated successfully`);
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
        <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
            <DialogTitle className="candidate-form-heading">Edit Attend Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate}>                 
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Name of Institute / Company</label>
                        <input className="set-input"
                        label="Name of Institute / Company"
                        type="text"
                        name="company_experience_name"
                        value={formData.company_experience_name}                        
                        onChange={(e) =>
                            handleChange("company_experience_name",e.target.value)}
                        fullWidth
                    />   
                     {errors.company_experience_name && (
                                <span className="error">{errors.company_experience_name}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Designation</label>
                        <input className="set-input"
                        label="Designation"
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={(e) =>
                            handleChange("designation",e.target.value)}
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
                        <input className="set-input"
                        label="Current Gross Pay(per month)"
                        type="text"
                        name="gross_pay"
                        value={formData.gross_pay}
                        onChange={(e) =>
                            handleChange("gross_pay",e.target.value)}
                        fullWidth
                    />
                     {errors.gross_pay && (
                                <span className="error">{errors.gross_pay}</span>
                            )}
                        </div> 
                        <div className="col-md-6">
                        <label className="SetLabel-Name"> Date From</label>
                        <input className="set-input"
                        label="Date From"
                        type="date"
                        name="exp_work_from"
                        value={formatDateForInput(formData.exp_work_from)}
                           onChange={(e) =>
                            handleChange("exp_work_from",e.target.value)}
                        fullWidth
                    />
                     {errors.exp_work_from && (
                                <span className="error">{errors.exp_work_from}</span>
                            )}
                        </div>
                     

                    </div>
               <div className="row">
               <div className="col-md-6">
                        <label className="SetLabel-Name">Date To</label>
                        <input className="set-input"
                        label="Date To"
                        type="date"
                        name="exp_work_to"
                        value={formatDateForInput(formData.exp_work_to)}
                           onChange={(e) =>
                            handleChange("exp_work_to",e.target.value)}
                        fullWidth
                    />
                    {errors.exp_work_to && (
                                <span className="error">{errors.exp_work_to}</span>
                            )}
                        </div>
               </div>
                 
                    <DialogActions>
                        <button className="submitbtn"  type="submit">
                            Update
                        </button>
                        <button className="canclebtn" onClick={handleClose}>
                            Cancle
                        </button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditCandidateExperienceForm;
