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
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  getDegree,
  getExamType,
  createDegree,
  updateDegree,
  deleteDegree,
} from "../../Services/AdminServices"; // Adjust the path as needed
import Notification from "../../../Notification/Notification";

function CreateDegree() {
  const [degrees, setDegrees] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [degreeName, setDegreeName] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);
  const [degreeToEdit, setDegreeToEdit] = useState(null);
  const [degreeToDelete, setDegreeToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({
    degreeName: false,
    selectedExamType: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const degreesData = await getDegree();
        setDegrees(degreesData);
        const examTypesData = await getExamType();
        setExamTypes(examTypesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddDegreeClick = () => {
    setDegreeName("");
    setSelectedExamType("");
    setErrors({ degreeName: false, selectedExamType: false });
    setAddDialogOpen(true);
    
  };

  const handleEditDegreeClick = (degree) => {
    setDegreeName(degree.degree_name);
    setSelectedExamType(degree.exam_type_id);
    setDegreeToEdit(degree);
    setErrors({ degreeName: false, selectedExamType: false });
    setEditDialogOpen(true);
    
  };

  const handleDeleteDegreeClick = (degree) => {
    setDegreeToDelete(degree);
    setDeleteDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setDegreeName("");
    setSelectedExamType("");
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setDegreeName("");
    setSelectedExamType("");
    setDegreeToEdit(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDegreeToDelete(null);
  };

  const validateFields = () => {
    const newErrors = {
      degreeName: !degreeName.trim(),
      selectedExamType: !selectedExamType,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddDegreeSubmit = async () => {
    if (!validateFields()) return;
    setDialogLoading(true);
    try {
      const response = await createDegree(degreeName, selectedExamType);
      const data = await getDegree(); // Refresh the list of degrees
      setDegrees(data);
      handleCloseAddDialog();
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
    } finally {
      setDialogLoading(false);
    }
  };

  const handleEditDegreeSubmit = async () => {
    if (!validateFields()) return;
    setDialogLoading(true);
    try {
      if (degreeToEdit) {
        const response = await updateDegree(
          degreeToEdit.id,
          degreeName,
          selectedExamType
        );
        const data = await getDegree(); // Refresh the list of degrees
        setDegrees(data);
        handleCloseEditDialog();
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
    } finally {
      setDialogLoading(false);
    }
  };

  const handleDeleteDegreeSubmit = async () => {
    setDialogLoading(true);
    try {
      if (degreeToDelete) {
        const response = await deleteDegree(degreeToDelete.id);
        const data = await getDegree(); // Refresh the list of degrees
        setDegrees(data);
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
    } finally {
      setDialogLoading(false);
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
                <TableCell>Degree Name</TableCell>
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
        <Button variant="contained" onClick={handleAddDegreeClick}>
          Add Degree
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Degree
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Degree Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {degrees.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No degrees available...</TableCell>
              </TableRow>
            )}
            {degrees.map((degree, index) => (
              <TableRow key={degree.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{degree.exam_type_name}</TableCell>
                <TableCell>{degree.degree_name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditDegreeClick(degree)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteDegreeClick(degree)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Degree Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Degree</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Exam Type</InputLabel>
            <Select
              value={selectedExamType}
              onChange={(e) => {
                setSelectedExamType(e.target.value);
                setErrors({ ...errors, selectedExamType: false });
              }}
              label="Exam Type"
            >
              {examTypes.map((examType) => (
                <MenuItem key={examType.id} value={examType.id}>
                  {examType.exam_type_name}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedExamType && (
              <Typography color="error" variant="body2">
                Exam type is required
              </Typography>
            )}

          </FormControl>
          <TextField
            label="Degree Name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddDegreeSubmit}
            color="primary"
            disabled={dialogLoading}
          >
            {dialogLoading ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Degree Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Degree</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Exam Type</InputLabel>
            <Select
              value={selectedExamType}
              onChange={(e) => {
                setSelectedExamType(e.target.value);
                setErrors({ ...errors, selectedExamType: false });
              }}
              label="Exam Type"
            >
              {examTypes.map((examType) => (
                <MenuItem key={examType.id} value={examType.id}>
                  {examType.exam_type_name}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedExamType && (
              <Typography color="error" variant="body2">
                Exam type is required
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Degree Name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleEditDegreeSubmit}
            color="primary"
            disabled={dialogLoading}
          >
            {dialogLoading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Degree Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the degree{" "}
            <strong>{degreeToDelete?.degree_name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteDegreeSubmit}
            color="error"
            disabled={dialogLoading}
          >
            {dialogLoading ? "Deleting..." : "Delete"}
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

export default CreateDegree;
