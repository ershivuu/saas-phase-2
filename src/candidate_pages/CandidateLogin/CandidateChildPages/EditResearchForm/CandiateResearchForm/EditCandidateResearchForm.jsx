import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function EditCandidateResearchForm({ filteredItem, handleClose,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        orcid: "",
        scopusid: "",
        researchid: "",
    });
    const [updateField, setUpdateField] = useState({});
    const [errors, setErrors] = useState({
        orcid: "",
        scopusid: "",
        researchid: "",
    });


    useEffect(() => {
        if (filteredItem) {
            setFormData({
                orcid: filteredItem.orcid || "",                                 
                scopusid: filteredItem.scopusid || "",
                researchid: filteredItem.researchid || "",
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
        validateField(fieldName, value);
        // Console mein changes dikhaane ke liye
        // console.log(`Field '${fieldName}' updated to:`, value);
    };
    

    const validateField = (fieldName, value) => {
        let errorMessage = "";
        if (value.trim() === "") {
            errorMessage = `${fieldName} is required.`;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorMessage
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
                research_id: filteredItem.id
            };

            await candidatesApiService.updateCandidateResearch(updatedFormData);
      
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
            <DialogTitle className="candidate-form-heading">Edit Research Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate}>
              
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Orcid Id</label>
                        <input className="set-input"
                        label="orcid"
                        type="text"
                        name="orcid"
                        value={formData.orcid}                        
                        onChange={(e) =>
                            handleChange("orcid",e.target.value)}
                        fullWidth
                    />   
                     {errors.orcid && <span className="error">{errors.orcid}</span>}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Scopus Id</label>
                        <input className="set-input"
                        label="scopusid"
                        type="text"
                        name="scopusid"
                        value={formData.scopusid}
                        onChange={(e) =>
                            handleChange("scopusid",e.target.value)}
                        fullWidth
                    />
                    {errors.scopusid && <span className="error">{errors.scopusid}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Research Id</label>
                        <input className="set-input"
                        label="researchid"
                        type="text"
                        name="orcid"
                        value={formData.researchid}                        
                        onChange={(e) =>
                            handleChange("researchid",e.target.value)}
                        fullWidth
                    />   
                      {errors.researchid && <span className="error">{errors.researchid}</span>}
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

export default EditCandidateResearchForm;
