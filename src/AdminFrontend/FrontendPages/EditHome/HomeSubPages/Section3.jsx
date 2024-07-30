import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { updateSection3, getSection3 } from "../../../FrontendServices";
import Notification from "../../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../../assets/logos/update.png";

function Section3() {
  const [boxNo, setBoxNo] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [showImg, setShowImg] = useState([]);
  const [section3Info, setSection3Info] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    header_1: "",
    header_2: "",
    header_3: "",
    box_content: "",
    bg_col: "#ffffff",
    box_img: null,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  useEffect(() => {
    fetchSection3Info();
  }, []);

  async function fetchSection3Info() {
    try {
      const data = await getSection3();
      console.log(">>>>>", data);
      setSection3Info(data);
    } catch (error) {
      console.error("Error fetching Section3 info:", error);
    }
  }

  const handleEditClick = (item) => {
    setBoxNo(item.box_no);
    setFormData({
      header_1: item.header_1 || "",
      header_2: item.header_2 || "",
      header_3: item.header_3 || "",
      box_content: item.box_content || "",
      bg_col: item.bg_col || "#ffffff",
      box_img: null,
    });
    setShowImg(item.box_img_url || null);
    setOpenModal(true);
  };

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  const handleCloseModal = () => {
    setSelectedField("");
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const box_no = boxNo;
      const formDataToSend = new FormData();

      formDataToSend.append("boxNo", box_no);
      formDataToSend.append(selectedField, formData[selectedField]);

      const response = await updateSection3(formDataToSend, box_no);

      setBoxNo("");
      setFormData({
        header_1: "",
        header_2: "",
        header_3: "",
        box_content: "",
        bg_col: "",
        box_img: null,
      });
      setSelectedField("");
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchSection3Info();
    } catch (error) {
      console.error("Error updating data:", error.message);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  function getOptionsForBoxNo(boxNo) {
    switch (boxNo) {
      case 1:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="header_2">Header 2</option>
          </>
        );
      case 2:
      case 4:
      case 5:
        return (
          <>
            <option value="header_1">Header 1</option>
            <option value="box_content">Box Content</option>
            <option value="bg_col">Background Color</option>
          </>
        );
      case 3:
      case 6:
      case 7:
      case 8:
        return <option value="box_img">Box Image</option>;
      default:
        return null;
    }
  }
  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p>Section 3</p>
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
              <h2 id="transition-modal-title">Edit Section 3</h2>
              <form className="form-control" onSubmit={handleSubmit}>
                <>
                  <label htmlFor="selectedField">Select Field : </label>
                  <select
                    className="form-select"
                    id="selectedField"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    required
                  >
                    <option value="">Select Field</option>
                    {getOptionsForBoxNo(boxNo)}
                  </select>
                </>

                {selectedField &&
                  selectedField !== "bg_col" &&
                  selectedField !== "box_img" && (
                    <div>
                      <label htmlFor={selectedField}>{selectedField}:</label>
                      <input
                        type="text"
                        id={selectedField}
                        name={selectedField}
                        value={formData[selectedField]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [selectedField]: e.target.value,
                          })
                        }
                        required
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

                {selectedField === "box_img" && (
                  <div>
                    <label htmlFor="box_img">Image:</label>
                    <input
                      type="file"
                      id="box_img"
                      accept="box_img/*"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, box_img: e.target.files[0] })
                      }
                      required
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
                  <th scope="col">Header 2</th>
                  <th scope="col">Box Image</th>
                  <th scope="col">Box Content</th>
                  <th scope="col">Background Color</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {section3Info &&
                  section3Info.map((item) => (
                    <tr key={item.id}>
                      <td>{item.box_no}</td>
                      <td>{item.header_1}</td>
                      <td>{item.header_2}</td>
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
                      <td>{item && truncateText(item.box_content, 4)}</td>
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
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default Section3;
