import React from "react";
import { Outlet } from "react-router-dom";
import CandidateSidebar from "../CandidateSidebar/CandidateSidebar";
import "./CandidateDashboard.css";
import CandidateHeader from "../CandidateHeader/CandidateHeader";
import Footers from "../../../components/Footer/Footers";
function CandidateDashboard() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: "5em",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <CandidateHeader />
        </div>
        {/*Body start */}
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            margin: 0,
            height: "85vh",
            width: "100%",
          }}
        >
          <div className="sidebar">
            <CandidateSidebar />
          </div>

          <div
            style={{ flexGrow: 1, overflowY: "auto",paddingRight:"50px" }}
            className="edit-form-outlet"
          >
            <Outlet />
          </div>
        </div>
        {/* Body end */}
      </div>

      <Footers></Footers>
    </>
  );
}

export default CandidateDashboard;
