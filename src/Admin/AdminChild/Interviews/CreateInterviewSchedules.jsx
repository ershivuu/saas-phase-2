import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Dummy data
const initialData = [
  {
    id: 1,
    category: "Technical",
    post: "Software Engineer",
    subpost: "Frontend Developer",
    department: "Engineering",
    date1: "2024-08-01",
    date2: "2024-08-05",
    date3: "2024-08-10",
    isActive: true, // Added status field
  },
  {
    id: 2,
    category: "Technical",
    post: "Software Engineer",
    subpost: "Backend Developer",
    department: "Engineering",
    date1: "2024-08-02",
    date2: "2024-08-06",
    date3: "2024-08-11",
    isActive: false, // Added status field
  },
  {
    id: 3,
    category: "HR",
    post: "HR Manager",
    subpost: "Recruiter",
    department: "Human Resources",
    date1: "2024-08-03",
    date2: "2024-08-07",
    date3: "2024-08-12",
    isActive: true, // Added status field
  },
];

function CreateInterviewSchedules() {
  const [data, setData] = useState(initialData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    category: "",
    post: "",
    subpost: "",
    department: "",
    date1: "",
    date2: "",
    date3: "",
    isActive: false,
  });

  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.id !== selectedId));
    handleCloseDeleteDialog();
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setNewSchedule({
      category: "",
      post: "",
      subpost: "",
      department: "",
      date1: "",
      date2: "",
      date3: "",
      isActive: false,
    });
  };

  const handleOpenEditDialog = (item) => {
    setNewSchedule({ ...item });
    setSelectedId(item.id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedId(null);
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSchedule = () => {
    setData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...newSchedule },
    ]);
    handleCloseAddDialog();
  };

  const handleEditSchedule = () => {
    setData((prevData) =>
      prevData.map((item) => (item.id === selectedId ? newSchedule : item))
    );
    handleCloseEditDialog();
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ float: "right", marginBottom: "20px" }}>
          <Button variant="contained" onClick={handleOpenAddDialog}>
            Schedule Interviews
          </Button>
        </div>
        <Typography variant="h4" gutterBottom>
          Interview Schedules
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Subpost</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date 1</TableCell>
                <TableCell>Date 2</TableCell>
                <TableCell>Date 3</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.post}</TableCell>
                  <TableCell>{item.subpost}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.date1}</TableCell>
                  <TableCell>{item.date2}</TableCell>
                  <TableCell>{item.date3}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={item.isActive}
                          onChange={() => {
                            setData((prevData) =>
                              prevData.map((schedule) =>
                                schedule.id === item.id
                                  ? {
                                      ...schedule,
                                      isActive: !schedule.isActive,
                                    }
                                  : schedule
                              )
                            );
                          }}
                        />
                      }
                      label={item.isActive ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenEditDialog(item)}
                      color="primary"
                      disabled={item.isActive} // Disable if active
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(item.id)}
                      color="error"
                      style={{ marginLeft: "10px" }}
                      disabled={item.isActive} // Disable if active
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Schedule Dialog */}
        <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Schedule</DialogTitle>
          <DialogContent>
            <TextField
              label="Category"
              name="category"
              value={newSchedule.category}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Post"
              name="post"
              value={newSchedule.post}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Subpost"
              name="subpost"
              value={newSchedule.subpost}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              name="department"
              value={newSchedule.department}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date 1"
              name="date1"
              type="date"
              value={newSchedule.date1}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date 2"
              name="date2"
              type="date"
              value={newSchedule.date2}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date 3"
              name="date3"
              type="date"
              value={newSchedule.date3}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={newSchedule.isActive}
                  onChange={handleFieldChange}
                />
              }
              label="Active"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddSchedule} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Schedule Dialog */}
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogContent>
            <TextField
              label="Category"
              name="category"
              value={newSchedule.category}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Post"
              name="post"
              value={newSchedule.post}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Subpost"
              name="subpost"
              value={newSchedule.subpost}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              name="department"
              value={newSchedule.department}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date 1"
              name="date1"
              type="date"
              value={newSchedule.date1}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date 2"
              name="date2"
              type="date"
              value={newSchedule.date2}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date 3"
              name="date3"
              type="date"
              value={newSchedule.date3}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={newSchedule.isActive}
                  onChange={handleFieldChange}
                />
              }
              label="Active"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSchedule} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this schedule?
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
    </>
  );
}

export default CreateInterviewSchedules;
