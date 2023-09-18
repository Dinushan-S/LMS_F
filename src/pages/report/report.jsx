import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../Component/searchbar/SearchBar';
import { SearchResultsList } from '../../Component/searchbar/SearchResultsList';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { TextField } from '@mui/material';

const Report = () => {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [leaveResults, setLeaveResults] = useState([])
    var casulLeave = 0;
    var sickLeave = 0;
    var annualLeave = 0;
    var otherleave = 0;
    // useEffect(() => {
    //     fetchData();
    // }, [])

    const fetchData = async () => {
        await axios.get(`/Leave/LeaveRequests/4`)
            .then((response => {
                setLeaveResults(response.data);
                console.log(response.data);
                console.log(result.id);
            }))
    }

    // const handleChange = (value) => {
    //     //e.preventDefault();
    //     console.log(result.id);
    //     const result = countries.filter((country) => {
    //         return (
    //             value &&
    //             country &&
    //             country.name &&
    //             country.name.toLowerCase().includes(value)
    //         );
    //     });
    //     //setResult(result);
    //     // setSearch(value);
    // }

    // if (search.length > 0) {
    //     countries.filter((country) => {
    //         return country.name.match(search);
    //     })
    // }

    return (
        <div className='report'>
            <div className='search-bar-container'>
                <SearchBar setResult={setResult} />
                <SearchResultsList result={result} setLeaveResults={setLeaveResults} />
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>type</th>
                    {/* <th>Continent</th> */}

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
            </table>
            <div>Total Leave : {leaveResults.length}</div>
            <div>
                {/* {leaveResults.map((results, index) => (
                    <div aria-disabled>
                        {results.type === 1 ? casulLeave++ : null}
                        {results.type === 2 ? sickLeave++ : null}
                        {results.type === 3 ? annualLeave++ : null}
                        {results.type === 4 ? otherleave++ : null}
                    </div>
                ))} */}


                <div>Casual Leave : {casulLeave}</div>
                <div>Sick Leave : {sickLeave}</div>
                <div>Annual Leave : {annualLeave}</div>
                <div>Other Leave : {otherleave}</div>
            </div>

        </div>
    )
};

export default Report;