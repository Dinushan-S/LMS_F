import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageProfile = ({ imageData }) => {
    const [imageDatas, setImageData] = useState(""); // Base64-encoded image data

    useEffect(() => {
        const fetchUserImage = async () => {
          try {
            const id = localStorage.getItem("id");
            const authToken = localStorage.getItem("token");

    
            const response = await axios.get(
              `https://localhost:7185/api/Profile/users/${id}/image`,
              {
                responseType: "arraybuffer", // Set the responseType to arraybuffer to get binary data
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
    
            if (response.status === 200) {
              // Convert the binary data to base64-encoded image data using FileReader
              const blob = new Blob([response.data], { type: response.headers["content-type"] });
              const reader = new FileReader();
              reader.onload = () => {
                setImageData(reader.result);

              };

              reader.readAsDataURL(blob);
            }
          } catch (error) {
            console.error(error);
            // Handle errors if necessary
          }
        };
    
        fetchUserImage();
      }, []);
   
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        {imageData ? (
          // If imageData exists, display the user's profile image
          <img
            src={imageData}
            alt="profile-user"
            width="100px"
            height="100px"
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        ) : (
          // If imageData is not available, display the default image
          <img
            src="../../../assets/admin.jpg"
            alt="profile-user"
            width="100px"
            height="100px"
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        )}
      </Box>
    </div>
  );
};

export default ImageProfile;
