import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import {
  Menu,
  Dashboard as DashboardIcon,
  Poll as PollIcon,
  People as PeopleIcon,
  LocationOn as LocationOnIcon,
  Report as ReportIcon,
  ImportExport as ImportExportIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import "./Sidenav.css";
import { getHeaderInfo } from "../../Admin/Services/FrontendServices";
import { Button } from "bootstrap";

const Sidenav = ({ isOpen, onToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { image_url } = await getHeaderInfo();
        setImageUrl(image_url || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sidebarOpen) {
      setOpenDropdown(""); // Close all dropdowns when the sidebar is closed
    }
  }, [sidebarOpen]);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    onToggle();
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    onToggle();
  };

  const handleSidebarOpen = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      onToggle();
    }
  };

  const handleDropdownToggle = (item) => {
    setOpenDropdown(openDropdown === item ? "" : item);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/admin-login");
  };

  const drawer = (
    <div>
      <List sx={{ mt: 10 }}>
        {[
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/admin-dashboard/dashboard",
          },
          {
            text: "White Label",
            icon: <PollIcon />,
            subItems: [
              { text: "Edit Header", path: "/admin-dashboard/EditHeader" },
              { text: "Edit Home Page", path: "/admin-dashboard/EditHomePage" },
              { text: "Home Section 1", path: "/admin-dashboard/Section1" },
              { text: "Home Section 2", path: "/admin-dashboard/Section2" },
              { text: "Home Section 3", path: "/admin-dashboard/Section3" },
              { text: "Home Section 4", path: "/admin-dashboard/Section4" },
              { text: "Home Section 5", path: "/admin-dashboard/Section5" },
              { text: "Edit Faq's", path: "/admin-dashboard/FaqSection" },
              {
                text: "Edit Interview Schedule",
                path: "/admin-dashboard/EditInterviewSchedule",
              },
              { text: "Edit Contact", path: "/admin-dashboard/EditContact" },
              { text: "Edit Footer", path: "/admin-dashboard/EditFooter" },
            ],
          },
          {
            text: "Master Current Opening",
            icon: <PeopleIcon />,
            path: "/admin-dashboard/current-openings",
          },
          {
            text: "Update Job Profiles",
            icon: <LocationOnIcon />,
            path: "/admin-dashboard/job-profile",
          },
          {
            text: "Master Interview Schedule",
            icon: <ReportIcon />,
            path: "/admin-dashboard/interview-schedule",
          },
          {
            text: "Reports",
            icon: <PollIcon />,
            subItems: [
              { text: "Applied Candidates", path: "/admin-dashboard/reports" },
            ],
          },
          {
            text: "Visitors Report",
            icon: <ImportExportIcon />,
            path: "/admin-dashboard/admin_visitors_reports",
          },
          {
            text: "Master List",
            icon: <PollIcon />,
            subItems: [
              {
                text: "Post Applied For",
                path: "/admin-dashboard/add-post-applied",
              },
              {
                text: "Sub Post Applied For",
                path: "/admin-dashboard/add-sub-post-applied",
              },
              { text: "Departments", path: "/admin-dashboard/add-departments" },
              { text: "Exam Type", path: "/admin-dashboard/add-exam-type" },
              { text: "Degree", path: "/admin-dashboard/add-degree" },
              { text: "Categories", path: "/admin-dashboard/add-categories" },
              { text: "Add Subject", path: "/admin-dashboard/add-subjects" },
            ],
          },
          {
            text: "Register Admin",
            icon: <ImportExportIcon />,
            path: "/admin-dashboard/admin_register",
          },
          {
            text: "Super Admin",
            icon: <PollIcon />,
            subItems: [
              { text: "Admin list", path: "/admin-dashboard/admin-list" },
              { text: "Rights List", path: "/admin-dashboard/right-list" },
              { text: "Role List", path: "/admin-dashboard/role-list" },
            ],
          },
        ].map((item, index) => (
          <div key={item.text}>
            <ListItem
              button
              onClick={() => item.subItems && handleDropdownToggle(item.text)}
              component={NavLink}
              to={item.path}
              exact
            >
              <ListItemIcon onClick={handleSidebarOpen}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
              {item.subItems ? (
                openDropdown === item.text ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openDropdown === item.text}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      component={NavLink}
                      to={subItem.path}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
        }}
        // onClick={onToggle}
      >
        {isOpen ? "" : ""}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img className="new-admin-logo" src={imageUrl} alt="Logo" />
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            sx={{ ml: 2 }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarOpen ? 240 : 60,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarOpen ? 240 : 60,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <main style={{ flexGrow: 1, padding: "24px" }}>
        <Toolbar />
      </main>
    </div>
  );
};

export default Sidenav;
