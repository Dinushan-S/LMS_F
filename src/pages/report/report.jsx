import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../Component/searchbar/SearchBar';
import { SearchResultsList } from '../../Component/searchbar/SearchResultsList';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from "moment";

import './report.css';

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

    const [counts, setCounts] = useState({});

    const [dates, setDates] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

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
        leaveCount();
    }, []);

    useEffect(() => {
        fetchSelectedLeave();
    }, [selectedMonth])

    const fetchAllLeave = async () => {
        try {
            const response = await axios.get('/Leave/LeaveAllRequests');
            setDates(response.data);
            console.log(selectedMonth);
            console.log(response.data)
            var date = response.data;
            date.map((result) => (
                console.log(result.startDate)
            ))
            // const selectedMonth = "September";
            // // const data1 = [...new Set(dates.map((date) => ))];
            // const data1 = dates.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);
            // console.log(data1);
        } catch (error) {
            console.error("Error fetching leave requests:", error);

        }
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Extract unique months and years from the dates state
    const months = [...new Set(dates.map((date) => moment(date.startDate).format("MMMM")))];
    const years = [...new Set(dates.map((date) => moment(date.startDate).format("YYYY")))];

    const fetchSelectedLeave = async () => {
        try {
            const data = dates.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);
            console.log(data);
            setSelectedData(data);
        } catch (error) {
            console.error("Error fetching leave requests:", error);

        }
    }

    const leaveCount = async () => {
        const count = selectedData.reduce((count, data) => {
            console.log(selectedData);
            if (data.isApproved === 1) {
                count[data.name] = (count[data.name] || 0) + 1;
            }
            return count;
        }, {});
        setCounts(count);
    }

    console.log(counts);
    const userLeaveCounts = selectedData.reduce((counts, data) => {
        console.log(selectedData);
        if (data.isApproved === 1) {
            counts[data.name] = (counts[data.name] || 0) + 1;
            console.log("user count", counts)
        }
        return counts;
    }, {});
    return (

        <div className='report'>
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
            <div>
                {counts.length > 0 &&
                    selectedData.map((data) => (
                        <table key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.type}</td>
                            <td>{counts[data.name]}</td>
                            {/* <td>{data.name && handleCount(data.name)}</td> */}
                            {/* <td>{count[data.name]}</td> */}
                            {/* {console.log(nameCounts)} */}
                        </table>
                    ))
                }
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
                <div className='filter'>

                </div>
                <div className='card-container'>
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                Heatmap
                            </Typography>
                            <hr />
                            <Typography component="div">
                                Monday : {bull} TuesDay: {bull} wednesDay: {bull} thursDay: {bull} Friday:
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
                                0%
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn more</Button>
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
                            <Typography component="div" sx={{ justifyContent: "space-between" }} noWrap>
                                <div className='inline'>
                                    <div>Name</div>
                                    <div>Days</div>
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
                                Most Polices used
                            </Typography>
                            <hr />
                            <Typography component="div" sx={{ justifyContent: "space-between" }} noWrap>
                                <div className='inline'>
                                    <div>Leave Type</div>
                                    <div>10x</div>
                                </div>
                            </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Report;

