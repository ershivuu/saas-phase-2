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
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getJobOpenings,
  createJobOpening,
  updateJobOpening,
  getCombineCategories,
  getDepartment,
  deleteJobOpening,
} from "../../Services/AdminServices";



function CreateCurrentOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [originalEditData, setOriginalEditData] = useState({});
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
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.category_name === selectedCategoryName
    );

    setPosts(selectedCategory ? selectedCategory.posts : []);
    setSubposts([]);
    setFormData({
      ...formData,
      category_of_appointment: selectedCategoryName,
      post_applied_for: "",
      sub_post_applied_for: "",
    });
  };

  const handlePostChange = (e) => {
    const selectedPostName = e.target.value;
    const selectedPost = posts.find(
      (post) => post.post_name === selectedPostName
    );

    setSubposts(selectedPost ? selectedPost.subposts : []);
    setFormData({
      ...formData,
      post_applied_for: selectedPostName,
      sub_post_applied_for: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const selectedCategoryId = categories.find(
        (cat) => cat.category_name === formData.category_of_appointment
      )?.category_name;
      const selectedPostId = posts.find(
        (post) => post.post_name === formData.post_applied_for
      )?.post_name;
      const selectedSubpostId = subposts.find(
        (sub) => sub.subpost_name === formData.sub_post_applied_for
      )?.subpost_name;

      const dataToSubmit = {
        ...formData,
        category_of_appointment: selectedCategoryId,
        post_applied_for: selectedPostId,
        sub_post_applied_for: selectedSubpostId,
        last_date_to_apply: formatDateForServer(formData.last_date_to_apply),
        interview_date_1: formatDateForServer(formData.interview_date_1),
        interview_date_2: formatDateForServer(formData.interview_date_2),
        interview_date_3: formatDateForServer(formData.interview_date_3),
      };

    const response =  await createJobOpening(dataToSubmit);
      handleClose();
      fetchJobOpenings();
    
    } catch (error) {
      setError(error.message);
 
    }
  };

  // Edit Job Opening Dialog Handlers
  const handleEditClick = (job) => {
    const selectedCategory = categories.find(
      (cat) => cat.category_name === job.category_of_appointment
    );
    const selectedPost = selectedCategory
      ? selectedCategory.posts.find(
          (post) => post.post_name === job.post_applied_for
        )
      : null;

    setPosts(selectedCategory ? selectedCategory.posts : []);
    setSubposts(selectedPost ? selectedPost.subposts : []);
    setCurrentEditId(job.id);

    // Save the original data to compare later
    setOriginalEditData({ ...job });

    setEditFormData({
      ...job,
      last_date_to_apply: formatDate(job.last_date_to_apply),
      interview_date_1: formatDate(job.interview_date_1),
      interview_date_2: formatDate(job.interview_date_2),
      interview_date_3: formatDate(job.interview_date_3),
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "category_of_appointment") {
      const selectedCategory = categories.find(
        (cat) => cat.category_name === value
      );
      setPosts(selectedCategory ? selectedCategory.posts : []);
      setSubposts([]);
    }
    if (name === "post_applied_for") {
      const selectedPost = posts.find((post) => post.post_name === value);
      setSubposts(selectedPost ? selectedPost.subposts : []);
    }
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      // Construct the data to update, excluding unchanged fields
      const updatedFields = {};

      for (const [key, value] of Object.entries(editFormData)) {
        if (value !== originalEditData[key]) {
          updatedFields[key] = value;
        }
      }

      // Map category, post, and subpost names to IDs
      const selectedCategoryId = categories.find(
        (cat) => cat.category_name === editFormData.category_of_appointment
      )?.category_name;
      const selectedPostId = posts.find(
        (post) => post.post_name === editFormData.post_applied_for
      )?.post_name;
      const selectedSubpostId = subposts.find(
        (sub) => sub.subpost_name === editFormData.sub_post_applied_for
      )?.subpost_name;

      const dataToUpdate = {
        ...updatedFields,
        category_of_appointment: selectedCategoryId,
        post_applied_for: selectedPostId,
        sub_post_applied_for: selectedSubpostId,
        last_date_to_apply: formatDateForServer(
          editFormData.last_date_to_apply
        ),
        interview_date_1: formatDateForServer(editFormData.interview_date_1),
        interview_date_2: formatDateForServer(editFormData.interview_date_2),
        interview_date_3: formatDateForServer(editFormData.interview_date_3),
      };

      // Make the API call with dataToUpdate
    const response =  await updateJobOpening(currentEditId, dataToUpdate);
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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
     const response = await deleteJobOpening(deleteId); // Implement deleteJobOpening in your services
      setDeleteOpen(false);
      setDeleteId(null);
      fetchJobOpenings(); 
     
    } catch (error) {
      setError(error.message);
     
    }
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ float: "right", marginBottom: "20px" }}>
          <Button variant="contained" onClick={handleClickOpen}>
            Create Job Opening
          </Button>
        </div>
        <Typography variant="h5" gutterBottom>
          Current Openings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Subpost</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Last Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
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
                  <TableCell>{formatDate(job.last_date_to_apply)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={job.is_active_all}
                      onChange={(e) =>
                        handleSwitchChange(job.id, e.target.checked)
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
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(job.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={deleteOpen} onClose={handleDeleteClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this job opening?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Job Opening</DialogTitle>
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
                <MenuItem
                  key={category.category_id}
                  value={category.category_name}
                >
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
                <MenuItem key={post.post_id} value={post.post_name}>
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
                <MenuItem key={subpost.subpost_id} value={subpost.subpost_name}>
                  {subpost.subpost_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Department"
              name="departments"
              select
              fullWidth
              value={formData.depart_name}
              onChange={handleChange}
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
              InputLabelProps={{ shrink: true }}
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
              type="date"
              name="interview_date_1"
              fullWidth
              value={formData.interview_date_1}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Interview Date 2"
              type="date"
              name="interview_date_2"
              fullWidth
              value={formData.interview_date_2}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Interview Date 3"
              type="date"
              name="interview_date_3"
              fullWidth
              value={formData.interview_date_3}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
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
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleCloseEdit}>
          <DialogTitle>Edit Job Opening</DialogTitle>
          <DialogContent>
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
                <MenuItem
                  key={category.category_id}
                  value={category.category_name}
                >
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
                <MenuItem key={post.post_id} value={post.post_name}>
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
                <MenuItem key={subpost.subpost_id} value={subpost.subpost_name}>
                  {subpost.subpost_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Department"
              name="departments"
              select
              fullWidth
              value={editFormData.departments}
              onChange={handleEditChange}
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
              type="date"
              name="last_date_to_apply"
              fullWidth
              value={editFormData.last_date_to_apply}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
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
              type="date"
              name="interview_date_1"
              fullWidth
              value={editFormData.interview_date_1}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Interview Date 2"
              type="date"
              name="interview_date_2"
              fullWidth
              value={editFormData.interview_date_2}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Interview Date 3"
              type="date"
              name="interview_date_3"
              fullWidth
              value={editFormData.interview_date_3}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      
      </div>
    </>
  );
}

export default CreateCurrentOpening;
