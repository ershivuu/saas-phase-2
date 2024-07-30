import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import candidatesApiService from "../../../../candidateService";

function AddAttendForm({ handleCloseAttendClick, fetchData,setNotificationOpen,setNotificationMessage,setNotificationSeverity }) {
  const [formData, setFormData] = useState({
    attend_date_from: "",
    attend_date_to: "",
    name_of_course: "",
    sponsered_by: "",
  });
  // const [notificationOpen, setNotificationOpen] = useState(false);
  // const [notificationMessage, setNotificationMessage] = useState("");
  // const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = "This field is required";
    }

    if (name === "attend_date_from" || name === "attend_date_to") {
      if (!isValidDate(value)) {
        errorMessage = "Please enter a valid date (YYYY-MM-DD)";
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dateRegex) !== null;
  };


  const handleSubmit = async (e) => {
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await candidatesApiService.addCandidateAttend(formData);
      // console.log("check for notification", response);
      if (response) {
        setNotificationMessage(`added successfully`);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        handleCloseAttendClick();
        fetchData();
      }


    } catch (error) {
      console.error(`Error submitting data: ${error.message}`);
    }

  };

  return (
    <>

      <Dialog open={true} PaperProps={{ style: { width: "100%" } }}>
        <DialogTitle className="candidate-form-heading">Add Attend Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label className="SetLabel-Name">Attend Date From</label>
                <input
                  className="set-input"
                  label="Attend Date From"
                  type="date"
                  name="attend_date_from"
                  value={formData.attend_date_from}
                  onChange={handleChange}
                  fullWidth />
                {errors.attend_date_from && (
                  <span className="error">{errors.attend_date_from}</span>
                )}
              </div>
              <div className="col-md-6">
                <label className="SetLabel-Name">Attend Date To</label>
                <input
                  className="set-input"
                  label="Attend Date To"
                  type="date"
                  name="attend_date_to"
                  value={formData.attend_date_to}
                  onChange={handleChange}
                  fullWidth />
                {errors.attend_date_to && (
                  <span className="error">{errors.attend_date_to}</span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="SetLabel-Name">Name of Course</label>
                <input
                  className="set-input"
                  label="Name of Course"
                  type="text"
                  name="name_of_course"
                  value={formData.name_of_course}
                  onChange={handleChange}
                  fullWidth />
                {errors.name_of_course && (
                  <span className="error">{errors.name_of_course}</span>
                )}
              </div>
              <div className="col-md-6">
                <label className="SetLabel-Name">Sponsored By</label>
                <input
                  className="set-input"
                  label="Sponsored By"
                  type="text"
                  name="sponsered_by"
                  value={formData.sponsered_by}
                  onChange={handleChange}
                  fullWidth />
                {errors.sponsered_by && (
                  <span className="error">{errors.sponsered_by}</span>
                )}
              </div>
            </div>

            <DialogActions>
              <button className="submitbtn"  type="submit">
                Submit
              </button>
              <button className="canclebtn" onClick={handleCloseAttendClick}>Cancle</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

    </>
  );
}

export default AddAttendForm;
