import React, { useState, useEffect } from "react";
import { updateFooter, getFooter } from "../../../Services/FrontendServices";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditFooter() {
  const options = [
    { label: "Select Field", value: "" },
    { label: "Footer Logo", value: "footer_logo" },
    { label: "Contact Address", value: "contact_address" },
    { label: "Contact Email", value: "contact_email" },
    { label: "Contact 1", value: "contact_1" },
    { label: "Contact 2", value: "contact_2" },
    { label: "Logo 1", value: "img_link_1" },
    { label: "Link 1", value: "link_1" },
    { label: "Logo 2", value: "img_link_2" },
    { label: "Link 2", value: "link_2" },
    { label: "Logo 3", value: "img_link_3" },
    { label: "Link 3", value: "link_3" },
    { label: "Logo 4", value: "img_link_4" },
    { label: "Link 4", value: "link_4" },
    { label: "Footer Color", value: "footer_col" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [footerInfo, setFooterInfo] = useState([]);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const truncateUrl = (url, maxLength) => {
    return url.length > maxLength
      ? url.substring(0, maxLength - 3) + "..."
      : url;
  };

  const fetchFooterInfo = async () => {
    try {
      const data = await getFooter();
      if (data && Array.isArray(data)) {
        setFooterInfo(data);
      } else {
        console.error("Invalid footer info data format:", data);
      }
    } catch (error) {
      console.error("Error fetching footer info:", error);
    }
  };

  useEffect(() => {
    fetchFooterInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 5 * 1024 * 1024;

    if (file && allowedTypes.includes(file.type)) {
      if (file.size <= maxFileSize) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      } else {
        setNotificationMessage("File size should be less than 5MB.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } else {
      setNotificationMessage("Only JPEG, JPG, and PNG files are allowed.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOption) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await updateFooter(formDataToSend);
        setNotificationMessage(response.message || "Data updated successfully");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setOpenDialog(false);
        fetchFooterInfo();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage("Error updating data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData((prevData) => ({ ...prevData, [e.target.value]: "" }));
  };

  const showSubmitButton = selectedOption !== "";

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleEditClick = (item) => {
    if (item && item.type) {
      setSelectedOption(item.type);
      setFormData((prevData) => ({
        ...prevData,
        [item.type]: item[item.type] || "",
      }));
      setOpenDialog(true);
    } else {
      console.error("Invalid item data:", item);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Edit Footer
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact 1</TableCell>
                <TableCell>Contact 2</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {footerInfo.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.box_no}</TableCell>
                  <TableCell>{item.footer_col}</TableCell>
                  <TableCell>
                    {item.footer_logo_url && (
                      <img
                        src={item.footer_logo_url}
                        alt="Footer Logo"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          backgroundColor: item.footer_col,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{truncateText(item.contact_address, 3)}</TableCell>
                  <TableCell>{item.contact_email}</TableCell>
                  <TableCell>{item.contact_1}</TableCell>
                  <TableCell>{item.contact_2}</TableCell>
                  <TableCell>
                    {item.img_link_1_url && (
                      <img
                        src={item.img_link_1_url}
                        alt="Image Link 1"
                        style={{
                          maxWidth: "25px",
                          maxHeight: "25px",
                          backgroundColor: item.footer_col,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{truncateUrl(item.link_1, 20)}</TableCell>
                  <TableCell>
                    {item.img_link_2_url && (
                      <img
                        src={item.img_link_2_url}
                        alt="Image Link 2"
                        style={{
                          maxWidth: "25px",
                          maxHeight: "25px",
                          backgroundColor: item.footer_col,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{truncateUrl(item.link_2, 20)}</TableCell>
                  <TableCell>
                    {item.img_link_3_url && (
                      <img
                        src={item.img_link_3_url}
                        alt="Image Link 3"
                        style={{
                          maxWidth: "25px",
                          maxHeight: "25px",
                          backgroundColor: item.footer_col,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{truncateUrl(item.link_3, 20)}</TableCell>
                  <TableCell>
                    {item.img_link_4_url && (
                      <img
                        src={item.img_link_4_url}
                        alt="Image Link 4"
                        style={{
                          maxWidth: "25px",
                          maxHeight: "25px",
                          backgroundColor: item.footer_col,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{truncateUrl(item.link_4, 20)}</TableCell>
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
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Section</DialogTitle>
          <DialogContent>
            <form className="form-control" onSubmit={handleSubmit}>
              <div>
                <label>Select Field:</label>
                <select
                  value={selectedOption}
                  className="form-select"
                  onChange={handleDropdownChange}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {selectedOption && (
                <>
                  {selectedOption === "footer_logo" ||
                  selectedOption === "img_link_1" ||
                  selectedOption === "img_link_2" ||
                  selectedOption === "img_link_3" ||
                  selectedOption === "img_link_4" ? (
                    <div>
                      <label>
                        {
                          options.find((opt) => opt.value === selectedOption)
                            ?.label
                        }
                        :
                      </label>
                      <input
                        type="file"
                        name={selectedOption}
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <label>
                        {
                          options.find((opt) => opt.value === selectedOption)
                            ?.label
                        }
                        :
                      </label>
                      <input
                        type={selectedOption === "footer_col" ? "text" : "file"}
                        name={selectedOption}
                        className="form-control"
                        onChange={
                          selectedOption === "footer_col"
                            ? handleChange
                            : handleFileChange
                        }
                        value={formData[selectedOption] || ""}
                        placeholder={
                          options.find((opt) => opt.value === selectedOption)
                            ?.label
                        }
                      />
                    </div>
                  )}

                  {selectedOption === "footer_col" && (
                    <div>
                      <label>Footer Color:</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ChromePicker
                          color={formData.footer_col || "#000000"}
                          onChange={(color) =>
                            setFormData({
                              ...formData,
                              footer_col: color.hex,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                {showSubmitButton && (
                  <div>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="default">
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

export default EditFooter;
