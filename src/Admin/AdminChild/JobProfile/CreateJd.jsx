import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getInterviewSchedule } from "../../Services/AdminServices"; // Update with the correct path

function CreateJd() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const data = await getInterviewSchedule();
        setJobOpenings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  if (loading)
    return (
      <div className="loading-process">
        <div className="inner-loading">
          <CircularProgress />
        </div>
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Error</TableCell>
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
      <Typography variant="h5" gutterBottom>
        Job Description
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Qualification</TableCell>
              <TableCell>Desirables</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobOpenings.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.departments}</TableCell>
                <TableCell>{job.post_applied_for}</TableCell>
                <TableCell>{job.qualification_and_experience}</TableCell>
                <TableCell>{job.highly_desirable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CreateJd;
