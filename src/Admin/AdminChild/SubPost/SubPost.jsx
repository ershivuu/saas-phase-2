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
  getSubPosts,
  getPosts,
  createSubPost,
  updateSubPost,
  deleteSubPost,
} from "../../Services/AdminServices";

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
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSubPostToDelete(null);
  };

  const handleSubmit = async () => {
    try {
      const selectedPost = posts.find((post) => post.id === selectedPostId);
      if (!selectedPost) {
        throw new Error("Selected post not found.");
      }
      const { category_id } = selectedPost;

      if (isEditing) {
        await updateSubPost(
          selectedSubPost.id,
          selectedPostId,
          category_id,
          subPostName
        );
      } else {
        await createSubPost(selectedPostId, category_id, subPostName);
      }
      const subPostsData = await getSubPosts();
      setSubPosts(subPostsData);
      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (subPostToDelete) {
        await deleteSubPost(subPostToDelete.id);
        const subPostsData = await getSubPosts();
        setSubPosts(subPostsData);
        handleCloseDeleteDialog();
      }
    } catch (error) {
      setError(error.message);
    }
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
                <TableCell>Post</TableCell>
                <TableCell>Sub Post</TableCell>
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
                <TableCell colSpan={8}>No Sub Posts available...</TableCell>
              </TableRow>
            )}
            {subPosts.map((subPost, index) => (
              <TableRow key={subPost.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{subPost.post_name}</TableCell>
                <TableCell>{subPost.subpost_name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(subPost)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(subPost)}
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
        <DialogTitle>
          {isEditing ? "Edit Sub Post" : "Add New Sub Post"}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Post"
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            fullWidth
            margin="normal"
          >
            {posts.map((post) => (
              <MenuItem key={post.id} value={post.id}>
                {post.post_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Sub Post Name"
            value={subPostName}
            onChange={(e) => setSubPostName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "UPDATE" : "ADD"}
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
    </div>
  );
}

export default SubPost;
