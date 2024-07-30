import React, { useState, useEffect } from "react";
import { updateContact, getContactUs } from "../../../FrontendServices";
import { ChromePicker } from "react-color";
import "./EditHome.css";
import Notification from "../../../../Notification/Notification";
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


  useEffect(() => {
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
      <div className="Faq-heading">
        <p> Contact Info</p>
      </div>
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <select
            className="form-select"
            name="field"
            value={formData.field}
            onChange={handleChange}
          >
            <option value="">Select a field</option>
            <option value="contact_1">Contact 1</option>
            <option value="contact_2">Contact 2</option>
            <option value="contact_3">Contact 3</option>
            <option value="contact_4">Contact 4</option>

            <option value="contact_email_1">Contact Email 1</option>
            <option value="contact_email_2">Contact Email 2</option>
            <option value="contact_add">Contact Address</option>
            <option value="box_col">Box Color</option>
            <option value="map_url">Map URL</option>
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
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder={`Enter value for ${formData.field}`}
            />
          )}{" "}
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
                  Select the location, press the "Share" button, generate the
                  embed code, and then copy the URL to the "src" section.
                </li>
                <li>Paste the copied "URL" and submit.</li>
              </ol>
              <div></div>
            </div>
          )}
          {formData.field && showInput && (
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
      <div className="Faq-heading">
        <p>Current Status </p>
      </div>
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
            {contactInfo.map((contact,index) => (
              <tr key={contact.id}>
                {/* <td>{contact.id}</td> */}
                <td>{index + 1}</td>
                <td>{contact.contact_1}</td>
                <td>{contact.contact_2}</td>
                <td>{contact.contact_3}</td>
                <td>{contact.contact_4}</td>
                <td>{contact && truncateText(contact.contact_email_1, 3)}</td>
                <td>{contact && truncateText(contact.contact_email_2, 3)}</td>
                <td>{contact && truncateText(contact.contact_add, 3)}</td>
                {/* <td>{contact.contact_email_1}</td>
                <td>{contact.contact_email_2}</td>
                <td>{contact.contact_add}</td> */}
                <td style={{ backgroundColor: contact.box_col }}>
                  {contact.box_col}
                </td>
                <td>
                  <a
                    href={contact.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Map URL
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
