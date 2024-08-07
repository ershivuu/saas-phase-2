import React, { useEffect, useState } from "react";
import {
  getFaqs,
  updateFaq,
  addFaq,
  deleteFaq,
} from "../../../Services/FrontendServices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import Notification from "../../../../Notification/Notification";

export default function FaqSection() {
  const [Id, setId] = useState("");
  const [boxHeading, setBoxHeading] = useState("");
  const [boxContent, setBoxContent] = useState("");
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [faqData, setFaqData] = useState({
    box_heading: "",
    box_content: "",
  });

  const wordLimits = {
    box_heading: 15,
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  const fetchFaqs = async () => {
    try {
      const data = await getFaqs();
      console.log("all FAQ's>>>", data);
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error.message);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "box_heading") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > wordLimits[name]) {
        setNotificationMessage(
          `Word limit of ${wordLimits[name]} exceeded for ${name}`
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }
    }

    setFaqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const response = await addFaq(faqData);
      console.log("FAQ added successfully:", response);

      setFaqData({
        box_heading: "",
        box_content: "",
      });
      fetchFaqs();
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setOpen(false);
    } catch (error) {
      console.error("Error adding FAQ:", error.message);
      setNotificationMessage(error.response?.data?.message || error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleUpdate = (faq) => {
    setId(faq.id);
    setBoxHeading(faq.box_heading);
    setBoxContent(faq.box_content);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const faqData = {
      box_heading: boxHeading,
      box_content: boxContent,
    };
    try {
      const response = await updateFaq(Id, faqData);
      console.log("FAQ updated successfully:", response);
      fetchFaqs();
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setNotificationMessage(error.response?.data?.message || error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteFaq(faqToDelete.id);
      console.log("FAQ deleted successfully:", response);
      fetchFaqs();
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setNotificationMessage(error.response?.data?.message || error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleOpenDeleteDialog = (faq) => {
    setFaqToDelete(faq);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setFaqToDelete(null);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ float: "right", marginBottom: "20px" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add FAQ
          </Button>
        </div>
        <Typography variant="h5" gutterBottom>
          Current Openings
        </Typography>
        <div>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Heading</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faqs.map((faq, index) => (
                  <TableRow key={faq.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{truncateText(faq.box_heading, 5)}</TableCell>
                    <TableCell>{truncateText(faq.box_content, 10)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleUpdate(faq)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleOpenDeleteDialog(faq)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={updateModalOpen}
            onClose={handleCloseUpdateModal}
            PaperProps={{ style: { width: "100%" } }}
          >
            <DialogContent>
              <div className="Faq-heading">
                <p>Edit FAQ</p>
              </div>
              <form className="form-control" onSubmit={handleUpdateForm}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="FAQ Heading"
                  name="box_heading"
                  value={boxHeading}
                  onChange={(e) => setBoxHeading(e.target.value)}
                  placeholder="FAQ Heading"
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="FAQ Content"
                  name="box_content"
                  value={boxContent}
                  onChange={(e) => setBoxContent(e.target.value)}
                  placeholder="FAQ Content"
                  required
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={open}
            onClose={handleCloseModal}
            PaperProps={{ style: { width: "100%" } }}
          >
            <DialogContent>
              <div className="SCA-heading">
                <p>ADD FAQ</p>
              </div>
              <form className="form-control" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="FAQ Heading"
                  name="box_heading"
                  value={faqData.box_heading}
                  onChange={handleChange}
                  placeholder="FAQ Heading"
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="FAQ Content"
                  name="box_content"
                  value={faqData.box_content}
                  onChange={handleChange}
                  placeholder="FAQ Content"
                  required
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this FAQ?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Notification
            open={notificationOpen}
            message={notificationMessage}
            severity={notificationSeverity}
            onClose={handleCloseNotification}
          />
        </div>
      </div>
    </>
  );
}
