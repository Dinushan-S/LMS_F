import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../Component/Header";
import { Link, useNavigate } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';


export const DepartmentTable = () => {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [gridApi, setGridApi] = useState(null)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("token");

      const response = await axios.get('/Department', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      },); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "departmentName",
      headerName: "Department Name",
      flex: 2,
      cellClassName: "name-colunm--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
    {
      headerName: 'Actions',
      // field: 'id',
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"

          onClick={() => handleEditClick(params.row.id)}
        >
          Edit
        </Button>
      ),
    },

  ];

  const handleEditClick = (departmentId) => {
    console.log(departmentId);
    navigate(`/users/admin/departments/${departmentId}`);
  };


  return (
    <Box m="20px">
      <Header
        title="Department"
        subtitle="Managing Company Department"
      ></Header>

      <Link
        to="/users/admin/DepartmentAdd"
        style={{
          color: "inherit",
          textDecoration: "none",
          justifyContent: "flex-end", // Add this line to align content right
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          // justifyContent=""
          backgroundColor="#23408B"
          boxSizing="border-box"
          width="140px"
          borderRadius="12px"
          height="60px"
          marginLeft="auto" // Add this line to move the box towards the center
        // marginRight="auto"
        >
          <Box marginLeft={2} marginRight={2}>
            <AddBusinessIcon sx={{ fontSize: "48px", color: "white" }} />
          </Box>

          <Typography
            component="span"
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
          >
            ADD
          </Typography>
        </Box>
      </Link>

      <Box
        m="40px 0 0 0"
        height="60vh"
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
          // "& .MuiDataGrid-footerContainer": {
          //   color: "red",
          //   borderBottom: "none",
          //   fontSize: "16px",
          //   color: "#23408B",
          //   fontWeight: "bold",
          // },
        }}
      >

        <DataGrid
          rows={data}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        // onRowClick={handleRowClick}
        />

      </Box>

    </Box>
  );
};
