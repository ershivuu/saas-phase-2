import React, { useEffect, useState } from 'react';
import candidatesApiService from '../../../../candidateService';
import updatebtn from "../../../../../assets/logos/update.png";
import deletebtn from "../../../../../assets/logos/delete.png"
import AddOtherInfoForm from './AddOtherInfoForm';
import EditOtherInfoForm from './EditOtherInfoForm';
import Notification from '../../../../../Notification/Notification';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const CandidateOtherInfoForm = () => {


  const [otherInfoItem, setOtherInfoItem] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [editItemId, setEditItemId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [filteredItem, setFilteredItem] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const fetchData = async () => {
    try {

      const fetchedData = await candidatesApiService.getCandidateMembershipInfo();
      // console.log("response?????????????????", fetchedData);
      setOtherInfoItem(fetchedData);
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

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const handleEditClick = (itemId) => {
    // console.log("id??", itemId);
    const filteredItem = otherInfoItem.find(item => item.id === itemId);
    // console.log("Filtered item:", filteredItem);
    setFilteredItem(filteredItem);
    // setEditItemId(itemId);
    setEditMode(true);
  };
  // const handleCloseOtherInfoClick = () => {
  //   setIsPopupOpen(true);
  // };
  const handleOpenOtherInfoClick = () => {
    setIsPopupOpen(true); // Open popup
  };

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.DeleteOtherInfoForm(deleteItemId);
      fetchData();
      setOtherInfoItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
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
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity} />

      <div className="master-table">
        <div className="flex-btns">
          <p className="candidate-table-heading">Other Information</p>
          <button className="add-btn" onClick={handleOpenOtherInfoClick}>Add OtherInfo</button>
        </div>

        <div className="table-responsive set-programs-tabel">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Membership of University/Institute/Industry Bodies/Professional Bodies</th>
                <th scope="col">Date From</th>
                <th scope="col">Date To</th>
                <th scope="col">Position Held</th>
                <th scope="col">Contribution</th>
                <th scope="col">Edit</th>
                <th scope="col">DELETE</th>
                {/* <th scope="col">DELETE</th> */}
              </tr>
            </thead>
            <tbody>
              {otherInfoItem && otherInfoItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.member_of_institute_name}</td>
                  <td>{formatDate(item.membership_date_from)}</td>
                  <td>{formatDate(item.membership_date_to)}</td>
                  <td>{item.position_held}</td>
                  <td>{item.contribution}</td>
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
      {editMode && <EditOtherInfoForm filteredItem={filteredItem} 
      handleClose={() => setEditMode(false)} fetchData={fetchData}
      setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} 
      setNotificationSeverity={setNotificationSeverity}  />}

<Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
        <button className='submitbtn' onClick={handleConfirmDelete} autoFocus>Delete</button>
          <button className='canclebtn' onClick={() => setDeleteItemId(null)}>Cancel</button>
       
        </DialogActions>
      </Dialog>

      {isPopupOpen && <AddOtherInfoForm handleCloseOtherInfoClick={() => setIsPopupOpen(false)}
       fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} 
       setNotificationSeverity={setNotificationSeverity}  />}
    </>
  );
};

export default CandidateOtherInfoForm;
