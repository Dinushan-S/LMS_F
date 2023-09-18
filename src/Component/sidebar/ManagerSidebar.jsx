import { useState } from "react";
import { Sidebar, Menu, MenuItem,  } from "react-pro-sidebar";
import { Box, IconButton, Typography,  } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ApprovalIcon from "@mui/icons-material/Approval";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ImageProfile from "./ImageProfile";

export default function ManagerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageData, setImageData] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the local storage or perform any other necessary cleanup
    localStorage.clear();
    // Redirect to the login page or any other desired page
    navigate("/");
  };

  // useEffect(() => {
  //   const fetchUserImage = async () => {
  //     try {
  //       const id = localStorage.getItem("id");

  //       const response = await axios.get(
  //         `https://localhost:7185/api/Profile/users/${id}/image`,
  //         {
  //           responseType: "arraybuffer", // Set the responseType to arraybuffer to get binary data
  //         }
  //       );

  //       if (response.status === 200) {
  //         // Convert the binary data to base64-encoded image data using FileReader
  //         const blob = new Blob([response.data], {
  //           type: response.headers["content-type"],
  //         });
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           setImageData(reader.result);
  //         };
  //         reader.readAsDataURL(blob);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       // Handle errors if necessary
  //     }
  //   };

  //   fetchUserImage();
  // }, []);



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
                <MenuOutlinedIcon
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
                  <MenuOutlinedIcon style={{ color: "whitesmoke" }} />
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
              to="/users/manager/employee"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Employee
            </Link>
          </MenuItem>
          <MenuItem
            icon={<ApprovalIcon />}
            className="custom-menu-item" // Apply the custom class
            sx={{
              borderRadius: "12px",
            }}
          >
            <Link
              to="/users/manager/leaves"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Staff Leaves
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
              to="/users/manager/applyLeave"
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
              to="/users/manager/myLeaves"
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
