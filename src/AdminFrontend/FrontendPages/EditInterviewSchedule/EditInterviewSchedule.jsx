import React, { useState, useEffect } from "react";
import { updateInterview, getInterviewInfo } from "../../FrontendServices";
import Notification from "../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../assets/logos/update.png";

const UpdateInterviewForm = () => {
  const [interviewInfo, setInterviewInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showImg, setShowImg] = useState({});
  const options = [
    { label: "Select...", value: "" },
    { label: "Heading", value: "banner_header" },
    { label: "Sub Heading", value: "banner_content" },
    { label: "Note", value: "note" },
    { label: "AM Venue", value: "am_venue" },
    { label: "Reporting Time", value: "reporting_time" },
    { label: "Contact Number", value: "contact" },
    { label: "Facilities", value: "facilities" },
    { label: "Offered Package", value: "offered_package" },
    { label: "Background Image", value: "banner_img" },
  ];

  const wordLimits = {
    banner_header: 2,
    banner_content: 10,
    note: 80,
    reporting_time: 80,
    contact: 80,
    facilities: 80,
    am_venue: 80,
    offered_package: 80,
  };

  const defaultOption = options[0].value;
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [formData, setFormData] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [showInput, setShowInput] = useState(false);

  async function interviewScheduleInfo() {
    try {
      const data = await getInterviewInfo();
      console.log("Fetched interview info:", data);
      setInterviewInfo(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error fetching interview info:", error);
    }
  }

  useEffect(() => {
    interviewScheduleInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    
    if (
      (files &&
        !["image/jpeg", "image/png", "image/jpg"].includes(files[0].type)) ||
      (files && files[0].size > 20 * 1024 * 1024) // 20 MB limit
    ) {
      setNotificationMessage(
        "Invalid file format or size. Please upload a JPG, JPEG, or PNG image within 20 MB."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    if (wordCount <= wordLimits[selectedOption] || files) {
      const newFormData = { ...formData, [name]: files ? files[0] : value };
      console.log("Updated formData:", newFormData);
      setFormData(newFormData);
    } else {
      setNotificationMessage(
        `Word limit exceeded. Maximum allowed is ${wordLimits[selectedOption]} words.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await updateInterview(formDataToSend);
      console.log(response);

      e.target.reset();
      setFormData({});
      setSelectedOption(defaultOption);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setShowInput(false); 
      interviewScheduleInfo();
    } catch (error) {
      console.error(error); 
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
   
    }
  };

  useEffect(() => {
   
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setShowInput(e.target.value !== ""); 
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleEditClick = (item) => {
    setSelectedRow(item); 
    setFormData(item); 
    setShowInput(true); 
    setOpenModal(true);
    setShowImg(item.banner_img);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p>Interview Schedule </p>
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
                {showInput && (
                  <>
                    {selectedOption === "banner_img" ? (
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
                          onChange={handleChange}
                        />
                        <span>
                          Current image:
                          <img
                            src={showImg}
                            alt=""
                            style={{ width: "100px", height: "70px" }}
                          />
                        </span>
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
                          type="text"
                          name={selectedOption}
                          className="form-control"
                          onChange={handleChange}
                          value={formData[selectedOption] || ""}
                          placeholder={
                            options.find((opt) => opt.value === selectedOption)
                              ?.label
                          }
                        />
                      </div>
                    )}
                  </>
                )}

                <div>
                  {showInput && (
                    <button className="btn btn-success" type="submit">
                      Submit
                    </button>
                  )}
                </div>
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
                  <th scope="col">Header</th>
                  <th scope="col">Content</th>
                  <th scope="col">Note</th>
                  <th scope="col">AM Venue</th>
                  <th scope="col">Reporting Time</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Facilities</th>
                  <th scope="col">Offered Package</th>
                  <th scope="col">Background Image</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {interviewInfo.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.banner_header}</td>
                    <td>{item.banner_content}</td>
                    <td>{item.note}</td>
                    <td>{item.am_venue}</td>
                    <td>{item.reporting_time}</td>
                    <td>{item.contact}</td>
                    <td>{item.facilities}</td>
                    <td>{item.offered_package}</td>
                    <td>
                      {item.banner_img && (
                        <img
                          src={item.banner_img}
                          alt="Section 2 image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
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
};

export default UpdateInterviewForm;
