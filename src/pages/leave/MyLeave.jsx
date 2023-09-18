import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { message } from 'antd';
import moment from "moment";

const MyLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const id = localStorage.getItem("id");
    const authToken = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.get(`/Leave/userLeaves/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,

        }
      });
      setLeaveRequests(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setLoading(false);
    }
  };
  // Custom cell renderer function to display only the date
  const renderDateCell = (params) => {
    const date = moment(params.value).format('YYYY-MM-DD');
    return <div>{date}</div>;
  };

  const columns = [

    {
      field: "type", headerName: "type", flex: 1, renderCell: (params) => {
        const leaveType = params.row.type;
        let roleText = "";
        let roleColor = "";

        switch (leaveType) {
          case 0:
            roleText = "AnnualLeave";
            break;
          case 1:
            roleText = "SickLeave";
            break;
          case 2:
            roleText = "MaternityLeave";
            break;
          case 3:
            roleText = "PaternityLeave";
            break;
          case 4:
            roleText = "UnpaidLeave";
            break;
          default:
            roleText = "";
            roleColor = "black"; // Customize the color for other cases.
            break;
        }

        return (
          <span style={{ color: roleColor }}>
            {roleText}
          </span>
        );
      },
    },
    { field: "startDate", headerName: "Start Date", flex: 1, renderCell: renderDateCell },
    { field: "endDate", headerName: "End Date", flex: 1, renderCell: renderDateCell },
    { field: "reason", headerName: "Reason", flex: 1 },
    {
      field: "isApproved", headerName: "Reason", flex: 1, renderCell: (params) => {
        const accountType = params.row.isApproved;
        let roleText = "";
        let roleColor = "";

        switch (accountType) {
          case 0:
            roleText = "Pending";
            roleColor = "yellow"; // Customize the color for Admin.
            break;
          case 1:
            roleText = "Apporval";
            roleColor = "green"; // Customize the color for Manager.
            break;
          case 2:
            roleText = "Reject";
            roleColor = "red"; // Customize the color for Staff.
            break;
          default:
            roleText = "";
            roleColor = "black"; // Customize the color for other cases.
            break;
        }

        return (
          <span style={{ color: roleColor }}>
            {roleText}
          </span>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Delete"
            style={{ color: 'red' }}
            onClick={() => handleDelete(params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this Leave Request?");

      if (!confirmed) {
        return; // If the user cancels the deletion, exit the function
      }

      const authToken = localStorage.getItem("token");

      const response = await axios.delete(`/Leave/deleteLeave/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,

        }
      });
      console.log(response.data);

      // After successful deletion, fetch the updated leave requests to refresh the data grid
      await fetchLeaveRequests();

      // Show a success message to the user using Ant Design's message component
      if (response.data.message === "Delete Successfully. No more leave records in the database.") {
        message.success('Deleted Leave successfully. No more leave records in the database.');
      } else {
        message.success('Deleted Leave successfully.');
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };



  return (
    <Box m="40px 0 0 0" height="80vh">
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : leaveRequests.length === 0 ? (
        <Typography variant="h6">No leave requests found.</Typography>
      ) : (
        <DataGrid
          rows={leaveRequests}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          autoHeight
          pageSize={10}
        />
      )}
    </Box>
  );
};

export default MyLeave;
