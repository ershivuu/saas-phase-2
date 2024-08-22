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
  IconButton,
} from "@mui/material";
import {
  getSubPosts,
  getPosts,
  createSubPost,
  updateSubPost,
  deleteSubPost,
} from "../../Services/AdminServices";
import Notification from "../../../Notification/Notification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function SubPost() {
  const [subPosts, setSubPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubPost, setSelectedSubPost] = useState(null);
  const [subPostName, setSubPostName] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [subPostToDelete, setSubPostToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [errors, setErrors] = useState({
    postId: "",
    subPostName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subPostsData, postsData] = await Promise.all([
          getSubPosts(),
          getPosts(),
        ]);
        setSubPosts(subPostsData);
        setPosts(postsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSubPostClick = () => {
    setIsEditing(false);
    setDialogOpen(true);
    setSubPostName("");
    setSelectedPostId("");
    setErrors({ postId: "", subPostName: "" });
  };

  const handleEditClick = (subPost) => {
    setIsEditing(true);
    setSelectedSubPost(subPost);
    setSubPostName(subPost.subpost_name);
    setSelectedPostId(subPost.post_id);
    setDialogOpen(true);
  };

  const handleDeleteClick = (subPost) => {
    setSubPostToDelete(subPost);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSubPostName("");
    setSelectedPostId("");
    setSelectedSubPost(null);
    setErrors({ postId: "", subPostName: "" });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSubPostToDelete(null);
  };

  const validateFields = () => {
    let valid = true;
    let newErrors = { postId: "", subPostName: "" };

    if (!selectedPostId) {
      newErrors.postId = "Post selection is required.";
      valid = false;
    }
    if (!subPostName) {
      newErrors.subPostName = "Sub Post Name is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      let response;
      const selectedPost = posts.find((post) => post.id === selectedPostId);
      if (!selectedPost) {
        throw new Error("Selected post not found.");
      }
      const { category_id } = selectedPost;

      if (isEditing) {
        response = await updateSubPost(
          selectedSubPost.id,
          selectedPostId,
          category_id,
          subPostName
        );
      } else {
        response = await createSubPost(
          selectedPostId,
          category_id,
          subPostName
        );
      }
      const subPostsData = await getSubPosts();
      setSubPosts(subPostsData);
      handleCloseDialog();
      setNotification({
        open: true,
        message:
          response.message ||
          (isEditing ? "Updated Successfully" : "Added Successfully"),
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
      if (subPostToDelete) {
        const response = await deleteSubPost(subPostToDelete.id);
        const subPostsData = await getSubPosts();
        setSubPosts(subPostsData);
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

  if (loading)
    return (
      <div className="loading-process">
        <CircularProgress />
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ float: "right", marginBottom: "20px" }}>
        <Button variant="contained" onClick={handleAddSubPostClick}>
          Add Sub Post
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Sub Posts
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Sub Post</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subPosts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No Sub Posts Available...</TableCell>
              </TableRow>
            )}
            {subPosts
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((subPost, index) => (
                <TableRow key={subPost.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{subPost.post_name}</TableCell>
                  <TableCell>{subPost.subpost_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(subPost)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(subPost)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Edit Sub Post" : "Add New Sub Post"}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Post"
            value={selectedPostId}
            onChange={(e) => {
              setSelectedPostId(e.target.value);
              setErrors({ ...errors, postId: "" }); // Clear error on change
            }}
            fullWidth
            margin="normal"
            error={!!errors.postId}
            helperText={errors.postId}
          >
            {posts
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((post) => (
                <MenuItem key={post.id} value={post.id}>
                  {post.post_name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            label="Sub Post Name"
            value={subPostName}
            onChange={(e) => {
              setSubPostName(e.target.value);
              setErrors({ ...errors, subPostName: "" }); // Clear error on change
            }}
            fullWidth
            margin="normal"
            error={!!errors.subPostName}
            helperText={errors.subPostName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "save" : "add"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this sub post?
          </Typography>
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

export default SubPost;
