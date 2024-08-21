import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

function AdminDashboard() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          position: "relative",
          margin: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "30%",
            flexShrink: 0,
            textAlign: "left",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <AdminSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            marginLeft: isSidebarOpen ? "0px" : "150px",
            transition: "margin-left 0.3s ease",
            marginTop: "80px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
