import React, { useState, useEffect } from "react";
import {
  updateSection2Data,
  getSection2Data,
} from "../../../../Services/FrontendServices"; // Update the path as per your file structure
import Notification from "../../../../../Notification/Notification";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Section2() {
  const [section2Info, setSection2Info] = useState();
  const [formData, setFormData] = useState({
    selectedOption: "heading_L1", // Default selected option
    dataInput: "",
    image: null,
  });
  const wordLimits = {
    heading_L1: 3,
    heading_L2: 2,
    section2_box1: 25,
    section2_box2: 25,
    section2_box3: 25,
    section2_box4: 25,
  };
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [openDialog, setOpenDialog] = useState(false);
  const [showImg, setShowImg] = useState({});

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  }

  async function fetchSection2Info() {
    try {
      const data = await getSection2Data();
      setSection2Info(data);
      setShowImg(data.section2_Image_path);
      // Update form data if necessary
      if (data) {
        setFormData({
          ...formData,
          dataInput: data["heading_L1"] || "",
        });
      }
    } catch (error) {
      console.error("Error fetching Section2 info:", error);
    }
  }

  useEffect(() => {
    fetchSection2Info();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "selectedOption") {
      let dataInput = "";
      if (section2Info) {
        dataInput = section2Info[value] || "";
      }
      setFormData({ ...formData, selectedOption: value, dataInput: dataInput });
    } else if (name === "dataInput") {
      const wordCount = value.split(" ").filter((word) => word).length;

      if (wordCount <= wordLimits[formData.selectedOption]) {
        setFormData({ ...formData, dataInput: value });
      } else {
        setNotificationMessage(
          `Word limit exceeded. Maximum allowed is ${
            wordLimits[formData.selectedOption]
          } words.`
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } else if (name === "image") {
      const image = files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInMB = 20;

      if (!validFormats.includes(image.type)) {
        setNotificationMessage(
          "Invalid image format. Only jpg, jpeg, and png are allowed."
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (image.size / 1024 / 1024 > maxSizeInMB) {
        setNotificationMessage("Image size exceeds 20 MB limit.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      setFormData({ ...formData, [name]: image });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataUpload = new FormData();

      // Append selected option data to FormData
      if (formData.selectedOption !== "Update Banner Image") {
        formDataUpload.append("selectedOption", formData.selectedOption);
        formDataUpload.append(formData.selectedOption, formData.dataInput);
      } else {
        formDataUpload.append("selectedOption", "Update Banner Image");
        formDataUpload.append("image", formData.image);
      }

      const response = await updateSection2Data(formDataUpload);
      setFormData({ selectedOption: "", dataInput: "", image: null });

      setNotificationMessage(response.message || "Data updated successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchSection2Info();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating data:", error.message);
      setNotificationMessage("Error updating data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const showSubmitButton = formData.selectedOption !== "";

  const handleEditClick = () => {
    setFormData({
      selectedOption: "heading_L1", // Default selected option
      dataInput: "",
      image: null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Section 2
        </Typography>

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
                <TextField
                  select
                  label="Select Field"
                  id="headingSelect"
                  name="selectedOption"
                  value={formData.selectedOption}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="heading_L1">Heading 1</MenuItem>
                  <MenuItem value="heading_L2">Heading 2</MenuItem>
                  <MenuItem value="section2_box1">Box 1 Content</MenuItem>
                  <MenuItem value="section2_box2">Box 2 Content</MenuItem>
                  <MenuItem value="section2_box3">Box 3 Content</MenuItem>
                  <MenuItem value="section2_box4">Box 4 Content</MenuItem>
                  <MenuItem value="Update Banner Image">
                    Update Banner Image
                  </MenuItem>
                </TextField>
              </FormControl>

              {formData.selectedOption !== "Update Banner Image" &&
                formData.selectedOption && (
                  <TextField
                    fullWidth
                    margin="normal"
                    id="dataInput"
                    name="dataInput"
                    label={formData.selectedOption}
                    value={formData.dataInput}
                    onChange={handleChange}
                    placeholder={`Enter ${formData.selectedOption}`}
                    required
                  />
                )}

              {formData.selectedOption === "Update Banner Image" && (
                <div>
                  <InputLabel htmlFor="image">Upload Banner Image</InputLabel>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                  <div>
                    Current image:{" "}
                    <img
                      src={showImg}
                      alt=""
                      style={{ width: "100px", height: "70px" }}
                    />
                  </div>
                </div>
              )}

              {showSubmitButton && (
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  style={{ marginTop: "16px" }}
                >
                  Submit
                </Button>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Heading 1</TableCell>
                <TableCell>Heading 2</TableCell>
                <TableCell>Box 1 Content</TableCell>
                <TableCell>Box 2 Content</TableCell>
                <TableCell>Box 3 Content</TableCell>
                <TableCell>Box 4 Content</TableCell>
                <TableCell>Background Image</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{section2Info && section2Info.heading_L1}</TableCell>
                <TableCell>{section2Info && section2Info.heading_L2}</TableCell>
                <TableCell>
                  {section2Info && truncateText(section2Info.section2_box1, 2)}
                </TableCell>
                <TableCell>
                  {section2Info && truncateText(section2Info.section2_box2, 2)}
                </TableCell>
                <TableCell>
                  {section2Info && truncateText(section2Info.section2_box3, 2)}
                </TableCell>
                <TableCell>
                  {section2Info && truncateText(section2Info.section2_box4, 2)}
                </TableCell>
                <TableCell>
                  {section2Info && section2Info.section2_Image_path && (
                    <img
                      src={section2Info.section2_Image_path}
                      alt="Section 2 image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Notification
          open={notificationOpen}
          handleClose={handleCloseNotification}
          alertMessage={notificationMessage}
          alertSeverity={notificationSeverity}
        />
      </div>
    </>
  );
}

export default Section2;
