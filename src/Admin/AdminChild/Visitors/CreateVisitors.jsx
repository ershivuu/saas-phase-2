import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllVisitors, deleteVisitor } from "../../Services/AdminServices";

function CreateVisitors() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVisitorsWithRetry = async (retries = 3) => {
    try {
      return await getAllVisitors();
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying fetch... (${retries} retries left)`);
        return fetchVisitorsWithRetry(retries - 1);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    const getVisitors = async () => {
      try {
        setLoading(true);
        const data = await fetchVisitorsWithRetry();
        setVisitors(data);
      } catch (err) {
        console.error("Failed to fetch visitors", err);
        setError("Failed to load visitors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getVisitors();
  }, []);

  const handleClickOpen = (message, name) => {
    setSelectedMessage(message);
    setSelectedName(name);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedMessage("");
    setSelectedName("");
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteVisitor(selectedId);
      setVisitors((prevVisitors) =>
        prevVisitors.filter((visitor) => visitor.id !== selectedId)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Failed to delete visitor", error);
      setError("Failed to delete visitor. Please try again later.");
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Visitors
        </Typography>

        {loading ? (
          <CircularProgress /> // Show loading spinner
        ) : error ? (
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
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
                {visitors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>No visitors available...</TableCell>
                  </TableRow>
                )}
                {visitors
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((visitor, index) => (
                    <TableRow key={visitor.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{visitor.name}</TableCell>
                      <TableCell>{visitor.email}</TableCell>
                      <TableCell>{visitor.phone}</TableCell>
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
        )}

        {/* Full Message Dialog */}
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>{`Message from ${selectedName}`}</DialogTitle>
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
