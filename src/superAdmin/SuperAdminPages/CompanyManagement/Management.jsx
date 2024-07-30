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
import {
  Typography,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  getCompanyData,
  createAdmin,
  getActivePlan,
} from "../../SuperAdminService";

function Management() {
  const [isColumnLayout, setIsColumnLayout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [timeRemaining, setTimeRemaining] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    company_name: "",
    email: "",
    password: "",
    contact: "",
    subscription_plan: "",
    subdomain: "",
  });
  const [plans, setPlans] = useState([]); // State for subscription plans

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData();
        setCompanies(data.admins);
        setFilteredCompanies(data.admins);

        // Fetch subscription plans
        const plansData = await getActivePlan();
        setPlans(plansData);

        const initialTimeRemaining = {};
        data.admins.forEach((company) => {
          initialTimeRemaining[company.id] = calculateTimeRemaining(
            company.end_date
          );
        });
        setTimeRemaining(initialTimeRemaining);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(formValues);
      setFormValues({
        company_name: "",
        email: "",
        password: "",
        contact: "",
        subscription_plan: "",
        subdomain: "",
      });
      handleDialogClose();
      // Optionally refresh the data
      const data = await getCompanyData();
      setCompanies(data.admins);
      setFilteredCompanies(data.admins);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    return `${day}:${month}:${year}`;
  };
  useEffect(() => {
    let filtered = [...companies];
    const now = new Date();

    // Filter by status (active, inactive, paid)
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

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((company) =>
        company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
  }, [filter, companies, searchTerm]); // Add searchTerm to dependencies

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
          <Button
            variant="contained"
            color="success"
            onClick={handleDialogOpen}
          >
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
                  Reg.Date: <span>{formatDate(company.reg_date)}</span>
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

      {/* Dialog for adding company */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              margin="dense"
              label="Company Name"
              type="text"
              fullWidth
              name="company_name"
              value={formValues.company_name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Contact"
              type="text"
              fullWidth
              name="contact"
              value={formValues.contact}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Subscription Plan</InputLabel>
              <Select
                name="subscription_plan"
                value={formValues.subscription_plan}
                onChange={handleInputChange}
              >
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.plan_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Subdomain"
              type="text"
              fullWidth
              name="subdomain"
              value={formValues.subdomain}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Management;
