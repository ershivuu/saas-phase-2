import React, { useEffect, useState } from "react";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
import { delteFaq, getFaqs } from "../../../AdminFrontend/FrontendServices";
import "./FaqSection.css";

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { addFaq } from "../../FrontendServices";
import Notification from "../../../Notification/Notification";
import { updateFaq } from "../../FrontendServices";
export default function FaqSection() {
  const [Id, setId] = useState("");
  const [boxHeading, setBoxHeading] = useState("");
  const [boxContent, setBoxContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const [faqs, setFaqs] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setfaqToDelete] = useState(null);
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

  const handleDelete = async (FaqId) => {
    setfaqToDelete(FaqId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await delteFaq(faqToDelete);
      setFaqs((prevData) => prevData.filter((faq) => faq.id !== faqToDelete));
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Department:", error);
      setNotificationMessage("Failed to delete Department. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <>
      <div className="admin-list">
        <div className="add-faq-btn">
          <button onClick={() => setOpen(true)}>Add faq</button>
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
                <div>
                  <label htmlFor="box_heading">FAQ Heading</label>
                  <input
                    type="text"
                    id="box_heading"
                    name="box_heading"
                    onChange={handleChange}
                    placeholder="FAQ Heading"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="box_content">FAQ Content</label>
                  <input
                    type="text"
                    id="box_content"
                    name="box_content"
                    onChange={handleChange}
                    placeholder="FAQ Content"
                    required
                  />
                </div>
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <div>
            <div>
              <p className="SCA-heading" style={{ marginTop: "5%" }}>
                FAQ
              </p>
              <div className="table-responsive ">
                <table className="table table-responsive">
                  <thead
                    style={{ color: "rgba(0, 0, 0, 0.63)" }}
                    className="thead"
                  >
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Heading</th>
                      <th scope="col">Content</th>
                      <th scope="col">UPDATE</th>
                      <th scope="col">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqs.map((faq, index) => (
                      <tr key={faq.id}>
                        <td>{index + 1}</td>
                        {/* <td>{faq.box_heading}</td> */}

                        <td>{faq && truncateText(faq.box_heading, 5)}</td>

                        <td>{faq && truncateText(faq.box_content, 10)}</td>
                        {/* <td>{faq.box_content}</td> */}
                        <td>
                          <button
                            className="edit-button"
                            onClick={() => handleUpdate(faq)}
                          >
                            <img
                              src={updatebtn}
                              className="update-icon"
                              alt="Update"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            id="table-btns"
                            onClick={() => handleDelete(faq.id)}
                          >
                            <img
                              src={deletebtn}
                              className="up-del-btn"
                              alt="Delete"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <Dialog
                      open={updateModalOpen}
                      onClose={handleCloseUpdateModal}
                      PaperProps={{ style: { width: "100%" } }}
                    >
                      {/* <EditFaq /> */}
                      <DialogContent>
                        <div className="Faq-heading">
                          <p>Edit FAQ</p>
                        </div>
                        <form
                          className="form-control"
                          onSubmit={handleUpdateForm}
                        >
                          <div>
                            {/* <label htmlFor="faq_id">FAQ ID</label> */}
                            <input
                              type="number"
                              id="faq_id"
                              name="faq_id"
                              value={Id}
                              onChange={(e) => setId(Number(e.target.value))}
                              placeholder="FAQ ID"
                              required
                              style={{ display: "none" }}
                            />
                          </div>
                          <div>
                            <label htmlFor="box_heading">FAQ Heading</label>
                            <input
                              type="text"
                              id="box_heading"
                              name="box_heading"
                              value={boxHeading}
                              onChange={(e) => setBoxHeading(e.target.value)}
                              placeholder="FAQ Heading"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="box_content">FAQ Content</label>

                            <input
                              type="text"
                              id="box_content"
                              name="box_content"
                              value={boxContent}
                              onChange={(e) => setBoxContent(e.target.value)}
                              placeholder="FAQ Content"
                              required
                            />
                          </div>
                          <button className="btn btn-success" type="submit">
                            Submit
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete FAQ</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this FAQ?
          </DialogContent>
          <DialogActions>
            <button className="submitbtn" onClick={confirmDelete}>
              Delete
            </button>
            <button onClick={handleCloseDeleteDialog} className="canclebtn">
              Cancel
            </button>
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
