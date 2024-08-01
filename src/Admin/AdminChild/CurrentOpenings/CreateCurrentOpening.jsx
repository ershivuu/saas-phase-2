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
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Dummy data
const dummyData = [
  {
    id: 1,
    category: "Software",
    post: "Developer",
    department: "Engineering",
    lastDate: "2024-08-15",
    active: true,
  },
  {
    id: 2,
    category: "Hardware",
    post: "Technician",
    department: "Maintenance",
    lastDate: "2024-09-01",
    active: false,
  },
  {
    id: 3,
    category: "Management",
    post: "Project Manager",
    department: "Operations",
    lastDate: "2024-07-30",
    active: true,
  },
  {
    id: 4,
    category: "Management",
    post: "Project Manager",
    department: "Operations",
    lastDate: "2024-07-30",
    active: true,
  },
  {
    id: 5,
    category: "Management",
    post: "Project Manager",
    department: "Operations",
    lastDate: "2024-07-30",
    active: true,
  },
  {
    id: 6,
    category: "Management",
    post: "Project Manager",
    department: "Operations",
    lastDate: "2024-07-30",
    active: true,
  },
  {
    id: 7,
    category: "Management",
    post: "Project Manager",
    department: "Operations",
    lastDate: "2024-07-30",
    active: true,
  },
];

function CreateCurrentOpening() {
  const [openings, setOpenings] = useState(dummyData);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentOpening, setCurrentOpening] = useState(null);
  const [newOpening, setNewOpening] = useState({
    category: "",
    post: "",
    department: "",
    lastDate: "",
    active: true,
  });

  const handleStatusChange = (id) => {
    setOpenings((prevOpenings) =>
      prevOpenings.map((opening) =>
        opening.id === id ? { ...opening, active: !opening.active } : opening
      )
    );
  };

  const handleEditClick = (opening) => {
    setCurrentOpening(opening);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentOpening(null);
  };

  const handleSaveChanges = () => {
    setOpenings((prevOpenings) =>
      prevOpenings.map((opening) =>
        opening.id === currentOpening.id ? currentOpening : opening
      )
    );
    handleCloseEditDialog();
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentOpening((prevOpening) => ({
      ...prevOpening,
      [name]: value,
    }));
  };

  const handleOpenAddDialog = () => {
    setNewOpening({
      category: "",
      post: "",
      department: "",
      lastDate: "",
      active: true,
    });
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddFieldChange = (e) => {
    const { name, value } = e.target;
    setNewOpening((prevOpening) => ({
      ...prevOpening,
      [name]: value,
    }));
  };

  const handleAddOpening = () => {
    setOpenings((prevOpenings) => [
      ...prevOpenings,
      { id: prevOpenings.length + 1, ...newOpening },
    ]);
    handleCloseAddDialog();
  };

  const handleOpenDeleteDialog = (opening) => {
    setCurrentOpening(opening);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCurrentOpening(null);
  };

  const handleDeleteOpening = () => {
    setOpenings((prevOpenings) =>
      prevOpenings.filter((opening) => opening.id !== currentOpening.id)
    );
    handleCloseDeleteDialog();
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ float: "right", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
        >
          Add New Opening
        </Button>
      </div>
      <Typography variant="h5" gutterBottom>
        Current Openings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Last Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No data available...</TableCell>
              </TableRow>
            ) : (
              openings.map((opening, index) => (
                <TableRow key={opening.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{opening.category}</TableCell>
                  <TableCell>{opening.post}</TableCell>
                  <TableCell>{opening.department}</TableCell>
                  <TableCell>{opening.lastDate}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={opening.active}
                          onChange={() => handleStatusChange(opening.id)}
                        />
                      }
                      label={opening.active ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(opening)}
                      disabled={!opening.active} // Disable if inactive
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(opening)}
                      color="error"
                      disabled={!opening.active} // Disable if inactive
                      style={{ marginLeft: "10px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Opening Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Opening</DialogTitle>
        <DialogContent>
          {currentOpening && (
            <>
              <TextField
                label="Category"
                name="category"
                value={currentOpening.category}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Post"
                name="post"
                value={currentOpening.post}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Department"
                name="department"
                value={currentOpening.department}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Date"
                name="lastDate"
                value={currentOpening.lastDate}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Opening Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Opening</DialogTitle>
        <DialogContent>
          <TextField
            label="Category"
            name="category"
            value={newOpening.category}
            onChange={handleAddFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Post"
            name="post"
            value={newOpening.post}
            onChange={handleAddFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={newOpening.department}
            onChange={handleAddFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Date"
            name="lastDate"
            value={newOpening.lastDate}
            onChange={handleAddFieldChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddOpening} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Opening Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this opening?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteOpening} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCurrentOpening;
