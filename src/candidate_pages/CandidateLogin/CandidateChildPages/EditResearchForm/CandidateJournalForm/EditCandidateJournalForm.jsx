import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function EditCandidateJournalForm({ filteredItem, handleClose,fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
    const [formData, setFormData] = useState({
        journal_publication_year: "",
        journal_publication_title: "",
        journal_publication_author: "",
        journal_publication_index: "",
        journal_publication_name: "",
        journal_publication_issn: "",
        journal_publication_volume: "",
        journal_publication_issue: "",
    });
    const [updateField, setUpdateField] = useState({});
    const [errors, setErrors] = useState({
        journal_publication_year: "",
        journal_publication_title: "",
        journal_publication_author: "",
        journal_publication_index: "",
        journal_publication_name: "",
        journal_publication_issn: "",
        journal_publication_volume: "",
        journal_publication_issue: "",
    });

    useEffect(() => {
        if (filteredItem) {
            setFormData({
                journal_publication_year: filteredItem.journal_publication_year || "",                                 
                journal_publication_title: filteredItem.journal_publication_title || "",
                journal_publication_author: filteredItem.journal_publication_author || "",
                journal_publication_index: filteredItem.journal_publication_index || "",
                journal_publication_name: filteredItem.journal_publication_name || "",
                journal_publication_issn: filteredItem.journal_publication_issn || "",
                journal_publication_volume: filteredItem.journal_publication_volume || "",
                journal_publication_issue: filteredItem.journal_publication_issue || "",
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
        
        // Console mein changes dikhaane ke liye
        // console.log(`Field '${fieldName}' updated to:`, value);
        validateField(fieldName, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";
        if (value.trim() === "") {
            errorMessage = `This feild is required.`;
        }
        if (fieldName === 'journal_publication_year' && !/^\d{4}$/.test(value)) {
            errorMessage = 'Please enter a 4-digit number for the Year field.';
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
                journal_publication_id: filteredItem.id
            };

            await candidatesApiService.updateCandidateJournalPublications(updatedFormData);
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
            <DialogTitle className="candidate-form-heading">Edit Journal Publication Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate}>
              
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Year</label>
                        <input className="set-input"
                        label="journal_publication_year"
                        type="text"
                        name="journal_publication_year"
                        value={formData.journal_publication_year}                        
                        onChange={(e) =>
                            handleChange("journal_publication_year",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_year && <span className="error">{errors.journal_publication_year}</span>}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Title</label>
                        <input className="set-input"
                        label="journal_publication_title"
                        type="text"
                        name="journal_publication_title"
                        value={formData.journal_publication_title}
                        onChange={(e) =>
                            handleChange("journal_publication_title",e.target.value)}
                        fullWidth
                    />
                     {errors.journal_publication_title && <span className="error">{errors.journal_publication_title}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Author Role/ Inventor</label>
                        <input className="set-input"
                        label="journal_publication_author"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_author}                        
                        onChange={(e) =>
                            handleChange("journal_publication_author",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_author && <span className="error">{errors.journal_publication_author}</span>}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Indexing</label>
                        <input className="set-input"
                        label="journal_publication_index"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_index}                        
                        onChange={(e) =>
                            handleChange("journal_publication_index",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_index && <span className="error">{errors.journal_publication_index}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Journal Name</label>
                        <input className="set-input"
                        label="journal_publication_name"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_name}                        
                        onChange={(e) =>
                            handleChange("journal_publication_name",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_name && <span className="error">{errors.journal_publication_name}</span>}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">ISSN</label>
                        <input className="set-input"
                        label="journal_publication_issn"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_issn}                        
                        onChange={(e) =>
                            handleChange("journal_publication_issn",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_issn && <span className="error">{errors.journal_publication_issn}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Volume</label>
                        <input className="set-input"
                        label="journal_publication_volume"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_volume}                        
                        onChange={(e) =>
                            handleChange("journal_publication_volume",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_volume && <span className="error">{errors.journal_publication_volume}</span>}
                        </div>
                        <div className="col-md-6">
                        <label className="SetLabel-Name">Issue</label>
                        <input className="set-input"
                        label="journal_publication_issue"
                        type="text"
                        name="orcid"
                        value={formData.journal_publication_issue}                        
                        onChange={(e) =>
                            handleChange("journal_publication_issue",e.target.value)}
                        fullWidth
                    />   
                     {errors.journal_publication_issue && <span className="error">{errors.journal_publication_issue}</span>}
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

export default EditCandidateJournalForm;
