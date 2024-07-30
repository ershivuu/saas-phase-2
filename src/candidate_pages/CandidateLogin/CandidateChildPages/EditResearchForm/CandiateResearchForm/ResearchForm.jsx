import React, { useEffect, useState } from 'react';
import candidatesApiService from '../../../../candidateService';
import updatebtn from '../../../../../assets/logos/update.png';
import deletebtn from '../../../../../assets/logos/delete.png';
import AddCandidateResearchForm from './AddCandidateResearchForm';
import EditCandidateResearchForm from './EditCandidateResearchForm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Notification from '../../../../../Notification/Notification';

const ResearchForm = () => {
  const [researchItem, setResearchItem] = useState([]);
  const [filteredItem, setFilteredItem] = useState(null);
  // const [editItemId, setEditItemId] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Used in handleOpenResearchClick
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  const [deleteItemId, setDeleteItemId] = useState(null); // Used in handleDeleteClick

  const fetchData = async () => {
    try {      
      const fetchedData = await candidatesApiService.getCandidateResearch();
      // console.log("research", fetchedData);
      setResearchItem(fetchedData);  
    } catch (error) {
      console.error("Error fetching data:", error.message); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenResearchClick = () => {
    setIsPopupOpen(true);
  };

  const handleEditClick = (itemId) => {
    // console.log("id??", itemId);
    const filteredItem = researchItem.find(item => item.id === itemId);
    // console.log("Filtered item:", filteredItem);
    setFilteredItem(filteredItem);
    // setEditItemId(itemId);
    setEditMode(true);
  };

  const handleDeleteClick = async (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.DeleteResearchForm(deleteItemId);
      setResearchItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
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
        alertSeverity={notificationSeverity}
      />
      <div className="master-table">
        <div className="flex-btns">
          <p className="candidate-table-heading">Research Work</p>
          <button className="add-btn" onClick={handleOpenResearchClick}>Add Research</button>
        </div>
        <div className="table-responsive set-programs-tabel">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">ORCID Id</th>
                <th scope="col">Scopus Id</th>
                <th scope="col">Research Id</th> 
                <th scope="col">Edit</th> 
                <th scope="col">Delete</th> 
              </tr>
            </thead>
            <tbody>
              {researchItem && researchItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.orcid}</td>
                  <td>{item.scopusid}</td>
                  <td>{item.researchid}</td>
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
      {editMode && <EditCandidateResearchForm filteredItem={filteredItem}
        handleClose={() => setEditMode(false)}
        fetchData={fetchData}
        setNotificationOpen={setNotificationOpen}
        setNotificationMessage={setNotificationMessage}
        setNotificationSeverity={setNotificationSeverity}
      />}
      <Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <button className='submitbtn' onClick={handleConfirmDelete}>Delete</button>
          <button className='canclebtn' onClick={() => setDeleteItemId(null)}>Cancel</button>
        </DialogActions>
      </Dialog>
      {isPopupOpen && <AddCandidateResearchForm handleCloseResearchClick={() => setIsPopupOpen(false)}
        fetchData={fetchData}
        setNotificationOpen={setNotificationOpen}
        setNotificationMessage={setNotificationMessage}
        setNotificationSeverity={setNotificationSeverity}
      />}
    </>
  );
};

export default ResearchForm;
