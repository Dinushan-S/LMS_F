import React, { useState, useEffect } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function AdminTopbar({authorized}) {

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setImage(storedImage);
      console.log("image",storedImage);
    }
  }, []);
  

  const handleIconClick = () => {
    const id = localStorage.getItem("id");

    navigate(`/users/admin/profile/${id}`);
  };
  
  

  
  if(!authorized){
    <Navigate to="/login  " replace={true} />
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2} backgroundColor='#23408B' >
      {/* search bar */}
      <Box
        display="flex"
        backgroundColor={'white'}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex"  >

        {/* <IconButton  style={{ color: 'white' }}onClick={colorMode.toggleColorMode}  color="primary">
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton> */}

        <IconButton style={{ color: 'white' }}>
          <NotificationsActiveIcon />
        </IconButton>

        <IconButton style={{ color: 'white' }}>
          <SettingsApplicationsIcon />
        </IconButton>

        <IconButton style={{ color: 'white' }}
        onClick={handleIconClick}>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>
    // icons
  );
}
