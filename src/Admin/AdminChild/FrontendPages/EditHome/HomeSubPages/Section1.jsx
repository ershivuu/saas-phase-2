import React, { useState, useEffect } from "react";
import {
  getSection1Data,
  updateSection1Data,
} from "../../../../Services/FrontendServices";
import Notification from "../../../../../Notification/Notification";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Section1() {
  const [section1Data, setSection1Data] = useState({
    selectedHeading: "",
    heading_L1: "",
    heading_L2: "",
    heading_L3: "",
  });
  const [getsection1Data, setGetSection1Data] = useState({});
  const [editData, setEditData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const wordLimits = {
    heading_L1: 5,
    heading_L2: 3,
    heading_L3: 3,
  };
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  async function fetchSection1Data() {
    try {
      const data = await getSection1Data();
      setGetSection1Data(data);
    } catch (error) {
      console.error("Error fetching Section 1 data:", error);
    }
  }

  useEffect(() => {
    fetchSection1Data();
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    if (wordCount <= wordLimits[name]) {
      setSection1Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNotificationMessage(
        `Word limit exceeded for ${name}. Maximum allowed is ${wordLimits[name]} words.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleHeadingSelect = (event) => {
    setSection1Data((prevState) => ({
      ...prevState,
      selectedHeading: event.target.value,
    }));
  };

  const handleSection1Submit = async (e) => {
    e.preventDefault();
    try {
      const section1Response = await updateSection1Data({
        ...section1Data,
        [section1Data.selectedHeading]:
          section1Data[section1Data.selectedHeading],
      });
      console.log("Section 1 data updated successfully:", section1Response);

      setNotificationMessage(section1Response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setSection1Data({
        selectedHeading: "",
        heading_L1: "",
        heading_L2: "",
        heading_L3: "",
      });
      setDialogOpen(false);
      fetchSection1Data();
    } catch (error) {
      console.error("Error updating section 1 data:", error);

      setNotificationMessage(
        "Error updating section 1 data. Please try again."
      );

      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditButtonClick = (rowData) => {
    setEditData(rowData);
    setSection1Data({
      selectedHeading: "",
      heading_L1: rowData.heading_L1,
      heading_L2: rowData.heading_L2,
      heading_L3: rowData.heading_L3,
    });
    setDialogOpen(true);
  };

  const showSubmitButton = section1Data.selectedHeading !== "";

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Section 1
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Heading 1</TableCell>
                <TableCell>Heading 2</TableCell>
                <TableCell>Heading 3</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{getsection1Data.id}</TableCell>
                <TableCell>{getsection1Data.heading_L1}</TableCell>
                <TableCell>{getsection1Data.heading_L2}</TableCell>
                <TableCell>{getsection1Data.heading_L3}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditButtonClick(getsection1Data)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Section 1</DialogTitle>
          <DialogContent>
            <form className="form-control" onSubmit={handleSection1Submit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Select Field"
                  id="headingSelect"
                  value={section1Data.selectedHeading}
                  onChange={handleHeadingSelect}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="heading_L1">Heading 1</MenuItem>
                  <MenuItem value="heading_L2">Heading 2</MenuItem>
                  <MenuItem value="heading_L3">Heading 3</MenuItem>
                </TextField>
              </FormControl>
              {section1Data.selectedHeading && (
                <TextField
                  label={section1Data.selectedHeading}
                  name={section1Data.selectedHeading}
                  value={section1Data[section1Data.selectedHeading]}
                  onChange={handleTextChange}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              {showSubmitButton && (
                <div style={{ marginTop: "20px" }}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default Section1;
