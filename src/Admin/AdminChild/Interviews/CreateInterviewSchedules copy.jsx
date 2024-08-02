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
  } from "@mui/material";
import {
  getInterviewSchedule,
  updateInterviewSchedule,
} from "../../Services/AdminServices"; // Import the new update function
import EditIcon from "@mui/icons-material/Edit";

function CreateInterviewSchedules() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [open, setOpen] = useState(false);

  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    interview_date_1: "",
    interview_date_2: "",
    interview_date_3: "",
    eligibility_criteria: "",
    // Removed publish_to_schedule_interview from formData
  });

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const data = await getInterviewSchedule();
        setJobOpenings(data);
      } catch (error) {
        console.error("Error fetching job openings:", error);
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
      // Removed publish_to_schedule_interview
    });
    setOpen(true);
  };

  // Utility function to format the date to YYYY-MM-DDTHH:MM
  const formatDateTime = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined values
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
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

  const handleSwitchChange = async (jobId) => {
    const updatedJobOpenings = jobOpenings.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          publish_to_schedule_interview: !job.publish_to_schedule_interview,
        };
      }
      return job;
    });

    setJobOpenings(updatedJobOpenings);

    const updatedData = updatedJobOpenings.find((job) => job.id === jobId);

    try {
      await updateInterviewSchedule(jobId, {
        ...updatedData,
        // The id field should not be included in the update data
      });
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateInterviewSchedule(currentJob.id, {
        ...formData,
        publish_to_schedule_interview: currentJob.publish_to_schedule_interview, // Preserve the current state for this field
      }); // Pass the current job id and updated data
      // Optionally refresh the job openings
      const data = await getInterviewSchedule();
      setJobOpenings(data);
      handleClose();
    } catch (error) {
      console.error("Error updating interview schedule:", error);
    }
  };

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
              <TableCell>Publish</TableCell> {/* New column for the switch */}
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
                    onChange={() => handleSwitchChange(job.id)}
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
    </div>
  );
}

export default CreateInterviewSchedules;
