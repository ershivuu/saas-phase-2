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
  updateJobOpening,
  getCombineCategories,
  getDepartment,
} from "../../Services/AdminServices";

function CreateCurrentOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for Add Job Opening Dialog
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category_of_appointment: "",
    post_applied_for: "",
    sub_post_applied_for: "",
    departments: "",
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

  // States for Edit Job Opening Dialog
  const [editOpen, setEditOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    ...formData,
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
      setDepartments(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
    fetchCategories();
    fetchDepartments();
  }, []);

  // Utility function to format dates for server
  const formatDateForServer = (date) => {
    if (!date) return null;
    const [year, month, day] = date.split("T")[0].split("-");
    return `${year}/${month}/${day}`;
  };

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
    setSubposts([]);
    setFormData({
      ...formData,
      category_of_appointment: selectedCategoryId,
      post_applied_for: "",
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
      sub_post_applied_for: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        category_of_appointment: categoryMap.get(
          formData.category_of_appointment
        ),
        post_applied_for: postMap.get(formData.post_applied_for),
        sub_post_applied_for: subpostMap.get(formData.sub_post_applied_for),
        last_date_to_apply: formatDateForServer(formData.last_date_to_apply),
        interview_date_1: formatDateForServer(formData.interview_date_1),
        interview_date_2: formatDateForServer(formData.interview_date_2),
        interview_date_3: formatDateForServer(formData.interview_date_3),
      };

      await createJobOpening(dataToSubmit);
      handleClose();
      fetchJobOpenings();
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit Job Opening Dialog Handlers
  const handleEditClick = (job) => {
    setCurrentEditId(job.id);
    setEditFormData({
      category_of_appointment: job.category_of_appointment,
      post_applied_for: job.post_applied_for,
      sub_post_applied_for: job.sub_post_applied_for,
      departments: job.departments,
      qualification_and_experience: job.qualification_and_experience,
      highly_desirable: job.highly_desirable,
      last_date_to_apply: job.last_date_to_apply,
      eligibility_criteria: job.eligibility_criteria,
      interview_date_1: job.interview_date_1,
      interview_date_2: job.interview_date_2,
      interview_date_3: job.interview_date_3,
      publish_to_job_profile: job.publish_to_job_profile,
      publish_to_schedule_interview: job.publish_to_schedule_interview,
      publish_to_vacancy: job.publish_to_vacancy,
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const dataToUpdate = {
        ...editFormData,
        category_of_appointment: categoryMap.get(
          editFormData.category_of_appointment
        ),
        post_applied_for: postMap.get(editFormData.post_applied_for),
        sub_post_applied_for: subpostMap.get(editFormData.sub_post_applied_for),
        last_date_to_apply: formatDateForServer(
          editFormData.last_date_to_apply
        ),
        interview_date_1: formatDateForServer(editFormData.interview_date_1),
        interview_date_2: formatDateForServer(editFormData.interview_date_2),
        interview_date_3: formatDateForServer(editFormData.interview_date_3),
      };

      await updateJobOpening(currentEditId, dataToUpdate);
      handleCloseEdit();
      fetchJobOpenings();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      await updateJobOpening(id, { is_active_all: isActive });
      fetchJobOpenings();
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
              <TableCell>Last Date</TableCell>
              <TableCell>Active</TableCell>
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
                  {formatDateForServer(job.last_date_to_apply)}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={job.is_active_all}
                        onChange={(e) =>
                          handleSwitchChange(job.id, e.target.checked)
                        }
                      />
                    }
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

      {/* Add Job Opening Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Job Opening</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category"
            name="category_of_appointment"
            select
            fullWidth
            value={formData.category_of_appointment}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Post"
            name="post_applied_for"
            select
            fullWidth
            value={formData.post_applied_for}
            onChange={handlePostChange}
          >
            {posts.map((post) => (
              <MenuItem key={post.post_id} value={post.post_id}>
                {post.post_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Subpost"
            name="sub_post_applied_for"
            select
            fullWidth
            value={formData.sub_post_applied_for}
            onChange={handleChange}
          >
            {subposts.map((subpost) => (
              <MenuItem key={subpost.subpost_id} value={subpost.subpost_id}>
                {subpost.subpost_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Departments"
            name="departments"
            fullWidth
            value={formData.departments}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Qualification and Experience"
            name="qualification_and_experience"
            fullWidth
            value={formData.qualification_and_experience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Highly Desirable"
            name="highly_desirable"
            fullWidth
            value={formData.highly_desirable}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Last Date to Apply"
            name="last_date_to_apply"
            type="date"
            fullWidth
            value={formData.last_date_to_apply}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Eligibility Criteria"
            name="eligibility_criteria"
            fullWidth
            value={formData.eligibility_criteria}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Interview Date 1"
            name="interview_date_1"
            type="date"
            fullWidth
            value={formData.interview_date_1}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Interview Date 2"
            name="interview_date_2"
            type="date"
            fullWidth
            value={formData.interview_date_2}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Interview Date 3"
            name="interview_date_3"
            type="date"
            fullWidth
            value={formData.interview_date_3}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.publish_to_job_profile}
                onChange={handleChange}
                name="publish_to_job_profile"
              />
            }
            label="Publish to Job Profile"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.publish_to_schedule_interview}
                onChange={handleChange}
                name="publish_to_schedule_interview"
              />
            }
            label="Publish to Schedule Interview"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.publish_to_vacancy}
                onChange={handleChange}
                name="publish_to_vacancy"
              />
            }
            label="Publish to Vacancy"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Opening Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle>Edit Job Opening</DialogTitle>
        <DialogContent>
          {/* Similar form fields as in the add dialog */}
          <TextField
            margin="dense"
            label="Category"
            name="category_of_appointment"
            select
            fullWidth
            value={editFormData.category_of_appointment}
            onChange={handleEditChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Post"
            name="post_applied_for"
            select
            fullWidth
            value={editFormData.post_applied_for}
            onChange={handleEditChange}
          >
            {posts.map((post) => (
              <MenuItem key={post.post_id} value={post.post_id}>
                {post.post_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Subpost"
            name="sub_post_applied_for"
            select
            fullWidth
            value={editFormData.sub_post_applied_for}
            onChange={handleEditChange}
          >
            {subposts.map((subpost) => (
              <MenuItem key={subpost.subpost_id} value={subpost.subpost_id}>
                {subpost.subpost_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Departments"
            name="departments"
            fullWidth
            value={editFormData.departments}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Qualification and Experience"
            name="qualification_and_experience"
            fullWidth
            value={editFormData.qualification_and_experience}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Highly Desirable"
            name="highly_desirable"
            fullWidth
            value={editFormData.highly_desirable}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Last Date to Apply"
            name="last_date_to_apply"
            type="date"
            fullWidth
            value={editFormData.last_date_to_apply}
            onChange={handleEditChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Eligibility Criteria"
            name="eligibility_criteria"
            fullWidth
            value={editFormData.eligibility_criteria}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Interview Date 1"
            name="interview_date_1"
            type="date"
            fullWidth
            value={editFormData.interview_date_1}
            onChange={handleEditChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Interview Date 2"
            name="interview_date_2"
            type="date"
            fullWidth
            value={editFormData.interview_date_2}
            onChange={handleEditChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Interview Date 3"
            name="interview_date_3"
            type="date"
            fullWidth
            value={editFormData.interview_date_3}
            onChange={handleEditChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editFormData.publish_to_job_profile}
                onChange={handleEditChange}
                name="publish_to_job_profile"
              />
            }
            label="Publish to Job Profile"
          />
          <FormControlLabel
            control={
              <Switch
                checked={editFormData.publish_to_schedule_interview}
                onChange={handleEditChange}
                name="publish_to_schedule_interview"
              />
            }
            label="Publish to Schedule Interview"
          />
          <FormControlLabel
            control={
              <Switch
                checked={editFormData.publish_to_vacancy}
                onChange={handleEditChange}
                name="publish_to_vacancy"
              />
            }
            label="Publish to Vacancy"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCurrentOpening;
