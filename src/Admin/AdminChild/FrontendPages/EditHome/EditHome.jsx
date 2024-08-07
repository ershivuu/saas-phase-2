import React, { useState, useEffect } from "react";
import {
  updateBannerContent,
  updateBannerImage,
  getBannerInfo,
} from "../../../Services/FrontendServices";
import Notification from "../../../../Notification/Notification";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditHome() {
  const [image, setImage] = useState(null);
  const [selectedField, setSelectedField] = useState("BannerHeaderText"); // Default to the first option
  const [textInput, setTextInput] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [bannerInfo, setBannerInfo] = useState({ bannerContent: {} });
  const [showImage, setShowImage] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const characterLimits = {
    BannerHeaderText: 50,
    BannerContentText: 50,
    BannerButtonText: 20,
  };

  async function fetchBannerInfo() {
    try {
      const data = await getBannerInfo();
      setBannerInfo(data);
      if (!selectedField) {
        setSelectedField("BannerHeaderText"); // Ensure default selection
      }
    } catch (error) {
      console.error("Error fetching banner info:", error);
    }
  }

  useEffect(() => {
    fetchBannerInfo();
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      setNotificationMessage(
        "Invalid file type. Only JPG, JPEG, and PNG are allowed."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setImage(null);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setNotificationMessage("File size exceeds 20MB limit.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setImage(null);
      return;
    }

    setImage(file);
  };

  const handleSelectChange = (e) => {
    const newField = e.target.value;
    setSelectedField(newField);
    if (newField === "Update Banner Image") {
      setTextInput("");
    } else {
      setTextInput(bannerInfo.bannerContent[newField] || "");
    }
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;

    if (value.length <= characterLimits[selectedField]) {
      setTextInput(value);
    } else {
      setNotificationMessage(
        `Character limit exceeded. Maximum allowed is ${characterLimits[selectedField]} characters.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedField) {
        setNotificationMessage("Please select a field.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (selectedField !== "Update Banner Image" && !textInput) {
        setNotificationMessage("Please provide input for the selected field.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      let responseMessage = "";
      if (selectedField !== "Update Banner Image") {
        const bannerData = { [selectedField]: textInput };
        const response = await updateBannerContent(bannerData);
        console.log("Banner content updated successfully:", response);
        responseMessage = response.message;
      }

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imageResponse = await updateBannerImage(formData);
        console.log("Banner image updated successfully:", imageResponse);
        responseMessage =
          imageResponse.message || "Image updated successfully.";
      }

      setNotificationMessage(responseMessage);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setImage(null);
      setSelectedField("BannerHeaderText"); // Reset to default
      setTextInput("");
      handleCloseDialog();
      fetchBannerInfo();
    } catch (error) {
      console.error("Error updating banner data:", error);
      setNotificationMessage("Error updating banner data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (row) => {
    console.log(row, "<<<<");
    setBannerInfo(row);
    setShowImage(row.imageUrl);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Home Page
        </Typography>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="edit-home-dialog-title"
          aria-describedby="edit-home-dialog-description"
        >
          <DialogTitle id="edit-home-dialog-title">Edit Home</DialogTitle>
          <DialogContent>
            <form className="form-control" onSubmit={handleBannerSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Select Field"
                  id="selectField"
                  name="selectField"
                  value={selectedField}
                  onChange={handleSelectChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="BannerHeaderText">
                    Banner Header Text
                  </MenuItem>
                  <MenuItem value="BannerContentText">
                    Banner Content Text
                  </MenuItem>
                  <MenuItem value="BannerButtonText">
                    Banner Button Text
                  </MenuItem>
                  <MenuItem value="Update Banner Image">
                    Update Banner Image
                  </MenuItem>
                </TextField>
              </FormControl>

              {selectedField && selectedField !== "Update Banner Image" && (
                <TextField
                  id="textInput"
                  name="textInput"
                  label={`Update ${selectedField}`}
                  placeholder={`Update ${selectedField}`}
                  value={textInput}
                  onChange={handleTextInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              )}

              {selectedField === "Update Banner Image" && (
                <div>
                  <input
                    type="file"
                    id="bannerImage"
                    name="image"
                    style={{ margin: "10px 0" }}
                    onChange={handleImageChange}
                    required
                  />
                  <div>
                    Current image:
                    <img
                      src={showImage}
                      alt="Current Banner"
                      style={{
                        width: "100px",
                        height: "70px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedField && (
                <DialogActions>
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                </DialogActions>
              )}
            </form>
          </DialogContent>
        </Dialog>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Banner Header Text</TableCell>
                <TableCell>Banner Content Text</TableCell>
                <TableCell>Banner Button Text</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  {bannerInfo.bannerContent.BannerHeaderText}
                </TableCell>
                <TableCell>
                  {bannerInfo.bannerContent.BannerContentText}
                </TableCell>
                <TableCell>
                  {bannerInfo.bannerContent.BannerButtonText}
                </TableCell>
                <TableCell>
                  {bannerInfo && bannerInfo.imageUrl && (
                    <img
                      src={bannerInfo.imageUrl}
                      alt="Banner Image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(bannerInfo)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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

export default EditHome;
