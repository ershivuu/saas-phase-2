import React, { useState, useEffect } from "react";
import "./Management.css";
import bluebag from "../../../assets/logos/superadmin/blue.png";
import greenbag from "../../../assets/logos/superadmin/green.png";
import redbag from "../../../assets/logos/superadmin/red.png";
import yellowbag from "../../../assets/logos/superadmin/yellow.png";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, InputBase, Button } from "@mui/material";
import { getCompanyData } from "../../SuperAdminService";

function Management() {
  const [isColumnLayout, setIsColumnLayout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filter, setFilter] = useState("all");

  // State to store remaining time for each company
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData();
        setCompanies(data.admins);
        setFilteredCompanies(data.admins);
        // Initialize time remaining for each company
        const initialTimeRemaining = {};
        data.admins.forEach((company) => {
          initialTimeRemaining[company.id] = calculateTimeRemaining(
            company.end_date
          );
        });
        setTimeRemaining(initialTimeRemaining);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...companies];
    const now = new Date();

    if (filter === "active") {
      filtered = filtered.filter((company) => company.is_active);
    } else if (filter === "inactive") {
      filtered = filtered.filter(
        (company) =>
          !company.is_active &&
          new Date(company.last_login) <
            new Date(now.setDate(now.getDate() - 15))
      );
    } else if (filter === "paid") {
      filtered = filtered.filter((company) => company.is_paid);
    }

    setFilteredCompanies(filtered);
  }, [filter, companies]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeRemaining = {};
      filteredCompanies.forEach((company) => {
        updatedTimeRemaining[company.id] = calculateTimeRemaining(
          company.end_date
        );
      });
      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [filteredCompanies]);

  const handleColumnLayout = () => setIsColumnLayout(true);
  const handleGridLayout = () => setIsColumnLayout(false);

  const buttonStyle = (view) => ({
    backgroundColor:
      !isColumnLayout && view === "grid"
        ? "green"
        : isColumnLayout && view === "column"
        ? "green"
        : "transparent",
    color:
      !isColumnLayout && view === "grid"
        ? "white"
        : isColumnLayout && view === "column"
        ? "white"
        : "inherit",
    borderRadius: "4px",
    padding: "5px",
  });

  const companyListStyle = {
    display: "flex",
    flexDirection: isColumnLayout ? "column" : "row",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  };

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(
    (company) => company.is_active
  ).length;
  const inactiveCompanies = companies.filter(
    (company) => !company.is_active
  ).length;
  const paidCompanies = companies.filter((company) => company.is_paid).length;

  // Function to calculate time remaining
  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) return "Expired";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div className="page-header">
        <div className="search-container">
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="add-company-btn">
          <Button variant="contained" color="success">
            Add Company
          </Button>
        </div>
        <div className="view-btns">
          <Typography>View</Typography>
        </div>
        <div>
          <IconButton style={buttonStyle("grid")} onClick={handleGridLayout}>
            <ViewModuleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            style={buttonStyle("column")}
            onClick={handleColumnLayout}
          >
            <ViewListIcon />
          </IconButton>
        </div>
      </div>
      <div className="company-status">
        <div className="status-card" onClick={() => setFilter("all")}>
          <div className="status-img">
            <img src={bluebag} alt="" />
          </div>
          <div>
            <p>Total Company</p>
            <p>{totalCompanies}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("active")}>
          <div className="status-img">
            <img src={greenbag} alt="" />
          </div>
          <div>
            <p>Active Company</p>
            <p>{activeCompanies}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("inactive")}>
          <div className="status-img">
            <img src={redbag} alt="" />
          </div>
          <div>
            <p>Inactive Company</p>
            <p>{inactiveCompanies}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("paid")}>
          <div className="status-img">
            <img src={yellowbag} alt="" />
          </div>
          <div>
            <p>Paid Company</p>
            <p>{paidCompanies}</p>
          </div>
        </div>
      </div>
      <div className="company-list" style={companyListStyle}>
        {filteredCompanies.map((company) => (
          <div className="company-details" key={company.id}>
            <div className="all-details">
              <div className="company-logo">
                <img src={bluebag} alt="" />
              </div>
              <div className="company-other-details">
                <p>Name : {company.company_name}</p>
                <p>Subdomain : {company.subdomain}</p>
                <p>
                  Duration: <span>{company.subscription_plan.duration}</span>
                </p>
                <p>
                  Reg.Date: <span>{company.reg_date}</span>
                </p>
              </div>
              <div className="del-buttons">
                <IconButton color="error" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton color="primary" aria-label="view">
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
            <div className="current-plan">
              <div>
                {company.subscription_plan.name ? (
                  <>
                    <p>{company.subscription_plan.name}</p>
                    <p>Plan Name</p>
                    <div>
                      <p>
                        {timeRemaining[company.id] ||
                          calculateTimeRemaining(company.end_date)}
                      </p>
                      <p>Time Remaining</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p>No Plan</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Management;
