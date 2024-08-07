import React, { useState, useEffect } from "react";
import {
  updateHeaderLogo,
  updateRibbon,
  getHeaderInfo,
} from "../../../Services/FrontendServices";
import { ChromePicker } from "react-color";
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
  Button,
  MenuItem,
  TextField,
  selectedField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditHeader() {
  const [formData, setFormData] = useState({
    selectedOption: "",
    ribbon_content: "",
    ribbon_bg_col: "#ff0000",
    logo: null,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [headerInfo, setHeaderInfo] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchHeaderInfo() {
    try {
      const data = await getHeaderInfo("getHeaderInfo");
      setHeaderInfo(data);
    } catch (error) {
      console.error("Error fetching header info:", error);
    }
  }
  useEffect(() => {
    fetchHeaderInfo();
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedOption: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setNotificationMessage("File size must be less than 5MB.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setNotificationMessage("Only JPG, JPEG, and PNG formats are allowed.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.selectedOption) {
        setNotificationMessage("Please select an update option.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (formData.selectedOption === "logo" && formData.logo) {
        const logoFormData = new FormData();
        logoFormData.append("image", formData.logo);
        const logoResponse = await updateHeaderLogo(logoFormData);
        setNotificationMessage(logoResponse.message);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setFormData({
          selectedOption: "",
          ribbon_content: "",
          ribbon_bg_col: "#ff0000",
          logo: null,
        });
        handleCloseDialog();
        fetchHeaderInfo();
        return;
      }

      let formDataToSend = {};
      if (formData.selectedOption === "ribbon_content") {
        formDataToSend.ribbon_content = formData.ribbon_content;
      } else if (formData.selectedOption === "ribbon_bg_col") {
        formDataToSend.ribbon_bg_col = formData.ribbon_bg_col;
      }

      if (Object.keys(formDataToSend).length > 0) {
        const ribbonResponse = await updateRibbon(formDataToSend);
        setNotificationMessage(
          ribbonResponse.message || "Error updating header."
        );
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setFormData({
          selectedOption: "",
          ribbon_content: "",
          ribbon_bg_col: "#ff0000",
          logo: null,
        });
        handleCloseDialog();
        fetchHeaderInfo();
      }
    } catch (error) {
      console.error("Error updating header:", error);
      setNotificationMessage("Error updating header.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (row) => {
    setOpenDialog(true);
    setFormData({
      selectedOption: "ribbon_content", // Adjust as needed
      ribbon_content: row.ribbon_content,
      ribbon_bg_col: row.ribbon_bg_col,
      logo: null,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Edit Header
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Ribbon Content</TableCell>
              <TableCell>Ribbon Background Color</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headerInfo && (
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{headerInfo.ribbon_content}</TableCell>
                <TableCell>
                  <div
                    style={{
                      backgroundColor: headerInfo.ribbon_bg_col,
                      width: "50px",
                      height: "30px",
                      textAlign: "center",
                    }}
                  ></div>
                </TableCell>
                <TableCell>
                  {headerInfo.image_url && (
                    <img
                      src={headerInfo.image_url}
                      alt="Section 2 image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(headerInfo)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Header</DialogTitle>
        <DialogContent>
          <form className="form-control" onSubmit={handleSubmit}>
            <div>
              <TextField
                select
                label="Select Field"
                id="selectField"
                name="selectedOption"
                value={formData.selectedOption}
                onChange={handleSelectChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="ribbon_content">Update Ribbon Data</MenuItem>
                <MenuItem value="ribbon_bg_col">Update Ribbon Color</MenuItem>
                <MenuItem value="logo">Update Logo</MenuItem>
              </TextField>
            </div>
            {formData.selectedOption === "ribbon_content" && (
              <div>
                <label htmlFor="ribbon_content">Update Ribbon Data</label>
                <input
                  type="text"
                  id="ribbon_content"
                  name="ribbon_content"
                  placeholder="Update Ribbon Data"
                  aria-label="Ribbon content"
                  value={formData.ribbon_content}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {formData.selectedOption === "ribbon_bg_col" && (
              <div className="color-picker">
                <label htmlFor="ribbon_bg_col">Update Ribbon Color</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ChromePicker
                    color={formData.ribbon_bg_col}
                    onChange={(color) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        ribbon_bg_col: color.hex,
                      }))
                    }
                  />
                </div>
              </div>
            )}
            {formData.selectedOption === "logo" && (
              <div>
                <label htmlFor="logo">Update Logo</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {formData.logo && (
                  <div>
                    Current Image:
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Preview"
                      style={{ width: "100px", height: "70px" }}
                    />
                  </div>
                )}
              </div>
            )}
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditHeader;
