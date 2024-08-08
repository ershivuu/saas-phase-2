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
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getDepartment,
} from "../../Services/AdminServices"; // Adjust the path as needed

function CreateSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [editedSubjectName, setEditedSubjectName] = useState("");
  const [editedSelectedDepartment, setEditedSelectedDepartment] = useState("");
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
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

    fetchSubjects();
    fetchDepartments();
    setLoading(false);
  }, []);

  const handleAddSubjectClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSubjectName("");
    setSelectedDepartment("");
    setDepartmentError("");
  };

  const handleAddSubmit = async () => {
    if (!selectedDepartment) {
      setDepartmentError("Please select a department");
      return;
    }
    try {
      await createSubject(subjectName, selectedDepartment);
      const data = await getSubjects(); // Refresh subjects list
      setSubjects(data);
      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (subject) => {
    setEditingSubject(subject);
    setEditedSubjectName(subject.subject_name);
    setEditedSelectedDepartment(subject.department_id);
    setEditDialogOpen(true);
  };

  const handleEditCloseDialog = () => {
    setEditDialogOpen(false);
    setEditingSubject(null);
    setEditedSubjectName("");
    setEditedSelectedDepartment("");
  };

  const handleEditSubmit = async () => {
    if (!editedSelectedDepartment) {
      setDepartmentError("Please select a department");
      return;
    }
    try {
      if (editingSubject) {
        await updateSubject(
          editingSubject.id,
          editedSubjectName,
          editedSelectedDepartment
        );
        const data = await getSubjects(); // Refresh subjects list
        setSubjects(data);
        handleEditCloseDialog();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteClick = (subject) => {
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
    setSubjectToDelete(null);
  };

  const handleDeleteSubmit = async () => {
    try {
      if (subjectToDelete) {
        await deleteSubject(subjectToDelete.id);
        const data = await getSubjects(); // Refresh subjects list
        setSubjects(data);
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
                <TableCell>Subject Name</TableCell>
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
        <Button variant="contained" onClick={handleAddSubjectClick}>
          Add Subject
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Subject
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((subject, index) => (
                <TableRow key={subject.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{subject.department_name}</TableCell>
                  <TableCell>{subject.subject_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(subject)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(subject)}
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
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Department"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setDepartmentError(""); // Clear any previous error
            }}
            fullWidth
            margin="normal"
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.depart_name}
              </MenuItem>
            ))}
          </TextField>
          {departmentError && (
            <Typography color="error" sx={{ padding: "10px" }}>
              {departmentError}
            </Typography>
          )}
          <TextField
            label="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
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

      <Dialog open={editDialogOpen} onClose={handleEditCloseDialog}>
        <DialogTitle>Edit Subject</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Department"
            value={editedSelectedDepartment}
            onChange={(e) => {
              setEditedSelectedDepartment(e.target.value);
              setDepartmentError(""); // Clear any previous error
            }}
            fullWidth
            margin="normal"
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.depart_name}
              </MenuItem>
            ))}
          </TextField>
          {departmentError && (
            <Typography color="error" sx={{ padding: "10px" }}>
              {departmentError}
            </Typography>
          )}
          <TextField
            label="Subject Name"
            value={editedSubjectName}
            onChange={(e) => setEditedSubjectName(e.target.value)}
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

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this subject?</Typography>
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

export default CreateSubjects;
