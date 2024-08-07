import React, { useState, useEffect } from "react";
import {
  updateInterview,
  getInterviewInfo,
} from "../../../Services/FrontendServices";
import Notification from "../../../../Notification/Notification";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
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
  TextField,
  Button,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";

const EditInterviewSchedule = () => {
  const [interviewInfo, setInterviewInfo] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showImg, setShowImg] = useState({});
  const options = [
    { label: "Select...", value: "" },
    { label: "Heading", value: "banner_header" },
    { label: "Sub Heading", value: "banner_content" },
    { label: "Note", value: "note" },
    { label: "AM Venue", value: "am_venue" },
    { label: "Reporting Time", value: "reporting_time" },
    { label: "Contact Number", value: "contact" },
    { label: "Facilities", value: "facilities" },
    { label: "Offered Package", value: "offered_package" },
    { label: "Background Image", value: "banner_img" },
  ];

  const wordLimits = {
    banner_header: 2,
    banner_content: 10,
    note: 80,
    reporting_time: 80,
    contact: 80,
    facilities: 80,
    am_venue: 80,
    offered_package: 80,
  };

  const defaultOption = options[0].value;
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [formData, setFormData] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [showInput, setShowInput] = useState(false);

  async function interviewScheduleInfo() {
    try {
      const data = await getInterviewInfo();
      console.log("Fetched interview info:", data);
      setInterviewInfo(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching interview info:", error);
    }
  }

  useEffect(() => {
    interviewScheduleInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    if (
      (files &&
        !["image/jpeg", "image/png", "image/jpg"].includes(files[0].type)) ||
      (files && files[0].size > 20 * 1024 * 1024) // 20 MB limit
    ) {
      setNotificationMessage(
        "Invalid file format or size. Please upload a JPG, JPEG, or PNG image within 20 MB."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    if (wordCount <= wordLimits[selectedOption] || files) {
      const newFormData = { ...formData, [name]: files ? files[0] : value };
      console.log("Updated formData:", newFormData);
      setFormData(newFormData);
    } else {
      setNotificationMessage(
        `Word limit exceeded. Maximum allowed is ${wordLimits[selectedOption]} words.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await updateInterview(formDataToSend);
      console.log(response);

      e.target.reset();
      setFormData({});
      setSelectedOption(defaultOption);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setShowInput(false);
      interviewScheduleInfo();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setShowInput(e.target.value !== "");
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setFormData(item);
    setShowInput(true);
    setOpenDialog(true);
    setShowImg(item.banner_img);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Interview Schedule
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Header</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>AM Venue</TableCell>
                <TableCell>Reporting Time</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Facilities</TableCell>
                <TableCell>Offered Package</TableCell>
                <TableCell>Background Image</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviewInfo.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.banner_header}</TableCell>
                  <TableCell>{item.banner_content}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>{item.am_venue}</TableCell>
                  <TableCell>{item.reporting_time}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.facilities}</TableCell>
                  <TableCell>{item.offered_package}</TableCell>
                  <TableCell>
                    {item.banner_img && (
                      <img
                        src={item.banner_img}
                        alt="Section 2 image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">Edit Section 2</DialogTitle>
          <DialogContent>
            <form className="form-control" onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Field</InputLabel>
                <Select
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  label="Select Field"
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {showInput && (
                <>
                  {selectedOption === "banner_img" ? (
                    <div>
                      <InputLabel>
                        {
                          options.find((opt) => opt.value === selectedOption)
                            ?.label
                        }
                        :
                      </InputLabel>
                      <input
                        type="file"
                        name={selectedOption}
                        className="form-control"
                        onChange={handleChange}
                      />
                      <div>
                        Current image:
                        <img
                          src={showImg}
                          alt=""
                          style={{
                            width: "100px",
                            height: "70px",
                            marginTop: "10px",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <TextField
                      fullWidth
                      margin="normal"
                      label={
                        options.find((opt) => opt.value === selectedOption)
                          ?.label
                      }
                      name={selectedOption}
                      onChange={handleChange}
                      value={formData[selectedOption] || ""}
                      placeholder={
                        options.find((opt) => opt.value === selectedOption)
                          ?.label
                      }
                    />
                  )}
                </>
              )}

              {showInput && (
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              )}

              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </form>
          </DialogContent>
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
};

export default EditInterviewSchedule;
