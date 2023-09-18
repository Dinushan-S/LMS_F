import { useState } from "react";
import { Sidebar, Menu, MenuItem,  } from "react-pro-sidebar";
import { Box, IconButton, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from "@mui/icons-material/Logout";

import "./styles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import ImageProfile from "./ImageProfile";
import axios from "axios";
import { useEffect } from "react";

export default function EmployeeSidebae() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [imageData, setImageData] = useState(null);
  
    const navigate = useNavigate();
    const handleLogout = () => {
      // Clear the local storage or perform any other necessary cleanup
      localStorage.clear();
      // Redirect to the login page or any other desired page
      navigate("/");
    };
  
   

  
    const accountType = parseInt(localStorage.getItem("accountType"));
    let accountTypeName = "";
  
    if (accountType === 0) {
      accountTypeName = "ADMIN";
    } else if (accountType === 1) {
      accountTypeName = "MANAGER";
    } else if (accountType === 2) {
      accountTypeName = "STAFF";
    } else {
      accountTypeName = "";
    }
  
    return (
      <Box
        sx={{
          backgroundColor: "#23408B",
  
          // padding: "0px 35px 500px 20px ",
          // color: "#868dfb !important",
        }}
        style={{
          height: "900px", // Replace with your desired width value
          // Add other styles if needed
        }}
      >

        <Sidebar
          collapsed={isCollapsed}
          // backgroundColor='red'
          backgroundColor="#23408B"
          mb="100px"
          width="220px"
        >
          <Menu
            menuItemStyles={{
              button: {
                backgroundColor: "#23408B",
                "&:hover": {
                  backgroundColor: "white",
                },
              },
            }}
          >
            <MenuItem
              className="custom-menu-item" // Apply the custom class
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={
                isCollapsed ? (
                  <PersonIcon
                    sx={{ color: isCollapsed ? "white" : "red" }}
                  />
                ) : undefined
              }
              sx={{
                "&:hover": {
                  color: "red",
                  // Add any other hover styles you want
                },
              }}
              style={{
                margin: "10px 0 20px 0",
                // color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h6" color={"red"}>
                    {accountTypeName}
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <PersonIcon style={{ color: "whitesmoke" }} />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!isCollapsed && (
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <ImageProfile imageData={imageData} /> */}
  
                {!isCollapsed}
                {/* <ImageProfile imageData={imageData} /> */}
              </Box>
            )}
            {/* menu item */}
            <MenuItem
              icon={<DashboardIcon />}
              className="custom-menu-item" // Apply the custom class
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
              >
                DashBoard
              </Link>
            </MenuItem>

            <MenuItem
              icon={<HomeIcon />}
              className="custom-menu-item" // Apply the custom class
              sx={{
                borderRadius: "12px",
              }}
            >
              Home
            </MenuItem>
  
           
           
            <MenuItem
              icon={<PersonIcon />}
              className="custom-menu-item" // Apply the custom class
              sx={{
                borderRadius: "12px",
              }}
            >
              <Link
                to="/users/staff/applyLeave"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Apply Leave
              </Link>
            </MenuItem>
            <MenuItem
              icon={<PersonIcon />}
              className="custom-menu-item" // Apply the custom class
              sx={{
                borderRadius: "12px",
              }}
            >
              <Link
                to="/users/staff/myLeaves"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                My Leaves
              </Link>
            </MenuItem>
            <MenuItem
              icon={<SummarizeIcon />}
              className="custom-menu-item" // Apply the custom class
              sx={{
                borderRadius: "12px",
              }}
            >
              Report
            </MenuItem>
            <MenuItem
              icon={<LogoutIcon />}
              className="custom-menu-item" // Apply the custom class
              sx={{
                borderRadius: "12px",
              }}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
            <Box padding={isCollapsed ? undefined : "10%"}></Box>
          </Menu>
        </Sidebar>
      </Box>
    );
  }
  