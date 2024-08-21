import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../Services/AdminServices";
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
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import "./AdminSidebar.css";
import WorkIcon from "@mui/icons-material/Work";
import corusview from "../../assets/logos/corusview.png";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
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

  // const handleLogout = () => {
  //   sessionStorage.removeItem("Token");
  //   sessionStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("Token");
  //   localStorage.removeItem("isLoggedIn");
  //   navigate("/");
  // };
  const handleLogout = async () => {
    try {
      // Call the API to log out
      await logoutAdmin();
    } catch (error) {
      // Optionally handle the error (e.g., show a notification)
    } finally {
      // Clear session and local storage
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("isLoggedIn");
      localStorage.removeItem("Token");
      localStorage.removeItem("isLoggedIn");
      // Navigate to login or home page
      navigate("/");
    }
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
            text: "Job Description",
            icon: <WorkHistoryIcon />,
            path: "/admin-dashboard/admin-jd",
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
            text: "Master List",
            icon: <FeaturedPlayListIcon />,
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
          {
            text: "White Label",
            icon: <CollectionsBookmarkIcon />,
            subItems: [
              {
                text: "Header",
                path: "/admin-dashboard/edit-header",
              },
              {
                text: "Footer",
                path: "/admin-dashboard/edit-footer",
              },
              {
                text: "Contact",
                path: "/admin-dashboard/edit-contact",
              },
              {
                text: "Interview ",
                path: "/admin-dashboard/edit-interviews",
              },
              {
                text: "FAQ",
                path: "/admin-dashboard/edit-faq",
              },
              {
                text: "Home",
                path: "/admin-dashboard/edit-home",
              },
              {
                text: "Home S1",
                path: "/admin-dashboard/edit-section-1",
              },
              {
                text: "Home S2",
                path: "/admin-dashboard/edit-section-2",
              },
              {
                text: "Home S3",
                path: "/admin-dashboard/edit-section-3",
              },
              {
                text: "Home S4",
                path: "/admin-dashboard/edit-section-4",
              },
              {
                text: "Home S5",
                path: "/admin-dashboard/edit-section-5",
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
      >
        {isOpen ? "" : ""}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleSidebarToggle}
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
            keepMounted: true,
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
