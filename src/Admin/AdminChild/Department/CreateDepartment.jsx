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
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment, // Import delete function
} from "../../Services/AdminServices"; // Adjust the path as needed
import Notification from "../../../Notification/Notification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateDepartment() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameError, setDepartmentNameError] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartment();
        setDepartments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleAddDepartmentClick = () => {
    setDialogOpen(true);
  };

  const handleEditClick = (department) => {
    setCurrentDepartmentId(department.id);
    setDepartmentName(department.depart_name);
    setDepartmentNameError("");
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentDepartmentId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setDepartmentName("");
    setDepartmentNameError("");
    setCurrentDepartmentId(null);
  };

  const validateFields = () => {
    let isValid = true;
    if (departmentName.trim() === "") {
      setDepartmentNameError("This feild is required");
      isValid = false;
    } else {
      setDepartmentNameError("");
    }
    return isValid;
  };

  const handleAddSubmit = async () => {
    if (!validateFields()) return;
    try {
      const response = await createDepartment(departmentName);
      const data = await getDepartment();
      setDepartments(data);
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

  const handleEditSubmit = async () => {
    if (!validateFields()) return;
    try {
      if (currentDepartmentId !== null) {
        const response = await updateDepartment(
          currentDepartmentId,
          departmentName
        );
        const data = await getDepartment();
        setDepartments(data);
        handleCloseDialog();
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

  const handleDeleteSubmit = async () => {
    try {
      if (currentDepartmentId !== null) {
        const response = await deleteDepartment(currentDepartmentId);
        const data = await getDepartment();
        setDepartments(data);
        handleCloseDialog();
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

  const handleDepartmentNameChange = (e) => {
    setDepartmentName(e.target.value);
    if (departmentNameError) {
      setDepartmentNameError("");
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
  //               <TableCell>Department Name</TableCell>
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
        <Button variant="contained" onClick={handleAddDepartmentClick}>
          Add Department
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Department
      </Typography>
      <TableContainer component={Paper} className="admin-tables">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No Departments Available...</TableCell>
              </TableRow>
            )}
            {departments
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((department, index) => (
                <TableRow key={department.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{department.depart_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(department)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {/* <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(department.id)}
                    >
                      Delete
                    </Button> */}
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(department.id)}
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
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={handleDepartmentNameChange}
            fullWidth
            margin="normal"
            error={!!departmentNameError}
            helperText={departmentNameError}
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

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            label="Department Name"
            value={departmentName}
            onChange={handleDepartmentNameChange}
            fullWidth
            margin="normal"
            error={!!departmentNameError}
            helperText={departmentNameError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this department?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
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

export default CreateDepartment;
