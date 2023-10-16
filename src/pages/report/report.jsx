import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../Component/searchbar/SearchBar';
import { SearchResultsList } from '../../Component/searchbar/SearchResultsList';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Box, color } from '@mui/system';
import moment from "moment";

import './report.css';
import { red } from '@mui/material/colors';

const bull = (
    <Box
        compenent='span'
        sx={{ display: 'inline-block', mx: '2x', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const Report = () => {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState([])
    const [leaveResults, setLeaveResults] = useState([])
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);

    // const [TotalLeave, s] = useState({});
    const [haveData, setHaveData] = useState(false);

    const [dates, setDates] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    //time off status
    const [selectedType, setSelectedType] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [filterDepartment, setFilteredDepartment] = useState('');

    var TotalLeave = 0;
    var AnnualLeave = 0;
    var SickLeave = 0;
    var MaternityLeave = 0;
    var PaternityLeave = 0;
    var UnpaidLeave = 0;
    // useEffect(() => {
    //     fetchData();
    // }, [])

    useEffect(() => {
        fetchAllLeave();
    }, []);

    useEffect(() => {
        fetchSelectedLeave();
        leaveCount();
    }, [selectedMonth])


    const fetchAllLeave = async () => {
        try {
            const response = await axios.get('/Leave/LeaveAllRequests');
            const approvedLeave = response.data.filter((item) => item.isApproved === 1);
            console.log(approvedLeave)
            setDates(approvedLeave);
            // const selectedMonth = "September";
            // // const data1 = [...new Set(dates.map((date) => ))];
            // const data1 = dates.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);
            // console.log(data1);
        } catch (error) {
            console.error("Error fetching leave requests:", error);

        }
    }

    const leaveTypes = ['AnnualLeave', 'SickLeave', 'MaternityLeave', 'PaternityLeave', 'UnpaidLeave'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', '']

    //selct month
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    //select type
    const handleTypeChange = (event) => {
        const index = event.target.value;
        setSelectedType(parseInt(index, 10));
        // setSelectedType(event.target.value);
        // (event.target.value === "AnnualLeave") ? setSelectedType(0) :
        //     (event.target.value === "SickLeave") ? setSelectedType(1) :
        //         (event.target.value === "MaternityLeave") ? setSelectedType(2) :
        //             (event.target.value === "PaternityLeavee") ? setSelectedType(3) :
        //                 (event.target.value === "UnpaidLeave") ? setSelectedType(4) :
        //                     setSelectedType();
        // setSelectedType(event.target.value);
        console.log(selectedType);
    }

    const handleDayChange = (value) => {
        setSelectedDay(value.target.value)
    }
    const handleDeparmentChange = (value) => {
        setSelectedDepartment(value.target.value);
    }

    // Extract unique months and years from the dates state
    const months = [...new Set(dates.map((date) => moment(date.startDate).format("MMMM")))];
    const years = [...new Set(dates.map((date) => moment(date.startDate).format("YYYY")))];

    const department = [...new Set(dates.map((item) => item.departmentName))];
    console.log(selectedDepartment);

    console.log(department);

    // Extract unique type and years from the dates state

    //fetch data based on the leaveType
    useEffect(() => {
        const fetchLeaveTypeData = async () => {
            try {
                const response = await axios.get('/Leave/LeaveAllRequests');
                const filteredData = response.data.filter((item) => item.isApproved === 1 && item.type === selectedType);
                console.log(filteredData);
            } catch (error) {
                console.log("error fetching leave request", error);
            }
        }
        fetchLeaveTypeData();
    }, [selectedType]);
    //fetch data based on the day
    // const dayCounts = (day) => {
    //     // return selectedData.map((item) => {
    //     return selectedData.reduce((count, item) => {
    //         const startDate = moment(item.startDate);
    //         const endDate = moment(item.endDate);
    //         //const day = "Friday"; // replace with the desired day

    //         const daysInRange = [];
    //         let currentDate = startDate.clone();
    //         while (currentDate.isSameOrBefore(endDate)) {
    //             daysInRange.push(currentDate.clone());
    //             currentDate.add(1, "day");
    //         }

    //         const dayCount = daysInRange.filter((date) => date.format("dddd") === day).length;
    //         // return { name: item.name, dayCount };
    //         return count + dayCount;
    //     }, 0);
    // };
    // useEffect(() => {
    //     const fetchLeaveByDay = async () => {
    //         try {
    //             const filteredData = dates.map((item) => {
    //                 const startDate = moment(item.startDate);
    //                 const endDate = moment(item.endDate);

    //                 const days = [];
    //                 let currentDate = startDate.clone();
    //                 while (currentDate.isSameOrBefore(endDate)) {
    //                     days.push(currentDate.clone());
    //                     currentDate.add(1, "day");
    //                 }
    //                 return days.some((date) => date.format("dddd") === selectedDay);
    //                 // const totalDays = days.filter((date) => date.format("dddd") === selectedDay);
    //                 // console.log(totalDays);
    //             });
    //             console.log(filteredData);
    //             // const response = await axios.get('/Leave/LeaveAllRequests');
    //             // const filteredData = dates.filter((item) => item.isApproved === 1 && item.type === selectedDay);
    //             // console.log(filteredData);

    //         } catch (error) {
    //             console.log("error fetching leave request", error);
    //         }
    //     }
    //     fetchLeaveByDay();
    // }, [selectedDay]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchLeaveByDay = async () => {
            try {
                const filteredData = dates.filter((item) => {
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
                setFilteredData(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaveByDay();
    }, [dates, selectedDay]);

    console.log(filteredData);
    console.log(selectedDay);
    //fetch data based on the department
    useEffect(() => {
        const fetchLeaveByDepartment = async () => {
            try {
                const filteredData = dates.filter((item) => item.departmentName === selectedDepartment);
                setFilteredDepartment(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaveByDepartment();
    }, [dates, selectedDepartment]);
    console.log(filterDepartment)


    //if user is next  if user details is shown....
    const fetchSelectedLeave = async () => {
        try {
            const data = dates.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);
            console.log(data);
            setSelectedData(data);
        } catch (error) {
            console.error("Error fetching leave requests:", error);

        }
    }

    //now using for employee, works
    const userLeaveCounts1 = selectedData.reduce((counts, item) => {
        if (item.isApproved === 1) {
            counts[item.name] = (counts[item.name] || 0) + 1;
            TotalLeave++;
        }
        return counts;
    }, {});

    const sortedCounts = Object.fromEntries(
        Object.entries(userLeaveCounts1).sort((a, b) => b[1] - a[1])
    );

    console.log(sortedCounts);
    //

    // Most policy used
    const usedPolicy = selectedData.reduce((counts, item) => {
        if (item.type === 0) {
            counts["Annual leave"] = (counts["Annual leave"] || 0) + 1;
        } else if (item.type === 1) {
            counts["Sick leave"] = (counts["Sick leave"] || 0) + 1;
        } else if (item.type === 2) {
            counts["Maternity leave"] = (counts["Maternity leave"] || 0) + 1;
        } else if (item.type === 3) {
            counts["Paternity leave"] = (counts["Paternity leave"] || 0) + 1;
        } else if (item.type === 4) {
            counts["Unpaid leave"] = (counts["Unpaid leave1"] || 0) + 1;
        }
        return counts;
    }, {});
    console.log(usedPolicy);

    const sortedPolicy = Object.fromEntries(
        Object.entries(usedPolicy).sort((a, b) => b[1] - a[1])
    )
    console.log(sortedPolicy);
    //

    const dayCounts = (day) => {
        // return selectedData.map((item) => {
        return selectedData.reduce((count, item) => {
            const startDate = moment(item.startDate);
            const endDate = moment(item.endDate);
            //const day = "Friday"; // replace with the desired day

            const daysInRange = [];
            let currentDate = startDate.clone();
            while (currentDate.isSameOrBefore(endDate)) {
                daysInRange.push(currentDate.clone());
                currentDate.add(1, "day");
            }

            const dayCount = daysInRange.filter((date) => date.format("dddd") === day).length;
            // return { name: item.name, dayCount };
            return count + dayCount;
        }, 0);
    };

    console.log(dayCounts("Friday"));

    const leaveCount = async () => {
        const count = selectedData.reduce((count, data) => {
            console.log(selectedData);
            if (data.isApproved === 1) {
                count[data.name] = (count[data.name] || 0) + 1;
                console.log(count);
            }
            return count;
        }, {});
        console.log(count);
        setHaveData(true);
    };
    const userLeaveCounts = selectedData.reduce((counts, data) => {
        console.log(selectedData);
        if (data.isApproved === 1) {
            counts[data.name] = (counts[data.name] || 0) + 1;
        }
        return counts;
    }, {});

    return (
        //year and month select 
        <div className='report'>
            <div style={{ display: "flex", paddingLeft: 10 }}>
                <div>
                    <label htmlFor="month">Month:</label>
                    <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">Select a month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ paddingLeft: 20 }}>
                    <label htmlFor="year">Year:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select a year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                {haveData && selectedData.map((data) => (
                    <table key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.type}</td>
                        <td>{userLeaveCounts[data.name]}</td>
                        {/* <td>{data.name && handleCount(data.name)}</td> */}
                        {/* <td>{count[data.name]}</td> */}
                        {/* {console.log(nameCounts)} */}
                    </table>
                ))}
            </div>
            <div className='search-bar-container'>
                <SearchBar setResult={setResult} setVisible={setVisible} />
                {visible && <SearchResultsList result={result} setLeaveResults={setLeaveResults} setVisible={setVisible} />}
            </div>
            {/* <table>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>type</th>

                </tr>
                {leaveResults.map((results, index) => (
                    <tr>
                        <td>{results.name}</td>
                        <td>{results.startDate}</td>
                        <td>{results.endDate}</td>
                        <td>{results.reason}</td>
                        <td>
                            {results.type === 1 ? casulLeave++ : null}
                            {results.type === 2 ? sickLeave++ : null}
                            {results.type === 3 ? annualLeave++ : null}
                            {results.type === 4 ? otherleave++ : null}
                        </td>
                    </tr>
                ))}
            </table> */}
            <div>Total Leave : {leaveResults.length}</div>
            <div>

                {leaveResults.map((results, index) => (
                    <div style={{ color: " white" }}>
                        {show && results.type === 0 ? AnnualLeave++ : null}
                        {show && results.type === 1 ? SickLeave++ : null}
                        {show && results.type === 2 ? MaternityLeave++ : null}
                        {show && results.type === 3 ? PaternityLeave++ : null}
                        {show && results.type === 4 ? UnpaidLeave++ : null}
                    </div>
                ))}


                <div>Annual Leave : {AnnualLeave}</div>
                <div>Sick Leave : {SickLeave}</div>
                <div>Maternity Leave : {MaternityLeave}</div>
                <div>Paternity Leave : {PaternityLeave}</div>
                <div>Unpaid Leave : {UnpaidLeave}</div>
            </div>
            <div>
                <div className='card-container'>
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                Heatmap
                            </Typography>
                            <hr />
                            <Typography component="div">
                                <div className='inline'>
                                    {/* <Box>
                                        sx={(dayCounts("Monday") > 5) ? { backgroundColor: "red" } : (dayCounts("Monday") > 2) ? { color: "orange" } : { color: "yellow" }}
                                        <div>Mon</div>
                                    </Box> */}
                                    <div style={(dayCounts("Monday") > 5) ? { color: "red" } : (dayCounts("Monday") > 2) ? { color: "orange" } : { color: "yellow" }}>Mon</div> : {bull}
                                    <div style={(dayCounts("Tuesday") > 5) ? { color: "red" } : (dayCounts("Tuesday") > 2) ? { color: "orange" } : { color: "yellow" }}>Tue</div> : {bull}
                                    <div style={(dayCounts("Wednesday") > 5) ? { color: "red" } : (dayCounts("Wednesday") > 2) ? { color: "orange" } : { color: "yellow" }}>Wed</div> : {bull}
                                    <div style={(dayCounts("Thursday") > 5) ? { color: "red" } : (dayCounts("Thursday") > 2) ? { color: "orange" } : { color: "yellow" }}>Thu</div> : {bull}
                                    <div style={(dayCounts("Friday") > 5) ? { color: "red" } : (dayCounts("Friday") > 2) ? { color: "orange" } : { color: "yellow" }}>Fri</div> : {bull}
                                </div>
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button size="small"></Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 500, marginLeft: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                Average Away
                            </Typography>
                            <hr />
                            <Typography variant='h5' component="div" align='center'>
                                {(TotalLeave / 10) * 100}%
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"></Button>
                        </CardActions>
                    </Card>
                </div>
                <div className='card-container'>
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                Most Days Away
                            </Typography>
                            <hr />
                            {/* {haveData && selectedData.map((data) => (
                                <Typography component="div" sx={{ justifyContent: "space-between" }} noWrap>
                                    <div className='inline' key={data.id}>
                                        <div>{data.name}</div>
                                        <div>{userLeaveCounts[data.name]}</div>
                                    </div>
                                </Typography>
                            ))} */}
                            <Typography component="div" sx={{ justifyContent: "space-between" }} noWrap>
                                {Object.entries(sortedCounts).map(([name, count]) => (
                                    <div className='inline' key={name}>
                                        <div>{name}</div>
                                        <div>{count}</div>
                                    </div>
                                ))}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"></Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 500, marginLeft: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                Most Polices used
                            </Typography>
                            <hr />
                            <Typography component="div" sx={{ justifyContent: "space-between" }} noWrap>
                                {Object.entries(sortedPolicy).map(([name, count]) => (
                                    <div className='inline' key={name}>
                                        <div>{name}</div>
                                        <div>{count}x</div>
                                    </div>
                                ))}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "flex" }}><h2>Time Off Satus</h2></div>
                <div style={{ display: "flex", paddingLeft: 10 }}>
                    <div>
                        {/* <label htmlFor="month">Reason:</label> */}
                        <select id="month" value={selectedType} onChange={handleTypeChange}>
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
                            {days.map((day) => (
                                <option value={day}>
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

        </div>
    )
};

export default Report;

