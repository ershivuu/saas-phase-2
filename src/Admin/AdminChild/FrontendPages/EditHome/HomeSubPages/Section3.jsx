import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import {
  updateSection3,
  getSection3,
} from "../../../../Services/FrontendServices";
import Notification from "../../../../../Notification/Notification";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Section3() {
  const [boxNo, setBoxNo] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [showImg, setShowImg] = useState(null);
  const [section3Info, setSection3Info] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    header_1: "",
    header_2: "",
    header_3: "",
    box_content: "",
    bg_col: "#ffffff",
    box_img: null,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  useEffect(() => {
    fetchSection3Info();
  }, []);

  async function fetchSection3Info() {
    try {
      const data = await getSection3();
      setSection3Info(data);
    } catch (error) {
      console.error("Error fetching Section3 info:", error);
    }
  }

  const handleEditClick = (item) => {
    setBoxNo(item.box_no);
    setFormData({
      header_1: item.header_1 || "",
      header_2: item.header_2 || "",
      header_3: item.header_3 || "",
      box_content: item.box_content || "",
      bg_col: item.bg_col || "#ffffff",
      box_img: null,
    });
    setShowImg(item.box_img_url || null);
    setOpenDialog(true);
  };

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  const handleCloseDialog = () => {
    setSelectedField("");
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("boxNo", boxNo);
      formDataToSend.append(selectedField, formData[selectedField]);

      if (formData.box_img) {
        formDataToSend.append("box_img", formData.box_img);
      }

      const response = await updateSection3(formDataToSend, boxNo);

      setBoxNo("");
      setFormData({
        header_1: "",
        header_2: "",
        header_3: "",
        box_content: "",
        bg_col: "#ffffff",
        box_img: null,
      });
      setSelectedField("");
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchSection3Info();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating data:", error.message);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  function getOptionsForBoxNo(boxNo) {
    switch (boxNo) {
      case 1:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="header_2">Header 2</option>
          </>
        );
      case 2:
      case 4:
      case 5:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="box_content">Box Content</option>
            <option value="bg_col">Background Color</option>
          </>
        );
      case 3:
      case 6:
      case 7:
      case 8:
        return <option value="box_img">Box Image</option>;
      default:
        return null;
    }
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Section 3
        </Typography>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">Edit Section 3</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} fullWidth>
              <Box mb={2}>
                <Typography variant="body1">Select Field:</Typography>
                <TextField
                  select
                  fullWidth
                  margin="dense"
                  SelectProps={{ native: true }}
                  id="selectedField"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  required
                >
                  <MenuItem value="">Select Field</MenuItem>
                  {getOptionsForBoxNo(boxNo)}
                </TextField>
              </Box>

              {selectedField &&
                selectedField !== "bg_col" &&
                selectedField !== "box_img" && (
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      id={selectedField}
                      label={selectedField}
                      value={formData[selectedField]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [selectedField]: e.target.value,
                        })
                      }
                      required
                    />
                  </Box>
                )}

              {selectedField === "bg_col" && (
                <Box mb={2}>
                  <Typography variant="body1">Background Color:</Typography>
                  <Box display="flex" alignItems="center">
                    <ChromePicker
                      color={formData.bg_col}
                      onChange={(color) =>
                        setFormData({ ...formData, bg_col: color.hex })
                      }
                    />
                  </Box>
                </Box>
              )}

              {selectedField === "box_img" && (
                <Box mb={2}>
                  <Typography variant="body1">Image:</Typography>
                  <input
                    type="file"
                    id="box_img"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, box_img: e.target.files[0] })
                    }
                    required
                  />
                  <Box mt={1}>
                    <span>Current image:</span>
                    {showImg && (
                      <img
                        src={showImg}
                        alt="Current box"
                        style={{ width: "100px", height: "70px" }}
                      />
                    )}
                  </Box>
                </Box>
              )}

              {boxNo && (
                <Button variant="contained" color="primary" type="submit">
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
                <TableCell>Box No</TableCell>
                <TableCell>Header 1</TableCell>
                <TableCell>Header 2</TableCell>
                <TableCell>Box Image</TableCell>
                <TableCell>Box Content</TableCell>
                <TableCell>Background Color</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section3Info &&
                section3Info.map((item) => (
                  <TableRow key={item.id}>
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
                    <TableCell>
                      {item && truncateText(item.box_content, 4)}
                    </TableCell>
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
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default Section3;
