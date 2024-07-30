import React, { useEffect, useState } from 'react';
import candidatesApiService from '../../../../candidateService';
import updatebtn  from "../../../../../assets/logos/update.png"
import deletebtn from "../../../../../assets/logos/delete.png"
import AddCandidateExperienceForm from './AddCandidateExperienceForm';
import EditCandidateExperienceForm from './EditCandidateExperienceForm';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Notification from '../../../../../Notification/Notification';

const ExperienceForm = () => {

  const [experienceItem, setexperienceItem] = useState([])
  const [filteredItem, setFilteredItem] = useState(null);
  // const [editItemId, setEditItemId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [deleteItemId, setDeleteItemId] = useState(null);
 
  const fetchData = async () => {
    try {
     
      const fetchedData = await candidatesApiService.getCandidateExperience();
      // console.log("check response",fetchedData)
      setexperienceItem(fetchedData);

    } catch (error) {
      console.error("Error fetching data:", error.message);
   
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenExperienceClick = () => {
    setIsPopupOpen(true); // Open popup
  };
  // const handleCloseexperienceClick = () => {
  //   setIsPopupOpen(true); 
  // };
  const handleEditClick = (itemId) => {
    // console.log("id??",itemId);
    const filteredItem = experienceItem.find(item => item.id === itemId);
    // console.log("Filtered item:", filteredItem);
    setFilteredItem(filteredItem);
    // setEditItemId(itemId);
    setEditMode(true);
  };
  // const handleClose = () => {    
  //   setEditMode(false);
    
  // };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const handleDeleteClick = async (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.removeCandidateExperience(deleteItemId);
      setexperienceItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
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
      <div className="master-table" >
        <div className="flex-btns">
        <p className="candidate-table-heading">Experience</p>
        <button className="add-btn" onClick={handleOpenExperienceClick}>Add Experience</button>
        </div>


        <div className="table-responsive set-programs-tabel">

          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Name of Institute / Company</th>
                <th scope="col">Designation</th>
                <th scope="col">Current Gross Pay(per month)</th>
                <th scope="col">Date From</th>
                <th scope="col">Date To</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                
              </tr>
            </thead>
            <tbody>
              {experienceItem && experienceItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.company_experience_name}</td>
                  <td>{item.designation}</td>
                  <td>{item.gross_pay}</td>
                  <td>{formatDate(item.exp_work_from)}</td>
                  <td>{formatDate(item.exp_work_to)}</td>
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
      {editMode && <EditCandidateExperienceForm filteredItem={filteredItem}
       handleClose={() => setEditMode(false)} fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
       />}

<Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
        <button className='submitbtn' onClick={handleConfirmDelete} >Delete</button>
          <button className='canclebtn' onClick={() => setDeleteItemId(null)}>Cancel</button>
        </DialogActions>
      </Dialog>

      {isPopupOpen && <AddCandidateExperienceForm  handleCloseExperienceClick={() => setIsPopupOpen(false)} fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
       />}
      </>
  );
};

export default ExperienceForm;
