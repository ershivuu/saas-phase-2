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
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getDepartment,
} from "../../Services/AdminServices"; // Adjust the path as needed
import Notification from "../../../Notification/Notification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectNameError, setSubjectNameError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [editedSubjectName, setEditedSubjectName] = useState("");
  const [editedSelectedDepartment, setEditedSelectedDepartment] = useState("");
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    setSubjectNameError("");
  };

  const handleAddSubmit = async () => {
    if (!subjectName) {
      setSubjectNameError("This field is required");
    }
    if (!selectedDepartment) {
      setDepartmentError("Please select a department");
    }
    if (!subjectName || !selectedDepartment) {
      return;
    }
    try {
      const response = await createSubject(subjectName, selectedDepartment);
      const data = await getSubjects(); // Refresh subjects list
      setSubjects(data);
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
    setSubjectNameError("");
  };

  const handleEditSubmit = async () => {
    if (!editedSubjectName) {
      setSubjectNameError("This field is required");
    }
    if (!editedSelectedDepartment) {
      setDepartmentError("Please select a department");
    }
    if (!editedSubjectName || !editedSelectedDepartment) {
      return;
    }
    try {
      if (editingSubject) {
        const response = await updateSubject(
          editingSubject.id,
          editedSubjectName,
          editedSelectedDepartment
        );
        const data = await getSubjects(); // Refresh subjects list
        setSubjects(data);
        handleEditCloseDialog();
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
        const response = await deleteSubject(subjectToDelete.id);
        const data = await getSubjects(); // Refresh subjects list
        setSubjects(data);
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
  //               <TableCell>Subject Name</TableCell>
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
            {subjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No Subjects Available...</TableCell>
              </TableRow>
            )}
            {subjects
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((subject, index) => (
                <TableRow key={subject.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{subject.department_name}</TableCell>
                  <TableCell>{subject.subject_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(subject)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(subject)}
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
            error={Boolean(departmentError)}
            helperText={departmentError}
          >
            {departments
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((department) => (
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
            onChange={(e) => {
              setSubjectName(e.target.value);
              setSubjectNameError(""); // Clear any previous error
            }}
            fullWidth
            margin="normal"
            error={Boolean(subjectNameError)}
            helperText={subjectNameError}
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
            error={Boolean(departmentError)}
            helperText={departmentError}
          >
            {departments
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((department) => (
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
            onChange={(e) => {
              setEditedSubjectName(e.target.value);
              setSubjectNameError(""); // Clear any previous error
            }}
            fullWidth
            margin="normal"
            error={Boolean(subjectNameError)}
            helperText={subjectNameError}
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
      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default CreateSubjects;
