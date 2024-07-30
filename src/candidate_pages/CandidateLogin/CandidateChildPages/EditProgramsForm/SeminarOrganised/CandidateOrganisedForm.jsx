import React, { useEffect, useState } from "react";
import candidatesApiService from "../../../../candidateService";
import updatebtn from "../../../../../assets/logos/update.png";
import deletebtn from "../../../../../assets/logos/delete.png";
import EditOrganisedForm from "./EditOrganisedForm";
import AddOrganisedForm from "./AddOrganisedForm";
import "./CandidateOrganisedForm.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Notification from "../../../../../Notification/Notification";
const CandidateOrganisedForm = () => {
  const [organisedItem, setOrganisedItem] = useState([]);
  // const [editItemId, setEditItemId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [filteredItem, setFilteredItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const fetchData = async () => {
    try {
      const fetchedData = await candidatesApiService.getCandidateOrganised();
      setOrganisedItem(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const handleEditClick = (itemId) => {
    // console.log("id??", itemId);
    const filteredItem = organisedItem.find((item) => item.id === itemId);
    // console.log("Filtered item:", filteredItem);
    setFilteredItem(filteredItem);
    // setEditItemId(itemId);
    setEditMode(true);
  };
  // const handleClose = () => {
  //   setEditMode(false);
  // };
  const handleOpenOrganizedClick = () => {
    setIsPopupOpen(true); // Open popup
  };
  // const handleCloseOrganizedClick = () => {
  //   setIsPopupOpen(true);
  // };
  // const handleDeleteClick = async (itemId) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this item?"
  //   );
  //   if (isConfirmed) {
  //     try {
  //       await candidatesApiService.DeleteOrganisedForm(itemId);
  //       // Update state after successful deletion
  //       setOrganisedItem((prevItems) =>
  //         prevItems.filter((item) => item.id !== itemId)
  //       );
  //        console.log("Item deleted successfully");
  //     } catch (error) {
  //       console.error("Error deleting item:", error.message);
  //     }
  //   }
  // };

  const handleDeleteClick = async (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.DeleteOrganisedForm(deleteItemId);
      setOrganisedItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
      // console.log("Item deleted successfully");
      setNotificationMessage(`deleted successfully`);
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    } finally {
      setDeleteItemId(null); // Close the delete confirmation dialog
    }
  };
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };
  return (
    <>
      {/* <div className="new-opening-btn">
        <button onClick={handleOpenOrganizedClick}>Add Organized</button>
      </div> */}
 <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity} />
      <div className="master-table">
        <div className="flex-btns">
          <p className="candidate-table-heading">Organized</p>
          <button className="add-btn" onClick={handleOpenOrganizedClick}>
            Add Organized
          </button>
        </div>

        <div className="table-responsive set-programs-tabel">
          <table className="table table-responsive">
            <thead
              style={{ color: "rgba(0, 0, 0, 0.63)", textAlign: "center" }}
              className="thead"
            >
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Date From</th>
                <th scope="col">Date To</th>
                <th scope="col">Name of the Course</th>
                <th scope="col">Sponsored By</th>
                <th scope="col">No. of Participants</th>
                <th scope="col">From Institutes</th>
                <th scope="col">From Industry</th>
                <th scope="col">Edit</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {organisedItem &&
                organisedItem.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.organise_date_from)}</td>
                    <td>{formatDate(item.organise_date_to)}</td>
                    <td>{item.name_of_course}</td>
                    <td>{item.sponsered_by}</td>
                    <td>{item.participants_number}</td>
                    <td>{item.name_of_institute}</td>
                    <td>{item.name_of_industry}</td>
                    <td>
                      <button
                        type="button"
                        id="table-btns"
                        onClick={() => handleEditClick(item.id)}
                      >
                        <img className="up-del-btn" src={updatebtn} alt="" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        id="table-btns"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <img className="up-del-btn" src={deletebtn} alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {editMode && (
        <EditOrganisedForm
          filteredItem={filteredItem}
          handleClose={() => setEditMode(false)}
          fetchData={fetchData}
          setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
        />
      )}

<Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
        <button className="submitbtn" onClick={handleConfirmDelete} >Delete</button>
          <button className="canclebtn" onClick={() => setDeleteItemId(null)}>Cancel</button>      
        </DialogActions>
      </Dialog>

      {isPopupOpen && (
        <AddOrganisedForm
          handleCloseOrganizedClick={() => setIsPopupOpen(false)}
          fetchData={fetchData}
          setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
        />
      )}
      </>
  );
};

export default CandidateOrganisedForm;
