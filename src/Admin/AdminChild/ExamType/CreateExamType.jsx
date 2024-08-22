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
  IconButton,
} from "@mui/material";
import {
  getExamType,
  createExamType,
  deleteExamType,
  updateExamType,
} from "../../Services/AdminServices"; // Adjust the path as needed
import Notification from "../../../Notification/Notification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({
    examTypeName: false,
    editedExamTypeName: false,
  });

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
    setErrors({ ...errors, examTypeName: false });
  };

  const handleAddSubmit = async () => {
    if (examTypeName.trim() === "") {
      setErrors({ ...errors, examTypeName: true });
      return;
    }

    try {
      const response = await createExamType(examTypeName);
      const data = await getExamType(); // Refresh the list of exam types
      setExamTypes(data);
      handleCloseDialog();
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

  const handleEditClick = (examType) => {
    setExamTypeToEdit(examType);
    setEditedExamTypeName(examType.exam_type_name);
    setEditDialogOpen(true);
  };

  const handleEditCloseDialog = () => {
    setEditDialogOpen(false);
    setExamTypeToEdit(null);
    setEditedExamTypeName("");
    setErrors({ ...errors, editedExamTypeName: false });
  };

  const handleEditSubmit = async () => {
    if (editedExamTypeName.trim() === "") {
      setErrors({ ...errors, editedExamTypeName: true });
      return;
    }
    try {
      if (examTypeToEdit) {
        const response = await updateExamType(
          examTypeToEdit.id,
          editedExamTypeName
        );
        const data = await getExamType(); // Refresh the list of exam types
        setExamTypes(data);
        handleEditCloseDialog();
        setNotification({
          open: true,
          message: response.message || "Updated Successfully",
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
        const response = await deleteExamType(examTypeToDelete.id);
        const data = await getExamType(); // Refresh the list of exam types
        setExamTypes(data);
        handleDeleteCloseDialog();
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

  // if (error)
  //   return (
  //     <div style={{ padding: "20px" }}>
  //       <TableContainer component={Paper}>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>ID</TableCell>
  //               <TableCell>Exam Type</TableCell>
  //               <TableCell>Edit</TableCell>
  //               <TableCell>Delete</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             <Typography color="error" sx={{ padding: "10px" }}>
  //               Error: {error}
  //             </Typography>
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </div>
  //   );

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
            {examTypes.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No Exam Types Available...</TableCell>
              </TableRow>
            )}
            {examTypes
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((examType, index) => (
                <TableRow key={examType.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{examType.exam_type_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(examType)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(examType)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
            onChange={(e) => {
              setExamTypeName(e.target.value);
              setErrors({ ...errors, examTypeName: false });
            }}
            fullWidth
            margin="normal"
            error={errors.examTypeName}
            helperText={errors.examTypeName ? "This feild is required" : ""}
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
            onChange={(e) => {
              setEditedExamTypeName(e.target.value);
              setErrors({ ...errors, editedExamTypeName: false });
            }}
            error={errors.editedExamTypeName}
            helperText={
              errors.editedExamTypeName ? "This feild is required" : ""
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            save
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
      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default CreateExamType;
