import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  getJobOpenings,
  createJobOpening,
  updateMasterJobOpenings,
  getCombineCategories,
  getDepartment,
} from "../../Services/AdminServices";

function CreateCurrentOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]); // Added state for departments
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // For the dialog
  const [formData, setFormData] = useState({
    category_of_appointment: "",
    post_applied_for: "",
    sub_post_applied_for: "",
    departments: "", // Changed to hold department ID
    qualification_and_experience: "",
    highly_desirable: "",
    last_date_to_apply: "",
    eligibility_criteria: "",
    interview_date_1: "",
    interview_date_2: "",
    interview_date_3: "",
    publish_to_job_profile: false,
    publish_to_schedule_interview: false,
    publish_to_vacancy: false,
  });
  const [posts, setPosts] = useState([]);
  const [subposts, setSubposts] = useState([]);
  const [categoryMap, setCategoryMap] = useState(new Map());
  const [postMap, setPostMap] = useState(new Map());
  const [subpostMap, setSubpostMap] = useState(new Map());
  const fetchJobOpenings = async () => {
    try {
      const data = await getJobOpenings();
      setJobOpenings(data.jobOpenings);
    } catch (error) {
      setError(error.message);
    }
  };
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
      setCategoryMap(catMap);
      setPostMap(postMap);
      setSubpostMap(subpostMap);
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchDepartments = async () => {
    try {
      const data = await getDepartment();
      setDepartments(data); // Set the departments data
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
    fetchCategories();
    fetchDepartments(); // Fetch departments
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const category = categories.find(
      (c) => c.category_id === selectedCategoryId
    );
    setPosts(category ? category.posts : []);
    setSubposts([]); // Reset subposts when category changes
    setFormData({
      ...formData,
      category_of_appointment: selectedCategoryId,
      post_applied_for: "", // Reset post and subpost
      sub_post_applied_for: "",
    });
  };

  const handlePostChange = (e) => {
    const selectedPostId = e.target.value;
    const post = posts.find((p) => p.post_id === selectedPostId);
    setSubposts(post ? post.subposts : []);
    setFormData({
      ...formData,
      post_applied_for: selectedPostId,
      sub_post_applied_for: "", // Reset subpost
    });
  };

  const handleSubmit = async () => {
    try {
      // Convert IDs to names/values
      const dataToSubmit = {
        ...formData,
        category_of_appointment: categoryMap.get(
          formData.category_of_appointment
        ),
        post_applied_for: postMap.get(formData.post_applied_for),
        sub_post_applied_for: subpostMap.get(formData.sub_post_applied_for),
      };

      await createJobOpening(dataToSubmit);
      handleClose();
      // Optionally, refetch job openings here
      const data = await getJobOpenings();
      setJobOpenings(data.jobOpenings);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ float: "right", marginBottom: "20px" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Current Opening
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Current Opening
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Sub Post</TableCell>
              <TableCell>Department</TableCell>
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
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding new job opening */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Job Opening</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            name="category_of_appointment"
            value={formData.category_of_appointment}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Post"
            name="post_applied_for"
            value={formData.post_applied_for}
            onChange={handlePostChange}
            fullWidth
            margin="dense"
            disabled={!formData.category_of_appointment} // Disable if no category selected
          >
            {posts.map((post) => (
              <MenuItem key={post.post_id} value={post.post_id}>
                {post.post_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sub Post"
            name="sub_post_applied_for"
            value={formData.sub_post_applied_for}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={!formData.post_applied_for} // Disable if no post selected
          >
            {subposts.map((subpost) => (
              <MenuItem key={subpost.subpost_id} value={subpost.subpost_id}>
                {subpost.subpost_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Department"
            name="departments"
            value={formData.departments}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.depart_name}>
                {department.depart_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            name="qualification_and_experience"
            label="Qualification and Experience"
            type="text"
            fullWidth
            value={formData.qualification_and_experience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="highly_desirable"
            label="Highly Desirable"
            type="text"
            fullWidth
            value={formData.highly_desirable}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="last_date_to_apply"
            label="Last Date to Apply"
            type="date"
            fullWidth
            value={formData.last_date_to_apply}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="eligibility_criteria"
            label="Eligibility Criteria"
            type="text"
            fullWidth
            value={formData.eligibility_criteria}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="interview_date_1"
            label="Interview Date 1"
            type="date"
            fullWidth
            value={formData.interview_date_1}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="interview_date_2"
            label="Interview Date 2"
            type="date"
            fullWidth
            value={formData.interview_date_2}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="interview_date_3"
            label="Interview Date 3"
            type="date"
            fullWidth
            value={formData.interview_date_3}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Switch
                name="publish_to_job_profile"
                checked={formData.publish_to_job_profile}
                onChange={handleChange}
              />
            }
            label="Publish to Job Profile"
          />
          <FormControlLabel
            control={
              <Switch
                name="publish_to_schedule_interview"
                checked={formData.publish_to_schedule_interview}
                onChange={handleChange}
              />
            }
            label="Publish to Schedule Interview"
          />
          <FormControlLabel
            control={
              <Switch
                name="publish_to_vacancy"
                checked={formData.publish_to_vacancy}
                onChange={handleChange}
              />
            }
            label="Publish to Vacancy"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCurrentOpening;
