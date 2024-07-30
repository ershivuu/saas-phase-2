import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { updateSection5, getSection5Data } from "../../../FrontendServices"; 
import Notification from "../../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../../assets/logos/update.png";

function Section5() {
  const [boxNo, setBoxNo] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [section5Info, setSection5Info] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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
          header_1: 4,
          box_content: 16,
        };
      case "2":
        return {
          box_content: 10,
        };

      default:
        return {
          box_content: 10,
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

    if (wordCount <= wordLimits[name]) {
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
      setOpenModal(false);
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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedField("");
    setOpenModal(false);
  };

  function getOptionsForBoxNo(boxNo) {
    switch (boxNo) {
      case 1:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="box_content">Box Content</option>
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

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p>Section 5</p>
        </div>

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
              <h2 id="transition-modal-title">Edit Section 5</h2>
              <form className="form-control" onSubmit={handleSubmit}>
                <>
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
                </>

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
                    />
                  </div>
                )}

                {boxNo && (
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                )}
              </form>
            </div>
          </Fade>
        </Modal>

        <div>
          <div className="table-responsive">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">Box No</th>
                  <th scope="col">Header 1</th>
                  <th scope="col">Box Image</th>
                  <th scope="col">Box Content</th>
                  <th scope="col">Background Color</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {section5Info.map((item) => (
                  <tr key={item.box_no}>
                    <td>{item.box_no}</td>
                    <td>{item.header_1}</td>
                    <td>
                      {item.box_img_url && (
                        <>
                          <img
                            src={item.box_img_url}
                            alt={`Box ${item.box_no} Image`}
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                          <br />
                          {/* <span>{item.original_name}</span> */}
                        </>
                      )}
                    </td>
                    <td>{item.box_content}</td>
                    <td style={{ backgroundColor: item.bg_col }}>
                      {item.bg_col}
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(item)}
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
