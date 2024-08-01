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
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

// Dummy data
const dummyData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    message:
      "Another long message here that will also be truncated. Click to see the full message.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+0987654321",
    message:
      "Another long message here that will also be truncated. Click to see the full message.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "+1122334455",
    message:
      "Another long message here that will also be truncated. Click to see the full message.",
  },
];

function CreateVisitors() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedName, setSelectedName] = useState(""); // New state for visitor name
  const [selectedId, setSelectedId] = useState(null);
  const [visitors, setVisitors] = useState(dummyData);

  const handleClickOpen = (message, name) => {
    setSelectedMessage(message);
    setSelectedName(name); // Set the visitor's name
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedMessage("");
    setSelectedName(""); // Clear the name
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    setVisitors((prevVisitors) =>
      prevVisitors.filter((visitor) => visitor.id !== selectedId)
    );
    handleCloseDeleteDialog();
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Visitors
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitors.map((visitor, index) => (
                <TableRow key={visitor.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.email}</TableCell>
                  <TableCell>{visitor.phoneNumber}</TableCell>
                  <TableCell>
                    {visitor.message.length > 20 ? (
                      <>{visitor.message.substring(0, 20)}...</>
                    ) : (
                      visitor.message
                    )}
                  </TableCell>
                  <TableCell>
                    {visitor.message.length > 20 && (
                      <IconButton
                        onClick={() =>
                          handleClickOpen(visitor.message, visitor.name)
                        }
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteClick(visitor.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Full Message Dialog */}
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>{`Message from ${selectedName}`}</DialogTitle>{" "}
          {/* Updated title */}
          <DialogContent>
            <Typography variant="body1">{selectedMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this visitor?
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

export default CreateVisitors;
