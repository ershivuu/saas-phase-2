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
    setAddDialogOpen(true);
  };

  const handleEditDegreeClick = (degree) => {
    setDegreeName(degree.degree_name);
    setSelectedExamType(degree.exam_type_id);
    setDegreeToEdit(degree);
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

  const handleAddDegreeSubmit = async () => {
    setDialogLoading(true);
    try {
      await createDegree(degreeName, selectedExamType);
      const data = await getDegree(); // Refresh the list of degrees
      setDegrees(data);
      handleCloseAddDialog();
    } catch (error) {
      setError(error.message);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleEditDegreeSubmit = async () => {
    setDialogLoading(true);
    try {
      if (degreeToEdit) {
        await updateDegree(degreeToEdit.id, degreeName, selectedExamType);
        const data = await getDegree(); // Refresh the list of degrees
        setDegrees(data);
        handleCloseEditDialog();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleDeleteDegreeSubmit = async () => {
    setDialogLoading(true);
    try {
      if (degreeToDelete) {
        await deleteDegree(degreeToDelete.id);
        const data = await getDegree(); // Refresh the list of degrees
        setDegrees(data);
        handleCloseDeleteDialog();
      }
    } catch (error) {
      setError(error.message);
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Degree Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          <TextField
            label="Degree Name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Exam Type</InputLabel>
            <Select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              label="Exam Type"
            >
              {examTypes.map((examType) => (
                <MenuItem key={examType.id} value={examType.id}>
                  {examType.exam_type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <TextField
            label="Degree Name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Exam Type</InputLabel>
            <Select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              label="Exam Type"
            >
              {examTypes.map((examType) => (
                <MenuItem key={examType.id} value={examType.id}>
                  {examType.exam_type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    </div>
  );
}

export default CreateDegree;
