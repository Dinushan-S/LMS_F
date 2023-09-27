import { Box, IconButton, } from "@mui/material";
import { Header } from "../../Component/Header";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../leave/Leave.css';


export const EmployeeList = () => {
  const navigate = useNavigate();
  const [localStorageValue, setLocalStorageValue] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('departmentName');
    if (valueFromLocalStorage) {
      setLocalStorageValue(valueFromLocalStorage);
      console.log(valueFromLocalStorage);

    }
    fetchData();
  }, []);



  const fetchData = async () => {
    const authToken = localStorage.getItem("token");
    const id = localStorage.getItem("departmentId");

    try {

      const response = await axios.get(`/Auth/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,

        }
      });
      const filteredData = response.data.filter(item => item.accountType !== 1); // Filter out data with accountType 0 (Admin)
      setData(filteredData);
      console.log(authToken);
      // setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching child data:", error);
      console.log(authToken);

    }
  };

  const columns = [

    // { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name", headerClassName: "custom-header", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", },
    {
      field: "accountType", headerName: "Role", flex: 1,
      valueGetter: (params) => {
        const accountType = params.row.accountType;
        if (accountType === 0) {
          return "Admin";
        }
        else if (accountType === 1) {
          return "Manager";
        }
        else if (accountType === 2) {
          return "Staff";
        }
        else {
          return "";
        }
      },
    },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "departmentName", headerName: "Department",    // Access departmentId directly
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>

          <IconButton
            aria-label="Delete"
            style={{ color: 'trans' }}
            onClick={() => handleView(params.row.id)}

          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    }


  ];

  const handleView = (employeetId) => {
    console.log(employeetId);
    navigate(`/users/manager/Employee/${employeetId}`);
  };
  return (
    <Box m="20px">
      <Header title="Employees" subtitle={`Managing ${localStorageValue} Department Employees`}></Header>


      <Box
        m="40px 0 0 0"
        height="60vh"
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
          components={{ Toolbar: GridToolbar }}
          loading={data.length === 0}
          style={{ width: '40%' }}
        // classes={{}}
        ></DataGrid>
      </Box>
    </Box>
  );
};
