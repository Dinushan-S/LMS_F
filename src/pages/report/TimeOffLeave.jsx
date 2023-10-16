import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import moment from "moment";


export default function TimeOffLeave() {
    const [dates, setDates] = useState([]);

    const [selectedType, setSelectedType] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterDepartment, setFilteredDepartment] = useState('');

    const leaveTypes = ['AnnualLeave', 'SickLeave', 'MaternityLeave', 'PaternityLeave', 'UnpaidLeave'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ''];
    const department = [...new Set(filteredData.map((item) => item.departmentName))];



    useEffect(() => {
        const fetchAllLeave = async () => {
            try {
                const response = await axios.get('/Leave/LeaveAllRequests');
                //filter data by selected type
                const filterData = response.data.filter((item) => item.type === selectedType);
                const approvedLeave = filterData.filter((item) => item.isApproved === 1);
                // setFilteredData(approvedLeave);
                setFilteredData(approvedLeave);
                console.log(approvedLeave);
                // setDates(approvedLeave);

            } catch (error) {
                console.error("Error fetching leave requests:", error);

            }
        }
        fetchAllLeave();
    }, [selectedType]);
    console.log(filteredData)
    console.log(selectedDepartment);


    useEffect(() => {
        const fetchLeaveByDay = async () => {
            try {
                const filterData = filteredData.filter((item) => {
                    const startDate = moment(item.startDate);
                    const endDate = moment(item.endDate);
                    const days = [];
                    let currentDate = startDate.clone();
                    while (currentDate.isSameOrBefore(endDate)) {
                        days.push(currentDate.clone());
                        currentDate.add(1, "day");
                    }
                    return days.some((date) => date.format("dddd") === selectedDay);
                });
                // setFilteredData(filterData);
                if (selectedDepartment !== '') {
                    setFilteredData(filterData.filter((item) => item.departmentName === selectedDepartment))
                    console.log(filteredData);
                } else {
                    setFilteredData(filterData);
                    console.log(filteredData);

                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaveByDay();
    }, [dates, selectedDay, selectedDepartment]);

    const handleTypeChange = (event) => {
        const index = event.target.value;
        setSelectedType(parseInt(index, 10));
        setSelectedDay("");
    }
    console.log(selectedType);

    const handleDayChange = (value) => {
        setSelectedDay(value.target.value)
        // setSelectedDepartment('');
    }
    const handleDeparmentChange = (value) => {
        setSelectedDepartment(value.target.value);
    }

    return (
        <div className='report'>
            <div style={{ display: "flex", justifyContent: "flex" }}><h2>Time Off Satus</h2></div>
            <div style={{ display: "flex", paddingLeft: 10 }}>
                <div>
                    {/* <label htmlFor="month">Reason:</label> */}
                    <select id="type" value={selectedType} onChange={handleTypeChange}>
                        <option value="">Select a Reason</option>
                        {leaveTypes.map((type, index) => (
                            <option key={index} value={index}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ paddingLeft: 20 }}>
                    {/* <label htmlFor="year"></label> */}
                    <select id="year" value={selectedDay} onChange={handleDayChange}>
                        <option value="">Select a day</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">Select a month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select> */}
                <div style={{ paddingLeft: 20 }}>
                    <select id="year" value={selectedDepartment} onChange={handleDeparmentChange}>
                        <option value="">Select a department</option>
                        {department.map((dep) => (
                            <option value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <Button>Genarate</Button>
                <Button>Download</Button>
            </div>
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.reason}</td>
                            </tr>
                            // console.log(item.name)
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        {/* {filterDepartment.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.reason}</td>
                                </tr>
                                // console.log(item.name)
                            ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
