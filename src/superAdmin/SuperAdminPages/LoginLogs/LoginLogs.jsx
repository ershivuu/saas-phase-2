import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getLoginLogs } from "../../SuperAdminService"; // Import the function from your service file

function LoginLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    const fetchLoginLogs = async () => {
      try {
        const data = await getLoginLogs();
        setLogs(data);
        setFilteredLogs(data); // Set initial filtered logs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginLogs();
  }, []);

  useEffect(() => {
    if (selectedCompany === "") {
      setFilteredLogs(logs);
    } else {
      const results = logs.filter(
        (log) => log.company_name === selectedCompany
      );
      setFilteredLogs(results);
    }
  }, [selectedCompany, logs]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Subtract 5 hours and 30 minutes
    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);

    // Extracting date parts
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Extracting time parts
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, "0");

    return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <FormControl
          sx={{ m: 1, width: 200, float: "right", marginRight: "20px" }}
        >
          <InputLabel>Company</InputLabel>
          <Select
            value={selectedCompany}
            onChange={handleCompanyChange}
            label="Company"
          >
            <MenuItem value="">All Companies</MenuItem>
            {Array.from(new Set(logs.map((log) => log.company_name))).map(
              (company) => (
                <MenuItem key={company} value={company}>
                  <p style={{ textTransform: "capitalize" }}>{company}</p>
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>

      <div className="pricing-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Last Login (IST)</TableCell>
                <TableCell>Last Logout (IST)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log, index) => (
                <TableRow key={log.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <p style={{ textTransform: "capitalize" }}>
                      {log.company_name}
                    </p>
                  </TableCell>

                  <TableCell>{formatDate(log.last_login)}</TableCell>
                  <TableCell>{formatDate(log.last_logout)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default LoginLogs;
