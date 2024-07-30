import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function EditAttendForm({ filteredItem, handleClose,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        attend_date_from:"",
        attend_date_to:"",
        name_of_course: "",      
        sponsered_by: ""
    });
    const [updateField, setUpdateField] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (filteredItem) {
            setFormData({
                name_of_course: filteredItem.name_of_course || "",              
                attend_date_from: filteredItem.attend_date_from || "",
                attend_date_to: filteredItem.attend_date_to || "",               
                sponsered_by: filteredItem.sponsered_by || ""
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
                (key === "attend_date_from" || key === "attend_date_to") &&
                !isValidDate(value)
            ) {
                validationErrors[key] = "Please enter a valid date (YYYY-MM-DD)";
            } else if (
                key === "attend_date_to" &&
                formData.attend_date_from &&
                new Date(value) < new Date(formData.attend_date_from)
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
                attend_id: filteredItem.id
            };

            await candidatesApiService.updateAttendForm(updatedFormData);
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
        <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
            <DialogTitle className="candidate-form-heading">Edit Attend Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Attend Date From</label>
                        <input className="set-input"
                        label="Attend Date From"
                        type="date"
                        name="attend_date_from"
                        value={formatDateForInput(formData.attend_date_from)}
                           onChange={(e) =>
                            handleChange("attend_date_from",e.target.value)}
                        fullWidth
                    />
                     {errors.attend_date_from && (
                                <span className="error">{errors.attend_date_from}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Attend Date To</label>
                        <input className="set-input"
                        label="Attend Date To"
                        type="date"
                        name="attend_date_to"
                        value={formatDateForInput(formData.attend_date_to)}
                           onChange={(e) =>
                            handleChange("attend_date_to",e.target.value)}
                        fullWidth
                    />
                    {errors.attend_date_to && (
                                <span className="error">{errors.attend_date_to}</span>
                            )}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Name of Course</label>
                        <input className="set-input"
                        label="Name of Course"
                        type="text"
                        name="name_of_course"
                        value={formData.name_of_course}                        
                        onChange={(e) =>
                            handleChange("name_of_course",e.target.value)}
                        fullWidth
                    />   
                     {errors.name_of_course && (
                                <span className="error">{errors.name_of_course}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Sponsored By</label>
                        <input className="set-input"
                        label="Sponsored By"
                        type="text"
                        name="sponsered_by"
                        value={formData.sponsered_by}
                        onChange={(e) =>
                            handleChange("sponsered_by",e.target.value)}
                        fullWidth
                    />
                     {errors.sponsered_by && (
                                <span className="error">{errors.sponsered_by}</span>
                            )}
                        </div>

                    </div>
                   
               
                 
                    <DialogActions>
                        <button className="submitbtn" type="submit">
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

export default EditAttendForm;