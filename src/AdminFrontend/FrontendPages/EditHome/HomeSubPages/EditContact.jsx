import React, { useState, useEffect } from "react";
import { updateContact, getContactUs } from "../../../FrontendServices";
import { ChromePicker } from "react-color";
import "./EditHome.css";
import Notification from "../../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../../assets/logos/update.png";

function EditContact() {
  const g_map_url =
    "https://www.google.com/maps/place/India/@23.5164343,73.3016972,4.87z/data=!4m6!3m5!1s0x30635ff06b92b791:0xd78c4fa1854213a6!8m2!3d20.593684!4d78.96288!16zL20vMDNyazA?authuser=0&entry=ttu";

  const fieldOptions = [
    { value: "contact_1", label: "Contact 1" },
    { value: "contact_2", label: "Contact 2" },
    { value: "contact_3", label: "Contact 3" },
    { value: "contact_4", label: "Contact 4" },
    { value: "contact_email_1", label: "Contact Email 1" },
    { value: "contact_email_2", label: "Contact Email 2" },
    { value: "contact_add", label: "Contact Address" },
    { value: "box_col", label: "Box Color" },
    { value: "map_url", label: "Map URL" },
  ];

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  async function fetchContactInfo() {
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
  }

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      handleCloseModal();
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

  const handleEditClick = (item) => {
    setSelectedContact(item);
    setFormData({
      field: "",
      value: "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFieldSelect = (e) => {
    const selectedField = e.target.value;
    const selectedValue = selectedContact ? selectedContact[selectedField] : "";
    setFormData({
      field: selectedField,
      value: selectedValue,
    });
    if (selectedField === "box_col") {
      setColor(selectedValue || "#ffffff");
    }
    setShowInput(true);
  };

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p>Contact Info</p>
        </div>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className="modal-content">
                <h2 id="transition-modal-title">Edit Section 2</h2>
                {selectedContact && (
                  <form className="form-control" onSubmit={handleSubmit}>
                    <label htmlFor="">Select Field :</label>
                    <select
                      className="form-select"
                      name="field"
                      value={formData.field}
                      onChange={handleFieldSelect}
                    >
                      <option value="">Select field</option>
                      {fieldOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {formData.field === "box_col" && showInput && (
                      <div className="color-picker-container">
                        <label htmlFor="colorPicker">Choose a color:</label>
                        <ChromePicker
                          color={color}
                          onChange={handleColorChange}
                          id="colorPicker"
                        />
                      </div>
                    )}
                    {formData.field !== "box_col" && showInput && (
                      <>
                        <label htmlFor="value">{formData.field}</label>
                        <input
                          type="text"
                          name="value"
                          value={formData.value}
                          onChange={handleChange}
                          placeholder={`Enter value for ${formData.field}`}
                        />
                      </>
                    )}
                    {formData.field === "map_url" && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        <p>Note: Steps to update Google Map :</p>
                        <ol>
                          <li>
                            Go to Google Maps.
                            <button className="gmap">
                              <a href={g_map_url} target="_blank">
                                Google Map
                              </a>
                            </button>
                          </li>
                          <li>
                            Select the location, press the "Share" button,
                            generate the embed code, and then copy the URL to
                            the "src" section.
                          </li>
                          <li>Paste the copied "URL" and submit.</li>
                        </ol>
                      </div>
                    )}
                    {formData.field && showInput && (
                      <button className="btn btn-success" type="submit">
                        Submit
                      </button>
                    )}
                  </form>
                )}
              </div>
            </Fade>
          </Modal>
        </div>
        <div className="Faq-heading">{/* <p>Current Status</p> */}</div>
        <div className="table-responsive">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Contact 1</th>
                <th scope="col">Contact 2</th>
                <th scope="col">Contact 3</th>
                <th scope="col">Contact 4</th>
                <th scope="col">Contact Email 1</th>
                <th scope="col">Contact Email 2</th>
                <th scope="col">Contact Address</th>
                <th scope="col">Box Color</th>
                <th scope="col">Map URL</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {contactInfo.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.contact_1}</td>
                  <td>{contact.contact_2}</td>
                  <td>{contact.contact_3}</td>
                  <td>{contact.contact_4}</td>
                  <td>{contact && truncateText(contact.contact_email_1, 3)}</td>
                  <td>{contact && truncateText(contact.contact_email_2, 3)}</td>
                  <td>{contact && truncateText(contact.contact_add, 3)}</td>
                  <td
                    style={{
                      backgroundColor: contact.box_col,
                      color: "#fff",
                    }}
                  >
                    {contact.box_col}
                  </td>
                  <td>
                    <iframe src={contact.map_url}></iframe>
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(contact)}
                    >
                      <img
                        src={updatebtn}
                        className="update-icon"
                        alt="Update"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default EditContact;
