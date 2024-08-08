import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  getPosts,
  getCategories,
  createPost,
  updatePost,
  deletePost,
} from "../../Services/AdminServices";
import Notification from "../../../Notification/Notification";

function CreatePosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [postName, setPostName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({
    categoryId: "",
    postName: "",
  });

  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndCategories();
  }, []);

  const handleAddPostClick = () => {
    setIsEditing(false);
    setDialogOpen(true);
    setCategoryId("");
    setPostName("");
    setErrors({
      categoryId: "",
      postName: "",
    });
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setSelectedPost(post);
    setCategoryId(post.category_id);
    setPostName(post.post_name);
    setDialogOpen(true);
    setErrors({
      categoryId: "",
      postName: "",
    });
  };

  const handleDeleteClick = (post) => {
    console.log("Setting post to delete:", post); // Debug log
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCategoryId("");
    setPostName("");
    setSelectedPost(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!categoryId) newErrors.categoryId = "This field is required";
    if (!postName) newErrors.postName = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;
    try {
      let response ;
      if (isEditing) {
      response = await updatePost(selectedPost.id, categoryId, postName);
      } else {
      response = await createPost(categoryId, postName);
      }
      const postsData = await getPosts();
      setPosts(postsData);
      handleCloseDialog();
      setNotification({
        open: true,
        message: response.message || (isEditing ? "Updated Successfully" : "Added Successfully"),
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (postToDelete) {
        console.log("Deleting post with ID:", postToDelete.id); // Debug log
      const response =  await deletePost(postToDelete.id);
        const postsData = await getPosts();
        setPosts(postsData);
        handleCloseDeleteDialog();
         setNotification({
          open: true,
          message: response.message || "Deleted Successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setError(error.message);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    if (e.target.value) setErrors({ ...errors, categoryId: "" });
  };

  const handlePostNameChange = (e) => {
    setPostName(e.target.value);
    if (e.target.value) setErrors({ ...errors, postName: "" });
  };


  if (loading)
    return (
      <div className="loading-process">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Post Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
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
      <div style={{ float: "right", marginBottom: "20px" }}>
        <Button variant="contained" onClick={handleAddPostClick}>
          Add Post
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Post Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No posts available...</TableCell>
              </TableRow>
            )}
            {posts
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{post.category_name}</TableCell>
                  <TableCell>{post.post_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(post)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(post)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Post" : "Add New Post"}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.categoryId)}
            helperText={errors.categoryId}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Post Name"
            value={postName}
            onChange={handlePostNameChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.postName)}
            helperText={errors.postName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "Update Post" : "Add Post"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
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

export default CreatePosts;
