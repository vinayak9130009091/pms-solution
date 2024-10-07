import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import logo from "../Imgs/snplogo.png";
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import iconMapping from "./iconMapping";
import { MdLogout } from "react-icons/md";
import "./sidebar.css";

function Sidebar() {
  const CLIENT_SIDEBAR_API = process.env.REACT_APP_CSIDEBAR_URL;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await axios.get(`${CLIENT_SIDEBAR_API}/api/`);
        setSidebarItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="grid-container">
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isSidebarVisible ? "show" : ""}`}>
        <IconButton onClick={handleToggleSidebar} className="toggle-button">
          {isCollapsed ? <FaChevronCircleRight className="toggle-icon" /> : <FaChevronCircleLeft className="toggle-icon" />}
        </IconButton>

        <Box
          component="aside"
          style={{
            width: isCollapsed ? "50px" : "225px",
            padding: 5,
            transition: "width 0.3s",
          }}
        >
          <Box>
            {!isCollapsed && (
              <Box sx={{ backgroundColor: "#fff", width: "100%", height: "5vh" }}>
                <img style={{ width: "100%", display: "block", height: "10vh" }} src={logo} alt="" />
              </Box>
            )}
          </Box>
          <Box className="sidebar-contents" sx={{ mt: 3 }}>
            <List sx={{ cursor: "pointer" }}>
              {sidebarItems.map((item) => (
                <Box key={item._id}>
                  <ListItem component={Link} to={item.path} className="menu-item">
                    <ListItemIcon sx={{ fontSize: "1.5rem", color: "black" }}>{iconMapping[item.icon] ? React.createElement(iconMapping[item.icon]) : null}</ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.label} sx={{ ml: -2 }} />}
                  </ListItem>
                </Box>
              ))}
            </List>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 15, backgroundColor: "#fff", color: "#000", fontWeight: "bold", width: isCollapsed ? "10%" : "100%", ml: isCollapsed ? -1 : 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                  {!isCollapsed && <span>Logout</span>}
                  <MdLogout color="#000" fontWeight={"bold"} fontSize={"20px"} />
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </aside>
      <main className="main">
        <Box
          component="main"
          sx={{
            padding: 1,
            height: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </main>
    </div>
  );
}
export default Sidebar;
