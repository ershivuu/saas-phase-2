import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  getInterviewSchedule,
  updateInterviewSchedule,
} from "../../Services/AdminServices";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification";

function CreateInterviewSchedules() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    interview_date_1: "",
    interview_date_2: "",
    interview_date_3: "",
    eligibility_criteria: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchJobOpenings = async () => {
      setLoading(true);
      try {
        const data = await getInterviewSchedule();
        setJobOpenings(data);
      } catch (error) {
        setError("Error fetching job openings: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  const handleEditClick = (job) => {
    setCurrentJob(job);
    setFormData({
      interview_date_1: formatDateTime(job.interview_date_1),
      interview_date_2: formatDateTime(job.interview_date_2),
      interview_date_3: formatDateTime(job.interview_date_3),
      eligibility_criteria: job.eligibility_criteria,
    });
    setOpen(true);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = async (job) => {
    try {
      const updatedStatus = !job.publish_to_schedule_interview;
      await updateInterviewSchedule(job.id, {
        publish_to_schedule_interview: updatedStatus,
      });
      const data = await getInterviewSchedule();
      setJobOpenings(data);
    } catch (error) {
      setError("Error updating interview status: " + error.message);
    }
  };

  const handleSubmit = async () => {
    try {
   const response =   await updateInterviewSchedule(currentJob.id, {
        ...formData,
        publish_to_schedule_interview: currentJob.publish_to_schedule_interview,
      });
      const data = await getInterviewSchedule();
      setJobOpenings(data);
      handleClose();
      setNotification({
        open: true,
        message: response.message || "Updated Successfully",
        severity: "success",
      });
    } catch (error) {
      setError("Error updating interview schedule: " + error.message);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  if (loading)
    return (
      <div className="loading-process">
        <div className="inner-loading">
          <CircularProgress />
        </div>
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Error</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Typography color="error" sx={{ padding: "10px" }}>
                Error: {error}
              </Typography>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Interview Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Sub Post</TableCell>
              <TableCell>Departments</TableCell>
              <TableCell>Eligibility</TableCell>
              <TableCell>Date 1</TableCell>
              <TableCell>Date 2</TableCell>
              <TableCell>Date 3</TableCell>
              <TableCell>Publish to Schedule</TableCell> {/* New Column */}
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobOpenings.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.category_of_appointment}</TableCell>
                <TableCell>{job.post_applied_for}</TableCell>
                <TableCell>{job.sub_post_applied_for}</TableCell>
                <TableCell>{job.departments}</TableCell>
                <TableCell>{job.eligibility_criteria}</TableCell>
                <TableCell>
                  {new Date(job.interview_date_1).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(job.interview_date_2).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(job.interview_date_3).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={job.publish_to_schedule_interview}
                    onChange={() => handleSwitchChange(job)} // Handle the Switch change
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(job)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Interview Schedule</DialogTitle>
        <DialogContent>
          <TextField
            label="Interview Date 1"
            type="datetime-local"
            name="interview_date_1"
            value={formData.interview_date_1}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Interview Date 2"
            type="datetime-local"
            name="interview_date_2"
            value={formData.interview_date_2}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Interview Date 3"
            type="datetime-local"
            name="interview_date_3"
            value={formData.interview_date_3}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Eligibility Criteria"
            name="eligibility_criteria"
            value={formData.eligibility_criteria}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default CreateInterviewSchedules;
