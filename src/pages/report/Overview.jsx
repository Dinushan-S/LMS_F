import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react'

export default function OverView() {

    const bull = (
        <Box
            compenent='span'
            sx={{ display: 'inline-block', mx: '2x', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    const [dates, setDates] = useState([]);
    const [haveData, setHaveData] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    var TotalLeave = 0;

    // Extract unique months and years from the dates state
    // const data = dates.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);

    const years = [...new Set(dates.map((date) => moment(date.startDate).format("YYYY")))];
    //console.log(selectedYear);
    const filteredYear = dates.filter((date) => moment(date.startDate).format("YYYY") === selectedYear);
    //console.log(filteredYear);
    const months = [...new Set(filteredYear.map((date) => moment(date.startDate).format("MMMM")))];
    console.log(months)

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

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
        } catch (error) {
            console.error("Error fetching leave requests:", error);

        }
    }

    const fetchSelectedLeave = async () => {
        try {
            const data = filteredYear.filter((date) => moment(date.startDate).format("MMMM") === selectedMonth);
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
                console.log(count);
            }
            return count;
        }, {});
        console.log(count);
        setHaveData(true);
    };

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

    const userLeaveCounts = selectedData.reduce((counts, data) => {
        console.log(selectedData);
        if (data.isApproved === 1) {
            counts[data.name] = (counts[data.name] || 0) + 1;
        }
        return counts;
    }, {});

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

    return (
        <div className='report'>
            <div style={{ display: "flex", paddingLeft: 10 }}>
                <div >
                    {/* <label htmlFor="year">Year:</label> */}
                    <select id="year" value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select a year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedYear &&
                    <div style={{ paddingLeft: 20 }}>
                        {/* <label htmlFor="month">Month:</label> */}
                        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                            <option value="">Select a month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                }
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
        </div>
    )
}
