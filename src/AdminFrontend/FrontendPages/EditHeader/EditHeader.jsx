import React, { useState, useEffect } from "react";
import {
  updateHeaderLogo,
  updateRibbon,
  getHeaderInfo,
} from "../../FrontendServices";
import { ChromePicker } from "react-color";
import Notification from "../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../assets/logos/update.png"

function EditHeader() {
  const [formData, setFormData] = useState({
    selectedOption: "",
    ribbon_content: "",
    ribbon_bg_col: "#ff0000",
    logo: null,
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [headerInfo, setHeaderInfo] = useState([]);
  
  const characterLimit = 50;
  
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  async function fetchHeaderInfo() {
    try {
      const data = await getHeaderInfo("getHeaderInfo");
      setHeaderInfo(data);
    } catch (error) {
      console.error("Error fetching header info:", error);
    }
  }

  useEffect(() => {
    fetchHeaderInfo();
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedOption: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ribbon_content" && value.length > characterLimit) {
      setNotificationMessage(`Character limit exceeded. Maximum ${characterLimit} characters allowed.`);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file.size > 5 * 1024 * 1024) {
      setNotificationMessage("File size must be less than 5MB.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setNotificationMessage("Only JPG, JPEG, and PNG formats are allowed.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.selectedOption !== "ribbon_content" &&
        formData.selectedOption !== "ribbon_bg_col" &&
        formData.selectedOption !== "logo"
      ) {
        setNotificationMessage("Please select an update option.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return; // Exit early if no update option is selected
      }

      let formDataToSend = {}; // Initialize formDataToSend object

      // Check the selected option and add its data to formDataToSend
      if (formData.selectedOption === "ribbon_content") {
        formDataToSend.ribbon_content = formData.ribbon_content;
      } else if (formData.selectedOption === "ribbon_bg_col") {
        formDataToSend.ribbon_bg_col = formData.ribbon_bg_col;
      } else if (formData.selectedOption === "logo") {
        formDataToSend.logo = formData.logo;
      }

      // Check if formDataToSend is empty
      if (Object.keys(formDataToSend).length === 0) {
        setNotificationMessage("Please fill in the required fields.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return; // Exit early if formDataToSend is empty
      }

      // Send data to respective API based on selected option
      let responseMessage = "";
      let severity = "success";

      if (formDataToSend.ribbon_content) {
        // Call API to update ribbon content
        const ribbonContentResponse = await updateRibbon({
          ribbon_content: formDataToSend.ribbon_content,
        });
        console.log(
          "Ribbon content updated successfully:",
          ribbonContentResponse
        );
        responseMessage = ribbonContentResponse.message;
      } else if (formDataToSend.ribbon_bg_col) {
        // Call API to update ribbon color
        const ribbonColorResponse = await updateRibbon({
          ribbon_bg_col: formDataToSend.ribbon_bg_col,
        });
        responseMessage = ribbonColorResponse.message;
      } else if (formDataToSend.logo) {
        // Call API to update logo
        const logoFormData = new FormData();
        logoFormData.append("image", formDataToSend.logo);
        const logoResponse = await updateHeaderLogo(logoFormData);
       responseMessage = logoResponse.message;
      }

      if (!responseMessage) {
        // If response message is empty, set custom error message
        responseMessage = "Error updating header or ribbon.";
        severity = "error";
      }

      setNotificationMessage(responseMessage);
      setNotificationSeverity(severity);
      setNotificationOpen(true);

      setFormData({
        selectedOption: "",
        ribbon_content: "",
        ribbon_bg_col: "",
        logo: null,
      });

      // const fileInput = document.getElementById("logo");
      // if (fileInput) {
      //   fileInput.value = "";
      // }

      console.log("Form data reset");
      handleCloseModal();
      fetchHeaderInfo();
    } catch (error) {
      console.error("Error updating header or ribbon:", error);
      setNotificationMessage("Error updating header or ribbon.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (row) => {
    console.log(row,"<<<<")
    setSelectedRow(row);
    setOpenModal(true);
    setFormData({
      selectedOption: row.selectedOption,
      ribbon_content: row.ribbon_content,
      ribbon_bg_col: row.ribbon_bg_col,
      logo: row.image_url,
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="admin-list">
      <div className="SCA-heading">
        <p>Header</p>
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
            <h2 id="transition-modal-title">Edit Header</h2>
            <form className="form-control" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="selectedOption">Select Field :</label>
                <select
                  class="form-select"
                  id="selectedOption"
                  name="selectedOption"
                  value={formData.selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="ribbon_content">Update Ribbon Data</option>
                  <option value="ribbon_bg_col">Update Ribbon Color</option>
                  <option value="logo">Update Logo</option>
                </select>
              </div>
              {formData.selectedOption === "ribbon_content" && (
                <div>
                  <label htmlFor="ribbon_content">Update Ribbon Data</label>
                  <input
                    type="text"
                    id="ribbon_content"
                    name="ribbon_content"
                    placeholder="Update Ribbon Data"
                    aria-label="Ribbon content"
                    value={formData.ribbon_content}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {formData.selectedOption === "ribbon_bg_col" && (
                <div className="color-picker">
                  <label htmlFor="ribbon_bg_col">Update Ribbon Color</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ChromePicker
                      color={formData.ribbon_bg_col}
                      onChange={(color) =>
                        setFormData((prevData) => ({
                         ...prevData,
                          ribbon_bg_col: color.hex,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
              {formData.selectedOption === "logo" && (
                <div>
                
                  <label htmlFor="logo">Update Logo</label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"                    
                    className="form-control"
                    onChange={handleFileChange}
                  />
                    <span>Current Image:<img src={formData.logo} alt="showimg" style={{width:"100px",height:"70px"}}/></span>
                </div>
              )}
              <div>
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>

      <div>
        <div>
          {/* <p className="Faq-heading">Current Status</p> */}
        </div>
        <div className="table-responsive">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Ribbon Content</th>
                <th scope="col">Ribbon Background Color</th>
                <th scope="col">Logo</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {headerInfo && (
                <tr>
                  <td>1</td>
                  <td>{headerInfo.ribbon_content}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor: headerInfo.ribbon_bg_col,
                        width: "50px",
                        height: "30px",
                        textAlign: "center",
                      }}
                    ></div>
                  </td>

                  <td>
                    {headerInfo && headerInfo.image_url && (
                      <img
                        src={headerInfo.image_url}
                        alt="Section 2 image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                    <br />
                    {/* {headerInfo && headerInfo.original_name && (
                      // <span>{headerInfo.image_url.split("/").pop()}</span>
                      <span>{headerInfo.original_name}</span>
                    )} */}
                  </td>
                  <td>
                    <button
                    className="edit-button"
                      onClick={() => handleEditClick(headerInfo)}
                    >
                     <img
                            src={updatebtn}
                            className="update-icon"
                            alt="Update"
                          />
                    </button>
                  </td>
                </tr>
              )}
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
    </div>
  );
}

export default EditHeader;