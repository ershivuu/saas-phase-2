import React, { useState, useEffect } from "react";
import { updateSection2Data, getSection2Data } from "../../../FrontendServices"; // Update the path as per your file structure
import Notification from "../../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../../assets/logos/update.png"

function Section2() {
  const [section2Info, setSection2Info] = useState();

  const [formData, setFormData] = useState({
    selectedOption: "",
    dataInput: "",
    image: null,
  });

  const wordLimits = {
    heading_L1: 3,
    heading_L2: 2,
    section2_box1: 25,
    section2_box2: 25,
    section2_box3: 25,
    section2_box4: 25,
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [openModal, setOpenModal] = useState(false);
  const [showImg, setShowImg] = useState({});

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  async function fetchSection2Info() {
    try {
      const data = await getSection2Data();
      setSection2Info(data);
      console.log(data.section2_Image_path,"???")
      setShowImg(data.section2_Image_path)
    } catch (error) {
      console.error("Error fetching Section2 info:", error);
    }
  }

  useEffect(() => {
    fetchSection2Info();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "selectedOption") {
      let dataInput = "";
      if (section2Info) {
        dataInput = section2Info[value] || "";
      }
      setFormData({ ...formData, selectedOption: value, dataInput: dataInput });
    } else if (name === "dataInput") {
      const wordCount = value.split(" ").filter((word) => word).length;

      if (wordCount <= wordLimits[formData.selectedOption]) {
        setFormData({ ...formData, dataInput: value });
      } else {
        setNotificationMessage(
          `Word limit exceeded. Maximum allowed is ${
            wordLimits[formData.selectedOption]
          } words.`
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } else if (name === "image") {
      const image = files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInMB = 20;

      if (!validFormats.includes(image.type)) {
        setNotificationMessage(
          "Invalid image format. Only jpg, jpeg, and png are allowed."
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (image.size / 1024 / 1024 > maxSizeInMB) {
        setNotificationMessage("Image size exceeds 20 MB limit.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      setFormData({ ...formData, [name]: image });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      const formDataUpload = new FormData();

      // Append selected option data to FormData
      if (formData.selectedOption !== "Update Banner Image") {
        formDataUpload.append("selectedOption", formData.selectedOption);
        formDataUpload.append(formData.selectedOption, formData.dataInput);
      } else {
        formDataUpload.append("selectedOption", "Update Banner Image");
        formDataUpload.append("image", formData.image);
      }

      const response = await updateSection2Data(formDataUpload);
      console.log("Data updated successfully");
      setFormData({ selectedOption: "", dataInput: "", image: null });

      setNotificationMessage(response.message || "Data updated successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchSection2Info();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating data:", error.message);
      setNotificationMessage("Error updating data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const showSubmitButton = formData.selectedOption !== "";

  const handleEditClick = (row) => {
    
    setFormData({
      selectedOption: "",
      dataInput: "",
      image: null,
    });

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
    <div className="admin-list">
      
   
      <div className="SCA-heading">
        <p>Section 2</p>
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
            <h2 id="transition-modal-title">Edit Section 2</h2>
            <form className="form-control" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="selectedOption">Select Field</label>
                <select
                  className="form-select"
                  id="selectedOption"
                  name="selectedOption"
                  value={formData.selectedOption}
                  onChange={handleChange}
                >
                  <option value="">Select Field</option>
                  <option value="heading_L1">Heading 1</option>
                  <option value="heading_L2">Heading 2</option>
                  <option value="section2_box1">Box 1 Content</option>
                  <option value="section2_box2">Box 2 Content</option>
                  <option value="section2_box3">Box 3 Content</option>
                  <option value="section2_box4">Box 4 Content</option>
                  <option value="Update Banner Image">Update Banner Image</option>
                </select>
              </div>
              {formData.selectedOption !== "Update Banner Image" &&
                formData.selectedOption && (
                  <div>
                    <label htmlFor="dataInput">{formData.selectedOption}</label>
                    <input
                      type="text"
                      id="dataInput"
                      name="dataInput"
                      value={formData.dataInput}
                      onChange={handleChange}
                      placeholder={`Enter ${formData.selectedOption}`}
                      required
                    />
                  </div>
                )}
              {formData.selectedOption === "Update Banner Image" && (
                <div>
                  <label htmlFor="image">Upload Banner Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
            
                  <span>Current image:<img src={showImg} alt="" style={{width:"100px",height:"70px"}}/></span>
                </div>
              )}

              {showSubmitButton && (
                <div>
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                </div>
              )}
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
                <th scope="col">Heading 1</th>
                <th scope="col">Heading 2</th>
                <th scope="col">Box 1 Content</th>
                <th scope="col">Box 2 Content</th>
                <th scope="col">Box 3 Content</th>
                <th scope="col">Box 4 Content</th>
                <th scope="col">Background Image</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{section2Info && section2Info.heading_L1}</td>
                <td>{section2Info && section2Info.heading_L2}</td>
                <td>
                  {section2Info && truncateText(section2Info.section2_box1, 2)}
                </td>
                <td>
                  {section2Info && truncateText(section2Info.section2_box2, 2)}
                </td>
                <td>
                  {section2Info && truncateText(section2Info.section2_box3, 2)}
                </td>
                <td>
                  {section2Info && truncateText(section2Info.section2_box4, 2)}
                </td>
                <td>
                  {section2Info && section2Info.section2_Image_path && (
                    <img
                      src={section2Info.section2_Image_path}
                      alt="Section 2 image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                  <br />
                  {/* {section2Info && section2Info.section2_Image_path && (
                    <span>{section2Info.original_name}</span>
                  )} */}
                </td>
                <td>
                  <button
                className="edit-button"
                    onClick={() => handleEditClick(section2Info)}
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

export default Section2;
