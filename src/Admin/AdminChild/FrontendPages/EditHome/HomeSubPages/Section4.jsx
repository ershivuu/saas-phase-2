import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import {
  updateSection4,
  getSection4Data,
} from "../../../../Services/FrontendServices";
import Notification from "../../../../../Notification/Notification";
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
  Button,
  Typography,
  IconButton,
} from "@mui/material";

function Section4() {
  const [boxNo, setBoxNo] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [section4Info, setSection4Info] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showImg, setShowImg] = useState("");
  const [formData, setFormData] = useState({
    header_1: "",
    header_2: "",
    header_3: "",
    box_content: "",
    bg_col: "#ffffff",
    image: null,
  });

  const wordLimits = {
    header_1: 2,
    header_2: 4,
    box_content: 4,
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  async function fetchSection4Info() {
    try {
      const data = await getSection4Data();
      setSection4Info(data || []);
    } catch (error) {
      console.error("Error fetching Section4 info:", error);
    }
  }

  useEffect(() => {
    fetchSection4Info();
  }, []);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    if (wordCount <= wordLimits[name]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInBytes = 20 * 1024 * 1024;

      if (!validFormats.includes(file.type)) {
        setNotificationMessage(
          "Invalid file format. Only jpg, jpeg, and png formats are allowed."
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (file.size > maxSizeInBytes) {
        setNotificationMessage("File size exceeds the 20MB limit.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      setFormData({ ...formData, image: file });
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
      const box_no = boxNo;
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await updateSection4(formDataToSend, box_no);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchSection4Info();
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }

    setBoxNo("");
    setSelectedField("");
    setFormData({
      header_1: "",
      header_2: "",
      header_3: "",
      box_content: "",
      bg_col: "#ffffff",
      image: null,
    });
    setOpenDialog(false);
  };

  const handleEditClick = (item) => {
    setBoxNo(item.box_no);
    setFormData({
      header_1: item.header_1 || "",
      header_2: item.header_2 || "",
      header_3: item.header_3 || "",
      box_content: item.box_content || "",
      bg_col: item.bg_col || "#ffffff",
      image: null,
    });
    setShowImg(item.box_img_url || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedField("");
    setOpenDialog(false);
  };

  function getOptionsForBoxNo(boxNo) {
    switch (boxNo) {
      case 1:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="header_2">Header 2</option>
            <option value="image">Image</option>
          </>
        );
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <>
            <option value="box_content">Box Content</option>
            <option value="image">Image</option>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Section 4
        </Typography>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Section 4</DialogTitle>
          <DialogContent>
            <form className="form-control" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="selectedField">Select Field:</label>
                <select
                  className="form-select"
                  id="selectedField"
                  value={selectedField}
                  onChange={(e) => handleFieldSelect(e.target.value)}
                  required
                >
                  <option value="">Select Field</option>
                  {getOptionsForBoxNo(boxNo)}
                </select>
              </div>

              {selectedField &&
                selectedField !== "bg_col" &&
                selectedField !== "image" && (
                  <div>
                    <label htmlFor={selectedField}>{selectedField}:</label>
                    <input
                      type="text"
                      id={selectedField}
                      name={selectedField}
                      value={formData[selectedField]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

              {selectedField === "bg_col" && (
                <div className="color-picker">
                  <label htmlFor="bg_col">Background Color:</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ChromePicker
                      color={formData.bg_col}
                      onChange={(color) =>
                        setFormData({ ...formData, bg_col: color.hex })
                      }
                    />
                  </div>
                </div>
              )}

              {selectedField === "image" && (
                <div>
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                  {showImg && (
                    <div>
                      <span>Current image:</span>
                      <img
                        src={showImg}
                        alt="Current"
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
                {boxNo && (
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                )}
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Box No</TableCell>
                <TableCell>Header 1</TableCell>
                <TableCell>Header 2</TableCell>
                <TableCell>Box Image</TableCell>
                <TableCell>Box Content</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section4Info &&
                section4Info.map((item) => (
                  <TableRow key={item.box_no}>
                    <TableCell>{item.box_no}</TableCell>
                    <TableCell>{item.header_1}</TableCell>
                    <TableCell>{item.header_2}</TableCell>
                    <TableCell>
                      {item.box_img_url && (
                        <img
                          src={item.box_img_url}
                          alt={`Box ${item.box_no} Image`}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{item.box_content}</TableCell>
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

export default Section4;
