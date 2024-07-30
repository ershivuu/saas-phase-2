import React, { useState, useEffect } from "react";
import {
  updateBannerContent,
  updateBannerImage,
  getBannerInfo,
} from "../../FrontendServices"; // Adjust the import path as needed
import Notification from "../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../assets/logos/update.png";

function EditHome() {
  const [image, setImage] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [textInput, setTextInput] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [bannerInfo, setBannerInfo] = useState({ bannerContent: {} });
  const [showImage, setShowImage] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const characterLimits = {
    BannerHeaderText: 50,
    BannerContentText: 50,
    BannerButtonText: 20,
  };

  async function fetchBannerInfo() {
    try {
      const data = await getBannerInfo();
      setBannerInfo(data);
    } catch (error) {
      console.error("Error fetching banner info:", error);
    }
  }

  useEffect(() => {
    fetchBannerInfo();
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      setNotificationMessage(
        "Invalid file type. Only JPG, JPEG, and PNG are allowed."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setImage(null);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setNotificationMessage("File size exceeds 20MB limit.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setImage(null);
      return;
    }

    setImage(file);
  };

  const handleSelectChange = (e) => {
    setSelectedField(e.target.value);
    if (e.target.value === "Update Banner Image") {
      // Clear text input value when "Update Banner Image" is selected
      setTextInput("");
    } else {
      // Set text input value based on selected field
      setTextInput(bannerInfo.bannerContent[e.target.value] || "");
    }
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;

    if (value.length <= characterLimits[selectedField]) {
      setTextInput(value);
    } else {
      setNotificationMessage(
        `Character limit exceeded. Maximum allowed is ${characterLimits[selectedField]} characters.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedField) {
        setNotificationMessage("Please select a field.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (selectedField !== "Update Banner Image" && !textInput) {
        setNotificationMessage("Please provide input for the selected field.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      let responseMessage = "";
      // Update Banner Content if selectedField is not "Update Banner Image"
      if (selectedField !== "Update Banner Image") {
        const bannerData = {
          [selectedField]: textInput,
        };
        const response = await updateBannerContent(bannerData);
        console.log("Banner content updated successfully:", response);
        responseMessage = response.message;
      }

      // Update Banner Image if image is selected
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imageResponse = await updateBannerImage(formData);
        console.log("Banner image updated successfully:", imageResponse);
        responseMessage =
          imageResponse.message || "Image updated successfully.";
      }

      setNotificationMessage(responseMessage);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setImage(null);
      setSelectedField("");
      setTextInput("");
      handleCloseModal();
      fetchBannerInfo();
    } catch (error) {
      console.error("Error updating banner data:", error);
      setNotificationMessage("Error updating banner data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (row) => {
    console.log(row, "<<<<");
    setBannerInfo(row);
    setShowImage(row.imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p> Home</p>
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
              <h2 id="transition-modal-title">Edit Home</h2>
              <form className="form-control" onSubmit={handleBannerSubmit}>
                <div>
                  <label htmlFor="selectField">Select Field:</label>
                  <select
                    id="selectField"
                    name="selectField"
                    className="form-control"
                    value={selectedField}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="BannerHeaderText">Banner Header Text</option>
                    <option value="BannerContentText">
                      Banner Content Text
                    </option>
                    <option value="BannerButtonText">Banner Button Text</option>
                    <option value="Update Banner Image">
                      Update Banner Image
                    </option>
                  </select>
                </div>

                {selectedField && selectedField !== "Update Banner Image" && (
                  <div>
                    <label htmlFor="textInput">Update {selectedField}</label>
                    <input
                      type="text"
                      id="textInput"
                      name="textInput"
                      placeholder={`Update ${selectedField}`}
                      value={textInput}
                      onChange={handleTextInputChange}
                      required
                    />
                  </div>
                )}

                {selectedField === "Update Banner Image" && (
                  <div>
                    <label htmlFor="bannerImage">Update Banner Image</label>
                    <input
                      type="file"
                      id="bannerImage"
                      name="image"
                      className="form-control"
                      onChange={handleImageChange}
                      required
                    />
                    <span>
                      Current image:
                      <img
                        src={showImage}
                        alt=""
                        style={{ width: "100px", height: "70px" }}
                      />
                    </span>
                  </div>
                )}

                {selectedField && (
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
                  <th scope="col">S No.</th>
                  <th scope="col">Banner Header Text</th>
                  <th scope="col">Banner Content Text</th>
                  <th scope="col">Banner Button Text</th>
                  <th scope="col">Banner Image</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{bannerInfo.bannerContent.BannerHeaderText}</td>
                  <td>{bannerInfo.bannerContent.BannerContentText}</td>
                  <td>{bannerInfo.bannerContent.BannerButtonText}</td>
                  <td>
                    {bannerInfo && bannerInfo.imageUrl && (
                      <img
                        src={bannerInfo.imageUrl}
                        alt="Banner Image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                    <br />
                    {/* {bannerInfo && bannerInfo.originalName && (
                      <span>{bannerInfo.originalName}</span>
                    )} */}
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(bannerInfo)}
                    >
                      <img
                        src={updatebtn}
                        className="update-icon"
                        alt="Update"
                      />
                    </button>
                  </td>
                </tr>
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

export default EditHome;
