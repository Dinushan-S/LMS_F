import { Box, IconButton, Typography } from "@mui/material";
import { Header } from "../../Component/Header";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { message } from 'antd';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import '../leave/Leave.css';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const EmployeeTables = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('');


  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [accountType]);


  // Function to map department IDs to colors
  const getDepartmentColor = (departmentId) => {
    switch (departmentId) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "purple";
      default:
        return "black";
    }
  };


  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("token");

      setAccountType(parseInt(localStorage.getItem("accountType"))); // Convert to number
      const departmentId = parseInt(localStorage.getItem("departmentId")); // Convert to number
      console.log(accountType);

      if (accountType === 0) {
        const response = await axios.get("/Auth/allUsers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        const filteredData = response.data.filter(item => item.accountType !== 0); // Filter out data with accountType 0 (Admin)
        setData(filteredData);
      }
      else if (accountType === 1) {
        const response = await axios.get(`/Auth/employee/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        const filteredData = response.data.filter(item => item.accountType !== 1); // Filter out data with accountType 0 (Admin)
        setData(filteredData);

        // setData(response.data);
        console.log(response.data);
      }


    } catch (error) {
      console.error("Error fetching child data:", error);
    }
  };

  const columns = [

    // { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "name-colunm--cell",
    },
    { field: "lastName", headerClassName: "custom-header", headerName: "Last Name", flex: 1 },
    { field: "email", headerClassName: "custom-header", headerName: "Email", flex: 1 },
    { field: "phone", headerClassName: "custom-header", headerName: "Phone", },
    {
      field: "accountType", headerClassName: "custom-header",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        const accountType = params.row.accountType;
        let roleText = "";
        let roleColor = "";

        switch (accountType) {
          case 0:
            roleText = "Admin";
            roleColor = "red"; // Customize the color for Admin.
            break;
          case 1:
            roleText = "Manager";
            roleColor = "blue"; // Customize the color for Manager.
            break;
          case 2:
            roleText = "Staff";
            roleColor = "green"; // Customize the color for Staff.
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


    { field: "address", headerClassName: "custom-header", headerName: "Address", flex: 1 },
    {
      field: "departmentName", headerClassName: "custom-header",
      headerName: "Department",
      flex: 1,
      renderCell: (params) => {
        const departmentId = params.row.departmentId;
        const departmentName = params.row.departmentName;
        const departmentColor = getDepartmentColor(departmentId);

        return (
          <span style={{ color: departmentColor }}>
            {departmentName}
          </span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: "custom-header",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        if (accountType === 0) {
          return (
            <>
              <IconButton
                aria-label="Edit"
                style={{
                  color: "blue", // Set the border color here
                  // Add border-radius to make the border circular
                }}
                onClick={() => handleEdit(params.row.id)}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                style={{ color: 'red' }}
                onClick={() => handleDelete(params.id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        }
        else {
          // For other account types, return null (don't render anything)
          return (
            <>

              <IconButton
                aria-label="Delete"
                style={{ color: 'trans' }}
                onClick={() => handleView(params.row.id)}

              >
                <VisibilityIcon />
              </IconButton></>
          );
        }
      }
    }

  ];
  const handleView = (employeetId) => {
    console.log(employeetId);
    navigate(`/users/manager/Employee/${employeetId}`);
  };
  const handleEdit = (employeetId) => {
    console.log(employeetId);
    navigate(`/users/admin/Employee/${employeetId}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this Employee?"); // Display the confirmation dialog

      if (!confirmed) {
        return; // If the user cancels the deletion, exit the function
      }
      const response = await axios.delete(`/Auth/${id}`);
      console.log(response.data);
      fetchData();
      message.delete('Deleted Employee successful');

    } catch (error) {
      console.error("Error deleting data:", error);

    }
  };
  // const { accountType } = useParams();
  //const filteredColumns = accountType === 0 ? columns : columns.filter((column) => column.field !== 'actions');

  return (
    <Box m="20px">
      <Header title="Employees" subtitle="Managing Company Employees"></Header>
      {accountType === 0 ? (
        <Link
          to="/users/admin/employeeAdd"
          style={{
            color: "inherit",
            textDecoration: "none",
            justifyContent: "flex-end",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            backgroundColor="#23408B"
            boxSizing="border-box"
            width="140px"
            borderRadius="12px"
            height="60px"
            marginLeft="auto"
          >
            <Box marginLeft={2} marginRight={2}>
              <PersonAddAlt1Icon sx={{ fontSize: "48px", color: "white" }} />
            </Box>

            <Typography
              component="span"
              style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            >
              ADD
            </Typography>
          </Box>
        </Link>
      ) : null}

      <Box
        m="40px 0 0 0"
        height="80vh"
        // width='100%'
        sx={{
          display: "flex",
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-colunm--cell": { color: "#23408B" },
          "& .name-colunm--age": { color: "#23408B" },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#23408B",
            borderBottom: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "red",
            borderBottom: "none",
            fontSize: "16px",
            color: "#23408B",
            fontWeight: "bold",
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          //     columns={filteredColumns} // Use the filteredColumns here

          components={{ Toolbar: GridToolbar }}
          loading={data.length === 0}
          style={{ width: '40%' }}
        // classes={{}}
        ></DataGrid>
      </Box>
    </Box>
  );
};
