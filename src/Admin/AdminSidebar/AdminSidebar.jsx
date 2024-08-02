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
  Button,
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
  BusinessCenterIcon as bag,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import ListIcon from "@mui/icons-material/List";

import "./AdminSidebar.css";
import WorkIcon from "@mui/icons-material/Work";
import corusview from "../../assets/logos/corusview.png";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
const AdminSidebar = ({ isOpen, onToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!sidebarOpen) {
      setOpenDropdown("");
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
    navigate("/");
  };
  const handlePlanUpgrade = () => {
    navigate("/super-admin/plan-upgrade");
  };

  const drawer = (
    <div>
      <List sx={{ mt: 10 }}>
        {[
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/admin-dashboard/admin-page",
          },
          {
            text: "Current Opening",
            icon: <WorkIcon />,
            path: "/admin-dashboard/admin-current-opening",
          },
          {
            text: "Interview Schedules",
            icon: <CalendarMonthIcon />,
            path: "/admin-dashboard/admin-interview-schedules",
          },
          {
            text: "Applied Candidates",
            icon: <PeopleAltIcon />,
            path: "/admin-dashboard/admin-applied-candidates",
          },
          {
            text: "Visitors",
            icon: <SwitchAccountIcon />,
            path: "/admin-dashboard/admin-visitors",
          },
          {
            text: "Job Description",
            icon: <WorkHistoryIcon />,
            path: "/admin-dashboard/admin-jd",
          },

          {
            text: "Master List",
            icon: <ListIcon />,
            subItems: [
              {
                text: "Category",
                path: "/admin-dashboard/admin-category",
              },
              {
                text: "Post",
                path: "/admin-dashboard/admin-posts",
              },
              {
                text: "Sub Post",
                path: "/admin-dashboard/admin-subpost",
              },
              {
                text: "Department",
                path: "/admin-dashboard/admin-department",
              },
              {
                text: "Subjects",
                path: "/admin-dashboard/admin-subject",
              },
              {
                text: "Exam Type",
                path: "/admin-dashboard/admin-examtype",
              },
              {
                text: "Degree",
                path: "/admin-dashboard/admin-degree",
              },
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
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton> */}
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleSidebarToggle}
            // sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img className="new-admin-logo" src={corusview} alt="Logo" />
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
              width: sidebarOpen ? 250 : 60,
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
              width: sidebarOpen ? 250 : 60,
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

export default AdminSidebar;
