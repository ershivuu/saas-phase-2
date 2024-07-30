import React, { useState, useEffect } from "react";
import { updateFooter, getFooter } from "../../FrontendServices";
import { ChromePicker } from "react-color";
import Notification from "../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import updatebtn from "../../../assets/logos/update.png";

function EditFooter() {
  const options = [
    { label: "Select Field", value: "" },
    { label: "Footer Logo", value: "footer_logo" },
    { label: "Contact Address", value: "contact_address" },
    { label: "Contact Email", value: "contact_email" },
    { label: "Contact 1", value: "contact_1" },
    { label: "Contact 2", value: "contact_2" },
    { label: "Logo 1", value: "img_link_1" },
    { label: "Link 1", value: "link_1" },
    { label: "Logo 2", value: "img_link_2" },
    { label: "Link 2", value: "link_2" },
    { label: "Logo 3", value: "img_link_3" },
    { label: "Link 3", value: "link_3" },
    { label: "Logo 4", value: "img_link_4" },
    { label: "Link 4", value: "link_4" },
    { label: "Footer Color", value: "footer_col" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [footerInfo, setFooterInfo] = useState([]);

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }
  function truncateUrl(url, maxLength) {
    if (url.length > maxLength) {
      const truncatedUrl = url.substring(0, maxLength - 3) + "...";
      return truncatedUrl;
    } else {
      return url;
    }
  }
  async function fetchFooterInfo() {
    try {
      const data = await getFooter();
      console.log("Fetched footer info:", data);
      if (data && Array.isArray(data)) {
        setFooterInfo(data);
      } else {
        console.error("Invalid footer info data format:", data);
      }
    } catch (error) {
      console.error("Error fetching footer info:", error);
    }
  }
  useEffect(() => {
    fetchFooterInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 5 * 1024 * 1024;

    if (file && allowedTypes.includes(file.type)) {
      if (file.size <= maxFileSize) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      } else {
        setNotificationMessage("File size should be less than 5MB.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } else {
      setNotificationMessage("Only JPEG, JPG, and PNG files are allowed.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOption) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await updateFooter(formDataToSend);
        console.log(response);

        e.target.reset();
        setFormData({});
        setSelectedOption(options[0].value);
        setNotificationMessage(response.message || "Data updated successfully");
        setNotificationSeverity("success");
        setNotificationOpen(true);
      }
      fetchFooterInfo();
    } catch (error) {
      console.error(error);
      setNotificationMessage("Error updating data. Please try again.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const showSubmitButton = selectedOption !== "";
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleEditClick = (item) => {
    setFormData(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p> Footer</p>
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
                {selectedOption && selectedOption !== "" && (
                  <>
                    {selectedOption === "footer_logo" ||
                    selectedOption === "img_link_1" ||
                    selectedOption === "img_link_2" ||
                    selectedOption === "img_link_3" ||
                    selectedOption === "img_link_4" ? (
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
                          onChange={handleFileChange}
                        />
                        {/* {formData[selectedOption] && (

                        <div>
                          {console.log(formData[selectedOption], "")}
                          <span>current image: </span>
                          <img src={formData[selectedOption + "_url"]} alt="" style={{ width: "100px", height: "70px" }} />
                        </div>
                      )} */}
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
                          type={
                            selectedOption.startsWith("img_link")
                              ? "file"
                              : "text"
                          }
                          name={selectedOption}
                          className="form-control"
                          onChange={
                            selectedOption.startsWith("img_link")
                              ? handleFileChange
                              : handleChange
                          }
                          value={formData[selectedOption] || ""}
                          placeholder={
                            options.find((opt) => opt.value === selectedOption)
                              ?.label
                          }
                        />
                      </div>
                    )}

                    {selectedOption === "footer_col" && (
                      <div>
                        <label>Footer Color:</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ChromePicker
                            color={formData.footer_col || "#000000"}
                            onChange={(color) =>
                              setFormData({
                                ...formData,
                                footer_col: color.hex,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  {showSubmitButton && (
                    <div>
                      <button className="btn btn-success" type="submit">
                        Submit
                      </button>
                    </div>
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
                  <th scope="col">Footer Color</th>

                  <th scope="col">Footer Logo</th>
                  <th scope="col">Contact Address</th>
                  <th scope="col">Contact Email</th>
                  <th scope="col">Contact 1</th>
                  <th scope="col">Contact 2</th>
                  <th scope="col">Image Link 1 URL</th>
                  <th scope="col">Link 1</th>

                  <th scope="col">Image Link 2 URL</th>
                  <th scope="col">Link 2</th>
                  <th scope="col">Image Link 3 URL</th>
                  <th scope="col">Link 3</th>

                  <th scope="col">Image Link 4 URL</th>
                  <th scope="col">Link 4</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {footerInfo.map((item) => (
                  <tr key={item.id}>
                    <td>{item.box_no}</td>
                    <td>{item.footer_col}</td>

                    <td>
                      {item && item.footer_logo_url && item.footer_col && (
                        <img
                          src={item.footer_logo_url}
                          alt="Footer Logo"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            backgroundColor: item.footer_col,
                          }}
                        />
                      )}
                      <br />
                      {/* {item && item.original_footer_logo_name && (
                        <span>{item.original_footer_logo_name}</span>
                      )} */}
                    </td>
                    <td>{item && truncateText(item.contact_address, 3)}</td>
                    <td>{item.contact_email}</td>

                    <td>{item.contact_1}</td>
                    <td>{item.contact_2}</td>

                    <td>
                      {item && item.img_link_1_url && item.footer_col && (
                        <img
                          src={item.img_link_1_url}
                          alt="Image Link 1"
                          style={{
                            maxWidth: "25px",
                            maxHeight: "25px",
                            backgroundColor: item.footer_col,
                          }}
                        />
                      )}
                      <br />
                      {/* {item && item.original_img_link_1_name && (
                        <span>{item.original_img_link_1_name}</span>
                      )} */}
                    </td>
                    <td>{truncateUrl(item.link_1, 20)}</td>

                    <td>
                      {item && item.img_link_2_url && item.footer_col && (
                        <img
                          src={item.img_link_2_url}
                          alt="Image Link 2"
                          style={{
                            maxWidth: "25px",
                            maxHeight: "25px",
                            backgroundColor: item.footer_col,
                          }}
                        />
                      )}
                      <br />
                      {/* {item && item.original_img_link_2_name && (
                        <span>{item.original_img_link_2_name}</span>
                      )} */}
                    </td>

                    <td>{truncateUrl(item.link_2, 20)}</td>

                    <td>
                      {item && item.img_link_3_url && item.footer_col && (
                        <img
                          src={item.img_link_3_url}
                          alt="Image Link 3"
                          style={{
                            maxWidth: "25px",
                            maxHeight: "25px",
                            backgroundColor: item.footer_col,
                          }}
                        />
                      )}
                      <br />
                      {/* {item && item.original_img_link_3_name && (
                        <span>{item.original_img_link_3_name}</span>
                      )} */}
                    </td>

                    <td>{truncateUrl(item.link_3, 20)}</td>

                    <td>
                      {item && item.img_link_4_url && item.footer_col && (
                        <img
                          src={item.img_link_4_url}
                          alt="Image Link 4"
                          style={{
                            maxWidth: "25px",
                            maxHeight: "25px",
                            backgroundColor: item.footer_col,
                          }}
                        />
                      )}
                      <br />
                      {/* {item && item.original_img_link_4_name && (
                        <span>{item.original_img_link_4_name}</span>
                      )}  */}
                    </td>

                    <td>{truncateUrl(item.link_4, 20)}</td>
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

export default EditFooter;
