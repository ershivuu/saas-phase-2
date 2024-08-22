// CreatePosts.js
import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../Services/AdminServices";
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
  IconButton,
} from "@mui/material";
import Notification from "../../../Notification/Notification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryNameEdit, setCategoryNameEdit] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newCategoryError, setNewCategoryError] = useState("");
  const [editCategoryError, setEditCategoryError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleOpenEditDialog = (category) => {
    setCategoryToEdit(category.id);
    setCategoryNameEdit(category.category_name);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleOpenDeleteDialog = (categoryId) => {
    setCategoryToDelete(categoryId);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleAddCategory = async () => {
    if (!newCategory) {
      setNewCategoryError("This field is required");
      return;
    }
    try {
      const response = await createCategory(newCategory);
      setNewCategory("");
      handleCloseAddDialog();
      // Optionally refetch categories here
      const data = await getCategories();
      setCategories(data);
      setNotification({
        open: true,
        message: response.message || "Added Successfully",
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

  const handleEditCategory = async () => {
    if (!categoryNameEdit) {
      setEditCategoryError("This field is required");
      return;
    }
    try {
      if (categoryToEdit) {
        const response = await updateCategory(categoryToEdit, categoryNameEdit);
        setCategoryToEdit(null);
        setCategoryNameEdit("");
        handleCloseEditDialog();
        // Optionally refetch categories here
        const data = await getCategories();
        setCategories(data);
        setNotification({
          open: true,
          message: response.message || "Edited Successfully",
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

  const handleDeleteCategory = async () => {
    try {
      if (categoryToDelete) {
        const response = await deleteCategory(categoryToDelete);
        setCategoryToDelete(null);
        handleCloseDeleteDialog();
        // Optionally refetch categories here
        const data = await getCategories();
        setCategories(data);
        // setNotification({
        //   open: true,
        //   message: response.message || "Deleted Successfully",
        //   severity: "success",
        // });
      }
    } catch (error) {
      setError(error.message);
      // setNotification({
      //   open: true,
      //   message: error.message,
      //   severity: "error",
      // });
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
        <Button variant="contained" onClick={handleOpenAddDialog}>
          Add Category
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No categories available...</TableCell>
              </TableRow>
            )}
            {categories
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.category_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditDialog(category)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  {/* <TableCell>
                  {new Date(category.created_at).toLocaleString()}
                </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Category Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              if (e.target.value) setNewCategoryError("");
            }}
            error={!!newCategoryError}
            helperText={newCategoryError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryNameEdit}
            onChange={(e) => {
              setCategoryNameEdit(e.target.value);
              if (e.target.value) setEditCategoryError("");
            }}
            error={!!editCategoryError}
            helperText={editCategoryError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Category Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="secondary">
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

export default CreateCategory;
