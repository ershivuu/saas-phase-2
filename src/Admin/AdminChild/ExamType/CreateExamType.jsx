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
} from "@mui/material";
import {
  getExamType,
  createExamType,
  deleteExamType,
  updateExamType,
} from "../../Services/AdminServices"; // Adjust the path as needed

function CreateExamType() {
  const [examTypes, setExamTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examTypeName, setExamTypeName] = useState("");
  const [examTypeToEdit, setExamTypeToEdit] = useState(null);
  const [examTypeToDelete, setExamTypeToDelete] = useState(null);
  const [editedExamTypeName, setEditedExamTypeName] = useState("");

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const data = await getExamType();
        setExamTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamTypes();
  }, []);

  const handleAddExamTypeClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setExamTypeName("");
  };

  const handleAddSubmit = async () => {
    try {
      await createExamType(examTypeName);
      const data = await getExamType(); // Refresh the list of exam types
      setExamTypes(data);
      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (examType) => {
    setExamTypeToEdit(examType);
    setEditedExamTypeName(examType.exam_type_name);
    setEditDialogOpen(true);
  };

  const handleEditCloseDialog = () => {
    setEditDialogOpen(false);
    setExamTypeToEdit(null);
    setEditedExamTypeName("");
  };

  const handleEditSubmit = async () => {
    try {
      if (examTypeToEdit) {
        await updateExamType(examTypeToEdit.id, editedExamTypeName);
        const data = await getExamType(); // Refresh the list of exam types
        setExamTypes(data);
        handleEditCloseDialog();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteClick = (examType) => {
    setExamTypeToDelete(examType);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
    setExamTypeToDelete(null);
  };

  const handleDeleteSubmit = async () => {
    try {
      if (examTypeToDelete) {
        await deleteExamType(examTypeToDelete.id);
        const data = await getExamType(); // Refresh the list of exam types
        setExamTypes(data);
        handleDeleteCloseDialog();
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
                <TableCell>ID</TableCell>
                <TableCell>Exam Type</TableCell>
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
        <Button variant="contained" onClick={handleAddExamTypeClick}>
          Add Exam Type
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Exam Type
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examTypes
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((examType, index) => (
                <TableRow key={examType.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{examType.exam_type_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(examType)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(examType)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Exam Type Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Exam Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Exam Type Name"
            value={examTypeName}
            onChange={(e) => setExamTypeName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Exam Type Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditCloseDialog}>
        <DialogTitle>Edit Exam Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Exam Type Name"
            value={editedExamTypeName}
            onChange={(e) => setEditedExamTypeName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this exam type?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateExamType;
