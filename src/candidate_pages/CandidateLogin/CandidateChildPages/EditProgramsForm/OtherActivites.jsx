import React, { useEffect, useState } from 'react';

import candidatesApiService from '../../../candidateService';
import Notification from '../../../../Notification/Notification';
const OtherActivites = () => {
    const [data, setData] = useState({})
    const [updateField, setUpdateField] = useState({});
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setNotificationSeverity] = useState("info");
    const fetchCandidateData = async () => {
        try {
            // setLoading(true);
            const fetchedData = await candidatesApiService.getCandidateById();
            setData(fetchedData)
            // console.log("fetchedData", fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {

        fetchCandidateData();
    }, []);



    const handleChange = (fieldName, value) => {
        // console.log("handlefild", fieldName, value, updateField);
        setUpdateField((prev) => ({ ...prev, [fieldName]: value.toString() }));
        setData((prev) => ({ ...prev, [fieldName]: value.toString() }));
    };
    const handleSaveChanges = async () => {
        try {
            const response =     await candidatesApiService.updateCandidatePersonalInfo(updateField);
            // console.log("Data updated successfully");
            if (response) {
                setNotificationMessage(`added successfully`);
                setNotificationSeverity("success");
                setNotificationOpen(true);
              
              }
            
        fetchCandidateData();
        } catch (error) {
            console.error("Error updating data:", error.message);
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

            <p className="SCA-heading">Other Activites</p>
            <form onSubmit={handleSaveChanges}>
                <div className="row" style={{ marginTop: "-30px" }}>
                    <div className="col-md-12">
                        {/* Awards/Recognitions Won, If any*/}
                        <div className="UD-form-section">
                            <label className="UD-SetLabel-Name">
                                <span></span>Awards/Recognitions Won, If any
                            </label>
                            <input
                                style={{ width: "99.5%" }}
                                className="UD-set-input"
                                type="text"
                                placeholder=""
                                name="awards_won"
                                id=""
                                value={data.awards_won}
                                onChange={(e) => handleChange("awards_won", e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "-30px" }}>
                    <div className="col-md-12">
                        {/*Brief Description of Co-curricular and Extra-Curricular Activities*/}
                        <div className="UD-form-section">
                            <label className="UD-SetLabel-Name">
                                <span></span>Brief Description of Co-curricular and
                                Extra-Curricular Activities
                            </label>
                            <input
                                style={{ width: "99.5%" }}
                                className="UD-set-input"
                                type="text"
                                placeholder=""
                                name="extra_activities"
                                id=""
                                value={data.extra_activities}
                                onChange={(e) =>
                                    handleChange("extra_activities", e.target.value)
                                }
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "-20px" }}>
                    <div className="col-md-12">
                        {/*Any Other Relevant Information You May Like To Furnish Especially About Citation Of Your Research Work*/}
                        <div className="UD-form-section">
                            <label className="UD-SetLabel-Name">
                                <span></span>Any Other Relevant Information You May Like To
                                Furnish Especially About Citation Of Your Research Work
                            </label>
                            <input
                                style={{ width: "99.5%" }}
                                className="UD-set-input"
                                type="text"
                                placeholder=""
                                name="any_other_info"
                                id=""
                                value={data.any_other_info}
                                onChange={(e) =>
                                    handleChange("any_other_info", e.target.value)
                                }
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "-30px" }}>
                    <div className="col-md-12">
                        {/*Period For Joining The Post, If Selected*/}
                        <div className="UD-form-section">
                            <label className="UD-SetLabel-Name">
                                <span></span>Period For Joining The Post, If Selected
                            </label>
                            <input
                                style={{ width: "99.5%" }}
                                className="UD-set-input"
                                type="text"
                                placeholder=""
                                name="expected_joining_time"
                                id=""
                                value={data.expected_joining_time}
                                onChange={(e) =>
                                    handleChange("expected_joining_time", e.target.value)
                                }
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="edit-save-btn">
                    <button
                        className="savebtn"
                        type="button"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
};

export default OtherActivites;
