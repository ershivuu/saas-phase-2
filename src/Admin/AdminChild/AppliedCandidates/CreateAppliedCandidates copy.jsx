import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllApplicants } from "../../Services/AdminServices";

function CreateAppliedCandidates() {
  const [open, setOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const applicants = await getAllApplicants();
        setData(applicants);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchData();
  }, []);

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
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Specialization</TableCell>
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
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>
                    <p style={{ textTransform: "lowercase" }}>{row.email}</p>
                  </TableCell>
                  <TableCell>{row.phone_number}</TableCell>

                  <TableCell>{row.category_of_appointment}</TableCell>
                  <TableCell>{row.post_applied_for}</TableCell>
                  <TableCell>{row.specialization || "-"}</TableCell>
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
            <DialogTitle>
              <Typography
                style={{ textTransform: "capitalize", fontSize: "20px" }}
              >
                {`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}
              </Typography>
            </DialogTitle>
            <DialogContent>
              {/* Personal Information Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong>Personal Information</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Name:</strong>{" "}
                    {`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {`${selectedCandidate.email}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Number:</strong>
                    {`${selectedCandidate.phone_number}`}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>DOB :</strong>
                    {`${new Date(
                      selectedCandidate.date_of_birth
                    ).toLocaleDateString()}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Gender:</strong> {`${selectedCandidate.gender}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Country:</strong> {`${selectedCandidate.country}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>City:</strong> {`${selectedCandidate.city}`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Job Application Information Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong>Job Application Information</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Post Applied For:</strong>{" "}
                    {`${selectedCandidate.post_applied_for}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Sub Post Applied For:</strong>{" "}
                    {`${selectedCandidate.sub_post_applied_for}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Category of Appointment:</strong>{" "}
                    {`${selectedCandidate.category_of_appointment}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Subject:</strong> {`${selectedCandidate.subject}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Exam Type:</strong>{" "}
                    {`${selectedCandidate.exam_type}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Degree:</strong> {`${selectedCandidate.degree}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Qualification Status:</strong>{" "}
                    {`${selectedCandidate.qualification_status}`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Experience and Research Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong>Experience and Research</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Total Experience:</strong>{" "}
                    {`${selectedCandidate.total_experience} years`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Total Research Experience:</strong>{" "}
                    {`${selectedCandidate.total_research} years`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Total Industry Experience:</strong>{" "}
                    {`${selectedCandidate.total_industry} years`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Current Employment Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong>Current Employment</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Current Organization:</strong>{" "}
                    {`${selectedCandidate.current_organization}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Current Designation:</strong>{" "}
                    {`${selectedCandidate.current_designation}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Current Salary:</strong>{" "}
                    {`${selectedCandidate.current_salary}`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Benefits Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong> Benefits</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Accommodation Benefits:</strong>{" "}
                    {`${
                      selectedCandidate.accommodation_benefits || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Transportation Benefits:</strong>{" "}
                    {`${
                      selectedCandidate.transportation_benefits ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Food Benefits:</strong>{" "}
                    {`${selectedCandidate.food_benefits || "Not Provided"}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Mediclaim Benefits:</strong>{" "}
                    {`${
                      selectedCandidate.mediclaim_benefits || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Others Benefits:</strong>{" "}
                    {`${selectedCandidate.others_benefits || "Not Provided"}`}
                  </Typography>
                </Grid>
              </Grid>

              {/* References Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong>References</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>First Reference Name:</strong>{" "}
                    {`${
                      selectedCandidate.first_reference_name || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>First Reference Organization:</strong>{" "}
                    {`${
                      selectedCandidate.first_reference_organization ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>First Reference Position:</strong>{" "}
                    {`${
                      selectedCandidate.first_reference_position ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>First Reference Email:</strong>{" "}
                    {`${
                      selectedCandidate.first_reference_email || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>First Reference Contact:</strong>{" "}
                    {`${
                      selectedCandidate.first_reference_contact ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Second Reference Name:</strong>{" "}
                    {`${
                      selectedCandidate.second_reference_name || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Second Reference Organization:</strong>{" "}
                    {`${
                      selectedCandidate.second_reference_organization ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Second Reference Position:</strong>{" "}
                    {`${
                      selectedCandidate.second_reference_position ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Second Reference Email:</strong>{" "}
                    {`${
                      selectedCandidate.second_reference_email || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Second Reference Contact:</strong>{" "}
                    {`${
                      selectedCandidate.second_reference_contact ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Additional Information Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ borderBottom: "2px solid black" }}
              >
                <strong> Additional Information</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Awards/Recognitions:</strong>{" "}
                    {`${
                      selectedCandidate.awards_recognitions || "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Co-Curricular/Extra-Curricular Activities:</strong>{" "}
                    {`${
                      selectedCandidate.co_curricular_extra_curricular ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Other Relevant Information:</strong>{" "}
                    {`${
                      selectedCandidate.other_relevant_information ||
                      "Not Provided"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Period for Joining:</strong>{" "}
                    {`${
                      selectedCandidate.period_for_joining || "Not Provided"
                    }`}
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
