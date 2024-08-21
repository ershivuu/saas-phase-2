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
                  {company}
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
                <TableCell>Last Login</TableCell>
                <TableCell>Last Logout</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log, index) => (
                <TableRow key={log.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{log.company_name}</TableCell>
                  <TableCell>
                    {log.last_login
                      ? new Date(log.last_login).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {log.last_logout
                      ? new Date(log.last_logout).toLocaleString()
                      : "-"}
                  </TableCell>
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
