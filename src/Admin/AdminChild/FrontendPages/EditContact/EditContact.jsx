import React, { useState, useEffect } from "react";
import {
  updateContact,
  getContactUs,
} from "../../../Services/FrontendServices";
import { ChromePicker } from "react-color";
import Notification from "../../../../Notification/Notification";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

function EditContact() {
  const g_map_url =
    "https://www.google.com/maps/place/India/@23.5164343,73.3016972,4.87z/data=!4m6!3m5!1s0x30635ff06b92b791:0xd78c4fa1854213a6!8m2!3d20.593684!4d78.96288!16zL20vMDNyazA?authuser=0&entry=ttu";
  const [formData, setFormData] = useState({
    field: "",
    value: "",
  });
  const [color, setColor] = useState("#ffffff");
  const [showInput, setShowInput] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [contactInfo, setContactInfo] = useState([]);

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }
  const fetchContactInfo = async () => {
    try {
      const data = await getContactUs();
      console.log("Fetched contact info:", data);
      if (data && Array.isArray(data.data)) {
        setContactInfo(data.data);
      } else {
        console.error("Invalid contact info data format:", data);
      }
    } catch (error) {
      console.error("Error fetching Contact info:", error);
    }
  };
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowInput(value !== "");
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    setFormData((prevData) => ({
      ...prevData,
      value: color.hex,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateContact({
        [formData.field]: formData.value,
      });
      console.log("Contact data updated:", response.data);
      setShowInput(false);
      setFormData({ field: "", value: "" });

      setNotificationMessage(response.message || "Data updated successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchContactInfo();
    } catch (error) {
      console.error("Error updating contact data:", error);
      setNotificationMessage("Error updating data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Contact Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              margin="dense"
              label="Select a field"
              name="field"
              select
              fullWidth
              value={formData.field}
              onChange={handleChange}
            >
              <MenuItem value="">Select a field</MenuItem>
              <MenuItem value="contact_1">Contact 1</MenuItem>
              <MenuItem value="contact_2">Contact 2</MenuItem>
              <MenuItem value="contact_3">Contact 3</MenuItem>
              <MenuItem value="contact_4">Contact 4</MenuItem>
              <MenuItem value="contact_email_1">Contact Email 1</MenuItem>
              <MenuItem value="contact_email_2">Contact Email 2</MenuItem>
              <MenuItem value="contact_add">Contact Address</MenuItem>
              <MenuItem value="box_col">Box Color</MenuItem>
              <MenuItem value="map_url">Map URL</MenuItem>
            </TextField>
          </FormControl>
          {formData.field === "box_col" && showInput && (
            <div style={{ margin: "16px 0" }}>
              <Typography variant="body1">Choose a color:</Typography>
              <ChromePicker color={color} onChange={handleColorChange} />
            </div>
          )}
          {formData.field !== "box_col" && showInput && (
            <TextField
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder={`Enter value for ${formData.field}`}
              fullWidth
              margin="normal"
            />
          )}
          {formData.field === "map_url" && (
            <div style={{ color: "red", marginTop: "5px" }}>
              <Typography variant="body2">
                Note: Steps to update Google Map :
              </Typography>
              <ol>
                <li>
                  Go to Google Maps.
                  <Button
                    component="a"
                    href={g_map_url}
                    target="_blank"
                    variant="outlined"
                    style={{ marginLeft: "8px" }}
                  >
                    Google Map
                  </Button>
                </li>
                <li>
                  Select the location, press the "Share" button, generate the
                  embed code, and then copy the URL to the "src" section.
                </li>
                <li>Paste the copied "URL" and submit.</li>
              </ol>
            </div>
          )}
          {formData.field && showInput && (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          )}
        </form>

        <Typography variant="h6" gutterBottom style={{ marginTop: "32px" }}>
          Current Status
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Contact 1</TableCell>
                <TableCell>Contact 2</TableCell>
                <TableCell>Contact 3</TableCell>
                <TableCell>Contact 4</TableCell>
                <TableCell>Contact Email 1</TableCell>
                <TableCell>Contact Email 2</TableCell>
                <TableCell>Contact Address</TableCell>
                <TableCell>Box Color</TableCell>
                <TableCell>Map URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactInfo.map((contact, index) => (
                <TableRow key={contact.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{contact.contact_1}</TableCell>
                  <TableCell>{contact.contact_2}</TableCell>
                  <TableCell>{contact.contact_3}</TableCell>
                  <TableCell>{contact.contact_4}</TableCell>
                  <TableCell>
                    {contact && truncateText(contact.contact_email_1, 3)}
                  </TableCell>
                  <TableCell>
                    {contact && truncateText(contact.contact_email_2, 3)}
                  </TableCell>
                  <TableCell>
                    {contact && truncateText(contact.contact_add, 3)}
                  </TableCell>
                  <TableCell style={{ backgroundColor: contact.box_col }}>
                    {contact.box_col}
                  </TableCell>
                  <TableCell>
                    <a
                      href={contact.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map URL
                    </a>
                  </TableCell>
                </TableRow>
              ))}
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

export default EditContact;
