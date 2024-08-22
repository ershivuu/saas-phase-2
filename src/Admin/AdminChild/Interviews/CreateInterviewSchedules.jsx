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
  Grid,
  MenuItem,
} from "@mui/material";
import {
  getInterviewSchedule,
  updateInterviewSchedule,
  getCombineCategories,
  getDepartment,
} from "../../Services/AdminServices";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
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
  const [formErrors, setFormErrors] = useState({
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

    // Clear the error when the user starts typing
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.interview_date_1)
      errors.interview_date_1 = "Interview Date 1 is required";
    if (!formData.interview_date_2)
      errors.interview_date_2 = "Interview Date 2 is required";
    if (!formData.interview_date_3)
      errors.interview_date_3 = "Interview Date 3 is required";
    if (!formData.eligibility_criteria)
      errors.eligibility_criteria = "Eligibility Criteria is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
    if (!validateForm()) return;
    try {
      const response = await updateInterviewSchedule(currentJob.id, {
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
  // ------------------------------------------------------------------------------------------------
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [subposts, setSubposts] = useState([]);
  const [filters, setFilters] = useState({
    category_of_appointment: "",
    post_applied_for: "",
    departments: "",
  });
  const fetchCategories = async () => {
    try {
      const data = await getCombineCategories();
      setCategories(data);

      // Build maps for quick lookup
      const catMap = new Map();
      const postMap = new Map();
      const subpostMap = new Map();
      data.forEach((category) => {
        catMap.set(category.category_id, category.category_name);
        category.posts.forEach((post) => {
          postMap.set(post.post_id, post.post_name);
          post.subposts.forEach((subpost) => {
            subpostMap.set(subpost.subpost_id, subpost.subpost_name);
          });
        });
      });
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchDepartments = async () => {
    try {
      const data = await getDepartment();
      setDepartments(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };

      console.log(updatedFilters); // Debug log

      if (name === "category_of_appointment") {
        const selectedCategory = categories.find(
          (category) => category.category_name === value
        );
        setPosts(selectedCategory ? selectedCategory.posts : []);
        setSubposts([]);

        setFormData((prevFormData) => ({
          ...prevFormData,
          category_of_appointment: value,
          post_applied_for: "",
          sub_post_applied_for: "",
        }));
      } else if (name === "post_applied_for") {
        const selectedPost = posts.find((post) => post.post_name === value);

        setSubposts(selectedPost ? selectedPost.subposts : []);

        setFormData((prevFormData) => ({
          ...prevFormData,
          post_applied_for: value,
          sub_post_applied_for: "",
        }));
      }

      return updatedFilters;
    });
  };

  const handleReset = () => {
    setFilters({
      category_of_appointment: "",
      post_applied_for: "",
      departments: "",
    });
  };
  const filteredJobOpenings = jobOpenings.filter((job) => {
    // Apply filters based on selected values
    const categoryMatch =
      filters.category_of_appointment === "" ||
      job.category_of_appointment === filters.category_of_appointment;

    const postMatch =
      filters.post_applied_for === "" ||
      job.post_applied_for === filters.post_applied_for;

    const departmentMatch =
      filters.departments === "" || job.departments === filters.departments;

    return categoryMatch && postMatch && departmentMatch;
  });
  useEffect(() => {
    fetchCategories();
    fetchDepartments();
  }, []);
  // ------------------------------------------------------------------------------------------------
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
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={3}>
          <TextField
            margin="dense"
            label="Category"
            name="category_of_appointment"
            select
            fullWidth
            value={filters.category_of_appointment}
            onChange={handleFilterChange}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.category_id}
                value={category.category_name}
              >
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            margin="dense"
            label="post"
            name="post_applied_for"
            select
            fullWidth
            value={filters.post_applied_for}
            onChange={handleFilterChange}
          >
            {posts.map((post) => (
              <MenuItem key={post.post_id} value={post.post_name}>
                {post.post_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            margin="dense"
            label="Department"
            name="departments"
            select
            fullWidth
            value={filters.departments}
            onChange={handleFilterChange}
          >
            {departments.map((department) => (
              <MenuItem
                key={department.department_id}
                value={department.depart_name}
              >
                {department.depart_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          container
          alignItems="center"
          justifyContent="flex-start"
        >
          <IconButton color="error" onClick={handleReset}>
            <LockResetRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
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
            {filteredJobOpenings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  No Interview Schedule Available...
                </TableCell>
              </TableRow>
            )}
            {filteredJobOpenings
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((job, index) => (
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
            error={!!formErrors.interview_date_1}
            helperText={formErrors.interview_date_1}
          />
          <TextField
            label="Interview Date 2"
            type="datetime-local"
            name="interview_date_2"
            value={formData.interview_date_2}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!formErrors.interview_date_2}
            helperText={formErrors.interview_date_2}
          />
          <TextField
            label="Interview Date 3"
            type="datetime-local"
            name="interview_date_3"
            value={formData.interview_date_3}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!formErrors.interview_date_3}
            helperText={formErrors.interview_date_3}
          />
          <TextField
            label="Eligibility Criteria"
            name="eligibility_criteria"
            value={formData.eligibility_criteria}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!formErrors.eligibility_criteria}
            helperText={formErrors.eligibility_criteria}
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
