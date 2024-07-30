import React, { useEffect, useState } from 'react';
import candidatesApiService from '../../../../candidateService';
import updatebtn  from "../../../../../assets/logos/update.png"
import deletebtn from "../../../../../assets/logos/delete.png";
import AddCandidatePatentsForm from './AddCandidatePatentsForm';
import EditCandidatePatentsForm from './EditCandidatePatentsForm';
import Notification from '../../../../../Notification/Notification';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const PatentsForm = () => {
  const [patentItem, setPatentItem] = useState([]);
  const [filteredItem, setFilteredItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [deleteItemId, setDeleteItemId] = useState(null);

  const fetchData = async () => {
    try {      
      const fetchedData = await candidatesApiService.getCandidatePatent();
      // console.log("patent", fetchedData);
      setPatentItem(fetchedData);
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenpatentClick = () => {
    setIsPopupOpen(true);
  };

  const handleEditClick = (itemId) => {
    const filteredItem = patentItem.find(item => item.id === itemId);
    setFilteredItem(filteredItem);
    setEditMode(true);
  };

  const handleDeleteClick = async (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.removeCandidatePatent(deleteItemId);
      setPatentItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
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
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity} />
      <div className="master-table">
        <div className="flex-btns">
          <p className="candidate-table-heading">Patents</p>
          <button className="add-btn" onClick={handleOpenpatentClick}>Add Patents</button>
        </div>
        <div className="table-responsive set-programs-tabel">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Application ID</th>
                <th scope="col">Title</th>
                <th scope="col">Year</th> 
                <th scope="col">Published/Granted</th> 
                <th scope="col">Country</th>                
                <th scope="col">Edit</th> 
                <th scope="col">Delete</th> 
              </tr>
            </thead>
            <tbody>
              {patentItem && patentItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.patent_applicationid || "-"}</td>
                  <td>{item.patent_application_title || "-"}</td>
                  <td>{item.patent_application_year || "-"}</td>                
                  <td>{item.patent_granted_by || "-"}</td>
                  <td>{item.patent_incountry || "-"}</td>            
                 
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
      {editMode && <EditCandidatePatentsForm filteredItem={filteredItem}
       handleClose={() => setEditMode(false)} fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}/>}
      <Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <button className='submitbtn'  onClick={handleConfirmDelete} >Delete</button>
          <button className='canclebtn' onClick={() => setDeleteItemId(null)}>Cancel</button>
        </DialogActions>
      </Dialog>
      {isPopupOpen && <AddCandidatePatentsForm  handleClosePatentClick={() => setIsPopupOpen(false)} fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
      />}
    </>
  );
};

export default PatentsForm;
