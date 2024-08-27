import React, { useEffect, useState } from "react";
import { getJobOpenings } from "../userServices/userServices";
import { verifySlug, getUniqueSlug } from "../../slugs/getSlug"; // import to verify the user slugs
import Footers from "../../components/Footer/Footers";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

function Openings() {
  /*
    compulsory in every page 
    verify the slug in every page and store and modify the slug in local storage
   */
  useEffect(() => {
    verifySlug();
  }, []);
  const slug = getUniqueSlug();
  // -----------------------------------------------------------------------------------
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const data = await getJobOpenings();
        setJobOpenings(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  if (loading)
    return (
      <div className="loading-process">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "auto",
          marginTop: "150px",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Departments</TableCell>
                <TableCell>Apply Now</TableCell>
                <TableCell>Last Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={7} style={{ color: "red" }}>
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : jobOpenings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    style={{ color: "red", fontSize: "18px" }}
                  >
                    No openings available...
                  </TableCell>
                </TableRow>
              ) : (
                jobOpenings.map((opening, index) => (
                  <TableRow key={opening.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{opening.category_of_appointment}</TableCell>
                    <TableCell>{opening.post_applied_for}</TableCell>
                    <TableCell>{opening.departments}</TableCell>
                    <TableCell>
                      <Link to={`/${slug}/apply-now`}>
                        <Button variant="outlined">Apply Now</Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        opening.last_date_to_apply
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footers />
    </>
  );
}

export default Openings;
