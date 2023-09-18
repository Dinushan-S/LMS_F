import React from 'react';
import './AdminHome.css'
import { useState } from 'react';
import axios from 'axios';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useEffect } from 'react';
const AdminHome = () => {
    
    const [userCount, setUserCount] = useState(0);
    const [department, setDepartment] = useState(0);
    const [leave, setLeave] = useState(0);


    useEffect(() => {
        fetchUserCount();
        fetchDepartment();
        fetchLeave()
      }, []);
    

    const fetchUserCount = async () => {
        try {
           const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

          const response = await axios.get('https://localhost:7185/api/Auth/allUsers',{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }); // Fetch user data using Axios
    
          if (!response || !response.data || !Array.isArray(response.data)) {
            throw new Error('Failed to fetch user data.');
          }
          const filteredUsers = response.data.filter(user => user.accountType !== 0);

          setUserCount(filteredUsers.length);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchDepartment = async () => {
        try {
          const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

          const response = await axios.get('https://localhost:7185/api/Department',{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }); // Fetch user data using Axios
    
          if (!response || !response.data || !Array.isArray(response.data)) {
            throw new Error('Failed to fetch user data.');
          }
    
          setDepartment(response.data.length);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchLeave = async () => {
        try {
          const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

          const response = await axios.get('https://localhost:7185/api/Leave/managerLeave',{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }); // Fetch user data using Axios
    
          if (!response || !response.data || !Array.isArray(response.data)) {
            throw new Error('Failed to fetch user data.');
          }
    
          setLeave(response.data.length);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <div>
            <div class="cardBox">
<div class="card">
    <div>
        <div class="number">{leave}</div>
        <div class="cardName">Total Leave Request</div>


    </div>
    <div class="iconBx">
        <ion-icon name="eye-outline"></ion-icon>
    </div>
</div>
<div class="card">
    <div>
    <div className="number">{userCount}</div>
            <div className="cardName">Employee Count</div>


    </div>
    <div class="iconBx">
        <ion-icon name="eye-outline"></ion-icon>
    </div>
</div>
<div class="card">
    <div>
        <div class="number">{department}</div>
        <div class="cardName">Department View</div>


    </div>
    <div class="iconBx">
        <PermIdentityIcon class="larger-icon"/> 
    </div>
</div>
      </div>
        </div>
    );
};

export default AdminHome;