import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import {
  updateSection5,
  getSection5Data,
} from "../../../../Services/FrontendServices";
import Notification from "../../../../../Notification/Notification";
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
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Section5() {
  const [boxNo, setBoxNo] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [section5Info, setSection5Info] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    header_1: "",
    header_2: "",
    header_3: "",
    box_content: "",
    bg_col: "",
    image: null,
  });

  const getWordLimits = (boxNo) => {
    switch (boxNo) {
      case "1":
        return {
          header_1: 10,
          box_content: 16,
        };
      case "2":
        return {
          header_1: 10,
          box_content: 10,
        };
      default:
        return {
          header_1: 10,
          box_content: 16,
        };
    }
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  const wordLimits = getWordLimits(boxNo);

  async function fetchSection5Info() {
    try {
      const data = await getSection5Data();
      setSection5Info(data || []);
    } catch (error) {
      console.error("Error fetching Section5 info:", error);
    }
  }

  useEffect(() => {
    fetchSection5Info();
  }, []);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    if (wordLimits[name] !== undefined && wordCount <= wordLimits[name]) {
      setFormData({ ...formData, [name]: value });
    } else {
      setNotificationMessage(
        `Word limit exceeded. Maximum allowed is ${wordLimits[name]} words.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!validFormats.includes(file.type)) {
      setNotificationMessage(
        "Invalid file format. Only JPG, JPEG, and PNG are allowed."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    if (file.size > maxSize) {
      setNotificationMessage(
        "File size exceeds 5 MB. Please upload a smaller image."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    setFormData({ ...formData, image: file });
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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await updateSection5(formDataToSend, boxNo);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setFormData({
        header_1: "",
        header_2: "",
        header_3: "",
        box_content: "",
        bg_col: "",
        image: null,
      });
      setSelectedField("");
      setBoxNo("");
      fetchSection5Info();
      setOpenDialog(false);
    } catch (error) {
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (item) => {
    setBoxNo(item.box_no);
    setFormData({
      header_1: item.header_1 || "",
      header_2: item.header_2 || "",
      header_3: item.header_3 || "",
      box_content: item.box_content || "",
      bg_col: item.bg_col || "",
      image: null,
    });
    setSelectedField("");
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
            <option value="header_1">Heading</option>
            <option value="box_content">Content</option>
          </>
        );
      case 3:
      case 4:
      case 6:
      case 8:
      case 9:
      case 10:
      case 12:
      case 13:
      case 15:
      case 17:
        return (
          <>
            <option value="image">Image</option>
          </>
        );
      case 2:
      case 5:
      case 7:
      case 11:
      case 14:
      case 16:
        return (
          <>
            <option value="box_content">Box Content</option>
            <option value="bg_col">Background Color</option>
          </>
        );
      default:
        return null;
    }
  }
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) return content;

    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Section 5
        </Typography>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Section 5</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Typography variant="body1">Select Field:</Typography>
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

              {selectedField &&
                selectedField !== "bg_col" &&
                selectedField !== "image" && (
                  <div>
                    <Typography variant="body1">{selectedField}:</Typography>
                    <input
                      type="text"
                      id={selectedField}
                      name={selectedField}
                      value={formData[selectedField]}
                      onChange={handleInputChange}
                      style={{ marginBottom: "16px" }}
                    />
                  </div>
                )}

              {selectedField === "bg_col" && (
                <div className="color-picker">
                  <Typography variant="body1">Background Color:</Typography>
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
                  <Typography variant="body1">Image:</Typography>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                    style={{ marginBottom: "16px" }}
                  />
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Heaing</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section5Info.map((item) => (
                <TableRow key={item.box_no}>
                  <TableCell>{item.box_no}</TableCell>
                  <TableCell>{item.header_1}</TableCell>
                  <TableCell>
                    {item.box_img_url && (
                      <>
                        <img
                          src={item.box_img_url}
                          alt={`Box ${item.box_no} Image`}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </>
                    )}
                  </TableCell>
                  <TableCell>{truncateContent(item.box_content, 5)}</TableCell>
                  <TableCell style={{ backgroundColor: item.bg_col }}>
                    {item.bg_col}
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

export default Section5;
