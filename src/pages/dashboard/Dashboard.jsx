import { Header } from '../../Component/Header';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Calendar, Modal } from 'antd';
import './styles.css'; // Import your CSS file containing the styles
import axios from 'axios';

export const DashBoard = () => {
  const currentDate = dayjs(); // Get the current date
  const [value, setValue] = useState(() => currentDate.startOf('month')); // Set the current month as default
  const [selectedValue, setSelectedValue] = useState(() => currentDate.startOf('month'));
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveNames, setShowLeaveNames] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch leave requests from the backend API and store them in the state
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

      const response = await axios.get(`/Leave/managerLeave`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      if (response.status === 200) {
        const managerLeaveDtoList = response.data; // Assuming the API returns data in the appropriate format
        setLeaveRequests(managerLeaveDtoList);
        console.log(managerLeaveDtoList);
      } else {
        console.error('Failed to fetch manager leave requests');
      }
    } catch (error) {
      console.error('Error fetching manager leave requests:', error);
    }
  };

  const dateFullCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const leaveOnDate = leaveRequests.filter(
      (leaveRequest) => dayjs(leaveRequest.startDate).isSame(formattedDate, 'day')
    );
    let employeeNames = '';

    if (leaveOnDate.length > 0) {
      // If there are employees on leave, concatenate their names
      employeeNames = leaveOnDate.map((leave) => leave.name).join(', ');
    }
    return (
      <div
      style={{
        backgroundColor: leaveOnDate.length > 0 ? 'red' : 'transparent', // Change background color to red
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        cursor: 'pointer', // Show pointer cursor when hovering over the cell
      }}
      onClick={() => handleCellClick(formattedDate, leaveOnDate)}
    >
      {employeeNames}
    </div>
    );
  };

  const handleCellClick = (date, leaveOnDate) => {
    setSelectedDate(date);
    setShowLeaveNames(true);
  };

  const handleModalClose = () => {
    setShowLeaveNames(false);
  };

  return (
    <Box m="20px">
      <Box display="row" justifyContent="space-between" alignItems="center">
        {/* Header and other components */}
        <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />

        <Calendar
          dateCellRender={dateFullCellRender}
          mode="month"
          value={value}
          onSelect={setSelectedValue}
          onPanelChange={onPanelChange}
        />

        <Modal
          title={`Leaves on ${selectedDate}`}
          visible={showLeaveNames}
          onCancel={handleModalClose}
          footer={null}
        >
          <ul>
            {leaveRequests
              .filter((leaveRequest) => dayjs(leaveRequest.startDate).isSame(selectedDate, 'day'))
              .map((leave) => (
                <li key={leave.id}>{leave.name}</li>
              ))}
          </ul>
        </Modal>
      </Box>
    </Box>
  );
};
