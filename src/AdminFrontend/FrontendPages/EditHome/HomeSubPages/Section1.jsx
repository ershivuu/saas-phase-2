import React, { useState, useEffect } from "react";
import { getSection1Data, updateSection1Data } from "../../../FrontendServices";
import Notification from "../../../../Notification/Notification";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import updatebtn from "../../../../assets/logos/update.png";

function Section1() {
  const [section1Data, setSection1Data] = useState({
    selectedHeading: "",
    heading_L1: "",
    heading_L2: "",
    heading_L3: "",
  });
  const [getsection1Data, setGetSection1Data] = useState("");
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const wordLimits = {
    heading_L1: 5,
    heading_L2: 3,
    heading_L3: 3,
  };
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");

  async function fetchSection1Data() {
    try {
      const data = await getSection1Data();
      setGetSection1Data(data);
    } catch (error) {
      console.error("Error fetching Section 1 data:", error);
    }
  }

  useEffect(() => {
    fetchSection1Data();
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const wordCount = value.split(" ").filter((word) => word).length;

    if (wordCount <= wordLimits[name]) {
      setSection1Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNotificationMessage(
        `Word limit exceeded for ${name}. Maximum allowed is ${wordLimits[name]} words.`
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleHeadingSelect = (selectedHeading) => {
    setSection1Data((prevState) => ({
      ...prevState,
      selectedHeading: selectedHeading,
    }));
  };

  const handleSection1Submit = async (e) => {
    e.preventDefault();
    try {
      const section1Response = await updateSection1Data({
        ...section1Data,
        [section1Data.selectedHeading]:
          section1Data[section1Data.selectedHeading],
      });
      console.log("Section 1 data updated successfully:", section1Response);

      setNotificationMessage(section1Response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setSection1Data({
        selectedHeading: "",
        heading_L1: "",
        heading_L2: "",
        heading_L3: "",
      });
      setModalOpen(false);
      fetchSection1Data();
    } catch (error) {
      console.error("Error updating section 1 data:", error);

      setNotificationMessage(
        "Error updating section 1 data. Please try again."
      );

      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditButtonClick = (rowData) => {
    setEditData(rowData);
    setSection1Data({
      selectedHeading: "",
      heading_L1: rowData.heading_L1,
      heading_L2: rowData.heading_L2,
      heading_L3: rowData.heading_L3,
    });
    setModalOpen(true);
  };

  const showSubmitButton = section1Data.selectedHeading !== "";

  return (
    <>
      <div className="admin-list">
        <div className="SCA-heading">
          <p>Section 1</p>
        </div>

        <div>
          <div className="table-responsive">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Heading 1</th>
                  <th scope="col">Heading 2</th>
                  <th scope="col">Heading 3</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{getsection1Data.id}</td>
                  <td>{getsection1Data.heading_L1}</td>
                  <td>{getsection1Data.heading_L2}</td>
                  <td>{getsection1Data.heading_L3}</td>
                  {/* <td>
                  <Button
                   className="btn btn-primary"
                    onClick={() => handleEditButtonClick(getsection1Data)}
                  >
                    Edit
                  </Button>
                </td> */}
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditButtonClick(getsection1Data)}
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

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <div className="modal-content">
              <h2>Edit Section 1</h2>
              <form className="form-control" onSubmit={handleSection1Submit}>
                <div>
                  <label>Select Heading:</label>
                  <select
                    id="headingSelect"
                    className="form-select"
                    onChange={(e) => handleHeadingSelect(e.target.value)}
                    value={section1Data.selectedHeading}
                  >
                    <option value="">Select Heading</option>
                    <option value="heading_L1">Heading 1</option>
                    <option value="heading_L2">Heading 2</option>
                    <option value="heading_L3">Heading 3</option>
                  </select>
                </div>
                {section1Data.selectedHeading && (
                  <div>
                    <label>{section1Data.selectedHeading}</label>
                    <input
                      type="text"
                      name={section1Data.selectedHeading}
                      placeholder={section1Data.selectedHeading}
                      value={section1Data[section1Data.selectedHeading]}
                      onChange={handleTextChange}
                      required
                    />
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

export default Section1;
