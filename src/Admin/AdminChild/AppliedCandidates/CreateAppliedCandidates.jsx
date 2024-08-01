import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DeleteIcon from "@mui/icons-material/Delete";

// Dummy data
const initialData = [
  {
    id: 8,
    email: "amber3@gmail.com",
    phone_number: "4521365890",
    first_name: "Amber",
    last_name: "Desai",
    date_of_birth: "2001-01-08T00:00:00.000Z",
    gender: "male",
    title: "Mr",
    specialization: "Software Engineering",
    nature_of_job: "Full-time",
    current_address: "123 Main St, Indore, India",
    alternate_contact_number: "9876543210",
    country: "India",
    city: "Indore",
    pin_code: "452001",
    current_organization: "Cview Survey",
    current_designation: "Developer",
    current_salary: "25000.00",
    resumePath: "http://192.168.25.8:5000/uploads/CV_Sample-1722431609227.pdf",
  },
  // Add more objects here as needed
];

function CreateAppliedCandidates() {
  const [open, setOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [data, setData] = useState(initialData);

  const handleClickOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpen(true);
  };

  const handleResumeClick = (candidate) => {
    setSelectedCandidate(candidate);
    setResumeDialogOpen(true);
  };

  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setConfirmationDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResumeDialogOpen(false);
    setConfirmationDialogOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (selectedCandidate && selectedCandidate.resumePath) {
      window.location.href = selectedCandidate.resumePath;
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCandidate) {
      setData(data.filter((item) => item.id !== selectedCandidate.id));
      handleClose();
    }
  };

  return (
    <>
      <div style={{ padding: "20px", textTransform: "capitalize" }}>
        <Typography variant="h5" gutterBottom>
          Applied Candidates
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>No candidates available...</TableCell>
                </TableRow>
              )}
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>
                    <p style={{ textTransform: "lowercase" }}>{row.email}</p>
                  </TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>
                    {new Date(row.date_of_birth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleResumeClick(row)}
                    >
                      <FileOpenIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleClickOpen(row)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteClick(row)}
                      color="error"
                      style={{ marginLeft: "10px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedCandidate && (
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Candidate Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Basic Information</Typography>
                  <Typography variant="body1">
                    <strong>Full Name:</strong>{" "}
                    {`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {selectedCandidate.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone Number:</strong>{" "}
                    {selectedCandidate.phone_number}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(
                      selectedCandidate.date_of_birth
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {selectedCandidate.gender}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Additional Information</Typography>
                  <Typography variant="body1">
                    <strong>Title:</strong> {selectedCandidate.title}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Specialization:</strong>{" "}
                    {selectedCandidate.specialization}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nature of Job:</strong>{" "}
                    {selectedCandidate.nature_of_job}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Address:</strong>{" "}
                    {selectedCandidate.current_address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Alternate Contact Number:</strong>{" "}
                    {selectedCandidate.alternate_contact_number}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Country:</strong> {selectedCandidate.country}
                  </Typography>
                  <Typography variant="body1">
                    <strong>City:</strong> {selectedCandidate.city}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Pin Code:</strong> {selectedCandidate.pin_code}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Organization:</strong>{" "}
                    {selectedCandidate.current_organization}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Designation:</strong>{" "}
                    {selectedCandidate.current_designation}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Salary:</strong>{" "}
                    {selectedCandidate.current_salary}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {selectedCandidate && (
          <Dialog
            open={resumeDialogOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Applicant Resume</DialogTitle>
            <DialogContent>
              <iframe
                src={selectedCandidate.resumePath}
                style={{ width: "100%", height: "600px" }}
                title="Resume"
              />
            </DialogContent>
          </Dialog>
        )}

        {selectedCandidate && (
          <Dialog
            open={confirmationDialogOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete the record of{" "}
                {`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}
                ?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default CreateAppliedCandidates;
