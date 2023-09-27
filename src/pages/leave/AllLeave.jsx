import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Component/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from "moment";
import "./Leave.css";

const AllLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localStorageValue, setLocalStorageValue] = useState('');
    const location = useLocation();
    const employeeLeave = false;

    const navigate = useNavigate();

    useEffect(() => {
        const valueFromLocalStorage = localStorage.getItem('departmentName');

        if (valueFromLocalStorage) {
            setLocalStorageValue(valueFromLocalStorage);
            console.log("local storagea value", valueFromLocalStorage);

        }
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        const departmentId = parseInt(localStorage.getItem("departmentId")); // Convert to number
        const accountType = parseInt(localStorage.getItem("accountType")); // Convert to number
        const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

        try {
            setLoading(true);
            //   setLoading(false);
            // }
            if (accountType === 0) {
                const response = await axios.get(`/Leave/LeaveAllRequests`, {

                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setLeaves(response.data);
                console.log(response.data);
                setLoading(false);

            }
        } catch (error) {
            console.error("Error fetching leave requests:", error);
            setLoading(false);
        }
    };

    const renderDateCell = (params) => {
        const date = moment(params.value).format('YYYY-MM-DD');
        return <div>{date}</div>;
    };

    const renderDateCells = (params) => {
        // const date = moment(params.value).format('YYYY-MM-DD');
        return <div>hi</div>;
    };

    const columns = [

        {
            field: "type", headerClassName: "custom-header", headerName: "type", flex: 1, renderCell: (params) => {
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
        { field: "startDate", headerName: "Start Date", headerClassName: "custom-header", flex: 1, renderCell: renderDateCell },
        { field: "endDate", headerName: "End Date", headerClassName: "custom-header", flex: 1, renderCell: renderDateCell },
        { field: "name", headerName: "name", flex: 1, headerClassName: "custom-header", },
        { field: "departmentName", headerClassName: "custom-header", headerName: "departmentName", flex: 1 },
        {
            field: "isApproved", headerName: "isApproved", flex: 1, headerClassName: "custom-header", renderCell: (params) => {
                const isApproved = params.row.isApproved;
                let roleText = "";
                let roleColor = "";

                switch (isApproved) {
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
        { field: "reason", headerClassName: "custom-header", headerName: "Reason", flex: 1 },

        // {
        //     headerName: 'Actions',
        //     headerClassName: "custom-header",
        //     // field: 'id',
        //     renderCell: (params) => (

        //         <>
        //             {/* <Button
        //                 variant="outlined"
        //                 color="primary"

        //                 onClick={() => handleEditClick(params.row.id)}
        //             >
        //                 Edit
        //             </Button> */}

        //             <IconButton
        //                 aria-label="View"
        //                 style={{ color: 'trans' }}
        //                 onClick={() => handleView(params.row.id)}

        //             >
        //                 <VisibilityIcon />
        //             </IconButton>

        //         </>

        //     ),
        // },
    ];
    const handleView = (employeetId) => {
        console.log(employeetId);
        // navigate(`/users/manager/Employee/${employeetId}`);
    };


    const handleEditClick = (id) => {
        const accountType = parseInt(localStorage.getItem("accountType"));
        if (accountType === 0) {
            navigate(`/users/admin/UpdateLeave/${id}`);
        }
        else if (accountType === 1) {
            navigate(`/users/manager/UpdateLeave/${id}`);
        } else {
            // // Code to handle other cases (if any)
        }
        // navigate(`/users/manager/UpdateLeave/${id}`);

    };

    return (
        <Box m="40px 0 0 0" height="80vh">
            <Header title="Employees" subtitle={`Managing Department Manager Leaves.`}></Header>
            <br />
            {loading ? (
                <Typography variant="h6">Loading...</Typography>
            ) : leaves.length === 0 ? (
                <Typography variant="h6">No leave requests found.</Typography>
            ) : (
                <DataGrid
                    rows={leaves}
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

export default AllLeave;