import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Modal,
  TextField,
  Box,
  Switch,
} from "@mui/material";
import {
  getInterviewSchedule,
  updateJobProfile,
} from "../../Services/AdminServices"; // Ensure correct path

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateJd() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    qualification_and_experience: "",
    highly_desirable: "",
    publish_to_job_profile: false,
  });

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const data = await getInterviewSchedule();
        setJobOpenings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  const handleEditClick = (job) => {
    setEditingJob(job);
    setFormValues({
      qualification_and_experience: job.qualification_and_experience,
      highly_desirable: job.highly_desirable,
      publish_to_job_profile: job.publish_to_job_profile,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJobProfile(editingJob.id, formValues);
      setJobOpenings((prevOpenings) =>
        prevOpenings.map((job) =>
          job.id === editingJob.id ? { ...job, ...formValues } : job
        )
      );
      handleCloseModal();
    } catch (err) {
      setError(err.message);
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
        Job Description
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Qualification</TableCell>
              <TableCell>Desirables</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobOpenings.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.departments}</TableCell>
                <TableCell>{job.post_applied_for}</TableCell>
                <TableCell>{job.qualification_and_experience}</TableCell>
                <TableCell>{job.highly_desirable}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(job)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Job Profile
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="qualification_and_experience"
              label="Qualification and Experience"
              value={formValues.qualification_and_experience}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="highly_desirable"
              label="Highly Desirable"
              value={formValues.highly_desirable}
              onChange={handleInputChange}
              required
            />
            <Box
              sx={{ display: "flex", alignItems: "center", margin: "16px 0" }}
            >
              <Typography variant="body1" sx={{ marginRight: "16px" }}>
                Publish to Job Profile
              </Typography>
              <Switch
                name="publish_to_job_profile"
                checked={formValues.publish_to_job_profile}
                onChange={handleInputChange}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
              sx={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateJd;
