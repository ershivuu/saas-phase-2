import React, { useEffect, useState } from 'react';
import candidatesApiService from '../../../../candidateService';
import updatebtn  from "../../../../../assets/logos/update.png"
import deletebtn from "../../../../../assets/logos/delete.png";
import AddCandidateConfrenceForm from './AddCandidateConfrenceForm';
import EditConfrencePublicationForm from './EditConfrencePublicationForm';
import Notification from '../../../../../Notification/Notification';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
const ConfrencePublicationForm = () => {

  const [confrenceItem, setConfrenceItem] = useState([])
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
      const fetchedData = await candidatesApiService.getCandidateConferancePublications();
      // console.log("Confrence", fetchedData);
      setConfrenceItem(fetchedData);      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleCloseConfrenceClick = () => {
  //   setIsPopupOpen(true); 
  // };
  const handleOpenConfrenceClick = () => {
    setIsPopupOpen(true);
  };


  const handleEditClick = (itemId) => {
    // console.log("id??",itemId);
    const filteredItem = confrenceItem.find(item => item.id === itemId);
    // console.log("Filtered item:", filteredItem);
    setFilteredItem(filteredItem);
    // setEditItemId(itemId);
    setEditMode(true);
  };
  // const handleClose = () => {    
  //   setEditMode(false);
    
  // };
  const handleDeleteClick = async (itemId) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDelete = async () => {
    try {
      await candidatesApiService.removeCandidateConferancePublications(deleteItemId);
      setConfrenceItem(prevItems => prevItems.filter(item => item.id !== deleteItemId));
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
        <button onClick={handleOpenConfrenceClick}>Add Confrence Publication</button>
      </div> */}
 <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity} />

      <div className="master-table">
        <div className="flex-btns">
        <p className="candidate-table-heading">Confrence Publications</p>
        <button  className="add-btn" onClick={handleOpenConfrenceClick}>Add Confrence Publication</button>
        </div>
       
        <div className="table-responsive set-programs-tabel">

          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Year</th>
                <th scope="col">Title</th>
                <th scope="col">Author Role/ Inventor</th> 
                <th scope="col">Indexing</th> 
                <th scope="col">Confrence Name</th> 
                <th scope="col">ISSN</th> 
                <th scope="col">Volume</th> 
                <th scope="col">Issue</th> 
                <th scope="col">Edit</th> 
                <th scope="col">Delete</th> 
                                               
              </tr>
            </thead>
            <tbody>
              {confrenceItem && confrenceItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.conference_publication_year || "-"}</td>
                  <td>{item.conference_publication_title || "-"}</td>
                  <td>{item.conference_publication_author || "-"}</td>
                  <td>{item.conference_publication_index || "-"}</td>
                  <td>{item.conference_publication_name || "-"}</td>
                  <td>{item.conference_publication_issn || "-"}</td>
                  <td>{item.conference_publication_volume || "-"}</td>
                  <td>{item.conference_publication_issue || "-"}</td>
                 
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
      {editMode && <EditConfrencePublicationForm filteredItem={filteredItem}
       handleClose={() => setEditMode(false)} fetchData={fetchData}
       setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
       />}

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

      {isPopupOpen && <AddCandidateConfrenceForm  handleCloseConfrenceClick={() => setIsPopupOpen(false)} 
      fetchData={fetchData}
      setNotificationOpen={setNotificationOpen} setNotificationMessage={setNotificationMessage} setNotificationSeverity={setNotificationSeverity}
      />}
      </>
  );
};

export default ConfrencePublicationForm;
