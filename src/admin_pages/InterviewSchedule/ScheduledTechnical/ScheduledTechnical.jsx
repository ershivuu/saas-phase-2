import React, { useState, useEffect } from "react";
import "./ScheduledTechnical.css";
import adminApiService from "../../adminApiService";

function ScheduledTechnical() {
  const [jobProfiles, setJobProfiles] = useState([]);

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await adminApiService.getJobProfile();
        // console.log("response get", response.data);
        setJobProfiles(response.data);
      } catch (error) {
        console.error("Error fetching job profiles:", error);
      }
    };

    fetchJobProfiles();
  }, []);

  const [page] = useState(1);
  const rowsPerPage = 10;

  const ScheduledAcademicsTable = jobProfiles
    .filter((profile) => profile.publish_to_schedule_interview)
    .map((profile) => ({
      eligibility_criteria: profile.eligibility_criteria || "N/A",
      department: profile.department_master?.dept_name || "N/A",
      post: profile.applied_post_master?.post_name || "N/A",
      lastDate: profile.last_date_to_apply || "N/A",
      schedule_interview_date_1: profile.schedule_interview_date_1 || "N/A",
      schedule_interview_date_2: profile.schedule_interview_date_2 || "N/A",
      schedule_interview_date_3: profile.schedule_interview_date_3 || "N/A",
    }));
  // console.log("ScheduledAcademicsTable", ScheduledAcademicsTable)
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const ScheduledAcademicData = ScheduledAcademicsTable.slice(
    startIndex,
    endIndex
  );
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

  const isDateBeforeToday = (dateString) => {
    const dateObject = new Date(dateString);
    const today = new Date();
    return dateObject < today;
  };
  return (
    <>
      <div className="SCA-table">
        <p className="SCA-heading">Technical</p>
        <p className="table-des">A descriptive body text comes here</p>

        <div className="table-responsive">
          <table className="table is-table">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }}>
              <tr>
                <th scope="col">S.No </th>
                <th scope="col">Department </th>
                <th scope="col">Post </th>
                <th scope="col">Eligibility criteria </th>
                <th scope="col">Day 1 </th>
                <th scope="col">Day 2 </th>
                <th scope="col">Day 3 </th>
              </tr>
            </thead>
            <tbody>
              {/* {ScheduledAcademicData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <b> {data["S.No"]} </b>
                  </td>
                  <td>{data["Discipline / Subject"]}</td>
                  <td>{data["Eligibility criteria"]}</td>
                  <td>{data["Day 1"]}</td>
                  <td>{data["Day 2"]}</td>
                  <td>{data["Day 3"]}</td>
                </tr>
              ))} */}
              {ScheduledAcademicData.map((data, index) => (
                <tr key={index} style={{ whiteSpace: "nowrap" }}>
                  <td>
                    <b>{index + 1}</b>
                  </td>
                  <td>{data.department}</td>
                  <td>{data.post}</td>
                  <td>{data.eligibility_criteria}</td>
                  {/* <td>{formatDateForInput(data.schedule_interview_date_1)}</td>
                  <td>{formatDateForInput(data.schedule_interview_date_2)}</td>
                  <td>{formatDateForInput(data.schedule_interview_date_3)}</td> */}
                  <td
                    style={{
                      color: isDateBeforeToday(data.schedule_interview_date_1)
                        ? "red"
                        : "inherit",
                    }}
                  >
                    {formatDateForInput(data.schedule_interview_date_1)}
                  </td>
                  <td
                    style={{
                      color: isDateBeforeToday(data.schedule_interview_date_2)
                        ? "red"
                        : "inherit",
                    }}
                  >
                    {formatDateForInput(data.schedule_interview_date_2)}
                  </td>
                  <td
                    style={{
                      color: isDateBeforeToday(data.schedule_interview_date_3)
                        ? "red"
                        : "inherit",
                    }}
                  >
                    {formatDateForInput(data.schedule_interview_date_3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {/* <Stack spacing={2}>
              <Pagination
                count={Math.ceil(ScheduledAcademicsTable.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
              />
            </Stack> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduledTechnical;
