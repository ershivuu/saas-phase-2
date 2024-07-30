import React, { useState, useEffect } from "react";
import adminApiService from "../adminApiService";
import Notification from "../../Notification/Notification";
import "./CurrentOpening.css";

function NonAcademictable() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");

  const [jobProfiles, setJobProfiles] = useState([]);

  let tokenFromsessionStorage = sessionStorage.getItem("Token");
  tokenFromsessionStorage = JSON.parse(tokenFromsessionStorage);
  // const accessToken = tokenFromsessionStorage?.token || "";

  // const [token, setToken] = useState(tokenFromsessionStorage || "");

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await adminApiService.getJobProfile();
        // console.log("fetch response.data", response.data);
        setJobProfiles(response.data);
      } catch (error) {
        console.error("Error fetching job profiles:", error);
      }
    };

    fetchJobProfiles();
  }, []);

  const handleApply = async (data) => {
    // console.log("Selected Job Profile:", data);
    const requestData = {
      applied_post_masters_id: data.applied_post_masters_id,
      job_category_master_id: data.job_category_master_id,
      department_master_id: data.department_master_id,
      job_profile_master_id: data.job_profile_master_id,
    };

    try {
      await adminApiService.addApplied(requestData); // Use adminApiService
      // console.log("Response:", response);
      // alert("Post Applied Successfully");
      setNotificationMessage("Post Applied Successfully");
      setNotificationSeverity("success");
      setShowNotification(true);
    } catch (error) {
      // alert("you already applied",)
      setNotificationMessage("You already applied");
      setNotificationSeverity("error");
      setShowNotification(true);
      console.error("Error applying:", error);
    }
  };

  const [page, setPage] = useState(1);

  const rowsPerPage = 100;

  const AcademicTable = jobProfiles

    .filter((profile) => {
      // console.log(profile,"<<<<<<")
      return (
        profile.publish_to_vacancy &&
        profile.job_category_master?.category_name === "non-academic"
      );
    })
    .map((profile) => ({
      job_profile_master_id: profile.id,
      applied_post_masters_id: profile.applied_post_masters_id,
      job_category_master_id: profile.job_category_master_id,
      department_master_id: profile.department_master_id ?? "N/A",
      category: profile.job_category_master?.category_name ?? "N/A",
      post: profile.applied_post_master?.post_name ?? "N/A",
      department: profile.department_master?.dept_name ?? "N/A",
      applyLink: "/non-academic-form",
      lastDate: profile.last_date_to_apply ?? "N/A",
    }));
  // console.log("AcademicTable:", AcademicTable);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const AcademicData = AcademicTable.slice(startIndex, endIndex);

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return "";
    }
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <Notification
        open={showNotification}
        handleClose={() => setShowNotification(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />

      <div className="academic-table">
        <p className="table-heading">NON-ACADEMICS</p>
        <div className="table-responsive">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Post</th>
                <th scope="col">Detartment</th>
                <th scope="col">Apply</th>
                <th scope="col">Last Date</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "capitalize" }}>
              {AcademicData.map((data, index) => (
                <tr key={index} style={{ whiteSpace: "nowrap" }}>
                  <td>{data.category}</td>
                  <td>{data.post}</td>
                  <td>{data.department}</td>
                  <td>
                    {!tokenFromsessionStorage && (
                      <button className="apn-btn">
                        {" "}
                        <a href={data.applyLink}>APPLY NOW</a>
                      </button>
                    )}

                    {tokenFromsessionStorage && (
                      <button
                        type="button"
                        className="apn-btn"
                        onClick={() => handleApply(data, data.id)}
                      >
                        APPLY NOW
                      </button>
                    )}
                  </td>

                  <td>{formatDateForInput(data.lastDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(AcademicTable.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
              />
            </Stack>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default NonAcademictable;
